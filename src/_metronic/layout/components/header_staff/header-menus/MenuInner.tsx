import { toAbsoluteUrl } from "../../../../helpers";
import { useAuth } from "../../../../../app/modules/auth/core/Auth";



export function MenuInner() {
  const { currentUser } = useAuth();
  const useRole = currentUser?.role;
  const school_id = currentUser?.school_id;
  const schoolName = currentUser?.school_name;
  

  return (
    <div
      className="d-flex align-items-center gap-3"
      style={{
        padding: "8px 16px",
        // backgroundColor: "#F2F6FF",
        // borderRadius: "8px",
        // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <img
        alt="Logo"
        src={useRole === 'superadmin' ? toAbsoluteUrl(`media/logos/superadmin.png`) : toAbsoluteUrl(`media/logos/${school_id}.png`)}
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
          {schoolName ? schoolName : "Dexpert Portal"}
        </ol>
      </nav>
    </div>
  );
}
