/* eslint-disable react-refresh/only-export-components */
import {
  FC,
  useState,
  useEffect,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { LayoutSplashScreen } from "../../../../_metronic/layout/core";
import { AdminModel, AuthModel, SuperAdminModel, StudentModel } from "./_models";
import * as authHelper from "./AuthHelpers";
import { getAdminByToken, getStudentByToken, getSuperAdminByToken } from "./_requests";
import { WithChildren } from "../../../../_metronic/helpers";
// import { ArcElement } from "chart.js";

type AuthContextProps = {
  auth: AuthModel | undefined;
  saveAuth: (auth: AuthModel | undefined) => void;
  currentUser: StudentModel | AdminModel | SuperAdminModel | undefined;
  setCurrentUser: Dispatch<
    SetStateAction<StudentModel | AdminModel | SuperAdminModel | undefined>
  >;
  logout: () => void;
};

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState);

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider: FC<WithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth());
  const [currentUser, setCurrentUser] = useState<
    StudentModel | AdminModel | SuperAdminModel | undefined
  >();
  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth);
    if (auth) {
      authHelper.setAuth(auth);
    } else {
      authHelper.removeAuth();
    }
  };

  const logout = () => {
    saveAuth(undefined);
    setCurrentUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{ auth, saveAuth, currentUser, setCurrentUser, logout }}
      >
      {children}
    </AuthContext.Provider>
  );
};

const AuthInit: FC<WithChildren> = ({ children }) => {
  const { auth, currentUser, logout, setCurrentUser } = useAuth();
  

  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    const requestStaff = async (id: string) => {
      try {
          const { data } = await getAdminByToken(id);
          if (data) {
            setCurrentUser(data?.data?.[0]);
          }
      } catch (error) {
        console.error(error);
        if (currentUser) {
          logout();
        }
      } finally {
        setShowSplashScreen(false);
      }
    };
    const requestStudent = async (mobile_no: string, role: string) => {
      try {
        if (!currentUser && role === "student") {
          const { data } = await getStudentByToken(mobile_no);
          if (data) {
            setCurrentUser(data);
          }
        }
      } catch (error) {
        console.error(error);
        if (currentUser) {
          logout();
        }
      } finally {
        setShowSplashScreen(false);
      }
    };
    const requestAdmin = async (id: string) => {
      try {
        const { data } = await getAdminByToken(id);
          if (data) {
            setCurrentUser(data?.data?.[0]);
          }
      } catch (error) {
        console.error(error);
        if (currentUser) {
          logout();
        }
      } finally {
        setShowSplashScreen(false);
      }
    };
    const requestSuperAdmin = async (username: string) => {
      try {
        const { data } = await getSuperAdminByToken(username);
          if (data) {
            setCurrentUser(data);
          }
      } catch (error) {
        console.error(error);
        if (currentUser) {
          logout();
        }
      } finally {
        setShowSplashScreen(false);
      }
    };

    
    if (auth && auth.mobile && auth.role) {
      requestStudent(auth.mobile, auth.role);
    } else if (auth && auth.id && auth.role ==='staff') {
      requestStaff(auth.id);
    } 
    else if (auth && auth.id && auth.role === 'admin') {
      requestAdmin(auth.id);
    }
    else if (auth && auth.username && auth.role === 'superadmin') {
      requestSuperAdmin(auth.username);
    }
    else {
      logout();
      setShowSplashScreen(false);
    }
    // eslint-disable-next-line
  }, []);

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>;
};

export { AuthProvider, AuthInit, useAuth };