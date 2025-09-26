import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { Constants } from "@/constants/Constants";
import { useState } from "react";
import { useFetch } from "@/hooks/use-fetch";
import { useAttente } from "@/hooks/use-attente";
import LoadingDots from "@/components/spinner"


const AboutPage = () => {
    const [general, setGeneral] = useState(true);

    const [dataSilder, loadingSilder, errorSilder] = useFetch(`${Constants.url}/labo_api/presentation_slider`);
    const [dataDomaine, loadingDomaine, errorDomaine] = useFetch(`${Constants.url}/labo_api/presentation_domaine`);
    const [dataMission, loadingMission, errorMission] = useFetch(`${Constants.url}/labo_api/presentation_mission`);
    const [dataImage, loadingImage, errorImage] = useFetch(`${Constants.url}/labo_api/presentation_image`);
    const [dataPartenaire, loadingPartenaire, errorPartenaire] = useFetch(`${Constants.url}/labo_api/presentation_partenaire`);
    const [dataPresentation, loadingPresentation, errorPresentation] = useFetch(`${Constants.url}/labo_api/presentation`);
    const [dataEnteteGeneral, loadingEnteteGeneral, errorEnteteGeneral] = useFetch(`${Constants.url}/labo_api/enteteGeneral`);
    

    // Combine all loading states
    const loading =
      loadingSilder ||
      loadingDomaine ||
      loadingMission ||
      loadingImage || 
      loadingPresentation ||
      loadingEnteteGeneral||
      loadingPartenaire;

    // Combine all error states
    const error =
      errorSilder ||
      errorDomaine ||
      errorMission ||
      errorImage ||
      errorPresentation ||
      errorEnteteGeneral||
      errorPartenaire;

    useAttente(loading, setGeneral);

    if (loading) {
      return (
          <LoadingDots />
      );
    }

    if (error) {
      return <p>Erreur : {errorImage || errorSilder || errorDomaine || errorMission || errorPresentation || errorEnteteGeneral || errorPartenaire}</p>;
    }

  return (
    <div className="min-h-screen" style={Constants.bgWhite}>
      <Navigation />
      <About donnee={{ dataSilder, dataDomaine, dataMission, dataImage, dataPresentation, dataPartenaire, dataEnteteGeneral }} />
      <Footer />
    </div>
  );
};

export default AboutPage;