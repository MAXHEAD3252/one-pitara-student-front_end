/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "../../../../app/pages/StaffPages/FeeDetails/style.css";
// import { CreateWalkinEnquiry } from "../../modals/create-app-stepper/CreateWalkinEnquiry";
import { CreateAdmissionEnquiryReject } from "../../modals/create-app-stepper/CreateAdmissionEnquiryReject";
import { CreateStartAdmissionProcess } from "../../modals/create-app-stepper/CreateStartAdmissionProcess";
import { useAuth } from "../../../../app/modules/auth/core/Auth";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";

interface DataItem {
  status: string;
  name: string;
}
interface FilterData {
  gender: string;
  date_of_birth: string | number | Date;
  student_phone: string;
  phone: string | number | Date;
  student_email: string;
  student_name: string;
  created_at: string | number | Date;
  id: number;
  enquiry_id: string;
  date: string;
  class: string;
  name: string;
  source: string;
  email: string;
  follow_up_date: string;
  status: string;
  // Add other properties as needed
}

const TablesWidget57: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);

  const [filteredData, setFilteredData] = useState<FilterData[]>([]);
  console.log(filteredData);

  const [searchQuery, setSearchQuery] = useState(0);
  const { currentUser } = useAuth();
  const schoolId = currentUser?.school_id;

  const [showModal, setShowModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [enqId, setEnqId] = useState("");

  const handleModal = () => {
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleActionModal = (value: string) => {
    setEnqId(value);
    setShowActionModal(true);
  };
  const handleActionModalClose = () => {
    setShowActionModal(false);
  };

  const handleModalEdit = (value: string) => {
    setEnqId(value);
    setShowEditModal(true);
  };

  const handleModalEditClose = () => {
    setShowEditModal(false);
  };

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/api/staff/getadmissionenquiries/${schoolId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();
        setData(responseData);

        setFilteredData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEnquiries();
  }, [schoolId]);

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
            className=""
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
                  width: "98%",
                }}
                className="col-xxl-12 col-lg-6"
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
                    Admission Enquiry list
                  </span>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
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
                      onChange={handleSearch}
                      value={searchQuery}
                    />
                  </div>
                </div>
              </caption>
            </div>
            <tr
              style={{
                height: "61px",
                gap: "40px",
                display: "flex",
                paddingTop: "10px",
                paddingLeft: "55px",
                // paddingBottom:'10px',
                // position: "sticky",
                // top: 0,
                width: "auto",
                // border:'1px solid white',
                overflowY: "auto",
                overflowX: "hidden",
                backgroundColor: "#1C335C",
                // zIndex: 100,
              }}
            >
              <th>
                <div style={{ width: "100px" }}>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      lineHeight: "18px",
                      color: "#FFFFFF",
                    }}
                  >
                    Date
                  </span>
                </div>
              </th>
              <th>
                <div style={{ width: "200px" }}>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      lineHeight: "18px",
                      color: "#FFFFFF",
                      fontFamily: "Manrope",
                    }}
                  >
                    Student Name
                  </span>
                </div>
              </th>
              <th>
                <div style={{ width: "110px" }}>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      lineHeight: "18px",
                      color: "#FFFFFF",
                      fontFamily: "Manrope",
                    }}
                  >
                    Gender
                  </span>
                </div>
              </th>
              <th>
                <div style={{ width: "155px" }}>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      lineHeight: "18px",
                      color: "#FFFFFF",
                      fontFamily: "Manrope",
                    }}
                  >
                    Date Of Birth
                  </span>
                </div>
              </th>
              <th>
                <div style={{ width: "280px" }}>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      lineHeight: "18px",
                      color: "#FFFFFF",
                      fontFamily: "Manrope",
                    }}
                  >
                    Email
                  </span>
                </div>
              </th>
              <th>
                <div style={{ width: "140px" }}>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      lineHeight: "18px",
                      color: "#FFFFFF",
                      fontFamily: "Manrope",
                    }}
                  >
                    FollowUp-Date
                  </span>
                </div>
              </th>

              <th>
                <div
                  style={{
                    width: "90px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      lineHeight: "18px",
                      color: "#FFFFFF",
                      fontFamily: "Manrope",
                    }}
                  >
                    Status
                  </span>
                </div>
              </th>

              <th>
                <div
                  style={{
                    width: "80px",
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
            className="col-xxl-12 h-[s]"
            style={{
              height: "105%",
              // maxHeight: "100%",
              display: "flex",
              flexDirection: "column",
              minHeight: "calc(100vh - 550px)",
              overflowY: "auto",
            }}
          >
            {filteredData.map((item, index) => (
              <tr
                key={index}
                style={{
                  height: "61px",
                  gap: "40px",
                  paddingLeft: "55px",
                  paddingRight: "55px",
                  paddingTop: "16px",
                  width: "100%",
                  display: "flex",
                  backgroundColor: index % 2 === 0 ? "#F5F5F5" : "#FFF",
                  // border:'1px solid'
                }}
              >
                <td>
                  <div
                    style={{
                      width: "100px",
                      display: "flex",
                      justifyContent: "start",
                      flexDirection: "column",
                      // border:'1px solid'
                    }}
                  >
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        lineHeight: "18px",
                        color: "#000000",
                        fontFamily: "Manrope",
                        // border:'1px solid'
                      }}
                    >
                      {formatDate(item.created_at)}
                    </span>
                  </div>
                </td>
                <td>
                  <div
                    style={{
                      width: "200px",
                      display: "flex",
                      justifyContent: "start",
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
                      {item.student_name}
                    </span>
                  </div>
                </td>
                <td>
                  <div
                    className="overflow-hidden whitespace-nowrap"
                    style={{
                      width: "110px",
                      // paddingLeft:'5px',
                      display: "flex",
                      justifyContent: "start",
                      flexDirection: "column",
                    }}
                  >
                    <span
                      data-tooltip-id={`tooltip-${index}`}
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        lineHeight: "18px",
                        color: "#1F1F1F",
                        fontFamily: "Manrope",
                      }}
                    >
                      {item.gender}
                    </span>
                  </div>
                  <ReactTooltip
                    id={`tooltip-${index}`}
                    place="bottom"
                    // content={item.name}
                    opacity={1}
                    style={{
                      zIndex: 999,
                      backgroundColor: "#FFF",
                      boxShadow: "0px 0px 10px 4px #00000026",
                      color: "#000",
                    }}
                  />
                </td>
                <td>
                  <div
                    className=" flex justify-start flex-col overflow-hidden whitespace-nowrap text-ellipsis"
                    style={{ width: "155px" }}
                  >
                    <span
                      className="font-normal leading-6 text-gray-800 w-100 overflow-hidden"
                      style={{
                        width: "100px",
                        overflow: "hidden",
                        fontSize: "14px",
                        fontWeight: "500",
                        fontFamily: "Manrope",
                      }}
                    >
                      {formatDate(item.date_of_birth)}
                    </span>
                  </div>
                </td>
                <td>
                  <div
                    className=" flex justify-start flex-col overflow-hidden whitespace-nowrap text-ellipsis"
                    style={{ width: "280px" }}
                  >
                    <span
                      data-tooltip-id={`tooltip-${index}`}
                      className="font-normal leading-6 text-gray-800 w-100 overflow-hidden"
                      style={{
                        width: "100px",
                        overflow: "hidden",
                        fontSize: "14px",
                        fontWeight: "500",
                        fontFamily: "Manrope",
                      }}
                    >
                      {item.student_email}
                    </span>
                  </div>
                  <ReactTooltip
                    id={`tooltip-${index}`}
                    place="bottom"
                    content={item.email}
                    opacity={1}
                    style={{
                      zIndex: 999,
                      backgroundColor: "#FFF",
                      boxShadow: "0px 0px 10px 4px #00000026",
                      color: "#000",
                      fontFamily: "Manrope",
                    }}
                  />
                </td>

                <td>
                  <div
                    style={{
                      width: "140px",
                      display: "flex",
                      justifyContent: "start",
                      flexDirection: "column",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "14px",
                        width: "100px",
                        textAlign: "center",
                        borderRadius: "5px",
                        // padding: "5px",
                        fontWeight: "500",
                        lineHeight: "18px",
                        color: "#000",
                        fontFamily: "Manrope",
                        // backgroundColor: "#FFE7E1",
                      }}
                    >
                      {item.student_phone}
                    </span>
                  </div>
                </td>

                <td>
                  <div
                    style={{
                      width: "90px",
                      display: "flex",
                      justifyContent: "start",
                      flexDirection: "column",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "14px",
                        width: "50px",
                        textAlign: "center",
                        borderRadius: "5px",
                        padding: "5px",
                        marginTop: "-8px",
                        fontWeight: "500",
                        lineHeight: "18px",
                        fontFamily: "Manrope",
                        color:
                          item.status === "active"
                            ? "#4BCD60"
                            : item.status === "lost"
                            ? "#000000"
                            : "#ED5578",
                        backgroundColor:
                          item.status === "active"
                            ? "#E7FFEA"
                            : item.status === "lost"
                            ? "#FF8B20"
                            : "#FFE7E1",
                      }}
                    >
                      {item.status}
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
                      // border:'1px solid'
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
                      onClick={() => handleModalEdit(item.enquiry_id)}
                    >
                      start Admission Process
                    </button>
                    <button
                      type="button"
                      className="btn"
                      style={{
                        border: "1px solid #1F3259",
                        fontFamily: "Manrope",
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "#1F3259",
                      }}
                      onClick={() => handleActionModal(item.enquiry_id)}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          {/* <CreateWalkinEnquiry show={showModal} handleClose={handleModalClose} /> */}
          <CreateAdmissionEnquiryReject show={showActionModal} handleClose={handleActionModalClose} enqId={enqId}/>
          <CreateStartAdmissionProcess show={showEditModal} handleClose={handleModalEditClose} enqId={enqId}/>

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

export { TablesWidget57 };
