import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../hooks"
import { leftSideBarLinks } from "../../constants";

const LeftSideBar = () => {

  const { user, startLogout } = useAuth();
  const { pathname } = useLocation();

  return (
    <aside className="left-sidebar">
      <div className="left-sidebar__container">
        <Link
          to="/"
          className="left-sidebar__logo-link"
        >
          <img
            src="/assets/images/logo.svg"
            alt="Logo"
            className="left-sidebar__logo-full"
          />
          <img
            src="/assets/icons/logo.svg"
            alt="Snapgram"
            className="left-sidebar__logo-simple"
          />
        </Link>
        <Link
          to={`/profile/${user.id}`}
          className="left-sidebar__user-link"
        >
          <img
            src="/assets/icons/profile-placeholder.svg"
            alt={`${user.name} Picture`}
            className="left-sidebar__user-img"
          />
          <div className="left-sidebar__user-info">
            <h2 className="left-sidebar__user-name">{user.name}</h2>
            <h2 className="left-sidebar__user-username">@{user.username}
            </h2>
          </div>
        </Link>
        <div className="left-sidebar__menu">
          <ul className="left-sidebar__top-menu">
            {leftSideBarLinks.map(link => {
              const isActive = pathname === link.route;
              return (
                <li
                  className="left-sidebar__top-menu-item"
                  key={link.value}
                >
                  <Link 
                    to={link.route} 
                    className={`left-sidebar__top-menu-link ${isActive ? "left-sidebar__top-menu-link--active" : ""}`}
                  >
                    <img
                      src={link.icon}
                      alt={`${link.label} Icon`}
                      className={`
                        left-sidebar__top-menu-link-icon 
                        ${isActive ? "left-sidebar__top-menu-link-icon--active" : ""}`
                      }
                    />
                    <p className="left-sidebar__top-menu-link-label">{link.label}</p>
                  </Link>
                </li>
              )
            })}
          </ul>
          <ul className="left-sidebar__bottom-menu">
            <li
              className="left-sidebar__bottom-menu-item"
            >
              <button
                type="button"
                className="left-sidebar__bottom-menu-link"
                onClick={startLogout}
              >
                <img
                  src="/assets/icons/logout.svg"
                  alt="Logout Icon"
                  className="left-sidebar__bottom-menu-link-icon"
                />
                <p className="left-sidebar__bottom-menu-link-label">Logout</p>
              </button>
              <Link to="/" className="left-sidebar__bottom-menu-link">
                <img
                  src="/assets/icons/settings.svg"
                  alt="Settings Icon"
                  className="left-sidebar__bottom-menu-link-icon"
                />
                <p className="left-sidebar__bottom-menu-link-label">Settings</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  )
}

export default LeftSideBar