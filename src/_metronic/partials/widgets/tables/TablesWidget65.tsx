import React, { useEffect, useState } from "react";
import "../../../../app/pages/StaffPages/FinancialManagement/style.css";
import { useAuth } from "../../../../app/modules/auth/core/Auth";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";
import { CreateViewSchool } from "../../modals/create-app-stepper/CreateViewSchool";

const TablesWidget65 = () => {
  const [schools, setSchools] = useState([]);
  console.log(schools);

  const { currentUser } = useAuth();
  const schoolId = currentUser?.school_id;
  const [showViewSchoolModal, setShowViewSchoolModal] = useState(false);
  const [selectedSchoolId, setSelectedSchoolId] = useState(null); // Keep track of selected school
  const [refresh, setRefresh] = useState(false);
  const [selectedSchoolDetails, setSelectedSchoolDetails] = useState(null);

  // Fetch the schools list
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/api/superadmin/get-all-schools`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch schools");
        }
        const responseData = await response.json();
        setSchools(responseData);
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };
    setRefresh(false);
    fetchSchools();
  }, [refresh]);

  // Handle modal show for the specific school
  const handleShowModal = (schoolId) => {
    const school = schools.find((s) => s.school_id === schoolId);
    if (school) {
      setSelectedSchoolDetails(school);
      setSelectedSchoolId(schoolId);
      setShowViewSchoolModal(true);
    }
  };

  const handleModalClose = () => {
    setShowViewSchoolModal(false);
    setSelectedSchoolId(null);
    setSelectedSchoolDetails(null);
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
          Manage Schools with Subscriptions List
        </span>
      </div>
      <div
        style={{
          height: "650px", // Fixed height for the table container
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
            fontFamily:'Manrope'
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
                School Id
              </th>
              <th
                style={{
                  padding: "12px 20px",
                  textAlign: "left",
                }}
              >
                    School Name
              </th>
              <th
                style={{
                  padding: "12px 20px",
                  textAlign: "left",
                }}
              >
                    School Email
              </th>
              <th
                style={{
                  padding: "12px 20px",
                  textAlign: "left",
                }}
              >
                    Subscription Type
              </th>
              <th
                style={{
                  padding: "12px 20px",
                  textAlign: "left",
                }}
              >
                    Is Active
              </th>
              <th
                style={{
                  padding: "12px 20px",
                  textAlign: "right",
                }}
              >
                    Action
              </th>
            </tr>
          </thead>

          <tbody>
            {schools.map((school, index) => (
              <tr
              key={index}
              style={{
                backgroundColor:
                  index % 2 === 0 ? "rgb(242, 246, 255)" : "#FFFFFF",
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
                      {school.school_id}
                </td>
                <td
                    style={{
                      padding: "12px 20px",
                    }}
                  >
                      {school.name}
                </td>
                <td
                    style={{
                      padding: "12px 20px",
                    }}
                  >
                      {school.email}
                </td>
                <td
                    style={{
                      padding: "12px 20px",
                    }}
                  >
                      {school.sub_type}
                </td>
                {/* <td>
                  <div
                    style={{
                      width: "0px",
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        lineHeight: "18px",
                        color: "#1F1F1F",
                        fontFamily: "Manrope",
                      }}
                    >
                      {school.is_active === 1 ? "Active" : "Not Active"}
                    </span>
                  </div>
                </td> */}
                <td
                    style={{
                      padding: "12px 20px",
                      textAlign: "start",
                    }}
                  >
                    {school.is_active === 1 ? (
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
                <td
                style={{
                      display: "flex",
                      gap: "10px", // Adds space between the buttons
                      justifyContent: "right", // Aligns buttons horizontally in the center
                      alignItems: "center", // Vertically centers the buttons
                      padding: "12px 20px",
                    }}
                  >
                    <button
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
                      onClick={() => handleShowModal(school.school_id)}
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
                      Change Subscription
                      </span>
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
          {selectedSchoolDetails && (
            <CreateViewSchool
              show={showViewSchoolModal}
              handleClose={handleModalClose}
              school_id={selectedSchoolId} // Pass selected school ID
              setRefresh={setRefresh}
              previousSubscription={selectedSchoolDetails.sub_type} // Pass previous subscription type
              previousSubscriptionId={selectedSchoolDetails.subscription_id} // Pass previous subscription ID
            />
          )}
        </table>
      </div>
    </div>
  );
};

export { TablesWidget65 };
