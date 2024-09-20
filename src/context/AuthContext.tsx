import { IContextType, IUser } from '../types';
import React, { createContext, useContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const INITIAL_USER = {
  id: '',
  name: '',
  username: '',
  email: '',
  bio: ''
}

// eslint-disable-next-line react-refresh/only-export-components
export const INITIAL_STATE = {
  user: INITIAL_USER,
  setUser: () => {}, 
  status: "checking",
  setStatus: () => {},
  checking: () => {},
  login: () => {},
  logout: () => {}
}

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children } : { children: React.ReactNode }) => {

  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [status, setStatus] = useState(INITIAL_STATE.status);

  const checking = () => setStatus("checking");

  const login = (user: IUser) => {
    setUser({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio
    });
    setStatus("auth");
  }

  const logout = () => {
    setUser(INITIAL_USER);
    setStatus("not-auth");
  }

  const value = {
    user,
    setUser,
    status,
    setStatus,
    checking,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => useContext(AuthContext);