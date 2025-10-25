import { Constants } from "@/constants/Constants";

// Configuration de l'API pour le projet Una
export const ApiConfig = {
  BASE_URL: Constants.urlDomaine + "labo_api/",
  ENDPOINTS: {
    CHERCHEURS: 'chercheurs/',
    CHERCHEUR_DETAIL: (id: number) => `chercheurs/${id}/`,
    LABORATOIRES: '/laboratoires/',
    LABORATOIRE_DETAIL: (id: number) => `laboratoires/${id}/`,
    LABORATOIRE_PARCOURS: (id: number) => `laboratoires/${id}/parcours/`,
    PARCOURS: `parcours/?laboratoire_id=${Constants.idLaboratoire}`,
    PARCOURS_DETAIL: (id: number) => `parcours/${id}/`,
    CANDIDATURES: 'candidatures/',
    CANDIDATURE_DETAIL: (id: number) => `candidatures/${id}/`,
    PUBLICATIONS: `publications/?laboratoire_id=${Constants.idLaboratoire}`,
    PUBLICATION_DETAIL: (id: number) => `publications/?id=${id}`,
    // Endpoints pour les contacts
    CONTACTS: 'contacts/',
    CONTACT_DETAIL: (id: number) => `contacts/${id}/`,
    CONTACT_HORAIRES: (id: number) => `contacts/${id}/horaires/`,
    HORAIRES: 'horaires/',
    HORAIRE_DETAIL: (id: number) => `horaires/${id}/`,
    MESSAGES: 'messages/',
    MESSAGE_DETAIL: (id: number) => `messages/${id}/`,
    MESSAGE_MARQUER_TRAITE: (id: number) => `messages/${id}/marquer_traite/`,
  },
  
  // Options par défaut pour les requêtes
  DEFAULT_OPTIONS: {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  },
  
  // Timeout par défaut
  TIMEOUT: 10000,
};

// Types TypeScript pour l'API
export interface ChercheurAPI {
  id: number;
  nom: string;
  prenom: string;
  photo_url: string | null;
  poste_principal: string | null;
  biographie: string | null;
  specialite: string | null;
  email: string | null;
  reseaux: ReseauAPI[];
}

export interface ReseauAPI {
  id: number;
  type_reseau: string;
  contact: string;
}

export interface ChercheurDetailAPI extends ChercheurAPI {
  statut: string;
  date_embauche: string;
  bureau: string;
  postes: PosteAPI[];
  domaines_expertise: DomaineExpertiseAPI[];
  diplomes: DiplomeAPI[];
  publications: PublicationAPI[];
  recherches_actuelles: RechercheActuelleAPI[];
}

export interface PosteAPI {
  id: number;
  poste: {
    id: number;
    nom: string;
    abreviation_poste: string;
    grade: string | null;
  };
}

export interface DomaineExpertiseAPI {
  id: number;
  domaine: {
    id: number;
    titre: string;
    description: string;
  };
}

export interface DiplomeAPI {
  id: number;
  etablissement: string;
  diplome: string;
  annee_obtention: string;
}

export interface PublicationChercheurAPI {
  id: number;
  nom: string;
  prenom: string;
  nom_complet: string;
  role: string;
}

export interface PublicationAPI {
  id: number;
  titre: string;
  resume: string | null;
  doi: string | null;
  facteur_impact: number | null;
  date_publication: string | null;
  url_publication: string | null;
  fichier_url?: string | null;
  recherche_titre: string;
  citations_count?: number;
  chercheurs: PublicationChercheurAPI[];
}

export interface PublicationMotCleAPI {
  id: number;
  mot_cle: string;
}

export interface PublicationCitationAPI {
  id: number;
  citation: string;
}

export interface PublicationDetailAPI extends PublicationAPI {
  contenu: string;
  fichier_url: string | null;
  mots_cles: PublicationMotCleAPI[];
  citations: PublicationCitationAPI[];
  chercheurs: PublicationChercheurAPI[];
}

export interface RechercheActuelleAPI {
  id: number;
  titre: string;
  description: string;
  statut: string;
  role_equipe: string;
  date_debut: string;
  date_fin_prevue: string | null;
}

// Types pour les parcours de laboratoire
export interface TypeLaboratoireAPI {
  id: number;
  type_labo: string;
}

export interface LaboratoireAPI {
  id: number;
  nom: string;
  logo_url: string | null;
  ufr: string;
  date_de_creation: string;
  type_laboratoire: TypeLaboratoireAPI;
}

export interface ConditionAdmissionAPI {
  id: number;
  titre: string;
  valeur: string | null;
}

export interface DeboucheAPI {
  id: number;
  deboucher: string;
}

export interface SpecialisationAPI {
  id: number;
  specialisation: string;
}

export interface ParcourAPI {
  id: number;
  nom_parour: string;
  date_creation: string;
  description: string;
  duree_formation: number;
  nombre_etudiant_max: number;
  statu: string;
  laboratoire: LaboratoireAPI;
  conditions_admission: ConditionAdmissionAPI[];
  debouches: DeboucheAPI[];
  specialisations: SpecialisationAPI[];
}

export interface ParcourListAPI {
  id: number;
  nom_parour: string;
  date_creation: string;
  description: string;
  duree_formation: number;
  nombre_etudiant_max: number;
  statu: string;
  laboratoire_nom: string;
  laboratoire_ufr: string;
}

// Types pour les candidatures
export interface CandidatureParcoursAPI {
  nom_candidat: string;
  prenom_candidat: string;
  date_naissance: string;
  lieu_naissance: string;
  nationalite: string;
  telephone_candidat: string;
  email_candidat: string;
  adresse_complete: string;
  ville_residence: string;
  pays_residence: string;
  niveau_etude_actuel: string;
  etablissement_origine: string;
  filiere_etude: string;
  moyenne_generale: number;
  annee_obtention_diplome: number;
  cv_candidat: File;
  lettre_motivation: File;
  releves_notes: File;
  diplome_obtenu?: File;
  id_parcours: number;
  // Champs motivation et projet supprimés
}

export interface CandidatureCreateRequest {
  nom_candidat: string;
  prenom_candidat: string;
  date_naissance: string;
  lieu_naissance: string;
  nationalite: string;
  telephone_candidat: string;
  email_candidat: string;
  adresse_complete: string;
  ville_residence: string;
  pays_residence: string;
  niveau_etude_actuel: string;
  etablissement_origine: string;
  filiere_etude: string;
  moyenne_generale: number;
  annee_obtention_diplome: number;
  id_parcours: number;
  // Champs motivation et projet supprimés
}