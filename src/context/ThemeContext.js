import { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext({});

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);


  useEffect(() => {
    async function loadTheme() {
      const stored = await AsyncStorage.getItem('theme');

      if (stored !== null) {
        setDarkMode(JSON.parse(stored));
      }
    }
    loadTheme();
  }, []);


  useEffect(() => {
    AsyncStorage.setItem('theme', JSON.stringify(darkMode));
  }, [darkMode]);

  function toggleTheme() {
    setDarkMode(prev => !prev);
  }

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}