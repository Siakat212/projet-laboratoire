import { useState } from 'react';
import { toast } from 'sonner';

interface ApplicationFormData {
  name: string;
  email: string;
  phone: string;
  university: string;
  degree: string;
  gpa: string;
  motivation: string;
  program: string;
}

interface UseApplicationFormReturn {
  formData: ApplicationFormData;
  isLoading: boolean;
  errors: Partial<ApplicationFormData>;
  handleChange: (field: keyof ApplicationFormData, value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

const initialFormData: ApplicationFormData = {
  name: '',
  email: '',
  phone: '',
  university: '',
  degree: '',
  gpa: '',
  motivation: '',
  program: ''
};

export const useApplicationForm = (masterTitle: string): UseApplicationFormReturn => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    ...initialFormData,
    program: masterTitle
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<ApplicationFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ApplicationFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom complet est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    }

    if (!formData.university.trim()) {
      newErrors.university = 'L\'université actuelle est requise';
    }

    if (!formData.degree.trim()) {
      newErrors.degree = 'Le diplôme actuel est requis';
    }

    if (!formData.gpa.trim()) {
      newErrors.gpa = 'La moyenne est requise';
    }

    if (!formData.motivation.trim()) {
      newErrors.motivation = 'La lettre de motivation est requise';
    } else if (formData.motivation.length < 100) {
      newErrors.motivation = 'La lettre de motivation doit contenir au moins 100 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof ApplicationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would send this to your backend
      const emailBody = `
Nouvelle candidature pour ${formData.program}

Informations du candidat:
- Nom: ${formData.name}
- Email: ${formData.email}
- Téléphone: ${formData.phone}
- Université actuelle: ${formData.university}
- Diplôme: ${formData.degree}
- Moyenne: ${formData.gpa}

Lettre de motivation:
${formData.motivation}
      `;

      // For now, we'll create a mailto link as fallback
      const mailtoLink = `mailto:admissions@labvoyage.ci?subject=Candidature ${encodeURIComponent(formData.program)}&body=${encodeURIComponent(emailBody)}`;
      window.open(mailtoLink, '_blank');

      toast.success('Candidature envoyée avec succès ! Nous examinerons votre dossier et vous recontacterons bientôt.');
      resetForm();
    } catch (error) {
      toast.error('Erreur lors de l\'envoi de la candidature. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ ...initialFormData, program: masterTitle });
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