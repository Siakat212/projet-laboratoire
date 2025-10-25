import { useState, useEffect } from 'react';
import { ApiConfig, ChercheurAPI, ChercheurDetailAPI } from '@/config/ApiConfig';

// Hook personnalisé pour récupérer la liste des chercheurs
export const useChercheurs = (laboratoireId?: number) => {
  const [chercheurs, setChercheurs] = useState<ChercheurAPI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChercheurs = async (searchTerm?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // http://localhost:8001/api/chercheurs/

      let url = `${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.CHERCHEURS}`;
      const params: string[] = [];
      if (searchTerm && searchTerm.trim()) {
        params.push(`search=${encodeURIComponent(searchTerm.trim())}`);
      }
      if (laboratoireId) {
        params.push(`laboratoire_id=${laboratoireId}`);
      }
      if (params.length) {
        url += `?${params.join('&')}`;
      }

      const response = await fetch(url, {
        ...ApiConfig.DEFAULT_OPTIONS,
        signal: AbortSignal.timeout(ApiConfig.TIMEOUT),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      
      // Transformation des données de l'API vers le format frontend
      const transformedData: ChercheurAPI[] = data.results || data;
      setChercheurs(transformedData);
      
    } catch (err) {
      console.error('Erreur lors de la récupération des chercheurs:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      setChercheurs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChercheurs();
  }, [laboratoireId]);

  return {
    chercheurs,
    loading,
    error,
    refetch: fetchChercheurs,
  };
};

// Hook pour récupérer les détails d'un chercheur
export const useChercheurDetail = (id: number) => {
  const [chercheur, setChercheur] = useState<ChercheurDetailAPI | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChercheurDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      // http://localhost:8001/api/chercheurs/1/
      
      const response = await fetch(
        `${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.CHERCHEUR_DETAIL(id)}`,
        {
          ...ApiConfig.DEFAULT_OPTIONS,
          signal: AbortSignal.timeout(ApiConfig.TIMEOUT),
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setChercheur(data);
      
    } catch (err) {
      console.error(`Erreur lors de la récupération du chercheur ${id}:`, err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      setChercheur(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchChercheurDetail();
    }
  }, [id]);

  return {
    chercheur,
    loading,
    error,
    refetch: fetchChercheurDetail,
  };
};

// Fonction utilitaire pour transformer les données API vers le format attendu par le frontend
export const transformChercheurToTeamMember = (chercheur: ChercheurAPI) => {
  // Extraction de LinkedIn depuis les réseaux
  const linkedinReseau = chercheur.reseaux?.find(r => r.type_reseau === 'LinkedIn');
  
  return {
    id: chercheur.id,
    name: `${chercheur.prenom || ''} ${chercheur.nom || ''}`.trim(),
    role: chercheur.poste_principal || 'Chercheur',
    specialization: chercheur.specialite || 'Recherche Générale',
    email: chercheur.email || '',
    linkedin: linkedinReseau?.contact || '#',
    description: chercheur.biographie || 'Profil en cours de mise à jour...',
    photo: chercheur.photo_url,
    education: [], // À enrichir si nécessaire
    publications: [], // À enrichir si nécessaire  
    research: [], // À enrichir si nécessaire
    keywords: [], // À enrichir si nécessaire
  };
};