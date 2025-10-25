import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";
import Publications from "@/components/Publications";
import Footer from "@/components/Footer";
import { Constants } from "@/constants/Constants";

const PublicationsPage = () => {
  return (
    <div className="min-h-screen" style={Constants.bgWhite}>
      <Navigation />
      <Publications />
      <Footer />
    </div>
  );
};

export default PublicationsPage;