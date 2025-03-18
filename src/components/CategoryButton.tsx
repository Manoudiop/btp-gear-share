
import { cn } from "@/lib/utils";

interface CategoryButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const CategoryButton = ({ icon, label, isActive = false, onClick }: CategoryButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center space-y-2 p-4 rounded-xl transition-all duration-300 hover-lift",
        isActive 
          ? "bg-primary text-primary-foreground shadow-subtle" 
          : "bg-secondary/50 text-foreground hover:bg-secondary"
      )}
    >
      <div className={cn(
        "w-12 h-12 flex items-center justify-center rounded-full",
        isActive ? "bg-white/20" : "bg-white"
      )}>
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

export default CategoryButton;
