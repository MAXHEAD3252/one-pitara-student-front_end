import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DOMAIN, getStaffRoles } from "../../../../app/routing/ApiEndpoints";
import { useAuth } from "../../../../app/modules/auth";


const TablesWidget28 = () => {
  const [schoolRoles, setSchoolRoles] = useState([]);
  const { currentUser } = useAuth();
  const schoolId = currentUser?.school_id;

  const [roleId, setRoleId] = useState(null);
  const Navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${DOMAIN}/${getStaffRoles}/${schoolId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSchoolRoles(data);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching school details:", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = (roleId) => {
    setRoleId(roleId);
    Navigate("/user-roles/permission", { state: { roleId } });
  };

  return (
    <div className="d-flex" style={{ gap: "10px" }}>
      <div
        className="col-xxl-8"
        style={{
          borderRadius: "16px",
          border: "1px solid #5D637A",
          overflowX: "hidden",
          minHeight: "100%",
          marginBottom: "20px",
          height: "840px",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Manrope",
          maxWidth: "100%",
          overflow: "hidden",
        }}
      >
        <div style={{ width: "auto", height: "100%", overflow: "hidden" }}>
          <table
            //   className="col-xxl-12"
            style={{
              top: "223px",
              height: "612px",
              maxHeight: "100%",
              borderCollapse: "collapse",
              // tableLayout: "fixed",
              overflowX: "hidden",
              overflowY: "auto",
              whiteSpace: "nowrap",
              width: "100%",
              // border:'8px solid black'
            }}
          >
            <thead
              style={{
                height: "123px",
                maxHeight: "100%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#1C335C",
                //   width:'fit-content',
                // overflowY: "auto",
                // overflowX: "hidden",
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
                      All User Roles
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
                  <div style={{ width: "40px" }}>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "600",
                        lineHeight: "18px",
                        color: "#FFFFFF",
                      }}
                    >
                      Role Name
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
              }}
            >
              {schoolRoles &&
                schoolRoles.map((role) => (
                  <tr
                    key={role.id}
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
                          width: "55px",
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
                          {role.role_name}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div
                        style={{
                          width: "60px",
                          display: "flex",
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
                          onClick={() => {
                            handleClick(role.id);
                          }}
                        >
                          Manage Permissions
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div
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
            Add New Role :
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "20px",
            flexDirection: "column",
            marginTop:'10px'
          }}
        >
          <div style={{ marginBottom: "23px", width: "100%" }}>
            <label
              htmlFor="materialtitle"
              className="form-label"
              style={{
                fontSize: "12px",
                color: "#434343",
                fontWeight: "500",
              }}
            >
              Role Name
            </label>

            <div id="materialtitle">
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
                // onChange={(e) =>
                //   // handleMaterialChange("title", e.target.value)
                // }
                type="text"
                placeholder="Enter Name"
                aria-expanded="false"
              />
            </div>
          </div>
          <div style={{width:'100%', justifyContent:'right', display:'flex'}}>
            <button
              type="button"
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
              // onClick={handleSubmit}
            >
              <span
                style={{
                  color: "#FFF",
                  fontFamily: "Manrope",
                  fontSize: "12px",
                  fontWeight: "500",
                }}
              >
                Add
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { TablesWidget28 };
