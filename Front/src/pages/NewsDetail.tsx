import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import NewsDetail from "@/components/NewDetail";
import { useParams } from "react-router-dom";
import { useAttente } from "@/hooks/use-attente";
import { Constants } from "@/constants/Constants";
import { useState } from "react";
import { useFetch } from "@/hooks/use-fetch";
import LoadingDots from "@/components/spinner";

const NewsDetailPage = () => {
  const { id } = useParams();
  const [general, setGeneral] = useState(true);
  const [dataDetail, loadingDetail, errorDetail] = useFetch(`${Constants.url}/labo_api/actualite/${id}`);
  

  // Combine all loading states
  const loading = loadingDetail

  // Combine all error states
  const error = errorDetail

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
    <div className="min-h-screen  bg-muted/50">
      <Navigation />
      <NewsDetail donnee = {dataDetail} />
      <Footer />
    </div>
  );
};

export default NewsDetailPage;