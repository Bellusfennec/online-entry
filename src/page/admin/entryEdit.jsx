import { useParams } from "react-router-dom";
import H1 from "../../common/components/text/h1";
import MainLayout from "../home/mainLayout";
import EntryForm from "../home/entryForm";

const EntryEdit = () => {
  const { entryId } = useParams();

  return (
    <MainLayout>
      <H1>Запись №: {entryId}</H1>
      <br />
      <EntryForm />
    </MainLayout>
  );
};

export default EntryEdit;
