import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import DetailResultatRecherche from "@/components/DetailResultatRecherche";
import { Constants } from "@/constants/Constants";

const DetailResultatRecherchePage = () => {
  return (
    <div className="min-h-screen" style={Constants.bgWhite}>
      <Navigation />
      <main className="pt-20">
        <DetailResultatRecherche />
      </main>
      <Footer />
    </div>
  );
};

export default DetailResultatRecherchePage;
