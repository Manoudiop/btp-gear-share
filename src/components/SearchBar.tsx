
import { useState } from "react";
import { Search, MapPin, Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchBar = () => {
  const [focused, setFocused] = useState(false);

  return (
    <div 
      className={`bg-white rounded-2xl shadow-elevated p-2 transition-all duration-300 ${
        focused ? "shadow-premium" : ""
      }`}
    >
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 flex items-center space-x-2 border-b md:border-b-0 md:border-r border-border p-3">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Type de matériel, marque..."
            className="flex-1 bg-transparent focus:outline-none text-sm"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </div>
        
        <div className="flex-1 flex items-center space-x-2 border-b md:border-b-0 md:border-r border-border p-3">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Lieu"
            className="flex-1 bg-transparent focus:outline-none text-sm"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </div>
        
        <div className="flex-1 flex items-center space-x-2 p-3">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Date"
            className="flex-1 bg-transparent focus:outline-none text-sm"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
        
        <Button className="m-2 button-premium">
          <Search className="mr-2 h-4 w-4" />
          Rechercher
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
