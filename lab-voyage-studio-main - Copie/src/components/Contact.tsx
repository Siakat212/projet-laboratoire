import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Car, Bus, Loader2 } from "lucide-react";
import ContactInfo from "./ContactInfo";
import { Constants } from "@/constants/Constants";
import { useContactForm } from "@/hooks/useContactForm";
import { useEffect, useMemo } from "react";

const Contact = () => {
  const { formData, isLoading, errors, handleChange, handleSubmit } = useContactForm();

  const laboratoireId = useMemo(() => {
    return Constants.idLaboratoire;
  }, []);

  // Injecte l'id labo dans le formulaire pour l'envoi des messages
  useEffect(() => {
    if (laboratoireId && !Number.isNaN(laboratoireId)) {
      handleChange('laboratoryId', String(laboratoireId) as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [laboratoireId]);

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
          
        </div>

        <div style={Constants.bgWhite} className={"grid grid-cols-1 lg:grid-cols-2 gap-12 " + Constants.ClassPdXgrandBlock}>
          <div className="space-y-8">
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-card via-card/95 to-primary/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/15 to-transparent rounded-bl-full"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="text-2xl text-foreground mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
                  Informations de Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <ContactInfo laboratoryId={Constants.idLaboratoire} />
              </CardContent>
            </Card>

            
          </div>

          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-card via-card/95 to-primary/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/15 to-transparent rounded-bl-full"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="text-2xl text-foreground flex items-center gap-3">
                <div className="w-2 h-8 bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
                Envoyez-nous un Message
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Prénom <span className="text-red-500">*</span>
                    </label>
                    <Input 
                      placeholder="Votre prénom" 
                      value={formData.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                      className={`border-primary/20 focus:border-primary/40 transition-all duration-300 ${
                        errors.firstName ? 'border-red-500 focus:border-red-500' : ''
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Nom <span className="text-red-500">*</span>
                    </label>
                    <Input 
                      placeholder="Votre nom" 
                      value={formData.lastName}
                      onChange={(e) => handleChange('lastName', e.target.value)}
                      className={`border-primary/20 focus:border-primary/40 transition-all duration-300 ${
                        errors.lastName ? 'border-red-500 focus:border-red-500' : ''
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input 
                    type="email" 
                    placeholder="votre@email.com" 
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={`border-primary/20 focus:border-primary/40 transition-all duration-300 ${
                      errors.email ? 'border-red-500 focus:border-red-500' : ''
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Organisation</label>
                  <Input 
                    placeholder="Votre université, entreprise..." 
                    value={formData.organization}
                    onChange={(e) => handleChange('organization', e.target.value)}
                    className="border-primary/20 focus:border-primary/40 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Sujet <span className="text-red-500">*</span>
                  </label>
                  <Input 
                    placeholder="Objet de votre message" 
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    className={`border-primary/20 focus:border-primary/40 transition-all duration-300 ${
                      errors.subject ? 'border-red-500 focus:border-red-500' : ''
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <Textarea 
                    placeholder="Décrivez votre demande, projet de collaboration, ou question..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    className={`border-primary/20 focus:border-primary/40 transition-all duration-300 resize-none ${
                      errors.message ? 'border-red-500 focus:border-red-500' : ''
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                  )}
                </div>

                <Button 
                  type="submit"
                  variant="default" 
                  size="lg" 
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    'Envoyer le Message'
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  <span className="text-red-500">*</span> Champs obligatoires
                </p>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className={"rounded-2xl overflow-hidden " + Constants.ClassPdXgrandBlock}>
          <Card style={{ backgroundColor: "transparent"}} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-card via-card/95 to-primary/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/15 to-transparent rounded-bl-full"></div>
            <CardContent className="p-8 text-center relative z-10">
              <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
                <div className="w-2 h-8 bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
                Visitez Notre Laboratoire
                <div className="w-2 h-8 bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
                Nous organisons régulièrement des journées portes ouvertes et des visites guidées 
                pour les étudiants, chercheurs et professionnels. Découvrez nos installations de pointe !
              </p>
              <Button 
                variant="default" 
                size="lg"
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => window.open('mailto:visites@labvoyage.fr?subject=Demande de visite du laboratoire', '_blank')}
              >
                Planifier une Visite
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      
    </section>
  );
};

export default Contact;