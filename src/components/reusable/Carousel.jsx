import React, { useState, useRef, useEffect } from "react";
import SmallCard from "../items/SmallCard";

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const itemWidth = 320 + 16;

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    if (carouselRef.current) {
      const scrollAmount = currentIndex * itemWidth;
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  }, [currentIndex, itemWidth]);

  if (!items || items.length === 0) {
    return <div>Нет элементов для отображения</div>;
  }

  return (
    <div className="relative w-full max-w-[1008px] mx-auto my-5">
      {" "}
      <div
        ref={carouselRef}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
        style={{ scrollBehavior: "smooth" }}
      >
        {items.map((product) => (
          <SmallCard
            key={product.id}
            id={product.id}
            title={product.title}
            description={product.description}
            imageUrl={product.image_url}
            imageUrlOnHover={product.image_url_2}
            lowestPrice={product.price_start}
          />
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 focus:outline-none z-10 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 focus:outline-none z-10 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
