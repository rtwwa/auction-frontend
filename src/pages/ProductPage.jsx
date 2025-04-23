import React, { useEffect, useState } from "react";
import CartApi from "../api/cart.api";
import { useParams } from "react-router-dom";
import ProductApi from "../api/products.api";
import Header from "../components/major/Header";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await ProductApi.getProductById(id);
        console.log(result);
        setProduct(result);
        setCurrentImage(result.image_url);
        setSelectedSize(result.size?.[0] || "");
      } catch (e) {
        setError("Ошибка сети");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      setAdding(true);
      setError("");
      await CartApi.addItemToCart(product.id, 1, selectedSize);
    } catch (err) {
      setError("Ошибка при добавлении в корзину");
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <div className="text-center p-8">Загрузка...</div>;
  if (error) return <div className="text-red-500 text-center p-8">{error}</div>;
  if (!product) return <div className="text-center p-8">Товар не найден</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={currentImage}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-4">
            {[product.image_url, product.image_url_2].map(
              (img, index) =>
                img && (
                  <button
                    key={img}
                    onClick={() => setCurrentImage(img)}
                    className={`w-24 h-24 rounded border-2 ${
                      currentImage === img
                        ? "border-blue-500"
                        : "border-gray-200"
                    } overflow-hidden`}
                  >
                    <img
                      src={img}
                      alt={`Вариант ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                )
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div className="border-b pb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>
            <p className="text-gray-600 mb-4">{product.description}</p>

            <div className="flex items-baseline gap-4 mb-4">
              {product.buy_now_price && (
                <span className="text-2xl font-bold text-gray-900">
                  {product.buy_now_price.toLocaleString("ru-RU")} ₽
                </span>
              )}
              {product.price_start &&
                product.price_start !== product.buy_now_price && (
                  <span className="text-gray-400 line-through">
                    {product.price_start.toLocaleString("ru-RU")} ₽
                  </span>
                )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {product.brand && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Бренд</h3>
                  <p className="text-gray-900">{product.brand}</p>
                </div>
              )}
              {product.material && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Материал
                  </h3>
                  <p className="text-gray-900">{product.material}</p>
                </div>
              )}
              {product.color && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Цвет</h3>
                  <p className="text-gray-900">{product.color}</p>
                </div>
              )}
              {product.season && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Сезон</h3>
                  <p className="text-gray-900">{product.season}</p>
                </div>
              )}
              {product.gender && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Пол</h3>
                  <p className="text-gray-900">{product.gender}</p>
                </div>
              )}
            </div>

            {product.size && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Размер
                </h3>
                <div className="flex gap-2">
                  <button
                    key={product.size}
                    onClick={() => setSelectedSize(product.size)}
                    className={`px-4 py-2 rounded border ${
                      selectedSize === product.size
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    {product.size}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Add to Cart */}
          <div className="pt-6">
            <button
              onClick={handleAddToCart}
              disabled={adding || !selectedSize}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {adding
                ? "Добавление..."
                : `Купить сейчас${selectedSize ? ` (${selectedSize})` : ""}`}
            </button>
            {error && (
              <div className="mt-2 text-red-500 text-sm text-center">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
