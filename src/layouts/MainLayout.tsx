import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="main">
      <p>TopBar</p>
      <p>LeftSideBar</p>
      <section className="main-content">
        <Outlet />
      </section>
      <p>BottomBar</p>
    </div>
  )
}

export default MainLayout;