import { toAbsoluteUrl } from "../../../../helpers";
import { useAuth } from "../../../../../app/modules/auth/core/Auth";



export function MenuInner() {
  const { currentUser } = useAuth();
  const useRole = currentUser?.role_name;
  const school_id = currentUser?.school_id;
  const schoolName = currentUser?.school_name;
  

  return (
    <div
      className="d-flex align-items-center gap-3"
      style={{
        padding: "8px 16px",
        
      }}
    >
      <img
        alt="Logo"
        src={useRole === 'Super Admin' ? toAbsoluteUrl(`media/logos/superadmin.png`) : toAbsoluteUrl(`media/logos/${school_id}.png`)}
        className="h-40px"
        style={{ objectFit: "contain", borderRadius: "4px" }}
      />

      <nav aria-label="breadcrumb" style={{ flexGrow: 1 }}>
        <ol
          className="breadcrumb mb-0"
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "16px",
            fontWeight: "500",
            color: "#1C335C",
            fontFamily: "Manrope, sans-serif",
            margin: 0,
            padding: 0,
            listStyle: "none",
          }}
        >
          {schoolName ? schoolName : "Dexpert_Portal"}
        </ol>
      </nav>
    </div>
  );
}
