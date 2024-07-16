/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import { FC } from "react";
import { Routes, Route, BrowserRouter, Navigate, useParams } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import { ErrorsPage } from "../modules/errors/ErrorsPage";
import { Logout, AuthPage, useAuth } from "../modules/auth";
import { App } from "../App";
import { ForgotPassword } from "../modules/auth/components/ForgotPassword";

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const { BASE_URL } = import.meta.env;

const AppRoutes: FC = () => {
  const { auth } = useAuth();
  // const Userrole = auth?.role;
  return (
    <BrowserRouter basename={BASE_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path="error/*" element={<ErrorsPage />} />
          <Route path="logout" element={<Logout />} />
         
          {auth ? (
            <>
              <Route path="/*" element={<PrivateRoutes />} />
              if(auth.role === "student")
              {auth.role === "student" && (
                <Route index element={<Navigate to="/dashboard" />} />
              )}
              {auth.role === "staff" && (
                <Route index element={<Navigate to="/Dashboard" />} />
              )}
              {auth.role === "admin" && (
                <Route index element={<Navigate to="/Dashboard" />} />
              )}
              {auth.role === "superadmin" && (
                <Route index element={<Navigate to="/Dashboard" />} />
              )}
            </>
          ) : (
            <>
              <Route path="auth/*" element={<AuthPage />} />
              <Route path="*" element={<Navigate to="/auth" />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};



export { AppRoutes };
