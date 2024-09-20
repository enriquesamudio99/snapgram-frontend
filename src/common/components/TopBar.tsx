import { useState } from "react";
import { Link } from "react-router-dom";
import { MobileNavBar } from "./";

const TopBar = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleChangeMbNavbar = () => {
    setIsOpen(prevState => !prevState);
  }

  return (
    <>
      <div className="top-bar">
        <div className="top-bar__container">
          <Link to="/" className="top-bar__logo-link">
            <img
              src="/assets/images/logo.svg"
              alt="Snapgram Logo"
              className="top-bar__logo"
            />
          </Link>
          <Link to="/" className="top-bar__profile-link">
            <img
              src="/assets/icons/profile-placeholder.svg"
              alt="User Profile"
              className="top-bar__profile"
            />
          </Link>
          <button
            type="button"
            className="top-bar__btn"
            onClick={handleChangeMbNavbar}
          >
            <img
              src="/assets/icons/menu.svg"
              alt="User Profile"
              className="top-bar__btn-icon"
            />
          </button>
        </div>
      </div>
      <MobileNavBar 
        isOpen={isOpen}
        onClick={handleChangeMbNavbar}
      />
    </>
  )
}

export default TopBar