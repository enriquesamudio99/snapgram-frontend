import { useNotificationsContext } from '../../context/NotificationsContext';

const useNotifications = () => {

  const { test } = useNotificationsContext();

  return {
    test
  }
}

export default useNotifications;