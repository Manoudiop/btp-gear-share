
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  placeholder?: string;
}

const SearchBar = ({ placeholder = "Rechercher..." }: SearchBarProps) => {
  return (
    <div className="relative flex w-full max-w-3xl mx-auto">
      <div className="relative flex-grow">
        <Input
          type="text"
          placeholder={placeholder}
          className="pl-10 py-6 pr-4 w-full rounded-l-md border-r-0"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      </div>
      <Button className="rounded-l-none px-6" type="submit">
        Rechercher
      </Button>
    </div>
  );
};

export default SearchBar;
