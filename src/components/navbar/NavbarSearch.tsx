// app/components/NavbarSearch.tsx (Client Component)
"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NavbarSearch() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <form onSubmit={handleSearch} className="flex">
      <div className="relative flex-grow">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search"
          className="pl-8 rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <X
            className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground cursor-pointer"
            onClick={() => setSearchQuery("")}
          />
        )}
      </div>
      <Button type="submit" className="ml-2 bg-primary">
        Search
      </Button>
    </form>
  );
}
