import { FC } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import { ErrorsPage } from "../modules/errors/ErrorsPage";
import { Logout, AuthPage, useAuth } from "../modules/auth";
import { App } from "../App";
// import { ForgotPassword } from "../modules/auth/components/ForgotPassword";
import CollectFeesLink from "../pages/StaffPages/FinancialManagement/CollectFeesLink";

const { BASE_URL } = import.meta.env;

const AppRoutes: FC = () => {
  const { auth } = useAuth();
  return (
    <BrowserRouter basename={BASE_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path="error/*" element={<ErrorsPage />} />
          <Route path="logout" element={<Logout />} />
          <Route path="/fee-payment" element={<CollectFeesLink />} />
         
          {auth ? (
            <>
              <Route path="/*" element={<PrivateRoutes />} />
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
