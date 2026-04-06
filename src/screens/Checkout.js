import { useContext, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { CartContext } from '../context/CartContext';
import { OrdersContext } from '../context/OrdersContext';
import { PAYMENT_METHODS } from '../data/paymentMethods';
import { USER } from '../data/user';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import Toast from 'react-native-toast-message';
import { scheduleOrderNotifications } from '../services/notifications';

export default function Checkout() {
  const theme = useTheme();
  const navigation = useNavigation();
  const { cart, clearCart } = useContext(CartContext);
  const { addOrder } = useContext(OrdersContext);

  const restaurant = cart[0]?.restaurant || '';
  const [address, setAddress] = useState(USER.address);
  const [paymentMethod, setPaymentMethod] = useState(USER.preferential_payment);
  const [adressError, setAdressError] = useState('');
  const [paymentError, setPaymentError] = useState('');

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantidade,
    0
  );

  function getPaymentIcon(method) {
    if (method.includes('Cartão')) return 'credit-card-outline';
    if (method === 'Pix') return 'wallet-outline';
    if (method === 'Dinheiro') return 'cash';
    return 'circle-outline';
  }

  async function handleFinishOrder() {
    if (cart.length === 0) {
      Alert.alert(
        'Carrinho vazio',
        'Adicione itens antes de finalizar o pedido.'
      );
      return false;
    }

    if (!address.trim()) {
      setAdressError('Preencha o endereço!');
      return false;
    }

    if (!paymentMethod) {
      setPaymentError('Selecione uma forma de pagamento!');
      return false;
    }

    const newOrder = {
      id: (
        Date.now().toString().slice(-3) + Math.floor(Math.random() * 100)
      ).toString(),
      restaurant,
      items: cart,
      address,
      paymentMethod,
      total,
      status: 'Em Preparação',
      date: new Date().toISOString(),
    };

    addOrder(newOrder);
    clearCart();

    await scheduleOrderNotifications(newOrder.id, restaurant);

    return true;
  }

  return (
    <ScrollView
      style={[styles.view, { backgroundColor: theme.background }]}
      showsVerticalScrollIndicator={false}>
      <View
        style={[
          styles.card,
          theme.box_shadow,
          { backgroundColor: theme.card },
        ]}>
        <View style={styles.card_title}>
          <MaterialCommunityIcons
            name="map-marker-outline"
            size={18}
            color={theme.primary}
          />
          <Text style={[styles.card_text, { color: theme.text }]}>
            Endereço de Entrega
          </Text>
        </View>

        <TextInput
          style={[styles.input, { color: theme.text_darkgray }]}
          placeholder="Digite seu endereço"
          placeholderTextColor={theme.text_darkgray}
          value={address}
          onChangeText={(text) => {
            setAddress(text);
            setAdressError('');
          }}
        />
        {adressError ? (
          <Text style={{ color: 'red' }}>{adressError}</Text>
        ) : null}
      </View>

      <View
        style={[
          styles.card,
          theme.box_shadow,
          { backgroundColor: theme.card },
        ]}>
        <View style={[styles.card_title, { color: theme.text }]}>
          <MaterialCommunityIcons
            name="credit-card-outline"
            size={18}
            color={theme.primary}
          />
          <Text style={[styles.card_text, { color: theme.text }]}>
            Método de Pagamento
          </Text>
        </View>

        {PAYMENT_METHODS.map((method) => {
          const isSelected = paymentMethod === method;

          return (
            <TouchableOpacity
              key={method}
              onPress={() => {
                setPaymentMethod(method);
                setPaymentError('');
              }}
              style={[
                styles.payment_option,
                isSelected && styles.payment_option_selected,
              ]}>
              <MaterialCommunityIcons
                name={isSelected ? 'radiobox-marked' : 'radiobox-blank'}
                size={18}
                color={isSelected ? theme.primary : theme.text_darkgray}
              />

              <MaterialCommunityIcons
                name={getPaymentIcon(method)}
                size={18}
                color={isSelected ? theme.primary : theme.text_darkgray}
              />

              <Text
                style={[
                  styles.payment_text,
                  isSelected && styles.payment_text_selected,
                  { color: theme.text },
                ]}>
                {method}
              </Text>
            </TouchableOpacity>
          );
        })}

        {paymentError ? (
          <Text style={{ color: 'red' }}>{paymentError}</Text>
        ) : null}
      </View>

      <View
        style={[
          styles.summary_card,
          theme.box_shadow,
          { backgroundColor: theme.card },
        ]}>
        <Text style={[styles.summary_title, { color: theme.text }]}>
          Resumo do Pedido
        </Text>

        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.text_gray }]}>
            Subtotal
          </Text>
          <Text style={[styles.value, { color: theme.text_gray }]}>
            R$ {total.toFixed(2)}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.text_gray }]}>
            Taxa de entrega
          </Text>
          <Text style={[styles.value, { color: theme.text_gray }]}>
            R$ 5.99
          </Text>
        </View>

        <View style={styles.line} />

        <View style={styles.row}>
          <Text style={[styles.total_label, { color: theme.text }]}>Total</Text>
          <Text style={styles.total_value}>R$ {(total + 5.99).toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.btn_finalizar}
        onPress={() => {
          const success = handleFinishOrder();

          if (!success) return;

          Toast.show({
            type: 'success',
            text1: 'Pedido realizado!',
            text2: 'Redirecionando...',
            position: 'top',
            visibilityTime: 2000,
          });

          setTimeout(() => {
            navigation.navigate('Tabs', { screen: 'Pedidos' });
          }, 2000);
        }}>
        <MaterialCommunityIcons
          name="check-circle-outline"
          size={20}
          color="#fff"
        />
        <Text style={styles.btn_text}>Confirmar Pedido</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 16,
    gap: 10,
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
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  card_text: {
    fontWeight: '600',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    paddingHorizontal: 10,
  },
  payment_option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 8,
    borderRadius: 8,
  },
  payment_option_selected: {
    borderWidth: 1,
    borderColor: '#EA1D2C',
    backgroundColor: '#EA1D2C33',
  },
  payment_text_selected: {
    fontWeight: '500',
  },
  summary_card: {
    marginVertical: 10,
    padding: 16,
    borderRadius: 12,
  },
  summary_title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 14,
    color: '#555',
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
  line: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 8,
  },
  total_label: {
    fontSize: 16,
    fontWeight: '600',
  },
  total_value: {
    fontSize: 16,
    fontWeight: '700',
    color: '#EA1D2C',
  },
  btn_finalizar: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 8,
    padding: 10,
    backgroundColor: '#EA1D2C',
    borderRadius: 8,
  },
  btn_text: {
    color: '#FFF',
    fontWeight: '500',
  },
});
