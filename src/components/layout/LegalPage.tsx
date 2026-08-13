import Seo from "@/components/Seo";
import { useLanguage } from "@/contexts/LanguageContext";

export interface LegalSection {
  /** Préfixe de clé i18n ; `<prefix>.title` et `<prefix>.body` sont attendus. */
  key: string;
  /** Sous-sections éventuelles, même convention de clés. */
  items?: string[];
}

interface LegalPageProps {
  titleKey: string;
  sections: LegalSection[];
}

/**
 * Gabarit commun aux pages légales.
 *
 * Les trois pages partageaient la même structure — un titre, des sections
 * numérotées — dupliquée trois fois avec le texte en dur. Le contenu vit
 * désormais dans le dictionnaire, ce qui le rend traduisible.
 */
const LegalPage = ({ titleKey, sections }: LegalPageProps) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col">
      <Seo title={t(titleKey)} />

      <div className="flex-grow pt-24 pb-16">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">{t(titleKey)}</h1>

            <div className="prose prose-lg max-w-none space-y-6">
              {sections.map((section, index) => (
                <section key={section.key}>
                  <h2 className="text-xl font-semibold mb-4">
                    {index + 1}. {t(`${section.key}.title`)}
                  </h2>

                  {section.items ? (
                    <div className="space-y-4">
                      {section.items.map((item) => (
                        <div key={item}>
                          <h3 className="font-medium mb-2">{t(`${item}.title`)}</h3>
                          <p className="text-muted-foreground">{t(`${item}.body`)}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">{t(`${section.key}.body`)}</p>
                  )}
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
