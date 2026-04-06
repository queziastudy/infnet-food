import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RESTAURANTS } from '../data/restaurants';
import { useTheme } from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

export default function Map() {
  const navigation = useNavigation();
  const theme = useTheme();
  const map_pin_image = require('../../assets/images/map_pin.png');

  function handleOpenDetails(restaurant) {
    navigation.navigate('Detalhes do Restaurante', { restaurant });
  }

  return (
    <ScrollView
      style={[styles.view, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.scroll_content}
      showsVerticalScrollIndicator={false}>
      <View style={[styles.map_container, theme.box_shadow]}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -12.4186,
            longitude: -41.7702,
            latitudeDelta: 0.012,
            longitudeDelta: 0.012,
          }}
          showsCompass={false}
          showsUserLocation={false}>
          {RESTAURANTS.map((restaurant) => (
            <Marker
              key={restaurant.id}
              coordinate={{
                latitude: restaurant.latitude,
                longitude: restaurant.longitude,
              }}
              title={restaurant.name}
              description={restaurant.address}
              anchor={{ x: 0.5, y: 1 }}
              onPress={() => handleOpenDetails(restaurant)}>
              <Image
                source={map_pin_image}
                style={styles.map_pin_image}
              />
            </Marker>
          ))}
        </MapView>
      </View>

      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.title, { color: theme.text }]}>
          Restaurantes na Região
        </Text>

        {RESTAURANTS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.card,
              theme.box_shadow,
              { backgroundColor: theme.card },
            ]}
            onPress={() => handleOpenDetails(item)}
            activeOpacity={0.8}>
            <Image source={{ uri: item.image }} style={styles.img} />

            <View style={styles.card_column}>
              <Text style={[styles.name, { color: theme.text }]}>
                {item.name}
              </Text>

              <Text style={[styles.address, { color: theme.text_gray }]}>
                {item.address}
              </Text>

              <View style={styles.bottom}>
                <MaterialCommunityIcons name="star" size={14} color="gold" />
                <Text style={styles.rating_text}>{item.rating}</Text>
                <Text
                  style={[styles.delivery_time, { color: theme.text_gray }]}>
                  {item.deliveryTime}
                </Text>
              </View>
            </View>

            <Text style={styles.icon}>
              <MaterialCommunityIcons name="map-marker-outline" size={16} /> Ver
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  scroll_content: {
    paddingBottom: 20,
  },
  map_container: {
    height: 300,
    overflow: 'hidden',
    marginBottom: 8,
    borderRadius: 12,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  map_pin_image: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  title: {
    fontWeight: '600',
    marginVertical: 10,
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
  img: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  card_column: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  name: {
    fontWeight: '600',
    marginBottom: 4,
  },
  address: {
    fontSize: 12,
    marginBottom: 4,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating_text: {
    color: 'gold',
    fontSize: 12,
    marginLeft: 4,
  },
  delivery_time: {
    fontSize: 12,
    marginLeft: 8,
  },
  icon: {
    color: '#EA1D2C',
    fontSize: 12,
  },
});