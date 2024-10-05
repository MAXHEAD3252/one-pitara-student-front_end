import { useEffect, useState } from "react";
import { useAuth } from "../../../../app/modules/auth/core/Auth";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";
import { CreateCollectFees } from "../../modals/create-app-stepper/CreateCollectFees";
import React from "react";
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
  session_id: string;
  class_id: string;
  father_phone: string;
  mobileno: string;
  dob: string;
  father_name: string;
  admission_no: number;
  section: string;
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
  const [studentEmail, setStudentEmail] = useState("");
  const [getClass, setClass] = useState("");
  const [getSession, setSession] = useState("");

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/api/school/get-assignstudents/${schoolId}/${class_id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();
        console.log(responseData);
        setData(responseData);
        setFilteredData(responseData);
        setRefresh(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEnquiries();
  }, [schoolId, referesh]);

  // console.log(filteredData)

  // const handleClick = async () => {};

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const handleActionModal = (
    id: number,
    class_id: string,
    session_id: string,
    email: string
  ) => {
    setStudentEmail(email);
    setStudentId(id);
    setClass(class_id);
    setSession(session_id);
    setShowCollectModal(true);
  };
  const handleModalCollectFeesClose = () => {
    setShowCollectModal(false);
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
          Collect Fees For "Class {class_id}" Students
        </span>
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
                    Class
              </th>
              <th
                style={{
                  padding: "12px 20px",
                  textAlign: "left",
                }}
              >
                    Section
              </th>
              <th
                style={{
                  padding: "12px 20px",
                  textAlign: "left",
                }}
              >
                    Admission No.
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
                    Date Of Birth
              </th>
              <th
                style={{
                  padding: "12px 20px",
                  textAlign: "left",
                }}
              >
                    Phone
              </th>
              <th
                style={{
                  padding: "12px 20px",
                  textAlign: "left",
                }}
              >
                    Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item, index) => (
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
                      {item.class}
                </td>
                <td
                    style={{
                      padding: "12px 20px",
                    }}
                  >
                      {item.section}
                </td>
                <td
                    style={{
                      padding: "12px 20px",
                    }}
                  >
                      {item.admission_no}
                </td>
                <td
                    style={{
                      padding: "12px 20px",
                    }}
                  >
                      {item.student_name}
                </td>
                <td
                    style={{
                      padding: "12px 20px",
                    }}
                  >
                      {item.father_name}
                </td>
                <td
                    style={{
                      padding: "12px 20px",
                    }}
                  >
                      {formatDate(item.dob)}
                </td>
                <td
                    style={{
                      padding: "12px 20px",
                    }}
                  >
                      {item.mobileno + " / " + item.father_phone}
                </td>
                <td
                    style={{
                      display: "flex",
                      gap: "10px", // Adds space between the buttons
                      justifyContent: "center", // Aligns buttons horizontally in the center
                      alignItems: "center", // Vertically centers the buttons
                      padding: "12px 20px",
                    }}
                  >
                    <div
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
                      onClick={() =>
                        handleActionModal(
                          item.id,
                          item.class_id,
                          item.session_id,
                          item.email
                        )
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
                      Collect Fees
                      </span>
                    </div>
                    {/* <button
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
                    </button> */}
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
          admission_enquiry_id={null}
          enqId={null}
          studentId={studentId}
          studentEmail={studentEmail}
        />
      </div>
    </div>
  );
};

export { TablesWidget63 };
