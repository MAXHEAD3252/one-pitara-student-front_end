import React from "react";
// import "../../../../../app/pages/StaffPages/FinancialManagement/style.css";

const TablesWidget52 = () => {
  return (
    <div
      className="announcement-board"
      style={{
        width: "100%",
        borderRadius: "16px",
        backgroundColor: "rgb(242, 246, 255)",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        padding: "20px",
        fontFamily:'Manrope'
      }}
    >
      <div
        className="announcement-header"
        style={{
          backgroundColor: "rgb(242, 246, 255)",
          padding: "16px 20px",
          borderBottom: "1px solid #E0E4F0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "#1C335C",
            fontFamily: "Manrope",
          }}
        >
          Announcements
        </span>
      </div>

      <div
        style={{
          height: "535px", // Fixed height for the table container
          overflowY: "auto", // Enable vertical scrolling
          padding: "16px 0", // Optional: adds some padding around the table
        }}
      >
        <ul
          style={{
            listStyleType: "none",
            padding: "0",
            margin: "0",
          }}
        >
          {/* Single Announcement */}
          {[
            "Today is a holiday!",
            "The next parent-teacher meeting is scheduled for August 10th",
            "School will be closed for summer break from July 20th to August 5th.",
            "Congrats to the Science Fair winners!",
            "New books added to the library.",
            "Sports Day on July 30th at 9 AM.",
          ].map((announcement, index) => (
            <li
              key={index}
              style={{
                backgroundColor: index % 2 === 0 ? "#f9fafc" : "#ffffff",
                padding: "20px",
                borderRadius: "12px",
                marginBottom: "10px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)", // Subtle shadow
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "16px",
                  color: "#1C335C",
                  fontFamily: "Manrope",
                }}
              >
                {announcement}
              </span>
              <span
                style={{
                  fontWeight: "400",
                  fontSize: "14px",
                  color: "#6c757d",
                  fontFamily: "Manrope",
                }}
              >
                Just Now
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { TablesWidget52 };
