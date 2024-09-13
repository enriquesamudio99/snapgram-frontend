import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks';
import { Button } from '../components';

const MainLayout = () => {

  const { startLogout } = useAuth();

  return (
    <section>
      <Button 
        title="Logout"
        onClick={startLogout}
      />
      <Outlet />
    </section>
  )
}

export default MainLayout;