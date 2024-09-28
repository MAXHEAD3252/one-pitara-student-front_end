import { SidebarMenuItemWithSub } from "./SidebarMenuItemWithSub";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { useAuth } from "../../../../../app/modules/auth/core/Auth";
import { useEffect, useState } from "react";
import { DOMAIN } from "../../../../../app/routing/ApiEndpoints";
import { SidebarMenuHome } from "./SidebarMenuHome";

const SidebarMenuMain = () => {
  const { currentUser } = useAuth();
  
  const userRole = currentUser?.role_name;
  const role_id = currentUser?.role_id;
  const designation_id = currentUser?.designation_id;
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
          case "Super Admin":
            apiUrl = `${DOMAIN}/api/superadmin/get-modules`;
            break;
          case "School Admin": 
            apiUrl = `${DOMAIN}/api/superadmin/get-parent-module/${subscriptionId}`;
            break;
          case "School Staff":
            apiUrl = `${DOMAIN}/api/school/get-modules/${school_id}/${role_id}/${designation_id}`;
            break;
          case "student":
            apiUrl = `${DOMAIN}/api/student/get-student-modules/${school_id}/${role_id}/${designation_id}`;
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
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currentUser, subscriptionId, school_id,role_id,designation_id]);

  const getPathForModule = (modulePath) => modulePath || "/";

  const getIconPath = (moduleName) => `media/logos/${moduleName}.svg`;

  return (
    <>
      <SidebarMenuHome to="/" icon="media/logos/home.svg" />
      {userRole === "Super Admin" || userRole === "School Admin" || userRole === "School Staff" ? (
        // If user is Super Admin, render using modulesData directly
        Object.keys(modulesData).length > 0 &&
        Object.keys(modulesData).map((perm_group_name, index) => (
          <SidebarMenuItemWithSub
            key={index}
            to="#"
            icon={getIconPath(perm_group_name)}
            menuPlacement="right-start"
            menuTrigger="hover"
          >
            <div style={{paddingBottom: "5px", borderBottom:'1px solid lightgray' }}>
              <span
                className="menu-section"
                style={{
                  color: "#000",
                  fontFamily: "Manrope",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                {perm_group_name}
              </span>
            </div>
            <div style={{marginTop:'6px'}}>
            {modulesData[perm_group_name]
              .filter(({ sidebar_name }) => sidebar_name) // Filter out items with no sidebar_name
              .map(
                (
                  { perm_cat_id, path, sidebar_name },
                  index
                ) => (
                  <SidebarMenuItem
                    key={perm_cat_id} // Using perm_cat_id as the unique key
                    icon=""
                    to={getPathForModule(path)} // Mapping path to "to" property
                    title={sidebar_name} // Mapping sidebar_name to title, display only if available
                  />
                )
              )}
            </div>
          </SidebarMenuItemWithSub>
        ))
      ) : (
        // For other roles, use existing logic
        Object.keys(modulesData).length > 0 &&
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
        ))
      )}
    </>
  );
};

export { SidebarMenuMain };
