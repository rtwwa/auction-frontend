import axios from "axios";
axios.defaults.withCredentials = true;

const apiUrl = import.meta.env.VITE_API_URL;
const CART_API_BASE_URL = `${apiUrl}/api/cart`;

const CartApi = {
  /**
   * Получить все товары в корзине пользователя
   */
  async getCart() {
    try {
      const response = await axios.get(CART_API_BASE_URL);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Ошибка при получении корзины:", error);
      throw error;
    }
  },

  /**
   * Добавить товар в корзину
   * @param {number} productId - ID товара
   * @param {number} quantity - Количество (по умолчанию 1)
   */
  async addItemToCart(productId, quantity = 1) {
    try {
      const response = await axios.post(CART_API_BASE_URL, {
        productId,
        quantity,
      });
      return response.data;
    } catch (error) {
      console.error("Ошибка при добавлении товара в корзину:", error);
      throw error;
    }
  },

  /**
   * Обновить количество товара в корзине
   * @param {number} productId - ID товара
   * @param {number} quantity - Новое количество
   */
  async updateCartItemQuantity(productId, quantity) {
    try {
      const response = await axios.put(CART_API_BASE_URL, {
        productId,
        quantity,
      });
      return response.data;
    } catch (error) {
      console.error("Ошибка при обновлении количества товара:", error);
      throw error;
    }
  },

  /**
   * Удалить товар из корзины
   * @param {number} productId - ID товара
   */
  async removeItemFromCart(productId) {
    try {
      const response = await axios.delete(`${CART_API_BASE_URL}/${productId}`);
      return response.data;
    } catch (error) {
      console.error("Ошибка при удалении товара из корзины:", error);
      throw error;
    }
  },
};

export default CartApi;
