import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Search, Calendar, User, Tag, Building2 } from "lucide-react";
import { Constants } from "@/constants/Constants";
import { useNavigate } from "react-router-dom";

// Typed shape of results returned by the API
interface RechercheResult {
  id: number;
  statu?: string;
  titre?: string;
  description?: string;
  periode?: string | null;
  nombreChercheur?: number;
  budget?: string | number | null;
  date_resultat?: string;
  creer_le?: string;
  mise_a_jour_le?: string;
}

const ResultatRecherche = () => {
  const navigate = useNavigate();
  
  // Helper to format budget values (string/number/null)
  const formatBudget = (budget: string | number | null | undefined) => {
    if (budget === null || budget === undefined || budget === '') return 'Non spécifié';
    const num = typeof budget === 'number' ? budget : Number(budget);
    if (Number.isNaN(num)) return 'Non spécifié';
    return `${num.toLocaleString('fr-FR')} FCFA`;
  };
  const [results, setResults] = useState<RechercheResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(1);

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentResults = results.slice(startIndex, endIndex);

  // Smart pagination helper
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Smart pagination for many pages
      if (currentPage <= 3) {
        // Show first 3 pages + ellipsis + last page
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show first page + ellipsis + last 3 pages
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Show first page + ellipsis + current-1, current, current+1 + ellipsis + last page
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle items per page change
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page
    setTotalPages(Math.ceil(results.length / newItemsPerPage));
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchResults = async () => {
      try {
        const response = await fetch(`${Constants.url}/labo_api/resultat_recherche_all`, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const allResults = data.data as RechercheResult[];
        setResults(allResults);
        setTotalPages(Math.ceil(allResults.length / itemsPerPage));
      } catch (error: any) {
        if (error?.name === 'AbortError') return;
        setError(error?.message ?? 'Erreur inconnue');
        console.error("Error fetching research results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
    return () => controller.abort();
  }, []);

  return (
    <>
      {/* Custom animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `
      }} />
      
      <section 
        id="resultats-recherche"
        className="min-h-screen"
        style={{
          ...Constants.pdTopCardApresNav,
          ...Constants.bgPrincipal,
        }}
      >
      <div className="relative">
        {/* Hero Section with improved styling */}
        <div 
          className={`${Constants.classApresNavbar} relative overflow-hidden`}
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(var(--primary-rgb), 0.1), rgba(var(--primary-rgb), 0.05))`, 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background/90 to-background/70 backdrop-blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/5 to-transparent" />
          
          <div className="relative z-10 py-12 sm:py-16 lg:py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              {/* Animated icon */}
              <div className="inline-flex items-center justify-center p-4 sm:p-5 bg-primary/10 rounded-full mb-6 sm:mb-8 shadow-lg animate-pulse">
                <Search className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
              </div>
              
              {/* Title with better typography */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4 sm:mb-6 drop-shadow-sm bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                Résultats de la Recherche
              </h1>
              
              {/* Subtitle with improved spacing */}
              <p className="text-lg sm:text-xl lg:text-2xl text-foreground/90 leading-relaxed max-w-4xl mx-auto mb-8">
                Découvrez les dernières avancées scientifiques et les projets de recherche innovants de notre laboratoire
              </p>
              
              {/* Stats or additional info */}
              <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-sm sm:text-base text-foreground/70">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span>{results.length} Projets trouvés</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>Recherche active</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative bottom border */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
        </div>

        {/* Main Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-primary/40 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
              </div>
              <p className="mt-6 text-lg text-foreground/70 font-medium">Chargement des résultats...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Erreur de chargement</h3>
              <p className="text-foreground/70 text-center max-w-md">{error}</p>
            </div>
          )}

          {/* Results Section */}
          {!loading && !error && (
            <div className="space-y-8">
              {/* Results Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {currentResults.length > 0 ? currentResults.map((result, index) => (
                  <Card
                    key={result.id}
                    className="group relative bg-card border border-border/40 shadow-sm hover:shadow-xl focus-within:shadow-xl transition-all duration-500 overflow-hidden rounded-3xl transform hover:-translate-y-2 focus-within:-translate-y-2 hover:scale-[1.02] focus-within:scale-[1.02] ring-0 hover:ring-4 focus-within:ring-4 ring-primary/20 flex flex-col h-full"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: 'fadeInUp 0.6s ease-out forwards'
                    }}
                  >
                    {/* Decorative gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Status indicator */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className={`w-3 h-3 rounded-full ${
                        result.statu === 'Terminer' ? 'bg-green-500' : 
                        result.statu === 'En cours' ? 'bg-yellow-500' : 
                        'bg-gray-500'
                      } animate-pulse`} />
                    </div>

                    <CardHeader className="pb-4 pt-8 px-8 relative z-10">
                      {/* Status badge with improved styling */}
                      <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
                        <Badge className={`rounded-full px-4 py-2 text-xs font-semibold shadow-sm ${
                          result.statu === 'Terminer' ? 'bg-green-100 text-green-700 border-green-200' :
                          result.statu === 'En cours' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                          'bg-gray-100 text-gray-700 border-gray-200'
                        }`}>
                          {result.statu}
                        </Badge>
                        <span className="text-xs text-muted-foreground/70 font-medium">Projet #{result.id}</span>
                      </div>

                      {/* Title with better typography */}
                      <CardTitle className="text-xl lg:text-2xl text-foreground leading-tight font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                        {result.titre}
                      </CardTitle>

                      {/* Metadata with improved icons and layout */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                          <User className="h-4 w-4 text-primary" />
                          <span className="font-medium">{result.nombreChercheur} Chercheurs</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                          <Building2 className="h-4 w-4 text-primary" />
                          <span className="font-medium">{formatBudget(result.budget)}</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 sm:col-span-1 col-span-1">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span className="font-medium">{result.periode ?? '—'}</span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0 px-8 pb-8 relative z-10 flex flex-col flex-grow">
                      {/* Description with better typography */}
                      <p className="text-foreground/80 text-sm lg:text-base leading-relaxed mb-6 line-clamp-3 flex-grow">
                        {result.description}
                      </p>

                      {/* Action button with improved styling - always at bottom */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-auto">
                        <div className="text-xs text-muted-foreground/60 order-2 sm:order-1">
                          Dernière mise à jour: {new Date(result.mise_a_jour_le || '').toLocaleDateString('fr-FR')}
                        </div>
                        
                        <Button
                          className="group/btn rounded-full px-6 py-3 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/60 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl order-1 sm:order-2 w-full sm:w-auto"
                          onClick={() => navigate(`/resultat-recherche/${result.id}`)}
                        >
                          <span>Voir détails</span>
                          <ExternalLink className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
              )) : (
                /* No Results State */
                <div className="col-span-full flex flex-col items-center justify-center py-20">
                  <div className="w-24 h-24 bg-muted/30 rounded-full flex items-center justify-center mb-6">
                    <Search className="w-12 h-12 text-muted-foreground/50" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">Aucun résultat trouvé</h3>
                  <p className="text-foreground/70 text-center max-w-md mb-6">
                    Aucun projet de recherche ne correspond à vos critères pour le moment.
                  </p>
                  <Button 
                    variant="outline" 
                    className="rounded-full px-6 py-3"
                    onClick={() => window.location.reload()}
                  >
                    Actualiser la page
                  </Button>
                </div>
              )}
              </div>

              {/* Pagination Section */}
              {results.length > 0 && (
                <div className="mt-16 pt-8 border-t border-border/40">
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                    {/* Results info */}
                    <div className="text-sm text-muted-foreground">
                      Affichage de <span className="font-semibold text-foreground">{startIndex + 1}</span> à <span className="font-semibold text-foreground">{Math.min(endIndex, results.length)}</span> sur <span className="font-semibold text-foreground">{results.length}</span> résultat{results.length > 1 ? 's' : ''}
                    </div>
                    
                    {/* Pagination controls */}
                    <div className="flex items-center gap-1">
                      {/* Previous button */}
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="rounded-full px-3 py-2 text-sm hover:bg-primary/5 hover:border-primary/30 hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Précédent
                      </Button>
                      
                      {/* Smart page numbers */}
                      <div className="flex items-center gap-1 mx-2">
                        {getPageNumbers().map((page, index) => (
                          page === '...' ? (
                            <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground text-sm">...</span>
                          ) : (
                            <Button
                              key={page}
                              variant="outline"
                              size="sm"
                              className={`rounded-full w-10 h-10 text-sm transition-all duration-200 ${
                                currentPage === page
                                  ? 'bg-primary text-primary-foreground border-primary shadow-sm hover:bg-primary/90 hover:text-white'
                                  : 'hover:bg-primary/5 hover:border-primary/30 hover:text-black'
                              }`}
                              onClick={() => handlePageChange(page as number)}
                            >
                              {page}
                            </Button>
                          )
                        ))}
                      </div>
                      
                      {/* Next button */}
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="rounded-full px-3 py-2 text-sm hover:bg-primary/5 hover:border-primary/30 hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        Suivant
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                  
                  {/* Page size selector */}
                  <div className="flex items-center justify-center mt-6">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-muted-foreground font-medium">Résultats par page:</span>
                      <div className="relative">
                        <select 
                          value={itemsPerPage}
                          onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                          className="appearance-none px-4 py-2 pr-8 border border-border/60 rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-200 hover:border-primary/30 cursor-pointer shadow-sm hover:shadow-md"
                        >
                          <option value="6">6</option>
                          <option value="12">12</option>
                          <option value="24">24</option>
                          <option value="48">48</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
    </>
  );
};

export default ResultatRecherche;