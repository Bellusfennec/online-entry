/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import {
  createName,
  createPlaceholder,
  totalError,
  validator,
} from "../util/form";

const useForm = ({ onSubmit, FORM, CONFIG }) => {
  const [form, setForm] = useState({});
  const [name, setName] = useState({});
  const [placeholder, setPlaceholder] = useState({});
  const [focusСonfig, setFocusСonfig] = useState({});
  const [error, setError] = useState({});
  const [isValid, setValid] = useState(null);
  console.log("render", "form:", form, "FORM:", FORM);

  // обработчик изменений
  const handlerChange = (e) => {
    const { value, name } = e.target;

    setForm({ ...form, [name]: value });
  };

  // обработчик кнопки Submit
  const handlerSubmit = (event) => {
    event.preventDefault();

    if (isValid) {
      onSubmit(form);
      setForm(FORM);
      setFocusСonfig({});
      setError({});
    }
  };

  // обработчик отпускания фокуса
  const handlerBlur = useCallback((e) => {
    const { name } = e.target;
    const arrayСonfig = Object.entries(CONFIG);
    const newСonfig = arrayСonfig.map(([keyСonfig, valueСonfig]) => {
      if (keyСonfig === name) {
        return [keyСonfig, valueСonfig];
      }
    });
    const newOutFocus = Object.fromEntries(newСonfig.filter(Boolean));
    setFocusСonfig({ ...focusСonfig, ...newOutFocus });
  }, []);

  // обновление ошибок
  useEffect(() => {
    console.log("useEffect valid");
    const errors = validator(form, focusСonfig);
    setError(errors);
    const totalErrors = validator(form, CONFIG);
    setValid(!totalError(totalErrors));
  }, [form, focusСonfig]);

  const setInitialForm = useCallback(() => {
    console.log("callback setInitialForm");
    CONFIG = CONFIG ? CONFIG : {};
    setForm(FORM);
    setName(createName(FORM));
    setPlaceholder(createPlaceholder(FORM, CONFIG));
  }, [FORM]);

  useEffect(() => {
    setInitialForm();
  }, [FORM]);

  return {
    form,
    setForm,
    error,
    setError,
    placeholder,
    setPlaceholder,
    name,
    setName,
    handlerChange,
    handlerSubmit,
    handlerBlur,
    isValid,
  };
};
export default useForm;
