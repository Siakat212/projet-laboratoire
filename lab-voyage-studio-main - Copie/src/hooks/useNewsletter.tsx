import { useState } from 'react';
import { toast } from 'sonner';

interface UseNewsletterReturn {
  email: string;
  isLoading: boolean;
  error: string;
  setEmail: (email: string) => void;
  subscribe: () => Promise<void>;
}

export const useNewsletter = (): UseNewsletterReturn => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const subscribe = async () => {
    setError('');

    if (!email.trim()) {
      setError('Veuillez saisir votre adresse email');
      return;
    }

    if (!validateEmail(email)) {
      setError('Format d\'email invalide');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would send this to your newsletter service
      // Newsletter subscription processed
      
      toast.success('Merci ! Vous êtes maintenant abonné à notre newsletter.');
      setEmail('');
    } catch (error) {
      toast.error('Erreur lors de l\'abonnement. Veuillez réessayer.');
      setError('Erreur lors de l\'abonnement');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    isLoading,
    error,
    setEmail,
    subscribe
  };
};