
import { Link } from "react-router-dom";
import { Building } from "lucide-react";

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <Link to="/" className={`flex items-center ${className}`}>
      <Building className="h-6 w-6 text-primary mr-2" />
      <span className="text-xl font-bold">
        BTP<span className="text-primary">Location</span>
      </span>
    </Link>
  );
};

export default Logo;
