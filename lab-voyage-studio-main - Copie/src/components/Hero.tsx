import { Button } from "@/components/ui/button";
import { ArrowDown, Microscope, Users, BookOpen } from "lucide-react";
import heroImage from "@/assets/lab-hero.jpg";
import { Link } from "react-router-dom";

const Hero = (donnee) => {
  const scrollToNext = () => {
    const nextSection = document.getElementById('about');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };  
  const data = donnee.donnee.data

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ paddingTop: '7rem' }}>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-primary/70" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white">
          <Microscope className="h-5 w-5" />
          <span className="text-sm font-medium">Laboratoire de Recherche Avancée</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          {data.data ? data.data.titre : 'Bienvenue au Laboratoire'}<br />
        </h1>
        
        <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
        {/* {data} */}
          {data.data ? data.data.description : ''}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link to="/research" className="text-white hover:text-white/80 transition-all duration-300 mb-2 sm:mb-0">
            <Button 
              variant="hero" 
              size="lg" 
              className="min-w-[200px]"
            >
              <BookOpen className="h-5 w-5" />
              Nos Recherches
            </Button> 
          </Link>


          <Link to="/team" 
            className="text-white hover:text-white/80 transition-all duration-300 mb-2 sm:mb-0"
          >
            <Button 
              variant="outline" 
              size="lg" 
              className="min-w-[200px] bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary"
            >
              <Users className="h-5 w-5" />
              Notre Équipe
            </Button>
          </Link>
          
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="text-3xl font-bold text-white mb-2">{data.data && data.data.nombrePublication ? parseInt(data.data.nombrePublication) > 1000 ? '1000+' : data.data.nombrePublication : '0'} </div>
            <div className="text-white/80">Publications</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="text-3xl font-bold text-white mb-2">{data.data && data.data.nombreChercheur ? parseInt(data.data.nombreChercheur) > 1000 ? '1000+' : data.data.nombreChercheur : '0'}</div>
            <div className="text-white/80">Chercheurs</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="text-3xl font-bold text-white mb-2">{data.data && data.data.nombreRechercheActif ? parseInt(data.data.nombreRechercheActif) > 1000 ? '1000+' : data.data.nombreRechercheActif : '0'}</div>
            <div className="text-white/80">Projets Actifs</div>
          </div>
        </div>
      </div>
      
      <button
        onClick={scrollToNext}
        className="absolute left-1/2 transform -translate-x-1/2 text-white hover:text-white/80 transition-all duration-300 animate-bounce"
        aria-label="Scroll to next section"
        style={{ bottom: "1rem" }}
      >
        <ArrowDown className="h-8 w-8" />
      </button>
    </section>
  );
};

export default Hero;