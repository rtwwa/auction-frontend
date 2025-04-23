import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./api/AuthProvider.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterForm from "./components/major/RegisterForm.jsx";
import LoginForm from "./components/major/LoginForm.jsx";
import CatalogPage from "./pages/CatalogPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<App />} />
        <Route path="/search" element={<CatalogPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
