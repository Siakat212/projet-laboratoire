import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, Clock, Users, ExternalLink, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";
import PageSlider from "./PageSlider";
import PageHero from "./PageHero";
import { Constants } from "@/constants/Constants";
import ApplicationModal from "./ApplicationModal";
import { useParcours, useParcoursDetail } from "@/hooks/useParcours";
import { ParcourListAPI } from "@/config/ApiConfig";

interface LevelProps {
  laboratoireFilter?: string;
  laboratoireNom?: string;
}

const Level = ({ laboratoireFilter, laboratoireNom }: LevelProps) => {
  const [selectedMaster, setSelectedMaster] = useState<string>('');
  const [selectedParcoursId, setSelectedParcoursId] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Récupération des données des parcours depuis l'API avec filtre laboratoire
  const { parcours, loading, error, refetch } = useParcours(laboratoireFilter);

  const openApplicationModal = (masterTitle: string, parcoursId: number) => {
    setSelectedMaster(masterTitle);
    setSelectedParcoursId(parcoursId);
    setIsModalOpen(true);
  };

  // Composant de chargement
  const LoadingComponent = () => (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
        <p className="text-muted-foreground">Chargement des parcours...</p>
      </div>
    </div>
  );

  // Composant d'erreur
  const ErrorComponent = () => (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <AlertCircle className="h-8 w-8 mx-auto mb-4 text-destructive" />
        <p className="text-foreground font-medium mb-2">Erreur lors du chargement</p>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button onClick={() => refetch()} variant="outline">
          Réessayer
        </Button>
      </div>
    </div>
  );

  // Composant vide
  const EmptyComponent = () => (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <GraduationCap className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
        <p className="text-foreground font-medium mb-2">
          {laboratoireNom ? `Aucun parcours disponible pour ${laboratoireNom}` : "Aucun parcours disponible"}
        </p>
        <p className="text-muted-foreground">
          {laboratoireNom 
            ? `Ce laboratoire ne propose pas encore de parcours de formation.`
            : "Les parcours de formation seront bientôt disponibles."
          }
        </p>
      </div>
    </div>
  );

  // Composant pour afficher une carte de parcours
  const ParcoursCard = ({ parcour, onApply }: { parcour: ParcourListAPI; onApply: (title: string, id: number) => void }) => {
    const { parcours: detailParcours, loading: detailLoading } = useParcoursDetail(parcour.id);
    
    return (
      <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden bg-gradient-to-br from-card via-card/95 to-primary/5 group relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/15 to-transparent rounded-bl-full opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
        <CardContent className="p-8 relative z-10">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-2xl font-bold text-foreground pr-4 group-hover:text-primary transition-colors duration-300">
                    {parcour.nom_parour}
                  </h2>
                  <Badge variant="secondary" className="flex-shrink-0 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/20 hover:from-primary/30 hover:to-primary/20 transition-all duration-300">
                    {parcour.statu}
                  </Badge>
                </div>
                <p className="text-lg text-primary font-medium mb-3">
                  {parcour.laboratoire_nom} ({parcour.laboratoire_ufr})
                </p>
                <p className="text-foreground/80 leading-relaxed">{parcour.description}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10 transition-all duration-300">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <div className="w-2 h-5 bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
                    Spécialisations
                  </h3>
                  <div className="space-y-2">
                    {detailLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        <span className="text-sm text-muted-foreground">Chargement...</span>
                      </div>
                    ) : detailParcours?.specialisations && detailParcours.specialisations.length > 0 ? (
                      detailParcours.specialisations.map((spec, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-sm text-foreground/80">{spec.specialisation}</span>
                        </div>
                      ))
                    ) : (
                      <span className="text-sm text-foreground/80">Spécialisations à définir</span>
                    )}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-r from-accent/5 to-transparent hover:from-accent/10 transition-all duration-300">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <div className="w-2 h-5 bg-gradient-to-b from-accent to-accent/50 rounded-full"></div>
                    Débouchés
                  </h3>
                  <div className="space-y-2">
                    {detailLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        <span className="text-sm text-muted-foreground">Chargement...</span>
                      </div>
                    ) : detailParcours?.debouches && detailParcours.debouches.length > 0 ? (
                      detailParcours.debouches.map((debouche, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-accent rounded-full"></div>
                          <span className="text-sm text-foreground/80">{debouche.deboucher}</span>
                        </div>
                      ))
                    ) : (
                      <span className="text-sm text-foreground/80">Débouchés à définir</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-muted/30 to-transparent">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <div className="w-2 h-5 bg-gradient-to-b from-foreground to-foreground/50 rounded-full"></div>
                  Conditions d'admission
                </h3>
                <div className="flex flex-wrap gap-2">
                  {detailLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      <span className="text-sm text-muted-foreground">Chargement...</span>
                    </div>
                  ) : detailParcours?.conditions_admission && detailParcours.conditions_admission.length > 0 ? (
                    detailParcours.conditions_admission.map((condition, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs bg-gradient-to-r from-background to-muted/20 border-border/30 hover:border-primary/30 transition-all duration-300">
                        {condition.titre}{condition.valeur && `: ${condition.valeur}`}
                      </Badge>
                    ))
                  ) : (
                    <Badge variant="outline" className="text-xs bg-gradient-to-r from-background to-muted/20 border-border/30">
                      Conditions à définir
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Stats & Actions */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-accent/20 via-accent/10 to-accent/5 rounded-xl p-6 space-y-4 border border-accent/20 hover:border-accent/30 transition-all duration-300">
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/10 transition-colors duration-200">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Durée: {parcour.duree_formation} ans</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/10 transition-colors duration-200">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{parcour.nombre_etudiant_max} étudiants max</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/10 transition-colors duration-200">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Créé le {new Date(parcour.date_creation).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  onClick={() => onApply(parcour.nom_parour, parcour.id)}
                >
                  Candidater
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full bg-gradient-to-r from-background to-primary/5 border-primary/20 hover:border-primary/40 hover:bg-primary hover:text-white transition-all duration-300"
                  onClick={() => window.location.href = '/contact'}
                >
                  Plus d'informations
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <section 
      className="pt-16" 
      style={{
        ...Constants.pdTopCardApresNav,
        ...Constants.bgPrincipal,
      }}
    >
      <div>
        <div 
          className={Constants.classApresNavbar}
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(var(--primary-rgb), 0.1), rgba(var(--primary-rgb), 0.05)), url(https://images.unsplash.com/photo-1523240795612-9a054b0db644)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background/90 to-background/70 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-foreground mb-4 drop-shadow">
              {laboratoireNom ? `Masters du ${laboratoireNom}` : "Masters Liés au Laboratoire"}
            </h1>
            <p className="text-xl text-foreground/90 max-w-3xl mx-auto drop-shadow">
              {laboratoireNom 
                ? `Découvrez les programmes de Master proposés par ${laboratoireNom}, offrant une formation d'excellence et des opportunités de recherche uniques.`
                : "Découvrez les programmes de Master en partenariat avec notre laboratoire, offrant une formation d'excellence et des opportunités de recherche uniques."
              }
            </p>
          </div>

          
        </div>

        <div 
          className={"space-y-8 " + Constants.ClassPdXgrandBlock}
          style={Constants.bgWhite}
        >
          {loading ? (
            <LoadingComponent />
          ) : error ? (
            <ErrorComponent />
          ) : parcours.length === 0 ? (
            <EmptyComponent />
          ) : (
            parcours.map((parcour, index) => (
              <ParcoursCard key={parcour.id} parcour={parcour} onApply={openApplicationModal} />
            ))
          )}
        </div>

        <ApplicationModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          masterTitle={selectedMaster}
          parcoursId={selectedParcoursId}
        />

        <div className={"text-center rounded-2xl overflow-hidden" + Constants.ClassPdXgrandBlock}>
          <Card style={{ backgroundColor: "transparent"}} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-card via-card/95 to-primary/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/15 to-transparent rounded-bl-full"></div>
            <CardContent className="p-8 relative z-10">
              <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
                <div className="w-2 h-8 bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
                Intéressé par nos programmes ?
                <div className="w-2 h-8 bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
                Contactez-nous pour obtenir plus d'informations sur les conditions d'admission, 
                les stages disponibles et les opportunités de collaboration avec notre laboratoire.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  onClick={() => window.location.href = '/contact'}
                >
                  Nous contacter
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-gradient-to-r from-background to-primary/5 border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                  onClick={() => window.open('/brochure.pdf', '_blank')}
                >
                  Télécharger la brochure
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      

    </section>
  );
};

// Export de l'interface pour utilisation externe
export type { LevelProps };

export default Level;