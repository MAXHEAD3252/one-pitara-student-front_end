import { FC } from "react";
import "../../../../app/pages/StaffPages/FinancialManagement/style.css";
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
          <i className="fas fa-user" style={{ marginRight: '8px', color: '#000' }}></i>
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
          <i className="fas fa-cog" style={{ marginRight: '8px', color: '#000' }}></i>
          <a
            href="#"
            onMouseOver={(e) => (e.currentTarget.style.color = "blue")}
            onMouseOut={(e) => (e.currentTarget.style.color = "black")}
            style={{ fontFamily: "Manrope", fontSize: "14px", color: "black", }}
          >
            Account
          </a>
        </div>
        <div className="menu-item" style={{ display: 'flex', alignItems: 'center', margin:'6px 0px 6px 0px'}}>
          <i className="fas fa-question-circle" style={{ marginRight: '8px', color: '#000' }}></i>
          <a
            href="#"
            onMouseOver={(e) => (e.currentTarget.style.color = "blue")}
            onMouseOut={(e) => (e.currentTarget.style.color = "black")}
            style={{ fontFamily: "Manrope", fontSize: "14px", color: "black", }}
          >
            Support
          </a>
        </div>
        <div className="menu-item" style={{ display: 'flex', alignItems: 'center', margin:'6px 0px 6px 0px'}}>
          <i className="fas fa-sign-out-alt" style={{ marginRight: '8px', color: '#000' }}></i>
          <a
            onClick={logout}
            onMouseOver={(e) => (e.currentTarget.style.color = "blue")}
            onMouseOut={(e) => (e.currentTarget.style.color = "black")}
            style={{ fontFamily: "Manrope", fontSize: "14px", color: "black", cursor: 'pointer' }}
          >
            Sign Out
          </a>
        </div>
      </div>
    </>
  );
};

export { HeaderSettings };