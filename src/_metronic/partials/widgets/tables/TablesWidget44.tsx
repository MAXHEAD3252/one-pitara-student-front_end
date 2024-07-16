/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { CreateAdminModal } from "../../../../_metronic/partials/modals/create-app-stepper/CreateAdminModal";
import { DOMAIN, getAdminBySchoolId } from "../../../../app/routing/ApiEndpoints";
// import { CreateEditEmployee } from "../../modals/create-app-stepper/CreateEditEmployee";
// import  CreateDeleteEmployee  from "../../modals/create-app-stepper/CreateDeleteEmployee";

interface TablesWidget44Props {
  schoolId: string | undefined;
}
interface SchoolDetails {
  employee_id: number;
  name: string;
  surname: string;
  email: string;
  contact_no: string;
  // Add more properties as per your actual data structure
}

const TablesWidget44: React.FC<TablesWidget44Props> = ({ schoolId }:any) => {
  const [schoolDetails, setSchoolDetails] = useState<SchoolDetails[]>([]);
  const [showModal, setShowModal] = useState(false);
  // const [showEditModal, setShowEditModal] = useState(false);
  // const [empId, setEmpId] = useState(0);
  // const [editEmployee, setEditEmployee] = useState(null);
  // const [showDeleteModal, setShowDeleteModal] =useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/${getAdminBySchoolId}/${schoolId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSchoolDetails(data);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching school details:", error);
      }
    };

    fetchData();
  }, [schoolId]);

  const handleAddSuperAdmin = () => {
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // const handleModalEdit = (employeeId) => {
  //     setShowEditModal(true);
  //     setEmpId(employeeId)
  // };

  // const handleModalEditClose = () => {
  //   setShowEditModal(false);
  //   setEditEmployee(null); // Reset editEmployee state after closing modal
  // };

  // const handleDeleteModal =(employeeId) =>{
  //   setShowDeleteModal(true);
  //   setEmpId(employeeId)
  // }

  // const handleDeleteModalClose = () =>{
  //   setShowDeleteModal(false);

  // }

  return (
    <div
      className=" table-widget"
      style={{
        width: "100%",
        height: "600px",
        borderRadius: "16px",
        // border: "1px solid #F5F5F5",
        overflow: "hidden",
        border: "1px solid gray",
      }}
    >
      <table
        className="table"
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
            <div style={{ display: "flex" }}>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  lineHeight: "21.86px",
                  color: "#FFFFFF",
                  fontFamily: "Manrope",
                }}
              >
                Manage Employees
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
                onClick={handleAddSuperAdmin}
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
                  <g clipPath="url(#clip0_103_1850)">
                    <path
                      d="M1.66663 10C1.66663 6.07165 1.66663 4.10746 2.88701 2.88708C4.1074 1.66669 6.07159 1.66669 9.99996 1.66669C13.9283 1.66669 15.8925 1.66669 17.1129 2.88708C18.3333 4.10746 18.3333 6.07165 18.3333 10C18.3333 13.9284 18.3333 15.8926 17.1129 17.113C15.8925 18.3334 13.9283 18.3334 9.99996 18.3334C6.07159 18.3334 4.1074 18.3334 2.88701 17.113C1.66663 15.8926 1.66663 13.9284 1.66663 10Z"
                      stroke="black"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M12.5 10L10 10M10 10L7.5 10M10 10L10 7.5M10 10L10 12.5"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
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
                    Add Admin
                  </span>
                </div>
              </span>
            </div>
            <CreateAdminModal
              show={showModal}
              onHide={handleCloseModal}
              schoolId={schoolId}
            />
          </caption>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <tr
              style={{
                width: "100%",
                height: "34px",
                display: "flex",
                paddingRight: "24px",
                gap: "30px",
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
              <th style={{ width: "20%", height: "18px" }}>
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
                  Email
                </span>
              </th>
              <th
                style={{
                  width: "20%",
                  height: "18px",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
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
                  Contact No.
                </span>
              </th>
              <th
                style={{
                  width: "20%",
                  height: "18px",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
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
                  Action
                </span>
              </th>
            </tr>
          </div>
        </thead>
        <tbody
          className=""
          style={{
            display: "block",
            height: "265px",
            overflowY: "auto",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
          }}
        >
          {schoolDetails.length > 0 ? (
            schoolDetails.map((schoolDetail, index) => (
              <tr
                key={index}
                style={{
                  width: "100%",
                  height: "61px",
                  display: "flex",
                  paddingLeft: "24px",
                  backgroundColor: index % 2 === 0 ? "#F7F9FB" : "#FFFFFF",
                  paddingTop: "18px",
                  paddingBottom: "15px",
                }}
              >
                <td style={{ width: "13%" }}>
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
                      {schoolDetail.employee_id}
                    </a>
                  </div>
                </td>
                <td style={{ width: "22%" }}>
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
                      {schoolDetail.name + " " + schoolDetail.surname}
                    </span>
                  </div>
                </td>
                <td style={{ width: "43%" }}>
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
                      {schoolDetail.email}
                    </span>
                  </div>
                </td>
                <td style={{ width: "25%" }}>
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
                      {schoolDetail.contact_no}
                    </span>
                  </div>
                </td>
                <td>
                  <div
                    style={{
                      width: "150px",
                      display: "flex",
                      justifyContent: "space-around ",
                      flexDirection: "row",
                      gap: "6px",
                      marginTop: "-8px",
                      marginRight: "8px"
                    }}
                  >
                    <button
                      type="button"
                      className="btn"
                      style={{
                        backgroundColor: "#1F3259",
                        fontFamily: 'Manrope',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#FFF'
                      }}
                      // onClick={() => handleModalEdit(schoolDetail.employee_id)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn"
                      style={{
                        backgroundColor: "#FF0000",
                        fontFamily: 'Manrope',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#FFF'
                      }}
                      // onClick={() => handleDeleteModal(schoolDetail.employee_id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
              
              /* @ts-ignore */
              colSpan="5">No Admins for the school</td>
            </tr>
          )}
          {/* <CreateEditEmployee show={showEditModal} handleClose={handleModalEditClose} empId={empId} school_id={schoolId}/>
          <CreateDeleteEmployee show={showDeleteModal} empId={empId} handleClose={handleDeleteModalClose}  school_id={schoolId}
        /> */}
        </tbody>
        {/* end::Table body */}
      </table>
      {/* end::Table */}
    </div>
  );
};

export { TablesWidget44 };