import AppRoutes from "./routes";
import AppLoader from "./common/hoc/appLoader";

function App() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <AppLoader>
        <AppRoutes />
      </AppLoader>
    </div>
  );
}

export default App;
