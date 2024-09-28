import React, { useEffect, useState } from "react";
import "../../../../app/pages/StaffPages/FinancialManagement/style.css";
import { useAuth } from "../../../../app/modules/auth/core/Auth";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";
import { useNavigate } from "react-router-dom";
import { CreateViewSchool } from "../../modals/create-app-stepper/CreateViewSchool";


interface CurrentUser {
  school_id: string;
}
interface DataItem {
  id: number;
  name: string;
}

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
        const response = await fetch(`${DOMAIN}/api/superadmin/get-all-schools`);
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
    <div className="d-flex" style={{ gap: "10px" }}>
      <div
        className="col-xxl-12"
        style={{
          borderRadius: "16px",
          border: "1px solid #5D637A",
          overflowX: "hidden",
          minHeight: "100%",
          marginBottom: "20px",
          height: "770px",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Manrope",
          maxWidth: "100%",
          overflow: "hidden",
        }}
      >
        <div style={{ width: "auto", height: "100%", overflow: "hidden" }}>
          <table
            style={{
              top: "223px",
              height: "612px",
              maxHeight: "100%",
              borderCollapse: "collapse",
              overflowX: "hidden",
              overflowY: "auto",
              whiteSpace: "nowrap",
              width: "100%",
            }}
          >
            <thead
              style={{
                height: "123px",
                maxHeight: "100%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#1C335C",
                justifyContent: "space-between",
                zIndex: 999,
              }}
              className="col-xxl-12 col-lg-6"
            >
              <div>
                <caption
                  style={{
                    backgroundColor: "#1C335C",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    // tableLayout: "fixed",
                    // borderCollapse: "collapse",

                    // border:'1px solid'
                    width: "100%",
                  }}
                >
                  <div>
                    <span
                      style={{
                        color: "#FFF",
                        fontSize: "16px",
                        fontWeight: "700",
                        fontFamily: "Manrope",
                      }}
                    >
                      Subscriptions List
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                      className="input-group flex-nowrap"
                      style={{
                        width: "300px",
                        height: "36px",
                        borderRadius: "8px",
                        border: "1px solid #D9D9D9",
                      }}
                    >
                      <span
                        className="input-group-text border-0 pe-1 pr-0"
                        style={{ backgroundColor: "transparent" }}
                        id="addon-wrapping"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 17 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_582_4295)">
                            <circle
                              cx="8.50002"
                              cy="7.66665"
                              r="6.33333"
                              stroke="white"
                              stroke-width="1.5"
                            />
                            <path
                              d="M14.1667 13.3333L15.5 14.6666"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_582_4295">
                              <rect
                                width="16"
                                height="16"
                                fill="white"
                                transform="translate(0.833374)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                      <input
                        type="text"
                        style={{
                          backgroundColor: "transparent",
                          color: "#FFFFFF",
                        }}
                        className="form-control border-0"
                        placeholder="Search ...."
                        aria-label="Search"
                        aria-describedby="addon-wrapping"
                      />
                    </div>
                  </div>
                </caption>
              </div>

              <tr
                style={{
                  height: "61px",
                  display: "flex",
                  paddingLeft: "30px",
                  justifyContent: "space-between",
                  width: "95%",
                  overflowY: "auto",
                  overflowX: "hidden",
                  backgroundColor: "#1C335C",
                }}
              >
                <th>
                  <div style={{ width: "0px" }}>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "600",
                        lineHeight: "18px",
                        color: "#FFFFFF",
                      }}
                    >
                      School Id
                    </span>
                  </div>
                </th>
                <th>
                  <div style={{ width: "20px" }}>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "600",
                        lineHeight: "18px",
                        color: "#FFFFFF",
                      }}
                    >
                      School Name
                    </span>
                  </div>
                </th>
                <th>
                  <div style={{ width: "10px" }}>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "600",
                        lineHeight: "18px",
                        color: "#FFFFFF",
                      }}
                    >
                      School Email
                    </span>
                  </div>
                </th>
                <th>
                  <div style={{ width: "20px" }}>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "600",
                        lineHeight: "18px",
                        color: "#FFFFFF",
                      }}
                    >
                      Subscription Type
                    </span>
                  </div>
                </th>
                <th>
                  <div style={{ width: "20px" }}>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "600",
                        lineHeight: "18px",
                        color: "#FFFFFF",
                      }}
                    >
                      Is Active
                    </span>
                  </div>
                </th>
                <th>
                  <div
                    style={{
                      width: "60px",
                      // textAlign:'left'
                      // border:'1px solid',
                      display: "flex",
                      justifyContent: "end",
                      fontFamily: "Manrope",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "600",
                        lineHeight: "18px",
                        color: "#FFFFFF",
                      }}
                    >
                      Action
                    </span>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody
              className="col-xxl-12 col-lg-6"
              style={{
                height: "105%",
                display: "flex",
                flexDirection: "column",
                minHeight: "calc(100vh - 550px)",
                overflowY: "auto",
                backgroundColor: "#F5F5F5",
              }}
            >
             {schools.map((school, index) => (
                <tr
                  key={index}
                  style={{
                    height: "80px",
                    paddingLeft: "30px",
                    paddingTop: "25px",
                    marginBottom: "5px",
                    justifyContent: "space-between",
                    width: "90%",
                    display: "flex",
                    // borderBottom:'1px solid grey'
                  }}
                >
                  <td>
                    <div
                      style={{
                        width: "60px",
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
                        {school.school_id}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div
                      style={{
                        width: "80px",
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
                        {school.name}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div
                      style={{
                        width: "120px",
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
                        {school.email}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div
                      style={{
                        width: "100px",
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
                        {school.sub_type}
                      </span>
                    </div>
                  </td>
                  <td>
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
                  </td>
                  <td>
                    <div
                      style={{
                        width: "20px",
                        display: "flex",
                        justifyContent: "space-around",
                        flexDirection: "row",
                        gap: "6px",
                        marginTop: "-8px",
                      }}
                    >
                      <button
                        type="button"
                        className="btn"
                        style={{
                          backgroundColor: "#1F3259",
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#FFF",
                        }}
                        onClick={() => handleShowModal(school.school_id)}
                      >
                        Change Subscription
                      </button>
                    </div>
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
      {/* <div
        className="col-xxl-4"
        style={{
          borderRadius: "16px",
          border: "1px solid #5D637A",
          overflowX: "hidden",
          minHeight: "100%",
          marginBottom: "20px",
          height: "280px",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Manrope",
          maxWidth: "100%",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "20px",
            backgroundColor: "#1C335C",
            height: "80px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            className=""
            id="staticBackdropLabel"
            style={{
              fontSize: "18px",
              fontWeight: "600",
              fontFamily: "Manrope",
              color: "white",
            }}
          >
            Add Subscription:
          </span>
        </div>
        <div>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "20px",
              flexDirection: "column",
              marginTop: "10px",
            }}
          >
            <div style={{ marginBottom: "23px", width: "100%" }}>
              <label
                htmlFor="name"
                className="form-label"
                style={{
                  fontSize: "12px",
                  color: "#434343",
                  fontWeight: "500",
                }}
              >
                Name
              </label>

              <div id="name">
                <input
                  className=""
                  style={{
                    height: "46px",
                    width: "100%",
                    paddingLeft: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "transparent",
                    border: "1px solid #ECEDF1",
                    borderRadius: "8px",
                  }}
                  onChange={handleInputChange}
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="Enter Name"
                  aria-expanded="false"
                  required
                />
              </div>
            </div>
            <div
              style={{
                width: "100%",
                justifyContent: "right",
                display: "flex",
              }}
            >
              <button
                type="submit"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                style={{
                  width: "118px",
                  height: "36px",
                  padding: "8px 10px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  flexShrink: "0",
                  backgroundColor: "rgba(39, 59, 99, 0.76)",
                }}
              >
                <span
                  style={{
                    color: "#FFF",
                    fontFamily: "Manrope",
                    fontSize: "12px",
                    fontWeight: "500",
                  }}
                >
                  Save
                </span>
              </button>
            </div>
          </form>
        </div>
      </div> */}
    </div>
  );
};

export { TablesWidget65 };
