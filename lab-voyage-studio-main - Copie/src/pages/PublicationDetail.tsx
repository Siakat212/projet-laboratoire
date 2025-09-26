import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import PublicationDetail from "@/components/PublicationDetail";

const PublicationDetailPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />      
      <PublicationDetail />
      <Footer />
    </div>
  );
};

export default PublicationDetailPage;