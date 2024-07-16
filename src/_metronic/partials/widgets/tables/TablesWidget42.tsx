import React, { useEffect, useState } from "react";
import {
  DOMAIN,
  getSchoolModuleById,
} from "../../../../app/routing/ApiEndpoints";
import { useNavigate } from "react-router-dom";

interface TablesWidget42Props {
  schoolId: string | undefined;
}

interface SchoolModule {
  parent_name: string; // Replace with actual types as needed
  module_name: string;
  can_view: string;
  // Add other fields here
}

const TablesWidget42: React.FC<TablesWidget42Props> = ({ schoolId }) => {
  const [schoolModules, setSchoolModules] = useState<SchoolModule[]>([]);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/${getSchoolModuleById}/${schoolId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSchoolModules(data);
      } catch (error) {
        console.error("Error fetching school details:", error);
      }
    };

    fetchData();
  }, [schoolId]);

  const handleModules = () => () => {
    Navigate(`/superadmin/manage/academies/modules?schoolId=${schoolId}`);
  };

  return (
    <div
      className=""
      style={{
        width: "100%",
        height: "600px",
        borderRadius: "16px",
        border: "1px solid gray",
        overflow: "hidden",
      }}
    >
      <table
        className=""
        style={{
          top: "223px",
          height: "808px",
          maxHeight: "100%",
          borderCollapse: "collapse",
          // tableLayout: "fixed",
          overflowX: "hidden",
          overflowY: "auto",
          whiteSpace: "nowrap",
          width: "100%",
        }}
      >
        <thead
          style={{
            position: "sticky",
            top: "0",
            zIndex: "1",
            height: "133px",
            maxHeight: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#1C335C",
            justifyContent: "space-between",
            gap: "0px",
            padding: "9px 24px 9px 24px",
          }}
        >
          <caption
            style={{
              paddingLeft: "20px",
              paddingRight: "20px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "24px",
              padding: "0px",
            }}
          >
            <div style={{ display: "flex", gap: "10px" }}>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  lineHeight: "21.86px",
                  color: "#FFFFFF",
                  fontFamily: "Manrope",
                }}
              >
                Manage Modules
              </span>
            </div>
            <div style={{ display: "flex" }}>
              <span
                style={{
                  height: "36px",
                  borderRadius: "8px",
                  padding: "8px 10px 8px 10px",
                  gap: "5px",
                  backgroundColor: "#FFFFFF",
                  display: "flex",
                  flexDirection: "row",
                  cursor: "pointer",
                }}
                onClick={handleModules()}
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_103_1850)">
                    <path
                      d="M1.66663 10C1.66663 6.07165 1.66663 4.10746 2.88701 2.88708C4.1074 1.66669 6.07159 1.66669 9.99996 1.66669C13.9283 1.66669 15.8925 1.66669 17.1129 2.88708C18.3333 4.10746 18.3333 6.07165 18.3333 10C18.3333 13.9284 18.3333 15.8926 17.1129 17.113C15.8925 18.3334 13.9283 18.3334 9.99996 18.3334C6.07159 18.3334 4.1074 18.3334 2.88701 17.113C1.66663 15.8926 1.66663 13.9284 1.66663 10Z"
                      stroke="black"
                      stroke-width="1.5"
                    />
                    <path
                      d="M12.5 10L10 10M10 10L7.5 10M10 10L10 7.5M10 10L10 12.5"
                      stroke="black"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_103_1850">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <div style={{ width: "75px", height: "9px" }}>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "500",
                      color: "#000000",
                      lineHeight: "16.39px",
                      fontFamily: "Manrope",
                    }}
                  >
                    {schoolModules.length === 0
                      ? "Add Modules"
                      : "Edit Modules"}
                  </span>
                </div>
              </span>
            </div>
          </caption>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <tr
              style={{
                width: "100%",
                height: "34px",
                display: "flex",
                paddingRight: "24px",
                // justifyContent: "space-between",
                gap: "60px",
                // backgroundColor:'#1C335C',
                // backgroundColor:'#F5F5F5',
                // paddingLeft: "15px",
                // paddingTop: "15px",
                // paddingRight:'35px'
              }}
            >
              <th style={{ width: "10%", height: "18px" }}>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    lineHeight: "18px",
                    color: "#FFFFFF",
                    position: "sticky",
                    top: "0",
                    zIndex: "1",
                    fontFamily: "Manrope",
                  }}
                >
                  Id
                </span>
              </th>
              <th style={{ width: "32%", height: "18px" }}>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    lineHeight: "18px",
                    color: "#FFFFFF",
                    position: "sticky",
                    top: "0",
                    zIndex: "1",
                    fontFamily: "Manrope",
                  }}
                >
                  Group Name
                </span>
              </th>
              <th style={{ width: "30%", height: "18px" }}>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    lineHeight: "18px",
                    color: "#FFFFFF",
                    position: "sticky",
                    top: "0",
                    zIndex: "1",
                    fontFamily: "Manrope",
                  }}
                >
                  Module Name
                </span>
              </th>
              <th style={{ width: "fit-content", height: "18px" }}>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    lineHeight: "18px",
                    color: "#FFFFFF",
                    position: "sticky",
                    top: "0",
                    zIndex: "1",
                    fontFamily: "Manrope",
                  }}
                >
                  Can View
                </span>
              </th>
            </tr>
          </div>
        </thead>
        <tbody
          className=""
          style={{
            display: "block",
            height: "465px",
            overflowY: "auto",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              height: "61px",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              backgroundColor: "#F7F9FB",
              flexDirection: "column",
            }}
          >
            {schoolId ? (
              schoolModules?.map((moduleDetail, index) => (
                <tr
                  key={index}
                  style={{
                    width: "100%",
                    height: "61px",
                    display: "flex",
                    paddingLeft: "24px",
                    backgroundColor: index % 2 === 0 ? "#F7F9FB" : "#FFFFFF",
                    paddingTop: "18px",
                    gap: "60px",
                    paddingBottom: "15px",

                    // justifyContent: "space-between",
                  }}
                >
                  <td style={{ width: "10%" }}>
                    <div
                      className=""
                      style={{
                        width: "fit-content",
                        display: "flex",
                        justifyContent: "start",
                        flexDirection: "column",
                      }}
                    >
                      <a
                        href="#"
                        className=""
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "14px",
                          fontWeight: "700",
                          color: "#000",
                        }}
                      >
                        {index}
                      </a>
                    </div>
                  </td>
                  <td style={{ width: "30%" }}>
                    <div
                      style={{
                        width: "fit-content",
                        display: "flex",
                        marginRight: "25px",
                        justifyContent: "start",
                        flexDirection: "column",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "400",
                          lineHeight: "18px",
                          color: "#1F1F1F",
                          fontFamily: "Manrope",
                        }}
                      >
                        {moduleDetail.parent_name}
                      </span>
                    </div>
                  </td>
                  <td style={{ width: "30%" }}>
                    <div
                      style={{
                        width: "fit-content",
                        display: "flex",
                        justifyContent: "start",
                        flexDirection: "column",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "400",
                          lineHeight: "18px",
                          color: "#1F1F1F",
                          fontFamily: "Manrope",
                        }}
                      >
                        {moduleDetail.module_name}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div
                      style={{
                        width: "fit-content",
                        display: "flex",
                        marginRight: "25px",
                        justifyContent: "start",
                        flexDirection: "column",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "400",
                          lineHeight: "18px",
                          color: "#1F1F1F",
                          fontFamily: "Manrope",
                        }}
                      >
                        {moduleDetail.can_view}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  /* @ts-ignore */
                  colSpan="5"
                >
                  No Modules Assign to the school
                </td>
              </tr>
            )}
          </div>
        </tbody>
        {/* end::Table body */}
      </table>
      {/* end::Table */}
    </div>
  );
};

export { TablesWidget42 };
