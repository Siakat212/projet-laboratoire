import { useState, useEffect } from 'react';
import { ApiConfig, ParcourAPI, ParcourListAPI } from '@/config/ApiConfig';

// Hook personnalisé pour récupérer la liste des parcours
export const useParcours = (laboratoireFilter?: string) => {
  const [parcours, setParcours] = useState<ParcourListAPI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchParcours = async (searchTerm?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      let url = `${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.PARCOURS}`;
      const params = new URLSearchParams();
      
      // Si un filtre laboratoire est fourni, l'utiliser comme recherche
      if (laboratoireFilter && laboratoireFilter.trim()) {
        params.append('search', laboratoireFilter.trim());
      } else if (searchTerm && searchTerm.trim()) {
        params.append('search', searchTerm.trim());
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
      const transformedData: ParcourListAPI[] = data.results || data;
      
      // Filtrage supplémentaire côté client si nécessaire
      let filteredData = transformedData;
      if (laboratoireFilter && laboratoireFilter.trim()) {
        filteredData = transformedData.filter(parcour => 
          parcour.laboratoire_nom.toLowerCase().includes(laboratoireFilter.toLowerCase()) ||
          parcour.laboratoire_ufr.toLowerCase().includes(laboratoireFilter.toLowerCase())
        );
      }
      
      setParcours(filteredData);
      
    } catch (err) {
      console.error('Erreur lors de la récupération des parcours:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      setParcours([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParcours();
  }, [laboratoireFilter]); // Ajout du laboratoireFilter comme dépendance

  return {
    parcours,
    loading,
    error,
    refetch: fetchParcours,
  };
};

// Hook pour récupérer les détails d'un parcours
export const useParcoursDetail = (id: number) => {
  const [parcours, setParcours] = useState<ParcourAPI | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchParcoursDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log(ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.PARCOURS_DETAIL(id));

      const response = await fetch(
        `${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.PARCOURS_DETAIL(id)}`,
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
      console.error(`Erreur lors de la récupération du parcours ${id}:`, err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      setParcours(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchParcoursDetail();
    }
  }, [id]);

  return {
    parcours,
    loading,
    error,
    refetch: fetchParcoursDetail,
  };
};

// Fonction utilitaire pour transformer les données API vers le format attendu par le frontend
export const transformParcoursToLevel = (parcours: ParcourListAPI) => {
  return {
    id: parcours.id,
    title: parcours.nom_parour,
    university: `${parcours.laboratoire_nom} (${parcours.laboratoire_ufr})`,
    duration: `${parcours.duree_formation} ans`,
    students: `${parcours.nombre_etudiant_max} étudiants max`,
    description: parcours.description,
    nextIntake: new Date(parcours.date_creation).toLocaleDateString('fr-FR', { 
      month: 'long', 
      year: 'numeric' 
    }),
    status: parcours.statu
  };
};