import { SidebarMenuItemWithSub } from "./SidebarMenuItemWithSub";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { useAuth } from "../../../../../app/modules/auth/core/Auth";
import { Key, useEffect, useState } from "react";
import { routesConfig } from "../../../../../app/routing/RoutesConfig";
import { DOMAIN } from "../../../../../app/routing/ApiEndpoints";

const SidebarMenuMain = () => {
  const { currentUser } = useAuth();
  const userRole = currentUser?.role;
  const userRoleName = currentUser?.roleName;
  const role_id = currentUser?.roleId;
  const [modulesData, setModulesData] = useState([]);
  const [subscriptionId, setSubscriptionId] = useState(null);
  const school_id = currentUser?.school_id;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const schoolId = school_id;
    const fetchSubscriptionId = async () => {
        try {
            const response = await fetch(`${DOMAIN}/api/superadmin/get-subscription-id/${schoolId}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            
            setSubscriptionId(data.result[0]?.subscription_id);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    if (schoolId) {
        fetchSubscriptionId();
    } else {
        setLoading(false);
    }
}, [school_id]);


  

  useEffect(() => {
    if (!currentUser) return;
    
    const fetchData = async () => {
      try {
        
        let apiUrl;
        switch (userRole) {
          case "admin":
            apiUrl = `${DOMAIN}/api/superadmin/get-parent-module/${subscriptionId}`;
            break;
          case "staff":
            apiUrl = `${DOMAIN}/api/staff/get-modules/${school_id}/${role_id}`;
            break;
          case "student":
            apiUrl = `${DOMAIN}/api/student/get-student-modules/${school_id}/${role_id}`;
            break;
          case "superadmin":
            apiUrl = `${DOMAIN}/api/superadmin/get-modules`;
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
  }, [currentUser,subscriptionId,school_id]);

  
  const getPathForModule = (moduleName: string) => {
    let userRoutes;
    if (userRole === "admin" || userRole === "superadmin") {
      userRoutes = routesConfig[userRole];
    }else{
      /* @ts-ignore */
      userRoutes = routesConfig[userRoleName];
      
    }
    const matchedRoute = userRoutes?.find(
      /* @ts-ignore */
      (route) => route.sidebarName === moduleName
    );
    
    

    return matchedRoute ? matchedRoute.path : "/";
  };


  const getIconPath = (moduleName: string) => {    
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
            
            {
            /* @ts-ignore */
            modulesData[key].map((moduleDataItem: string[], index: Key | null | undefined) => (
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
