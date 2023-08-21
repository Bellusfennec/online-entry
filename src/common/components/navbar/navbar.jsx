import NavbarLink from "./navbarLink";

const Navbar = () => {
  return (
    <nav className="flex justify-between">
      <div>
        <NavbarLink to="/">оЗапись</NavbarLink>
      </div>
      <div>
        <NavbarLink to="#">Расписание</NavbarLink>
        <NavbarLink to="#">Запись</NavbarLink>
        <NavbarLink to="#">Архив</NavbarLink>
      </div>
      <div>
        <NavbarLink to="/passport/login">Вход</NavbarLink>
      </div>
    </nav>
  );
};

export default Navbar;
