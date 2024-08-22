import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Modal, Button } from "react-bootstrap";
import { useAuth } from "../../../../app/modules/auth/core/Auth";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";
import React from "react";

type Props = {
  show: boolean;
  handleClose: () => void;
  class_id: string | undefined;
  session_id: string | undefined;
  admission_enquiry_id: string | null;
  enqId : string | null;
  setRefresh: (refresh: boolean) => void;
  studentId : number | null;
};

interface FeeType {
  feetype_id: number;
  fee_type_name: string;
  amount: string;
  due_date: string;
}

interface FeeGroup {
  student_fees_master_id: number;
  fee_group_id: number;
  fee_group_name: string;
  fee_session_group_id: string;
  fees: FeeType[];
}

interface ApplicationData {
  student_fees_master_id: any;
  fee_group_id: number | null;
  feetype_id: number | null;
  fee_session_group_id: string | null;
  fee_group_name: string | null;
  fee_type_name: string | null;
  amount: string | null;
  due_date: string | null;
  adjustment: string;
  total_amount: string | null;
  is_active: string;
  is_tagged: boolean;
  class_id: string | undefined;
  session_id: string | undefined;
  admission_enquiry_id: string | undefined;
  school_id: string | undefined;
  user_id: string | undefined;
  student_id: string | null;
}

const modalsRoot = document.getElementById("root-modals") || document.body;

