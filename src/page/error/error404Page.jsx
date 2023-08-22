import { Link } from "react-router-dom";

const Error404Page = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 flex items-center justify-center flex-col">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Страница не найдена!
            </h1>
            <p>
              <Link
                to="/"
                className="font-medium text-gray-600 hover:underline dark:text-gray-500"
              >
                Назад
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error404Page;
