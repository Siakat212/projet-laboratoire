import DirectorCV from "./DirectorCV";
import { Constants } from "@/constants/Constants";

const Director = (donnee) => {
  const data = donnee.donnee.data;
  const director = data

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
              Profil de la Direction
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
              Leadership scientifique et parcours professionnel de notre directrice
            </p>
          </div>
        </div>

        <div className={Constants.ClassPdXgrandBlock} style={Constants.bgWhite}>
          <DirectorCV director={director} />
        </div>
      </div>
    </section>
  );
};

export default Director;