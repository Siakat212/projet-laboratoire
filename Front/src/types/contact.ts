// Types pour les modèles de contact du laboratoire

export interface ContactLaboratoire {
  id: number;
  id_laboratoire: number;
  laboratoire_nom: string;
  type_contact: string;
  type_contact_display: string;
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
  horaires: HoraireLaboratoire[];
  creer_le: string;
  mise_a_jour_le: string;
}

export interface ContactLaboratoireList {
  id: number;
  laboratoire_nom: string;
  type_contact: string;
  type_contact_display: string;
  ville: string;
  code_postal?: string;
  pays?: string;
  adresse_complete?: string;
  telephone_principal?: string;
  email_principal?: string;
  nom_contact?: string;
  est_actif: boolean;
}

export interface ContactLaboratoireCreate {
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
}

export interface HoraireLaboratoire {
  id: number;
  jour_semaine: number;
  jour_semaine_display: string;
  heure_ouverture?: string;
  heure_fermeture?: string;
  est_ferme: boolean;
  notes?: string;
  creer_le: string;
  mise_a_jour_le: string;
}

export interface HoraireLaboratoireCreate {
  contact_laboratoire: number;
  jour_semaine: number;
  heure_ouverture?: string;
  heure_fermeture?: string;
  est_ferme: boolean;
  notes?: string;
}

export interface MessageContact {
  id: number;
  id_laboratoire: number;
  laboratoire_nom: string;
  prenom_expediteur: string;
  nom_expediteur: string;
  nom_complet_expediteur: string;
  email_expediteur: string;
  organisation_expediteur?: string;
  sujet_message: string;
  contenu_message: string;
  statut_message: string;
  statut_message_display: string;
  priorite: string;
  priorite_display: string;
  reponse_admin?: string;
  responsable_reponse?: string;
  date_reponse?: string;
  est_traite: boolean;
  date_envoi: string;
  date_derniere_modification: string;
}

export interface MessageContactList {
  id: number;
  laboratoire_nom: string;
  nom_complet_expediteur: string;
  email_expediteur: string;
  sujet_message: string;
  statut_message_display: string;
  priorite_display: string;
  est_traite: boolean;
  date_envoi: string;
}

export interface MessageContactCreate {
  id_laboratoire: number;
  prenom_expediteur: string;
  nom_expediteur: string;
  email_expediteur: string;
  organisation_expediteur?: string;
  sujet_message: string;
  contenu_message: string;
  priorite?: string;
}

// Types pour les choix de sélection
export interface TypeContactChoice {
  value: string;
  label: string;
}

export interface PrioriteChoice {
  value: string;
  label: string;
}

export interface StatutMessageChoice {
  value: string;
  label: string;
}

// Types pour les réponses API
export interface ContactApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface MessageCreateResponse {
  message: string;
  contact_message: MessageContact;
}

// Types pour les filtres de recherche
export interface ContactFilters {
  laboratoire_id?: number;
  type_contact?: string;
  ville?: string;
  search?: string;
}

export interface MessageFilters {
  laboratoire_id?: number;
  statut?: string;
  priorite?: string;
  traite?: boolean;
  date_debut?: string;
  date_fin?: string;
  search?: string;
}

export interface HoraireFilters {
  contact_id?: number;
  jour?: number;
  ouvert_seulement?: boolean;
  search?: string;
}

// Constantes pour les choix
export const TYPE_CONTACT_CHOICES: TypeContactChoice[] = [
  { value: "principal", label: "Contact principal" },
  { value: "direction", label: "Direction" },
  { value: "administration", label: "Administration" },
  { value: "recherche", label: "Service recherche" },
  { value: "partenariats", label: "Partenariats" },
  { value: "communication", label: "Communication" }
];

export const PRIORITE_CHOICES: PrioriteChoice[] = [
  { value: "basse", label: "Basse" },
  { value: "normale", label: "Normale" },
  { value: "haute", label: "Haute" },
  { value: "urgente", label: "Urgente" }
];

export const STATUT_MESSAGE_CHOICES: StatutMessageChoice[] = [
  { value: "nouveau", label: "Nouveau message" },
  { value: "en_cours", label: "En cours de traitement" },
  { value: "traite", label: "Traité" },
  { value: "archive", label: "Archivé" }
];

export const JOURS_SEMAINE = [
  { value: 1, label: "Lundi" },
  { value: 2, label: "Mardi" },
  { value: 3, label: "Mercredi" },
  { value: 4, label: "Jeudi" },
  { value: 5, label: "Vendredi" },
  { value: 6, label: "Samedi" },
  { value: 7, label: "Dimanche" }
];