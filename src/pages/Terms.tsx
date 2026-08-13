import LegalPage, { type LegalSection } from "@/components/layout/LegalPage";

const sections: LegalSection[] = [
  { key: "terms.s1" },
  { key: "terms.s2" },
  { key: "terms.s3" },
  { key: "terms.s4" },
  { key: "terms.s5" },
  { key: "terms.s6" },
  { key: "terms.s7" },
];

const Terms = () => <LegalPage titleKey="legal.terms" sections={sections} />;

export default Terms;
