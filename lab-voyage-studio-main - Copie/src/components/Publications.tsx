import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Download, Quote } from "lucide-react";
import { Constants } from "@/constants/Constants";
import { usePublications } from "@/hooks/usePublications";

const Publications = () => {
  const [publicationsCount, setPublicationsCount] = useState(0);
  const [citationsCount, setCitationsCount] = useState(0);
  const [journalsCount, setJournalsCount] = useState(0);
  const [nombreAfficher, setNombreAfficher] = useState(3);
  const { publications, loading, error, refetch } = usePublications();

  const AfficherPlus = () => {
    nombreAfficher === 3 ? setNombreAfficher(-1) : setNombreAfficher(5);
  };

  const handleDownloadPDF = (pub: any) => {
    const url = pub.fichier_url || pub.url_publication;
    if (url) {
      window.open(url, '_blank');
    } else {
      alert('Aucun fichier/URL de publication disponible.');
    }
  };

  useEffect(() => {
    const animateCounter = (setter: (value: number) => void, target: number, duration: number = 2000) => {
      let start = 0;
      const increment = target / (duration / 50);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(start));
        }
      }, 50);
    };

    const totalPublications = publications.length || 0;
    const totalCitations = publications.reduce((sum, p) => sum + (p.citations_count ?? 0), 0);
    const doiCount = publications.filter(p => (p.doi && p.doi.trim() !== '')).length;

    animateCounter(setPublicationsCount, totalPublications);
    animateCounter(setCitationsCount, totalCitations);
    animateCounter(setJournalsCount, doiCount);
  }, [publications]);

  const newNombreAfficher = nombreAfficher === -1 ? publications.length : 3;
  const publicationsFiltrer = publications.slice(0, newNombreAfficher);

  const formatYear = (dateStr?: string | null) => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : d.getFullYear();
  };

  return (
    <section 
      id="publications" 
      className="pt-20" 
      style={{
        ...Constants.pdTopCardApresNav,
        ...Constants.bgPrincipal,
      }}
    >
      <div>
        <div 
          className={Constants.classApresNavbar}
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(var(--primary-rgb), 0.1), rgba(var(--primary-rgb), 0.05)), url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background/90 to-background/70 backdrop-blur-sm" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 drop-shadow-sm">
              Publications & Recherches
            </h2>
            <p className="text-xl text-foreground/90 max-w-3xl mx-auto leading-relaxed drop-shadow">
              Nos travaux de recherche publiés dans les revues scientifiques les plus prestigieuses 
              contribuent à l'avancement des connaissances mondiales.
            </p>
          </div>
          
        </div>

        {/* <div 
          className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 " + Constants.ClassPdXgrandBlock}
          style={Constants.bgWhite}
        >
          <Card className="bg-primary-soft border-primary/20 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">{publicationsCount}+</div>
              <div className="text-primary font-medium">Publications</div>
             
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">{citationsCount.toLocaleString()}</div>
              <div className="text-green-600 font-medium">Citations</div>
              
            </CardContent>
          </Card>
          <Card className="bg-orange-50 border-orange-200 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">{journalsCount}</div>
              <div className="text-orange-600 font-medium">Publications avec DOI</div>
              
            </CardContent>
          </Card>
        </div> */}

        <div className={"space-y-8 " + Constants.ClassPdXgrandBlock}>
          {publicationsFiltrer.map((pub, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-2xl transition-all duration-700 bg-gradient-to-br from-card via-card to-card/95 group hover:-translate-y-3 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <CardHeader className="relative z-10 pb-4">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3 flex-wrap">
                    {pub.recherche_titre && (
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-medium">
                        {pub.recherche_titre}
                      </Badge>
                    )}
                    {formatYear(pub.date_publication) && (
                      <Badge variant="secondary" className="bg-gradient-to-r from-primary/15 to-primary/10 border border-primary/20 font-semibold">
                        {formatYear(pub.date_publication)}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="hover:bg-primary/10 hover:text-primary rounded-full transition-all duration-300 hover:scale-110"
                      onClick={() => {
                        // Route détail à implémenter si besoin
                        const url = pub.url_publication || pub.fichier_url;
                        if (url) window.open(url, '_blank');
                        else window.location.href = `/publications/${pub.id}`
                      }}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="hover:bg-green-100 hover:text-green-600 rounded-full transition-all duration-300 hover:scale-110"
                      onClick={() => handleDownloadPDF(pub)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <CardTitle className="text-xl lg:text-2xl text-foreground group-hover:text-primary transition-colors duration-500 leading-tight font-bold mb-4">
                  {pub.titre}
                </CardTitle>

                {pub.resume && (
                  <div className="bg-gradient-to-br from-muted/40 via-muted/30 to-muted/20 rounded-xl p-5 border border-border/50 group-hover:border-primary/20 transition-colors duration-500">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg">
                        <Quote className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-foreground/80 font-medium text-sm lg:text-base">{pub.resume}</p>
                    </div>
                  </div>
                )}
              </CardHeader>
              
              <CardContent className="relative z-10 pt-2">
                {pub.resume && (
                  <div className="bg-gradient-to-br from-background via-background/95 to-background/90 rounded-xl p-6 border-l-4 border-primary/50 border border-border/30">
                    <h4 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">Résumé</h4>
                    <p className="text-foreground/80 text-sm lg:text-base leading-relaxed">
                      {pub.resume}
                    </p>
                  </div>
                )}

                <div className="mt-6 flex justify-end">
                  <Button 
                    variant="outline" 
                    className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 hover:from-primary/20 hover:to-accent/20 hover:border-primary/50 text-primary"
                    onClick={() => {
                      window.location.href = `/publications/${pub.id}`;
                    }}
                  >
                    Lire l'article complet
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mb-12">
          <Button 
            variant="outline" 
            size="lg"
            className="bg-gradient-to-r from-background to-primary/5 border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            onClick={AfficherPlus}
          >
            {nombreAfficher === -1 ? 'Réduire les Publications' : 'Voir Toutes les Publications'}
          </Button>
        </div>
      </div>
      
      
    </section>
  );
};

export default Publications;