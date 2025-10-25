import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ResultatRecherche from "@/components/ResultatRecherche";
import { Constants } from "@/constants/Constants";

const ResultatRecherchePage = () => {
  return (
    <div className="min-h-screen" style={Constants.bgWhite}>
      <Navigation />
      <ResultatRecherche />
      <Footer />
    </div>
  );
};

export default ResultatRecherchePage;
