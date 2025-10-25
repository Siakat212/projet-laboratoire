import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Quote, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DirectorDeclarations = ({ declarations }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
          Déclarations et Communications
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/40 rounded-full mx-auto"></div>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Découvrez les dernières annonces et vision stratégique de notre directrice
        </p>
      </div>
      
      <Carousel className="w-full max-w-7xl mx-auto">
        <CarouselContent className="-ml-4">
          {declarations.map((declaration, index) => (
            <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-card via-card/98 to-primary/5 overflow-hidden h-full">
                <CardContent className="p-0 h-full flex flex-col">
                  <div className="relative flex-1">
                    {/* Decorative gradient overlay */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-primary/80 to-primary/60"></div>
                    
                    {/* Quote decoration */}
                    <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                      <Quote className="h-12 w-12 text-primary" />
                    </div>
                    
                    <div className="p-6">
                      <div className="space-y-4">
                        {/* Icon & Header */}
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 via-primary/15 to-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                              <FileText className="h-6 w-6 text-primary" />
                            </div>
                          </div>
                          
                          <div className="flex-1 space-y-2">
                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                              {declaration.titre}
                            </h3>
                            <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full w-fit">
                              <Calendar className="h-3 w-3 text-primary" />
                              <span className="text-xs font-medium text-primary">
                                {new Date(declaration.date).toLocaleDateString('fr-FR', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
                        
                        <p className="text-muted-foreground leading-relaxed text-sm font-light italic line-clamp-4">
                          "{declaration.mot}"
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <div className="p-6 pt-0">
                    <Button 
                      onClick={() => navigate(`/director/declaration/${declaration.id}`)}
                      className="w-full group/btn bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <span className="mr-2">Voir plus</span>
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
};

export default DirectorDeclarations;