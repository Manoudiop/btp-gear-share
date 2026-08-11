
import { useState } from "react";
import { Phone, Mail, MapPin, Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import Seo from "@/components/Seo";

const emptyForm = { name: "", email: "", phone: "", subject: "", message: "" };

const subjectOptions = [
  { value: "location", key: "contact.subject.rental" },
  { value: "partnership", key: "contact.subject.partnership" },
  { value: "support", key: "contact.subject.support" },
  { value: "billing", key: "contact.subject.billing" },
  { value: "other", key: "contact.subject.other" },
];

const faqs = ["contact.faq1", "contact.faq2", "contact.faq3", "contact.faq4", "contact.faq5"];

const Contact = () => {
  const { t } = useLanguage();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pas encore de backend : le formulaire se contente de confirmer l'envoi.
    setFormSubmitted(true);
    setFormData(emptyForm);

    window.setTimeout(() => setFormSubmitted(false), 5000);
  };

  const inputClass =
    "w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50";

  return (
    <div className="pt-24 pb-16">
      <Seo title={t("contact.title")} description={t("contact.subtitle")} />

      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">{t("contact.title")}</h1>
          <p className="text-xl text-muted-foreground">{t("contact.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-secondary/20 p-6 rounded-xl flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t("contact.phone")}</h3>
            <p className="text-muted-foreground mb-4">{t("contact.phoneDesc")}</p>
            <a href="tel:+33123456789" className="text-primary font-medium">
              +33 1 23 45 67 89
            </a>
          </div>

          <div className="bg-secondary/20 p-6 rounded-xl flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t("auth.email")}</h3>
            <p className="text-muted-foreground mb-4">{t("contact.emailDesc")}</p>
            <a href="mailto:contact@btplocation.com" className="text-primary font-medium">
              contact@btplocation.com
            </a>
          </div>

          <div className="bg-secondary/20 p-6 rounded-xl flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t("contact.address")}</h3>
            <p className="text-muted-foreground mb-4">{t("contact.addressDesc")}</p>
            <p className="text-primary font-medium">
              123 Avenue des Entrepreneurs, 75001 Paris, France
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-bold mb-6">{t("contact.formTitle")}</h2>

            {formSubmitted ? (
              <div
                role="status"
                className="bg-green-50 border border-green-200 rounded-xl p-6 flex items-center"
              >
                <div className="bg-green-100 rounded-full p-2 mr-4">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-800">{t("contact.sent")}</h3>
                  <p className="text-green-700">{t("contact.sentDesc")}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      {t("contact.fullName")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      {t("auth.email")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      {t("contact.phone")}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      {t("contact.subject")}
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    >
                      <option value="">{t("contact.selectSubject")}</option>
                      {subjectOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {t(option.key)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    {t("contact.message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={inputClass}
                  />
                </div>

                <Button type="submit" className="button-premium">
                  {t("contact.send")}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">{t("contact.faqTitle")}</h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq} className="p-6 border border-border rounded-xl">
                  <h3 className="text-lg font-semibold mb-2">{t(`${faq}.q`)}</h3>
                  <p className="text-muted-foreground">{t(`${faq}.a`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
