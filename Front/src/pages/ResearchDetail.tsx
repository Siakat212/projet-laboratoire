import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ResearchDetail from "@/components/ResearchDetail";
import { useState } from "react";
import { useFetch } from "@/hooks/use-fetch";
import { Constants } from "@/constants/Constants";
import { useParams } from "react-router-dom";
import { useAttente } from "@/hooks/use-attente";
import LoadingDots from "@/components/spinner";

const ResearchDetailPage = () => {
  const [general, setGeneral] = useState(true);
  const {id} = useParams()
  
  const [dataDetail, loadingDetail, errorDetail] = useFetch(`${Constants.url}/labo_api/detail_recherch/${id}`);
  

  // Combine all loading states
  const loading = loadingDetail

  // Combine all error states
  const error = errorDetail;

  useAttente(loading, setGeneral);

  if (loading) {
    return (
        <LoadingDots />
    );
  }

  if (error) {
    return <p>Erreur : {errorDetail}</p>;
  }

  return (
    <div className="min-h-screen">
      <Navigation />    
      <ResearchDetail donnee={{ dataDetail }} />
      <Footer />
    </div>
  );
};

export default ResearchDetailPage;