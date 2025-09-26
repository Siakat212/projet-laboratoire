import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";
import News from "@/components/News";
import Footer from "@/components/Footer";
import { Constants } from "@/constants/Constants";
import { useState } from "react";
import { useFetch } from "@/hooks/use-fetch";
import { useAttente } from "@/hooks/use-attente";
import LoadingDots from "@/components/spinner"

const NewsPage = () => {
      const [general, setGeneral] = useState(true);
  
      const [dataSilder, loadingSilder, errorSilder] = useFetch(`${Constants.url}/labo_api/actualite_slider`);
      const [dataAll, loadingAll, errorAll] = useFetch(`${Constants.url}/labo_api/actualiteAll`);
      

      // Combine all loading states
      const loading = loadingSilder || loadingAll; 
  
      // Combine all error states
      const error = errorSilder || errorAll;

      useAttente(loading, setGeneral);
  
      if (loading) {
        return (
            <LoadingDots />
        );
      }
  
      if (error) {
        return <p>Erreur : {errorSilder || errorAll}</p>;
      }

  return (
    <div className="min-h-screen bg-muted/50" style={Constants.bgWhite}>
      <Navigation />
      <News donnee={{dataAll , dataSilder}} />
      <Footer />
    </div>
  );
};

export default NewsPage;