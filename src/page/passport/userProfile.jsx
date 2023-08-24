import MainLayout from "../home/mainLayout";
import { getCurrentUser } from "../../store/user";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const user = useSelector(getCurrentUser());
  const { name, email } = user;

  return (
    <MainLayout>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Профиль
      </h1>
      <br />
      <p>Имя: {name}</p>
      <p>Email: {email}</p>
      {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        
        <Link
          to="/logout"
          className="font-medium text-gray-600 hover:underline dark:text-gray-500"
        ></Link>
      </p> */}
    </MainLayout>
  );
};

export default UserProfile;
