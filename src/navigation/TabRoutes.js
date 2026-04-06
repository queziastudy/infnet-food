import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Orders from '../screens/Orders';
import Map from '../screens/Map';
import CartButton from '../components/CartButton';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerStyle: {
          backgroundColor: theme.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '600',
        },

        headerRight: () => <CartButton navigation={navigation} />,

        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === 'Início') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Mapa') {
            iconName = focused ? 'map-marker' : 'map-marker-outline';
          } else if (route.name === 'Pedidos') {
            iconName = focused ? 'shopping' : 'shopping-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'account' : 'account-outline';
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },

        tabBarActiveTintColor: '#EA1D2C',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Início" component={Home} />
      <Tab.Screen name="Mapa" component={Map} />
      <Tab.Screen name="Pedidos" component={Orders} />
      <Tab.Screen name="Perfil" component={Profile} />
    </Tab.Navigator>
  );
}