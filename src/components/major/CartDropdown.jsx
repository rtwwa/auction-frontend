import React, { useEffect, useState, useRef } from "react";
import CartApi from "../../api/cart.api";
import { CiShoppingCart } from "react-icons/ci";

const CartDropdown = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const data = await CartApi.getCart();
        setCartItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Ошибка при получении корзины:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) fetchCart();
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleQuantityChange = async (cartItemId, quantity) => {
    try {
      const updatedCart = await CartApi.updateCartItemQuantity(
        cartItemId,
        quantity
      );
      setCartItems(updatedCart);
    } catch (error) {
      console.error("Ошибка обновления количества:", error);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      const updatedCart = await CartApi.removeItemFromCart(cartItemId);
      setCartItems(updatedCart);
    } catch (error) {
      console.error("Ошибка удаления элемента:", error);
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.buy_now_price) * item.quantity,
    0
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center"
      >
        <CiShoppingCart className="w-6 h-6 text-gray-700" />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
            {cartItems.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-4 z-50">
          <h4 className="text-lg font-semibold mb-2">Корзина</h4>
          {loading ? (
            <p className="text-gray-500">Загрузка...</p>
          ) : cartItems.length === 0 ? (
            <p className="text-gray-500">Корзина пуста</p>
          ) : (
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {cartItems.map((item) => (
                <li
                  key={item.cart_item_id}
                  className="flex items-center border-b pb-2 gap-3"
                >
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">
                      {item.buy_now_price}₽ x{" "}
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.cart_item_id,
                            parseInt(e.target.value)
                          )
                        }
                        className="w-12 border rounded px-1 text-center"
                      />
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm">
                      {(parseFloat(item.buy_now_price) * item.quantity).toFixed(
                        2
                      )}
                      ₽
                    </span>
                    <button
                      onClick={() => handleRemoveItem(item.cart_item_id)}
                      className="text-red-500 hover:text-red-700 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-3 border-t pt-3 text-right">
            <p className="font-semibold">Итого: {totalPrice.toFixed(2)}₽</p>
            <a
              href="/checkout"
              className="mt-2 inline-block bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
            >
              Оформить
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDropdown;
