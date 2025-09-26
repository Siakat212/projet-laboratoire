import Navigation from "@/components/Navigation";
import TeamMemberDetail from "@/components/TeamMemberDetail";
import Footer from "@/components/Footer";
import { Constants } from "@/constants/Constants";

const TeamMemberDetailPage = () => {
  return (
    <div className="min-h-screen" style={Constants.bgWhite}>
      <Navigation />
      <TeamMemberDetail />
      <Footer />
    </div>
  );
};

export default TeamMemberDetailPage;