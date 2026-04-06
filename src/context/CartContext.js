import { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  //carrega o carrinho ao abrir
  useEffect(() => {
    async function loadCart() {
      try {
        const storedCart = await AsyncStorage.getItem('cart');

        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      } catch (error) {
        console.log('Erro ao carregar carrinho:', error);
      }
    }

    loadCart();
  }, []);

  //salva as alterações feitas
  useEffect(() => {
    async function saveCart() {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(cart));
      } catch (error) {
        console.log('Erro ao salvar carrinho:', error);
      }
    }

    saveCart();
  }, [cart]);

  function addToCart(product, quantidade) {
    setCart((prevCart) => {
      const itemExists = prevCart.find((item) => item.id === product.id);

      if (itemExists) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item
        );
      }

      return [...prevCart, { ...product, quantidade }];
    });
  }

  function updateQuantity(id, novaQuantidade) {
    if (novaQuantidade <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantidade: novaQuantidade } : item
      )
    );
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, clearCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}
