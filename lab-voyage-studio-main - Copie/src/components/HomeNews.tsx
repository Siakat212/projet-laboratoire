import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Constants } from "@/constants/Constants";

const HomeNews = (donnee) => {
  const news = donnee.donnee.data.data
  const dataEntete = donnee.donnee.dataEnteteGeneral.data

  return (
    <section className="py-20" style={Constants.bgPrincipal}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Section titre */}
          <div className="lg:w-1/3">
            <Badge style={Constants.textWhite} className="bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30 mb-4">
              Actualités
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              {dataEntete
                .filter((item) => item.block === "new" && item.page === "acceuil")
                .map((item, idx) => (
                  <span key={idx}>{item.titre}</span>
                ))} 
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {dataEntete
                .filter((item) => item.block === "new" && item.page === "acceuil")
                .map((item, idx) => (
                  <span key={idx}>{item.description}</span>
                ))} 
            </p>
            <Link to="/news" 
              className="inline-flex items-center px-5 py-3 text-white font-medium rounded-md shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-info hover:from-primary/90 hover:to-info/90"
            >
              Toutes les actualités
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>

          {/* Section actualités */}
          <div className="lg:w-2/3 space-y-6">
            {news.map((item, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-card to-card/90 group hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-br from-info to-info/80 rounded-full animate-pulse shadow-lg" />
                
                <CardContent className="p-6 relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br from-info to-info/80 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                      <Calendar className="h-6 w-6" />
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        {item.typeNew.map((itemtype, indextype) => (
                          <Badge key={indextype} variant="secondary" className="bg-primary/10 text-primary">
                            {itemtype.typeNew}
                          </Badge>
                        ))}
                        
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                          <Clock className="h-4 w-4" />
                          {item.date_publication}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                        {item.titre}
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {item.phrase_cle}
                      </p>
                      
                      <Link to={`/news/${item.id}`}>
                        <Button 
                          variant="ghost" 
                          className="text-primary hover:text-primary/80 hover:bg-primary/10 p-0 h-auto font-medium group/button"
                        >
                          Lire la suite
                          <ArrowRight className="h-4 w-4 ml-2 group-hover/button:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeNews;