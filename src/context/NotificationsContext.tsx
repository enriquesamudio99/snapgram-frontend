import { INotificationContextType } from '../types';
import React, { createContext, useContext } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const INITIAL_STATE = {
  test: false
}

const NotificationsContext = createContext<INotificationContextType>(INITIAL_STATE);

const NotificationsProvider = ({ children } : { children: React.ReactNode }) => {

  const value = {
    test: true
  }

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  )
}

export default NotificationsProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useNotificationsContext = () => useContext(NotificationsContext);