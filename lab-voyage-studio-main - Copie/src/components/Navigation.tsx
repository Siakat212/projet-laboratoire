import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Microscope } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  
  const navItems = [
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/about" },
    { label: "Équipe", href: "/team" },
    { label: "Recherches", href: "/research" },
    { label: "Publications", href: "/publications" },
    { label: "Actualités", href: "/news" },
    { label: "Parcour Master", href: "/level" },
    { label: "Contact", href: "/contact" },
  ];


  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
              <Microscope className="h-8 w-8 text-primary" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              SnLab
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-accent/50 ${
                  location.pathname === item.href 
                    ? 'text-primary bg-primary/10 shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
                {location.pathname === item.href && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="h-12 w-12 hover:bg-accent/50"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-card/98 backdrop-blur-lg border-b border-border shadow-xl">
            <div className="bg-card/95 px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                    location.pathname === item.href 
                      ? 'text-primary bg-primary/10 shadow-sm font-medium' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;