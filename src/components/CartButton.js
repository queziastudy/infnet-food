import { useContext } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CartContext } from '../context/CartContext';

export default function CartButton({ navigation }) {
  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce((total, item) => total + item.quantidade, 0);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Carrinho')}
      style={styles.container}>
      <MaterialCommunityIcons name="cart" size={24} color="#fff" />

      {totalItems > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badge_text}>{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 34,
    height: 34,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 4,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge_text: {
    color: '#EA1D2C',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
