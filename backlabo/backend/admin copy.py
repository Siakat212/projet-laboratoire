from django.contrib import admin
from .models import *


class ChercheurDiplomeInline(admin.TabularInline):
    model = ChercheurDiplome
    extra = 1
    # multiple allowed (no max_num)


class ChercheurDomaineExpertiseInline(admin.TabularInline):
    model = ChercheurDomaineExpertise
    extra = 1
    # multiple allowed (no max_num)


class ChercheurReseauInline(admin.TabularInline):
    model = ChercheurReseau
    extra = 1
    # multiple allowed (no max_num)


class ChercheurPosteInline(admin.TabularInline):
    model = ChercheurPoste
    extra = 1
    max_num = 1


class ChercheurLaboratoireInline(admin.TabularInline):
    model = ChercheurLaboratoire
    extra = 1
    max_num = 1
    

@admin.register(Chercheur)
class ChercheurAdmin(admin.ModelAdmin):
    list_display = ("prenom", "nom", "statut", "date_embauche")
    list_filter = ("statut", "date_embauche")
    search_fields = ("nom", "prenom", "biographie")
    ordering = ("nom",)
    inlines = [
        ChercheurDiplomeInline,
        ChercheurDomaineExpertiseInline,
        ChercheurReseauInline,
        ChercheurPosteInline,
    ]


@admin.register(ChercheurDiplome)
class ChercheurDiplomeAdmin(admin.ModelAdmin):
    list_display = ("id_chercheur", "diplome", "etablissement", "annee_obtention")
    list_filter = ("annee_obtention", "etablissement")
    search_fields = ("diplome", "etablissement", "id_chercheur__nom", "id_chercheur__prenom")
    ordering = ("-annee_obtention",)


@admin.register(ChercheurDomaineExpertise)
class ChercheurDomaineExpertiseAdmin(admin.ModelAdmin):
    list_display = ("id_chercheur", "id_domaine")
    search_fields = ("id_domaine__titre", "id_chercheur__nom", "id_chercheur__prenom")
    list_filter = ("id_domaine__titre",)


@admin.register(ChercheurMot)
class ChercheurMotAdmin(admin.ModelAdmin):
    list_display = ("id_chercheur", "titre", "date")
    search_fields = ("titre", "mot", "id_chercheur__nom", "id_chercheur__prenom")
    list_filter = ("date",)
    ordering = ("-date",)


@admin.register(Poste)
class PosteAdmin(admin.ModelAdmin):
    list_display = ("nom", "abreviation_poste", "grade")
    search_fields = ("nom", "abreviation_poste", "grade")
    ordering = ("nom",)


@admin.register(ChercheurPoste)
class ChercheurPosteAdmin(admin.ModelAdmin):
    list_display = ("id_chercheur", "id_poste")
    search_fields = (
        "id_chercheur__nom",
        "id_chercheur__prenom",
        "id_poste__nom",
        "id_poste__abreviation_poste",
    )
    list_filter = ("id_poste__grade",)





ChercheurPosteAdmin.inlines = [ChercheurLaboratoireInline]


@admin.register(ChercheurReseau)
class ChercheurReseauAdmin(admin.ModelAdmin):
    list_display = ("id_chercheur", "type_reseau", "contact")
    search_fields = (
        "contact",
        "id_chercheur__nom",
        "id_chercheur__prenom",
        "type_reseau",
    )
    list_filter = ("type_reseau",)


@admin.register(TypeLaboratoire)
class TypeLaboratoireAdmin(admin.ModelAdmin):
    list_display = ("type_labo",)
    search_fields = ("type_labo",)
    ordering = ("type_labo",)


@admin.register(Laboratoire)
class LaboratoireAdmin(admin.ModelAdmin):
    list_display = ("nom", "id_type_laboratoire", "ufr", "date_de_creation")
    search_fields = ("nom", "ufr", "id_type_laboratoire__type_labo")
    list_filter = ("id_type_laboratoire", "date_de_creation")
    ordering = ("nom",)


@admin.register(ChercheurLaboratoire)
class ChercheurLaboratoireAdmin(admin.ModelAdmin):
    list_display = ("id_chercheur_poste__id_chercheur", "id_laboratoire")
    search_fields = (
        "id_chercheur_poste__id_chercheur__nom",
        "id_chercheur_poste__id_chercheur__prenom",
        "id_laboratoire__nom",
    )
    list_filter = ("id_laboratoire",)


@admin.register(Domaine)
class DomaineAdmin(admin.ModelAdmin):
    list_display = ("titre", "description")
    search_fields = ("titre", "description")
    ordering = ("titre",)


