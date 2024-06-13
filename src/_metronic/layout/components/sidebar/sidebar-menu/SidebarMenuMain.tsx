import { SidebarMenuItemWithSub } from "./SidebarMenuItemWithSub";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { useAuth } from "../../../../../app/modules/auth/core/Auth";
import { useEffect, useState } from "react";
import { routesConfig } from "../../../../../app/routing/RoutesConfig";

const SidebarMenuMain = () => {
  const { currentUser } = useAuth();
  const userRole = currentUser?.role;
  const role_id = currentUser?.roleId;
  const [modulesData, setModulesData] = useState([]);
  

  useEffect(() => {
    if (!currentUser) return;
    const fetchData = async () => {
      try {
        const school_id = currentUser?.school_id;
        let apiUrl;
        switch (userRole) {
          case "admin":
            apiUrl = `http://127.0.0.1:5000/api/superadmin/get-parent-module/${school_id}`;
            break;
          case "staff":
            apiUrl = `http://127.0.0.1:5000/api/staff/get-modules/${school_id}/${role_id}`;
            break;
          case "superadmin":
            apiUrl = `http://127.0.0.1:5000/api/superadmin/get-modules`;
            break;
          default:
            throw new Error("Invalid user role");
        }

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        setModulesData(data);
      } catch (error) {
        console.error("Error fetching data:", error); // Fixed typo and used console object correctly
      }
    };
    fetchData();
  }, [currentUser]);

  
  const getPathForModule = (moduleName) => {
    const userRoutes = routesConfig[userRole];
    const matchedRoute = userRoutes.find(
      (route) => route.sidebarName === moduleName
    );

    return matchedRoute ? matchedRoute.path : "/";
  };


  const getIconPath = (moduleName) => {
    // Convert module name to a valid filename format    
    // const iconName = moduleName.replace(/\s+/g, "-").toLowerCase();
    return `media/logos/${moduleName}.svg`;
  };

  return (
    <>
      <SidebarMenuItem
        to="/dashboard"
        icon="media/logos/Frame1360.png"
        title=""
      />
      {Object.keys(modulesData).length > 0 &&
        Object.keys(modulesData).map((key, index) => (
          <SidebarMenuItemWithSub
            key={index}
            to="#"
             icon={getIconPath(key)}
            menuPlacement="right-start"
            menuTrigger="hover"
          >
            <div style={{ paddingLeft: "15px", paddingBottom: "15px" }}>
              <span
                className="menu-section"
                style={{
                  color: "#000",
                  fontFamily: "Manrope",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                {key}
              </span>
            </div>
            {modulesData[key].map((moduleDataItem, index) => (
              <SidebarMenuItem
                key={index}
                icon=""
                to={getPathForModule(moduleDataItem[1])}
                title={moduleDataItem[1]}
              />
            ))}
          </SidebarMenuItemWithSub>
        ))}
    </>
  );
};

export { SidebarMenuMain };
