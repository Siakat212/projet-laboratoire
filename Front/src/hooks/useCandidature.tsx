import { useState } from 'react';
import { toast } from 'sonner';
import { ApiConfig, CandidatureCreateRequest } from '@/config/ApiConfig';

interface CandidatureFormData {
  // Informations personnelles
  nom_candidat: string;
  prenom_candidat: string;
  date_naissance: string;
  lieu_naissance: string;
  nationalite: string;
  
  // Informations de contact
  telephone_candidat: string;
  email_candidat: string;
  adresse_complete: string;
  ville_residence: string;
  pays_residence: string;
  
  // Informations académiques
  niveau_etude_actuel: string;
  etablissement_origine: string;
  filiere_etude: string;
  moyenne_generale: string;
  annee_obtention_diplome: string;
  
  // Documents joints
  cv_candidat: File | null;
  lettre_motivation: File | null;
  releves_notes: File | null;
  diplome_obtenu: File | null;
  
  // Informations spécifiques à la candidature
  id_parcours: number;
  // Champs motivation et projet supprimés
}

interface CandidatureFormErrors {
  [key: string]: string;
}

interface UseCandidatureReturn {
  formData: CandidatureFormData;
  isLoading: boolean;
  errors: CandidatureFormErrors;
  isSubmitted: boolean;
  handleChange: (field: keyof CandidatureFormData, value: string | number | File | null) => void;
  handleSubmit: (e: React.FormEvent) => Promise<boolean>;
  validateStep: (step: number) => boolean;
  resetForm: () => void;
}

const initialFormData = (parcoursId: number): CandidatureFormData => ({
  // Informations personnelles
  nom_candidat: '',
  prenom_candidat: '',
  date_naissance: '',
  lieu_naissance: '',
  nationalite: '',
  
  // Informations de contact
  telephone_candidat: '',
  email_candidat: '',
  adresse_complete: '',
  ville_residence: '',
  pays_residence: '',
  
  // Informations académiques
  niveau_etude_actuel: '',
  etablissement_origine: '',
  filiere_etude: '',
  moyenne_generale: '',
  annee_obtention_diplome: '',
  
  // Documents joints
  cv_candidat: null,
  lettre_motivation: null,
  releves_notes: null,
  diplome_obtenu: null,
  
  // Informations spécifiques à la candidature
  id_parcours: parcoursId,
  // Champs motivation et projet supprimés
});

