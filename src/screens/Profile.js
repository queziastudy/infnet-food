import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { USER } from '../data/user';
import { AuthContext } from '../context/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { useTheme } from 'styled-components/native';

export default function Profile() {
  const { logout } = useContext(AuthContext);
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <View style={[styles.view, { backgroundColor: theme.background }]}>
      <View
        style={[
          styles.card,
          theme.box_shadow,
          { backgroundColor: theme.card },
        ]}>
        <View style={styles.profile_img}>
          <MaterialCommunityIcons
            name="account-outline"
            size={28}
            color="#FFF"
          />
        </View>
        <View style={styles.user}>
          <Text style={[styles.username, {color: theme.text}]}>{USER.name}</Text>

          <View style={styles.email_container}>
            <MaterialCommunityIcons
              name="email-outline"
              size={14}
              color={theme.text_gray}
            />
            <Text style={[styles.email, { color: theme.text_gray }]}>
              {USER.email}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={[
          styles.card,
          styles.card_column,
          theme.box_shadow,
          { backgroundColor: theme.card },
        ]}>
        <TouchableOpacity
          style={styles.actions}
          onPress={() => navigation.navigate('Pedidos')}>
          <View style={styles.actions_actions_left}>
            <View style={styles.actions_circle}>
              <MaterialCommunityIcons
                name="shopping-outline"
                size={16}
                color="#EA1D2C"
              />
            </View>
            <Text style={[styles.actions_text, { color: theme.text }]}>
              {' '}
              Meus Pedidos{' '}
            </Text>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={16}
            color={theme.text_gray}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actions,
            styles.upline,
            { borderTopColor: theme.border },
          ]}
          onPress={() => navigation.navigate('Configurações')}>
          <View style={styles.actions_actions_left}>
            <View style={styles.actions_circle}>
              <MaterialCommunityIcons
                name="cog-outline"
                size={18}
                color="#EA1D2C"
              />
            </View>
            <Text style={[styles.actions_text, { color: theme.text }]}>
              Configurações
            </Text>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={18}
            color={theme.text_gray}
          />
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.card,
          styles.logout,
          theme.box_shadow,
          { backgroundColor: theme.card },
        ]}>
        <TouchableOpacity onPress={() => logout()}>
          <View style={styles.logout}>
            <MaterialCommunityIcons
              name="logout"
              size={16}
              color={theme.primary}
            />
            <Text style={[styles.logout_text, { color: theme.primary }]}> Logout </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 16,
    gap: 6,
    backgroundColor: '#EA1D2C',
  },
  card: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 6,
    borderRadius: 10,
    flexDirection: 'row',
    padding: 12,
  },
  profile_img: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    backgroundColor: '#EA1D2C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
  },
  email_container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  actions: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actions_actions_left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actions_text: {
    fontWeight: '600',
  },
  actions_circle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#EA1D2C33',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card_column: {
    flexDirection: 'column',
    gap: 16,
  },
  upline: {
    width: '100%',
    borderTopWidth: 1,
    paddingTop: 16,
  },
  logout: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logout_text: {
    fontWeight: '600',
  },
});
