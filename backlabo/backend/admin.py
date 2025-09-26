from django.contrib import admin
from django.core.exceptions import ValidationError
from django.forms.models import BaseInlineFormSet
from .models import *


class RequireExactlyOneFormSet(BaseInlineFormSet):
    def clean(self):
        super().clean()
        valid_forms_count = 0
        for form in self.forms:
            if not hasattr(form, "cleaned_data"):
                continue
            if form.cleaned_data.get("DELETE"):
                continue
            if form.cleaned_data:
                valid_forms_count += 1
        if valid_forms_count != 1:
            raise ValidationError("Vous devez renseigner exactement 1 élément.")


class RequireAtLeastOneFormSet(BaseInlineFormSet):
    def clean(self):
        super().clean()
        valid_forms_count = 0
        for form in self.forms:
            if not hasattr(form, "cleaned_data"):
                continue
            if form.cleaned_data.get("DELETE"):
                continue
            if form.cleaned_data:
                valid_forms_count += 1
        if valid_forms_count < 1:
            raise ValidationError("Veuillez ajouter au moins 1 élément.")


class ChercheurDiplomeInline(admin.TabularInline):
    model = ChercheurDiplome
    extra = 1
    min_num = 1
    validate_min = True
    formset = RequireAtLeastOneFormSet


class ChercheurDomaineExpertiseInline(admin.TabularInline):
    model = ChercheurDomaineExpertise
    extra = 1
    min_num = 1
    validate_min = True
    formset = RequireAtLeastOneFormSet


class ChercheurReseauInline(admin.TabularInline):
    model = ChercheurReseau
    extra = 1
    min_num = 1
    validate_min = True
    formset = RequireAtLeastOneFormSet


class ChercheurPosteInline(admin.TabularInline):
    model = ChercheurPoste
    extra = 1
    min_num = 1
    max_num = 1
    validate_min = True
    validate_max = True
    formset = RequireExactlyOneFormSet


class ChercheurLaboratoireInline(admin.TabularInline):
    model = ChercheurLaboratoire
    extra = 1
    min_num = 1
    max_num = 1
    validate_min = True
    validate_max = True
    formset = RequireExactlyOneFormSet


class LaboratoirePageBlockEnteteInline(admin.TabularInline):
    model = LaboratoirePageBlockEntete
    extra = 1
    min_num = 1
    validate_min = True
    formset = RequireAtLeastOneFormSet
    # Début: empêcher la suppression des données existantes tout en permettant l'ajout
    can_delete = False
    def has_delete_permission(self, request, obj=None):
        return False
    # Fin: empêcher la suppression des données existantes tout en permettant l'ajout


class LaboratoireDomaineInline(admin.TabularInline):
    model = LaboratoireDomaine
    extra = 1
    min_num = 1
    validate_min = True
    formset = RequireAtLeastOneFormSet


class LaboratoireParcourInline(admin.TabularInline):
    model = LaboratoireParcour
    extra = 1
    min_num = 1
    validate_min = True
    formset = RequireAtLeastOneFormSet


class LaboratoirePresentationInline(admin.TabularInline):
    model = LaboratoirePresentation
    extra = 1
    min_num = 1
    validate_min = True
    formset = RequireAtLeastOneFormSet


class LaboratoireSliderInline(admin.TabularInline):
    model = LaboratoireSlider
    extra = 1
    min_num = 1
    validate_min = True
    formset = RequireAtLeastOneFormSet
    # Début: empêcher la suppression des données existantes tout en permettant l'ajout
    can_delete = False
    def has_delete_permission(self, request, obj=None):
        return False
    # Fin: empêcher la suppression des données existantes tout en permettant l'ajout

class LaboratoirePartenaireInline(admin.TabularInline):
    model = LaboratoirePartenaire

class LaboratoirePresentationImageInline(admin.TabularInline):
    model = LaboratoirePresentationImage
    extra = 1
    min_num = 1
    max_num = 1
    validate_min = True
    validate_max = True
    formset = RequireExactlyOneFormSet


class LaboratoireMissionInline(admin.TabularInline):
    model = LaboratoireMission
    extra = 1
    min_num = 1
    max_num = 1
    validate_min = True
    validate_max = True
    formset = RequireExactlyOneFormSet


class LaboratoireNewAlbumInline(admin.TabularInline):
    model = LaboratoireNewAlbum


class LaboratoireTypeNewInline(admin.TabularInline):
    model = LaboratoireTypeNew
    extra = 1
    min_num = 1
    validate_min = True
    formset = RequireAtLeastOneFormSet


class RechercheChercheurInline(admin.TabularInline):
    model = RechercheChercheur
    extra = 1
    min_num = 1
    validate_min = True
    formset = RequireAtLeastOneFormSet


class RechercheLaboratoireInline(admin.TabularInline):
    model = RechercheLaboratoire
    extra = 1
    min_num = 1
    validate_min = True
    formset = RequireAtLeastOneFormSet


class RechercheObjectifInline(admin.TabularInline):
    model = RechercheObjectif
    extra = 1
    min_num = 1
    validate_min = True
    formset = RequireAtLeastOneFormSet


class RecherchePartenaireInline(admin.TabularInline):
    model = RecherchePartenaire


class RecherchePublicationCitationInline(admin.TabularInline):
    model = RecherchePublicationCitation


class RecherchePublicationMotCleInline(admin.TabularInline):
    model = RecherchePublicationMotCle
    extra = 1
    min_num = 1
    validate_min = True
    formset = RequireAtLeastOneFormSet


