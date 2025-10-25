import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin } from "lucide-react";

interface DirectorProfileProps {
  director: {
    name: string;
    title: string;
    email: string;
    phone: string;
    office: string;
    bio: string;
    education: string[];
    expertise: string[];
  };
}

const DirectorProfile = ({ director }: DirectorProfileProps) => {
  return (
    <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-card via-card/95 to-primary/5 hover:shadow-3xl transition-all duration-500">
      <CardContent className="p-0">
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/10 to-transparent rounded-tr-full"></div>
          
          <div className="relative p-8 grid md:grid-cols-3 gap-8">
            {/* Avatar Section */}
            <div className="md:col-span-1 flex justify-center">
              <div className="relative group">
                <div className="w-72 h-72 bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 rounded-full flex items-center justify-center text-primary text-7xl font-bold shadow-2xl transform transition-all duration-500 hover:scale-105 hover:rotate-2">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 to-transparent animate-pulse"></div>
                  <span className="relative z-10">MD</span>
                </div>
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/20 via-transparent to-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Info Section */}
            <div className="md:col-span-2 space-y-8">
              <div className="space-y-4">
                <div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-3">
                    {director.name}
                  </h2>
                  <Badge variant="secondary" className="text-lg px-6 py-2 bg-gradient-to-r from-primary/20 to-primary/10 hover:from-primary/30 hover:to-primary/20 transition-all duration-300">
                    {director.title}
                  </Badge>
                </div>

                <p className="text-muted-foreground leading-relaxed text-lg font-light">
                  {director.bio}
                </p>
              </div>

              {/* Contact Info */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10 transition-all duration-300">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{director.email}</span>
                </div>
                
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10 transition-all duration-300">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{director.phone}</span>
                </div>
                
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10 transition-all duration-300 sm:col-span-2">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{director.office}</span>
                </div>
              </div>

              {/* Education & Expertise */}
              <div className="grid sm:grid-cols-2 gap-8 pt-6">
                <div className="space-y-4">
                  <h3 className="font-bold text-xl text-foreground flex items-center gap-2">
                    <div className="w-2 h-6 bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
                    Formation
                  </h3>
                  <div className="space-y-3">
                    {director.education.map((edu, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-muted-foreground leading-relaxed">{edu}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-bold text-xl text-foreground flex items-center gap-2">
                    <div className="w-2 h-6 bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
                    Domaines d'expertise
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {director.expertise.map((exp, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="px-4 py-2 bg-gradient-to-r from-background to-primary/5 border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all duration-300 text-sm font-medium"
                      >
                        {exp}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DirectorProfile;