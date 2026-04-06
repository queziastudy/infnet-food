import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import Toast from 'react-native-toast-message';

export default function CategoryItemDescription({ route }) {
  const { product } = route.params;
  const { addToCart } = useContext(CartContext);
  const navigation = useNavigation();
  const [quantidade, setQuantidade] = useState(1);
  const theme = useTheme();

  function adicionar() {
    setQuantidade(quantidade + 1);
  }

  function remover() {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  }

  const valorTotal = quantidade * product.price;

  return (
    <>
      <View style={[styles.view, { backgroundColor: theme.background }]}>
        <Image source={{ uri: product.image }} style={styles.img} />

        <View style={styles.infos}>
          <Text style={[styles.title, { color: theme.text }]}>
            {product.name}
          </Text>

          <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
          <Text style={[styles.description, { color: theme.text }]}>
            {product.description}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.counter}>
          <TouchableOpacity
            style={styles.counter_bnt}
            onPress={() => remover()}>
            <Text style={styles.counter_bnt_text}>-</Text>
          </TouchableOpacity>
          <Text style={[styles.counter_text, { color: theme.text }]}>
            {quantidade}
          </Text>
          <TouchableOpacity
            style={styles.counter_bnt}
            onPress={() => adicionar()}>
            <Text style={styles.counter_bnt_text}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.add_button}
          onPress={() => {
            addToCart(product, quantidade);
            Toast.show({
              type: 'success',
              text1: 'Adicionado ao carrinho',
              text2: `${product.name} x${quantidade}`,
              position: 'top',
              visibilityTime: 2000,
              onPress: () => navigation.navigate("Carrinho"),
            });
          }}>
          <Text style={styles.add_btn_text}>Adicionar</Text>
          <Text style={styles.add_btn_text}>R${valorTotal.toFixed(2)}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 16,
    gap: 10,
  },
  img: {
    width: '100%',
    height: 180,
    borderRadius: 8,
  },
  infos: {
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: '#EA1D2C',
  },
  footer: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'row',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 2,
    borderTopColor: '#ddd',
  },
  counter: {
    flexDirection: 'row',
    width: '40%',
    gap: 10,
    alignItems: 'center',
  },
  counter_bnt: {
    paddingHorizontal: 10,
  },
  counter_text: {
    fontSize: 16,
  },
  counter_bnt_text: {
    fontSize: 22,
    color: '#EA1D2C',
    fontWeight: 'bold',
  },
  add_button: {
    backgroundColor: '#EA1D2C',
    width: '60%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 14,
    borderRadius: 30,
  },
  add_btn_text: {
    color: '#FFF',
  },
});
