import React, { useEffect, useState } from "react";
import "../../../../app/pages/StaffPages/FinancialManagement/style.css";
import { useAuth } from "../../../../app/modules/auth/index.ts";
import { EditFessMasterModal } from "../../modals/create-app-stepper/EditFessMasterModal.tsx";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints.tsx";
import { AddFeesMasterModal } from "../../modals/create-app-stepper/AddFeesMasterModal.tsx";
import AssignFeesMaster from "../../modals/create-app-stepper/AssignFeesMaster.tsx";
import { DeleteFeeMasterModal } from "../../modals/create-app-stepper/DeleteFeeMasterModal.tsx";

// Define interfaces
interface FeeItem {
  feetype_id: any;
  fee_type: string;
  fee_amount: number;
  fee_group_type_id: number;
  fee_group_session_id: number;
}

interface GroupedData {
  fee_group_session_id: any;
  fee_group_id: any;
  name: string;
  class_id: string;
  fees: FeeItem[];
}

const TablesWidget14: React.FC = () => {
  const [feeData, setFeeData] = useState<GroupedData[]>([]);
  console.log(feeData);
  
  
  const { currentUser } = useAuth();
  const schoolId = currentUser?.school_id;
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]); // Changed type to any[]
  const [showAssignModal, setShowAssignModal] = useState<boolean>(false);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [selectedFeeDetails, setSelectedFeeDetails] = useState<any[]>([]);
  // const [selectedFeeGroupId, setSelectedFeeGroupId] = useState<number>(0);
  const [feeId, setFeeId] = useState<number | null>(null);
  const [classId, setClassId] = useState<string | null>(null);
  const [groupName, setSetGroupName] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(false);

  const handleShowEditModal = (fee_group_type_id: number) => {
    setFeeId(fee_group_type_id);
    setShowEditModal(true);
  };

  const handleShowDeleteModal = (fee_group_type_id: number) => {
    setFeeId(fee_group_type_id);
    setShowDeleteModal(true);
  };

  const handleShowAssignModal = (name: string, classId: string) => {
    // Find the group with the matching classId
    const selectedGroup = feeData.find((group) => group.name === name);
    if (selectedGroup) {
      // Extract fee group ID from the selected group
      const feeGroupId = selectedGroup.fee_group_id; // Assuming fee_group_id is directly on selectedGroup
      const feeGroupSessionId = selectedGroup.fee_group_session_id; // Assuming fee_group_id is directly on selectedGroup
      const fee_group_type_id = selectedGroup.fee_group_type_id; // Assuming fee_group_id is directly on selectedGroup
      const fee_group_name = selectedGroup.name; // Assuming fee_group_id is directly on selectedGroup

      // Collect fee details including fee_id and fee_name
      const feeDetails = selectedGroup.fees.map((fee) => ({
        fee_type_id: fee.feetype_id, // Use the correct property name here
        fee_name: fee.fee_type, // Use the correct property name here
        fee_group_id: feeGroupId,
        fee_amount: fee.fee_amount,
        fee_group_session_id: feeGroupSessionId, // Set fee_group_id to the extracted value
        fee_group_type_id: fee_group_type_id,
      }));

      // Extract fee IDs from fee details
      // const feeIds = feeDetails.map(fee => fee.fee_id);

      // Update state
      // setSelectedFeeGroupId(feeGroupId); // Store fee group ID
      setClassId(classId);
      setSetGroupName(fee_group_name);
      setSelectedFeeDetails(feeDetails); // Store fee IDs as an array
      setShowAssignModal(true);
    } else {
      console.error(`No group found with classId: ${classId}`);
    }
  };

  const handleShowCreateModal = () => {
    setShowCreateModal(true);
  };

  // Handlers to hide modals
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setFeeId(null);
  };
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setFeeId(null);
  };

  const handleCloseAssignModal = () => {
    setSelectedFeeDetails([]); // Initialize to empty array instead of null
    setClassId(null);
    setShowAssignModal(false);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/api/school/getfeemaster-list/${schoolId}/${19}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setData(data);
        console.log(data);

        // Grouping fee data by fee_group_id
        const groupedData: GroupedData[] = Object.values(
          data.reduce((acc: any, item: any) => {
            const {
              fee_group_id,
              fee_group_session_id,
              fee_group_name,
              fee_type,
              fee_amount,
              feetype_id,
              class_id,
              fee_group_type_id,
            } = item;

            // Create a unique key combining class_id and fee_group_id
            const key = `${class_id}-${fee_group_id}`;

            if (!acc[key]) {
              acc[key] = {
                name: fee_group_name,
                class_id: class_id,
                fee_group_id: fee_group_id,
                fee_group_session_id: fee_group_session_id,
                fees: [{ fee_type, fee_amount, feetype_id ,fee_group_type_id}],
              };
            } else {
              acc[key].fees.push({
                fee_type,
                fee_amount,
                feetype_id,
                fee_group_type_id: fee_group_type_id
              });
            }

            return acc;
          }, {})
        );
        // Convert the accumulated data to an array for use
        setFeeData(groupedData);
      } catch (error) {
        console.error("Error fetching fee data:", error);
      }
    };
    
    setRefresh(false)
    fetchData();
  }, [schoolId,refresh]);

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
          Fee Master List: 2022- 2023
        </span>
        <div style={{ display: "flex", gap: "8px" }}>
          <div
            className="input-group flex-nowrap"
            style={{
              width: "300px",
              height: "36px",
              borderRadius: "8px",
              border: "1px solid #1C335C",
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
                    stroke="#1C335C"
                    stroke-width="1.5"
                  />
                  <path
                    d="M14.1667 13.3333L15.5 14.6666"
                    stroke="#1C335C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_582_4295">
                    <rect
                      width="16"
                      height="16"
                      fill="#1C335C"
                      transform="translate(0.833374)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </span>
            <input
              type="text"
              style={{ backgroundColor: "transparent", color: "#1C335C" }}
              className="form-control border-0 "
              placeholder="Search ...."
              aria-label="Username"
              aria-describedby="addon-wrapping"
            />
          </div>
          <div
            onClick={() => handleShowCreateModal()}
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
              Add Fee Master
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_103_1850)">
                <path
                  d="M1.66663 10C1.66663 6.07165 1.66663 4.10746 2.88701 2.88708C4.1074 1.66669 6.07159 1.66669 9.99996 1.66669C13.9283 1.66669 15.8925 1.66669 17.1129 2.88708C18.3333 4.10746 18.3333 6.07165 18.3333 10C18.3333 13.9284 18.3333 15.8926 17.1129 17.113C15.8925 18.3334 13.9283 18.3334 9.99996 18.3334C6.07159 18.3334 4.1074 18.3334 2.88701 17.113C1.66663 15.8926 1.66663 13.9284 1.66663 10Z"
                  stroke="#fff"
                  stroke-width="1.5"
                />
                <path
                  d="M12.5 10L10 10M10 10L7.5 10M10 10L10 7.5M10 10L10 12.5"
                  stroke="#fff"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_103_1850">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div
        style={{
          height: "630px", // Fixed height for the table container
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
                Fees Group
              </th>
              <th
                style={{
                  padding: "12px 20px",
                  textAlign: "left",
                }}
              >
                Fee Code
              </th>
              <th
                style={{
                  padding: "12px 20px",
                  textAlign: "right",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {feeData.map((group, index) => (
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
                  {group.name}
                </td>

                <td
                    style={{
                      padding: "12px 20px",
                      display:'flex',
                      flexDirection:'column',gap:'5px'
                    }}
                  >
                    {group.fees.map((fee, idx) => (
                      <div
                        key={idx}
                        style={{
                          height: "36px",
                          width: "fit-content",
                          display: "inline-flex",
                          flexDirection: "row",
                          borderRadius: "6px",
                          border: "1px solid #CCCCCC",
                          padding: "0px 6px",
                          gap: "0px",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "fit-content",
                            height: "36px",
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                            padding: "10px 6px 10px 6px",
                            alignItems: "center",
                            textAlign: "start",
                          }}
                        >
                          <span className="text-gray-900">
                            {
                              /* @ts-ignore */
                              `${fee.fee_type} RS${fee.fee_amount}`
                            }
                          </span>
                          <div>
                            <button
                              //  onClick={() => handleOpenModal(fee.fid)} // Replace fee.id with the actual id
                              /* @ts-ignore */

                              onClick={() =>
                                handleShowEditModal(fee.fee_group_type_id)
                              } // Replace fee.id with the actual id
                              style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                              }}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clip-path="url(#clip0_102_1546)">
                                  <path
                                    d="M14.6666 6.99998V7.99998C14.6666 11.1427 14.6666 12.714 13.6903 13.6903C12.714 14.6666 11.1427 14.6666 7.99998 14.6666C4.85728 14.6666 3.28593 14.6666 2.30962 13.6903C1.33331 12.714 1.33331 11.1427 1.33331 7.99998C1.33331 4.85728 1.33331 3.28593 2.30962 2.30962C3.28593 1.33331 4.85728 1.33331 7.99998 1.33331H8.99998"
                                    stroke="#1C274C"
                                    stroke-linecap="round"
                                  />
                                  <path
                                    d="M11.1013 2.30335L11.5339 1.87081C12.2505 1.15415 13.4125 1.15415 14.1291 1.87081C14.8458 2.58747 14.8458 3.74941 14.1291 4.46607L13.6966 4.89862M11.1013 2.30335C11.1013 2.30335 11.1554 3.22251 11.9664 4.03353C12.7775 4.84455 13.6966 4.89862 13.6966 4.89862M11.1013 2.30335L7.12476 6.27993C6.85542 6.54927 6.72075 6.68395 6.60493 6.83244C6.46831 7.0076 6.35118 7.19712 6.25561 7.39766C6.17459 7.56765 6.11436 7.74833 5.99391 8.1097L5.60826 9.26665M13.6966 4.89862L9.72003 8.87519C9.45068 9.14454 9.31601 9.27921 9.16752 9.39503C8.99236 9.53165 8.80284 9.64878 8.6023 9.74435C8.4323 9.82537 8.25162 9.8856 7.89026 10.006L6.73331 10.3917M6.73331 10.3917L5.98471 10.6412C5.80688 10.7005 5.61082 10.6542 5.47827 10.5217C5.34573 10.3891 5.29945 10.1931 5.35872 10.0153L5.60826 9.26665M6.73331 10.3917L5.60826 9.26665"
                                    stroke="#1C274C"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_102_1546">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div
                          onClick={() =>
                            handleShowDeleteModal(group.fee_group_type_id)
                          }
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="7" cy="7" r="7" fill="white" />
                            <path
                              d="M10 4L4 10M4 4L10 10"
                              stroke="#464646"
                              stroke-linecap="square"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    ))}
                </td>

                <td
                   style={{
                    padding: "12px 20px",
                    textAlign: "start",
                    // display:'block',
                    // flexDirection:'row'
                  }}
                  >
                  <div
                    style={{
                      display: "flex",
                      gap: "10px", // Adds space between the buttons
                      justifyContent: "right", // Aligns buttons horizontally in the center
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "8px 8px",
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
                        handleShowAssignModal(group.name, group.class_id)
                      }
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 2C11.1046 2 12 2.89543 12 4C12 5.10457 11.1046 6 10 6C8.89543 6 8 5.10457 8 4C8 2.89543 8.89543 2 10 2Z"
                          stroke="#FFFFFF"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                        <path
                          d="M10 7C12.7614 7 15 9.23858 15 12V13H5V12C5 9.23858 7.23858 7 10 7Z"
                          stroke="#FFFFFF"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                        <path
                          d="M17 10V14"
                          stroke="#FFFFFF"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                        <path
                          d="M19 12H15"
                          stroke="#FFFFFF"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </svg>
                    </div>
                    <div
                      style={{
                        width: "34px",
                        height: "40px",
                        borderRadius: "6px",
                        padding: "10px 6px 10px 6px",
                        gap: "10px",
                        backgroundColor: "#FFE7E1",
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.0834 5H2.91663"
                          stroke="#ED5578"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                        <path
                          d="M15.6944 7.08331L15.3111 12.8326C15.1637 15.045 15.0899 16.1512 14.3691 16.8256C13.6482 17.5 12.5396 17.5 10.3222 17.5H9.67775C7.46042 17.5 6.35175 17.5 5.63091 16.8256C4.91007 16.1512 4.83632 15.045 4.68883 12.8326L4.30554 7.08331"
                          stroke="#ED5578"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                        <path
                          d="M7.91663 9.16669L8.33329 13.3334"
                          stroke="#ED5578"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                        <path
                          d="M12.0833 9.16669L11.6666 13.3334"
                          stroke="#ED5578"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                        <path
                          d="M5.41663 5C5.46319 5 5.48648 5 5.50758 4.99947C6.19379 4.98208 6.79915 4.54576 7.03264 3.90027C7.03982 3.88041 7.04719 3.85832 7.06191 3.81415L7.14282 3.57143C7.21188 3.36423 7.24642 3.26063 7.29222 3.17267C7.47497 2.82173 7.81308 2.57803 8.2038 2.51564C8.30173 2.5 8.41094 2.5 8.62934 2.5H11.3706C11.589 2.5 11.6982 2.5 11.7961 2.51564C12.1868 2.57803 12.525 2.82173 12.7077 3.17267C12.7535 3.26063 12.788 3.36423 12.8571 3.57143L12.938 3.81415C12.9527 3.85826 12.9601 3.88042 12.9673 3.90027C13.2008 4.54576 13.8061 4.98208 14.4923 4.99947C14.5134 5 14.5367 5 14.5833 5"
                          stroke="#ED5578"
                          stroke-width="1.5"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <EditFessMasterModal
          show={showEditModal}
          onHide={handleCloseEditModal}
          feeId={feeId}
          setRefresh={setRefresh}
        />

        <DeleteFeeMasterModal
          show={showDeleteModal}
          onHide={handleCloseDeleteModal}
          feeId={feeId}
        />

        <AddFeesMasterModal
          show={showCreateModal}
          onHide={handleCloseCreateModal}
        />
        <AssignFeesMaster
          show={showAssignModal}
          onHide={handleCloseAssignModal}
          schoolId={schoolId}
          classId={classId}
          groupName={groupName}
          feeDetails={selectedFeeDetails}
        />
      </div>
    </div>
  );
};

export { TablesWidget14 };
