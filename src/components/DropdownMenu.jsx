import React from "react";

const DropdownMenu = ({ title, items = [] }) => {
  return (
    <div className="relative group inline-block text-left">
      <div className="cursor-pointer border-transparent hover:border-black border-b-2">
        {title}
      </div>
      <div
        className="
      absolute left-0 mt-2 w-[1249px] h-80
    bg-white border border-gray-200
      shadow-lg opacity-0 overflow-auto
      group-hover:opacity-100 invisible
      group-hover:visible transition-all
      duration-200 z-10 p-6 flex gap-12"
      >
        {items.map((category, index) => (
          <div key={index} className="min-w-[200px]">
            <h4 className="font-semibold text-gray-800 mb-3">
              {category.title}
            </h4>
            <ul className="space-y-2">
              {category.items.map((subItem, subIndex) => (
                <li key={subIndex}>
                  <a
                    href={subItem.url}
                    className="text-sm text-gray-700 hover:opacity-35 transition"
                  >
                    {subItem.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
