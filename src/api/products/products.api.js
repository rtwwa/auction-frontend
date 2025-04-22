import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/products";

async function getProducts(page = 1, limit = 10) {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: {
        page: page,
        limit: limit,
      },
    });
    console.log(response.data.products);
    return response.data; // Данные будут включать массив товаров и объект pagination
  } catch (error) {
    console.error("Ошибка при получении списка товаров:", error);
    throw error;
  }
}

// Функция для обработки клика на кнопку "Следующая страница"
function handleNextPage(currentPage, itemsPerPage, totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (currentPage < totalPages) {
    getProducts(currentPage + 1, itemsPerPage)
      .then((data) => {
        console.log("Следующая страница:", data.products);
        console.log("Пагинация:", data.pagination);
        // Обновите состояние вашего приложения новыми товарами и информацией о пагинации
      })
      .catch((error) => {
        // Обработка ошибки
      });
  } else {
    console.log("Это последняя страница.");
  }
}

// Функция для обработки клика на номер страницы
function handlePageClick(pageNumber, itemsPerPage) {
  getProducts(pageNumber, itemsPerPage)
    .then((data) => {
      console.log(`Страница ${pageNumber}:`, data.products);
      console.log("Пагинация:", data.pagination);
      // Обновите состояние вашего приложения новыми товарами и информацией о пагинации
    })
    .catch((error) => {
      // Обработка ошибки
    });
}

export default { getProducts, handleNextPage, handlePageClick };
