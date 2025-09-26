import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Trophy, Users, BookOpen, ChevronUp, ChevronDown } from "lucide-react";
import PageSlider from "./PageSlider";
import PageHero from "./PageHero";
import { Constants } from "@/constants/Constants";
import { useState } from "react";
import { usePluseMoins } from "@/hooks/use-plus-moins"
import { Link } from "react-router-dom";
import { dateFormatter } from "@/fonction/FormatterDate";



const News = (donnee) => {
  const newsItems = donnee.donnee.dataAll.data;
  const dataSilder = donnee.donnee.dataSilder.data;
  
  const nombreNeDefault = 10
  const [news, setNews] = useState(newsItems.slice(0, nombreNeDefault));

  const tailleNewsItems = newsItems.length
  const {plus , moins, parSaut} = usePluseMoins(news, setNews, tailleNewsItems, newsItems, nombreNeDefault)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Prix": return "bg-yellow-500 text-white";
      case "Partenariat": return "bg-blue-500 text-white";
      case "Publication": return "bg-green-500 text-white";
      case "Événement": return "bg-purple-500 text-white";
      case "Infrastructure": return "bg-orange-500 text-white";
      case "Équipe": return "bg-cyan-500 text-white";
      case "highlight": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Important": return "bg-primary-soft text-primary border-primary/20";

      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <section 
      id="news" 
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
            backgroundImage: `linear-gradient(135deg, rgba(var(--primary-rgb), 0.1), rgba(var(--primary-rgb), 0.05)), url(https://images.unsplash.com/photo-1485827404703-89b55fcc595e)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 drop-shadow-sm">
              {dataSilder && dataSilder.titre ? dataSilder.titre : "Actualités du Laboratoire"}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
              {dataSilder && dataSilder.description ? dataSilder.description : null}
            </p>
          </div>
          <PageHero 
            stats={[
              { value: String(dataSilder && dataSilder.nombrePublicationCeMois ? parseInt(dataSilder.nombrePublicationCeMois) > 1000 ? "100+" : dataSilder.nombrePublicationCeMois : 0), label: "Publications/mois" },
              { value: String(dataSilder && dataSilder.nombreEvenementActif ? parseInt(dataSilder.nombreEvenementActif) > 1000 ? "100+" : dataSilder.nombreEvenementActif : 0), label: "Événements Actifs" },
              { value: String(dataSilder && dataSilder.nombrePublicationTotal ? parseInt(dataSilder.nombrePublicationTotal) > 1000 ? "100+" : dataSilder.nombrePublicationTotal : 0), label: "Publications Totales" }
            ]}
          />
        </div>

        <div 
          className={Constants.ClassPdXgrandBlock}
            style={Constants.bgWhite}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {news.map((item, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-card to-card/90 group hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-50" />
                
                <CardHeader className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3 flex-wrap">
                      {item.typeNew.map((type, id) => (
                        <Badge className={`${getCategoryColor(type.typeNew)} shadow-sm`}>
                          {type.typeNew}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm bg-muted/30 rounded-full px-3 py-1">
                      <Calendar className="h-4 w-4" />
                      {item.date_realisation_fin ? dateFormatter(item.date_realisation_debut) + ' - ' + dateFormatter(item.date_realisation_fin) : dateFormatter(item.date_realisation_debut)}
                    </div>
                  </div>
                  <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors duration-300 flex items-start gap-4 flex items-center">
                    <div className="p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg group-hover:shadow-md transition-all duration-300 group-hover:scale-110">
                    </div>
                    <span className="leading-tight">{item.titre}</span>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed font-medium">
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
                        {item.phrase_cle}
                      </span>
                    </p>
                    <div className="bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg p-4 border-l-4 border-primary/30">
                      <p className="text-muted-foreground text-sm leading-relaxed">
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
                          {item.contenu_complet}
                        </span>
                      </p>
                    </div>
                    <Link to={`/news/${item.id}`}>
                      <Button 
                        variant="ghost" 
                        className="text-primary hover:text-primary/80 hover:bg-primary/10 p-0 h-auto font-semibold group/button transition-all duration-300"
                      >
                        Lire la suite
                        <ArrowRight className="h-4 w-4 ml-2 group-hover/button:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              disabled = {tailleNewsItems > news.length ? false : true }
              onClick={plus}
              variant="outline"
              className="px-8 py-2"
            >
              <ChevronDown className="mr-2 h-4 w-4" />
              Augmenté de {parSaut}
            </Button>

            <Button 
              disabled = {parSaut < news.length ? false : true }
              onClick={moins}
              variant="outline"
              className="px-8 py-2 ml-10"
            >
              <ChevronUp className="mr-2 h-4 w-4" />
              Reduire de {parSaut}
            </Button>
          </div>

        </div>
      </div>
      
      {/* <PageSlider 
        title="Événements à Venir"
        backgroundImage="photo-1523712999610-f77fbcfc3843"
        items={[
          {
            id: 1,
            title: "Conférence Internationale IA",
            description: "Présentation de nos dernières avancées en intelligence artificielle - 15 Mars 2024."
          },
          {
            id: 2,
            title: "Journée Portes Ouvertes",
            description: "Découverte de nos laboratoires et rencontre avec l'équipe - 22 Mars 2024."
          },
          {
            id: 3,
            title: "Symposium Biotechnologies",
            description: "Échanges sur les innovations en thérapie génique - 5 Avril 2024."
          },
          {
            id: 4,
            title: "Forum Innovation",
            description: "Présentation des projets de recherche aux industriels - 18 Avril 2024."
          },
          {
            id: 5,
            title: "Colloque Énergies Vertes",
            description: "Débats sur les solutions énergétiques durables - 2 Mai 2024."
          }
        ]}
      /> */}
    </section>
  );
};

export default News;