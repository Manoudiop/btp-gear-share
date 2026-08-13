import LegalPage, { type LegalSection } from "@/components/layout/LegalPage";

const sections: LegalSection[] = [
  { key: "privacy.s1" },
  { key: "privacy.s2" },
  { key: "privacy.s3" },
  { key: "privacy.s4" },
  { key: "privacy.s5" },
  { key: "privacy.s6" },
];

const Privacy = () => <LegalPage titleKey="legal.privacy" sections={sections} />;

export default Privacy;
