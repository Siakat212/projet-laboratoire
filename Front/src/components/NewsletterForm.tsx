import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useNewsletter } from "@/hooks/useNewsletter";

const NewsletterForm = () => {
  const { email, isLoading, error, setEmail, subscribe } = useNewsletter();

  return (
    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <div className="flex-1">
        <Input 
          type="email" 
          placeholder="Votre adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`px-4 py-2 rounded-md border bg-background text-foreground ${
            error ? 'border-red-500' : 'border-border'
          }`}
        />
        {error && (
          <p className="text-red-500 text-xs mt-1">{error}</p>
        )}
      </div>
      <Button 
        variant="default"
        onClick={subscribe}
        disabled={isLoading}
        className="whitespace-nowrap"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Abonnement...
          </>
        ) : (
          'S\'abonner'
        )}
      </Button>
    </div>
  );
};

export default NewsletterForm;