class LaboratoireParcourDeboucherInline(admin.TabularInline):
    model = LaboratoireParcourDeboucher
    extra = 1
    min_num = 1
    validate_min = True
    formset = RequireAtLeastOneFormSet


class LaboratoireParcourConditionAdmissionInline(admin.TabularInline):
    model = LaboratoireParcourConditionAdmission
    extra = 1
    min_num = 1
    validate_min = True
    formset = RequireAtLeastOneFormSet


class LaboratoireParcourSpecialisationInline(admin.TabularInline):
    model = LaboratoireParcourSpecialisation


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

class LaboratoireAdmin(admin.ModelAdmin):
    list_display = ("nom", "id_type_laboratoire", "ufr", "date_de_creation")
    search_fields = ("nom", "ufr", "id_type_laboratoire__type_labo")
    list_filter = ("id_type_laboratoire", "date_de_creation")
    ordering = ("nom",)
    inlines = [
        LaboratoirePresentationInline,
        LaboratoirePresentationImageInline,
        LaboratoireMissionInline,
        LaboratoireDomaineInline,
        LaboratoireParcourInline,
        LaboratoirePageBlockEnteteInline,
        LaboratoireSliderInline,
        LaboratoirePartenaireInline
    ]


class LaboratoireNewAdmin(admin.ModelAdmin):
    list_display = ("titre", "id_laboratoire", "statu", "date_realisation_debut", "date_realisation_fin")
    search_fields = ("titre", "extrait", "phrase_cle", "contenu_complet")
    list_filter = ("statu", "date_realisation_debut", "id_laboratoire")
    ordering = ("-date_realisation_debut",)
    inlines = [
        LaboratoireNewAlbumInline,
        LaboratoireTypeNewInline,
    ]



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
    inlines = [
        RechercheObjectifInline,
        RechercheLaboratoireInline,
        RechercheChercheurInline,
        RecherchePartenaireInline,
    ]


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
    inlines = [
        RecherchePublicationCitationInline,
        RecherchePublicationMotCleInline
    ]


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
    inlines = [
        LaboratoireParcourDeboucherInline,
        LaboratoireParcourConditionAdmissionInline,
        LaboratoireParcourSpecialisationInline
    ]




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






@admin.register(TypeLaboratoire)
class TypeLaboratoireAdmin(admin.ModelAdmin):
    list_display = ("type_labo",)
    search_fields = ("type_labo",)
    ordering = ("type_labo",)





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




@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ("titre",)
    search_fields = ("titre",)
    ordering = ("titre",)



@admin.register(Type)
class TypeAdmin(admin.ModelAdmin):
    list_display = ("type",)
    search_fields = ("type",)
    ordering = ("type",)




class RechercheRealisationAdmin(admin.ModelAdmin):
    list_display = ("titre", "id_recherche", "date_realisation", "impact", "lien_externe")
    search_fields = ("titre", "description", "impact", "id_recherche__titre")
    list_filter = ("date_realisation", "id_recherche")
    ordering = ("-date_realisation",)


class CandidatureParcoursAdmin(admin.ModelAdmin):
    list_display = ("nom_candidat", "prenom_candidat", "nationalite", "date_naissance", "telephone_candidat", "pays_residence", "niveau_etude_actuel")
    search_fields = ("nom_candidat", "prenom_candidat", "moyenne_generale", "id_parcours__nom_parour")
    list_filter = ("date_soumission", "id_parcours__nom_parour")
    ordering = ("date_soumission",)


class ContactLaboratoireAdmin(admin.ModelAdmin):
    list_display = ("id_laboratoire__nom", "telephone_principal", "email_principal", "adresse_complete")
    search_fields = ("id_laboratoire__nom", "email_principal", "adresse_complete")
    list_filter = ("creer_le",)
    ordering = ("creer_le",)


class HoraireLaboratoireAdmin(admin.ModelAdmin):
    list_display = ("contact_laboratoire__id_laboratoire__nom", "contact_laboratoire__type_contact", "jour_semaine", "heure_ouverture", "heure_fermeture", "est_ferme")
    search_fields = ("contact_laboratoire__id_laboratoire__nom", "contact_laboratoire__type_contact")
    list_filter = ("jour_semaine", "heure_ouverture", "heure_fermeture")
    ordering = ("creer_le",)


class MessageContactAdmin(admin.ModelAdmin):
    list_display = ("id_laboratoire__nom", "prenom_expediteur", "nom_expediteur", "email_expediteur", "sujet_message", "statut_message")
    search_fields = ("id_laboratoire__nom", "email_expediteur")
    list_filter = ("statut_message",)
    ordering = ("date_envoi",)



# Registration des admin classes sous la section "Important"
admin.site.register(Chercheur, ChercheurAdmin)
admin.site.register(Laboratoire, LaboratoireAdmin)
admin.site.register(LaboratoireNew, LaboratoireNewAdmin)
admin.site.register(Recherche, RechercheAdmin)
admin.site.register(RecherchePublication, RecherchePublicationAdmin)
admin.site.register(LaboratoireParcour, LaboratoireParcourAdmin)
admin.site.register(ChercheurMot, ChercheurMotAdmin)
admin.site.register(ChercheurLaboratoire, ChercheurLaboratoireAdmin)
admin.site.register(RechercheRealisation, RechercheRealisationAdmin)



admin.site.register(CandidatureParcours, CandidatureParcoursAdmin)
admin.site.register(ContactLaboratoire, ContactLaboratoireAdmin)
admin.site.register(HoraireLaboratoire, HoraireLaboratoireAdmin)
admin.site.register(MessageContact, MessageContactAdmin)