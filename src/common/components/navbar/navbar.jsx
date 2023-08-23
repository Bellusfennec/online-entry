import { useSelector } from "react-redux";
import { getLoggedStatus } from "../../../store/user";
import NavbarLink from "./navbarLink";
import NavbarUser from "./navbarUser";

const Navbar = () => {
  const isLogged = useSelector(getLoggedStatus());

  return (
    <nav className="flex justify-between">
      <div>
        <NavbarLink to="/">оЗапись</NavbarLink>
      </div>
      <div className="flex">
        <NavbarLink to="/entry">Запись</NavbarLink>
        <NavbarLink to="/schedule">Расписание</NavbarLink>
        <NavbarLink to="/archive">Архив</NavbarLink>
      </div>
      <div>
        {isLogged && <NavbarLink to="/passport/profile">Профиль</NavbarLink>}
        {!isLogged && <NavbarLink to="/passport/login">Вход</NavbarLink>}
      </div>
      <div>
        <NavbarUser />
      </div>
    </nav>
  );
};

export default Navbar;
