import { Link } from "react-router-dom";
import MainLayout from "../home/mainLayout";

const UserProfile = () => {
  return (
    <MainLayout>
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Профиль
        </h1>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          <Link
            to="/logout"
            className="font-medium text-gray-600 hover:underline dark:text-gray-500"
          >
            Выйти
          </Link>
        </p>
      </div>
    </MainLayout>
  );
};

export default UserProfile;
