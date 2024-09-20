import { Link } from "react-router-dom";
import { bottomBarLinks } from "../../constants";

const BottomBar = () => {
  return (
    <div className="bottom-bar">
      <div className="bottom-bar__container">
        <ul className="bottom-bar__menu">
          {bottomBarLinks.map(link => (
            <li
              key={link.value}
              className="bottom-bar__item"
            >
              <Link 
                to={link.route}
                className="bottom-bar__link"
              >
                <img
                  src={link.icon}
                  alt={`${link.label} Icon`}
                  className="bottom-bar__link-icon"
                />
                <p className="bottom-bar__link-label">{link.label}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BottomBar