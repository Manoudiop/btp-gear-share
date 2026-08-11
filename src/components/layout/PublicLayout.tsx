import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * Chrome commun à toutes les pages publiques.
 * Plusieurs pages (Tarifs, Contact, À propos…) n'affichaient aucune navigation :
 * le layout garantit qu'aucune page ne peut plus être livrée sans navbar ni footer.
 */
const PublicLayout = () => {
  const { pathname } = useLocation();

  // Sans cela, un changement de page conserve la position de défilement précédente.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
