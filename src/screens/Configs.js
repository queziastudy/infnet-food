import { StyleSheet, Text, View, Switch } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useTheme } from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Configs() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const theme = useTheme();
  return (
    <View style={[styles.view, { backgroundColor: theme.background }]}>
      <View>
        <View
          style={[
            styles.card,
            theme.box_shadow,
            { backgroundColor: theme.card },
          ]}>
          <View style={styles.card_title}>
            <View style={styles.card_content}>
              <MaterialCommunityIcons
                name="white-balance-sunny"
                size={18}
                color={theme.primary}
              />
              <Text style={[styles.card_content, { color: theme.text }]}>Tema Escuro</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#ccc', true: theme.primary }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 16,
    gap: 4,
  },
  card: {
    width: '100%',
    gap: 4,
    marginVertical: 6,
    borderRadius: 10,
    padding: 12,
  },
  card_title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  card_content: {
    flexDirection: 'row',
    gap: 8,
  },
  card_text: {
    
    fontWeight: '700',
    fontSize: 16,
  }
});
