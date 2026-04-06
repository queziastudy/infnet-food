import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import Toast from 'react-native-toast-message';
import { setupNotifications } from './src/services/notifications';

import {
  ThemeProvider as ThemeContextProvider,
  ThemeContext,
} from './src/context/ThemeContext';
import { OrdersProvider } from './src/context/OrdersContext';
import { AuthProvider } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import { useEffect } from 'react';
import { lightTheme, darkTheme } from './src/theme/theme';
import Routes from './src/navigation';

function AppContent() {
  const { darkMode } = useContext(ThemeContext);
  const theme = darkMode ? darkTheme : lightTheme;

  useEffect(() => {
    setupNotifications();
  }, []);
  
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Routes />
        <Toast />
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeContextProvider>
        <CartProvider>
          <OrdersProvider>
            <AppContent />
          </OrdersProvider>
        </CartProvider>
      </ThemeContextProvider>
    </AuthProvider>
  );
}
