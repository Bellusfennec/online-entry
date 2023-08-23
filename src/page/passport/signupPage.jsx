import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../common/components/form/button";
import CheckboxField from "../../common/components/form/checkboxField";
import TextInput from "../../common/components/form/textField";
import Loading from "../../common/components/loading/loading";
import useForm from "../../hook/useForm";
import {
  getAuthLoadingStatus,
  getUserError,
  registeredUser,
} from "../../store/user";

const SignupPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getAuthLoadingStatus());
  const userError = useSelector(getUserError());
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const CONFIG = {
    name: { isRequared: "" },
    email: { isRequared: "" },
    password: { isRequared: "" },
  };
  const email = searchParams?.get("email") ? searchParams?.get("email") : "";
  const FORM = { name: "", email, password: "" };
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
    console.log(data);
    dispatch(registeredUser(data));
  }

  useEffect(() => {
    if (userError) {
      setError(userError);
    }
  }, [userError]);

  const toLogin = () => {
    form.email.length > 0
      ? navigate(`/passport/login?email=${form.email}`)
      : navigate(`/passport/login`);
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
              Создать аккаунт
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handlerSubmit}>
              <TextInput
                name={name.name}
                placeholder="Имя"
                label="Ваш имя"
                type="text"
                value={form.name}
                onChange={handlerChange}
                error={error.name}
              />
              <TextInput
                autoComplete={name.email}
                name={name.email}
                placeholder="name@company.com"
                label="Ваш email"
                type="email"
                value={form.email}
                onChange={handlerChange}
                error={error.email}
              />
              <TextInput
                autoComplete="off"
                name={name.password}
                placeholder="••••••••"
                label="Пароль"
                type="password"
                value={form.password}
                onChange={handlerChange}
                error={error.password}
              />
              <CheckboxField name="terms">
                Я соглашаюсь с{" "}
                <Link
                  className="font-medium text-gray-600 hover:underline dark:text-gray-500"
                  to="#"
                >
                  правилами использования
                </Link>
              </CheckboxField>
              <Button disable={!isValid}>
                {isLoading ? <Loading /> : "Зарегистрироваться"}
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Уже есть аккаунт?{" "}
                <Link
                  to="/passport/login"
                  className="font-medium text-gray-600 hover:underline dark:text-gray-500"
                >
                  Войти
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
