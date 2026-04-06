import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function setupNotifications() {
  const { status: existingStatus } =
    await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('Permissão de notificação negada');
    return false;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('orders', {
      name: 'Pedidos',
      importance: Notifications.AndroidImportance.MAX,
      sound: 'default',
    });
  }

  return true;
}

export async function scheduleOrderNotifications(orderId, restaurant) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Pedido em preparação',
      body: `Seu pedido de ${restaurant || 'restaurante'} está em preparação.`,
      data: { orderId, status: 'Em Preparação' },
      sound: true,
    },
    trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: 5 },
  });

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Pedido saiu para entrega',
      body: 'Seu pedido está a caminho.',
      data: { orderId, status: 'Saiu para entrega' },
      sound: true,
    },
    trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: 15 },
  });

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Pedido entregue',
      body: 'Seu pedido foi entregue com sucesso.',
      data: { orderId, status: 'Entregue' },
      sound: true,
    },
    trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: 30 },
  });
}