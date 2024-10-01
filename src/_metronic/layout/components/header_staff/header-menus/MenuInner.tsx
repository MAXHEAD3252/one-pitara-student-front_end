import { toAbsoluteUrl } from "../../../../helpers";
import { useAuth } from "../../../../../app/modules/auth/core/Auth";
import { useEffect } from "react";
import { DOMAIN } from "../../../../../app/routing/ApiEndpoints";



export function MenuInner() {
  const { currentUser } = useAuth();
  const useRole = currentUser?.role_name;
  const school_id = currentUser?.school_id;
  const schoolName = currentUser?.school_name;
  const schoollogopath = currentUser?.school_logo;
  const schoolsmalllogopath = currentUser?.school_small_logo;
  const schoolimage = currentUser?.school_image;
  
  console.log(schoollogopath)
  // console.log(schoolsmalllogopath)
  // console.log(schoolimage)

  useEffect(() => {
    const fetchlogo = async () => {
      try {
        console.log('hi');
        const response = await fetch(`${DOMAIN}/api/superadmin/get_school_logo`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
          },
          body: JSON.stringify({schoollogopath}), // Send the path to the backend
        });

        console.log(response)
        if (!response.ok) {
          throw new Error("Failed to fetch logo");
        }
        const data = await response.json();

      } catch (error) {
        console.error("Error fetching school details:", error);
      }
    };

    fetchlogo();
  }, []);

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
