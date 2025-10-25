import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";
import { Constants } from "@/constants/Constants";

const AnimatedStat = ({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) => {
  // Extract numeric part from value
  const numericValue = parseInt(value.replace(/\D/g, "")) || 0;
  const suffix = value.replace(/\d/g, "");

  const { count, ref } = useCountUp({
    end: numericValue,
    duration: 2000,
    delay,
  });

  return (
    <div
      ref={ref}
      className="backdrop-blur-sm rounded-lg p-6 border border-white/20 bg-primary-soft"
      style={{ width: "210px" }}
    >
      <div className="text-2xl font-bold mb-2 text-primary">
        {count}
        {suffix}
      </div>
      <div className="text-muted-foreground">{label}</div>
    </div>
  );
};

interface PageHeroProps {
  
  stats?: Array<{
    value: string;
    label: string;
  }>;
}

const PageHero = ({stats}: PageHeroProps) => {
  const scrollToNext = () => {
    const nextSection = document.querySelector("section:nth-of-type(2)");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex items-center justify-center overflow-hidden" style={Constants.pdTopCardHero}>
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

    </section>
  );
};

export default PageHero;
