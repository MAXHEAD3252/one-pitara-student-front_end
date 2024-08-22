import { useEffect, useState } from "react";
import { useAuth } from "../../../../app/modules/auth/core/Auth";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";
import React from "react";
import { CreateCollectFees} from "../../modals/create-app-stepper/CreateCollectFees"; 

type Props = {
  class_id: string | null;
};

// interface FeeType {
//   fee_type_id: number;
//   fee_type_name: string;
//   amount: string;
//   due_date: string;
// }

// interface FeeGroup {
//   fee_group_id: number;
//   fee_group_name: string;
//   fee_session_group_id:string;
//   fees: FeeType[];
// }

// interface ApplicationData {
//   fee_group_id: number;
//   fee_type_id: number;
//   fee_session_group_id:string;
//   fee_group_name: string;
//   fee_type_name: string;
//   amount: string;
//   due_date: string;
//   adjustment: string;
//   is_active: string;
//   checked: boolean;
// }

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
  updated_at: string;
  student_phone: string;
}

const TablesWidget63 = ({ class_id }: Props) => {
  const { currentUser } = useAuth();
  const schoolId = currentUser?.school_id;
  const [data, setData] = useState<DataItem[]>([]);
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [filteredData, setFilteredData] = useState<FilterData[]>([]);
  const [referesh, setRefresh] = useState(false);
  const [studentId, setStudentId] = useState(0);
  const [getClass, setClass] = useState("");
  const [getSession, setSession] = useState("");
  
  

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/api/staff/get-assignstudents/${schoolId}/${class_id}`
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
  }, [schoolId]);

  // console.log(filteredData)

  // const handleClick = async () => {};

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const handleActionModal = (id: number, class_id:string, session_id:string) => {
    setStudentId(id);
    setClass(class_id);
    setSession(session_id)
    setShowCollectModal(true);
  };
  const handleModalCollectFeesClose = () => {
    setShowCollectModal(false);
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
                    Admission Fees
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
                      //   onChange={handleSearch}
                      //   value={searchQuery}
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
                paddingLeft: "25px",
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
                <div style={{ width: "70px" }}>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      lineHeight: "18px",
                      color: "#FFFFFF",
                    }}
                  >
                    Class
                  </span>
                </div>
              </th>
              <th>
                <div style={{ width: "90px" }}>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      lineHeight: "18px",
                      color: "#FFFFFF",
                    }}
                  >
                    Section
                  </span>
                </div>
              </th>
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
                    Admission No.
                  </span>
                </div>
              </th>
              <th>
                <div style={{ width: "230px" }}>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      lineHeight: "18px",
                      color: "#FFFFFF",
                    }}
                  >
                    Student Name
                  </span>
                </div>
              </th>
              <th>
                <div style={{ width: "230px" }}>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      lineHeight: "18px",
                      color: "#FFFFFF",
                    }}
                  >
                    Father Name
                  </span>
                </div>
              </th>
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
                    Date Of Birth
                  </span>
                </div>
              </th>
              <th>
                <div style={{ width: "340px" }}>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      lineHeight: "18px",
                      color: "#FFFFFF",
                    }}
                  >
                    Phone
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
                  paddingLeft: "25px",
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
                      width: "70px",
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
                      {item.class}
                      {/* {formatDate(item.date)} */}
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
                      {item.section}
                      {/* {formatDate(item.date)} */}
                    </span>
                  </div>
                </td>
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
                      {item.admission_no}
                      {/* {formatDate(item.date)} */}
                    </span>
                  </div>
                </td>
                <td>
                  <div
                    style={{
                      width: "230px",
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
                      {item.student_name}
                      {/* {formatDate(item.date)} */}
                    </span>
                  </div>
                </td>
                <td>
                  <div
                    style={{
                      width: "230px",
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
                      {item.father_name}
                      {/* {formatDate(item.date)} */}
                    </span>
                  </div>
                </td>
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
                      {formatDate(item.dob)}
                      {/* {formatDate(item.date)} */}
                    </span>
                  </div>
                </td>
                <td>
                  <div
                    style={{
                      width: "270px",
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
                     { item.mobileno + " / " + item.father_phone} 
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
                      onClick={() => handleActionModal(item.id,item.class_id,item.session_id)}
                    >
                      Collect Fees
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
                      // onClick={() => handleActionModal(fee_group_id)}
                    >
                      Send Payment Link
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <CreateCollectFees
            show={showCollectModal}
            handleClose={handleModalCollectFeesClose}
            class_id={getClass}
            session_id={getSession}
            admission_enquiry_id = {null}
            enqId={null}
            setRefresh={setRefresh}
            studentId={studentId}
          />
      </div>
    </div>
  );
};

export { TablesWidget63 };
