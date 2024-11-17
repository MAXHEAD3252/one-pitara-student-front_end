import { SidebarMenuItemWithSub } from "./SidebarMenuItemWithSub";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { SidebarMenuHome } from "./SidebarMenuHome";
import { routesConfig } from "../../../../../app/routing/RoutesConfig";

const SidebarMenuMain = () => {
  const getPathForModule = (modulePath) => modulePath || "/";
  const getIconPath = (moduleName) => `media/logos/Front CMS.svg`;

  return (
    <>
      <SidebarMenuHome to="/" icon="media/logos/home.svg" title="Home" />
      {
        // Render only the Sidebar section from routesConfig
        routesConfig.Fee &&
        <SidebarMenuItemWithSub
          to="#"
          icon={getIconPath("Sidebar")}
          menuPlacement="right-start"
          menuTrigger="hover"
          title="Fee"
        >
          <div>
            {routesConfig.Fee
              .filter(({ sidebarName }) => sidebarName) // Only include items with a sidebarName
              .map(({ path, sidebarName }, index) => (
                <SidebarMenuItem
                key={index} // Use index as key since perm_cat_id is not present
                icon=""
                  to={getPathForModule(path)} // Mapping path to "to" property
                  title={sidebarName} // Mapping sidebarName to title
                />
              ))}
          </div>
        </SidebarMenuItemWithSub>
      }
    </>
  );
};

export { SidebarMenuMain };
