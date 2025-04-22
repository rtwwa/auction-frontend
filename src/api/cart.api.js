import axios from "axios";
axios.defaults.withCredentials = true;

const CART_API_BASE_URL = "http://localhost:3000/api/cart"; // Базовый URL для API корзины

const CartApi = {
  /**
   * Получить содержимое корзины пользователя.
   * Требуется авторизация (токен передается автоматически, если настроен axios с withCredentials или interceptors).
   * @returns {Promise<Array>} Массив элементов корзины.
   */
  getCart: async () => {
    try {
      const response = await axios.get(CART_API_BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Ошибка при получении корзины:", error);
      throw error;
    }
  },

  /**
   * Добавить товар в корзину.
   * Требуется авторизация.
   * @param {number} productId ID товара, который нужно добавить.
   * @param {number} quantity Количество товара для добавления (по умолчанию 1).
   * @returns {Promise<Array>} Обновленный массив элементов корзины.
   */
  addItemToCart: async (productId, quantity = 1) => {
    try {
      const response = await axios.post(`${CART_API_BASE_URL}/items`, {
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
   * Обновить количество товара в корзине.
   * Требуется авторизация.
   * @param {number} itemId ID элемента корзины, который нужно обновить.
   * @param {number} quantity Новое количество товара.
   * @returns {Promise<Array>} Обновленный массив элементов корзины.
   */
  updateCartItemQuantity: async (itemId, quantity) => {
    try {
      const response = await axios.put(`${CART_API_BASE_URL}/items/${itemId}`, {
        quantity,
      });
      return response.data;
    } catch (error) {
      console.error(
        "Ошибка при обновлении количества товара в корзине:",
        error
      );
      throw error;
    }
  },

  /**
   * Удалить товар из корзины.
   * Требуется авторизация.
   * @param {number} itemId ID элемента корзины, который нужно удалить.
   * @returns {Promise<Array>} Обновленный массив элементов корзины.
   */
  removeItemFromCart: async (itemId) => {
    try {
      const response = await axios.delete(
        `${CART_API_BASE_URL}/items/${itemId}`
      );
      return response.data;
    } catch (error) {
      console.error("Ошибка при удалении товара из корзины:", error);
      throw error;
    }
  },

  /**
   * Очистить всю корзину пользователя.
   * Требуется авторизация.
   * @returns {Promise<void>}
   */
  clearCart: async () => {
    try {
      await axios.delete(CART_API_BASE_URL);
    } catch (error) {
      console.error("Ошибка при очистке корзины:", error);
      throw error;
    }
  },

  /**
   * Оформить заказ на основе содержимого корзины.
   * Требуется авторизация.
   * @param {object} shippingAddress Объект с адресом доставки.
   * @param {string} paymentMethod Способ оплаты.
   * @returns {Promise<object>} Информация о созданном заказе.
   */
  checkout: async (shippingAddress, paymentMethod) => {
    try {
      const response = await axios.post(`${CART_API_BASE_URL}/checkout`, {
        shippingAddress,
        paymentMethod,
      });
      return response.data;
    } catch (error) {
      console.error("Ошибка при оформлении заказа:", error);
      throw error;
    }
  },
};

export default CartApi;
