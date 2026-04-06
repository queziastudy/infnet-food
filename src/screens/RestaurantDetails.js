import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { PRODUCTS } from '../data/products';

export default function RestaurantDetails({ route }) {
  const { restaurant } = route.params;
  const theme = useTheme();
  const navigation = useNavigation();

  const bestSellerProduct = PRODUCTS.flatMap((category) => category.items).find(
    (product) => product.id === restaurant.bestSellerProductId
  );

  return (
    <View style={[styles.view, { backgroundColor: theme.background }]}>
      <View style={styles.restaurant_info}>
        <Image style={styles.img} source={{ uri: restaurant.image }} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,1)']}
          style={styles.gradient}
        />

        <View style={styles.title}>
          <Text style={styles.name}>{restaurant.name}</Text>
          <Text style={styles.description}>{restaurant.description}</Text>
        </View>
      </View>

      <View
        style={[
          styles.content,
          theme.box_shadow,
          { backgroundColor: theme.card },
        ]}>
        <View style={styles.content_row}>
          <MaterialCommunityIcons name="star" size={16} color="gold" />
          <Text style={{ color: theme.text_gray }}>{restaurant.rating}</Text>
          <MaterialCommunityIcons
            name="clock-outline"
            size={14}
            color={theme.text_gray}
          />
          <Text style={{ color: theme.text_gray }}>
            {restaurant.deliveryTime}
          </Text>
        </View>
        <View style={styles.content_row}>
          <MaterialCommunityIcons
            name="map-marker-outline"
            size={14}
            color={theme.text_gray}
          />
          <Text style={{ color: theme.text_gray }}>{restaurant.address}</Text>
        </View>
      </View>

      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.subtitle, { color: theme.text }]}>
          Item mais vendido:
        </Text>

        {bestSellerProduct && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Detalhes do Produto', {
                product: bestSellerProduct,
              })
            }>
            <View style={[styles.card, { backgroundColor: theme.card }]}>
              <Image
                style={styles.card_img}
                source={{ uri: bestSellerProduct.image }}
              />

              <View style={styles.card_column}>
                <Text style={[styles.card_name, { color: theme.text }]}>
                  {bestSellerProduct.name}
                </Text>

                <Text
                  style={[styles.card_description, { color: theme.text_gray }]}>
                  {bestSellerProduct.description}
                </Text>

                <Text style={styles.card_price}>
                  R$ {bestSellerProduct.price.toFixed(2)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  restaurant_info: {
    position: 'relative',
  },
  img: {
    width: '100%',
    height: 200,
  },
  title: {
    gap: 4,
    left: 8,
    bottom: 16,
    position: 'absolute',
  },
  name: {
    color: '#fFf',
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    color: '#fFf',
  },
  container: {
    paddingHorizontal: 16,
  },
  content: {
    alignContent: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  content_row: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  subtitle: {
    fontWeight: 'bold',
    marginVertical: 6,
    fontSize: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
  card_img: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  card_column: {
    gap: 4,
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  card_name: {
    fontWeight: '600',
  },
  card_description: {
    fontSize: 12,
  },
  card_price: {
    color: '#EA1D2C',
    fontWeight: 'bold',
    fontSize: 15,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
  },
});
