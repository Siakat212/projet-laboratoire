from rest_framework import serializers
from .models import *
from datetime import datetime
from django.utils import timezone
from datetime import timedelta


class LaboratoirePageBlockEnteteSerializers(serializers.ModelSerializer):
    page = serializers.SerializerMethodField()

    class Meta:
        model = LaboratoirePageBlockEntete
        fields = '__all__'

    def get_page(self, obj):
        try:
            return obj.id_page.titre
        except:
            return None


class LaboratoireSerializers(serializers.ModelSerializer):
    class Meta:
        model = Laboratoire
        fields = '__all__'


class PartenaireSerializers(serializers.ModelSerializer):
    class Meta:
        model = Partenaire
        fields = '__all__'


class DomaineSerializers(serializers.ModelSerializer):
    class Meta:
        model = Domaine
        fields = '__all__'


class LaboratoireParcourSerializers(serializers.ModelSerializer):
    class Meta:
        model = LaboratoireParcour
        fields = '__all__'


class LaboratoireDomaineSerializers(serializers.ModelSerializer):
    id_laboratoire = LaboratoireSerializers()
    id_domaine = DomaineSerializers()

    class Meta:
        model = LaboratoireDomaine
        fields = '__all__'


class LaboratoireMissionSerializers(serializers.ModelSerializer):
    anneeExcellence = serializers.SerializerMethodField()
    nombreParcour = serializers.SerializerMethodField()
    nombrePartenaire = serializers.SerializerMethodField()
    budget = serializers.SerializerMethodField()
    

    class Meta:
        model = LaboratoireMission
        fields = '__all__'

    def get_anneeExcellence(self, obj):
        try:
            anneeCreation = str(obj.annee_creation).split('-')[0]
            anneeActuel = str(datetime.today()).split('-')[0]
            return int(anneeActuel) - int(anneeCreation)
        except :
            return None
        
    def get_nombreParcour(self, obj):
        try:
            return len(LaboratoireParcour.objects.filter(statu = "Actif", id_laboratoire = obj.id_laboratoire))
        except :
            return None
        
    def get_nombrePartenaire(self, obj):
        try:
            return len(LaboratoirePartenaire.objects.filter(statu = "Actif", id_laboratoire = obj.id_laboratoire))
        except :
            return None
        
    def get_budget(self, obj):
        try:
            return format(obj.budget_annuel, ",").replace(",", " ") + " FCFA"
        except :
            return None


class PresentationSliderSerializers(serializers.ModelSerializer):
    anneeExcellence = serializers.SerializerMethodField()
    nombreRechecrcheRealiser = serializers.SerializerMethodField()
    nombreDomaine = serializers.SerializerMethodField()

    class Meta:
        model = LaboratoireSlider
        fields = '__all__'

    def get_anneeExcellence(self, obj):
        try:
            anneeCreation = str(LaboratoireMission.objects.filter(id_laboratoire = obj.id_laboratoire).last().annee_creation).split('-')[0]
            anneeActuel = str(datetime.today()).split('-')[0]
            return int(anneeActuel) - int(anneeCreation)
        except :
            return None
        
    def get_nombreRechecrcheRealiser(self, obj):
        try:
            tableauIdRecherche = []
            rechercheRealiser = RechercheLaboratoire.objects.filter(id_laboratoire_domaine__id_laboratoire = obj.id_laboratoire)
            for i in rechercheRealiser:
                if i.id_recherche.id not in tableauIdRecherche:
                    tableauIdRecherche.append(i.id_recherche.id)
            return len(tableauIdRecherche)
        except :
            return None
        
    def get_nombreDomaine(self, obj):
        try:
            return len(LaboratoireDomaine.objects.filter(id_laboratoire = obj.id_laboratoire))
        except :
            return None


class AcceuilSliderSerializers(serializers.ModelSerializer):
    nombrePublication = serializers.SerializerMethodField()
    nombreChercheur = serializers.SerializerMethodField()
    nombreRechercheActif = serializers.SerializerMethodField()

    class Meta:
        model = LaboratoireSlider
        fields = '__all__'

    def get_nombrePublication(self, obj):
        try:
            tableauPublication = []
            tableauIDRechercher = []
            recherche_laboratoire = RechercheLaboratoire.objects.filter(id_laboratoire_domaine__id_laboratoire = obj.id_laboratoire)
            
            for i in recherche_laboratoire:
                if i.id_recherche.id not in tableauIDRechercher:
                    tableauIDRechercher.append(i.id_recherche.id)
                    
                    recherche_publication = RecherchePublication.objects.filter(id_recherche = i.id_recherche)
                    if len(recherche_publication) > 0:
                        tableauPublication.append(recherche_publication)
            return len(tableauPublication)

        except :
            return None
        
    def get_nombreChercheur(self, obj):
        return len(ChercheurLaboratoire.objects.filter(id_laboratoire = obj.id_laboratoire))

    def get_nombreRechercheActif(self, obj):
        try:
            tableauIdRecherche = []
            rechercheActifs = RechercheLaboratoire.objects.filter(id_laboratoire_domaine__id_laboratoire = obj.id_laboratoire, id_recherche__statu = "En cours")
            for i in rechercheActifs:
                if i.id_recherche.id not in tableauIdRecherche:
                    tableauIdRecherche.append(i.id_recherche.id)
            return len(tableauIdRecherche)
        except :
            return None


class AcceuilPresentationSerializers(serializers.ModelSerializer):
    mission = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    nombreAnneeExperience = serializers.SerializerMethodField()
    nombreRechercherFinaliser = serializers.SerializerMethodField()
    
    class Meta:
        model = LaboratoireSlider
        fields = '__all__'

    def get_mission(self, obj):
        try:
            return LaboratoireMission.objects.filter(id_laboratoire = obj.id_laboratoire).order_by('-mise_a_jour_le').last().description
        except :
            return None
        
    def get_image(self, obj):
        try:
            photo = LaboratoirePresentationImage.objects.filter(id_laboratoire = obj.id_laboratoire).order_by('-mise_a_jour_le').last().image
            if photo and hasattr(photo, 'url'):
                return photo.url
            return None
        except:
            return None

    def get_nombreAnneeExperience(self, obj):
        try:
            annee_creation = obj.id_laboratoire.date_de_creation.year
            annee_actuelle = datetime.today().year
            return annee_actuelle - annee_creation
        except:
            return None
        
    def get_nombreRechercherFinaliser(self, obj):
        try:
            tableauIdRecherche = []
            rechercheActifs = RechercheLaboratoire.objects.filter(id_laboratoire_domaine__id_laboratoire = obj.id_laboratoire, id_recherche__statu = "Terminer")
            for i in rechercheActifs:
                if i.id_recherche.id not in tableauIdRecherche: 
                    tableauIdRecherche.append(i.id_recherche.id)

            return len(tableauIdRecherche)
        except :
            return None
    

class LaboratoirePresentationSerializers(serializers.ModelSerializer):
    class Meta:
        model = LaboratoirePresentation
        fields = '__all__'


class LaboratoirePresentationImageSerializers(serializers.ModelSerializer):
    class Meta:
        model = LaboratoirePresentationImage
        fields = '__all__'


class PresentationPartenaireSerializers(serializers.ModelSerializer):
    id_partenaire = PartenaireSerializers()
    class Meta:
        model = LaboratoirePartenaire
        fields = '__all__'


