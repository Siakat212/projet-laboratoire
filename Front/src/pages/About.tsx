import Navigation from "@/components/Navigation";
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
    const [dataDirecteur, loadingDirecteur, errorDirecteur] = useFetch(`${Constants.url}/labo_api/acceuil_directeur`);
    

    // Combine all loading states
    const loading =
      loadingSilder ||
      loadingDomaine ||
      loadingMission ||
      loadingImage || 
      loadingPresentation ||
      loadingEnteteGeneral ||
      loadingPartenaire ||
      loadingDirecteur;

    // Combine all error states
    const error =
      errorSilder ||
      errorDomaine ||
      errorMission ||
      errorImage ||
      errorPresentation ||
      errorEnteteGeneral||
      errorPartenaire ||
      errorDirecteur;

    useAttente(loading, setGeneral);

    if (loading) {
      return (
          <LoadingDots />
      );
    }

    if (error) {
      return <p>Erreur : {errorImage || errorSilder || errorDomaine || errorMission || errorPresentation || errorEnteteGeneral || errorPartenaire || errorDirecteur}</p>;
    }

  return (
    <div className="min-h-screen" style={Constants.bgWhite}>
      <Navigation />
      <About donnee={{ dataSilder, dataDomaine, dataMission, dataImage, dataPresentation, dataPartenaire, dataEnteteGeneral, dataDirecteur}} />
      <Footer />
    </div>
  );
};

export default AboutPage;