@admin.register(LaboratoireDomaine)
class LaboratoireDomaineAdmin(admin.ModelAdmin):
    list_display = ("id_laboratoire", "id_domaine")
    search_fields = ("id_laboratoire__nom", "id_domaine__titre")
    list_filter = ("id_laboratoire", "id_domaine")


@admin.register(LaboratoireNew)
class LaboratoireNewAdmin(admin.ModelAdmin):
    list_display = ("titre", "id_laboratoire", "statu", "date_realisation_debut", "date_realisation_fin")
    search_fields = ("titre", "extrait", "phrase_cle", "contenu_complet")
    list_filter = ("statu", "date_realisation_debut", "id_laboratoire")
    ordering = ("-date_realisation_debut",)


@admin.register(LaboratoireParcour)
class LaboratoireParcourAdmin(admin.ModelAdmin):
    list_display = (
        "nom_parour",
        "id_laboratoire",
        "statu",
        "date_creation",
        "duree_formation",
        "nombre_etudiant_max",
    )
    search_fields = ("nom_parour", "description", "id_laboratoire__nom")
    list_filter = ("statu", "date_creation", "id_laboratoire")
    ordering = ("nom_parour",)

@admin.register(LaboratoirePageBlockEntete)
class LaboratoirePageBlockEnteteAdmin(admin.ModelAdmin):
    list_display = (
        "id_laboratoire",
        "id_page",
        "block",
        "titre",
        "description",
    )
    search_fields = ("titre", "id_page__titre", "id_laboratoire__nom")
    list_filter = ("block", "creer_le", "id_laboratoire")
    ordering = ("titre",)


@admin.register(LaboratoireParcourConditionAdmission)
class LaboratoireParcourConditionAdmissionAdmin(admin.ModelAdmin):
    list_display = ("titre", "valeur", "id_laboratoire_parcour")
    search_fields = ("titre", "valeur", "id_laboratoire_parcour__nom_parour")
    list_filter = ("id_laboratoire_parcour",)


@admin.register(LaboratoireParcourDeboucher)
class LaboratoireParcourDeboucherAdmin(admin.ModelAdmin):
    list_display = ("deboucher", "id_laboratoire_parcour")
    search_fields = ("deboucher", "id_laboratoire_parcour__nom_parour")
    list_filter = ("id_laboratoire_parcour",)


@admin.register(LaboratoireParcourSpecialisation)
class LaboratoireParcourSpecialisationAdmin(admin.ModelAdmin):
    list_display = ("specialisation", "id_laboratoire_parcour")
    search_fields = ("specialisation", "id_laboratoire_parcour__nom_parour")
    list_filter = ("id_laboratoire_parcour",)


@admin.register(Partenaire)
class PartenaireAdmin(admin.ModelAdmin):
    list_display = (
        "nom_partenaire",
        "pays",
        "ville",
        "date_debut_partenariat",
        "date_fin_partenariat",
    )
    search_fields = (
        "nom_partenaire",
        "pays",
        "ville",
        "site_web",
        "email",
        "telephone",
    )
    list_filter = ("pays", "ville")
    ordering = ("nom_partenaire",)


@admin.register(LaboratoirePartenaire)
class LaboratoirePartenaireAdmin(admin.ModelAdmin):
    list_display = ("id_laboratoire", "id_partenaire", "type_partenaire", "statu")
    search_fields = ("id_laboratoire__nom", "id_partenaire__nom_partenaire", "type_partenaire",)
    list_filter = ("id_laboratoire", "id_partenaire", "statu", "type_partenaire",)


@admin.register(LaboratoireMission)
class LaboratoireMissionAdmin(admin.ModelAdmin):
    list_display = ("id_laboratoire", "annee_creation", "budget_annuel", "monnaie")
    search_fields = ("id_laboratoire__nom", "description")
    list_filter = ("annee_creation", "monnaie")
    ordering = ("-annee_creation",)


@admin.register(LaboratoirePresentation)
class LaboratoirePresentationAdmin(admin.ModelAdmin):
    list_display = ("id_laboratoire", "titre", "description")
    search_fields = ("id_laboratoire__nom", 'titre')


@admin.register(LaboratoirePresentationImage)
class LaboratoirePresentationImageAdmin(admin.ModelAdmin):
    list_display = ("id_laboratoire", "image")


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ("titre",)
    search_fields = ("titre",)
    ordering = ("titre",)


@admin.register(LaboratoireSlider)
class LaboratoireSliderAdmin(admin.ModelAdmin):
    list_display = ("titre", "id_page", "id_laboratoire")
    search_fields = ("titre", "description", "id_page__titre", "id_laboratoire__nom")
    list_filter = ("id_page", "id_laboratoire")
    ordering = ("titre",)


@admin.register(Type)
class TypeAdmin(admin.ModelAdmin):
    list_display = ("type",)
    search_fields = ("type",)
    ordering = ("type",)