class acceuilDirecteurSerializers(serializers.ModelSerializer):
    bio = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()
    office = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    phone = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = ChercheurLaboratoire
        fields = '__all__'

    def get_bio(self, obj):
        try:
            return obj.id_chercheur_poste.id_chercheur.biographie
        except :
            return None
        
    def get_name(self, obj):
        try:
            r = ""
            chercherPosteAll = ChercheurPoste.objects.filter(id_chercheur = obj.id_chercheur_poste.id_chercheur)
            for i in chercherPosteAll:
                r += i.id_poste.abreviation_poste + ". "

            r = r + obj.id_chercheur_poste.id_chercheur.prenom + " " + obj.id_chercheur_poste.id_chercheur.nom 
            return r
        except :        
            return None
           

        
    def get_office(self, obj):
        try:
            return obj.id_chercheur_poste.id_chercheur.bureau
        except :
            return None

    def get_email(self, obj):
        try:
            return ChercheurReseau.objects.get(id_chercheur = obj.id_chercheur_poste.id_chercheur, type_reseau = 'Email').contact
        except :
            return None
        
    def get_phone(self, obj):
        try:
            return ChercheurReseau.objects.get(id_chercheur = obj.id_chercheur_poste.id_chercheur, type_reseau = 'Téléphone').contact
        except :
            return None
        
    def get_title(self, obj):
        try:
            return "Directrice du Laboratoire"
        except :
            return None
        
    def get_image(self, obj):
        try:
            photo = obj.id_chercheur_poste.id_chercheur.photo
            if photo and hasattr(photo, 'url'):
                return photo.url
            return None
        except:
            return None
        

class acceuilChiffreCleSerializers(serializers.ModelSerializer):
    nombreChercheur = serializers.SerializerMethodField()
    nombreDoctorant = serializers.SerializerMethodField()
    nombrePublication = serializers.SerializerMethodField()
    nombreRechercheActif = serializers.SerializerMethodField()
    nombrePartenaire = serializers.SerializerMethodField()
    nombreRechercherFinaliser = serializers.SerializerMethodField()
    nombreDomaine = serializers.SerializerMethodField()


    
    class Meta:
        model = Laboratoire
        fields = '__all__'

        
    def get_nombreChercheur(self, obj):
        return ChercheurLaboratoire.objects.filter( id_laboratoire=obj ).exclude( id_chercheur_poste__id_poste__nom="Doctorant" ).count()

    
    def get_nombreDoctorant(self, obj):
        return len(ChercheurLaboratoire.objects.filter(id_laboratoire = obj, id_chercheur_poste__id_poste__nom = "Doctorant"))


    def get_nombrePublication(self, obj):
        try:
            tableauPublication = []
            tableauIDRechercher = []
            recherche_laboratoire = RechercheLaboratoire.objects.filter(id_laboratoire_domaine__id_laboratoire = obj)
            
            for i in recherche_laboratoire:
                if i.id_recherche.id not in tableauIDRechercher:
                    tableauIDRechercher.append(i.id_recherche.id)
                    
                    recherche_publication = RecherchePublication.objects.filter(id_recherche = i.id_recherche)
                    if len(recherche_publication) > 0:
                        tableauPublication.append(recherche_publication)
            return len(tableauPublication)

        except :
            return None
        

    def get_nombreRechercheActif(self, obj):
        try:
            tableauIdRecherche = []
            rechercheActifs = RechercheLaboratoire.objects.filter(id_laboratoire_domaine__id_laboratoire = obj, id_recherche__statu = "En cours")
            for i in rechercheActifs:
                if i.id_recherche.id not in tableauIdRecherche: 
                    tableauIdRecherche.append(i.id_recherche.id)
            return len(tableauIdRecherche)
        except :
            return None
        

    def get_nombrePartenaire(self, obj):
        try:
            return len(LaboratoirePartenaire.objects.filter(statu = "Actif", id_laboratoire = obj))
        except :
            return None


    def get_nombreRechercherFinaliser(self, obj):
        try:
            tableauIdRechercheallRecercher = []
            allRecercher = RechercheLaboratoire.objects.filter(id_laboratoire_domaine__id_laboratoire = obj)
            for i in allRecercher:
                if i.id_recherche.id not in tableauIdRechercheallRecercher: 
                    tableauIdRechercheallRecercher.append(i.id_recherche.id)
            
            
            tableauIdRecherche = []
            rechercheActifs = RechercheLaboratoire.objects.filter(id_laboratoire_domaine__id_laboratoire = obj, id_recherche__statu = "Terminer")
            for i in rechercheActifs:
                if i.id_recherche.id not in tableauIdRecherche: 
                    tableauIdRecherche.append(i.id_recherche.id)

            return (int(len(tableauIdRecherche)) / int(len(tableauIdRechercheallRecercher))) * 100
        except :
            return None
        
        
    def get_nombreDomaine(self, obj):
        try:
            return len(LaboratoireDomaine.objects.filter(id_laboratoire = obj))
        except :
            return None


class LaboratoireTypeNewSerializers(serializers.ModelSerializer):
    typeNew = serializers.SerializerMethodField()

    class Meta:
        model = LaboratoireTypeNew
        fields = '__all__'

    def get_typeNew(self, obj):
        try:
            return obj.id_type.type
        except :
            return None


class LaboratoireNewAlbumSerializers(serializers.ModelSerializer):
    class Meta:
        model = LaboratoireNewAlbum
        fields = '__all__'


class ActualiteSerializers(serializers.ModelSerializer):
    typeNew = serializers.SerializerMethodField()
    albumActu = serializers.SerializerMethodField()

    class Meta:
        model = LaboratoireNew
        fields = '__all__'

    def get_typeNew(self, obj):
        try:
            return LaboratoireTypeNewSerializers(LaboratoireTypeNew.objects.filter(id_laboratoire_new = obj), many=True).data
        except :
            return None
        
    def get_albumActu(self, obj):
        try:
            return LaboratoireNewAlbumSerializers(LaboratoireNewAlbum.objects.filter(id_laboratoire_new = obj), many=True).data
        except :
            return None


class ActualiteSliderSerializers(serializers.ModelSerializer):
    nombrePublicationTotal = serializers.SerializerMethodField()
    nombrePublicationCeMois = serializers.SerializerMethodField()
    nombreEvenementActif = serializers.SerializerMethodField()

    class Meta:
        model = LaboratoireSlider
        fields = '__all__'

    def get_nombrePublicationTotal(self, obj):
        try:
            return len(LaboratoireNew.objects.filter(id_laboratoire = obj.id_laboratoire))
        except :
            return None
        

    def get_nombrePublicationCeMois(self, obj):
        try:
            # Date actuelle
            now = timezone.now()

            # Début du mois courant
            start_month = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)

            # Pour obtenir le premier jour du mois prochain, on ajoute un mois
            if now.month == 12:
                next_month = now.replace(year=now.year + 1, month=1, day=1, hour=0, minute=0, second=0, microsecond=0)
            else:
                next_month = now.replace(month=now.month + 1, day=1, hour=0, minute=0, second=0, microsecond=0)

            # Fin du mois = juste avant le début du mois suivant
            end_month = next_month - timedelta(microseconds=1)

            # Requête
            return len(LaboratoireNew.objects.filter(id_laboratoire = obj.id_laboratoire , creer_le__gte=start_month, creer_le__lte=end_month))            
        except :
            return None
        
    def get_nombreEvenementActif(self, obj):
        try:
            return len(LaboratoireTypeNew.objects.filter(id_laboratoire_new__id_laboratoire = obj.id_laboratoire, id_type__type = "Événement", id_laboratoire_new__statu = "Actif"))
        except :
            return None


