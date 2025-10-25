from django.contrib import admin
from django.urls import path, include
from backend.views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.routers import DefaultRouter


routeur = DefaultRouter()
routeur.register(r'chercheurs', ChercheurViewSet)
routeur.register(r'laboratoires', LaboratoireViewSet)
routeur.register(r'parcours', LaboratoireParcourViewSet)
routeur.register(r'candidatures', CandidatureParcoursViewSet)
routeur.register(r'publications', RecherchePublicationViewSet)
routeur.register(r'contacts', ContactLaboratoireViewSet)
routeur.register(r'horaires', HoraireLaboratoireViewSet)
routeur.register(r'messages', MessageContactViewSet)

urlpatterns = [
    path('labo_api/', include(routeur.urls)),

    path('<int:id_laboratoire>/labo_api/laboratoire', laboratoire , name = 'laboratoire'),
    path('<int:id_laboratoire>/labo_api/enteteGeneral', enteteGeneral , name = 'enteteGeneral'),
    path('<int:id_laboratoire>/labo_api/presentation', presentation , name = 'presentation'),
    path('<int:id_laboratoire>/labo_api/presentation_image', presentationImage , name = 'presentationImage'),
    path('<int:id_laboratoire>/labo_api/presentation_mission', presentationMission , name = 'presentationMission'),
    path('<int:id_laboratoire>/labo_api/presentation_domaine', presentationDomaine , name = 'presentationDomaine'),
    path('<int:id_laboratoire>/labo_api/presentation_slider', presentationSlider , name = 'presentationSlider'),
    path('<int:id_laboratoire>/labo_api/presentation_partenaire', presentationPartenaire , name = 'presentationPartenaire'),
    path('<int:id_laboratoire>/labo_api/acceuil_slider', acceuilSlider , name = 'acceuilSlider'),
    path('<int:id_laboratoire>/labo_api/acceuil_presentation', acceuilPresentation , name = 'acceuilPresentation'),
    path('<int:id_laboratoire>/labo_api/acceuil_directeur', acceuilDirecteur , name = 'acceuilDirecteur'),
    path('<int:id_laboratoire>/labo_api/acceuil_chiffre', acceuilChiffre , name = 'acceuilChiffre'),
    path('<int:id_laboratoire>/labo_api/acceuil_actualite', acceuilActualite , name = 'acceuilActualite'),
    path('<int:id_laboratoire>/labo_api/actualite_slider', actualiteSlider , name = 'actualiteSlider'),
    path('<int:id_laboratoire>/labo_api/actualiteAll', actualiteAll , name = 'actualiteAll'),
    path('<int:id_laboratoire>/labo_api/actualite/<int:id>', actualiteDetail , name = 'ActualiteDetail'),
    path('<int:id_laboratoire>/labo_api/recherche_slider', rechercheSlider , name = 'rechercheSlider'),
    path('<int:id_laboratoire>/labo_api/rechercheAll', rechercheAll , name = 'rechercheAll'),
    path('<int:id_laboratoire>/labo_api/detail_recherch/<int:id>', detailRecherche , name = 'detailRecherche'),
        path('<int:id_laboratoire>/labo_api/resultat_recherche_all', resultatRechercheAll , name = 'resultatRechercheAll'),
    path('<int:id_laboratoire>/labo_api/detail_resultat_recherche/<int:id>', detailResultatRecherche , name = 'detailResultatRecherche'),
    path('<int:id_laboratoire>/labo_api/directeur', directeur , name = 'directeur'),
    path('<int:id_laboratoire>/labo_api/detail_mot_directeur/<int:id>', directeurMotDirecteur , name = 'directeurMotDirecteur'),


]
