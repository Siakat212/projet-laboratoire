import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import HomeAbout from "@/components/HomeAbout";
import HomeFeatures from "@/components/HomeFeatures";
import HomeStats from "@/components/HomeStats";
import HomeDirector from "@/components/HomeDirector";
import HomeNews from "@/components/HomeNews";
import Footer from "@/components/Footer";
import { Constants } from "@/constants/Constants";
import { useFetch } from "@/hooks/use-fetch";
import { useState } from "react";
import { useAttente } from "@/hooks/use-attente";
import LoadingDots from "@/components/spinner"

const Index = () => {
    const [general, setGeneral] = useState(true);

    const [dataSilder, loadingSilder, errorSilder] = useFetch(`${Constants.url}/labo_api/acceuil_slider`);
    const [dataChiffre, loadingChiffre, errorChiffre] = useFetch(`${Constants.url}/labo_api/acceuil_chiffre`);
    const [dataActualite, loadingActualite, errorActualite] = useFetch(`${Constants.url}/labo_api/acceuil_actualite`);
    const [dataPresentation, loadingPresentation, errorPresentation] = useFetch(`${Constants.url}/labo_api/acceuil_presentation`);
    const [dataEnteteGeneral, loadingEnteteGeneral, errorEnteteGeneral] = useFetch(`${Constants.url}/labo_api/enteteGeneral`);
  console.log(dataEnteteGeneral);
  
    // Combine all loading states
    const loading =
      loadingSilder ||
      loadingChiffre ||
      loadingActualite || 
      loadingPresentation ||
      loadingEnteteGeneral;

    // Combine all error states
    const error =
      errorSilder ||
      errorChiffre ||
      errorActualite ||
      errorPresentation ||
      errorEnteteGeneral;

    useAttente(loading, setGeneral);

    if (loading) {
      return (
          <LoadingDots />
      );
    }

    if (error) {
      return <p>Erreur : {errorActualite || errorSilder || errorChiffre || errorPresentation || errorEnteteGeneral}</p>;
    }

    

    // Debug: remove in production
    // console.log(dataSilder);
    // console.log(dataDirecteur);
    // console.log(dataChiffre);
    // console.log(dataActualite);



  return (
    <div className="min-h-screen" style={Constants.bgWhite}>
      <Navigation />
      <Hero donnee={{'data' : dataSilder, 'dataEnteteGeneral': dataEnteteGeneral}} />
      <HomeAbout  donnee={{'data' : dataPresentation, 'dataEnteteGeneral': dataEnteteGeneral}}/>
      <HomeFeatures donnee={{'dataEnteteGeneral': dataEnteteGeneral}} />
      <HomeStats donnee={{'data' : dataChiffre, 'dataEnteteGeneral': dataEnteteGeneral}}/>
      <HomeNews donnee={{'data' : dataActualite, 'dataEnteteGeneral': dataEnteteGeneral}} />
      <Footer />
    </div>
  );
};

export default Index;
