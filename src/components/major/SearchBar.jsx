import React, { useState, useRef, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-gray-800 hover:opacity-35 transition"
      >
        {open ? (
          <p className="cursor-pointer hover:opacity-50 transition-all duration-300 ease-in-out">
            X
          </p>
        ) : (
          <IoMdSearch className="cursor-pointer hover:opacity-50 transition-all duration-300 ease-in-out" />
        )}
      </button>

      <div
        className={`absolute top-[-16px] right-10 transform transition-all duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="bg-transparent shadow-lg border border-gray-200 rounded-md p-3 w-80">
          <input
            ref={inputRef}
            type="text"
            placeholder="Поиск..."
            className="w-full border bg-transparent border-gray-300 rounded px-3 py-2 text-sm outline-none focus:ring focus:ring-blue-200"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
