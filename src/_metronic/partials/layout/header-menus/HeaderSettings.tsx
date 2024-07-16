/* eslint-disable no-constant-condition */
import { FC  } from "react";
import "../../../../app/pages/StaffPages/FeeDetails/style.css";
import { useAuth } from "../../../../app/modules/auth/core/Auth";
const HeaderSettings: FC = () => {
  const { logout } = useAuth();
 
  return (
    <>
      <div
        className="menu menu-sub menu-sub-dropdown menu-column menu-rounded-12 w-150px"
        data-kt-menu="true"
        style={{ padding: '10px 0px 10px 20px'}}
        onMouseOver={(e) => (
          (e.currentTarget.style.backgroundColor = "white"),
          (e.currentTarget.style.cursor = "pointer"),
          (e.currentTarget.style.borderRadius = "5px")
        )}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#FFF")}
      >
        <div className="menu-item" style={{ display: 'flex', alignItems: 'center', margin:'6px 0px 6px 0px'}}>
          <a
            href="#"
            onMouseOver={(e) => (e.currentTarget.style.color = "blue")}
            onMouseOut={(e) => (e.currentTarget.style.color = "black")}
            style={{ fontFamily: "Manrope", fontSize: "14px", color: "black", }}
          >
            Profile
          </a>
        </div>
        <div className="menu-item" style={{ display: 'flex', alignItems: 'center', margin:'6px 0px 6px 0px'}}>
          <a
            href="#"
            onMouseOver={(e) => (e.currentTarget.style.color = "blue")}
            onMouseOut={(e) => (e.currentTarget.style.color = "black")}
            style={{ fontFamily: "Manrope", fontSize: "12px", color: "black",paddingBottom:'3px' }}
          >
            Account
          </a>
        </div>
        <div className="menu-item" style={{ display: 'flex', alignItems: 'center', margin:'6px 0px 6px 0px'}}>
          <a
            href="#"
            onMouseOver={(e) => (e.currentTarget.style.color = "blue")}
            onMouseOut={(e) => (e.currentTarget.style.color = "black")}
            style={{ fontFamily: "Manrope", fontSize: "12px", color: "black" ,paddingBottom:'3px'}}
          >
            Support
          </a>
        </div>
        <div className="menu-item" style={{ display: 'flex', alignItems: 'center', margin:'6px 0px 6px 0px'}}>
          <a
            onClick={logout}
            onMouseOver={(e) => (e.currentTarget.style.color = "blue")}
            onMouseOut={(e) => (e.currentTarget.style.color = "black")}
            style={{ fontFamily: "Manrope", fontSize: "12px", color: "black" ,paddingBottom:'3px'}}
          >
            Sign Out
          </a>
        </div>
      </div>
    </>
  );
  
};

export { HeaderSettings };
