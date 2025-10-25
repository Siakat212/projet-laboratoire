import { useEffect, useState } from 'react';
import { ApiConfig, PublicationAPI, PublicationDetailAPI } from '@/config/ApiConfig';

export interface PublicationsFilters {
  search?: string;
  motCle?: string; // comma-separated
  citation?: string;
  year?: number;
  minFacteurImpact?: number;
  hasPdf?: boolean;
  hasUrl?: boolean;
  ordering?: string; // e.g. '-date_publication'
  id_recheche?: number
}

interface UsePublicationsReturn {
  publications: PublicationAPI[];
  loading: boolean;
  error: string | null;
  refetch: (filters?: PublicationsFilters) => Promise<void>;
}

export const usePublications = (initialFilters?: PublicationsFilters): UsePublicationsReturn => {
  const [publications, setPublications] = useState<PublicationAPI[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<PublicationsFilters>(initialFilters || {});

  const buildUrl = (f?: PublicationsFilters) => {
    const params = new URLSearchParams();
    const eff = f || filters || {};
    if (eff.search) params.set('search', eff.search);
    if (eff.motCle) params.set('mot_cle', eff.motCle);
    if (eff.citation) params.set('citation', eff.citation);
    if (eff.year) params.set('year', String(eff.year));
    if (typeof eff.minFacteurImpact === 'number') params.set('min_facteur_impact', String(eff.minFacteurImpact));
    if (eff.hasPdf) params.set('has_pdf', 'true');
    if (eff.hasUrl) params.set('has_url', 'true');
    if (eff.ordering) params.set('ordering', eff.ordering);

    let url = `${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.PUBLICATIONS}`;
    const qs = params.toString();
    if (qs) url += `?${qs}`;
    return url;
  };

  const fetchPublications = async (f?: PublicationsFilters) => {
    try {
      setLoading(true);
      setError(null);

      const url = buildUrl(f);
      const response = await fetch(url, {
        ...ApiConfig.DEFAULT_OPTIONS,
        signal: AbortSignal.timeout(ApiConfig.TIMEOUT),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      const items: PublicationAPI[] = data.results || data;
      setPublications(items);
      if (f) setFilters(f);
    } catch (err) {
      console.error('Erreur lors de la récupération des publications:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      setPublications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublications(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { publications, loading, error, refetch: fetchPublications };
};

export const usePublicationDetail = (id: number) => {
  const [publication, setPublication] = useState<PublicationDetailAPI | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      const url = `${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.PUBLICATION_DETAIL(id)}`;
      console.log(url)
      const response = await fetch(url, {
        ...ApiConfig.DEFAULT_OPTIONS,
        signal: AbortSignal.timeout(ApiConfig.TIMEOUT),
      });
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText}`);
      }
      const data: PublicationDetailAPI = await response.json();
      setPublication(data);
    } catch (err) {
      console.error('Erreur lors de la récupération de la publication:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      setPublication(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchDetail();
  }, [id]);

  return { publication, loading, error, refetch: fetchDetail };
};
