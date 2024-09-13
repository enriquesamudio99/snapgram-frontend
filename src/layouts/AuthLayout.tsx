import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <section className="auth">
      <div className="auth__container">
        <div className="auth__left">
          <Outlet />
        </div>
        <div className="auth__right">
          <img 
            src="/assets/images/side-img.svg"
            alt="Side Image"
            className="auth__right-img"
          />
        </div>
      </div>
    </section>
  )
}

export default AuthLayout;