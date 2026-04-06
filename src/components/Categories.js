import {
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import { CATEGORIES } from '../data/categories';

export default function Categories() {
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <View>
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.circle_card}
            onPress={() =>
              navigation.navigate('Categoria', { categoryKey: item.key })
            }>
            <Image
              style={[styles.img, { borderColor: theme.border }]}
              source={{ uri: item.img }}
            />
            <Text style={[styles.text, { color: theme.text }]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        horizontal={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  circle_card: {
    marginTop: 4,
    marginBottom: 8,
    marginHorizontal: 6,
    borderRadius: 30,
    alignItems: 'center',
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 35,
    objectFit: 'cover',
    borderWidth: 2,
  },
  text: {
    marginTop: 4,
    fontSize: 12,
  },
});
