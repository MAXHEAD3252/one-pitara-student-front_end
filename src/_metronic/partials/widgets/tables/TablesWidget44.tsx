/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
// import { CreateAdminModal } from "../../../../_metronic/partials/modals/create-app-stepper/CreateAdminModal";
import { DOMAIN, getUsersBySchoolId } from "../../../../app/routing/ApiEndpoints";
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
  const [usersDetails, setUsersDetails] = useState<SchoolDetails[]>([]);
  console.log(usersDetails);
  
  const [showModal, setShowModal] = useState(false);
  // const [showEditModal, setShowEditModal] = useState(false);
  // const [empId, setEmpId] = useState(0);
  // const [editEmployee, setEditEmployee] = useState(null);
  // const [showDeleteModal, setShowDeleteModal] =useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/${getUsersBySchoolId}/${schoolId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUsersDetails(data);
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


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };


  return (
    <div
    className="card-style"
    style={{
      width: "100%",
      borderRadius: "16px",
      backgroundColor: "rgb(242, 246, 255)", 
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      marginTop: "20px",
      padding: "20px",
    }}
  >
    <div
      className="card-header"
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
        Manage Users
      </span>
      <div
        // onClick={handleAddRoles}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "8px 12px",
          backgroundColor: "#1C335C",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "background-color 0.3s",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#16294D")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#1C335C")
        }
      >
        <span
          style={{
            marginRight: "8px",
            color: "white",
            fontSize: "14px",
            fontWeight: "700",
            fontFamily: "Manrope",
          }}
        >
          Add User
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="16px"
          height="16px"
          fill="#ffffff"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M3 17.25V21h3.75l11-11.03-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
        </svg>
      </div>
    </div>
    <div
      style={{
        height: "400px", // Fixed height for the table container
        overflowY: "auto", // Enable vertical scrolling
        padding: "16px 0", // Optional: adds some padding around the table
      }}
    >
      <table
        className="table"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "10px",
          backgroundColor: "#FFFFFF", // White background for the table
          borderRadius: "12px", // Round corners for the table
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)", // Light shadow for the table
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "rgb(242, 246, 255)", // Header background color
              borderBottom: "1px solid #E0E4F0",
              fontFamily: "Manrope",
              fontWeight: "600",
              color: "#1C335C",
              fontSize: "14px",
            }}
          >
            <th
              style={{
                padding: "12px 20px",
                textAlign: "left",
              }}
            >
              User Name
            </th>
            <th
              style={{
                padding: "12px 20px",
                textAlign: "left",
              }}
            >
              User Role
            </th>
            <th
              style={{
                padding: "12px 20px",
                textAlign: "left",
              }}
            >
              User Designation
            </th>
            <th
              style={{
                padding: "12px 20px",
                textAlign: "left",
              }}
            >
              User Email
            </th>
            <th
              style={{
                padding: "12px 20px",
                textAlign: "left",
              }}
            >
              IsActive
            </th>
          </tr>
        </thead>

        <tbody>
          {usersDetails.length > 0 ? (
            usersDetails.map((usersDetail, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "rgb(242, 246, 255)" : "#FFFFFF",
                  borderBottom: "1px solid #E0E4F0",
                  fontFamily: "Manrope",
                  fontSize: "14px",
                  color: "#1C335C",
                }}
              >
                <td
                  style={{
                    padding: "12px 20px",
                  }}
                >
                  {usersDetail.name + " " + usersDetail.surname}
                </td>
                <td
                  style={{
                    padding: "12px 20px",
                  }}
                >
                  {usersDetail.role ? usersDetail.role : "Not rendered"}
                </td>
                <td
                  style={{
                    padding: "12px 20px",
                  }}
                >
                  {usersDetail.designation}
                </td>
                <td
                  style={{
                    padding: "12px 20px",
                  }}
                >
                  {usersDetail.email}
                </td>
                <td
                  style={{
                    padding: "12px 20px",
                    textAlign: "start",
                  }}
                >
                  {usersDetail.is_active === 1 ? (
                    <span
                      style={{
                        display: "inline-block",
                        padding: "4px 12px",
                        borderRadius: "12px",
                        backgroundColor: "#28a745",
                        color: "#FFFFFF",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      Active
                    </span>
                  ) : (
                    <span
                      style={{
                        display: "inline-block",
                        padding: "4px 12px",
                        borderRadius: "12px",
                        backgroundColor: "#dc3545",
                        color: "#FFFFFF",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      Inactive
                    </span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                style={{
                  padding: "12px 20px",
                  textAlign: "center",
                  color: "#1C335C",
                  fontWeight: "600",
                  fontFamily: "Manrope",
                }}
              >
                No roles assigned for this school.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export { TablesWidget44 };



