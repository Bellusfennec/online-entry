import { Link, useNavigate, useSearchParams } from "react-router-dom";
import TextInput from "../../common/components/form/textField";
import Button from "../../common/components/form/button";
import { useEffect } from "react";
import {
  getAuthLoadingStatus,
  getUserError,
  loggedInUser,
} from "../../store/user";
import useForm from "../../hook/useForm";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../common/components/loading/loading";

const LoginPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getAuthLoadingStatus());
  const userError = useSelector(getUserError());
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const CONFIG = {
    email: { isRequared: "" },
    password: { isRequared: "" },
  };
  const email = searchParams?.get("email") ? searchParams?.get("email") : "";
  const FORM = { email, password: "" };
  const {
    handlerChange,
    form,
    setError,
    handlerSubmit,
    isValid,
    placeholder,
    name,
    error,
  } = useForm({
    onSubmit,
    FORM,
    CONFIG,
  });

  function onSubmit(data) {
    dispatch(loggedInUser(data));
  }

  useEffect(() => {
    if (userError) {
      setError(userError);
    }
  }, [userError]);

  const toRegistration = () => {
    form.email.length > 0
      ? navigate(`/passport/registration?email=${form.email}`)
      : navigate(`/passport/registration`);
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          to="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          оЗапись
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Войти в аккаунт
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handlerSubmit}>
              <TextInput
                name="email"
                placeholder="name@company.com"
                label="Ваш email"
                type="email"
                autoComplete={name.email}
                value={form.email}
                error={error.email}
                onChange={handlerChange}
              />
              <TextInput
                placeholder="••••••••"
                label="Пароль"
                type="password"
                name={name.password}
                autoComplete={name.password}
                value={form.password}
                error={error.password}
                onChange={handlerChange}
              />
              <Button>{isLoading ? <Loading /> : "Войти"}</Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Нет аккаунта?{" "}
                <Link
                  to="/passport/signup"
                  className="font-medium text-gray-600 hover:underline dark:text-gray-500"
                >
                  Создать
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
