import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Microscope, Target, Users, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Constants } from "@/constants/Constants";

const HomeAbout = (donnee) => {
  const dataPresentation = donnee.donnee.data.data
  const dataEntete = donnee.donnee.dataEnteteGeneral.data

  
  
  return (
    <section className="py-20 px-5" style={Constants.bgWhite} id="about">
      <div className={Constants.ClassPdXgrandBlock}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {dataEntete
                  .filter((item) => item.block === "about" && item.page === "acceuil")
                  .map((item, idx) => (
                    <span key={idx}>{item.titre}</span>
                  ))}
                
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {dataEntete
                  .filter((item) => item.block === "about" && item.page === "acceuil")
                  .map((item, idx) => (
                    <span key={idx}>{item.description}</span>
                  ))}              
                </p>
            </div>

            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                {dataPresentation.mission}              
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Microscope className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Recherche Avancée</h4>
                    <p className="text-sm text-muted-foreground">Technologies de pointe</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Collaboration</h4>
                    <p className="text-sm text-muted-foreground">Équipe multidisciplinaire</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Innovation</h4>
                    <p className="text-sm text-muted-foreground">Solutions concrètes</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Impact Global</h4>
                    <p className="text-sm text-muted-foreground">Rayonnement international</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link to="/about">
                <Button 
                  size="lg" 
                  className="group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Voir Plus
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual Section */}
          <div className="relative">
            <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-card via-card to-card/80">
              <CardContent className="p-0">
                <div className="relative h-96 overflow-hidden">
                  <div 
                    className="w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${Constants.urlDomaine}${dataPresentation.image})`
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  
                  {/* Floating stats */}
                  <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                    <div className="text-2xl font-bold text-primary">{dataPresentation && dataPresentation.nombreAnneeExperience ? parseInt(dataPresentation.nombreAnneeExperience) > 1000 ? "1000+" : dataPresentation.nombreAnneeExperience : 0 }</div>
                    <div className="text-sm text-muted-foreground">Années d'expérience</div>
                  </div>
                  
                  <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                    <div className="text-2xl font-bold text-primary">{dataPresentation && dataPresentation.nombreRechercherFinaliser ? parseInt(dataPresentation.nombreRechercherFinaliser) > 1000 ? "1000+" : dataPresentation.nombreRechercherFinaliser : 0 }</div>
                    <div className="text-sm text-muted-foreground">Projets réalisés</div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-1/3 right-8 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-pulse" />
                  <div className="absolute bottom-1/3 left-8 w-12 h-12 bg-primary/15 rounded-full blur-lg animate-pulse delay-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;