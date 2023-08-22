import NavbarLink from "./navbarLink";

const Navbar = () => {
  return (
    <nav className="flex justify-between py-5 mx-auto max-w-5xl">
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