const CreateCollectFees = ({
  show,
  handleClose,
  class_id,
  session_id,
  admission_enquiry_id,
  enqId,
  setRefresh,
  studentId
}: Props) => {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();  
  const schoolId = currentUser?.school_id;
  const userId = currentUser?.id;
  const [data, setData] = useState<ApplicationData[]>([]);
  

  const [groupedData, setGroupedData] =
    useState<Map<string, ApplicationData[]>>();
  // const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [detailedData, setDetailedData] = useState<ApplicationData[]>([]);
  const [selectedId, setSelectedId] = useState(0);
  const [studentTransaction, setStudentTransaction] = useState([]);
  


  useEffect(() => {
    const formatData = (result: FeeGroup[], isStudentData: boolean) => {
      const formattedData = result.flatMap((group) =>
        group.fees.map((fee) => {
          const commonData = {
            fee_group_id: group.fee_group_id,
            feetype_id: fee.feetype_id,
            fee_session_group_id: group.fee_session_group_id,
            fee_group_name: group.fee_group_name,
            fee_type_name: fee.fee_type_name,
            amount: fee.amount,
            adjustment: "", // Initialize adjustment
            total_amount: fee.amount, // Initialize total_amount with amount value
            session_id: session_id, // Add session_id prop
            school_id: schoolId, // Add school_id from auth
            user_id: userId, // Add user_id from auth
            enqId:enqId
            
          };
  
          // Conditionally add properties based on whether it's student data or not
          if (isStudentData) {
            return {
              ...commonData,
              student_fees_master_id: group.student_fees_master_id,
              student_id: studentId, // Add student_id for student data
            };
          } else {
            return {
              ...commonData,
              due_date: fee.due_date,
              is_active: "1",
              is_tagged: false, // Initialize is_tagged as false
              class_id: class_id, // Use class_id for non-student data
              admission_enquiry_id: admission_enquiry_id, // Only add for admission
            };
          }
        })
      );
  
      const grouped = formattedData.reduce((acc, item) => {
        if (!acc[item.fee_group_name]) {
          acc[item.fee_group_name] = [];
        }
        acc[item.fee_group_name].push(item);
        return acc;
      }, {} as { [key: string]: ApplicationData[] });
  
      setGroupedData(new Map(Object.entries(grouped)));
      setData(formattedData);
    };
  
    const fetchFeeGroupType = async () => {
      try {
        const url = studentId
          ? `${DOMAIN}/api/staff/get-studentwisefeegrouptype/${schoolId}/${studentId}/${session_id}`
          : `${DOMAIN}/api/staff/get-feegrouptype/${schoolId}/${class_id}/${session_id}`;
  
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Network response was not ok for URL: ${url}`);
        }
  
        const result: FeeGroup[] = await response.json();
        
        // Format the data based on whether student data is present
        formatData(result, Boolean(studentId));
  
      } catch (error) {
        console.error("Error fetching fee group/type data:", error);
      }
    };
  
    if (show) {
      fetchFeeGroupType();
    }
  }, [schoolId, class_id, session_id, studentId, show, DOMAIN]); // Added DOMAIN if it's dynamic
  

  const handleGroupClick = (groupName: string) => {
    const groupDetails = groupedData.get(groupName);
  
    if (!groupDetails) {
      console.error("No details found for group:", groupName);
      return;
    }
  
    const groupId = groupDetails[0]?.fee_group_id;
  
    console.log("Group ID:", groupId); // Debug log
  
    if (!groupId) {
      console.error("Invalid group ID:", groupId);
      return;
    }
  
    // Update selected state
    setSelectedId(groupId);
    setSelectedGroup(groupName);
    setDetailedData(groupDetails);
  
    // Update `is_tagged` to `true` only for the specific `fee_group_id`
    setData(prevData => {
      const updatedData = prevData.map(item =>
        item.fee_group_id === groupId
          ? { ...item, is_tagged: true }
          : item
      );
      console.log("Updated Data:", updatedData); // Debug log
      return updatedData;
    });
  
    // If studentId is present, store all data related to the groupId in studentTransaction
    if (studentId) {
      const studentDataForGroup = groupDetails.map(item => ({
        student_fees_master_id: item.student_fees_master_id,
        feetype_id: item.feetype_id,
        fee_group_id: item.fee_group_id,
        user_id: item.user_id,
        school_id: item.school_id,
        total_amount: item.total_amount // Include total amount, default to amount if total_amount is not present
        // Add any other specific fields you want to include here
      }));
  
      console.log("Student Data for Group:", studentDataForGroup); // Debug log
  
      setStudentTransaction(prevState => {
        const updatedStudentTransaction = [...prevState, ...studentDataForGroup];
        console.log("Updated Student Transaction:", updatedStudentTransaction); // Debug log
        return updatedStudentTransaction;
      });
    }
  };
  
  

  const handleBackClick = (selectedId: number) => {
    setSelectedGroup(null);
    setDetailedData([]);
    setStudentTransaction([]);

    // Reset `is_tagged` to `false` only for the specific `fee_group_id`
    setData((prevData) =>
      prevData.map((item) =>
        item.fee_group_id === selectedId ? { ...item, is_tagged: false } : item
      )
    );
  };


  const handleAdjustmentChange = (feeGroupId: number, feeTypeId: number, value: string) => {
    // Update detailedData based on the selected group
    const newDetailedData = detailedData.map((item) => {
      if (item.feetype_id === feeTypeId && item.fee_group_id === feeGroupId) {
        // Parse the adjustment value and determine if it's negative or positive
        const adjustment = parseFloat(value) || 0;
        const isNegative = value.startsWith('-');
  
        // Calculate the total amount based on the adjustment being positive or negative
        const amount = parseFloat(item.amount);
        const totalAmount = isNegative
          ? amount - Math.abs(adjustment) // Subtract if negative
          : amount + Math.abs(adjustment); // Add if positive
  
        return {
          ...item,
          adjustment: value,
          total_amount: totalAmount.toFixed(2),
        };
      }
      return item;
    });
  
    setDetailedData(newDetailedData);
  
    // Update the data state
    const updatedData = data.map((item) => 
      item.feetype_id === feeTypeId && item.fee_group_id === feeGroupId
        ? { ...item, adjustment: value, total_amount: newDetailedData.find(d => d.feetype_id === feeTypeId)?.total_amount }
        : item
    );
  
    setData(updatedData);
  
    // If studentId is present, update the studentTransaction state
    if (studentId) {
      const updatedStudentTransaction = studentTransaction.map((item) =>
        item.feetype_id == feeTypeId && item.fee_group_id == feeGroupId
          ? { ...item, total_amount: newDetailedData.find(d => d.feetype_id === feeTypeId)?.total_amount }
          : item
      );
  
      setStudentTransaction(updatedStudentTransaction);
    }
  };
  
  

  const handleSubmit = async () => {

    try {
      const url = studentId
        ? `${DOMAIN}/api/staff/store-feetransaction`
        : `${DOMAIN}/api/staff/collectadmissionfees`;
  
      const requestBody = studentId 
        ? { transactions: studentTransaction } 
        : { data: data };
  
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const result = await response.json();
      console.log("Data submitted successfully:", result);
      setRefresh(true);
      handleClose();
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const calculateTotalAmount = (groupName: string) => {
    
    const groupItems = data.filter(
      (item) => item.fee_group_name === groupName
    );
    console.log(detailedData);
    
    return groupItems.reduce((total, item) => {
      const amountNum = parseFloat(item.amount) || 0;
      const adjustmentNum = parseFloat(item.adjustment) || 0;
      return total + amountNum + adjustmentNum;
    }, 0);
  };
  const handleCloseModal = () => {
    // Clear state variables when the modal is closed
    setSelectedGroup(null);
    setDetailedData([]);
    
    // Reset the data to default or null values
    setData([]);
    setGroupedData(new Map());
    setStudentTransaction([]);
    handleClose();
  };
  

  return createPortal(
    <Modal
      id="kt_modal_create_app"
      tabIndex={-1}
      size="lg"
      aria-hidden="true"
      dialogClassName="modal-dialog modal-dialog-centered mw-1000px"
      show={show}
      onHide={handleCloseModal}
    >
      <div
        className="modal-content"
        style={{ padding: "20px 5px", borderRadius: "17px" }}
      >
        <div
          className="modal-header border-0"
          style={{ width: "100%", height: "27px" }}
        >
          <span
            className=""
            id="staticBackdropLabel"
            style={{
              justifyContent: "center",
              textAlign: "center",
              alignItems: "center",
              fontSize: "24px",
              fontWeight: "600",
              fontFamily: "Manrope",
            }}
          >
            {selectedGroup ? "Fee Types" : "Collect Fees"}
          </span>
          <span
            data-bs-dismiss="modal"
            onClick={handleCloseModal}
            aria-label="Close"
          >
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
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        <hr />
        <div className="modal-body" style={{ padding: "20px" }}>
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            {selectedGroup ? (
              // Detailed view for fee types
              <>
                <Button
                  variant="secondary"
                  onClick={() => handleBackClick(selectedId)}
                  style={{ marginBottom: "10px" }}
                >
                  Back to Groups
                </Button>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "14px",
                    marginBottom: "0",
                  }}
                >
                  <thead style={{ backgroundColor: "#1C335C", color: "white" }}>
                    <tr>
                      <th
                        style={{ padding: "10px", border: "1px solid #dee2e6" }}
                      >
                        Fee Type
                      </th>
                      <th
                        style={{ padding: "10px", border: "1px solid #dee2e6" }}
                      >
                        Due Date
                      </th>
                      <th
                        style={{ padding: "10px", border: "1px solid #dee2e6" }}
                      >
                        Amount
                      </th>
                      <th
                        style={{ padding: "10px", border: "1px solid #dee2e6" }}
                      >
                        Adjustment
                      </th>
                      <th
                        style={{ padding: "10px", border: "1px solid #dee2e6" }}
                      >
                        Total Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailedData.map((item) => (
                      <tr key={item.feetype_id}>
                        <td
                          style={{
                            padding: "10px",
                            border: "1px solid #dee2e6",
                          }}
                        >
                          {item.fee_type_name}
                        </td>
                        <td
                          style={{
                            padding: "10px",
                            border: "1px solid #dee2e6",
                          }}
                        >
                          {formatDate(item.due_date)}
                        </td>
                        <td
                          style={{
                            padding: "10px",
                            border: "1px solid #dee2e6",
                          }}
                        >
                          {item.amount}
                        </td>
                        <td
                          style={{
                            padding: "10px",
                            border: "1px solid #dee2e6",
                          }}
                        >
                          <input
                            type="number"
                            onChange={(e) =>
                              handleAdjustmentChange(
                                item.fee_group_id,
                                item.feetype_id,
                                e.target.value
                              )
                            }
                            style={{ width: "100px" }}
                          />
                        </td>
                        <td
                          style={{
                            padding: "10px",
                            border: "1px solid #dee2e6",
                          }}
                        >
                          {(
                            parseFloat(item.amount) +
                            (parseFloat(item.adjustment) || 0)
                          ).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  <tfoot>
                    <tr>
                      <td
                        colSpan={4}
                        style={{ padding: "10px", border: "1px solid #dee2e6" }}
                      >
                        Total
                      </td>
                      <td
                        style={{ padding: "10px", border: "1px solid #dee2e6" }}
                      >
                        {calculateTotalAmount(selectedGroup)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </>
            ) : (
              // Initial view of groups
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "14px",
                  marginBottom: "0",
                }}
              >
                <thead style={{ backgroundColor: "#1C335C", color: "white" }}>
                  <tr>
                    <th
                      style={{ padding: "10px", border: "1px solid #dee2e6" }}
                    >
                      Fee Group
                    </th>
                    <th
                      style={{ padding: "10px", border: "1px solid #dee2e6" }}
                    >
                      Total Amount
                    </th>
                    <th
                      style={{ padding: "10px", border: "1px solid #dee2e6" }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {groupedData &&
                    Array.from(groupedData.entries()).map(
                      ([groupName, items]) => (
                        <tr key={groupName}>
                          <td
                            style={{
                              padding: "10px",
                              border: "1px solid #dee2e6",
                            }}
                          >
                            {groupName}
                          </td>
                          <td
                            style={{
                              padding: "10px",
                              border: "1px solid #dee2e6",
                            }}
                          >
                            {calculateTotalAmount(groupName)}
                          </td>
                          <td
                            style={{
                              padding: "10px",
                              border: "1px solid #dee2e6",
                            }}
                          >
                            <Button
                              variant="primary"
                              onClick={() => handleGroupClick(groupName)}
                            >
                              Collect
                            </Button>
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <div className="modal-footer border-0 d-flex justify-content-end">
          {selectedGroup && (
            <Button onClick={handleSubmit} variant="success">
              {loading ? "Submitting..." : "Submit"}
            </Button>
          )}
          <Button onClick={handleCloseModal} variant="secondary">
            Close
          </Button>
        </div>
      </div>
    </Modal>,
    modalsRoot
  );
};

export { CreateCollectFees };
