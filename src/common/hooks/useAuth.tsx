import { useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { useUserContext } from '../../context/AuthContext';
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

interface AuthResult {
  response?: AxiosResponse<AuthResponse>;
  error?: {
    message?: string;
    data?: {
      success: boolean;
      error: string;
    };
  };
}

interface LoginProps {
  email: string;
  password: string;
}

interface RegisterProps {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const useAuth = () => {

  const { user, status, checking, login, logout } = useUserContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const startLogin = async (loginData : LoginProps) : Promise<AuthResult> => {
    setIsLoading(true);
    try {
      const response: AxiosResponse<AuthResponse> = await api.post('/auth/login', loginData);
      localStorage.setItem("token", response.data.token);
      login(response.data.user);
      return {
        response
      }
    } catch (error: unknown) {
      console.log(error);
      logout();
      if (error instanceof AxiosError) {
        return {
          error: {
            message: error.message,
            data: error.response?.data
          }
        }
      }
      return {
        error: {
          message: "Something wrong"
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  const startRegister = async (registerData : RegisterProps) => {
    setIsLoading(true);
    try {
      const response : AxiosResponse<AuthResponse> = await api.post('/auth/register', registerData);

      localStorage.setItem("token", response.data.token);
      login(response.data.user);

      return {
        response
      }
    } catch (error: unknown) {
      console.log(error);
      logout();
      if (error instanceof AxiosError) {
        return {
          error: {
            message: error.message,
            data: error.response?.data
          }
        }
      }
      return {
        error: {
          message: "Something wrong"
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  const startLogout = () => {
    localStorage.clear();
    logout();
  }

  const checkAuthToken = async () => {
    checking();

    const token = localStorage.getItem('token');
  
    if (!token) return logout();

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
    checkAuthToken,
    isLoading
  }
}

export default useAuth;