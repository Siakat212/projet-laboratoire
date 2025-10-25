import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, FileText, Quote, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Constants } from "@/constants/Constants";
import { useState } from "react";
import { useFetch } from "@/hooks/use-fetch";
import LoadingDots from "@/components/spinner";
import { useAttente } from "@/hooks/use-attente";

const DeclarationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [general, setGeneral] = useState(true);
  const [dataMot, loadingMot, errorMot] = useFetch(`${Constants.url}/labo_api/detail_mot_directeur/${id}`);
  

  // Combine all loading states
  const loading = loadingMot

  // Combine all error states
  const error = errorMot 

  useAttente(loading, setGeneral);

  if (loading) {
    return (
        <LoadingDots />
    );
  }

  if (error) {
    return <p>Erreur : {errorMot}</p>;
  }

  const declaration = dataMot.data
  

  if (!declaration) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Déclaration non trouvée</h1>
          <Button onClick={() => navigate('/director')} variant="outline">
            Retour à la page directeur
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={Constants.bgWhite}>
      <Navigation />
      
      <main 
        className={`${Constants.classApresNavbar} relative overflow-hidden`}
        style={{
          ...Constants.pdTopCardApresNav,
          backgroundImage: `linear-gradient(135deg, rgba(var(--primary-rgb), 0.1), rgba(var(--primary-rgb), 0.05)), url(https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-16 w-24 h-24 bg-primary/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/85 backdrop-blur-sm"></div>
        
        <div className="relative z-10">
          <div className={Constants.ClassPdXgrandBlock}>
            {/* Header */}
            <div className="mb-8">
              <Button 
                onClick={() => navigate('/director')}
                variant="outline"
                className="mb-6 hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour à la page directeur
              </Button>
              
              <div className="text-center space-y-4 animate-fade-in">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 via-primary/15 to-primary/10 rounded-2xl flex items-center justify-center shadow-lg">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
                  {declaration.titre}
                </h1>
                <div className="w-32 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/40 rounded-full mx-auto"></div>
                <div className="flex items-center justify-center gap-2 px-4 py-2 bg-primary/10 rounded-full w-fit mx-auto">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    {new Date(declaration.date).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-card via-card/98 to-primary/3 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-primary/80 to-primary/60"></div>
                  <div className="absolute top-8 right-8 opacity-5">
                    <Quote className="h-24 w-24 text-primary" />
                  </div>
                  
                  <div className="p-12">
                    {/* Author info */}
                    <div className="flex items-center gap-4 mb-8 p-6 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl border-l-4 border-primary">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground">{declaration.titrePlusNom}</h3>
                        <p className="text-muted-foreground text-sm">Directeur du Laboratoire</p>
                      </div>
                    </div>
                    
                    {/* Full content */}
                    <div className="prose prose-lg max-w-none">
                      <blockquote className="text-lg leading-relaxed text-foreground font-light italic border-l-4 border-primary pl-6 py-4 bg-gradient-to-r from-primary/5 to-transparent">
                        "{declaration.mot}"
                      </blockquote>
                    </div>
                    
                    {/* Signature */}
                    <div className="mt-12 pt-8 border-t border-border/50">
                      <div className="text-right">
                        <p className="text-muted-foreground text-sm">Cordialement,</p>
                        <p className="font-semibold text-foreground mt-2">{declaration.titrePlusNom}</p>
                        <p className="text-muted-foreground text-sm">Directeur du Laboratoire</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DeclarationDetail;