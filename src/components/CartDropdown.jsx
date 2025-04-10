import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";

const CartDropdown = ({ cartItems = [] }) => {
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="relative group">
      <div className="cursor-pointer relative">
        <MdOutlineShoppingCart className="cursor-pointer hover:opacity-50 transition-all duration-300 ease-in-out text-3xl" />
        {cartItems.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {cartItems.length}
          </span>
        )}
      </div>

      <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
        <div className="p-4 max-h-60 overflow-y-auto">
          {cartItems.length === 0 ? (
            <p className="text-sm text-gray-500">Корзина пуста</p>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-2"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.quantity} × {item.price}₽
                  </p>
                </div>
                <p className="text-sm text-gray-700">
                  {item.price * item.quantity}₽
                </p>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-800 mb-2">
              Итого: {totalPrice.toLocaleString("ru-RU")}₽
            </p>
            <a
              href="/cart"
              className="block text-xl text-center py-2 rounded-md hover:opacity-35 transition"
            >
              Перейти в корзину
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDropdown;
