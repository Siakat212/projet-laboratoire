import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";
import Level from "@/components/Level";
import Footer from "@/components/Footer";
import { Constants } from "@/constants/Constants";

const LevelPage = () => {
  return (
    <div className="min-h-screen" style={Constants.bgWhite}>
      <Navigation />
      <Level />
      <Footer />
    </div>
  );
};

export default LevelPage;