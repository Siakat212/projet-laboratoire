import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";
import Research from "@/components/Research";
import Footer from "@/components/Footer";
import { Constants } from "@/constants/Constants";
import { useState } from "react";
import { useFetch } from "@/hooks/use-fetch";
import { useAttente } from "@/hooks/use-attente";
import LoadingDots from "@/components/spinner";

const ResearchPage = () => {
  const [general, setGeneral] = useState(true);
  
  const [dataSilder, loadingSilder, errorSilder] = useFetch(`${Constants.url}/labo_api/recherche_slider`);
  const [dataAll, loadingAll, errorAll] = useFetch(`${Constants.url}/labo_api/rechercheAll`);
  const [dataEnteteGeneral, loadingEnteteGeneral, errorEnteteGeneral] = useFetch(`${Constants.url}/labo_api/enteteGeneral`);
  

  // Combine all loading states
  const loading =
    loadingSilder ||
    loadingEnteteGeneral||
    loadingAll;

  // Combine all error states
  const error =
    errorSilder ||
    errorEnteteGeneral||
    errorAll;

  useAttente(loading, setGeneral);

  if (loading) {
    return (
        <LoadingDots />
    );
  }

  if (error) {
    return <p>Erreur : {errorSilder || errorEnteteGeneral || errorAll}</p>;
  }

  return (
    <div className="min-h-screen" style={Constants.bgWhite}>
      <Navigation />
      <Research donnee={{ dataSilder, dataEnteteGeneral, dataAll }} />
      <Footer />
    </div>
  );
};

export default ResearchPage;