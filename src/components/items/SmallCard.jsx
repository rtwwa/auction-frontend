import React, { useState } from "react";

const previwInfo = {
  title: null,
  description: null,
  previewImage: null,
  previewImageOnHover: null,
  lowestPrice: null,
};

const fullInfo = {
  title: null,
  description: null,
  previewImage: null,
  previewImageOnHover: null,
  lowestPrice: null,
  // ->
  itemId: null,
  images: null,
  size: null,
  price: null,

  userId: null,
  reviewText: null,
  reviewRating: null,
  // ->
  user: null,
};

const SmallCard = ({
  title,
  description,
  imageUrl,
  imageUrlOnHover,
  lowestPrice,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  const currentImageUrl =
    isHovering && imageUrlOnHover ? imageUrlOnHover : imageUrl;

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden mx-2 w-80 flex-shrink-0 transition-shadow duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {imageUrl && (
        <img
          src={currentImageUrl}
          alt={title}
          className="w-full h-80 object-cover transition-opacity duration-300 ease-in-out" // TODO добавить плавную смену картинок
        />
      )}
      <div className="px-4 py-2">
        <h3 className="text-gray-800 font-bold text-lg mb-2">{title}</h3>
        <p className="text-gray-700 text-sm">{description}</p>
      </div>
      <div className="px-4 py-2">
        <p className="text-gray-700 text-sm">
          {lowestPrice ? `${lowestPrice.toLocaleString("ru-RU")} ₽` : null}
        </p>
      </div>
    </div>
  );
};

export default SmallCard;
