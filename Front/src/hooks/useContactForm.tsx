import { useState } from 'react';
import { toast } from 'sonner';
import { contactApiService } from '@/services/contactApi';
import { MessageContactCreate } from '@/types/contact';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  subject: string;
  message: string;
  laboratoryId: number;
}

interface UseContactFormReturn {
  formData: ContactFormData;
  isLoading: boolean;
  errors: Partial<ContactFormData>;
  handleChange: (field: keyof ContactFormData, value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

const initialFormData: ContactFormData = {
  firstName: '',
  lastName: '',
  email: '',
  organization: '',
  subject: '',
  message: '',
  laboratoryId: 1 // ID par défaut du laboratoire principal
};

export const useContactForm = (): UseContactFormReturn => {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Le sujet est requis';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    // Coercition numérique pour laboratoryId
    const nextValue: any = field === 'laboratoryId' ? Number(value) : value;
    setFormData(prev => ({ ...prev, [field]: nextValue }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Veuillez corriger les erreurs dans le formulaire');
      return;
    }

    setIsLoading(true);

    try {
      
      // Préparer les données pour l'API Django
      const messageData: MessageContactCreate = {
        id_laboratoire: formData.laboratoryId,
        prenom_expediteur: formData.firstName.trim(),
        nom_expediteur: formData.lastName.trim(),
        email_expediteur: formData.email.trim(),
        organisation_expediteur: formData.organization.trim() || undefined,
        sujet_message: formData.subject.trim(),
        contenu_message: formData.message.trim(),
        priorite: 'normale'
      };

      // Envoyer le message via l'API Django
      const response = await contactApiService.sendMessage(messageData);
      
      toast.success('Message envoyé avec succès ! Nous vous recontacterons bientôt.');
      resetForm();
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      
      // Fallback vers mailto si l'API échoue
      if (error instanceof Error && error.message.includes('fetch')) {
        console.log('API indisponible, utilisation du fallback mailto...');
        
        const emailBody = `
            Nouveau message depuis le site LabVoyage

            Nom: ${formData.firstName} ${formData.lastName}
            Email: ${formData.email}
            Organisation: ${formData.organization || 'Non spécifiée'}
            Sujet: ${formData.subject}

            Message:
            ${formData.message}
        `;

        const mailtoLink = `mailto:contact@labvoyage.ci?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailBody)}`;
        window.open(mailtoLink, '_blank');
        
        toast.warning('Serveur indisponible. Un client email va s\'ouvrir pour envoyer votre message.');
        resetForm();
      } else {
        toast.error('Erreur lors de l\'envoi du message. Veuillez réessayer.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  return {
    formData,
    isLoading,
    errors,
    handleChange,
    handleSubmit,
    resetForm
  };
};