import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Calendar,
  ArrowLeft,
  Trophy,
  Users,
  BookOpen,
  Image,
  X,
} from "lucide-react";
import { Constants } from "@/constants/Constants";
import { dateFormatter } from "@/fonction/FormatterDate";

const NewsDetail = (donnee) => {
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    alt: string;
    caption: string;
  } | null>(null);

  // Données d'exemple des actualités
  const newsItem = donnee.donnee.data;

  if (!newsItem) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Actualité non trouvée</h1>
            <Link to="/news">
              <Button>Retour aux actualités</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Prix":
        return "bg-yellow-500 text-white";
      case "Partenariat":
        return "bg-blue-500 text-white";
      case "Publication":
        return "bg-green-500 text-white";
      case "Événement":
        return "bg-purple-500 text-white";
      case "Infrastructure":
        return "bg-orange-500 text-white";
      case "Équipe":
        return "bg-cyan-500 text-white";
      case "highlight":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Important":
        return "bg-primary-soft text-primary border-primary/20";

      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <section className="py-16 bg-grid" style={Constants.pdTopCardApresNav}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/news"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux actualités
        </Link>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/90">
          <CardHeader>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap justify-between">
                  <div className="flex items-center gap-2 flex-wrap">
                    {newsItem.typeNew.map((type, id) => (
                      <Badge
                        key={id}
                        className={getCategoryColor(type.typeNew)}
                      >
                        {type.typeNew}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar className="h-4 w-4" />
                    {newsItem.date_realisation_fin
                      ? dateFormatter(newsItem.date_realisation_debut) +
                        " - " +
                        dateFormatter(newsItem.date_realisation_fin)
                      : dateFormatter(newsItem.date_realisation_debut)}
                  </div>
                </div>
                <CardTitle className="text-2xl text-foreground">
                  {newsItem.titre}
                </CardTitle>
              </div>
            </div>
          </CardHeader>

          {/* Section Images en haut */}
          {newsItem.image_principal && (
            <div className="px-6 pb-6">
              {/* Image principale */}
              <div className="mb-6">
                <div
                  className="aspect-[16/9] overflow-hidden rounded-lg border border-muted bg-card shadow-sm cursor-pointer hover:shadow-lg transition-shadow duration-300"
                  onClick={() => setSelectedImage(newsItem.image_principal)}
                >
                  <img
                    src={`${Constants.urlDomaine}${newsItem.image_principal}`}
                    alt={newsItem.titre}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          )}

          <CardContent>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground font-medium mb-8 p-4 bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg border-l-4 border-primary/30">
                {newsItem.phrase_cle}
              </p>

              <div className="text-foreground leading-relaxed space-y-6">
                {newsItem.contenu_complet.split("\n").map((line, index) => {
                  if (line.startsWith("<h3>") && line.endsWith("</h3>")) {
                    const headingText = line
                      .replace("<h3>", "")
                      .replace("</h3>", "");
                    return (
                      <h3 key={index} className="text-2xl font-semibold mt-8">
                        {headingText}
                      </h3>
                    );
                  } else if (line.startsWith("<p>") && line.endsWith("</p>")) {
                    const paragraphText = line
                      .replace("<p>", "")
                      .replace("</p>", "");
                    return (
                      <p key={index} className="mt-4">
                        {paragraphText}
                      </p>
                    );
                  } else {
                    return (
                      <p key={index} className="mt-4">
                        {line}
                      </p>
                    );
                  }
                })}
              </div>
            </div>
          </CardContent>

          {/* Galerie des autres images */}

          {newsItem.image_principal && (
            <div className="px-6 pb-6">
              {newsItem.albumActu.length > 1 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg">
                      <Image className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Autres images
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {newsItem.albumActu.slice(1).map((image, index) => (
                      <div
                        key={index + 1}
                        className="group relative overflow-hidden rounded-lg border border-muted bg-card hover:shadow-lg transition-all duration-300 cursor-pointer"
                        onClick={() => setSelectedImage(image.image)}
                      >
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={`${Constants.urlDomaine}${image.image}`}
                            alt="image"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>
      </div>

      {/* Lightbox Modal */}
      <Dialog
        open={selectedImage !== null}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
          {selectedImage && (
            <div className="relative">
              <img
                src={`${Constants.urlDomaine}${selectedImage}`}
                alt="image"
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default NewsDetail;
