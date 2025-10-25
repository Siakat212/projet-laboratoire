import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";

const AnimatedStat = ({ value, label, delay }: { value: string; label: string; delay: number }) => {
  // Extract numeric part from value
  const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
  const suffix = value.replace(/\d/g, '');
  
  const { count, ref } = useCountUp({ 
    end: numericValue, 
    duration: 2000, 
    delay 
  });

  return (
    <div ref={ref} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
      <div className="text-2xl font-bold text-white mb-2">
        {count}{suffix}
      </div>
      <div className="text-white/80">{label}</div>
    </div>
  );
};

interface PageHeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  actionButton?: {
    text: string;
    icon?: React.ReactNode;
    onClick?: () => void;
  };
  stats?: Array<{
    value: string;
    label: string;
  }>;
}

const PageHero = ({ title, subtitle, backgroundImage, actionButton, stats }: PageHeroProps) => {
  const scrollToNext = () => {
    const nextSection = document.querySelector('section:nth-of-type(2)');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(https://images.unsplash.com/${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-primary/70" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          {title}
        </h1>
        
        <p className="text-lg sm:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
        
        {actionButton && (
          <div className="flex justify-center mb-12">
            <Button 
              variant="hero" 
              size="lg" 
              className="min-w-[200px]"
              onClick={actionButton.onClick}
            >
              {actionButton.icon}
              {actionButton.text}
            </Button>
          </div>
        )}
        
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <AnimatedStat 
                key={index} 
                value={stat.value} 
                label={stat.label} 
                delay={index * 200}
              />
            ))}
          </div>
        )}
      </div>
      
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white hover:text-white/80 transition-all duration-300 animate-bounce"
        aria-label="Scroll to next section"
      >
        <ArrowDown className="h-8 w-8" />
      </button>
    </section>
  );
};

export default PageHero;