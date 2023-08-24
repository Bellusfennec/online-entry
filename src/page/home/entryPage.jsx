import MainLayout from "./mainLayout";
import { useNavigate } from "react-router-dom";
import Button from "../../common/components/form/button";
import TextInput from "../../common/components/form/textField";
import Loading from "../../common/components/loading/loading";
import useForm from "../../hook/useForm";
import { useDispatch, useSelector } from "react-redux";
import { createdEntry, getEntriesLoadingStatus } from "../../store/entry";
import DateField from "../../common/components/form/dateField";
import H1 from "../../common/components/text/h1";

const EntryPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getEntriesLoadingStatus());
  // const userError = useSelector(getUserError());
  const navigate = useNavigate();
  const CONFIG = {
    date: { isRequared: "" },
    title: { isRequared: "" },
  };
  const FORM = { date: "", title: "" };
  const { handlerChange, form, setError, handlerSubmit, isValid, name, error } =
    useForm({
      onSubmit,
      FORM,
      CONFIG,
    });

  function onSubmit(data) {
    dispatch(createdEntry(data));
  }

  return (
    <MainLayout>
      <H1>Создать запись</H1>
      <br />
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
        <Button disabled={!isValid}>
          {isLoading ? <Loading /> : "Создать"}
        </Button>
      </form>
    </MainLayout>
  );
};

export default EntryPage;
