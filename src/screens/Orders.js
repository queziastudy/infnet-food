import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useContext } from 'react';
import { ORDERS } from '../data/userOrders';
import { OrdersContext } from '../context/OrdersContext';
import { useTheme } from 'styled-components/native';

export default function Orders() {
  const theme = useTheme();
  const { orders: userNewOrders } = useContext(OrdersContext);
  const allOrders = [...userNewOrders, ...ORDERS];

  return (
    <View style={[styles.view, { backgroundColor: theme.background }]}>
      <FlatList
        data={allOrders}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            style={[
              styles.product_card,
              theme.box_shadow,
              { backgroundColor: theme.card },
            ]}>
            <Text style={[styles.product_id, { color: theme.text_gray }]}>
              Pedido #{item.id}
            </Text>

            <View style={[styles.product_header, { color: theme.text }]}>
              <Text style={[styles.product_restaurant, { color: theme.text }]}>
                {item.restaurant}
              </Text>
              <Text style={[styles.product_status, { color: theme.text }]}>
                {item.status}
              </Text>
            </View>

            <View
              style={[
                styles.items_list,
                {
                  borderTopColor: theme.border,
                  borderBottomColor: theme.border,
                },
              ]}>
              {item.items.map((product) => (
                <View key={product.id} style={styles.item_row}>
                  <Text
                    style={(styles.item_left, { color: theme.text_darkgray })}>
                    {product.quantidade}x {product.name}
                  </Text>

                  <Text style={[styles.item_right, { color: theme.text }]}>
                    R$ {(product.price * product.quantidade).toFixed(2)}
                  </Text>
                </View>
              ))}
            </View>

            <View style={[styles.product_footer, { color: theme.text }]}>
              <Text style={[styles.product_id, { color: theme.text_gray }]}>
                {new Date(item.date).toLocaleString('pt-BR')}
              </Text>
              <Text style={styles.price_red}>R$ {item.total.toFixed(2)}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 4,
  },
  product_card: {
    justifyContent: 'flex-start',
    width: '100%',
    marginVertical: 6,
    borderRadius: 10,
    padding: 12,
  },
  product_id: {
    fontSize: 12,
  },
  product_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  product_restaurant: {
    fontWeight: '600',
  },
  product_status: {
    fontSize: 10,
    backgroundColor: '#eee',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  items_list: {
    marginVertical: 8,
    paddingVertical: 10,
    gap: 4,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  item_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item_right: {
    fontWeight: '600',
  },
  product_footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price_red: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EA1D2C',
  },
});
