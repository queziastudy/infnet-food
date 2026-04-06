import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Categories from '../components/Categories';
import { useEffect, useState } from 'react';
import { RESTAURANTS } from '../data/restaurants';
import { useTheme } from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const [topRestaurants, setTopRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const theme = useTheme();

  function handleOpenDetails(restaurant) {
    navigation.navigate('Detalhes do Restaurante', { restaurant });
  }

  async function loadTopRestaurants() {
    try {
      const top5 = [...RESTAURANTS]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);

      const result = [];

      for (let i = 0; i < top5.length; i++) {
        const restaurant = top5[i];

        const category = restaurant.api_tag;

        const response = await fetch(
          `https://foodish-api.com/api/images/${category}`
        );

        const data = await response.json();

        result.push({
          ...restaurant,
          imageUrl: data.image || restaurant.image,
        });
      }

      setTopRestaurants(result);
    } catch (error) {
      console.log('Erro ao carregar imagens:', error);

      const fallback = [...RESTAURANTS]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);

      setTopRestaurants(fallback);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTopRestaurants();
  }, []);

  return (
    <View style={[styles.view, { backgroundColor: theme.background }]}>
      {loading ? (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      ) : (
        <FlatList
          data={topRestaurants}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <View>
                <Text style={[styles.title, { color: theme.text }]}>
                  Categorias
                </Text>

                <Categories />
              </View>

              <Text style={[styles.title, { color: theme.text }]}>
                Restaurantes mais bem avaliados
              </Text>
            </>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.card,
                theme.box_shadow,
                { backgroundColor: theme.card },
              ]}
              onPress={() => handleOpenDetails(item)}>
              <Image
                source={{ uri: item.imageUrl || item.image }}
                style={styles.image}
              />

              <View
                style={[
                  styles.rating,
                  { color: theme.text, backgroundColor: theme.card },
                ]}>
                <MaterialCommunityIcons name="star" size={14} color="gold" />
                <Text style={[styles.rating_text, { color: theme.text }]}>{item.rating}</Text>
              </View>

              <View style={styles.card_footer}>
                <Text style={[styles.card_footer_title, { color: theme.text }]}>
                  {item.name}
                </Text>

                <Text
                  style={[styles.card_footer_text, { color: theme.text_gray }]}>
                  {item.description}
                </Text>

                <Text
                  style={[styles.card_footer_text, { color: theme.text_gray }]}>
                  {item.deliveryTime}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    gap: 18,
  },
  activity: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    marginRight: 6,
    marginVertical: 8,
    borderRadius: 10,
    position: 'relative',
  },
  rating: {
    flexDirection: 'row',
    position: 'absolute',
    top: 4,
    right: 4,
    borderRadius: 40,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 12,
    fontWeight: 'bold',
    gap: 4,
    alignItems: 'center',
  },
  rating_text: {
    fontSize: 12,
  },
  card_footer: {
    gap: 4,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  card_footer_title: {
    fontWeight: 'bold',
  },
  card_footer_text: {
    fontSize: 12,
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 10,
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 130,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});
