import { Link } from "react-router-dom";

const NavbarLink = ({ children, to }) => {
  return (
    <Link to={to} className="p-4 text-sky-500 hover:text-sky-800 ">
      {children}
    </Link>
  );
};

export default NavbarLink;
