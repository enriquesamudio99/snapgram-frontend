import { AxiosResponse } from 'axios';
import { useUserContext } from '../context/AuthContext';
import { api } from '../api';

interface AuthResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    name: string;
    username: string;
    email: string;
    bio: string;
  };
}

interface LoginProps {
  email: string;
  password: string;
}

interface RegisterProps {
  firstName: string;
  lastName: string;
  username: string;
  bio: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const useAuth = () => {

  const { user, status, checking, login, logout } = useUserContext();

  const startLogin = async (loginData : LoginProps) => {
    checking();
    try {
      const { data }: AxiosResponse<AuthResponse> = await api.post('/auth/login', loginData);

      localStorage.setItem("token", data.token);
      login(data.user);
    } catch (error) {
      console.log(error);
      logout();
    }
  }

  const startRegister = async (registerData : RegisterProps) => {
    checking();
    try {
      const { data }: AxiosResponse<AuthResponse> = await api.post('/auth/register', registerData);
      console.log(data);

      localStorage.setItem("token", data.token);
      login(data.user);
    } catch (error) {
      console.log(error);
      logout();
    }
  }

  const startLogout = () => {
    localStorage.clear();
    logout();
  }

  const checkAuthToken = async () => {
    checking();

    const token = localStorage.getItem('token');
  
    if (!token) return logout();;

    try {
      const { data }: AxiosResponse<AuthResponse> = await api.get('/auth/refresh');
      
      localStorage.setItem("token", data.token);
      login(data.user);
    } catch (error) {
      console.log(error);
      logout();
    }
  }

  return {
    user,
    status,
    startLogin,
    startRegister,
    startLogout,
    checkAuthToken
  }
}

export default useAuth;