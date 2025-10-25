import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";
import Director from "@/components/Director";
import Footer from "@/components/Footer";
import { Constants } from "@/constants/Constants";
import { useState } from "react";
import { useFetch } from "@/hooks/use-fetch";
import { useAttente } from "@/hooks/use-attente";
import LoadingDots from "@/components/spinner";

const DirectorPage = () => {
  const [general, setGeneral] = useState(true);

  const [dataDirecteur, loadingDirecteur, errorDirecteur] = useFetch(`${Constants.url}/labo_api/directeur`);
  

  // Combine all loading states
  const loading = loadingDirecteur

  // Combine all error states
  const error = errorDirecteur

  useAttente(loading, setGeneral);

  if (loading) {
    return (
        <LoadingDots />
    );
  }

  if (error) {
    return <p>Erreur : {errorDirecteur}</p>;
  }

  return (
    <div className="min-h-screen" style={Constants.bgWhite}>
      <Navigation />
      <Director donnee={dataDirecteur} />
      <Footer />
    </div>
  );
};

export default DirectorPage;