import { useState } from "react";

export default function useSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return {
    searchTerm,
    setSearchTerm,
    handleSearchChange,
  };
}
