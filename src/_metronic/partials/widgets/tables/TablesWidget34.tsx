/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
// import { Tooltip as ReactTooltip } from "react-tooltip";
import "../../../../app/pages/StaffPages/FinancialManagement/style.css";
import { CreateGeneralEnquiry } from "../../modals/create-app-stepper/CreateGeneralEnquiry";
import { CreateEnquiryAction } from "../../modals/create-app-stepper/CreateEnquiryAction";
import { CreateEditGeneral } from "../../modals/create-app-stepper/CreateEditGeneral";
import { useAuth } from "../../../../app/modules/auth/core/Auth";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";
import { CreateWalkinAdmission } from "../../modals/create-app-stepper/CreateWalkinAdmission";
import { CreateEditAdmission } from "../../modals/create-app-stepper/CreateEditAdmission";

interface DataItem {
  status: string;
  name: string;
}
interface FilterData {
  student_email: string;
  student_name: string;
  id: number;
  enquiry_id: string;
  date: string;
  class: string;
  name: string;
  source: string;
  email: string;
  follow_up_date: string;
  status: string;
  enquiry_type: string;
  // Add other properties as needed
}

const TablesWidget34: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);

  const [filteredData, setFilteredData] = useState<FilterData[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const { currentUser } = useAuth();
  const schoolId = currentUser?.school_id;

  const [showGeneralModal, setShowGeneralModal] = useState(false);
  const [showAdmissionModal, setShowAdmissionModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [showGeneralEditModal, setShowGeneralEditModal] = useState(false);
  const [showAdmissionEditModal, setShowAdmissionEditModal] = useState(false);
  const [enqId, setEnqId] = useState("");

  const [referesh, setRefresh] = useState(false);
  const handleGeneralModal = () => {
    setShowGeneralModal(true);
  };
  const handleGeneralModalClose = () => {
    setShowGeneralModal(false);
  };
  const handleAdmissionModal = () => {
    setShowAdmissionModal(true);
  };
  const handleAdmissionModalClose = () => {
    setShowAdmissionModal(false);
  };

  const handleActionModal = (value: string) => {
    setEnqId(value);
    setShowActionModal(true);
  };
  const handleActionModalClose = () => {
    setEnqId("");
    setShowActionModal(false);
  };

  const handleModalGeneralEdit = (value: string) => {
    setEnqId(value);
    setShowGeneralEditModal(true);
  };

  const handleModalGeneralEditClose = () => {
    setEnqId("");
    setShowGeneralEditModal(false);
  };
  const handleModalAdmissionEdit = (value: string) => {
    setEnqId(value);
    setShowAdmissionEditModal(true);
  };

  const handleModalAdmissionEditClose = () => {
    setEnqId("");
    setShowAdmissionEditModal(false);
  };

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/api/school/getEnquiryList/${schoolId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();
        console.log(responseData);

        setData(responseData);
        setFilteredData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEnquiries();
    setRefresh(false);
  }, [schoolId, referesh]);

  const handleSearch = (e: any) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = data.filter(
      (item) =>
        item.status.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query)
    );
    /* @ts-ignore */
    setFilteredData(filtered);
  };

  const formatDate = (dateString: string | number | Date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const date = new Date(dateString);
    /* @ts-ignore */
    return date.toLocaleDateString("en-GB", options);
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
        fontFamily: "Manrope",
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
            color: "#1F4061",
            fontFamily: "Manrope",
          }}
        >
          Enquiry List
        </span>
        <div style={{ display: "flex", gap: "10px" }}>
          <div
            className="input-group flex-nowrap"
            style={{
              width: "300px",
              height: "36px",
              borderRadius: "8px",
              border: "1px solid #1F4061",
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
                    stroke="#1F4061"
                    stroke-width="1.5"
                  />
                  <path
                    d="M14.1667 13.3333L15.5 14.6666"
                    stroke="#1F4061"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_582_4295">
                    <rect
                      width="16"
                      height="16"
                      fill="#1F4061"
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
                color: "#1C335C",
              }}
              className="form-control border-0"
              placeholder="Search ...."
              aria-label="Search"
              aria-describedby="addon-wrapping"
              onChange={handleSearch}
              value={searchQuery}
            />
          </div>
          <div
            onClick={handleGeneralModal}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 12px",
              backgroundColor: "#1F4061",
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
              WalkIn General
            </span>
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.16672 9.3333C8.27129 9.3333 9.16672 10.2287 9.16672 11.3333C9.16672 12.4379 8.27129 13.3333 7.16672 13.3333C6.06215 13.3333 5.16672 12.4379 5.16672 11.3333C5.16672 10.2287 6.06215 9.3333 7.16672 9.3333Z"
                stroke="white"
              />
              <path
                d="M10.5 2.66667C9.39546 2.66667 8.50003 3.5621 8.50003 4.66667C8.50003 5.77124 9.39546 6.66667 10.5 6.66667C11.6046 6.66667 12.5 5.77124 12.5 4.66667C12.5 3.5621 11.6046 2.66667 10.5 2.66667Z"
                stroke="white"
              />
              <path
                d="M10.8334 11.3057L15.5 11.3057"
                stroke="white"
                stroke-linecap="round"
              />
              <path
                d="M6.83337 4.63898L2.16671 4.63898"
                stroke="white"
                stroke-linecap="round"
              />
              <path
                d="M2.16672 11.3057L3.50005 11.3057"
                stroke="white"
                stroke-linecap="round"
              />
              <path
                d="M15.5 4.63898L14.1667 4.63898"
                stroke="white"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <div
            onClick={handleAdmissionModal}
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
              WalkIn Admission
            </span>
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.16672 9.3333C8.27129 9.3333 9.16672 10.2287 9.16672 11.3333C9.16672 12.4379 8.27129 13.3333 7.16672 13.3333C6.06215 13.3333 5.16672 12.4379 5.16672 11.3333C5.16672 10.2287 6.06215 9.3333 7.16672 9.3333Z"
                stroke="white"
              />
              <path
                d="M10.5 2.66667C9.39546 2.66667 8.50003 3.5621 8.50003 4.66667C8.50003 5.77124 9.39546 6.66667 10.5 6.66667C11.6046 6.66667 12.5 5.77124 12.5 4.66667C12.5 3.5621 11.6046 2.66667 10.5 2.66667Z"
                stroke="white"
              />
              <path
                d="M10.8334 11.3057L15.5 11.3057"
                stroke="white"
                stroke-linecap="round"
              />
              <path
                d="M6.83337 4.63898L2.16671 4.63898"
                stroke="white"
                stroke-linecap="round"
              />
              <path
                d="M2.16672 11.3057L3.50005 11.3057"
                stroke="white"
                stroke-linecap="round"
              />
              <path
                d="M15.5 4.63898L14.1667 4.63898"
                stroke="white"
                stroke-linecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <div
        style={{
          height: "670px", // Fixed height for the table container
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
                Enquiry Id
              </th>
              <th
                style={{
                  padding: "12px 20px",
                  textAlign: "left",
                }}
              >
                Full Name
              </th>
              <th
                style={{
                  padding: "12px 20px",
                  textAlign: "left",
                }}
              >
                Enquiry Type
              </th>
              <th
                style={{
                  padding: "12px 20px",
                  textAlign: "left",
                }}
              >
                Email
              </th>
              <th
                style={{
                  padding: "12px 20px",
                  textAlign: "left",
                }}
              >
                Phone No
              </th>
              <th
                style={{
                  padding: "12px 20px",
                  textAlign: "left",
                }}
              >
                Student Name
              </th>
              <th
                style={{
                  padding: "12px 20px",
                  textAlign: "left",
                }}
              >
                Father Name
              </th>
              <th
                style={{
                  padding: "12px 20px",
                  textAlign: "left",
                }}
              >
                Father Phone
              </th>
              <th
                style={{
                  padding: "12px 20px",
                  textAlign: "left",
                }}
              >
                FollowUp-Date
              </th>
              <th
                style={{
                  padding: "12px 20px",
                  textAlign: "left",
                }}
              >
                Status
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
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor:
                      index % 2 === 0 ? "rgb(242, 246, 255)" : "#FFFFFF",
                    borderBottom: "2px solid #E0E4F0",
                    fontFamily: "Manrope",
                    fontSize: "14px",
                    color: "#1F4061",
                  }}
                >
                  <td style={{ padding: "12px 20px" }}>{item.enquiry_id}</td>
                  <td style={{ padding: "12px 20px" }}>
                    {item.full_name || "-"}
                  </td>
                  <td style={{ padding: "12px 20px", textAlign: "start" }}>
                    {item.enquiry_type === "Admission" ? (
                      <span
                        style={{
                          display: "inline-block",
                          padding: "5px",
                          borderRadius: "5px",
                          backgroundColor: "#B1E3FF",
                          color: "#1C335C",
                          fontSize: "12px",
                          fontWeight: "700",
                        }}
                      >
                        Admission
                      </span>
                    ) : (
                      <span
                        style={{
                          display: "inline-block",
                          padding: "5px",
                          borderRadius: "5px",
                          backgroundColor: "#FFE7E1",
                          color: "#ED5578",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        General
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "12px 20px" }}>
                    {item.email || item.student_email}
                  </td>
                  <td style={{ padding: "12px 20px" }}>
                    {item.contact_number}
                  </td>
                  <td style={{ padding: "12px 20px" }}>
                    {item.student_name || "-"}
                  </td>
                  <td style={{ padding: "12px 20px" }}>
                    {item.father_name || "-"}
                  </td>
                  <td style={{ padding: "12px 20px" }}>
                    {item.father_phone || "-"}
                  </td>
                  <td style={{ padding: "12px 20px" }}>
                    {formatDate(item.follow_up_date)}
                  </td>
                  <td style={{ padding: "12px 20px", textAlign: "start" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "5px",
                        borderRadius: "5px",
                        backgroundColor:
                          item.status === "New"
                            ? "#C0EBA6"
                            : item.status === "Deferred"
                            ? "#FFE7E1"
                            : item.status === "Converted"
                            ? "#E3F2FD"
                            : "#FEFFA7", // for dead
                        color:
                          item.status === "New"
                            ? "#347928"
                            : item.status === "Deferred"
                            ? "#D4840C"
                            : item.status === "Converted"
                            ? "#1976D2"
                            : "#EB8317", // for dead
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {item.status.charAt(0).toUpperCase() +
                        item.status.slice(1)}
                    </span>
                  </td>
                  <td
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "right",
                      alignItems: "center",
                      padding: "12px 20px",
                    }}
                  >
                    <div
                      onClick={() =>
                        item.enquiry_type === "Admission"
                          ? handleModalAdmissionEdit(item.enquiry_id)
                          : handleModalGeneralEdit(item.enquiry_id)
                      }
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "8px 12px",
                        backgroundColor: "#1F4061",
                        borderRadius: "5px",
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
                          marginRight: "5px",
                          color: "white",
                          fontSize: "14px",
                          fontWeight: "700",
                          fontFamily: "Manrope",
                        }}
                      >
                        Edit
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
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "8px 12px",
                        backgroundColor: "#FFE7E1",
                        borderRadius: "5px",
                        cursor: "pointer",
                        transition: "background-color 0.3s",
                      }}
                      onClick={() => handleActionModal(item.enquiry_id)}
                    >
                      <span
                        style={{
                          marginRight: "8px",
                          color: "#ED5578",
                          fontSize: "14px",
                          fontWeight: "700",
                          fontFamily: "Manrope",
                        }}
                      >
                        Action
                      </span>
                      <svg
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.16672 9.3333C8.27129 9.3333 9.16672 10.2287 9.16672 11.3333C9.16672 12.4379 8.27129 13.3333 7.16672 13.3333C6.06215 13.3333 5.16672 12.4379 5.16672 11.3333C5.16672 10.2287 6.06215 9.3333 7.16672 9.3333Z"
                          stroke="#ED5578"
                        />
                        <path
                          d="M10.5 2.66667C9.39546 2.66667 8.50003 3.5621 8.50003 4.66667C8.50003 5.77124 9.39546 6.66667 10.5 6.66667C11.6046 6.66667 12.5 5.77124 12.5 4.66667C12.5 3.5621 11.6046 2.66667 10.5 2.66667Z"
                          stroke="#ED5578"
                        />
                        <path
                          d="M10.8334 11.3057L15.5 11.3057"
                          stroke="#ED5578"
                          strokeLinecap="round"
                        />
                        <path
                          d="M6.83337 4.63898L2.16671 4.63898"
                          stroke="#ED5578"
                          strokeLinecap="round"
                        />
                        <path
                          d="M2.16672 11.3057L3.50005 11.3057"
                          stroke="#ED5578"
                          strokeLinecap="round"
                        />
                        <path
                          d="M15.5 4.63898L14.1667 4.63898"
                          stroke="#ED5578"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="12"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    fontFamily: "Manrope",
                    fontSize: "16px",
                    color: "#1F4061",
                  }}
                >
                  No enquiries added yet. Please add a new enquiry first.
                </td>
              </tr>
            )}
          </tbody>

          <CreateGeneralEnquiry
            show={showGeneralModal}
            handleClose={handleGeneralModalClose}
            setRefresh={setRefresh}
          />
          <CreateWalkinAdmission
            show={showAdmissionModal}
            handleClose={handleAdmissionModalClose}
            setRefresh={setRefresh}
          />
          <CreateEnquiryAction
            show={showActionModal}
            handleClose={handleActionModalClose}
            enqId={enqId}
            setRefresh={setRefresh}
          />
          <CreateEditGeneral
            show={showGeneralEditModal}
            handleClose={handleModalGeneralEditClose}
            enqId={enqId}
            setRefresh={setRefresh}
          />
          <CreateEditAdmission
            show={showAdmissionEditModal}
            handleClose={handleModalAdmissionEditClose}
            enqId={enqId}
            setRefresh={setRefresh}
          />

          {/* end::Table body */}
        </table>

        {/* modal */}

        {/* <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog "
            style={{
              display: "flex",
              width: "505px",
              height: "521px",
              padding: "0px",
              // borderRadius:'18px'
            }}
          >
            <div
              className="modal-content"
              style={{ padding: "23px 5px", borderRadius: "17px" }}
            >
              <div
                className="modal-header border-0"
                style={{ width: "100%", height: "17px" }}
              >
                <span
                  className=""
                  id="staticBackdropLabel"
                  style={{
                    fontSize: "24px",
                    fontWeight: "600",
                    fontFamily: "Manrope",
                  }}
                >
                  Filters
                </span>
                <span data-bs-dismiss="modal" aria-label="Close">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="16" cy="16" r="16" fill="#ECECEC" />
                    <path
                      d="M22.8572 9.14294L9.14288 22.8572M9.14288 9.14294L22.8572 22.8572"
                      stroke="#464646"
                      stroke-width="2"
                      stroke-linecap="square"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                    style={{
                      fontSize: "12px",
                      color: "#434343",
                      fontWeight: "500",
                    }}
                  >
                    By Payment Status
                  </label>
                  <div
                    style={{
                      display: "flex",
                      padding: "13px 12px",
                      gap: "12px",
                      border: "1px solid #ECEDF1",
                      borderRadius: "8px",
                    }}
                  >
                    <div
                      className="form-check"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gridRadios"
                        id="gridRadios1"
                        value="option1"
                        defaultChecked
                        style={{ width: "15px", height: "15px" }}
                      />
                      <label className="form-check-label" htmlFor="gridRadios1">
                        None
                      </label>
                    </div>
                    <div
                      className="form-check"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gridRadios"
                        id="gridRadios1"
                        value="option1"
                        defaultChecked
                        style={{ width: "15px", height: "15px" }}
                      />
                      <label className="form-check-label" htmlFor="gridRadios1">
                        Percentage
                      </label>
                    </div>
                    <div
                      className="form-check"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gridRadios"
                        id="gridRadios1"
                        value="option1"
                        defaultChecked
                        style={{ width: "15px", height: "15px" }}
                      />
                      <label className="form-check-label" htmlFor="gridRadios1">
                        Fixed Amount
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0">
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
                >
                  <span
                    style={{
                      color: "#FFF",
                      fontFamily: "Manrope",
                      fontSize: "12px",
                      fontWeight: "500",
                    }}
                  >
                    Confirm
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      {/* end::Table */}
    </div>
  );
};

export { TablesWidget34 };
