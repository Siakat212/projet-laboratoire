import { SearchX, FileX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NoResultsProps {
  type: "team" | "research";
  searchTerm?: string;
  onClearSearch?: () => void;
}

const NoResults = ({ type, searchTerm, onClearSearch }: NoResultsProps) => {
  const isTeam = type === "team";
  
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 px-8">
      <div className="relative mb-6">
        <div className="w-24 h-24 bg-gradient-to-br from-muted/40 to-muted/20 rounded-full flex items-center justify-center">
          {searchTerm ? (
            <SearchX className="h-12 w-12 text-muted-foreground/60" />
          ) : (
            <FileX className="h-12 w-12 text-muted-foreground/60" />
          )}
        </div>
        <div className="absolute -top-1 -right-1 w-8 h-8 bg-primary/10 rounded-full animate-pulse" />
      </div>
      
      <h3 className="text-xl font-semibold text-foreground mb-2">
        {searchTerm 
          ? `Aucun ${isTeam ? "membre" : "projet"} trouvé` 
          : `Aucun ${isTeam ? "membre" : "projet"} disponible`
        }
      </h3>
      
      <p className="text-muted-foreground text-center max-w-md mb-6">
        {searchTerm ? (
          <>
            Aucun résultat pour <span className="font-medium text-primary">"{searchTerm}"</span>.
            <br />
            Essayez de modifier votre recherche ou utilisez des termes plus généraux.
          </>
        ) : (
          `Aucun ${isTeam ? "membre de l'équipe" : "projet de recherche"} n'est actuellement disponible.`
        )}
      </p>
      
      {searchTerm && onClearSearch && (
        <Button 
          variant="outline" 
          onClick={onClearSearch}
          className="hover:bg-primary/10 hover:border-primary hover:text-primary transition-colors duration-300"
        >
          Effacer la recherche
        </Button>
      )}
    </div>
  );
};

export default NoResults;