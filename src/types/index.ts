import React from 'react';

export type IContextType = {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  checking: () => void;
  login: (user: IUser) => void;
  logout: () => void;
};

export type IUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  bio: string;
};