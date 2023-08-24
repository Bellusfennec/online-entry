import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getLoggedStatus } from "../../store/user";

const PassportLayout = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const isLogged = useSelector(getLoggedStatus());

  if (isLogged && (pathname.includes("login") || pathname.includes("signup"))) {
    return <Navigate to="/passport/profile" />;
  }
  if (!isLogged && pathname.includes("profile")) {
    return <Navigate to="/passport/login" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PassportLayout;
