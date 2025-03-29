
import { Users, ShieldCheck, TrendingUp, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const About = () => {
  const values = [
    {
      title: "Simplicité",
      description: "Nous rendons la location d'équipement BTP aussi simple que possible.",
      icon: <Users className="h-10 w-10 text-primary" />,
    },
    {
      title: "Fiabilité",
      description: "Nos équipements sont vérifiés et certifiés pour votre sécurité.",
      icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    },
    {
      title: "Innovation",
      description: "Nous utilisons la technologie pour améliorer constamment notre service.",
      icon: <TrendingUp className="h-10 w-10 text-primary" />,
    },
  ];

  const stats = [
    { number: "5000+", label: "Équipements disponibles" },
    { number: "2000+", label: "Utilisateurs actifs" },
    { number: "150+", label: "Villes couvertes" },
    { number: "98%", label: "Clients satisfaits" },
  ];

  const team = [
    {
      name: "Marie Dupont",
      role: "CEO & Fondatrice",
      bio: "Ancienne ingénieure en BTP, Marie a fondé BTPLocation après avoir constaté les difficultés d'accès au matériel de qualité.",
      image: "https://images.unsplash.com/photo-1594751543129-6701ad444259?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    },
    {
      name: "Pierre Martin",
      role: "Directeur technique",
      bio: "Avec 15 ans d'expérience dans le secteur du BTP, Pierre supervise la sélection et la qualité de tous les équipements.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    },
    {
      name: "Sophie Lefebvre",
      role: "Responsable relations clients",
      bio: "Sophie assure que chaque client reçoive un service personnalisé et une assistance réactive.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    },
    {
      name: "Thomas Petit",
      role: "Directeur marketing",
      bio: "Thomas met en valeur notre offre et développe des partenariats stratégiques dans le secteur du BTP.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    },
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Notre mission</h1>
          <p className="text-xl text-muted-foreground">
            Faciliter l'accès aux équipements de construction pour tous les professionnels du BTP, quelle que soit la taille de leur entreprise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Notre histoire</h2>
            <p className="text-lg text-muted-foreground">
              BTPLocation est née en 2018 d'une frustration commune à de nombreux professionnels du BTP : la difficulté d'accéder à des équipements de qualité à des prix abordables.
            </p>
            <p className="text-lg text-muted-foreground">
              Notre fondatrice, Marie Dupont, ancienne ingénieure sur des chantiers de grande envergure, a constaté que de nombreuses petites et moyennes entreprises ne pouvaient pas se permettre d'acheter des équipements coûteux, tandis que d'autres avaient des équipements sous-utilisés.
            </p>
            <p className="text-lg text-muted-foreground">
              C'est ainsi qu'est née l'idée de créer une plateforme qui connecte les propriétaires d'équipements avec ceux qui en ont besoin, créant une économie collaborative dans le secteur du BTP.
            </p>
          </div>
          <div>
            <div className="relative rounded-xl overflow-hidden shadow-premium">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Histoire de BTPLocation"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Nos valeurs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-border hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20 bg-secondary/20 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Notre équipe</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-border hover:shadow-lg transition-shadow text-center"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <div className="text-primary font-medium mb-3">{member.role}</div>
                <p className="text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20 p-8 md:p-12 bg-primary/5 rounded-2xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Pourquoi nous choisir</h2>
              <div className="space-y-4">
                {[
                  "Sélection rigoureuse des équipements",
                  "Processus de location simplifié",
                  "Tarifs transparents et compétitifs",
                  "Support client réactif",
                  "Garantie de satisfaction",
                  "Livraison et enlèvement flexibles",
                ].map((reason, i) => (
                  <div key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mt-0.5 mr-2" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="relative rounded-xl overflow-hidden shadow-premium">
                <img
                  src="https://images.unsplash.com/photo-1593313637552-29c2c0dacd35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Équipement BTP"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Rejoignez la communauté BTPLocation</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Nous sommes fiers de construire une communauté de professionnels qui transforment le secteur du BTP grâce à une approche collaborative et innovante.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="button-premium">
              Explorer les équipements
            </Button>
            <Button variant="outline" size="lg">
              Devenir partenaire
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
