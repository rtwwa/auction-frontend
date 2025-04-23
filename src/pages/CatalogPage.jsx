import React, { useEffect, useState } from "react";
import SmallCard from "../components/items/SmallCard";
import ProductApi from "../api/products.api";
import Header from "../components/major/Header";

const CatalogPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    title: "",
    category_id: "",
    price_start_min: "",
    price_start_max: "",
    brand: "",
  });

  const [currentPage, setCurrentPage] = useState(1); // состояние для текущей страницы
  const [totalItems, setTotalItems] = useState(0); // количество товаров (для пагинации)
  const [itemsPerPage, setItemsPerPage] = useState(10); // количество товаров на странице

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await ProductApi.getProducts(
        currentPage,
        itemsPerPage,
        filters
      );
      setProducts(data || []);
      setTotalItems(data.pagination?.totalItems || 0); // обновляем количество товаров
    } catch (err) {
      setError("Не удалось загрузить товары");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, filters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchProducts();
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > Math.ceil(totalItems / itemsPerPage)) return;
    setCurrentPage(page);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-100 min-h-screen">
      <Header />
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8 tracking-tight">
        <span className="block">Каталог</span> товаров
      </h1>
      <form
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6 bg-white rounded-xl shadow-lg" // Улучшенный вид формы
        onSubmit={handleSearch}
      >
        <input
          type="text"
          name="title"
          placeholder="Название товара..."
          value={filters.title}
          onChange={handleChange}
          className="col-span-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" // Улучшенные стили полей ввода
        />
        <input
          type="number"
          name="price_start_min"
          placeholder="Мин. цена..."
          value={filters.price_start_min}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        />
        <input
          type="number"
          name="price_start_max"
          placeholder="Макс. цена..."
          value={filters.price_start_max}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        />
        <input
          type="text"
          name="brand"
          placeholder="Бренд..."
          value={filters.brand}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        />
      </form>

      {loading && (
        <p className="text-center text-blue-600 text-lg mt-8">
          Загрузка товаров...
        </p>
      )}
      {error && (
        <p className="text-center text-red-600 text-lg mt-8">{error}</p>
      )}
      {!loading && !error && products.length === 0 && (
        <p className="text-center text-gray-600 text-lg mt-8">
          Товары не найдены по вашему запросу.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {" "}
        {products.map((product) => (
          <SmallCard
            key={product.id}
            title={product.title}
            description={product.description}
            imageUrl={product.image_url}
            imageUrlOnHover={product.image_url_on_hover}
            lowestPrice={product.buy_now_price || product.price_start}
          />
        ))}
      </div>

      {!loading && !error && products.length > 0 && (
        <div className="mt-12 flex justify-center items-center space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-full hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed font-semibold" // Улучшенные кнопки пагинации
          >
            ← Назад
          </button>
          <span className="px-4 py-2 text-lg font-bold text-gray-800">
            {currentPage}
          </span>{" "}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage * itemsPerPage >= totalItems}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-full hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            Вперед →
          </button>
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
