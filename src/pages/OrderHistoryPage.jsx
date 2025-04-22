import React from "react";

const OrderHistoryPage = ({ orders = [] }) => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">История заказов</h1>
      {orders.length === 0 ? (
        <p className="text-gray-500">У вас пока нет заказов.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-md p-4">
              <h2 className="text-lg font-medium text-gray-800 mb-2">
                Заказ №{order.id}
              </h2>
              <p className="text-sm text-gray-500 mb-1">
                Дата оформления:{" "}
                {new Date(order.created_at).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Статус: <span className="font-semibold">{order.status}</span>
              </p>
              <h3 className="text-md font-semibold text-gray-700 mb-1">
                Состав заказа:
              </h3>
              <ul>
                {order.items.map((item) => (
                  <li key={item.product_id} className="text-sm text-gray-600">
                    {item.name} × {item.quantity} - {item.price * item.quantity}
                    ₽
                  </li>
                ))}
              </ul>
              <p className="text-md font-semibold text-gray-800 mt-2">
                Итоговая сумма: {order.total_amount.toLocaleString("ru-RU")}₽
              </p>
              {order.shipping_address && (
                <div>
                  <h3 className="text-md font-semibold text-gray-700 mt-2">
                    Адрес доставки:
                  </h3>
                  <p className="text-sm text-gray-600">
                    {order.shipping_address.street},{" "}
                    {order.shipping_address.city},{" "}
                    {order.shipping_address.zipCode}
                  </p>
                </div>
              )}
              {order.payment_method && (
                <p className="text-sm text-gray-500 mt-1">
                  Способ оплаты: {order.payment_method}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
