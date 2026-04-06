import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AuthRoutes from './AuthRoutes';
import AppRoutes from './AppRoutes';

export default function Routes() {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <AppRoutes /> : <AuthRoutes/>
}