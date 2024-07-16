import React, { useEffect, useState } from "react";
import { CreateAdminModal } from "../../../../_metronic/partials/modals/create-app-stepper/CreateAdminModal";
import { DOMAIN,getAssignedRoles } from "../../../../app/routing/ApiEndpoints";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const TablesWidget52 =  () => {
//   const [academyDetails, setAcademyDetails] = useState([]);
//   const [roleName, setRoleName] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `${DOMAIN}/api/superadmin/get-roles`
//         );
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         console.log(data);
        
//         setAcademyDetails(data);
//         // console.log(data);
//       } catch (error) {
//         console.error("Error fetching academy details:", error);
//       }
//     };

//     fetchData();
//   }, []);


//   const handleRoleNameChange = (e) => {
//     setRoleName(e.target.value);
//   };

//   const handleAddRoles = async (e) => {
//     e.preventDefault();
//     if (!roleName.trim()) {
//       toast.error("Role name cannot be empty", { autoClose: 3000 });
//       return;
//     }

//     try {
//       const response = await fetch(`${DOMAIN}/api/superadmin/add-role`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         }, 
//         body: JSON.stringify({ role_name: roleName}), // Assuming academy_id is 1 for this example
//       });

//       if (!response.ok) {
//         console.log("Error occurred while sending data.");
//         toast.error("An error occurred!", { autoClose: 3000 });
//       } else {
//         toast.success("Role added successfully.", { autoClose: 3000 });
//         setRoleName("");
//         // Re-fetch roles to update the table
//         const updatedRoles = await fetch(`${DOMAIN}/api/superadmin/get-roles`);
//         const updatedRolesData = await updatedRoles.json();
//         setAcademyDetails(updatedRolesData);
//       }
//     } catch (err) {
//       console.log(err);
//       toast.error("Failed to communicate with server!", { autoClose: 3000 });
//     }
//   };


//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

  return (
    <div
      className=""
      style={{
        width: "100%",
        height: "400px",
        borderRadius: "16px",
        // border: "1px solid #F5F5F5",
        overflow: "hidden",
        border: "1px solid gray",
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
            height: "83px",
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
                Announcements
              </span>
            </div>
            {/* <div style={{ display: "flex" }}>
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
                data-bs-toggle="modal"
                data-bs-target="#addRoleModal"
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
                <div style={{ width: "65px", height: "9px" }}>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "500",
                      color: "#000000",
                      lineHeight: "16.39px",
                      fontFamily: "Manrope",
                    }}
                  >
                    Add Roles
                  </span>
                </div>
              </span>
            </div> */}
           
          </caption>
          {/* <div style={{ display: "flex", justifyContent: "center" }}>
            <tr
              style={{
                width: "100%",
                height: "34px",
                display: "flex",
                paddingRight: "24px",
                justifyContent: "space-between",
                gap: "30px",
                // backgroundColor:'#1C335C',
                // backgroundColor:'#F5F5F5',
                // paddingLeft: "15px",
                // paddingTop: "15px",
                // paddingRight:'35px'
              }}
            >
              <th style={{ width: "15%", height: "18px" }}>
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
              <th style={{ width: "25%", height: "18px" }}>
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
                  Name
                </span>
              </th>
              <th style={{ width: "25%", height: "18px" }}>
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
                  Created At
                </span>
              </th>
            </tr>
          </div> */}
        </thead>
        <tbody
          className=""
          style={{
            display: "block",
            height: "315px",
            // border:'1px solid',
            overflowY: "auto",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            className="tile-shadow"
            style={{
              display: "flex",
              height: "61px",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            //   backgroundColor: "#F7F9FB",
              flexDirection: "column",
            }}
          >
            {/* {academyDetails ? (
              academyDetails.map((academyDetail, index) => ( */}
                <tr
                //   key={index}
                  style={{
                    width: "100%",
                    height: "61px",
                    display: "flex",
                    paddingLeft: "24px",
                    paddingRight: "24px",
                    justifyContent:'space-between',
                    backgroundColor:"#F7F9FB",
                    paddingTop: "18px",
                    paddingBottom: "15px",
                  }}
                >
                  <td style={{ width: "100%", display:'flex', justifyContent:'space-between',}}>
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
                        className=""
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "14px",
                          fontWeight: "700",
                          color: "#000",
                        }}
                      >
                        {/* {academyDetail.id} */}
                        {"Today is a holiday !"}

                      </a>
                    </div>
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
                        className=""
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#000",
                        }}
                      >
                        {/* {academyDetail.id} */}
                        {"Just Now"}

                      </a>
                    </div>
                  </td>
                </tr>
                <tr
                //   key={index}
                  style={{
                    width: "100%",
                    height: "61px",
                    display: "flex",
                    paddingLeft: "24px",
                    paddingRight: "24px",
                    justifyContent:'space-between',
                    backgroundColor:"#F7F9FB",
                    paddingTop: "18px",
                    paddingBottom: "15px",
                  }}
                >
                  <td style={{ width: "100%", display:'flex', justifyContent:'space-between',}}>
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
                        className=""
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "14px",
                          fontWeight: "700",
                          color: "#000",
                        }}
                      >
                        {/* {academyDetail.id} */}
                        {"The next parent-teacher meeting is scheduled for August 10th"}

                      </a>
                    </div>
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
                        className=""
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#000",
                        }}
                      >
                        {/* {academyDetail.id} */}
                        {"Just Now"}

                      </a>
                    </div>
                  </td>
                </tr>
                <tr
                //   key={index}
                  style={{
                    width: "100%",
                    height: "61px",
                    display: "flex",
                    paddingLeft: "24px",
                    paddingRight: "24px",
                    justifyContent:'space-between',
                    backgroundColor:"#F7F9FB",
                    paddingTop: "18px",
                    paddingBottom: "15px",
                  }}
                >
                  <td style={{ width: "100%", display:'flex', justifyContent:'space-between',}}>
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
                        className=""
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "14px",
                          fontWeight: "700",
                          color: "#000",
                        }}
                      >
                        {/* {academyDetail.id} */}
                        {"School will be closed for summer break from July 20th to August 5th."}

                      </a>
                    </div>
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
                        className=""
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#000",
                        }}
                      >
                        {/* {academyDetail.id} */}
                        {"Just Now"}

                      </a>
                    </div>
                  </td>
                </tr>
                <tr
                //   key={index}
                  style={{
                    width: "100%",
                    height: "61px",
                    display: "flex",
                    paddingLeft: "24px",
                    paddingRight: "24px",
                    justifyContent:'space-between',
                    backgroundColor:"#F7F9FB",
                    paddingTop: "18px",
                    paddingBottom: "15px",
                  }}
                >
                  <td style={{ width: "100%", display:'flex', justifyContent:'space-between',}}>
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
                        className=""
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "14px",
                          fontWeight: "700",
                          color: "#000",
                        }}
                      >
                        {/* {academyDetail.id} */}
                        {"Congrats to the Science Fair winners!"}

                      </a>
                    </div>
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
                        className=""
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#000",
                        }}
                      >
                        {/* {academyDetail.id} */}
                        {"Just Now"}

                      </a>
                    </div>
                  </td>
                </tr>
                <tr
                //   key={index}
                  style={{
                    width: "100%",
                    height: "61px",
                    display: "flex",
                    paddingLeft: "24px",
                    paddingRight: "24px",
                    justifyContent:'space-between',
                    backgroundColor:"#F7F9FB",
                    paddingTop: "18px",
                    paddingBottom: "15px",
                  }}
                >
                  <td style={{ width: "100%", display:'flex', justifyContent:'space-between',}}>
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
                        className=""
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "14px",
                          fontWeight: "700",
                          color: "#000",
                        }}
                      >
                        {/* {academyDetail.id} */}
                        {"New books added to the library."}

                      </a>
                    </div>
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
                        className=""
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#000",
                        }}
                      >
                        {/* {academyDetail.id} */}
                        {"Just Now"}

                      </a>
                    </div>
                  </td>
                </tr>
                <tr
                //   key={index}
                  style={{
                    width: "100%",
                    height: "61px",
                    display: "flex",
                    paddingLeft: "24px",
                    paddingRight: "24px",
                    justifyContent:'space-between',
                    backgroundColor:"#F7F9FB",
                    paddingTop: "18px",
                    paddingBottom: "15px",
                  }}
                >
                  <td style={{ width: "100%", display:'flex', justifyContent:'space-between',}}>
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
                        className=""
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "14px",
                          fontWeight: "700",
                          color: "#000",
                        }}
                      >
                        {/* {academyDetail.id} */}
                        {"Sports Day on July 30th at 9 AM."}

                      </a>
                    </div>
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
                        className=""
                        style={{
                          fontFamily: "Manrope",
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#000",
                        }}
                      >
                        {/* {academyDetail.id} */}
                        {"Just Now"}

                      </a>
                    </div>
                  </td>
                </tr>
             
              
          </div>
        </tbody>
        <div
        className="modal fade"
        id="addRoleModal"
        // tabIndex="-1"
        aria-labelledby="addRoleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addRoleModalLabel">
                Add Role
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form 
            //   onSubmit={handleAddRoles}
              >
                <div className="form-group">
                  <label htmlFor="roleName" className="form-label">
                    Role Name
                  </label>
                  <input
                    type="text"
                    id="roleName"
                    // value={roleName}
                    // onChange={handleRoleNameChange}
                    className="form-control"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                  Add Role
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
        {/* end::Table body */}
      </table>
      {/* end::Table */}
    </div>
  );
};

export { TablesWidget52 };