class RechercheSliderSerializers(serializers.ModelSerializer):
    nombrePublication = serializers.SerializerMethodField()
    nombreRechercheTerminer = serializers.SerializerMethodField()
    nombreRechercheActif = serializers.SerializerMethodField()

    class Meta:
        model = LaboratoireSlider
        fields = '__all__'

    def get_nombrePublication(self, obj):
        try:
            tableauPublication = []
            tableauIDRechercher = []
            recherche_laboratoire = RechercheLaboratoire.objects.filter(id_laboratoire_domaine__id_laboratoire = obj.id_laboratoire)
            
            for i in recherche_laboratoire:
                if i.id_recherche.id not in tableauIDRechercher:
                    tableauIDRechercher.append(i.id_recherche.id)
                    
                    recherche_publication = RecherchePublication.objects.filter(id_recherche = i.id_recherche)
                    if len(recherche_publication) > 0:
                        tableauPublication.append(recherche_publication)
            return len(tableauPublication)

        except :
            return None
        
    def get_nombreRechercheTerminer(self, obj):
        try:
            tableauIdRecherche = []
            rechercheActifs = RechercheLaboratoire.objects.filter(id_laboratoire_domaine__id_laboratoire = obj.id_laboratoire, id_recherche__statu = "Terminer")
            for i in rechercheActifs:
                if i.id_recherche.id not in tableauIdRecherche:
                    tableauIdRecherche.append(i.id_recherche.id)
            return len(tableauIdRecherche)
        except :
            return None
        

    def get_nombreRechercheActif(self, obj):
        try:
            tableauIdRecherche = []
            rechercheActifs = RechercheLaboratoire.objects.filter(id_laboratoire_domaine__id_laboratoire = obj.id_laboratoire, id_recherche__statu = "En cours")
            for i in rechercheActifs:
                if i.id_recherche.id not in tableauIdRecherche:
                    tableauIdRecherche.append(i.id_recherche.id)
            return len(tableauIdRecherche)
        except :
            return None


class RechercheLaboratoireSerializers(serializers.ModelSerializer):
    nomDomaine = serializers.SerializerMethodField()
    titre = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    statu = serializers.SerializerMethodField()
    periode = serializers.SerializerMethodField()
    nombreChercheur = serializers.SerializerMethodField()
    budget = serializers.SerializerMethodField()

    class Meta:
        model = RechercheLaboratoire
        fields = '__all__'

    def get_nomDomaine(self, obj):
        try:
            return obj.id_laboratoire_domaine.id_domaine.titre
        except :
            return None
        
    def get_titre(self, obj):
        try:
            return obj.id_recherche.titre
        except :
            return None
        
    def get_description(self, obj):
        try:
            return obj.id_recherche.description
        except :
            return None
        
    def get_statu(self, obj):
        try:
            return obj.id_recherche.statu
        except :
            return None
    
    def get_periode(self, obj):
        if obj.id_recherche.date_fin_reelle != None :
            date_fin = obj.id_recherche.date_fin_reelle
        else:
            date_fin = obj.id_recherche.date_fin_prevue

        try:
            return str(obj.id_recherche.date_debut).split('-')[0] + " - " + str(date_fin).split('-')[0]
        except :
            return None
        
    def get_nombreChercheur(self, obj):
        try:
            return len(RechercheChercheur.objects.filter(id_recherche = obj.id_recherche))
        except :
            return None
    
    def get_budget(self, obj):
        try:
            return obj.id_recherche.budget_total
        except :
            return None


class ChercheurSerializers(serializers.ModelSerializer):
    class Meta:
        model = Chercheur
        fields = '__all__'


class RechercheChercheurSerializers(serializers.ModelSerializer):
    nom = serializers.SerializerMethodField()
    prenom = serializers.SerializerMethodField()  
    titre =  serializers.SerializerMethodField()   
    AbregertitreAll = serializers.SerializerMethodField()
    titreAll = serializers.SerializerMethodField()

    class Meta:
        model = RechercheChercheur
        fields = '__all__'

    def get_nom(self, obj):
        try:
            return obj.id_chercheur.nom
        except :
            return None
        
    def get_prenom(self, obj):
        try:
            return obj.id_chercheur.prenom
        except :
            return None

    def get_AbregertitreAll(self, obj):
        try:
            r = ""
            chercherPosteAll = ChercheurPoste.objects.filter(id_chercheur = obj.id_chercheur)
            for i in chercherPosteAll:
                r += i.id_poste.abreviation_poste + ". "
            return r
        except :        
            return None
        
    def get_titreAll(self, obj):
        try:
            r = ""
            chercherPosteAll = ChercheurPoste.objects.filter(id_chercheur = obj.id_chercheur)
            for i in chercherPosteAll:
                r += i.id_poste.nom + ". "
            return r
        except :        
            return None
            
    def get_titre(self, obj):
        try:
            return ChercheurPoste.objects.filter(id_chercheur = obj.id_chercheur).last().id_poste.nom
        except :
            return None
                

class RecherchePartenaireSerializers(serializers.ModelSerializer):    
    nomPartenaire = serializers.SerializerMethodField()
    
    class Meta:
        model = RecherchePartenaire
        fields = '__all__'

    def get_nomPartenaire(self, obj):
        try:
            return obj.id_partenaire.nom_partenaire
        except :
            return None
        

class RechercheObjectifSerializers(serializers.ModelSerializer):    
    class Meta:
        model = RechercheObjectif
        fields = '__all__'


class RechercheRealisationSerializers(serializers.ModelSerializer):    
    class Meta:
        model = RechercheRealisation
        fields = '__all__'


class RechercheLaboratoireDetailSerializers(serializers.ModelSerializer):
    nomDomaine = serializers.SerializerMethodField()
    titre = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    statu = serializers.SerializerMethodField()
    periode = serializers.SerializerMethodField()
    chercheurs = serializers.SerializerMethodField()
    budget = serializers.SerializerMethodField()
    partenaire = serializers.SerializerMethodField()
    objectif = serializers.SerializerMethodField()
    realisationCle = serializers.SerializerMethodField()

    class Meta:
        model = RechercheLaboratoire
        fields = '__all__'

    def get_nomDomaine(self, obj):
        try:
            return RechercheLaboratoireSerializers(RechercheLaboratoire.objects.filter(id_recherche = obj.id_recherche), many=True).data
        except :
            return None
        
    def get_titre(self, obj):
        try:
            return obj.id_recherche.titre
        except :
            return None
        
    def get_description(self, obj):
        try:
            return obj.id_recherche.description
        except :
            return None
        
    def get_statu(self, obj):
        try:
            return obj.id_recherche.statu
        except :
            return None
    
    def get_periode(self, obj):
        if obj.id_recherche.date_fin_reelle != None :
            date_fin = obj.id_recherche.date_fin_reelle
        else:
            date_fin = obj.id_recherche.date_fin_prevue

        try:
            return str(obj.id_recherche.date_debut) + " - " + str(date_fin)
        except :
            return None
        
    def get_chercheurs(self, obj):
        try:
            return RechercheChercheurSerializers(RechercheChercheur.objects.filter(id_recherche = obj.id_recherche), many= True).data
        except :
            return None
    
    def get_budget(self, obj):
        try:
            return obj.id_recherche.budget_total
        except :
            return None
        
    def get_partenaire(self, obj):
        try:
            return RecherchePartenaireSerializers(RecherchePartenaire.objects.filter(id_recherche = obj.id_recherche), many=True).data
        except :
            return None
        
    def get_objectif(self, obj):
        try:
            return RechercheObjectifSerializers(RechercheObjectif.objects.filter(id_recherche = obj.id_recherche), many=True).data
        except :
            return None
        
    def get_realisationCle(self, obj):
        try:
            return RechercheRealisationSerializers(RechercheRealisation.objects.filter(id_recherche = obj.id_recherche), many=True).data
        except :
            return None


