import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <section>
      <h1>Auth</h1>
      <Outlet />
    </section>
  )
}

export default AuthLayout;