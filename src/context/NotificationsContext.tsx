import { toast } from 'react-toastify';
import { useAuth } from '../common/hooks';
import socket from '../common/lib/socket';
import { INotificationContextType } from '../types';
import React, { createContext, useContext, useEffect } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const INITIAL_STATE = {
  test: false
}

const NotificationsContext = createContext<INotificationContextType>(INITIAL_STATE);

const NotificationsProvider = ({ children } : { children: React.ReactNode }) => {

  const { user } = useAuth();

  useEffect(() => {
    if (user && user.id) {
      socket.emit('joinRoom', user.id);

      socket.on('newNotification', (notification) => {
        console.log(notification);
        toast.success(notification.content);
      });
    }

    return () => {
      socket.off('newNotification');
    };
  }, [user]);

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