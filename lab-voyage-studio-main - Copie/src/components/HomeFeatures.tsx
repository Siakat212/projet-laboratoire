import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Microscope, Lightbulb, Users, Award, BookOpen, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Constants } from "@/constants/Constants";

const HomeFeatures = (donnee) => {

  const dataEntete = donnee.donnee.dataEnteteGeneral.data

  const features = [
    {
      icon: Microscope,
      title: "Nos Recherches",
      description: "Des projets de recherche révolutionnaires dans les domaines de pointe",
      color: "bg-gradient-to-br from-primary to-info",
      link: "/research"
    },
    {
      icon: Users,
      title: "Notre Équipe",
      description: "Une équipe multidisciplinaire de chercheurs renommés",
      color: "bg-gradient-to-br from-secondary to-success",
      link: "/team"
    },
    {
      icon: BookOpen,
      title: "Nos Publications",
      description: "Plus de 150 publications dans les revues les plus prestigieuses",
      color: "bg-gradient-to-br from-accent to-warning",
      link: "/publications"
    },
    {
      icon: Award,
      title: "Nos Innovations",
      description: "Récompensés pour nos avancées scientifiques majeures",
      color: "bg-gradient-to-br from-warning to-accent",
      link: "/news"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden" style={Constants.bgPrincipal}>
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,_hsl(var(--primary))_1px,_transparent_1px)] [background-size:30px_30px]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {dataEntete
                .filter((item) => item.block === "racourci" && item.page === "acceuil")
                .map((item, idx) => (
                  <span key={idx}>{item.titre}</span>
                ))}  
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {dataEntete
              .filter((item) => item.block === "racourci" && item.page === "acceuil")
              .map((item, idx) => (
                <span key={idx}>{item.description}</span>
              ))}           
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Link key={index} to={feature.link}>
              <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-card to-card/90 group hover:-translate-y-2 relative overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="p-8 text-center relative z-10 h-full flex flex-col">
                  <div className={`w-16 h-16 mx-auto mb-6 ${feature.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                  <div className="mt-6 text-primary group-hover:text-primary/80 transition-colors duration-300 flex items-center justify-center gap-2">
                    <span className="text-sm font-medium">En savoir plus</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFeatures;