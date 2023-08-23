import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getLoggedStatus } from "../../store/user";

const PassportLayout = () => {
  const location = useLocation();
  const page = location.pathname.split("/")[2];
  const isLogged = useSelector(getLoggedStatus());

  if (isLogged && (page === "login" || page === "signup")) {
    return <Navigate to="/passport/profile" />;
  }
  if (!isLogged && page === "profile") {
    return <Navigate to="/passport/login" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PassportLayout;