export const useCandidature = (parcoursId: number): UseCandidatureReturn => {
  const [formData, setFormData] = useState<CandidatureFormData>(initialFormData(parcoursId));
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<CandidatureFormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateStep = (step: number): boolean => {
    const newErrors: CandidatureFormErrors = {};
    
    switch (step) {
      case 1: // Informations personnelles
        if (!formData.nom_candidat.trim()) {
          newErrors.nom_candidat = 'Le nom de famille est requis';
        }
        if (!formData.prenom_candidat.trim()) {
          newErrors.prenom_candidat = 'Le prénom est requis';
        }
        // Validation de l'âge
        if (!formData.date_naissance) {
          newErrors.date_naissance = 'La date de naissance est requise';
        } else {
          const birthDate = new Date(formData.date_naissance);
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDifference = today.getMonth() - birthDate.getMonth();
          if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          
          if (age < 16) {
            newErrors.date_naissance = 'Vous devez avoir au moins 16 ans pour candidater.';
          }
        }
        if (!formData.lieu_naissance.trim()) {
          newErrors.lieu_naissance = 'Le lieu de naissance est requis';
        }
        if (!formData.nationalite.trim()) {
          newErrors.nationalite = 'La nationalité est requise';
        }
        break;
        
      case 2: // Informations de contact
        if (!formData.telephone_candidat.trim()) {
          newErrors.telephone_candidat = 'Le numéro de téléphone est requis';
        }
        // Validation email simplifiée
        if (!formData.email_candidat.trim()) {
          newErrors.email_candidat = 'L\'adresse email est requise';
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email_candidat)) {
          newErrors.email_candidat = 'Format d\'email invalide (exemple: nom@domaine.com)';
        }
        if (!formData.adresse_complete.trim()) {
          newErrors.adresse_complete = 'L\'adresse complète est requise';
        }
        if (!formData.ville_residence.trim()) {
          newErrors.ville_residence = 'La ville de résidence est requise';
        }
        if (!formData.pays_residence.trim()) {
          newErrors.pays_residence = 'Le pays de résidence est requis';
        }
        break;
        
      case 3: // Informations académiques et documents
        if (!formData.niveau_etude_actuel) {
          newErrors.niveau_etude_actuel = 'Le niveau d\'étude actuel est requis';
        }
        if (!formData.etablissement_origine.trim()) {
          newErrors.etablissement_origine = 'L\'établissement d\'origine est requis';
        }
        if (!formData.filiere_etude.trim()) {
          newErrors.filiere_etude = 'La filière d\'étude est requise';
        }
        // Validation moyenne simplifiée
        if (!formData.moyenne_generale.trim()) {
          newErrors.moyenne_generale = 'La moyenne générale est requise';
        } else {
          const moyenne = parseFloat(formData.moyenne_generale);
          if (isNaN(moyenne) || moyenne < 0 || moyenne > 25) {  // Accept jusqu'à 25 pour les systèmes différents
            newErrors.moyenne_generale = 'La moyenne doit être entre 0 et 25';
          }
        }
        // Validation année simplifiée
        if (!formData.annee_obtention_diplome.trim()) {
          newErrors.annee_obtention_diplome = 'L\'année d\'obtention du diplôme est requise';
        } else {
          const annee = parseInt(formData.annee_obtention_diplome);
          const currentYear = new Date().getFullYear();
          if (isNaN(annee) || annee < 1980 || annee > currentYear + 5) {  // Plus flexible
            newErrors.annee_obtention_diplome = 'Année invalide';
          }
        }
        // Validation fichiers simplifiée - seulement vérifier la présence
        if (!formData.cv_candidat) {
          newErrors.cv_candidat = 'Le CV est requis';
        }
        if (!formData.lettre_motivation) {
          newErrors.lettre_motivation = 'La lettre de motivation est requise';
        }
        if (!formData.releves_notes) {
          newErrors.releves_notes = 'Les relevés de notes sont requis';
        }
        break;
    }
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const validateForm = (): boolean => {
    return validateStep(1) && validateStep(2) && validateStep(3); // Suppression de validateStep(4)
  };

  const handleChange = (field: keyof CandidatureFormData, value: string | number | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing/selecting
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<boolean> => {
    e.preventDefault();
    
    if (!validateForm()) {
      const errorCount = Object.keys(errors).length;
      const errorList = Object.entries(errors).map(([field, message]) => `${field}: ${message}`).join('\n');
      toast.error(`${errorCount} erreur(s) trouvée(s):\n${errorList}`);
      return false;
    }

    setIsLoading(true);

    try {
      // Préparer les données pour l'API
      const formDataToSend = new FormData();
      
      // Informations personnelles
      formDataToSend.append('nom_candidat', formData.nom_candidat);
      formDataToSend.append('prenom_candidat', formData.prenom_candidat);
      formDataToSend.append('date_naissance', formData.date_naissance);
      formDataToSend.append('lieu_naissance', formData.lieu_naissance);
      formDataToSend.append('nationalite', formData.nationalite);
      
      // Informations de contact
      formDataToSend.append('telephone_candidat', formData.telephone_candidat);
      formDataToSend.append('email_candidat', formData.email_candidat);
      formDataToSend.append('adresse_complete', formData.adresse_complete);
      formDataToSend.append('ville_residence', formData.ville_residence);
      formDataToSend.append('pays_residence', formData.pays_residence);
      
      // Informations académiques
      formDataToSend.append('niveau_etude_actuel', formData.niveau_etude_actuel);
      formDataToSend.append('etablissement_origine', formData.etablissement_origine);
      formDataToSend.append('filiere_etude', formData.filiere_etude);
      formDataToSend.append('moyenne_generale', parseFloat(formData.moyenne_generale).toString());
      formDataToSend.append('annee_obtention_diplome', parseInt(formData.annee_obtention_diplome).toString());
      
      // Documents joints
      if (formData.cv_candidat) {
        formDataToSend.append('cv_candidat', formData.cv_candidat);
      }
      if (formData.lettre_motivation) {
        formDataToSend.append('lettre_motivation', formData.lettre_motivation);
      }
      if (formData.releves_notes) {
        formDataToSend.append('releves_notes', formData.releves_notes);
      }
      if (formData.diplome_obtenu) {
        formDataToSend.append('diplome_obtenu', formData.diplome_obtenu);
      }
      
      // Informations spécifiques à la candidature
      formDataToSend.append('id_parcours', formData.id_parcours.toString());
      // Champs motivation et projet supprimés

      // Envoyer à l'API
      const response = await fetch(`${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.CANDIDATURES}`, {
        method: 'POST',
        body: formDataToSend,
        // Ne pas définir Content-Type pour FormData, le navigateur le fera automatiquement
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch (e) {
          throw new Error(`Erreur ${response.status}: ${errorText || 'Erreur lors de la soumission de la candidature'}`);
        }
        
        // Gestion des erreurs de validation
        if (errorData.details && typeof errorData.details === 'object') {
          const validationErrors = [];
          for (const [field, messages] of Object.entries(errorData.details)) {
            if (Array.isArray(messages)) {
              validationErrors.push(`${field}: ${messages.join(', ')}`);
            } else {
              validationErrors.push(`${field}: ${messages}`);
            }
          }
          throw new Error(`Erreurs de validation:\n${validationErrors.join('\n')}`);
        }
        
        throw new Error(errorData.error || errorData.message || errorData.detail || 'Erreur lors de la soumission de la candidature');
      }

      const result = await response.json();
      
      toast.success('Candidature envoyée avec succès ! Nous examinerons votre dossier et vous recontacterons bientôt.');
      setIsSubmitted(true);
      resetForm();
      return true;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erreur lors de l\'envoi de la candidature. Veuillez réessayer.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData(parcoursId));
    setErrors({});
  };

  return {
    formData,
    isLoading,
    errors,
    isSubmitted,
    handleChange,
    handleSubmit,
    validateStep,
    resetForm
  };
};