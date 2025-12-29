import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Politique de Confidentialité</h1>
            
            <div className="prose prose-lg max-w-none space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-4">1. Collecte des données</h2>
                <p className="text-muted-foreground">
                  BTP Location collecte les données personnelles que vous nous fournissez directement lors de votre inscription, de la création de votre compte ou de l'utilisation de nos services. Ces données peuvent inclure votre nom, adresse e-mail, numéro de téléphone et informations de facturation.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4">2. Utilisation des données</h2>
                <p className="text-muted-foreground">
                  Vos données personnelles sont utilisées pour fournir, maintenir et améliorer nos services, traiter vos transactions, vous envoyer des communications relatives à votre compte et vous informer des mises à jour de nos services.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4">3. Protection des données</h2>
                <p className="text-muted-foreground">
                  Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4">4. Partage des données</h2>
                <p className="text-muted-foreground">
                  Nous ne vendons pas vos données personnelles à des tiers. Nous pouvons partager vos informations avec des prestataires de services tiers qui nous aident à exploiter notre plateforme, sous réserve d'obligations de confidentialité.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4">5. Vos droits</h2>
                <p className="text-muted-foreground">
                  Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données personnelles. Vous pouvez exercer ces droits en nous contactant à l'adresse privacy@btplocation.fr.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4">6. Contact</h2>
                <p className="text-muted-foreground">
                  Pour toute question concernant cette politique de confidentialité, vous pouvez nous contacter à privacy@btplocation.fr ou par courrier à l'adresse : 123 Avenue des Entrepreneurs, 75001 Paris.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
