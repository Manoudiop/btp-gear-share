import LegalPage, { type LegalSection } from "@/components/layout/LegalPage";

const sections: LegalSection[] = [
  { key: "cookies.s1" },
  {
    key: "cookies.s2",
    items: ["cookies.essential", "cookies.analytics", "cookies.functional"],
  },
  { key: "cookies.s3" },
  { key: "cookies.s4" },
  { key: "cookies.s5" },
];

const Cookies = () => <LegalPage titleKey="legal.cookies" sections={sections} />;

export default Cookies;
