import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';

import TabRoutes from './TabRoutes';
import CategoryItemDescription from '../screens/CategoryItemDescription';
import RestaurantDetails from '../screens/RestaurantDetails';
import CategoryItemList from '../screens/CategoryItemList';
import ShoppingCart from '../screens/ShoppingCart';
import Checkout from '../screens/Checkout';
import Profile from '../screens/Profile';
import Configs from '../screens/Configs';
import Orders from '../screens/Orders';
import Map from '../screens/Map';
import CartButton from '../components/CartButton';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) => ({
        headerStyle: {
          backgroundColor: theme.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerRight: () =>
          route.name !== 'Carrinho' ? (
            <CartButton navigation={navigation} />
          ) : null,
      })}
    >
      <Stack.Screen
        name="Tabs"
        component={TabRoutes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detalhes do Produto"
        component={CategoryItemDescription}
      />
      <Stack.Screen
        name="Detalhes do Restaurante"
        component={RestaurantDetails}
      />
      <Stack.Screen name="Categoria" component={CategoryItemList} />
      <Stack.Screen name="Configurações" component={Configs} />
      <Stack.Screen name="Finalizar Pedido" component={Checkout} />
      <Stack.Screen name="Perfil" component={Profile} />
      <Stack.Screen name="Mapa de Restaurantes" component={Map} />
      <Stack.Screen name="Pedidos" component={Orders} />
      <Stack.Screen name="Carrinho" component={ShoppingCart} />
    </Stack.Navigator>
  );
}