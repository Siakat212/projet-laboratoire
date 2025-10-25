import Navigation from "@/components/Navigation";
import PageHero from "@/components/PageHero";
import Team from "@/components/Team";
import Footer from "@/components/Footer";
import { Constants } from "@/constants/Constants";

const TeamPage = () => {
  return (
    <div className="min-h-screen" style={Constants.bgWhite}>
      <Navigation />
      <Team />
      <Footer />
    </div>
  );
};

export default TeamPage;