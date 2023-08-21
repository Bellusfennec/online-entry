import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./page/home/homePage.jsx";
import Error404Page from "./page/error/error404Page.jsx";
import SignupPage from "./page/passport/signupPage.jsx";
import LoginPage from "./page/passport/loginPage.jsx";
import PassportLayout from "./page/passport/passportLayout.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="passport" element={<PassportLayout />}>
        <Route index element={<Navigate to="login" />} />
        <Route path="*" element={<Navigate to="login" />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Route>
      <Route path="*" element={<Error404Page />} />
      {/* <Route path="passport/:page?" element={<PassportIndex />} />
      
      <Route path="product/:page?/:productId?" element={<ProductIndex />} />
      <Route path="admin/:page?/:action?/:id?" element={<AdminIndex />} /> */}

      {/* <Routes>
        <Route index element={<HomePage />} />
        <Route path="users" element={<UsersLayout />}>
          <Route index element={<UsersListPage />} />
          <Route path=":userId">
            <Route index element={<Navigate to="profile" />} />
            <Route path="*" element={<Navigate to="profile" />} />
            <Route path="profile" element={<UserProfilePage />} />
            <Route path="edit" element={<UserEditPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes> */}
    </Routes>
  );
};

export default AppRoutes;
