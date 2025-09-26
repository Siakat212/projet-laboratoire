import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, Clock, Users, ExternalLink } from "lucide-react";
import PageSlider from "./PageSlider";
import PageHero from "./PageHero";
import { Constants } from "@/constants/Constants";

const Level = () => {
  const masters = [
    {
      title: "Master Sciences Biologiques et Biotechnologie",
      university: "Université Félix Houphouët-Boigny (Abidjan)",
      duration: "2 ans",
      students: "20-25 étudiants/an",
      description: "Formation spécialisée en sciences biologiques avec focus sur les biotechnologies tropicales et les applications en santé publique. Partenariat avec notre laboratoire pour les stages de recherche.",
      specializations: ["Biotechnologies végétales", "Microbiologie tropicale", "Biologie moléculaire"],
      requirements: ["Licence Sciences Biologiques", "Moyenne minimum 12/20", "Entretien de sélection"],
      career: ["Recherche en santé publique", "Ingénieur agroalimentaire", "Consultant biotechnologie"],
      nextIntake: "Octobre 2024"
    },
    {
      title: "Master Santé Publique et Épidémiologie",
      university: "Institut National de Santé Publique (INSP)",
      duration: "2 ans",
      students: "15-18 étudiants/an",
      description: "Programme axé sur la prévention des maladies tropicales et l'amélioration des systèmes de santé en Afrique de l'Ouest, avec stages pratiques dans notre laboratoire.",
      specializations: ["Épidémiologie tropicale", "Surveillance sanitaire", "Politiques de santé"],
      requirements: ["Licence Santé/Sciences", "Expérience terrain souhaitable", "Projet de mémoire"],
      career: ["Épidémiologiste", "Responsable santé publique", "Chercheur OMS"],
      nextIntake: "Septembre 2024"
    },
    {
      title: "Master Ingénierie Biomédicale",
      university: "École Supérieure d'Ingénieurs de Côte d'Ivoire (ESICI)",
      duration: "2 ans",
      students: "18-22 étudiants/an",
      description: "Formation technique en ingénierie médicale adaptée aux besoins africains, développement d'équipements low-cost et maintenance des infrastructures sanitaires.",
      specializations: ["Équipements médicaux", "Télémédecine", "Maintenance biomédicale"],
      requirements: ["Licence Ingénierie/Sciences", "Bases en électronique", "Stage technique obligatoire"],
      career: ["Ingénieur biomédical", "Technicien spécialisé", "Entrepreneur medtech"],
      nextIntake: "Octobre 2024"
    }
  ];

  return (
    <section 
      className="pt-16" 
      style={{
        ...Constants.pdTopCardApresNav,
        ...Constants.bgPrincipal,
      }}
    >
      <div>
        <div 
          className={Constants.classApresNavbar}
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(var(--primary-rgb), 0.1), rgba(var(--primary-rgb), 0.05)), url(https://images.unsplash.com/photo-1523240795612-9a054b0db644)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-foreground mb-4 drop-shadow-sm">
              Masters Liés au Laboratoire
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto drop-shadow-sm">
              Découvrez les programmes de Master en partenariat avec notre laboratoire, offrant une formation d'excellence et des opportunités de recherche uniques.
            </p>
          </div>

          <PageHero 
            stats={[
              { value: "4", label: "Niveaux" },
              { value: "25", label: "Chercheurs" },
              { value: "12", label: "Étudiants" }
            ]}
          />
        </div>

        <div 
          className={"space-y-8 " + Constants.ClassPdXgrandBlock}
          style={Constants.bgWhite}
        >
          {masters.map((master, index) => (
            <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Main Info */}
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <h2 className="text-2xl font-bold text-foreground pr-4">{master.title}</h2>
                        <Badge variant="secondary" className="flex-shrink-0">
                          {master.nextIntake}
                        </Badge>
                      </div>
                      <p className="text-lg text-primary font-medium mb-3">{master.university}</p>
                      <p className="text-muted-foreground leading-relaxed">{master.description}</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Spécialisations</h3>
                        <div className="space-y-2">
                          {master.specializations.map((spec, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                              <span className="text-sm text-muted-foreground">{spec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Débouchés</h3>
                        <div className="space-y-2">
                          {master.career.map((career, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-accent rounded-full"></div>
                              <span className="text-sm text-muted-foreground">{career}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Conditions d'admission</h3>
                      <div className="flex flex-wrap gap-2">
                        {master.requirements.map((req, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Stats & Actions */}
                  <div className="space-y-6">
                    <div className="bg-accent/10 rounded-lg p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium">Durée: {master.duration}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium">{master.students}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <GraduationCap className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium">Niveau Master</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button 
                        className="w-full"
                        onClick={() => window.open('mailto:admissions@labvoyage.fr?subject=Candidature Master', '_blank')}
                      >
                        Candidater
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => window.location.href = '/contact'}
                      >
                        Plus d'informations
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className={"text-center rounded-2xl overflow-hidden" + Constants.ClassPdXgrandBlock}>
          <Card style={{ backgroundColor: "transparent"}} className="border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Intéressé par nos programmes ?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Contactez-nous pour obtenir plus d'informations sur les conditions d'admission, 
                les stages disponibles et les opportunités de collaboration avec notre laboratoire.
              </p>
              <Button 
                size="lg" 
                className="mr-4"
                onClick={() => window.location.href = '/contact'}
              >
                Nous contacter
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.open('/brochure.pdf', '_blank')}
              >
                Télécharger la brochure
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <PageSlider 
        title="Témoignages d'Étudiants"
        backgroundImage="photo-1461749280684-dccba630e2f6"
        items={[
          {
            id: 1,
            title: "Sarah M. - Master IA",
            description: "\"Une formation exceptionnelle qui m'a permis de développer des compétences de pointe en intelligence artificielle.\""
          },
          {
            id: 2,
            title: "Alex D. - Master Biotech",
            description: "\"Les projets de recherche m'ont donné une expérience pratique inestimable en biotechnologies.\""
          },
          {
            id: 3,
            title: "Marie L. - Master Quantique",
            description: "\"Un programme unique qui combine théorie avancée et applications pratiques de la physique quantique.\""
          },
          {
            id: 4,
            title: "Thomas R. - Master Énergies",
            description: "\"J'ai pu participer à des projets concrets sur les énergies renouvelables avec des industriels.\""
          },
          {
            id: 5,
            title: "Emma K. - Master Nano",
            description: "\"L'accès aux équipements de pointe et l'encadrement personnalisé sont exceptionnels.\""
          }
        ]}
      />
    </section>
  );
};

export default Level;