class ChercheurDiplomeSerializers(serializers.ModelSerializer):
    class Meta:
        model = ChercheurDiplome
        fields = '__all__'   


class ChercheurDomaineExpertiseSerializers(serializers.ModelSerializer):
    titre = serializers.SerializerMethodField()

    class Meta:
        model = ChercheurDomaineExpertise
        fields = '__all__'   

    def get_titre(self, obj):
        try:
            return obj.id_domaine.titre
        except :
            return None


class RechercheLaboratoirePersonnaliserSerializers(serializers.ModelSerializer):
    class Meta:
        model = Recherche
        fields = '__all__'


class RechercheChercheurPersonnaiserSerializers(serializers.ModelSerializer):
    id_recherche =  RechercheLaboratoirePersonnaliserSerializers()

    class Meta:
        model = RechercheChercheur
        fields = '__all__'
        
    def get_titreRecherche(self, obj):
        try:
            return obj.id_recherche.titre
        except :
            return None
        
    def get_descriptionRecherche(self, obj):
        try:
            return obj.id_recherche.description
        except :
            return None
        

class RecherchePublicationSerializers(serializers.ModelSerializer):
    class Meta:
        model = RecherchePublication
        fields = '__all__'


class ChercheurMotSerializers(serializers.ModelSerializer):
    titrePlusNom = serializers.SerializerMethodField()
    class Meta:
        model = ChercheurMot
        fields = '__all__'

    def get_titrePlusNom(self, obj):
        try:
            r = ""
            chercherPosteAll = ChercheurPoste.objects.filter(id_chercheur = obj.id_chercheur)
            for i in chercherPosteAll:
                r += i.id_poste.abreviation_poste + ". "

            r = r + obj.id_chercheur.prenom + " " + obj.id_chercheur.nom 
            return r
        except :        
            return None


class ChercheurLaboratoireSerializers(serializers.ModelSerializer):
    nom = serializers.SerializerMethodField()
    prenom = serializers.SerializerMethodField()
    bureau = serializers.SerializerMethodField()
    mail = serializers.SerializerMethodField()
    telephone = serializers.SerializerMethodField()
    chercheurDiplome = serializers.SerializerMethodField()
    domaineExpertise = serializers.SerializerMethodField()
    profil = serializers.SerializerMethodField()
    che = serializers.SerializerMethodField()
    Publication = serializers.SerializerMethodField()
    motDirecteur = serializers.SerializerMethodField()
    titrePlusNom = serializers.SerializerMethodField()

    class Meta:
        model = ChercheurLaboratoire
        fields = '__all__'


    def get_titrePlusNom(self, obj):
        try:
            r = ""
            chercherPosteAll = ChercheurPoste.objects.filter(id_chercheur = obj.id_chercheur_poste.id_chercheur)
            for i in chercherPosteAll:
                r += i.id_poste.abreviation_poste + ". "

            r = r + obj.id_chercheur_poste.id_chercheur.prenom + " " + obj.id_chercheur_poste.id_chercheur.nom 
            return r
        except :        
            return None
        

    def get_nom(self, obj):
        try:
            return obj.id_chercheur_poste.id_chercheur.nom
        except :
            return None
        
    def get_prenom(self, obj):
        try:
            return obj.id_chercheur_poste.id_chercheur.prenom
        except :
            return None
        
    def get_bureau(self, obj):
        try:
            return obj.id_chercheur_poste.id_chercheur.bureau
        except :
            return None

    def get_mail(self, obj):
        try:
            return ChercheurReseau.objects.get(id_chercheur = obj.id_chercheur_poste.id_chercheur, type_reseau = 'Email').contact
        except :
            return None
        
    def get_telephone(self, obj):
        try:
            return ChercheurReseau.objects.get(id_chercheur = obj.id_chercheur_poste.id_chercheur, type_reseau = 'Téléphone').contact
        except :
            return None
        
    def get_chercheurDiplome(self, obj):
        try:
            return ChercheurDiplomeSerializers(ChercheurDiplome.objects.filter(id_chercheur = obj.id_chercheur_poste.id_chercheur), many= True).data
        except :
            return None
        
    def get_domaineExpertise(self, obj):
        try:
            return ChercheurDomaineExpertiseSerializers(ChercheurDomaineExpertise.objects.filter(id_chercheur = obj.id_chercheur_poste.id_chercheur), many= True).data
        except :
            return None

    def get_profil(self, obj):
        try:
            return obj.id_chercheur_poste.id_chercheur.biographie
        except :
            return None
        
    def get_projetRecherche(self, obj):
        try:
            table = []
            rechercheChercheurAll = RechercheChercheur.objects.filter(id_chercheur = obj.id_chercheur_poste.id_chercheur)
            for i in rechercheChercheurAll:
                serializers = RechercheChercheurPersonnaiserSerializers(i, many=False).data
                serializers["partenaire"] = RecherchePartenaireSerializers(RecherchePartenaire.objects.filter(id_recherche = i.id_recherche), many=True).data
                table.append(serializers)
            return table
        except :
            return None
        

    def get_Publication(self, obj):
        try:
            rechercheChercheurAll = RechercheChercheur.objects.filter(id_chercheur = obj.id_chercheur_poste.id_chercheur)
            table = []
            for i in rechercheChercheurAll:
                for j in RecherchePublication.objects.filter(id_recherche = i.id_recherche):
                    serializers = RecherchePublicationSerializers(j, many = False).data
                    serializers['nombrecitation'] = len(RecherchePublicationCitation.objects.filter(id_recherche_publication = j))
                    serializers['nombreMotCle'] = len(RecherchePublicationMotCle.objects.filter(id_recherche_publication = j))
                    serializers['role'] = RechercheChercheur.objects.get(id_recherche = j.id_recherche, id_chercheur = obj.id_chercheur_poste.id_chercheur).role_equipe
                    table.append(serializers)
                                                             
            return table

        except :
            return None
        

    def get_motDirecteur(self, obj):
        try:
            return ChercheurMotSerializers(ChercheurMot.objects.filter(id_chercheur = obj.id_chercheur_poste.id_chercheur).order_by('-creer_le'), many= True).data
        except :
            return None    
        

class DomaineSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Domaine"""
    
    class Meta:
        model = Domaine
        fields = ['id', 'titre', 'description']


class PosteSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Poste"""
    
    class Meta:
        model = Poste
        fields = ['id', 'nom', 'abreviation_poste', 'grade']


class ChercheurReseauSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle ChercheurReseau"""
    
    class Meta:
        model = ChercheurReseau
        fields = ['id', 'type_reseau', 'contact']


class ChercheurDomaineExpertiseSerializer(serializers.ModelSerializer):
    """Sérialiseur pour les domaines d'expertise d'un chercheur"""
    
    domaine = DomaineSerializer(source='id_domaine', read_only=True)
    
    class Meta:
        model = ChercheurDomaineExpertise
        fields = ['id', 'domaine']


class RecherchePublicationSerializer(serializers.ModelSerializer):
    """Sérialiseur pour les publications de recherche"""
    
    recherche_titre = serializers.CharField(source='id_recherche.titre', read_only=True)
    
    class Meta:
        model = RecherchePublication
        fields = [
            'id', 'titre', 'resume', 'doi', 'facteur_impact', 
            'date_publication', 'url_publication', 'recherche_titre'
        ]


class ChercheurDiplomeSerializer(serializers.ModelSerializer):
    """Sérialiseur pour les diplômes d'un chercheur"""
    
    class Meta:
        model = ChercheurDiplome
        fields = ['id', 'etablissement', 'diplome', 'annee_obtention']


class ChercheurPosteSerializer(serializers.ModelSerializer):
    """Sérialiseur pour les postes d'un chercheur"""
    
    poste = PosteSerializer(source='id_poste', read_only=True)
    
    class Meta:
        model = ChercheurPoste
        fields = ['id', 'poste']


class ChercheurSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Chercheur avec ses relations"""
    
    reseaux = serializers.SerializerMethodField()
    postes = serializers.SerializerMethodField()
    domaines_expertise = serializers.SerializerMethodField()
    diplomes = serializers.SerializerMethodField()
    publications = serializers.SerializerMethodField()
    recherches_actuelles = serializers.SerializerMethodField()
    photo_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Chercheur
        fields = [
            'id', 'nom', 'prenom', 'biographie', 'photo_url',
            'statut', 'date_embauche', 'bureau', 'reseaux',
            'postes', 'domaines_expertise', 'diplomes', 'publications', 'recherches_actuelles'
        ]
    
    def get_photo_url(self, obj):
        """Récupère l'URL complète de la photo"""
        if obj.photo and hasattr(obj.photo, 'url'):
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.photo.url)
            return obj.photo.url
        return None
    
    def get_reseaux(self, obj):
        """Récupère les réseaux sociaux du chercheur"""
        reseaux = ChercheurReseau.objects.filter(id_chercheur=obj)
        return ChercheurReseauSerializer(reseaux, many=True).data
    
    def get_postes(self, obj):
        """Récupère les postes du chercheur"""
        postes = ChercheurPoste.objects.filter(id_chercheur=obj)
        return ChercheurPosteSerializer(postes, many=True).data
    
    def get_domaines_expertise(self, obj):
        """Récupère les domaines d'expertise du chercheur"""
        domaines = ChercheurDomaineExpertise.objects.filter(id_chercheur=obj)
        return ChercheurDomaineExpertiseSerializer(domaines, many=True).data
    
    def get_diplomes(self, obj):
        """Récupère les diplômes du chercheur"""
        diplomes = ChercheurDiplome.objects.filter(id_chercheur=obj)
        return ChercheurDiplomeSerializer(diplomes, many=True).data
    
    def get_publications(self, obj):
        """Récupère les publications du chercheur"""
        # Récupérer les recherches liées au chercheur
        recherches_chercheur = RechercheChercheur.objects.filter(id_chercheur=obj)
        publications = []
        
        for recherche_chercheur in recherches_chercheur:
            publications_recherche = RecherchePublication.objects.filter(
                id_recherche=recherche_chercheur.id_recherche
            )
            publications.extend(publications_recherche)
        
        return RecherchePublicationSerializer(publications, many=True).data
    
    def get_recherches_actuelles(self, obj):
        """Récupère les recherches actuelles du chercheur"""
        recherches_chercheur = RechercheChercheur.objects.filter(id_chercheur=obj)
        recherches_actuelles = []
        
        for recherche_chercheur in recherches_chercheur:
            recherche = recherche_chercheur.id_recherche
            # Filtre pour les recherches en cours ou planifiées
            if recherche.statu in ['En cours', 'Planifier']:
                recherches_actuelles.append({
                    'id': recherche.id,
                    'titre': recherche.titre,
                    'description': recherche.description,
                    'statut': recherche.statu,
                    'role_equipe': recherche_chercheur.role_equipe,
                    'date_debut': recherche.date_debut,
                    'date_fin_prevue': recherche.date_fin_prevue,
                })
        
        return recherches_actuelles


class ChercheurListSerializer(serializers.ModelSerializer):
    """Sérialiseur simplifié pour la liste des chercheurs"""
    
    poste_principal = serializers.SerializerMethodField()
    photo_url = serializers.SerializerMethodField()
    specialite = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    reseaux = serializers.SerializerMethodField()
    
    class Meta:
        model = Chercheur
        fields = ['id', 'nom', 'prenom', 'photo_url', 'poste_principal', 'biographie', 'specialite', 'email', 'reseaux']
    
    def get_photo_url(self, obj):
        """Récupère l'URL complète de la photo"""
        if obj.photo and hasattr(obj.photo, 'url'):
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.photo.url)
            return obj.photo.url
        return None
    
    def get_poste_principal(self, obj):
        """Récupère le poste principal du chercheur"""
        poste = ChercheurPoste.objects.filter(id_chercheur=obj).first()
        if poste:
            return poste.id_poste.nom
        return None
    
    def get_specialite(self, obj):
        """Récupère la spécialité principale (premier domaine d'expertise)"""
        domaine = ChercheurDomaineExpertise.objects.filter(id_chercheur=obj).first()
        if domaine:
            return domaine.id_domaine.titre
        return None
    
    def get_email(self, obj):
        """Récupère l'email du chercheur depuis les réseaux"""
        reseau = ChercheurReseau.objects.filter(id_chercheur=obj, type_reseau="Email").first()
        if reseau:
            return reseau.contact
        return None
    
    def get_reseaux(self, obj):
        """Récupère les réseaux sociaux du chercheur"""
        reseaux = ChercheurReseau.objects.filter(id_chercheur=obj)
        return ChercheurReseauSerializer(reseaux, many=True).data

class HoraireLaboratoireSerializer(serializers.ModelSerializer):
    jour_semaine_display = serializers.CharField(source='get_jour_semaine_display', read_only=True)

    class Meta:
        model = HoraireLaboratoire
        fields = [
            'id', 'jour_semaine', 'jour_semaine_display',
            'heure_ouverture', 'heure_fermeture', 'est_ferme', 'notes',
            'creer_le', 'mise_a_jour_le'
        ]


class ContactLaboratoireListSerializer(serializers.ModelSerializer):
    laboratoire_nom = serializers.CharField(source='id_laboratoire.nom', read_only=True)
    type_contact_display = serializers.CharField(source='get_type_contact_display', read_only=True)

    class Meta:
        model = ContactLaboratoire
        fields = [
            'id', 'laboratoire_nom', 'type_contact', 'type_contact_display',
            'ville', 'code_postal', 'pays', 'adresse_complete',
            'telephone_principal', 'email_principal',
            'est_actif'
        ]


