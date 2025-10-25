import Navigation from "@/components/Navigation";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Constants } from "@/constants/Constants";

const ContactPage = () => {
  return (
    <div className="min-h-screen" style={Constants.bgWhite}>
      <Navigation />
      <Contact />
      <Footer />
    </div>
  );
};

export default ContactPage;