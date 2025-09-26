import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Atom, Dna, Brain, Zap, Microscope, Cpu, Leaf, Shield, ChevronDown, ChevronUp, ExternalLink, Book, BookOpen, Globe, Rocket, Code, Database, Compass, PenTool, BarChart, PieChart,
  TestTube, GraduationCap, Award, Feather, Camera, Palette, Music, Calculator, Terminal, Settings, User, Users
} from "lucide-react";
import PageHero from "./PageHero";
import { Constants } from "@/constants/Constants";
import { useState, useEffect } from "react";



const About = (donnee) => {
  const dataSlider = donnee.donnee.dataSilder.data;
  const dataDomaine = donnee.donnee.dataDomaine.data;
  const dataMission = donnee.donnee.dataMission.data;
  const dataImage = donnee.donnee.dataImage.data;
  const dataPresentation = donnee.donnee.dataPresentation.data;
  const dataPartenaire = donnee.donnee.dataPartenaire.data;
  const dataEntete = donnee.donnee.dataEnteteGeneral.data;
  
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [showAllPartners, setShowAllPartners] = useState(false);

  const allFeatures = dataDomaine
  const partners = dataPartenaire

  const visibleFeatures = showAllFeatures ? allFeatures : allFeatures.slice(0, 4);
  const visiblePartners = showAllPartners ? partners : partners.slice(0, 4);
  
  return (
    <section
      id="about"
      className="pt-20 relative overflow-hidden"
      style={{
      ...Constants.pdTopCardApresNav,
      ...Constants.bgPrincipal,
      }}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,_hsl(var(--primary))_1px,_transparent_1px)] [background-size:30px_30px]" />
      </div>
      <div className="relative z-10">
        <div 
          className={Constants.classApresNavbar}
          style={{
          backgroundImage: `linear-gradient(135deg, rgba(var(--primary-rgb), 0.1), rgba(var(--primary-rgb), 0.05)), url(https://images.unsplash.com/photo-1581092787765-e4c73b43b85b)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-sm" />
          <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 drop-shadow-sm">
            {dataSlider && dataSlider.titre ? dataSlider.titre : "À Propos de Notre Laboratoire"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
            {dataSlider && dataSlider.description ? dataSlider.description : null}
          </p>

          <PageHero 
            stats={[
              { value: dataSlider && dataSlider.anneeExcellence ? dataSlider.anneeExcellence > 1000 ? '1000+ ans' : dataSlider.anneeExcellence + " ans" : "0 an", label: "d'Expérience" },
              { value: String(dataSlider && dataSlider.nombreRechecrcheRealiser ? dataSlider.nombreRechecrcheRealiser > 1000 ? '1000+' :   dataSlider.nombreRechecrcheRealiser : "0"), label: "Projets Réalisés" },
              { value: String(dataSlider && dataSlider.nombreDomaine ? dataSlider.nombreDomaine > 1000 ? '1000+' : dataSlider.nombreDomaine : "0"), label: "Domaines d'Expertise" }
            ]}
            />
          </div>
        </div>


        {/* Section Présentation du Laboratoire */}
        <div className={"px-5 " + Constants.ClassPdXgrandBlock} style={Constants.bgWhite}>
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {dataEntete
                .filter((item) => item.block === "presentation" && item.page === "about")
                .map((item, idx) => (
                  <span key={idx}>{item.titre}</span>
                ))}
              </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {dataEntete
                .filter((item) => item.block === "presentation" && item.page === "about")
                .map((item, idx) => (
                  <span key={idx}>{item.description}</span>
              ))}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              
              {dataPresentation.map((item, idx) => (
                <div key={idx}>
                  <h4 className="text-xl font-semibold text-foreground mb-3">{item.titre}</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description.split('\n').map((line, i) => (
                      <li key={i} className="flex items-center">
                        <div className="w-[8px] h-[8px] bg-primary rounded-full mr-[12px]"></div>
                        <span>
                          {line}
                          {i < item.description.split('\n').length - 1 && <br />}
                        </span>
                      </li>
                    ))}
                  </p>
                </div>
                ))}
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={`${Constants.url}/${dataImage.image}`}
                  alt="Laboratoire de recherche"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"></div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-card rounded-xl p-6 shadow-xl border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">{new Date().getFullYear() - Number(dataMission.anneeExcellence)}</div>
                  <div className="text-sm text-muted-foreground">Année de création</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div style={Constants.bgPrincipal} className={"grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-5 "  + Constants.ClassPdXgrandBlock}>
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">Notre Mission</h3>
            {dataMission.description.split('\n').map((line, i) => (
              <p className="text-muted-foreground mb-6 leading-relaxed" key={i}>
                {line}
              </p>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-6">
          <div className="bg-primary-soft rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">{dataMission && dataMission.anneeExcellence ? parseInt(dataMission.anneeExcellence) > 1000 ? "1000+" : dataMission.anneeExcellence : 0 }</div>
            <div className="text-sm text-muted-foreground">Années d'Excellence</div>
          </div>
          <div className="bg-primary-soft rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">{dataMission && dataMission.nombreParcour ? parseInt(dataMission.nombreParcour) > 1000 ? "1000+" : dataMission.nombreParcour : 0 }</div>
            <div className="text-sm text-muted-foreground">Parcours master</div>
          </div>
          <div className="bg-primary-soft rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">{dataMission && dataMission.budget ? dataMission.budget : 0 }</div>
            <div className="text-sm text-muted-foreground">Budget Recherche</div>
          </div>
          <div className="bg-primary-soft rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">{dataMission && dataMission.nombrePartenaire ? parseInt(dataMission.nombrePartenaire) > 1000 ? "1000+" : dataMission.nombrePartenaire : 0 }</div>
            <div className="text-sm text-muted-foreground">Partenariats</div>
          </div>
          </div>
        </div>

        <div style={Constants.bgWhite} className={Constants.ClassPdXgrandBlock}>
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {dataEntete
                .filter((item) => item.block === "domaine" && item.page === "about")
                .map((item, idx) => (
                  <span key={idx}>{item.titre}</span>
                ))}
              </h3>
            <p className="text-muted-foreground">
              {dataEntete
                .filter((item) => item.block === "domaine" && item.page === "about")
                .map((item, idx) => (
                  <span key={idx}>{item.description}</span>
              ))}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {visibleFeatures.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card hover:-translate-y-1">
              <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                {(() => {
                  const lucideIcons = {
                    Atom, Dna, Brain, Zap, Microscope, Cpu, Leaf, Shield, ChevronDown, ChevronUp, ExternalLink, Book, BookOpen, Globe, Rocket, Code, Database, Compass, PenTool, BarChart, PieChart,
                    TestTube, GraduationCap, Award, Feather, Camera, Palette, Music, Calculator, Terminal, Settings, User, Users
                  };
                  const IconComponent = lucideIcons[feature.icone.split('-')[0]];
                  return IconComponent ? <IconComponent className="h-8 w-8 text-primary" /> : null;
                })()}
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-3">{feature.id_domaine.titre}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.id_domaine.description}</p>
              </CardContent>
            </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              onClick={() => setShowAllFeatures(!showAllFeatures)}
              variant="outline"
              className="px-8 py-2"
            >
              {showAllFeatures ? (
                <>
                  <ChevronUp className="mr-2 h-4 w-4" />
                  Voir moins
                </>
              ) : (
                <>
                  <ChevronDown className="mr-2 h-4 w-4" />
                  Voir plus
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Section Partenaires */}
        <div className={Constants.ClassPdXgrandBlock} style={Constants.bgPrincipal}>
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {dataEntete
                .filter((item) => item.block === "partenaire" && item.page === "about")
                .map((item, idx) => (
                  <span key={idx}>{item.titre}</span>
            ))}
            </h3>
            <p className="text-muted-foreground">
              {dataEntete
                .filter((item) => item.block === "partenaire" && item.page === "about")
                .map((item, idx) => (
                  <span key={idx}>{item.description}</span>
                ))}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {visiblePartners.map((partner, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card group">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <img 
                      src={`${Constants.url}/${partner.id_partenaire.logo}`}
                      alt={partner.id_partenaire.nom_partenaire}
                      className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">{partner.id_partenaire.nom_partenaire}</h4>
                  <p className="text-muted-foreground text-sm mb-4">{partner.id_partenaire.description}</p>
                  {partner.id_partenaire.site_web ? 
                    <Button 
                      asChild
                      variant="outline" 
                      size="sm"
                      className="w-full"
                    >
                      <a 
                        href={partner.id_partenaire.site_web} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Visiter le site
                      </a>
                    </Button> : null
                }

                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              onClick={() => setShowAllPartners(!showAllPartners)}
              variant="outline"
              className="px-8 py-2"
            >
              {showAllPartners ? (
                <>
                  <ChevronUp className="mr-2 h-4 w-4" />
                  Voir moins
                </>
              ) : (
                <>
                  <ChevronDown className="mr-2 h-4 w-4" />
                  Voir plus
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;