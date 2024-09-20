import { Outlet } from 'react-router-dom';
import { BottomBar, LeftSideBar, TopBar } from '../common/components';

const MainLayout = () => {
  return (
    <div className="main">
      <TopBar />
      <LeftSideBar />
      <section className="main-content">
        <Outlet />
      </section>
      <BottomBar />
    </div>
  )
}

export default MainLayout;