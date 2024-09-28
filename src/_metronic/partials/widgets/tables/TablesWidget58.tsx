/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "../../../../app/pages/StaffPages/FinancialManagement/style.css";
import { ReviewApplication } from "../../modals/create-app-stepper/ReviewApplication";
import { useAuth } from "../../../../app/modules/auth/core/Auth";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";
import { CreateAdmissionEnquiryReject } from "../../modals/create-app-stepper/CreateAdmissionEnquiryReject";

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
  updated_at : string;
  student_phone : string;

  // Add other properties as needed
}

const TablesWidget58: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);

  const [filteredData, setFilteredData] = useState<FilterData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { currentUser } = useAuth();
  
  const schoolId = currentUser?.school_id;

  const [showEditModal, setShowEditModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [enqId, setEnqId] = useState("");

  const [referesh, setRefresh] = useState(false);
 

  // const handleActionModal = (value: string) => {
  //   setEnqId(value);
  // };


  
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
          `${DOMAIN}/api/school/get-reviewlist/${schoolId}`
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
                    Applications Review List
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
                    Appliation Id
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
                    Applicant Name
                  </span>
                </div>
              </th>
              <th>
                <div style={{ width: "150px" }}>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      lineHeight: "18px",
                      color: "#FFFFFF",
                      fontFamily: "Manrope",
                    }}
                  >
                    Class Applied For
                  </span>
                </div>
              </th>
              <th>
                <div style={{ width: "130px" }}>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      lineHeight: "18px",
                      color: "#FFFFFF",
                      fontFamily: "Manrope",
                    }}
                  >
                    Application Date
                  </span>
                </div>
              </th>
              <th>
                <div style={{ width: "170px" }}>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      lineHeight: "18px",
                      color: "#FFFFFF",
                      fontFamily: "Manrope",
                    }}
                  >
                    Student Email
                  </span>
                </div>
              </th>
              <th>
                <div style={{ width: "150px" }}>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      lineHeight: "18px",
                      color: "#FFFFFF",
                      fontFamily: "Manrope",
                    }}
                  >
                    Student Contact
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
                    Reviewer
                  </span>
                </div>
              </th>
              <th>
                <div
                  style={{
                    width: "120px",
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
                    Actions
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
                      {item.id}
                      {/* {formatDate(item.date)} */}
                    </span>
                  </div>
                </td>
                <td>
                  <div
                    style={{
                      width: "110px",
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
                      width: "150px",
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
                      {item.class}
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
                    style={{ width: "130px" }}
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
                      {formatDate(item.updated_at)}
                    </span>
                  </div>
                </td>
                <td>
                  <div
                    className=" flex justify-start flex-col overflow-hidden whitespace-nowrap text-ellipsis"
                    style={{ width: "170px" }}
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
                      {/* {formatDate(item.follow_up_date)} */}
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
                             "#4BCD60"
                      }}
                    >
                      {currentUser?.name + "" + currentUser?.surname}
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
                        width: "100%",
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
                      width: "140px",
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
                        border: "1px solid #1F3259",
                        fontFamily: "Manrope",
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "#1F3259",
                      }}
                      onClick={() => handleModalEdit(item.enquiry_id)}
                    >
                      Review Application
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
          <ReviewApplication
            show={showEditModal}
            handleClose={handleModalEditClose}
            enqId={enqId}
            setRefresh={setRefresh}
          />
          <CreateAdmissionEnquiryReject show={showActionModal} handleClose={handleActionModalClose} enqId={enqId} setRefresh={setRefresh}/>
        </table>
      </div>
    </div>
  );
};

export { TablesWidget58 };
