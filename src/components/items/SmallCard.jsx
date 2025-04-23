import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CartApi from "../../api/cart.api";

const SmallCard = ({
  id,
  title,
  description,
  imageUrl,
  imageUrlOnHover,
  lowestPrice,
}) => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState(null);

  const currentImageUrl =
    isHovering && imageUrlOnHover ? imageUrlOnHover : imageUrl;

  const handleAddToCart = async (e) => {
    e.stopPropagation(); // Предотвращаем переход при клике на кнопку
    try {
      setAdding(true);
      setError(null);
      await CartApi.addItemToCart(id, 1);
    } catch (err) {
      setError("Ошибка при добавлении в корзину");
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden mx-2 w-80 flex-shrink-0 transition-shadow duration-300 hover:shadow-xl cursor-pointer"
      onClick={() => navigate(`/product/${id}`)} // Основной клик по карточке
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {imageUrl && (
        <img
          src={currentImageUrl}
          alt={title}
          className="w-full h-80 object-cover transition-opacity duration-300 ease-in-out"
        />
      )}
      <div className="px-4 py-2">
        <h3 className="text-gray-800 font-bold text-lg mb-2">{title}</h3>
        <p className="text-gray-700 text-sm line-clamp-2">{description}</p>
      </div>
      <div className="px-4 py-2 flex justify-between items-center">
        <p className="text-gray-700 text-sm">
          {lowestPrice ? `${lowestPrice.toLocaleString("ru-RU")} ₽` : null}
        </p>
        <button
          onClick={handleAddToCart}
          disabled={adding}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded transition disabled:opacity-50"
        >
          {adding ? "Добавление..." : "В корзину"}
        </button>
      </div>
      {error && <div className="px-4 py-2 text-red-500 text-xs">{error}</div>}
    </div>
  );
};

export default SmallCard;
