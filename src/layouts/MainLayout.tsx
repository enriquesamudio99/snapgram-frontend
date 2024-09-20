import { Outlet } from 'react-router-dom';
import { BottomBar, LeftSideBar, RightSideBar, TopBar } from '../common/components';

const MainLayout = () => {
  return (
    <div className="main">
      <TopBar />
      {/* <LeftSideBar /> */}
      <section className="main-content">
        <Outlet />
      </section>
      {/* <RightSideBar /> */}
      {/* <BottomBar /> */}
    </div>
  )
}

export default MainLayout;