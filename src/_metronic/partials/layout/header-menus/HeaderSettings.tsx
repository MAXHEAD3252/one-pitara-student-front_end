/* eslint-disable no-constant-condition */
import { FC } from "react";
import "../../../../app/pages/StaffPages/FeeDetails/style.css";
import { useAuth } from "../../../../app/modules/auth/core/Auth";
const HeaderSettings: FC = () => {
  const { logout } = useAuth();
  return (
    <>
      <div
        className="menu menu-sub menu-sub-dropdown menu-column menu-rounded  w-200px"
        data-kt-menu="true"
        style={{padding:'10px'}}
        onMouseOver={(e) => (
            (e.currentTarget.style.backgroundColor = "lightgray"),
            (e.currentTarget.style.cursor = "pointer"),
            (e.currentTarget.style.borderRadius = "5px")
          )}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#FFF")}
      >
        <div className="menu-item">
          <a
            onClick={logout}
            style={{ fontFamily: "Manrope", fontSize: "12px", color: "black" }}
          >
            Sign Out
          </a>
        </div>
      </div>
    </>
  );
};

export { HeaderSettings };
