import React from "react";
import { FaRegUser } from "react-icons/fa";
import DropdownMenu from "../reusable/DropdownMenu";
import CartDropdown from "./CartDropdown";
import SearchBar from "../major/SearchBar";
import { useNavigate } from "react-router-dom";

const testData = [
  {
    title: "Nike",
    items: [
      { label: "shoes", url: "/url" },
      { label: "tshirts", url: "/url" },
      { label: "sneakers", url: "/url" },
    ],
  },
  {
    title: "Adidas",
    items: [
      { label: "shoes", url: "/url" },
      { label: "tshirts", url: "/url" },
      { label: "sneakers", url: "/url" },
      { label: "tshirts", url: "/url" },
      { label: "sneakers", url: "/url" },
    ],
  },
  {
    title: "Puma",
    items: [
      { label: "shoes", url: "/url" },
      { label: "tshirts", url: "/url" },
    ],
  },
];

const Header = () => {
  const nav = useNavigate();

  return (
    <div className="sticky py-4 top-0 z-50 w-full bg-[#EBEBEB]">
      <div className="flex justify-between h-[48px]">
        <div className="flex gap-4">
          <div>ДЛЯ НЕГО</div>
          <div>ДЛЯ НЕЕ</div>
        </div>
        <div
          className="select-none cursor-pointer absolute top-[24px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl header-font"
          onClick={() => nav("/")}
        >
          405
        </div>
        <div className="text-3xl flex gap-2">
          <SearchBar />
          <CartDropdown
            cartItems={[
              { name: "Кроссовки Nike", quantity: 1, price: 5999 },
              { name: "Футболка Adidas", quantity: 2, price: 2499 },
            ]}
          />
          <FaRegUser className="cursor-pointer hover:opacity-50 transition-all duration-300 ease-in-out" />
        </div>
      </div>
      <div className="flex gap-4 my-1">
        <DropdownMenu title="Новинки" items={testData} />
        <DropdownMenu title="Бренды" items={testData} />
        <DropdownMenu title="Одежда" items={testData} />
        <DropdownMenu title="Обувь" items={testData} />
        <DropdownMenu title="Распродажа" items={testData} />
      </div>
    </div>
  );
};

export default Header;
