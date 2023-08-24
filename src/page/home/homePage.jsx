import { useSelector } from "react-redux";
import H1 from "../../common/components/text/h1";
import MainLayout from "./mainLayout";
import { getEntries } from "../../store/entry";

const HomePage = () => {
  const entries = useSelector(getEntries());
  return (
    <MainLayout>
      <H1>Записи</H1>
      <br />
      {entries.length > 0 && (
        <table className="border-collapse border border-slate-400 w-full">
          <thead>
            <tr>
              <th className="border border-slate-300 text-center">Название</th>
              <th className="border border-slate-300 text-center">Дата</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((item) => (
              <tr key={item._id}>
                <td className="border border-slate-300 text-center">
                  {item.title}
                </td>
                <td className="border border-slate-300 text-center">
                  {item.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </MainLayout>
  );
};

export default HomePage;