@admin.register(LaboratoireTypeNew)
class LaboratoireTypeNewAdmin(admin.ModelAdmin):
    list_display = ("id_laboratoire_new", "id_type")
    search_fields = ("id_laboratoire_new__titre", "id_type__type")
    list_filter = ("id_type", "id_laboratoire_new__id_laboratoire")


@admin.register(LaboratoireNewAlbum)
class LaboratoireNewAlbumAdmin(admin.ModelAdmin):
    list_display = ("id_laboratoire_new", "image")
    search_fields = ("id_laboratoire_new__titre",)
    list_filter = ("id_laboratoire_new__id_laboratoire",)


@admin.register(Recherche)
class RechercheAdmin(admin.ModelAdmin):
    list_display = (
        "titre",
        "statu",
        "date_debut",
        "date_fin_prevue",
        "date_fin_reelle",
        "budget_total",
    )
    search_fields = ("titre", "description")
    list_filter = ("statu", "date_debut", "date_fin_prevue", "date_fin_reelle")
    ordering = ("-date_debut",)


@admin.register(RechercheChercheur)
class RechercheChercheurAdmin(admin.ModelAdmin):
    list_display = ("id_recherche", "id_chercheur", "role_equipe")
    search_fields = (
        "id_recherche__titre",
        "id_chercheur__nom",
        "id_chercheur__prenom",
    )
    list_filter = ("role_equipe", "id_recherche")


@admin.register(RecherchePhase)
class RecherchePhaseAdmin(admin.ModelAdmin):
    list_display = ("phase",)
    search_fields = ("phase",)
    ordering = ("phase",)


@admin.register(RechercheChronologie)
class RechercheChronologieAdmin(admin.ModelAdmin):
    list_display = ("id_recherche", "id_recherche_phase", "titre", "date_debut", "date_fin", "etat")
    search_fields = ("titre", "id_recherche__titre", "id_recherche_phase__phase")
    list_filter = ("etat", "id_recherche", "id_recherche_phase")
    ordering = ("date_debut",)


@admin.register(RecherchePublication)
class RecherchePublicationAdmin(admin.ModelAdmin):
    list_display = (
        "titre",
        "id_recherche",
        "doi",
        "facteur_impact",
        "date_publication",
    )
    search_fields = ("titre", "resume", "doi", "url_publication", "id_recherche__titre")
    list_filter = ("date_publication", "id_recherche")
    ordering = ("-date_publication",)


@admin.register(RecherchePublicationCitation)
class RecherchePublicationCitationAdmin(admin.ModelAdmin):
    list_display = ("citation", "id_recherche_publication")
    search_fields = ("citation", "id_recherche_publication__titre")
    list_filter = ("id_recherche_publication",)


@admin.register(RecherchePublicationMotCle)
class RecherchePublicationMotCleAdmin(admin.ModelAdmin):
    list_display = ("mot_cle", "id_recherche_publication")
    search_fields = ("mot_cle", "id_recherche_publication__titre")
    list_filter = ("id_recherche_publication",)


@admin.register(RechercheRealisation)
class RechercheRealisationAdmin(admin.ModelAdmin):
    list_display = ("titre", "id_recherche", "date_realisation", "impact", "lien_externe")
    search_fields = ("titre", "description", "impact", "id_recherche__titre")
    list_filter = ("date_realisation", "id_recherche")
    ordering = ("-date_realisation",)


@admin.register(RechercheLaboratoire)
class RechercheLaboratoireAdmin(admin.ModelAdmin):
    list_display = ("id_laboratoire_domaine", "id_recherche")
    search_fields = ("id_laboratoire_domaine__id_laboratoire__nom", "id_recherche__titre", 'id_laboratoire_domaine__id_domaine__titre')
    list_filter = ("id_laboratoire_domaine__id_laboratoire", "id_recherche", "id_laboratoire_domaine__id_domaine")


@admin.register(RechercheObjectif)
class RechercheObjectifAdmin(admin.ModelAdmin):
    list_display = ("objectif", "id_recherche")
    search_fields = ("objectif", "id_recherche__titre")
    list_filter = ("id_recherche",)


@admin.register(RecherchePartenaire)
class RecherchePartenaireAdmin(admin.ModelAdmin):
    list_display = (
        "id_recherche",
        "id_partenaire",
        "type_collaboration",
        "contribution_partenaire",
        "contribution_laboratoire",
        "date_debut",
        "date_fin",
        "montant_financement",
        "monnaie",
    )
    search_fields = (
        "id_recherche__titre",
        "id_partenaire__nom_partenaire",
        "type_collaboration",
    )
    list_filter = ("type_collaboration", "id_recherche", "id_partenaire", "monnaie")
    ordering = ("-date_debut",)