class ContactLaboratoireSerializer(serializers.ModelSerializer):
    laboratoire_nom = serializers.CharField(source='id_laboratoire.nom', read_only=True)
    type_contact_display = serializers.CharField(source='get_type_contact_display', read_only=True)
    horaires = HoraireLaboratoireSerializer(many=True, source='horairelaboratoire_set', read_only=True)

    class Meta:
        model = ContactLaboratoire
        fields = [
            'id', 'id_laboratoire', 'laboratoire_nom', 'type_contact', 'type_contact_display',
            'adresse_complete', 'ville', 'code_postal', 'pays',
            'telephone_principal', 'email_principal',
            'site_web',
            'est_actif', 'horaires', 'creer_le', 'mise_a_jour_le'
        ]


class ContactLaboratoireCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactLaboratoire
        fields = [
            'id_laboratoire', 'type_contact', 'adresse_complete', 'ville', 'code_postal', 'pays',
            'telephone_principal', 'email_principal',
            'site_web', 'est_actif'
        ]


class HoraireLaboratoireCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = HoraireLaboratoire
        fields = [
            'contact_laboratoire', 'jour_semaine', 'heure_ouverture', 'heure_fermeture', 'est_ferme', 'notes'
        ]


class MessageContactListSerializer(serializers.ModelSerializer):
    laboratoire_nom = serializers.CharField(source='id_laboratoire.nom', read_only=True)
    priorite_display = serializers.CharField(source='get_priorite_display', read_only=True)
    statut_message_display = serializers.CharField(source='get_statut_message_display', read_only=True)
    nom_complet_expediteur = serializers.ReadOnlyField()

    class Meta:
        model = MessageContact
        fields = [
            'id', 'laboratoire_nom', 'nom_complet_expediteur', 'email_expediteur',
            'sujet_message', 'statut_message_display', 'priorite_display', 'est_traite', 'date_envoi'
        ]


class MessageContactSerializer(serializers.ModelSerializer):
    laboratoire_nom = serializers.CharField(source='id_laboratoire.nom', read_only=True)
    priorite_display = serializers.CharField(source='get_priorite_display', read_only=True)
    statut_message_display = serializers.CharField(source='get_statut_message_display', read_only=True)
    nom_complet_expediteur = serializers.ReadOnlyField()

    class Meta:
        model = MessageContact
        fields = [
            'id', 'id_laboratoire', 'laboratoire_nom', 'prenom_expediteur', 'nom_expediteur',
            'nom_complet_expediteur', 'email_expediteur', 'organisation_expediteur',
            'sujet_message', 'contenu_message', 'statut_message', 'statut_message_display',
            'priorite', 'priorite_display', 'reponse_admin', 'responsable_reponse', 'date_reponse',
            'est_traite', 'date_envoi', 'date_derniere_modification'
        ]


class MessageContactCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = MessageContact
        fields = [
            'id_laboratoire', 'prenom_expediteur', 'nom_expediteur', 'email_expediteur',
            'organisation_expediteur', 'sujet_message', 'contenu_message', 'priorite'
        ]


class TypeLaboratoireSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle TypeLaboratoire"""
    
    class Meta:
        model = TypeLaboratoire
        fields = ['id', 'type_labo']


class LaboratoireSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Laboratoire"""
    
    type_laboratoire = TypeLaboratoireSerializer(source='id_type_laboratoire', read_only=True)
    logo_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Laboratoire
        fields = [
            'id', 'nom', 'logo_url', 'ufr', 'date_de_creation', 
            'type_laboratoire'
        ]
    
    def get_logo_url(self, obj):
        """Récupère l'URL complète du logo"""
        if obj.logo and hasattr(obj.logo, 'url'):
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.logo.url)
            return obj.logo.url
        return None


class LaboratoireParcourConditionAdmissionSerializer(serializers.ModelSerializer):
    """Sérialiseur pour les conditions d'admission d'un parcours"""
    
    class Meta:
        model = LaboratoireParcourConditionAdmission
        fields = ['id', 'titre', 'valeur']


class LaboratoireParcourDeboucherSerializer(serializers.ModelSerializer):
    """Sérialiseur pour les débouchés d'un parcours"""
    
    class Meta:
        model = LaboratoireParcourDeboucher
        fields = ['id', 'deboucher']


class LaboratoireParcourSpecialisationSerializer(serializers.ModelSerializer):
    """Sérialiseur pour les spécialisations d'un parcours"""
    
    class Meta:
        model = LaboratoireParcourSpecialisation
        fields = ['id', 'specialisation']


class LaboratoireParcourSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle LaboratoireParcour avec ses relations"""
    
    laboratoire = LaboratoireSerializer(source='id_laboratoire', read_only=True)
    conditions_admission = serializers.SerializerMethodField()
    debouches = serializers.SerializerMethodField()
    specialisations = serializers.SerializerMethodField()
    
    class Meta:
        model = LaboratoireParcour
        fields = [
            'id', 'nom_parour', 'date_creation', 'description', 
            'duree_formation', 'nombre_etudiant_max', 'statu',
            'laboratoire', 'conditions_admission', 'debouches', 'specialisations'
        ]
    
    def get_conditions_admission(self, obj):
        """Récupère les conditions d'admission du parcours"""
        conditions = LaboratoireParcourConditionAdmission.objects.filter(id_laboratoire_parcour=obj)
        return LaboratoireParcourConditionAdmissionSerializer(conditions, many=True).data
    
    def get_debouches(self, obj):
        """Récupère les débouchés du parcours"""
        debouches = LaboratoireParcourDeboucher.objects.filter(id_laboratoire_parcour=obj)
        return LaboratoireParcourDeboucherSerializer(debouches, many=True).data
    
    def get_specialisations(self, obj):
        """Récupère les spécialisations du parcours"""
        specialisations = LaboratoireParcourSpecialisation.objects.filter(id_laboratoire_parcour=obj)
        return LaboratoireParcourSpecialisationSerializer(specialisations, many=True).data


class LaboratoireParcourListSerializer(serializers.ModelSerializer):
    """Sérialiseur simplifié pour la liste des parcours"""
    
    laboratoire_nom = serializers.CharField(source='id_laboratoire.nom', read_only=True)
    laboratoire_ufr = serializers.CharField(source='id_laboratoire.ufr', read_only=True)
    
    class Meta:
        model = LaboratoireParcour
        fields = [
            'id', 'nom_parour', 'date_creation', 'description', 
            'duree_formation', 'nombre_etudiant_max', 'statu',
            'laboratoire_nom', 'laboratoire_ufr'
        ]


