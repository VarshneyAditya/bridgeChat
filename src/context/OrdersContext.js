import React, { createContext, useContext, useState } from 'react';

const OrdersContext = createContext();

export function useOrders() {
  return useContext(OrdersContext);
}

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState({}); // Stores orders and their chats

  const addOrder = (orderId, message) => {
    setOrders(prev => ({
      ...prev,
      [orderId]: prev[orderId] ? [...prev[orderId], message] : [message]
    }));
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};
