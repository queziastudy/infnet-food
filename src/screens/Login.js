import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from 'styled-components/native';

export default function Login() {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const theme = useTheme();

  const { login } = useContext(AuthContext);

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  async function handleLogin() {
    let isValid = true;

    setEmailError('');
    setPasswordError('');

    if (!isValidEmail(email)) {
      setEmailError('E-mail inválido.');
    }

    if (!password.trim()) {
      setPasswordError('Preencha a senha');
      isValid = false;
    }

    if (!isValid) return;

    const success = await login(email, password);

    if (!success) {
      setEmailError('E-mail ou senha inválidos');
      setPasswordError('E-mail ou senha inválidos');
    }
  }

  return (
    <View style={styles.view}>
      <Text style={styles.title}>InfnetFoot</Text>
      <View style={styles.login_form}>
        <View style={styles.div_input}>
          <Text style={styles.label}>E-mail</Text>
          <View>
            <TextInput
            placeholder='exemplo@email.com'
            placeholderTextColor='#ccc'
              style={[styles.input, { borderColor: theme.border }]}
              onChangeText={(text) => {
                onChangeEmail(text);
                setEmailError('');
              }}
              value={email}
            />
            {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
          </View>
        </View>

        <View style={styles.div_input}>
          <Text style={styles.label}>Senha</Text>
          <View>
            <TextInput
              style={[styles.input, { borderColor: theme.border }]}
              onChangeText={(password) => {
                onChangePassword(password);
                setPasswordError('');
              }}
              value={password}
            />
            {passwordError ? (
              <Text style={styles.error}>{passwordError}</Text>
            ) : null}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: theme.primary }]}
          onPress={() => handleLogin()}>
          <Text style={styles.btn_text}>Entrar</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.credentials}>E-mail: joao@gmail.com</Text>
        <Text style={styles.credentials}>Senha: 123</Text>
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
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 16,
    color: '#fff',
  },
  login_form: {
    padding: 16,
    margin: 4,
    gap: 10,
    borderRadius: 10,
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  div_input: {
    gap: 6,
  },
  label: {
    fontSize: 12,
  },
  input: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
  },
  btn: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
  },
  btn_text: {
    fontWeight: 'bold',
    color: '#fff',
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
  credentials: {
    color: '#eee',
    textAlign: 'center',
    fontSize: 12,
  },
});
