import Carousel from "./components/reusable/Carousel";
import Header from "./components/major/Header";
import MainAd from "./components/MainAd";
import PIC from "./assets/main-ad.png";
import api from "./api/products.api";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./api/AuthProvider";
import { Link } from "react-router-dom";
import ProductsList from "./components/items/ProductsList";

function App() {
  const [products, setProducts] = useState([]);
  const { isAuthenticated, logout } = useContext(AuthContext);

  useEffect(() => {
    api
      .getProducts()
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="w-7xl p-4 mx-auto">
        <Header />
        <MainAd url={PIC} />
        <div className="text-3xl font-bold">
          <p className="block w-fit mx-auto">Самые популярные позиции</p>
          <Carousel className="w-full" items={products} />
          <ProductsList products={products} />
        </div>
        <div>
          {isAuthenticated && ( // Only show if isAuthenticated is true
            <>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <Link to="/orders">Orders</Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          )}
          {!isAuthenticated && ( // Only show if isAuthenticated is false
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
