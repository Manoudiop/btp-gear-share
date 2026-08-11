
import AuthForm from "@/components/auth/AuthForm";
import Seo from "@/components/Seo";
import { useLanguage } from "@/contexts/LanguageContext";

const Register = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col">
      <Seo title={t("auth.register")} />
      
      
      <div className="flex items-center justify-center py-16 px-4 bg-muted/30 min-h-[70vh]">
        <div className="w-full max-w-md">
          <AuthForm type="register" />
        </div>
      </div>
      
    </div>
  );
};

export default Register;
