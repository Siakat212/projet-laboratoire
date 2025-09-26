import { Microscope, Mail, Phone, MapPin, Linkedin, Twitter, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Microscope className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">SnLab</span>
            </div>
            <p className="text-background/80 mb-6 leading-relaxed">
              Laboratoire de recherche universitaire d'excellence, pionnier dans l'innovation 
              scientifique et technologique depuis plus de 20 ans.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-background/60 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Navigation</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-background/80 hover:text-primary transition-colors">Accueil</a></li>
              <li><a href="#about" className="text-background/80 hover:text-primary transition-colors">À propos</a></li>
              <li><a href="#team" className="text-background/80 hover:text-primary transition-colors">Équipe</a></li>
              <li><a href="#research" className="text-background/80 hover:text-primary transition-colors">Recherches</a></li>
              <li><a href="#publications" className="text-background/80 hover:text-primary transition-colors">Publications</a></li>
              <li><a href="#news" className="text-background/80 hover:text-primary transition-colors">Actualités</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Domaines</h4>
            <ul className="space-y-3">
              <li><span className="text-background/80">Physique Quantique</span></li>
              <li><span className="text-background/80">Biotechnologies</span></li>
              <li><span className="text-background/80">Intelligence Artificielle</span></li>
              <li><span className="text-background/80">Énergies Renouvelables</span></li>
              <li><span className="text-background/80">Nanotechnologies</span></li>
              <li><span className="text-background/80">Matériaux Avancés</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-background/80 text-sm">
                  Abobo-Adjamé<br />
                  Abidjan, Cote d'ivoire
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-background/80 text-sm">+225 05 74 26 76 01</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-background/80 text-sm">contact@snlab.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/60 text-sm">
              © 2024 snlab. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-background/60 hover:text-primary transition-colors">
                Mentions légales
              </a>
              <a href="#" className="text-background/60 hover:text-primary transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="text-background/60 hover:text-primary transition-colors">
                Plan du site
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;