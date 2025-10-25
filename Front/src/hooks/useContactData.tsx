import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { contactApiService } from '@/services/contactApi';
import {
  ContactLaboratoireList,
  MessageContactCreate,
  MessageCreateResponse,
  ContactFilters
} from '@/types/contact';

interface UseContactDataReturn {
  contacts: ContactLaboratoireList[];
  isLoading: boolean;
  error: string | null;
  sendContactMessage: (message: MessageContactCreate) => Promise<MessageCreateResponse | null>;
  getContactsByLaboratory: (laboratoryId: number) => void;
  refreshContacts: () => void;
}

export const useContactData = (laboratoryId?: number): UseContactDataReturn => {
  const [contacts, setContacts] = useState<ContactLaboratoireList[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = async (filters?: ContactFilters) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await contactApiService.getContacts(filters);
      setContacts(response.results);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement des contacts';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const sendContactMessage = async (message: MessageContactCreate): Promise<MessageCreateResponse | null> => {
    try {
      const response = await contactApiService.sendMessage(message);
      toast.success('Message envoyé avec succès ! Nous vous recontacterons bientôt.');
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de l\'envoi du message';
      toast.error(errorMessage);
      throw err;
    }
  };

  const getContactsByLaboratory = (laboratoryId: number) => {
    fetchContacts({ laboratoire_id: laboratoryId });
  };

  const refreshContacts = () => {
    const filters = laboratoryId ? { laboratoire_id: laboratoryId } : undefined;
    fetchContacts(filters);
  };

  useEffect(() => {
    const filters = laboratoryId ? { laboratoire_id: laboratoryId } : undefined;
    fetchContacts(filters);
  }, [laboratoryId]);

  return {
    contacts,
    isLoading,
    error,
    sendContactMessage,
    getContactsByLaboratory,
    refreshContacts
  };
};