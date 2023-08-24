import H1 from "../../common/components/text/h1";
import MainLayout from "../home/mainLayout";
import { getEntries } from "../../store/entry";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AdminPage = () => {
  const entries = useSelector(getEntries());

  return (
    <MainLayout>
      <H1>Администратор записей</H1>
      <br />
      {entries.length > 0 && (
        <table className="border-collapse border border-slate-400 w-full">
          <thead>
            <tr>
              <th className="border border-slate-300 text-center">Название</th>
              <th className="border border-slate-300 text-center">Дата</th>
              <th className="border border-slate-300 text-center">
                Редактировать
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map((item) => (
              <tr key={item._id}>
                <td className="border border-slate-300 text-center">
                  {item.title}
                </td>
                <td className="border border-slate-300 text-center w-40">
                  {item.date}
                </td>
                <td className="border border-slate-300 text-center w-40">
                  <Link
                    to={`/admin/${item._id}`}
                    className="flex justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </MainLayout>
  );
};

export default AdminPage;
