import React from "react";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const nav = useNavigate();

  return (
    <div className="relative">
      <button
        onClick={() => nav("/search")}
        className="text-gray-800 hover:opacity-35 transition"
      >
        <IoMdSearch className="cursor-pointer hover:opacity-50 transition-all duration-300 ease-in-out" />
      </button>
    </div>
  );
};

export default SearchBar;
