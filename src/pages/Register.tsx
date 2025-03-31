
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthForm from "@/components/auth/AuthForm";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Inscription | BTP Location</title>
        <meta 
          name="description" 
          content="Créez un compte sur BTP Location pour louer du matériel de BTP, acheter des matériaux et gérer vos commandes."
        />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16 px-4 bg-muted/30">
        <div className="w-full max-w-md">
          <AuthForm type="register" />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
