import React, { useEffect, useState } from "react";
import { DOMAIN } from "../../../../../app/routing/ApiEndpoints";
import { toAbsoluteUrl } from "../../../../helpers";
import { useAuth } from "../../../../../app/modules/auth/core/Auth";

export function MenuInner() {
  const { currentUser } = useAuth();
  const useRole = currentUser?.role_name;
  const schoolName = currentUser?.school_name;
  const schoollogopath = currentUser?.school_logo;  // This will hold the actual logo filename/path
  const [logo, setLogo] = useState('');  // State to hold the fetched logo URL
  useEffect(() => {
    const fetchLogo = async () => {
      if (!schoollogopath) return; // If no logo path is available, exit early

      try {
        const response = await fetch(`${DOMAIN}/api/school/get_school_logo`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ school_logo: schoollogopath }), // Send the actual logo path
        });

        if (!response.ok) {
          throw new Error("Failed to fetch logo");
        }

        // If the response is a file, convert it to a blob to display
        const blob = await response.blob();
        const imageObjectURL = URL.createObjectURL(blob);

        // Update your state with the image URL to display it
        setLogo(imageObjectURL);
      } catch (error) {
        console.error("Error fetching school logo:", error);
      }
    };

    fetchLogo();
  }, [schoollogopath]);  // Trigger the fetch when schoollogopath changes

  return (
    <div
      className="d-flex align-items-center gap-3"
      style={{
        padding: "8px 16px",
      }}
    >
      {/* Display the logo dynamically, fallback to superadmin or default logo */}
      <img
        alt="Logo"
        src={
          useRole === 'Super Admin' 
            ? toAbsoluteUrl('media/logos/superadmin.png') 
            : logo ? logo : toAbsoluteUrl(`media/logos/default.png`)  // Default image if logo not fetched
        }
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
