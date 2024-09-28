import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import { useLocation } from "react-router";
import {
  checkIsActive,
  toAbsoluteUrl,
  WithChildren,
} from "../../../../helpers";
import { useLayout } from "../../../core";
import "../../../../../app/pages/StaffPages/FinancialManagement/style.css";
type Props = {
  to: string;
  icon?: string;
  menuTrigger?: "click" | "hover";
  menuPlacement?: "right-start" | "bottom-start" | "left-start";
  hasArrow?: boolean;
  hasBullet?: boolean;
  isMega?: boolean;
};

const SidebarMenuItemWithSub: React.FC<Props & WithChildren> = ({
  children,
  to,
  icon,
  menuTrigger,
  menuPlacement,
}) => {
  const menuItemRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  // const isActive = checkIsActive(pathname, to)
  const { config } = useLayout();
  const { app } = config;

  useEffect(() => {
    if (menuItemRef.current && menuTrigger && menuPlacement) {
      menuItemRef.current.setAttribute("data-kt-menu-trigger", menuTrigger);
      menuItemRef.current.setAttribute("data-kt-menu-placement", menuPlacement);
    }
  }, [menuTrigger, menuPlacement]);

  return (
    <div ref={menuItemRef} className="menu-item menu-lg-down-accordion">
      <div style={{display:'flex', justifyContent:'center',alignContent:'center', padding:'auto', textAlign:'center'}}>
      <span
        className={clsx("menu-link mt-2", {
          active: checkIsActive(pathname, to),
        })}
        style={{borderRadius:'0px', display:'flex', justifyContent:'center', alignItems:'center', paddingLeft:'20px'}}
      >
        {icon && app?.sidebar?.default?.menu?.iconType === "svg" && (
          <span className="menu-icon">
            {" "}
            <img
              alt="Logo"
              src={toAbsoluteUrl(icon)}
              className="h-25px app-sidebar-logo-default"
              style={{ color: "white" }}
            />
          </span>
        )}
      </span>
      </div>
      <div
        className={clsx(
          "menu-sub menu-sub-dropdown my-5 py-5 px-5"
        )}
        style={{
          borderRadius:" 0px 15px 15px 15px",
        }}
        // style={{
        //   width: "170px",
        //   fontFamily: "Manrope", // Using the Manrope font
        //   fontWeight: "500", // Reduced weight for a softer look
        //   fontSize: "14px", // Consistent font size
        //   color: "#333", // Softer black color for text
        //   borderRadius: "5px", // Rounded corners for a soft look
        //   backgroundColor: "#fff", // White background for a clean look
        //   boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow for elevation
        //   padding: "10px", // Adjust padding for inner content spacing
        //   textAlign: "left",
        // }}
        data-kt-menu-dismiss="true"
      >
        {children}
      </div>
    </div>
  );
};

export { SidebarMenuItemWithSub };

{
  /* {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )} */
}
{
  /* {fontIcon && (
          <span className='menu-icon'>
            <i className={clsx('bi fs-3', fontIcon)}></i>
          </span>
        )}

        <span className='menu-title'>{title}</span> */
}

{
  /* {hasArrow && <span className='menu-arrow'></span>} */
}
