
import { Users, ShieldCheck, TrendingUp, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import Seo from "@/components/Seo";

const About = () => {
  const { t } = useLanguage();

  const values = [
    { key: "about.value1", icon: <Users className="h-10 w-10 text-primary" /> },
    { key: "about.value2", icon: <ShieldCheck className="h-10 w-10 text-primary" /> },
    { key: "about.value3", icon: <TrendingUp className="h-10 w-10 text-primary" /> },
  ];

  const stats = [
    { number: "5000+", labelKey: "about.stat1" },
    { number: "2000+", labelKey: "about.stat2" },
    { number: "150+", labelKey: "about.stat3" },
    { number: "98%", labelKey: "about.stat4" },
  ];

  const team = [
    {
      key: "about.team1",
      name: "Marie Dupont",
      image:
        "https://images.unsplash.com/photo-1594751543129-6701ad444259?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    },
    {
      key: "about.team2",
      name: "Pierre Martin",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    },
    {
      key: "about.team3",
      name: "Sophie Lefebvre",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    },
    {
      key: "about.team4",
      name: "Thomas Petit",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    },
  ];

  const reasons = [
    "about.why1",
    "about.why2",
    "about.why3",
    "about.why4",
    "about.why5",
    "about.why6",
  ];

  return (
    <div className="pt-24 pb-16">
      <Seo title={t("about.missionTitle")} description={t("about.missionDesc")} />

      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">{t("about.missionTitle")}</h1>
          <p className="text-xl text-muted-foreground">{t("about.missionDesc")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">{t("about.storyTitle")}</h2>
            <p className="text-lg text-muted-foreground">{t("about.story1")}</p>
            <p className="text-lg text-muted-foreground">{t("about.story2")}</p>
            <p className="text-lg text-muted-foreground">{t("about.story3")}</p>
          </div>
          <div>
            <div className="relative rounded-xl overflow-hidden shadow-premium">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt={t("about.storyTitle")}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">{t("about.valuesTitle")}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.key}
                className="p-6 rounded-xl border border-border hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{t(`${value.key}.title`)}</h3>
                <p className="text-muted-foreground">{t(`${value.key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20 bg-secondary/20 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.labelKey} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{t(stat.labelKey)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">{t("about.teamTitle")}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div
                key={member.key}
                className="p-6 rounded-xl border border-border hover:shadow-lg transition-shadow text-center"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <img src={member.image} alt={member.name} className="object-cover w-full h-full" />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <div className="text-primary font-medium mb-3">{t(`${member.key}.role`)}</div>
                <p className="text-muted-foreground">{t(`${member.key}.bio`)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20 p-8 md:p-12 bg-primary/5 rounded-2xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t("about.whyTitle")}</h2>
              <div className="space-y-4">
                {reasons.map((reason) => (
                  <div key={reason} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mt-0.5 mr-2" />
                    <span>{t(reason)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="relative rounded-xl overflow-hidden shadow-premium">
                <img
                  src="https://images.unsplash.com/photo-1593313637552-29c2c0dacd35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt={t("about.whyTitle")}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">{t("about.joinTitle")}</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t("about.joinDesc")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="button-premium" asChild>
              <Link to="/equipment">{t("how.ctaButton")}</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/become-owner">{t("about.becomePartner")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
