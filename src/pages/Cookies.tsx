import Seo from "@/components/Seo";
import { useLanguage } from "@/contexts/LanguageContext";
const Cookies = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Seo title={t("legal.cookies")} />
      
      <div className="flex-grow pt-24 pb-16">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">{t("legal.cookies")}</h1>
            
            <div className="prose prose-lg max-w-none space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-4">1. Qu'est-ce qu'un cookie ?</h2>
                <p className="text-muted-foreground">
                  Un cookie est un petit fichier texte déposé sur votre navigateur lors de la visite d'un site web. Il permet de stocker des informations relatives à votre navigation et d'améliorer votre expérience utilisateur.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4">2. Types de cookies utilisés</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Cookies essentiels</h3>
                    <p className="text-muted-foreground">
                      Ces cookies sont nécessaires au fonctionnement du site. Ils permettent d'utiliser les principales fonctionnalités (connexion, panier, etc.).
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Cookies analytiques</h3>
                    <p className="text-muted-foreground">
                      Ces cookies nous permettent d'analyser l'utilisation du site pour en améliorer les performances et le contenu.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Cookies fonctionnels</h3>
                    <p className="text-muted-foreground">
                      Ces cookies permettent de mémoriser vos préférences (langue, région, etc.) pour personnaliser votre expérience.
                    </p>
                  </div>
                </div>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4">3. Gestion des cookies</h2>
                <p className="text-muted-foreground">
                  Vous pouvez à tout moment modifier vos préférences en matière de cookies via les paramètres de votre navigateur. Notez que la désactivation de certains cookies peut affecter votre expérience sur notre site.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4">4. Durée de conservation</h2>
                <p className="text-muted-foreground">
                  Les cookies sont conservés pour une durée maximale de 13 mois conformément aux recommandations de la CNIL. Au-delà de cette période, votre consentement sera à nouveau demandé.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-4">5. Contact</h2>
                <p className="text-muted-foreground">
                  Pour toute question concernant notre utilisation des cookies, vous pouvez nous contacter à privacy@btplocation.fr.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Cookies;
