import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Constants } from "@/constants/Constants";

const HomeDirector = (donnee) => {
  const director = donnee.donnee.data.data
    const dataEntete = donnee.donnee.dataEnteteGeneral.data  

  return (
    <section className="py-20 px-5" style={Constants.bgWhite}>
      <div className={Constants.ClassPdXgrandBlock}>
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">
            Direction
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            {dataEntete
              .filter((item) => item.block === "director" && item.page === "acceuil")
              .map((item, idx) => (
                <span key={idx}>{item.titre}</span>
              ))} 
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {dataEntete
              .filter((item) => item.block === "director" && item.page === "acceuil")
              .map((item, idx) => (
                <span key={idx}>{item.description}</span>
              ))}  
          </p>
        </div>

        <Card className="max-w-6xl mx-auto overflow-hidden border-0 shadow-2xl  backdrop-blur-sm" style = {Constants.bgPrincipal}>
          <CardContent className="p-0">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative overflow-hidden">
                <div 
                  className="h-80 lg:h-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${Constants.url}/${director.image})`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  
                  {/* Floating elements */}
                  <div className="absolute top-6 right-6 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                  <div className="absolute bottom-8 left-8 w-12 h-12 bg-primary/15 rounded-full blur-lg animate-pulse delay-500"></div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 lg:p-12 space-y-6">
                <div className="space-y-3">
                  <h3 className="text-3xl lg:text-4xl font-bold text-foreground">
                    {director.name}
                  </h3>
                  <p className="text-xl text-primary font-medium">
                    {director.title}
                  </p>
                </div>

                <p className="text-muted-foreground leading-relaxed text-lg">
                  {director.bio.substring(0, 200)}...
                </p>

                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors duration-200">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">Email</div>
                      <div className="text-sm text-muted-foreground">{director.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors duration-200">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">Téléphone</div>
                      <div className="text-sm text-muted-foreground">{director.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors duration-200">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">Bureau</div>
                      <div className="text-sm text-muted-foreground">{director.office}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <Link to="/director">
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
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default HomeDirector;