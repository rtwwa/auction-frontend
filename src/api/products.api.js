import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const API_BASE_URL = `${apiUrl}/api/products`;

class ProductApi {
  static async getProducts(page = 1, limit = 10, filters = {}) {
    try {
      const params = { page, limit };

      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          params[key] = filters[key];
        }
      });

      const url =
        Object.keys(filters).length === 0
          ? API_BASE_URL
          : `${API_BASE_URL}/search`;

      // Отправляем запрос с параметрами
      const response = await axios.get(url, { params });

      console.log(filters); // Для отладки
      console.log(response.data); // Для отладки

      // Возвращаем данные из ответа
      return response.data;
    } catch (error) {
      console.error("Ошибка при получении списка товаров:", error);
      throw error;
    }
  }

  static async getProductById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Ошибка при получении товара:", error);
      throw error;
    }
  }

  static async handleNextPage(currentPage, itemsPerPage, totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (currentPage < totalPages) {
      try {
        const data = await this.getProducts(currentPage + 1, itemsPerPage);
        console.log("Следующая страница:", data.products);
        console.log("Пагинация:", data.pagination);
        return data;
      } catch (error) {
        console.error("Ошибка при переходе на следующую страницу:", error);
        throw error;
      }
    } else {
      console.log("Это последняя страница.");
      return null;
    }
  }

  static async handlePageClick(pageNumber, itemsPerPage) {
    try {
      const data = await this.getProducts(pageNumber, itemsPerPage);
      console.log(`Страница ${pageNumber}:`, data.products);
      console.log("Пагинация:", data.pagination);
      return data;
    } catch (error) {
      console.error("Ошибка при выборе страницы:", error);
      throw error;
    }
  }
}

export default ProductApi;
