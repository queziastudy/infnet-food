import { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const OrdersContext = createContext();

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const storedOrders = await AsyncStorage.getItem('orders');

      if (storedOrders) {
        const parsedOrders = JSON.parse(storedOrders);
        setOrders(parsedOrders);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.log('Erro ao carregar pedidos:', error);
      setOrders([]);
    }
  }

  async function addOrder(order) {
    try {
      const updatedOrders = [order, ...orders];
      setOrders(updatedOrders);
      await AsyncStorage.setItem('orders', JSON.stringify(updatedOrders));
    } catch (error) {
      console.log('Erro ao salvar pedido:', error);
    }
  }

  return (
    <OrdersContext.Provider value={{ orders, addOrder, loadOrders }}>
      {children}
    </OrdersContext.Provider>
  );
}