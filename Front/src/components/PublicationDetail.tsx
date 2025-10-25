import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, ExternalLink, BookOpen, Users, ChevronDown, ChevronUp } from "lucide-react";
import { Constants } from "@/constants/Constants";
import { usePublicationDetail } from "@/hooks/usePublications";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";

// Composant pour le résumé avec possibilité d'expansion
const ResumeSection = ({ resume }: { resume: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = resume.length > 300;
  const displayText = shouldTruncate && !isExpanded ? resume.substring(0, 300) + "..." : resume;

  return (
    <div className="mb-8 p-6 bg-gradient-to-br from-slate-50/90 to-gray-100/70 dark:from-slate-900/50 dark:to-gray-800/40 rounded-2xl border border-slate-200/60 dark:border-slate-700/50 shadow-inner">
      <h3 className="text-lg font-black text-primary mb-4 flex items-center gap-2">
        <div className="w-1 h-6 bg-gradient-to-b from-primary to-primary/60 rounded-full"></div>
        Résumé Exécutif
      </h3>
      <div className="text-foreground/85 text-base leading-relaxed font-medium">
        {displayText}
        {shouldTruncate && (
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 text-primary p-0 h-auto font-semibold flex items-center gap-1"
          >
            {isExpanded ? (
              <>
                Voir moins <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                Lire la suite <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

// Composant pour le contenu avec possibilité d'expansion
const ContentSection = ({ contenu }: { contenu: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = contenu.length > 800;
  const displayText = shouldTruncate && !isExpanded ? contenu.substring(0, 800) + "..." : contenu;

  return (
    <div className="bg-white/80 dark:bg-gray-900/50 p-8 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
      <h3 className="text-lg font-black text-primary mb-4 flex items-center gap-2">
        <div className="w-1 h-6 bg-gradient-to-b from-primary to-primary/60 rounded-full"></div>
        Contenu Complet
      </h3>
      <div 
        className={`prose prose-lg max-w-none text-foreground transition-all duration-300 ${
          !isExpanded && shouldTruncate ? 'max-h-96 overflow-hidden relative' : ''
        }`}
      >
        <div dangerouslySetInnerHTML={{ __html: displayText }} />
        {!isExpanded && shouldTruncate && (
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />
        )}
      </div>
      {shouldTruncate && (
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-primary p-0 h-auto font-semibold flex items-center gap-1"
        >
          {isExpanded ? (
            <>
              Voir moins <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Lire la suite <ChevronDown className="h-4 w-4" />
            </>
          )}
        </Button>
      )}
    </div>
  );
};

function PublicationDetail() {
  const { id } = useParams();
  const pubId = parseInt(id || "0", 10);
  const { publication, loading, error } = usePublicationDetail(pubId);
  

  if (loading) {
    return (
      <section className="py-16" style={Constants.pdTopCardApresNav}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-foreground/80">Chargement de la publication...</p>
        </div>
      </section>
    );
  }

  if (error || !publication) {
    return (
      <section className="py-16" style={Constants.pdTopCardApresNav}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Publication non trouvée</h1>
            <Link to="/publications">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour aux publications
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const year = publication[0].date_publication ? new Date(publication[0].date_publication).getFullYear() : undefined;
  const openLink = () => {
    const url = publication[0].url_publication || publication[0].fichier_url || (publication[0].doi ? `https://doi.org/${publication[0].doi}` : undefined);
    if (url) window.open(url, "_blank");
  };

  return (
    <section className="py-32 bg-grid" style={Constants.pdTopCardApresNav}>
      <div className="max-w-7xl mx-auto px-12 sm:px-16 lg:px-24">
        <Link to="/publications" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Retour aux publications
        </Link>

        <Card className="border-0 shadow-2xl bg-gradient-to-br from-white via-gray-50/90 to-primary/8 dark:from-gray-900 dark:via-gray-800/95 dark:to-primary/15 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-[120px] opacity-60" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-accent/15 to-transparent rounded-tr-[80px] opacity-50" />
          <CardHeader className="relative z-10">
            <div className="flex items-start gap-6 mb-8">
              <div className="p-4 bg-gradient-to-br from-primary/25 to-primary/15 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <BookOpen className="h-10 w-10 text-primary" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-3xl lg:text-4xl text-foreground mb-4 font-black leading-tight">{publication[0].titre}</CardTitle>
                <div className="space-y-3 text-foreground/80 text-base">
                  {year && (
                    <p className="flex items-center gap-3 bg-slate-100/80 dark:bg-slate-800/60 px-4 py-2 rounded-xl">
                      <Calendar className="h-5 w-5 text-primary" /> 
                      <span className="font-semibold">Publié en {year}</span>
                    </p>
                  )}
                  {publication[0].doi && (
                    <p className="bg-slate-100/80 dark:bg-slate-800/60 px-4 py-2 rounded-xl">
                      <strong className="text-primary">DOI:</strong> 
                      <span className="font-mono ml-2">{publication[0].doi}</span>
                    </p>
                  )}
                </div>
                {publication[0].recherche_titre && (
                  <Badge className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground mt-4 px-4 py-2 text-sm font-bold shadow-md">
                    {publication[0].recherche_titre}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                {publication[0].resume && (
                  <ResumeSection resume={publication[0].resume} />
                )}
                {publication[0].contenu && (
                  <ContentSection contenu={publication[0].contenu} />
                )}
              </div>

              <div className="space-y-8">
                <Card className="p-6 bg-gradient-to-br from-blue-50/90 to-indigo-50/70 dark:from-blue-950/40 dark:to-indigo-950/30 border border-blue-200/60 dark:border-blue-800/50 shadow-lg">
                  <h4 className="font-black mb-5 text-blue-800 dark:text-blue-200 text-lg flex items-center gap-2">
                    <div className="w-2 h-6 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full"></div>
                    Métriques de Publication
                  </h4>
                  <div className="space-y-4 text-base">
                    <div className="flex justify-between items-center p-3 bg-white/80 dark:bg-gray-800/70 rounded-xl">
                      <span className="font-medium text-foreground/90">Facteur d'impact:</span>
                      <span className="font-black text-blue-700 dark:text-blue-300 text-lg">{publication[0].facteur_impact ?? '-'}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/80 dark:bg-gray-800/70 rounded-xl">
                      <span className="font-medium text-foreground/90">Année:</span>
                      <span className="font-black text-blue-700 dark:text-blue-300 text-lg">{year ?? '-'}</span>
                    </div>
                  </div>
                </Card>

                {publication[0].mots_cles && publication[0].mots_cles.length > 0 && (
                  <Card className="p-4 bg-gradient-to-br from-muted/30 to-muted/10">
                    <h4 className="font-semibold mb-3 text-foreground">Mots-clés</h4>
                    <div className="flex flex-wrap gap-2">
                      {publication[0].mots_cles.map((mc) => (
                        <Badge key={mc.id} variant="outline" className="text-xs">{mc.mot_cle}</Badge>
                      ))}
                    </div>
                  </Card>
                )}

                {publication[0].citations && publication[0].citations.length > 0 && (
                  <Card className="p-4 bg-gradient-to-br from-muted/30 to-muted/10">
                    <h4 className="font-semibold mb-3 text-foreground">Citations</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-foreground/80">
                      {publication[0].citations.map((c) => (
                        <li key={c.id}>{c.citation}</li>
                      ))}
                    </ul>
                  </Card>
                )}

                {publication[0].chercheurs && publication[0].chercheurs.length > 0 && (
                  <Card className="p-6 bg-gradient-to-br from-blue-50/95 via-indigo-50/80 to-blue-100/60 dark:from-blue-950/50 dark:via-indigo-950/40 dark:to-blue-900/30 border-2 border-blue-200/70 dark:border-blue-700/60 shadow-lg hover:shadow-xl transition-all duration-500 rounded-2xl">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-gradient-to-br from-blue-500/30 to-indigo-500/25 rounded-xl shadow-md border border-blue-300/50">
                        <Users className="h-6 w-6 text-blue-700 dark:text-blue-300" />
                      </div>
                      <div>
                        <h4 className="font-black text-blue-900 dark:text-blue-100 text-xl">
                          Équipe de Recherche
                        </h4>
                        <p className="text-sm text-blue-700 dark:text-blue-300 font-semibold">
                          {publication[0].chercheurs.length} {publication[0].chercheurs.length === 1 ? 'chercheur impliqué' : 'chercheurs impliqués'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {publication[0].chercheurs.map((chercheur, idx) => (
                        <div key={idx} className="bg-white/95 dark:bg-gray-800/95 rounded-xl p-5 border-2 border-blue-200/60 dark:border-blue-700/50 shadow-md hover:shadow-lg hover:border-blue-300/80 dark:hover:border-blue-600/70 transition-all duration-300 group/chercheur">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-lg font-black shadow-lg group-hover/chercheur:scale-110 transition-transform duration-300">
                              {chercheur.nom_complet.split(' ').map(n => n[0]).join('').substring(0, 2)}
                            </div>
                            <div className="flex-1">
                              <div className="text-lg font-black text-gray-900 dark:text-gray-100 mb-2">
                                {chercheur.nom_complet}
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="text-sm text-blue-700 dark:text-blue-300 font-bold bg-blue-100/80 dark:bg-blue-900/50 px-3 py-1.5 rounded-full border border-blue-200/60">
                                  {chercheur.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                <div className="space-y-4">
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 py-3 text-base font-bold" 
                    onClick={openLink}
                  >
                    <ExternalLink className="h-5 w-5 mr-3" />
                    Accéder à la Publication
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default PublicationDetail;