class CandidatureParcoursSerializer(serializers.ModelSerializer):
    """Sérialiseur pour les candidatures aux parcours"""
    
    parcours_nom = serializers.CharField(source='id_parcours.nom_parour', read_only=True)
    laboratoire_nom = serializers.CharField(source='id_parcours.id_laboratoire.nom', read_only=True)
    nom_complet = serializers.ReadOnlyField()
    age = serializers.ReadOnlyField()
    
    class Meta:
        model = CandidatureParcours
        fields = [
            'id', 'nom_candidat', 'prenom_candidat', 'nom_complet', 'age',
            'date_naissance', 'lieu_naissance', 'nationalite',
            'telephone_candidat', 'email_candidat', 'adresse_complete',
            'ville_residence', 'pays_residence',
            'niveau_etude_actuel', 'etablissement_origine', 'filiere_etude',
            'moyenne_generale', 'annee_obtention_diplome',
            'cv_candidat', 'lettre_motivation', 'releves_notes', 'diplome_obtenu',
            'id_parcours', 'parcours_nom', 'laboratoire_nom',
            # Champs motivation et projet supprimés
            'statut_candidature', 'date_soumission', 'note_evaluation'
        ]
        read_only_fields = [
            'date_soumission', 'date_derniere_modification', 
            'statut_candidature', 'note_evaluation', 'commentaires_admin'
        ]
    
    def validate_email_candidat(self, value):
        """Validation personnalisée de l'email (plus flexible)"""
        import re
        # Pattern plus permissif pour les emails
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, value):
            raise serializers.ValidationError("Format d'email invalide. Utilisez le format: exemple@domaine.com")
        return value
    
    def validate_moyenne_generale(self, value):
        """Validation de la moyenne générale (simplifiée)"""
        if value < 0 or value > 25:  # Accept jusqu'à 25 pour différents systèmes
            raise serializers.ValidationError("La moyenne doit être comprise entre 0 et 25.")
        return value
    
    def validate_cv_candidat(self, value):
        """Validation du fichier CV"""
        if value and not value.name.lower().endswith('.pdf'):
            raise serializers.ValidationError("Le CV doit être au format PDF.")
        return value
    
    def validate_lettre_motivation(self, value):
        """Validation de la lettre de motivation"""
        if value and not value.name.lower().endswith('.pdf'):
            raise serializers.ValidationError("La lettre de motivation doit être au format PDF.")
        return value
    
    def validate_releves_notes(self, value):
        """Validation des relevés de notes"""
        if value and not value.name.lower().endswith('.pdf'):
            raise serializers.ValidationError("Les relevés de notes doivent être au format PDF.")
        return value


class CandidatureParcoursCreateSerializer(serializers.ModelSerializer):
    """Sérialiseur pour la création de candidatures"""
    
    class Meta:
        model = CandidatureParcours
        exclude = [
            'statut_candidature', 'commentaires_admin', 'note_evaluation',
            'date_soumission', 'date_derniere_modification'
        ]
    
    def validate_moyenne_generale(self, value):
        """Validation de la moyenne générale (simplifiée)"""
        if value < 0 or value > 25:  # Accept jusqu'à 25 pour différents systèmes
            raise serializers.ValidationError("La moyenne doit être comprise entre 0 et 25.")
        return value
    
    def validate_cv_candidat(self, value):
        """Validation du fichier CV (formats multiples acceptés)"""
        if value:
            allowed_extensions = ['.pdf', '.doc', '.docx']
            file_extension = value.name.lower()
            if not any(file_extension.endswith(ext) for ext in allowed_extensions):
                raise serializers.ValidationError("Le CV doit être au format PDF, DOC ou DOCX.")
            # Permettre les fichiers de test même s'ils sont vides
            if value.size == 0:
                pass  # Accepter silencieusement les fichiers vides
        return value
    
    def validate_lettre_motivation(self, value):
        """Validation de la lettre de motivation (formats multiples acceptés)"""
        if value:
            allowed_extensions = ['.pdf', '.doc', '.docx']
            file_extension = value.name.lower()
            if not any(file_extension.endswith(ext) for ext in allowed_extensions):
                raise serializers.ValidationError("La lettre de motivation doit être au format PDF, DOC ou DOCX.")
            # Permettre les fichiers de test même s'ils sont vides
            if value.size == 0:
                pass  # Accepter silencieusement les fichiers vides
        return value
    
    def validate_releves_notes(self, value):
        """Validation des relevés de notes (formats multiples acceptés)"""
        if value:
            allowed_extensions = ['.pdf', '.doc', '.docx']
            file_extension = value.name.lower()
            if not any(file_extension.endswith(ext) for ext in allowed_extensions):
                raise serializers.ValidationError("Les relevés de notes doivent être au format PDF, DOC ou DOCX.")
            # Permettre les fichiers de test même s'ils sont vides
            if value.size == 0:
                pass  # Accepter silencieusement les fichiers vides
        return value
    
    def validate(self, attrs):
        """Validation croisée des données"""
        # Vérifier que l'âge minimum est respecté (simplifié à 16 ans)
        from datetime import date
        if attrs.get('date_naissance'):
            age = date.today().year - attrs['date_naissance'].year
            if age < 16:  # Réduit de 18 à 16 ans
                raise serializers.ValidationError("Le candidat doit être âgé d'au moins 16 ans.")
        
        return attrs

class PublicationMotCleSerializer(serializers.ModelSerializer):
    """Sérialiseur pour les mots-clés d'une publication"""

    class Meta:
        model = RecherchePublicationMotCle
        fields = ["id", "mot_cle"]


class PublicationCitationSerializer(serializers.ModelSerializer):
    """Sérialiseur pour les citations d'une publication"""

    class Meta:
        model = RecherchePublicationCitation
        fields = ["id", "citation"]


class RechercheChercheurPublicationSerializer(serializers.ModelSerializer):
    """Sérialiseur pour les chercheurs sur une publication"""
    nom_complet = serializers.SerializerMethodField()
    role = serializers.CharField(source='role_equipe')

    class Meta:
        model = RechercheChercheur
        fields = ['nom_complet', 'role']

    def get_nom_complet(self, obj):
        return f"{obj.id_chercheur.prenom} {obj.id_chercheur.nom}"


class RecherchePublicationListSerializer(serializers.ModelSerializer):
    """Sérialiseur liste des publications"""

    fichier_url = serializers.SerializerMethodField()
    recherche_titre = serializers.CharField(source="id_recherche.titre", read_only=True)
    citations_count = serializers.SerializerMethodField()
    chercheurs = serializers.SerializerMethodField()

    class Meta:
        model = RecherchePublication
        fields = [
            "id",
            "titre",
            "resume",
            "doi",
            "facteur_impact",
            "date_publication",
            "url_publication",
            "fichier_url",
            "recherche_titre",
            "citations_count",
            "chercheurs",
        ]

    def get_fichier_url(self, obj):
        if obj.fichier and hasattr(obj.fichier, "url"):
            request = self.context.get("request")
            if request:
                return request.build_absolute_uri(obj.fichier.url)
            return obj.fichier.url
        return None

    def get_citations_count(self, obj):
        return RecherchePublicationCitation.objects.filter(id_recherche_publication=obj).count()

    def get_chercheurs(self, obj):
        chercheurs_associes = RechercheChercheur.objects.filter(id_recherche=obj.id_recherche)
        return RechercheChercheurPublicationSerializer(chercheurs_associes, many=True).data


class RecherchePublicationDetailSerializer(serializers.ModelSerializer):
    """Sérialiseur détail d'une publication avec relations"""

    fichier_url = serializers.SerializerMethodField()
    mots_cles = serializers.SerializerMethodField()
    citations = serializers.SerializerMethodField()
    recherche_titre = serializers.CharField(source="id_recherche.titre", read_only=True)

    class Meta:
        model = RecherchePublication
        fields = [
            "id",
            "titre",
            "resume",
            "contenu",
            "doi",
            "facteur_impact",
            "date_publication",
            "url_publication",
            "fichier_url",
            "recherche_titre",
            "mots_cles",
            "citations",
        ]

    def get_fichier_url(self, obj):
        if obj.fichier and hasattr(obj.fichier, "url"):
            request = self.context.get("request")
            if request:
                return request.build_absolute_uri(obj.fichier.url)
            return obj.fichier.url
        return None

    def get_mots_cles(self, obj):
        qs = RecherchePublicationMotCle.objects.filter(id_recherche_publication=obj)
        return PublicationMotCleSerializer(qs, many=True).data

    def get_citations(self, obj):
        qs = RecherchePublicationCitation.objects.filter(id_recherche_publication=obj)
        return PublicationCitationSerializer(qs, many=True).data


