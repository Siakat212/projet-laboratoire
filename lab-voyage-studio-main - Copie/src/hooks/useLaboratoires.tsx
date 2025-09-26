import { useState, useEffect } from 'react';
import { ApiConfig, LaboratoireAPI } from '@/config/ApiConfig';

// Hook personnalisé pour récupérer la liste des laboratoires
export const useLaboratoires = (searchTerm?: string) => {
  const [laboratoires, setLaboratoires] = useState<LaboratoireAPI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLaboratoires = async (search?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      let url = `${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.LABORATOIRES}`;
      const params = new URLSearchParams();
      
      if (search && search.trim()) {
        params.append('search', search.trim());
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
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
      const transformedData: LaboratoireAPI[] = data.results || data;
      setLaboratoires(transformedData);
      
    } catch (err) {
      console.error('Erreur lors de la récupération des laboratoires:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      setLaboratoires([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLaboratoires(searchTerm);
  }, [searchTerm]);

  return {
    laboratoires,
    loading,
    error,
    refetch: fetchLaboratoires,
  };
};

// Hook pour récupérer les détails d'un laboratoire
export const useLaboratoireDetail = (id: number) => {
  const [laboratoire, setLaboratoire] = useState<LaboratoireAPI | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLaboratoireDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.LABORATOIRE_DETAIL(id)}`,
        {
          ...ApiConfig.DEFAULT_OPTIONS,
          signal: AbortSignal.timeout(ApiConfig.TIMEOUT),
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setLaboratoire(data);
      
    } catch (err) {
      console.error(`Erreur lors de la récupération du laboratoire ${id}:`, err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      setLaboratoire(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchLaboratoireDetail();
    }
  }, [id]);

  return {
    laboratoire,
    loading,
    error,
    refetch: fetchLaboratoireDetail,
  };
};

// Hook pour récupérer les parcours d'un laboratoire spécifique
export const useLaboratoireParcours = (laboratoireId: number) => {
  const [parcours, setParcours] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLaboratoireParcours = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.LABORATOIRE_PARCOURS(laboratoireId)}`,
        {
          ...ApiConfig.DEFAULT_OPTIONS,
          signal: AbortSignal.timeout(ApiConfig.TIMEOUT),
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setParcours(data);
      
    } catch (err) {
      console.error(`Erreur lors de la récupération des parcours du laboratoire ${laboratoireId}:`, err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      setParcours([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (laboratoireId) {
      fetchLaboratoireParcours();
    }
  }, [laboratoireId]);

  return {
    parcours,
    loading,
    error,
    refetch: fetchLaboratoireParcours,
  };
};