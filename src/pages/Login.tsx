
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthForm from "@/components/auth/AuthForm";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Connexion | BTP Location</title>
        <meta 
          name="description" 
          content="Connectez-vous à votre compte BTP Location pour accéder à vos commandes, réservations et paramètres."
        />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16 px-4 bg-muted/30">
        <div className="w-full max-w-md">
          <AuthForm type="login" />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
