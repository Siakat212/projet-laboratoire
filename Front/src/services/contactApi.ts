import { ApiConfig } from '@/config/ApiConfig';
import {
  ContactLaboratoire,
  ContactLaboratoireList,
  ContactLaboratoireCreate,
  HoraireLaboratoire,
  HoraireLaboratoireCreate,
  MessageContact,
  MessageContactList,
  MessageContactCreate,
  MessageCreateResponse,
  ContactApiResponse,
  ContactFilters,
  MessageFilters,
  HoraireFilters
} from '@/types/contact';

class ContactApiService {
  private baseUrl = ApiConfig.BASE_URL;

  // Méthode utilitaire pour construire les paramètres de requête
  private buildQueryParams(params: Record<string, any>): string {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, value.toString());
      }
    });
    return searchParams.toString();
  }

  // Méthode utilitaire pour les requêtes HTTP
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      ...ApiConfig.DEFAULT_OPTIONS,
      ...options,
      headers: {
        ...ApiConfig.DEFAULT_OPTIONS.headers,
        ...options.headers,
      },
    };
    
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP Error: ${response.status}`);
    }

    return response.json();
  }

  // ===== CONTACTS LABORATOIRE =====

  /**
   * Récupère la liste des contacts de laboratoire
   */
  async getContacts(filters: ContactFilters = {}): Promise<ContactApiResponse<ContactLaboratoireList>> {
    const queryParams = this.buildQueryParams(filters);
    const endpoint = `contacts/${queryParams ? `?${queryParams}` : ''}`;
    return this.request<ContactApiResponse<ContactLaboratoireList>>(endpoint);
  }

  /**
   * Récupère un contact spécifique par ID
   */
  async getContact(id: number): Promise<ContactLaboratoire> {
    return this.request<ContactLaboratoire>(`contacts/${id}/`);
  }

  /**
   * Crée un nouveau contact de laboratoire
   */
  async createContact(data: ContactLaboratoireCreate): Promise<ContactLaboratoire> {
    return this.request<ContactLaboratoire>('contacts/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * Met à jour un contact existant
   */
  async updateContact(id: number, data: Partial<ContactLaboratoireCreate>): Promise<ContactLaboratoire> {
    return this.request<ContactLaboratoire>(`contacts/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  /**
   * Supprime un contact
   */
  async deleteContact(id: number): Promise<void> {
    return this.request<void>(`contacts/${id}/`, {
      method: 'DELETE',
    });
  }

  /**
   * Récupère les horaires d'un contact spécifique
   */
  async getContactHoraires(contactId: number): Promise<HoraireLaboratoire[]> {
    return this.request<HoraireLaboratoire[]>(`contacts/${contactId}/horaires/`);
  }

  /**
   * Récupère les contacts par laboratoire
   */
  async getContactsByLaboratoire(laboratoireId: number): Promise<ContactApiResponse<ContactLaboratoireList>> {
    return this.getContacts({ laboratoire_id: laboratoireId });
  }

  // ===== HORAIRES LABORATOIRE =====

  /**
   * Récupère la liste des horaires
   */
  async getHoraires(filters: HoraireFilters = {}): Promise<ContactApiResponse<HoraireLaboratoire>> {
    const queryParams = this.buildQueryParams(filters);
    const endpoint = `horaires/${queryParams ? `?${queryParams}` : ''}`;
    return this.request<ContactApiResponse<HoraireLaboratoire>>(endpoint);
  }

  /**
   * Récupère un horaire spécifique par ID
   */
  async getHoraire(id: number): Promise<HoraireLaboratoire> {
    return this.request<HoraireLaboratoire>(`horaires/${id}/`);
  }

  /**
   * Crée un nouvel horaire
   */
  async createHoraire(data: HoraireLaboratoireCreate): Promise<HoraireLaboratoire> {
    return this.request<HoraireLaboratoire>('horaires/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * Met à jour un horaire existant
   */
  async updateHoraire(id: number, data: Partial<HoraireLaboratoireCreate>): Promise<HoraireLaboratoire> {
    return this.request<HoraireLaboratoire>(`horaires/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  /**
   * Supprime un horaire
   */
  async deleteHoraire(id: number): Promise<void> {
    return this.request<void>(`horaires/${id}/`, {
      method: 'DELETE',
    });
  }

  // ===== MESSAGES CONTACT =====

  /**
   * Récupère la liste des messages de contact
   */
  async getMessages(filters: MessageFilters = {}): Promise<ContactApiResponse<MessageContactList>> {
    const queryParams = this.buildQueryParams(filters);
    const endpoint = `messages/${queryParams ? `?${queryParams}` : ''}`;
    return this.request<ContactApiResponse<MessageContactList>>(endpoint);
  }

  /**
   * Récupère un message spécifique par ID
   */
  async getMessage(id: number): Promise<MessageContact> {
    return this.request<MessageContact>(`messages/${id}/`);
  }

  /**
   * Envoie un nouveau message de contact
   */
  async sendMessage(data: MessageContactCreate): Promise<MessageCreateResponse> {
    return this.request<MessageCreateResponse>('messages/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * Met à jour un message existant
   */
  async updateMessage(id: number, data: Partial<MessageContactCreate>): Promise<MessageContact> {
    return this.request<MessageContact>(`messages/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  /**
   * Supprime un message
   */
  async deleteMessage(id: number): Promise<void> {
    return this.request<void>(`messages/${id}/`, {
      method: 'DELETE',
    });
  }

  /**
   * Marque un message comme traité
   */
  async marquerMessageTraite(
    id: number, 
    reponseAdmin?: string, 
    responsableReponse?: string
  ): Promise<MessageContact> {
    const data: any = {};
    if (reponseAdmin) data.reponse_admin = reponseAdmin;
    if (responsableReponse) data.responsable_reponse = responsableReponse;

    return this.request<MessageContact>(`messages/${id}/marquer_traite/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  /**
   * Récupère les messages par laboratoire
   */
  async getMessagesByLaboratoire(laboratoireId: number): Promise<ContactApiResponse<MessageContactList>> {
    return this.getMessages({ laboratoire_id: laboratoireId });
  }

  /**
   * Récupère les messages non traités
   */
  async getMessagesNonTraites(): Promise<ContactApiResponse<MessageContactList>> {
    return this.getMessages({ traite: false });
  }

  /**
   * Récupère les messages par priorité
   */
  async getMessagesByPriorite(priorite: string): Promise<ContactApiResponse<MessageContactList>> {
    return this.getMessages({ priorite });
  }

  // ===== MÉTHODES UTILITAIRES =====

  /**
   * Recherche dans tous les contacts
   */
  async searchContacts(query: string): Promise<ContactApiResponse<ContactLaboratoireList>> {
    return this.getContacts({ search: query });
  }

  /**
   * Recherche dans tous les messages
   */
  async searchMessages(query: string): Promise<ContactApiResponse<MessageContactList>> {
    return this.getMessages({ search: query });
  }

  /**
   * Récupère les horaires d'ouverture uniquement
   */
  async getHorairesOuverts(contactId?: number): Promise<ContactApiResponse<HoraireLaboratoire>> {
    const filters: HoraireFilters = { ouvert_seulement: true };
    if (contactId) filters.contact_id = contactId;
    return this.getHoraires(filters);
  }

  /**
   * Statistiques rapides des messages
   */
  async getMessagesStats(): Promise<{
    total: number;
    nouveaux: number;
    en_cours: number;
    traites: number;
  }> {
    const [total, nouveaux, enCours, traites] = await Promise.all([
      this.getMessages().then(res => res.count),
      this.getMessages({ statut: 'nouveau' }).then(res => res.count),
      this.getMessages({ statut: 'en_cours' }).then(res => res.count),
      this.getMessages({ statut: 'traite' }).then(res => res.count),
    ]);

    return {
      total,
      nouveaux,
      en_cours: enCours,
      traites,
    };
  }
}

// Instance singleton du service
export const contactApiService = new ContactApiService();
export default contactApiService;