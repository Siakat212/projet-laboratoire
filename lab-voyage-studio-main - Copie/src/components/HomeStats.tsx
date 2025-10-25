import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Zap, Target, Globe, Users, TrendingUp } from "lucide-react";
import { Constants } from "@/constants/Constants";

const HomeStats = (donnee) => {
  const donnees = donnee.donnee.data.data 
  const dataEntete = donnee.donnee.dataEnteteGeneral.data
  
  const stats = [
    {
      icon: Users,
      value: donnees && donnees.nombreChercheur ? parseInt(donnees.nombreChercheur) > 1000 ? "1000+" : donnees.nombreChercheur : 0 ,
      label: "Chercheurs",
      description: "Experts internationaux",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Lightbulb,
      value: donnees && donnees.nombrePublication ? parseInt(donnees.nombrePublication) > 1000 ? "1000+" : donnees.nombrePublication : 0 ,
      label: "Publications",
      description: "Revues prestigieuses",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      icon: Target,
      value: donnees && donnees.nombreRechercheActif ? parseInt(donnees.nombreRechercheActif) > 1000 ? "1000+" : donnees.nombreRechercheActif : 0 ,
      label: "Projets Actifs",
      description: "Recherches en cours",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: Globe,
      value: donnees && donnees.nombrePartenaire ? parseInt(donnees.nombrePartenaire) > 1000 ? "1000+" : donnees.nombrePartenaire : 0 ,
      label: "Collaborations",
      description: "Partenaires mondiaux",
      color: "text-info",
      bgColor: "bg-info/10"
    },
    {
      icon: Zap,
      value: donnees && donnees.nombreDomaine ? parseInt(donnees.nombreDomaine) > 1000 ? "1000+" : donnees.nombreDomaine : 0 ,
      label: "Expertise",
      description: "Domaines expertises",
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      icon: donnees.nombreDoctorant !== 0 ? Users : TrendingUp,
      value: donnees.nombreDoctorant !== 0 ? donnees.nombreDoctorant : donnees.nombreRechercherFinaliser ? donnees.nombreRechercherFinaliser + "%" : 0+"%",
      label: donnees.nombreDoctorant !== 0 ? "doctorant" : "Taux de Réussite",
      description: donnees.nombreDoctorant !== 0 ? "Nombre de Doctorant" : "Projets finalisés",
      color: "text-success",
      bgColor: "bg-success/10"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,_hsl(var(--primary))_1px,_transparent_1px)] [background-size:30px_30px]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {dataEntete
              .filter((item) => item.block === "chiffre" && item.page === "acceuil")
              .map((item, idx) => (
                <span key={idx}>{item.titre}</span>
              ))} 
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {dataEntete
              .filter((item) => item.block === "chiffre" && item.page === "acceuil")
              .map((item, idx) => (
                <span key={idx}>{item.description}</span>
              ))} 
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-card to-card/90 group hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-50" />
              
              <CardContent className="p-8 text-center relative z-10">
                <div className={`w-16 h-16 mx-auto mb-6 ${stat.bgColor} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className={`text-4xl font-bold ${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.value}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {stat.label}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeStats;