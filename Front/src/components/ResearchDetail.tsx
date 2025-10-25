import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Users, Calendar, Target, Microscope } from "lucide-react";
import { Constants } from "@/constants/Constants";

const ResearchDetail = (donnee) => {
  const dataDetail = donnee.donnee.dataDetail.data;

  const { id } = useParams();
  
  // Données d'exemple des projets de recherche
  const project = dataDetail
  


  if (!project) {
    return (
      <div className="min-h-screen bg-muted/50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Projet de recherche non trouvé</h1>
            <Link to="/research">
              <Button>Retour aux recherches</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Terminer": return "bg-green-500 text-white";
      case "En cours": return "bg-blue-500 text-white";
      case "Planifier": return "bg-gray-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  return (     
      <section className="py-16 bg-grid" style={Constants.pdTopCardApresNav}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/research" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
            <ArrowLeft className="h-4 w-4" />
            Retour aux recherches
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contenu principal */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/90">
                <CardHeader>
                  <div className="flex items-start gap-6">
                    <div className="p-4 bg-gradient-to-br from-primary/30 to-primary/10 rounded-xl shadow-sm flex items-center justify-center">
                      <Microscope className="h-10 w-10 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        {project.nomDomaine.map((nomDom, id) => (
                          <Badge
                            key={id}
                            className="bg-primary/10 text-primary border border-primary/30 font-medium px-3 py-1 rounded-full"
                          >
                            {nomDom.nomDomaine}
                          </Badge>
                        ))}
                        <Badge className={`${getStatusColor(project.statu)} font-semibold px-3 py-1 rounded-full`}>
                          {project.statu}
                        </Badge>
                      </div>
                      <CardTitle className="text-3xl font-bold text-foreground mb-2 leading-tight">
                        {project.titre}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-muted-foreground text-sm mt-1 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {(() => {
                            const [start, end] = project.periode.split(" - ");
                            const formatDate = (dateStr: string) => {
                              const date = new Date(dateStr);
                              const month = date.toLocaleString("fr-FR", { month: "long" });
                              const year = date.getFullYear();
                              return `${month} ${year}`;
                            };
                            return `${formatDate(start)} - ${formatDate(end)}`;
                          })()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {project.chercheurs.length} membres
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {project.description}
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary" />
                        Objectifs
                      </h3>
                      <ul className="space-y-2">
                        {project.objectif.map((objective, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span className="text-muted-foreground">{objective.objectif}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        Réalisations Clés
                      </h3>
                      <ul className="space-y-2">
                        {project.realisationCle.map((achievement, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-muted-foreground">{achievement.titre}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/90">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground flex items-center gap-2">
                    <Microscope className="h-5 w-5 text-primary" />
                    Informations Générales
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Période :</span>
                    <span className="font-semibold">
                      {(() => {
                        const [start, end] = project.periode.split(" - ");
                        const formatDate = (dateStr: string) => {
                          const date = new Date(dateStr);
                          const month = date.toLocaleString("fr-FR", { month: "long" });
                          const year = date.getFullYear();
                          return `${month} ${year}`;
                        };
                        return `${formatDate(start)} - ${formatDate(end)}`;
                      })()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Nombre domaine : </span>
                    <span className="font-semibold">{project.nomDomaine.length}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Partenaires :</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.partenaire.length === 0 ? (
                        <span className="text-sm text-muted-foreground">Aucun partenaire</span>
                      ) : (
                        project.partenaire.map((part, id) => (
                          <Badge
                            key={id}
                            className="bg-primary/10 text-primary border border-primary/30 font-medium px-2 py-1 rounded-full"
                          >
                            {part.nomPartenaire}
                          </Badge>
                        ))
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/90">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Équipe
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {project.chercheurs.length === 0 ? (
                      <span className="text-sm text-muted-foreground">Aucun membre</span>
                    ) : (
                      project.chercheurs.map((member, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition"
                          title={member.role_equipe.split('_').join(' ')}
                        >
                          <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                            {member.nom.charAt(0)}
                          </div>
                          <div>
                            <span className="text-base font-semibold text-foreground">
                              {member.AbregertitreAll} {member.nom} {member.prenom}
                            </span>
                            <div className="text-xs text-muted-foreground">
                              {member.role_equipe.split('_').join(' ')}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
  );
};

export default ResearchDetail;