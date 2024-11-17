import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  matchPath,
} from "react-router-dom";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
import { useAuth } from "../../app/modules/auth/core/Auth";
import { useEffect, useState } from "react";
import { DOMAIN } from "../../app/routing/ApiEndpoints";
import { DashboardWrapper } from "../pages/dashboard/DashboardWrapper";
import { ErrorsPage } from "../modules/errors/ErrorsPage";
import { routesConfig } from "./RoutesConfig";

interface RouteConfig {
  path: string;
  component: React.ComponentType<any>;
}

const PrivateRoutes = () => {
  const { currentUser } = useAuth();

  // const [userRole, setUserRole] = useState<string | null>(null);
  const [routes, setRoutes] = useState<RouteConfig[]>([]);

  const [authorizedPaths, setAuthorizedPaths] = useState<string[]>([]);
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const school_id = currentUser?.school_id;
  const role_id = currentUser?.roleId;
  const roleName = currentUser?.roleName;

  // console.log(currentUser);

  // Fetch User Role
  // useEffect(() => {
  //   if (currentUser) {
  //     setUserRole(currentUser.roleName);
  //   }
  // }, [currentUser]);

  // Fetch Subscription ID for School Admin
  // useEffect(() => {
  //   const fetchSubscriptionId = async () => {
  //     if (school_id && (userRole === "School Admin" || userRole === "School Master")) {
  //       try {
  //         const response = await fetch(
  //           `${DOMAIN}/api/superadmin/get-subscription-id/${school_id}`
  //         );
  //         if (!response.ok) {
  //           throw new Error(`Error: ${response.statusText}`);
  //         }
  //         const data = await response.json();

  //         setSubscriptionId(data.result[0].subscription_id);
  //       } catch (err) {
  //         console.error("Error fetching subscription ID:", err);
  //       }
  //     }
  //   };

  //   fetchSubscriptionId();
  // }, [school_id, userRole]);

  // Common function to fetch and set routes

  const fetchRoutes = async (url: string, basePath: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch routes");
      }
      const data = await response.json();

      let componentModule;
      const routesPromises = Object.keys(data).flatMap((group) =>
        data[group].map(async (module: any) => {
          try {
            if (module.component_name && module.path) {
              if (roleName === "Super Admin") {
                componentModule = await import(
                  /* @vite-ignore */ `${basePath}/${module.component_name}`
                );
              } else {
                componentModule = await import(
                  /* @vite-ignore */ `${basePath}${module.parent_module}/${module.component_name}`
                );
              }

              return {
                path: module.path,
                component: componentModule.default,
              };
            }
          } catch (err) {
            console.error(
              `Failed to import component ${module.component_name}`,
              err
            );
            return null;
          }
        })
      );

      const fetchedRoutes = (await Promise.all(routesPromises)).filter(Boolean);
      setRoutes(fetchedRoutes);
      setAuthorizedPaths((prevPaths) => [
        ...prevPaths,
        ...fetchedRoutes.map((route) => route.path),
      ]);
    } catch (error) {
      console.error("Error fetching routes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch routes based on user role
  useEffect(() => {
    if (roleName) {
      if (roleName === "student") {
        fetchRoutes(
          `${DOMAIN}/api/school/get-modules/${school_id}/${role_id}}`,
          "../pages/StudentPages/"
        );
      }
      //  else if (userRole === "student") {
      //   fetchRoutes(
      //     `${DOMAIN}/api/school/get-modules/${school_id}/${role_id}/${designation_id}`,
      //     "../pages/StudentPages/"
      //   );
      // }
    }
  }, [roleName, role_id]);

  // Redirect to unauthorized if the path is not in authorized paths
  // const matchPath = (path: string, currentPath: string) => {
  //   // Replace dynamic segments like ":schoolId" with a regex pattern to match any value
  //   const pathRegex = new RegExp(`^${path.replace(/:\w+/g, "[^/]+")}$`);
  //   return pathRegex.test(currentPath);
  // };

  // useEffect(() => {
  //   if (!loading && window.location.pathname) {
  //     const currentPath = window.location.pathname.split("?")[0];

  //     // Check if the current path matches any authorized path, accounting for dynamic segments
  //     const pathIsAuthorized = authorizedPaths.some((path) =>
  //       matchPath(path, currentPath)
  //     );

  //     console.log("Authorized paths:", authorizedPaths);
  //     console.log("Current path:", currentPath);
  //     console.log("Path is authorized:", pathIsAuthorized);

  //     if (
  //       !pathIsAuthorized &&
  //       currentPath !== "/" &&
  //       currentPath !== "/unauthorized"
  //     ) {
  //       navigate("/unauthorized", { replace: true });
  //     }
  //   }
  // }, [authorizedPaths, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>; // Customize the loading state
  }

  const AuthRedirect = () => <Navigate to="/" />;

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path="auth/*" element={<AuthRedirect />} />
        {/* Render dynamically fetched routes */}
        {routesConfig.Fee.map(({ path, component: Component }) => {
          if (!Component) {
            console.error(`Component for path ${path} is undefined`);
            return null; // Skip rendering if component is not found
          }
          return <Route key={path} path={path} element={<Component />} />;
        })}
        {/* Default Route for all users */}
        <Route path="/" element={<DashboardWrapper />} />
        {/* Unauthorized Route */}
        <Route path="/unauthorized" element={<ErrorsPage />} />
      </Route>
    </Routes>
  );
};

export default PrivateRoutes;
