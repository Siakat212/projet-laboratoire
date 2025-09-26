import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Car, Bus } from "lucide-react";
import PageSlider from "./PageSlider";
import PageHero from "./PageHero";
import { Constants } from "@/constants/Constants";

const Contact = () => {
  return (
    <section 
      id="contact" 
      className="pt-20" 
      style={{
      ...Constants.pdTopCardApresNav,
      ...Constants.bgPrincipal,
      }}
    >
      <div>
        <div 
          className={Constants.classApresNavbar}
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(var(--primary-rgb), 0.1), rgba(var(--primary-rgb), 0.05)), url(https://images.unsplash.com/photo-1560472354-b33ff0c44a43)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 drop-shadow-sm">
              Contactez-Nous
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
              Que vous soyez chercheur, étudiant, industriel ou simplement curieux de nos travaux, 
              n'hésitez pas à nous contacter pour discuter de collaborations ou obtenir des informations.
            </p>
          </div>
          <PageHero 
            stats={[
              { value: "24h", label: "Réponse" },
              { value: "3", label: "Localisations" },
              { value: "100+", label: "Partenaires" }
            ]}
          />
        </div>

        <div style={Constants.bgWhite} className={"grid grid-cols-1 lg:grid-cols-2 gap-12 " + Constants.ClassPdXgrandBlock}>
          <div>
            <Card className="border-0 shadow-lg bg-card mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground mb-6">Informations de Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Adresse</h4>
                    <p className="text-muted-foreground">
                      Laboratoire LabVoyage<br />
                      Université Félix Houphouët-Boigny<br />
                      22 BP 582 Abidjan 22<br />
                      Cocody, Abidjan, Côte d'Ivoire
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Téléphone</h4>
                    <p className="text-muted-foreground">
                      Standard : +225 27 22 44 34 44<br />
                      Direction : +225 27 22 44 34 45
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Email</h4>
                    <p className="text-muted-foreground">
                      contact@labvoyage.ci<br />
                      direction@labvoyage.ci
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Horaires</h4>
                    <p className="text-muted-foreground">
                      Lundi - Vendredi : 8h00 - 18h00<br />
                      Samedi : 9h00 - 12h00
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-card">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Accès et Transport</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Bus className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Transport : Ligne 15, Arrêt Université</span>
                </div>
                <div className="flex items-center gap-3">
                  <Car className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Parking visiteurs disponible</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-lg bg-card">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Envoyez-nous un Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Prénom</label>
                    <Input placeholder="Votre prénom" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Nom</label>
                    <Input placeholder="Votre nom" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                  <Input type="email" placeholder="votre@email.com" />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Organisation</label>
                  <Input placeholder="Votre université, entreprise..." />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Sujet</label>
                  <Input placeholder="Objet de votre message" />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Message</label>
                  <Textarea 
                    placeholder="Décrivez votre demande, projet de collaboration, ou question..."
                    rows={6}
                  />
                </div>

                <Button 
                  variant="default" 
                  size="lg" 
                  className="w-full"
                  onClick={() => alert('Formulaire soumis ! Nous vous recontacterons bientôt.')}
                >
                  Envoyer le Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className={"rounded-2xl overflow-hidden" + Constants.ClassPdXgrandBlock}>
          <Card style={{ backgroundColor: "transparent"}} className="border-0">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">Visitez Notre Laboratoire</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Nous organisons régulièrement des journées portes ouvertes et des visites guidées 
                pour les étudiants, chercheurs et professionnels. Découvrez nos installations de pointe !
              </p>
              <Button 
                variant="default" 
                size="lg"
                onClick={() => window.open('mailto:visites@labvoyage.fr?subject=Demande de visite du laboratoire', '_blank')}
              >
                Planifier une Visite
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* 
      <PageSlider 
        title="Nos Partenaires"
        backgroundImage="photo-1509316975850-ff9c5deb0cd9"
        items={[
          {
            id: 1,
            title: "Université de Recherche",
            description: "Partenariat académique stratégique pour l'excellence scientifique."
          },
          {
            id: 2,
            title: "Centre National de Recherche",
            description: "Collaboration institutionnelle pour les grands projets nationaux."
          },
          {
            id: 3,
            title: "Industries Technologiques",
            description: "Transfert de technologies et développement d'innovations industrielles."
          },
          {
            id: 4,
            title: "Fondations Scientifiques",
            description: "Soutien financier et promotion de la recherche fondamentale."
          },
          {
            id: 5,
            title: "Réseaux Européens",
            description: "Participation aux programmes de recherche européens H2020."
          }
        ]}
      />
      */}
    </section>
  );
};

export default Contact;