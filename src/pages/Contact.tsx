
import { useState } from "react";
import { Phone, Mail, MapPin, Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation d'envoi de formulaire
    console.log("Form submitted:", formData);
    setFormSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 3000);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Contactez-nous</h1>
          <p className="text-xl text-muted-foreground">
            Une question, un besoin spécifique ou une demande de partenariat ? Notre équipe est à votre écoute.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-secondary/20 p-6 rounded-xl flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Téléphone</h3>
            <p className="text-muted-foreground mb-4">
              Appelez-nous pour une assistance immédiate
            </p>
            <a href="tel:+33123456789" className="text-primary font-medium">
              +33 1 23 45 67 89
            </a>
          </div>

          <div className="bg-secondary/20 p-6 rounded-xl flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-muted-foreground mb-4">
              Envoyez-nous un email et nous vous répondrons sous 24h
            </p>
            <a href="mailto:contact@btplocation.com" className="text-primary font-medium">
              contact@btplocation.com
            </a>
          </div>

          <div className="bg-secondary/20 p-6 rounded-xl flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Adresse</h3>
            <p className="text-muted-foreground mb-4">
              Venez nous rencontrer à nos bureaux
            </p>
            <p className="text-primary font-medium">
              123 Avenue des Entrepreneurs, 75001 Paris, France
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
            
            {formSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex items-center">
                <div className="bg-green-100 rounded-full p-2 mr-4">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-800">Message envoyé avec succès</h3>
                  <p className="text-green-700">
                    Merci pour votre message. Notre équipe vous contactera rapidement.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Sujet
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="location">Location d'équipement</option>
                      <option value="partnership">Partenariat</option>
                      <option value="support">Support technique</option>
                      <option value="billing">Facturation</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  ></textarea>
                </div>

                <Button type="submit" className="button-premium">
                  Envoyer le message
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Foire aux questions</h2>
            <div className="space-y-6">
              {[
                {
                  question: "Comment puis-je louer un équipement ?",
                  answer:
                    "Pour louer un équipement, il vous suffit de créer un compte, de naviguer dans notre catalogue, de sélectionner l'équipement souhaité et de suivre le processus de réservation en ligne.",
                },
                {
                  question: "Quelles sont les conditions de location ?",
                  answer:
                    "Les conditions de location varient selon l'équipement. Généralement, une caution est demandée et une assurance est incluse. Vous pouvez consulter les conditions spécifiques sur la page de chaque équipement.",
                },
                {
                  question: "Comment fonctionne la livraison ?",
                  answer:
                    "Vous pouvez soit récupérer l'équipement au point de collecte désigné, soit opter pour une livraison directement sur votre chantier moyennant des frais supplémentaires qui varient selon la distance.",
                },
                {
                  question: "Que faire en cas de panne d'équipement ?",
                  answer:
                    "En cas de panne, contactez immédiatement notre service client. Nous organiserons soit une réparation rapide, soit un remplacement de l'équipement selon la situation.",
                },
                {
                  question: "Comment devenir partenaire ou loueur ?",
                  answer:
                    "Pour devenir partenaire ou proposer votre équipement à la location, contactez-nous via le formulaire ci-contre ou appelez notre équipe commerciale pour discuter des possibilités de collaboration.",
                },
              ].map((faq, index) => (
                <div key={index} className="p-6 border border-border rounded-xl">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
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
