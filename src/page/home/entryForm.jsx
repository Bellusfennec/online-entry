import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../common/components/form/button";
import DateField from "../../common/components/form/dateField";
import TextInput from "../../common/components/form/textField";
import Loading from "../../common/components/loading/loading";
import useForm from "../../hook/useForm";
import {
  createdEntry,
  getEntriesLoadingStatus,
  getEntryById,
} from "../../store/entry";
import { useEffect, useState } from "react";

const EntryForm = () => {
  const { entryId } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(getEntriesLoadingStatus());
  const entry = useSelector(getEntryById(entryId));
  const [formEntry, setFormEntry] = useState({});
  const navigate = useNavigate();
  const CONFIG = {
    date: { isRequared: "" },
    title: { isRequared: "" },
  };
  const FORM = formEntry ? formEntry : { date: "", title: "" };
  console.log("EntryForm", FORM);
  const { handlerChange, form, setError, handlerSubmit, isValid, name, error } =
    useForm({
      onSubmit,
      FORM,
      CONFIG,
    });

  function onSubmit(data) {
    dispatch(createdEntry(data));
  }

  useEffect(() => {
    if (entry) {
      setFormEntry(entry);
    }
  }, [entry]);

  if (Object.keys(form).length === 0) {
    return <p>Загрузка</p>;
  }

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handlerSubmit}>
      <TextInput
        name="title"
        placeholder="Название"
        label="Название"
        value={form.title}
        error={error.title}
        onChange={handlerChange}
      />
      <DateField
        name="date"
        label="Дата"
        value={form.date}
        error={error.date}
        onChange={handlerChange}
      />
      <Button disabled={!isValid}>{isLoading ? <Loading /> : "Создать"}</Button>
    </form>
  );
};

export default EntryForm;
