// Types TypeScript pour les données de l'équipe et publications

// Interface pour les membres de l'équipe (version frontend)
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  specialization: string;
  email: string;
  linkedin: string;
  description: string;
  photo?: string | null;
  education: string[];
  publications: string[];
  research: string[];
  keywords: string[];
}

// Interface pour les chercheurs dans les publications
export interface PublicationChercheur {
  id: number;
  nom: string;
  prenom: string;
  nom_complet: string;
  role: string;
}

// Interface pour les publications
export interface Publication {
  id: number;
  title: string;
  authors: string;
  journal: string;
  year: string;
  impact: string;
  citations: string;
  type: string;
  status: string;
  abstract: string;
  pdfUrl: string;
  doi: string;
}

// Interface pour les contacts de laboratoire
export interface ContactLaboratoire {
  id: number;
  id_laboratoire: number;
  type_contact: string;
  adresse_complete: string;
  ville: string;
  code_postal?: string;
  pays: string;
  telephone_principal?: string;
  telephone_secondaire?: string;
  email_principal?: string;
  email_secondaire?: string;
  site_web?: string;
  latitude?: number;
  longitude?: number;
  nom_contact?: string;
  fonction_contact?: string;
  est_actif: boolean;
  horaires?: HoraireLaboratoire[];
}

// Interface pour les horaires de laboratoire
export interface HoraireLaboratoire {
  id: number;
  jour_semaine: number;
  heure_ouverture?: string;
  heure_fermeture?: string;
  est_ferme: boolean;
  notes?: string;
}

// Interface pour les messages de contact
export interface MessageContact {
  id: number;
  prenom_expediteur: string;
  nom_expediteur: string;
  email_expediteur: string;
  organisation_expediteur?: string;
  sujet_message: string;
  contenu_message: string;
  id_laboratoire: number;
  statut_message: 'nouveau' | 'en_cours' | 'traite' | 'archive';
  priorite: 'basse' | 'normale' | 'haute' | 'urgente';
  date_envoi: string;
  reponse_admin?: string;
  responsable_reponse?: string;
  date_reponse?: string;
}

// Interface pour les données d'envoi de message
export interface MessageContactData {
  prenom_expediteur: string;
  nom_expediteur: string;
  email_expediteur: string;
  organisation_expediteur?: string;
  sujet_message: string;
  contenu_message: string;
  id_laboratoire: number;
}

// Interface pour les statistiques
export interface Statistic {
  value: string;
  label: string;
}

// Interface pour les réponses d'erreur API
export interface ApiError {
  message: string;
  status?: number;
  details?: string;
}

// Types d'état pour les composants
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Interface pour la pagination
export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

// Interface pour les filtres de recherche
export interface SearchFilters {
  searchTerm: string;
  specialization?: string;
  role?: string;
}

// Interface pour les options de tri
export interface SortOptions {
  field: 'name' | 'role' | 'specialization' | 'date';
  direction: 'asc' | 'desc';
}