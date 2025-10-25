import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Constants } from "@/constants/Constants";

interface SliderItem {
  id: number;
  title: string;
  description: string;
  image?: string;
}

interface PageSliderProps {
  items: SliderItem[];
  title: string;
  backgroundImage?: string;
  style?: {}
}

const PageSlider = ({ items, title, style, backgroundImage }: PageSliderProps) => {
  return (
    <section style={style ?? Constants.bgWhite} className={"py-20 " + Constants.ClassPdXgrandBlock}>
      <section 
        className="py-20 bg-gradient-to-r from-primary-soft to-accent/30 relative overflow-hidden"
        style={backgroundImage ? {
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        } : {}}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className={`text-2xl font-bold text-center mb-8 ${backgroundImage ? 'text-white' : 'text-foreground'}`}>{title}</h3>
          
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent className="-ml-1">
              {items.map((item) => (
                <CarouselItem key={item.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card group hover:-translate-y-1">
                    <CardContent className="p-6">
                      {item.image && (
                        <div 
                          className="w-full h-32 rounded-lg bg-cover bg-center bg-no-repeat mb-4"
                          style={{ backgroundImage: `url(${item.image})` }}
                        />
                      )}
                      <h4 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </section>
  );
};

export default PageSlider;