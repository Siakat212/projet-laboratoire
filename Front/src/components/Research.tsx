import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, Calendar, Users, Trophy, Search, ChevronUp, ChevronDown, Zap } from "lucide-react";
import PageSlider from "./PageSlider";
import PageHero from "./PageHero";
import { Constants } from "@/constants/Constants";
import NoResults from "./NoResults";
import { usePluseMoins } from "@/hooks/use-plus-moins"
import { highlightText } from "@/fonction/SurlignageText"
import { Link } from "react-router-dom";

const Research = (donnee) => {
  const dataSlider = donnee.donnee.dataSilder.data;
  const dataEntete = donnee.donnee.dataEnteteGeneral.data;
  const dataAll = donnee.donnee.dataAll.data;

  const rechercheAfficherParDefault = 10
  
  let tableId = []
  let projetAll = []
  for (let i of dataAll) {
    if (!tableId.includes(i.id_recherche)) {
      tableId.push(i.id_recherche)
      i['tags'] = dataAll.filter((element) => element.id_recherche === i.id_recherche)
      projetAll.push(i)

    }
  }

  const projectsAll = projetAll
  const [projects, setPrjects] = useState(projectsAll.slice(0, rechercheAfficherParDefault))
  const {plus , moins, parSaut} = usePluseMoins(projects, setPrjects, projectsAll.length, projectsAll, rechercheAfficherParDefault)

  const [searchTerm, setSearchTerm] = useState("");

  const tailleAvantFiltre = projects.length
  const filteredProjects = projects.filter(project =>
    project.titre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En cours": return "bg-primary text-primary-foreground";
      case "Terminer": return "bg-green-500 text-white";
      case "Planifier": return "bg-orange-500 text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <section 
      id="research" 
      className="pt-20" 
      style={{
        ...Constants.pdTopCardApresNav,
        ...Constants.bgPrincipal,
      }}
      >
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,_hsl(var(--primary))_1px,_transparent_1px)] [background-size:30px_30px]" />
      </div>
      <div className="relative z-10">
        <div 
          className={Constants.classApresNavbar}
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(var(--primary-rgb), 0.1), rgba(var(--primary-rgb), 0.05)), url(https://images.unsplash.com/photo-1581093458791-9f3c3250e675)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm"></div>
          <div className="relative z-10 mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 drop-shadow-sm">
              {dataSlider.titre}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
              {dataSlider.description}
            </p>
          </div>
        
          <PageHero 
            stats={[
              { value: String(dataSlider && dataSlider.nombreRechercheActif ? parseInt(dataSlider.nombreRechercheActif) > 1000 ? '1000+' : dataSlider.nombreRechercheActif : "0"), label: "Projets Actifs" },
              { value: String(dataSlider && dataSlider.nombrePublication ? parseInt(dataSlider.nombrePublication) > 1000 ? '1000+' : dataSlider.nombrePublication : "0"), label: "Publications" },
              { value: String(dataSlider && dataSlider.nombreRechercheTerminer ? parseInt(dataSlider.nombreRechercheTerminer) > 1000 ? '1000+' : dataSlider.nombreRechercheTerminer : "0"), label: "Projets Terminés" }
            ]}
          />
        </div>

        <div 
          className={Constants.ClassPdXgrandBlock}
          style={Constants.bgWhite}
          id="ProjectBlockAll"
        >
          {/* Search Input */}
          <div className="mb-10">
            <div className={searchTerm === '' ? "relative max-w-md mx-auto" : "relative mx-auto"}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un projet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>   
              {searchTerm.length > 0 ? 
                <div className="relative z-10 mb-8 flex gap-10 mt-2">
                  <p className="">{filteredProjects.length} {filteredProjects.length <= 1 ? `element trouvé` : "elements trouvés"} par rapport au {tailleAvantFiltre} precedent </p>
                </div> : null
              }         
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.length > 0 ? filteredProjects.map((project, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-card to-card/90 group hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-50" />
                
                <CardHeader className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <Badge className={`${getStatusColor(project.statu)} shadow-sm`}>{project.statu}</Badge>
                    <Link to={`/research/${project.id}`} className="text-primary hover:text-primary/80 mb-4 block">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="hover:bg-primary/10 hover:text-primary rounded-full transition-all duration-300 hover:scale-110"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </Link>
                    
                  </div>
                  <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                    {highlightText(project.titre, searchTerm)}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    <span
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'normal',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        display: '-webkit-box',
                        maxHeight: '3em', // Approx. 2 lines
                      }}
                    >
                      {project.description}
                    </span>
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-300">
                        {tag.nomDomaine}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-gradient-to-br from-muted/50 to-muted/30 rounded-lg group-hover:shadow-md transition-all duration-300">
                      <Calendar className="h-5 w-5 text-primary mx-auto mb-2" />
                      <div className="text-sm font-medium text-foreground">{project.periode ? project.periode : 0}</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-muted/50 to-muted/30 rounded-lg group-hover:shadow-md transition-all duration-300">
                      <Users className="h-5 w-5 text-primary mx-auto mb-2" />
                      <div className="text-sm font-medium text-foreground">{project.nombreChercheur ? project.nombreChercheur : 0} {parseInt(project.nombreChercheur) > 1 ? "Chercheurs" : 'Chercheur' }</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-muted/50 to-muted/30 rounded-lg group-hover:shadow-md transition-all duration-300">
                      <Zap className="h-5 w-5 text-primary mx-auto mb-2" />
                      <div className="text-sm font-medium text-foreground">{project.tags.length > 1 ? project.tags.length + ' Domaine' : project.tags.length + ' Domaines'} d'expertise</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )) : (
              <NoResults 
                type="research" 
                searchTerm={searchTerm}
                onClearSearch={() => setSearchTerm("")}
              />
            )}
          </div>

          {filteredProjects.length > 0 ? 
            <div className="text-center mt-10">
              <Button
                disabled = {projectsAll.length > projects.length ? false : true }
                onClick={plus}
                variant="outline"
                className="px-8 py-2"
              >
                <ChevronDown className="mr-2 h-4 w-4" />
                Augmenté de {parSaut}
              </Button>

              <Button 
                disabled = {parSaut < projects.length ? false : true }
                onClick={moins}
                variant="outline"
                className="px-8 py-2 ml-10"
              >
                <ChevronUp className="mr-2 h-4 w-4" />
                Reduire de {parSaut}
              </Button>
            </div> : null 
          }

        </div>
      </div>
    </section>
  );
};

export default Research;