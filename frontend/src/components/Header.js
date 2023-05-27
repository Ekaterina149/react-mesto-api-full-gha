import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
function Header({ linkToLog, onClick, userEmail, route }) {
  return (
    <header className="header">
      <Link className=" user__link-register" to={route} onClick={onClick}>
        <span className=" user__email">{userEmail}</span>
        {linkToLog}
      </Link>
      <img className="header__logo" src={logo} alt="Логотип сайта" />
    </header>
  );
}
export default Header;
