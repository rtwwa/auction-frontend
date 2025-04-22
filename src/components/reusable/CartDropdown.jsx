import React, { useEffect, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import CartApi from "../../api/cart.api";

const CartDropdown = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await CartApi.getCart();
        setCartItems(data);
      } catch (err) {
        setError(err.message || "Не удалось загрузить корзину");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleQuantityChange = async (itemId, quantity) => {
    try {
      const updatedCart = await CartApi.updateCartItemQuantity(
        itemId,
        quantity
      );
      setCartItems(updatedCart);
    } catch (err) {
      console.error("Ошибка обновления количества:", err);
      // Обработка ошибки
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const updatedCart = await CartApi.removeItemFromCart(itemId);
      setCartItems(updatedCart);
    } catch (err) {
      console.error("Ошибка удаления элемента:", err);
      // Обработка ошибки
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (loading) {
    return <div>Загрузка корзины...</div>;
  }

  if (error) {
    return <div>Ошибка загрузки корзины: {error}</div>;
  }
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
                  <div className="flex items-center text-xs text-gray-500">
                    Кол-во:
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                      className="w-16 ml-1 border rounded-sm p-0.5"
                    />
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      Удалить
                    </button>
                    × {item.price}₽
                  </div>
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
