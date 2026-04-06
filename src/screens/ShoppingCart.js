import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';

export default function ShoppingCart() {
  const theme = useTheme();
  const navigation = useNavigation();
  const { cart, removeFromCart, updateQuantity, clearCart } =
    useContext(CartContext);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantidade,
    0
  );

  const entrega = 5.0;

  const total = subtotal + entrega;

  function adicionar(item) {
    updateQuantity(item.id, item.quantidade + 1);
  }

  function remover(item) {
    if (item.quantidade > 1) {
      updateQuantity(item.id, item.quantidade - 1);
    }
  }

  return (
    <>
      <View style={[styles.view, { backgroundColor: theme.background }]}>
        {cart.length > 0 ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            {cart.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.product_card,
                  theme.box_shadow,
                  { backgroundColor: theme.card },
                ]}>
                <View style={styles.product_card_item}>
                  <Image
                    style={styles.product_card_img}
                    source={{ uri: item.image }}
                  />
                  <View style={styles.product_card_column}>
                    <Text style={[styles.product_name, { color: theme.text }]}>
                      {item.name}
                    </Text>
                    <Text
                      style={[
                        styles.product_description,
                        { color: theme.text_gray },
                      ]}>
                      {item.description.length > 30
                        ? item.description.slice(0, 30) + '...'
                        : item.description}
                    </Text>
                    <Text style={styles.price_red}>
                      R$ {item.price.toFixed(2)}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.trash_icon}
                    onPress={() => {
                      removeFromCart(item.id);
                      Toast.show({
                        type: 'error',
                        text1: 'Removido do carrinho',
                        text2: `${item.name} x${item.quantidade}`,
                        position: 'top',
                        visibilityTime: 2000,
                      });
                    }}>
                    <Text>
                      <MaterialCommunityIcons
                        name="trash-can-outline"
                        size={18}
                        color={theme.text_gray}
                      />
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.product_footer}>
                  <View style={styles.product_footer_counter}>
                    <TouchableOpacity onPress={() => remover(item)}>
                      <Text style={styles.product_footer_action}>-</Text>
                    </TouchableOpacity>

                    <Text style={{ color: theme.text }}>{item.quantidade}</Text>

                    <TouchableOpacity onPress={() => adicionar(item)}>
                      <Text style={styles.product_footer_action}>+</Text>
                    </TouchableOpacity>
                  </View>

                  <Text
                    style={[
                      styles.product_footer_price,
                      { color: theme.text },
                    ]}>
                    R$ {(item.price * item.quantidade).toFixed(2)}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.empty_cart}>
            <MaterialCommunityIcons
              name="shopping-outline"
              size={60}
              color="#CCC"
            />
            <Text style={[styles.empty_title, { color: theme.text }]}>
              Seu carrinho está vazio
            </Text>
            <Text style={[styles.empty_text, { color: theme.text_gray }]}>
              Adicione produtos para começar um pedido
            </Text>
          </View>
        )}
      </View>

      {cart.length > 0 && (
        <>
          <View style={[styles.price_card, { backgroundColor: theme.card }]}>
            <View style={styles.price_space}>
              <Text style={[styles.price_text, { color: theme.text_gray }]}>
                Subtotal
              </Text>
              <Text style={[styles.price_text, { color: theme.text_gray }]}>
                R$ {subtotal.toFixed(2)}
              </Text>
            </View>

            <View style={styles.price_space}>
              <Text style={[styles.price_text, { color: theme.text_gray }]}>
                Taxa de entrega
              </Text>
              <Text style={[styles.price_text, { color: theme.text_gray }]}>
                R$ {entrega.toFixed(2)}
              </Text>
            </View>

            <View
              style={[
                styles.price_space,
                styles.upline,
                { borderTopColor: theme.border },
              ]}>
              <Text style={[styles.price_total, { color: theme.text }]}>
                Total
              </Text>
              <Text style={styles.price_red}>R$ {total.toFixed(2)}</Text>
            </View>
          </View>
          <View style={[styles.footer, { backgroundColor: theme.card }]}>
            <TouchableOpacity
              style={styles.btn_finalizar}
              onPress={() => navigation.navigate('Finalizar Pedido')}>
              <Text style={styles.btn_text}>Finalizar pedido</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clear_cart}>
              <MaterialCommunityIcons
                name="cart-off"
                size={14}
                color="#EA1D2C"
              />
              <Text style={styles.clear_cart_text} onPress={() => clearCart()}>
                Esvaziar o carrinho
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 16,
    gap: 6,
    backgroundColor: '#EA1D2C',
  },
  product_card: {
    justifyContent: 'flex-start',
    width: '100%',
    marginVertical: 6,
    borderRadius: 10,
    padding: 12,
  },
  product_card_item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  product_card_img: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  product_card_column: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
    gap: 4,
  },
  product_name: {
    fontSize: 16,
    fontWeight: '600',
  },
  product_description: {
    fontSize: 12,
  },
  product_footer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
  },
  product_footer_counter: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 4,
    paddingHorizontal: 12,
    width: 100,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: 'rgba(128, 128, 128, 0.15)',
  },
  product_footer_price: {
    fontWeight: '600',
  },
  price_space: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  product_footer_action: {
    color: '#EA1D2C',
    fontSize: 18,
    fontWeight: '600',
  },
  price_card: {
    marginTop: 8,
    borderRadius: 10,
    padding: 12,
    gap: 4,
  },
  price_text: {
    justifyContent: 'space-between',
  },
  price_total: {
    fontWeight: '600',
  },
  price_red: {
    fontWeight: 'bold',
    color: '#EA1D2C',
  },
  upline: {
    width: '100%',
    borderTopWidth: 1,
    paddingTop: 6,
    marginTop: 6,
  },
  btn_finalizar: {
    alignItems: 'center',
    margin: 16,
    marginBottom: 8,
    padding: 10,
    backgroundColor: '#EA1D2C',
    borderRadius: 8,
  },
  btn_text: {
    color: '#FFF',
    fontWeight: '500',
  },
  empty_cart: {
    marginVertical: 20,
    alignItems: 'center',
    gap: 6,
  },
  empty_title: {
    fontWeight: '600',
    fontSize: 16,
  },
  clear_cart: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    gap: 4,
  },
  clear_cart_text: {
    color: '#EA1D2C',
    fontSize: 12,
  },
});
