import React from "react";
import SmallCard from "./SmallCard";

const ProductsList = ({ products }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {products.map((product) => (
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
  );
};

export default ProductsList;
