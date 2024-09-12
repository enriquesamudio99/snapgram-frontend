import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <section>
      <h1>Main</h1>
      <Outlet />
    </section>
  )
}

export default MainLayout;