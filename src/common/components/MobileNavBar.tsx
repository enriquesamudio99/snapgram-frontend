import { Link } from "react-router-dom";
import { mbNavbarLinks } from "../../constants";
import Button from "./Button";
import { useAuth } from "../hooks";

const MobileNavBar = ({ isOpen, onClick }: { isOpen: boolean, onClick: () => void }) => {

  const { startLogout } = useAuth();

  return (
    <nav
      className={`mobile-navbar ${isOpen ? "mobile-navbar--open" : ""}`}
    >
      <div className="mobile-navbar__container">
        <button
          type="button"
          className="mobile-navbar__btn"
          onClick={onClick}
        >
          <img
            src="/assets/icons/close.svg"
            alt="User Profile"
            className="mobile-navbar__btn-icon"
          />
        </button>
        <ul className="mobile-navbar__menu">
          {mbNavbarLinks.map((link) => (
            <li
              className="mobile-navbar__item"
              key={link.value}
            >
              <Link to="/" className="mobile-navbar__link">
                <img
                  src={link.icon}
                  alt={`${link.label} Icon`}
                  className="mobile-navbar__link-icon"
                />
                <p className="mobile-navbar__link-label">{link.label}</p>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mobile-navbar__logout">
          <Button 
            title="Logout"
            variant="warning"
            fullWidth
            icon="/assets/icons/mobile-logout.svg"
            onClick={startLogout}
          />
        </div>
      </div>
    </nav>
  )
}

export default MobileNavBar;