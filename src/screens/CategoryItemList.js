import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { PRODUCTS } from '../data/products';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

export default function CategoryItemList({ route }) {
  const { categoryKey } = route.params;
  const navigation = useNavigation();
  const theme = useTheme();

  const category = PRODUCTS.find((item) => item.key === categoryKey);

  return (
    <View style={[styles.view, { backgroundColor: theme.background }]}>
      <FlatList
        data={category.items}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={[styles.category_card, theme.box_shadow]}>
              <View style={styles.category_img_container}>
                <Image
                  style={styles.category_img}
                  source={{ uri: category.img }}
                />
                <Text
                  style={[
                    styles.category_card_title,
                    { color: theme.secondary },
                  ]}>
                  {category.title}
                </Text>
              </View>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.product_card,
              theme.box_shadow,
              { backgroundColor: theme.card },
            ]}
            onPress={() =>
              navigation.navigate('Detalhes do Produto', { product: item })
            }>
            <Image source={{ uri: item.image }} style={styles.product_img} />

            <View style={styles.card_info}>
              <Text style={[styles.card_info_title, { color: theme.text }]}>
                {item.name}
              </Text>
              <Text style={[styles.card_info_text, { color: theme.text_gray }]}>
                {item.description.length > 30
                  ? item.description.slice(0, 30) + '...'
                  : item.description}
              </Text>
              <Text style={styles.card_info_price}>
                R$ {item.price.toFixed(2)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 16,
    gap: 18,
  },
  category_card: {
    width: '100%',
    height: 130,
    borderRadius: 8,
    marginVertical: 10,
  },
  category_card_title: {
    position: 'absolute',
    bottom: 20,
    left: 8,
    fontSize: 20,
    fontWeight: '600',
  },
  category_img_container: {
    position: 'relative',
  },
  category_img: {
    width: '100%',
    height: 130,
    borderRadius: 8,
  },
  product_card: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 6,
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  product_img: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  card_info: {
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  card_info_title: {
    fontWeight: '600',
    fontSize: 16,
  },
  card_info_text: {
    fontSize: 12,
    flexWrap: 'wrap',
  },
  card_info_price: {
    color: '#EA1D2C',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