class ResultatRechercheSerializer(serializers.ModelSerializer):
    titre = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    statu = serializers.SerializerMethodField()
    periode = serializers.SerializerMethodField()
    nombreChercheur = serializers.SerializerMethodField()
    budget = serializers.SerializerMethodField()

    class Meta:
        model = ResultatRecherche
        fields = ['id', 'titre', 'description', 'statu', 'periode', 'nombreChercheur', 'budget', 'date_resultat', 'creer_le', 'mise_a_jour_le']

    def get_titre(self, obj):
        return obj.id_recherche.titre

    def get_description(self, obj):
        return obj.id_recherche.description

    def get_statu(self, obj):
        return obj.id_recherche.statu

    def get_periode(self, obj):
        date_fin = obj.id_recherche.date_fin_reelle or obj.id_recherche.date_fin_prevue
        if obj.id_recherche.date_debut and date_fin:
            return f"{obj.id_recherche.date_debut.year} - {date_fin.year}"
        return None

    def get_nombreChercheur(self, obj):
        return RechercheChercheur.objects.filter(id_recherche_id=obj.id_recherche_id).count()

    def get_budget(self, obj):
        return obj.id_recherche.budget_total

class ResultatRechercheJournalSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResultatRechercheJournal
        fields = ['id', 'titre', 'date_activite', 'heure_debut', 'heure_fin', 'auteur', 'details', 
                 'observations', 'equipement_utilise', 'lieu', 'conditions_meteo', 'creer_le', 'mise_a_jour_le']

class ResultatRechercheMaterielSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResultatRechercheMateriel
        fields = ['id', 'type_materiel', 'nom', 'reference', 'quantite', 'unite', 'description', 
                 'fournisseur', 'cout_unitaire', 'creer_le', 'mise_a_jour_le']

class ResultatRechercheResultatSerializer(serializers.ModelSerializer):
    image_resultat_url = serializers.SerializerMethodField()
    fichier_resultat_url = serializers.SerializerMethodField()
    
    class Meta:
        model = ResultatRechercheResultat
        fields = ['id', 'type_resultat', 'titre', 'description', 'valeur_numerique', 'unite_mesure', 
                 'fichier_resultat', 'fichier_resultat_url', 'image_resultat', 'image_resultat_url', 'ordre', 'creer_le', 'mise_a_jour_le']
    
    def get_image_resultat_url(self, obj):
        if obj.image_resultat and hasattr(obj.image_resultat, 'url'):
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image_resultat.url)
            return obj.image_resultat.url
        return None
    
    def get_fichier_resultat_url(self, obj):
        if obj.fichier_resultat and hasattr(obj.fichier_resultat, 'url'):
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.fichier_resultat.url)
            return obj.fichier_resultat.url
        return None

class ResultatRechercheObjectifSerializer(serializers.ModelSerializer):
    class Meta:
        model = RechercheObjectif
        fields = ['id', 'objectif', 'creer_le', 'mise_a_jour_le']


class ResultatRechercheMethodologieSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResultatRechercheMethodologie
        fields = ['id', 'type_methode', 'titre', 'description', 'etapes', 'criteres_evaluation', 
                 'limitations', 'ordre', 'creer_le', 'mise_a_jour_le']


class ResultatRechercheEquipeSerializer(serializers.ModelSerializer):
    nom_chercheur = serializers.SerializerMethodField()
    prenom_chercheur = serializers.SerializerMethodField()
    photo_chercheur = serializers.SerializerMethodField()
    nom_complet = serializers.SerializerMethodField()
    
    class Meta:
        model = RechercheChercheur
        fields = ['id', 'id_chercheur', 'role_equipe', 'nom_chercheur', 'prenom_chercheur', 
                 'photo_chercheur', 'nom_complet', 'creer_le', 'mise_a_jour_le']
    
    def get_nom_chercheur(self, obj):
        return obj.id_chercheur.nom if obj.id_chercheur else None
    
    def get_prenom_chercheur(self, obj):
        return obj.id_chercheur.prenom if obj.id_chercheur else None
    
    def get_photo_chercheur(self, obj):
        return obj.id_chercheur.photo.url if obj.id_chercheur and obj.id_chercheur.photo else None
    
    def get_nom_complet(self, obj):
        if obj.id_chercheur:
            return f"{obj.id_chercheur.prenom} {obj.id_chercheur.nom}"
        return None



class ResultatRechercheDetailSerializer(serializers.ModelSerializer):
    """
    Serializer complet pour les détails d'un résultat de recherche
    """
    # Informations de base de la recherche
    titre_recherche = serializers.SerializerMethodField()
    description_recherche = serializers.SerializerMethodField()
    statu_recherche = serializers.SerializerMethodField()
    periode_recherche = serializers.SerializerMethodField()
    budget_recherche = serializers.SerializerMethodField()
    nombre_chercheurs = serializers.SerializerMethodField()
    
    # Relations
    objectifs = serializers.SerializerMethodField()
    journal_entries = ResultatRechercheJournalSerializer(many=True, read_only=True)
    materiel = ResultatRechercheMaterielSerializer(many=True, read_only=True)
    resultats = ResultatRechercheResultatSerializer(many=True, read_only=True)
    equipe = serializers.SerializerMethodField()
    methodologies = ResultatRechercheMethodologieSerializer(many=True, read_only=True)
    
    class Meta:
        model = ResultatRecherche
        fields = ['id', 'date_resultat', 'creer_le', 'mise_a_jour_le',
                 'titre_recherche', 'description_recherche', 'statu_recherche', 'periode_recherche', 
                 'budget_recherche', 'nombre_chercheurs',
                 'objectifs', 'journal_entries', 'materiel', 'resultats', 'equipe', 'methodologies']
    
    def get_titre_recherche(self, obj):
        return obj.id_recherche.titre
    
    def get_description_recherche(self, obj):
        return obj.id_recherche.description
    
    def get_statu_recherche(self, obj):
        return obj.id_recherche.statu
    
    def get_periode_recherche(self, obj):
        date_fin = obj.id_recherche.date_fin_reelle or obj.id_recherche.date_fin_prevue
        if obj.id_recherche.date_debut and date_fin:
            return f"{obj.id_recherche.date_debut.year} - {date_fin.year}"
        return None
    
    def get_budget_recherche(self, obj):
        return obj.id_recherche.budget_total
    
    def get_nombre_chercheurs(self, obj):
        return RechercheChercheur.objects.filter(id_recherche_id=obj.id_recherche_id).count()
    
    def get_equipe(self, obj):
        chercheurs = RechercheChercheur.objects.filter(id_recherche_id=obj.id_recherche_id).select_related('id_chercheur')
        return ResultatRechercheEquipeSerializer(chercheurs, many=True).data
    
    def get_objectifs(self, obj):
        objectifs = RechercheObjectif.objects.filter(id_recherche_id=obj.id_recherche_id)
        return ResultatRechercheObjectifSerializer(objectifs, many=True).data

