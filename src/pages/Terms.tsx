import Seo from "@/components/Seo";
import { useLanguage } from "@/contexts/LanguageContext";
const Terms = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Seo title={t("legal.terms")} />
      
      <div className="flex-grow pt-24 pb-16">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">{t("legal.terms")}</h1>
            
            <div className="prose prose-lg max-w-none space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-4">1. Objet</h2>
                <p className="text-muted-foreground">
                  Les présentes conditions générales d'utilisation régissent l'utilisation de la plateforme BTP Location, accessible à l'adresse btplocation.fr. En accédant à notre site, vous acceptez ces conditions dans leur intégralité.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4">2. Inscription</h2>
                <p className="text-muted-foreground">
                  L'utilisation de certains services nécessite la création d'un compte. Vous vous engagez à fournir des informations exactes et à maintenir la confidentialité de vos identifiants de connexion.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4">3. Services proposés</h2>
                <p className="text-muted-foreground">
                  BTP Location met en relation des propriétaires d'équipements BTP avec des professionnels souhaitant louer ce matériel. La plateforme facilite la réservation, le paiement et la gestion des locations.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4">4. Responsabilités</h2>
                <p className="text-muted-foreground">
                  BTP Location agit en tant qu'intermédiaire et ne peut être tenu responsable des litiges entre loueurs et locataires. Chaque utilisateur est responsable de la véracité des informations publiées.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4">5. Tarification</h2>
                <p className="text-muted-foreground">
                  Les prix des locations sont fixés par les propriétaires. BTP Location prélève une commission sur chaque transaction. Les détails de la tarification sont disponibles sur la page Tarifs.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4">6. Modification des conditions</h2>
                <p className="text-muted-foreground">
                  BTP Location se réserve le droit de modifier ces conditions à tout moment. Les utilisateurs seront informés de tout changement significatif par email ou notification sur la plateforme.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4">7. Droit applicable</h2>
                <p className="text-muted-foreground">
                  Ces conditions sont régies par le droit français. Tout litige sera soumis à la compétence exclusive des tribunaux de Paris.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Terms;
