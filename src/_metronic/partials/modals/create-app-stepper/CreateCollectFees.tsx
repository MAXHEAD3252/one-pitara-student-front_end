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
  setRefresh: any;
  studentId : number | null;
};

interface FeeType {
  total_amount: any;
  adjustment: any;
  amount_paid: number;
  student_fees_master_id: any;
  feetype_id: number;
  fee_type_name: string;
  amount: string;
  due_date: string;
  status: string;
}

interface FeeGroup {
  student_fees_master_id: number;
  fee_group_id: number;
  fee_group_name: string;
  fee_session_group_id: string;
  fees: FeeType[];
}

interface OfflineFormData {
  paymentDate: string;
  student_fees_master_id: number;
  feeGroupId: number;
  feeTypeId: number;
  fee_group_id: number;
  fee_session_group_id: number;
  session_id: number;
  amount: number;
  bankName: string;
  branchName: string;
  accountHolderName: string;
  paymentMode: string;
  school_id: string;
  user_id: number;
  transection_ref_id: number;
}


interface ApplicationData {
  currentlyPaying: string;
  amount_paid: number;
  student_fees_master_id: any;
  fee_group_id: number | null;
  feetype_id: number | null;
  fee_session_group_id: string | null;
  fee_group_name: string | null;
  fee_type_name: string | null;
  amount: string ;
  due_date: string | null;
  status: string | null;
  adjustment: string;
  total_amount: number | null;
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
  const [showOfflineForm, setShowOfflineForm] = useState(false);
  const [offlineButtonText, setOfflineButtonText] = useState("Collect Offline");
  const [disableonlinebutton, setdisableonlinebutton] = useState("active");

  const [offlineFormData, setOfflineFormData] = useState<OfflineFormData>({
    student_fees_master_id: 0,
    feeGroupId: 0,
    feeTypeId: 0,
    fee_group_id: 0,
    fee_session_group_id: 0,
    session_id: 0,
    amount: 0,
    bankName: '',
    branchName: '',
    accountHolderName: '',
    paymentMode: '',
    paymentDate:'',
    school_id: '',
    user_id: 0,
    transection_ref_id: 0,
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOfflineFormData({
      ...offlineFormData,
      [name]: value,
    });
  };

  const handleOfflineClick = () => {
    if (showOfflineForm) {
      setShowOfflineForm(false);
      setOfflineButtonText("Collect Offline");
      setdisableonlinebutton('active')


    } else {
      setShowOfflineForm(true);
      setdisableonlinebutton('disable')
      setOfflineButtonText("Close");
    }
  };
  

  
  const [groupedData, setGroupedData] =
    useState<Map<string, ApplicationData[]>>();
  // const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [detailedData, setDetailedData] = useState<ApplicationData[]>([]);
  const [selectedId, setSelectedId] = useState(0);
  const [studentTransaction, setStudentTransaction] = useState([]);
  const [transactionDetails, setTransactionDetails] = useState([]);
const [showTransactionDetails, setShowTransactionDetails] = useState(false);
  
  console.log(detailedData)
    
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
            due_date: fee.due_date,            
            status: fee.status,    
            amount_paid : fee.amount_paid,        
            adjustment: fee.adjustment, 
            total_amount: fee.total_amount, // Initialize total_amount with amount value
            session_id: session_id, // Add session_id prop
            school_id: schoolId, // Add school_id from auth
            user_id: userId, // Add user_id from auth
            enqId:enqId,
            student_fees_master_id: fee.student_fees_master_id,
          };
  
          // Conditionally add properties based on whether it's student data or not
          if (isStudentData) {
            return {
              ...commonData,
              student_fees_master_id: fee.student_fees_master_id,
              student_id: studentId, // Add student_id for student data
            };
          } else {
            return {
              ...commonData,
              due_date: fee.due_date,
              status: fee.status,  
              amount_paid : fee.amount_paid,
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
        console.log(result)
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
    setShowOfflineForm(false);
    setOfflineButtonText("Collect Offline");
    // Reset `is_tagged` to `false` only for the specific `fee_group_id`
    setData((prevData) =>
      prevData.map((item) =>
        item.fee_group_id === selectedId ? { ...item, is_tagged: false } : item
      )
    );
  };

  
  

  const handleAdjustmentChange = (
    feeGroupId: number,
    feeTypeId: number,
    value: string,
    type: 'adjustment' | 'currentlyPaying' // Added a type parameter to differentiate between adjustment and currently paying
  ) => {
    // Update detailedData based on the selected group
    const newDetailedData = detailedData.map((item) => {
      if (item.feetype_id === feeTypeId && item.fee_group_id === feeGroupId) {
        const adjustmentValue = type === 'adjustment' ? value : item.adjustment || '0';
        const currentlyPayingValue = type === 'currentlyPaying' ? value : item.currentlyPaying || '0';
  
        const adjustment = parseFloat(adjustmentValue) || 0;
        const currentlyPaying = parseFloat(currentlyPayingValue) || 0;
        const isNegative = adjustmentValue.startsWith('-');
        
        const amount = parseFloat(item.amount);
        const totalAmount = isNegative
          ? amount - Math.abs(adjustment)
          : amount + Math.abs(adjustment);
  
        return {
          ...item,
          adjustment: type === 'adjustment' ? value : item.adjustment,
          currentlyPaying: type === 'currentlyPaying' ? value : item.currentlyPaying,
          total_amount: totalAmount
        };
      }
      return item;
    });
  
    setDetailedData(newDetailedData);
  
    // Update the data state
    const updatedData = data.map((item) =>
      item.feetype_id === feeTypeId && item.fee_group_id === feeGroupId
        ? { 
            ...item, 
            adjustment: type === 'adjustment' ? value : item.adjustment,
            currentlyPaying: type === 'currentlyPaying' ? value : item.currentlyPaying,
            total_amount: newDetailedData.find(d => d.feetype_id === feeTypeId)?.total_amount 
          }
        : item
    );
  
    setData(updatedData);
  
    // If studentId is present, update the studentTransaction state
    if (studentId) {
      const updatedStudentTransaction = studentTransaction.map((item) =>
        item.feetype_id === feeTypeId && item.fee_group_id === feeGroupId
          ? { 
              ...item, 
              adjustment: type === 'adjustment' ? value : item.adjustment,
              currentlyPaying: type === 'currentlyPaying' ? value : item.currentlyPaying,
              total_amount: newDetailedData.find(d => d.feetype_id === feeTypeId)?.total_amount 
            }
          : item
      );
  
      setStudentTransaction(updatedStudentTransaction);
    }
  };
  
  const offlineFormSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/offline-form-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(offlineFormData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        // Handle success
        console.log('Form submitted successfully:', result);
      } else {
        // Handle error
        console.error('Error submitting form:', result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  

  const handleSubmit = async () => {

    try {
      const url = studentId
        ? `${DOMAIN}/api/staff/store-feetransaction`
        : `${DOMAIN}/api/staff/collectadmissionfees`;

        console.log(studentTransaction)
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
  

  
  const fetchTransactionDetails = async (studentFeesMasterId: string) => {
    try {
      const response = await fetch(`${DOMAIN}/api/staff/offline-form-submit/${studentFeesMasterId}`);
      if (!response.ok) {
        throw new Error(`Network response was not ok for URL`);
      }
      const result = await response.json();
      console.log(result)
      setTransactionDetails(result);
      setShowTransactionDetails(true);
    } catch (error) {
      console.error('Error fetching transaction details:', error);
    }
  };

// Function to handle closing the transaction details view
const handleCloseTransactionDetails = () => {
  setShowTransactionDetails(false);
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
            style={{cursor:'pointer'}}
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
        {showTransactionDetails ? (
          <>
           <div className="modal-header border-0">
          <button
            type="button"
            className="btn-close btn-close-large"
            aria-label="Close"
            onClick={handleCloseTransactionDetails}
          ></button>
        </div>
        <div className="modal-body">
        {transactionDetails.map((item, index) => (
  <div key={index} className="transaction-detail-card card mb-3">
    <div className="card-header">
      <h5 className="card-title">Transaction Details</h5>
    </div>
    <div className="card-body">
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <strong>Transaction ID:</strong> {item.transaction_id}
        </li>
        <li className="list-group-item">
          <strong>Transaction Date:</strong> {item.transaction_date}
        </li>
        <li className="list-group-item">
          <strong>Student Fees Master ID:</strong> {item.student_fees_master_id}
        </li>
        <li className="list-group-item">
          <strong>Amount:</strong> {item.amount}
        </li>
        <li className="list-group-item">
          <strong>Payment Method:</strong> {item.payment_method}
        </li>
        <li className="list-group-item">
          <strong>Transaction Reference:</strong> {item.transaction_ref}
        </li>
        <li className="list-group-item">
          <strong>Status:</strong> {item.status}
        </li>
      </ul>
    </div>
  </div>
))}
        </div>
          </>):(

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
              <th style={{ padding: "10px", border: "1px solid #dee2e6" }}>Fee Type</th>
              <th style={{ padding: "10px", border: "1px solid #dee2e6" }}>Due Date</th>
              <th style={{ padding: "10px", border: "1px solid #dee2e6" }}>Amount</th>
              <th style={{ padding: "10px", border: "1px solid #dee2e6" }}>Adjustment</th>
              <th style={{ padding: "10px", border: "1px solid #dee2e6" }}>Total Amount</th>
              <th style={{ padding: "10px", border: "1px solid #dee2e6" }}>Status</th>
              <th style={{ padding: "10px", border: "1px solid #dee2e6" }}>Amount Paid</th>
              <th style={{ padding: "10px", border: "1px solid #dee2e6" }}>Pending Amount</th>
              <th style={{ padding: "10px", border: "1px solid #dee2e6" }}>currently paying</th>
            </tr>
          </thead>
          <tbody>
            {detailedData.map((item) => {
              const isPaid = item.status === "paid" || disableonlinebutton === 'disable';

              return (
                <tr
                  key={item.feetype_id}
                  style={{
                    backgroundColor: isPaid ? "#f5f5f5" : "inherit", // Faded color for paid rows
                    opacity: isPaid ? 0.5 : 1, // Reduce opacity for paid rows
                  }}
                >
                  <td style={{display:'flex',flexDirection:'column',alignItems:'center', padding: "10px", border: "1px solid #dee2e6" }}>{item.fee_type_name}
                  <div
                          style={{
                            width: "32px",
                            height: "35px",
                            borderRadius: "6px",
                            padding: "6px 6px 6px 6px",
                            gap: "10px",
                            // backgroundColor: "#F5F5F5",
                            backgroundColor: "#b0efff",
                            display: "flex",
                            cursor: "pointer",
                          }}
                          onClick={() => fetchTransactionDetails (item.student_fees_master_id)}
                        >
                          <img
                            src="/media/svg/files/view.svg"
                            style={{ width: "22px", height: "22px",}}
                          />
                          </div>
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>{formatDate(item.due_date)}</td>
                  <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>{item.amount}</td>
                  <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                    <input
                      type="number"
                      disabled={isPaid} // Disable input if the status is paid
                      value={item.adjustment}
                      onChange={(e) =>
                        handleAdjustmentChange(
                          item.fee_group_id,
                          item.feetype_id,
                          e.target.value,
                          'adjustment' // Specify that this is for adjustment
                        )
                      }
                      style={{ width: "100px" }}
                    />
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                    {(
                      parseFloat(item.amount) +
                      (parseFloat(item.adjustment) || 0)
                    ).toFixed(2)}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                    {item.status}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>{item.amount_paid}</td>
                  <td style={{ padding: "10px", border: "1px solid #dee2e6" }}> {(
                      parseFloat(item.total_amount) -
                      (parseFloat(item.amount_paid))
                    ).toFixed(2)}</td>
                  <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                    <input
                      type="number"
                      disabled={isPaid} // Disable input if the status is paid
                      onChange={(e) =>
                        handleAdjustmentChange(
                          item.fee_group_id,
                          item.feetype_id,
                          e.target.value,
                          'currentlyPaying' // Specify that this is for currently paying
                        )
                      }
                      style={{ width: "100px" }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan={4} style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                Total
              </td>
              <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                {calculateTotalAmount(selectedGroup)}
              </td>
            </tr>
          </tfoot>
        </table>)}
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
            <th style={{ padding: "10px", border: "1px solid #dee2e6" }}>Fee Group</th>
            <th style={{ padding: "10px", border: "1px solid #dee2e6" }}>Total Amount</th>
            <th style={{ padding: "10px", border: "1px solid #dee2e6" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {groupedData &&
            Array.from(groupedData.entries()).map(([groupName, items]) => (
              <tr key={groupName}>
                <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>{groupName}</td>
                <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                  {calculateTotalAmount(groupName)}
                </td>
                <td style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                  <Button variant="primary" onClick={() => handleGroupClick(groupName)}>
                    Collect
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    )}
  </div>
 
  {showOfflineForm && (
    <div className="offline-form mt-3">
      <h5 style={{marginBottom:'30px',marginTop:'30px',fontSize:'16px'}}>Offline Payment Details</h5>
            <form onSubmit={offlineFormSubmit}>
            <div style={{ marginBottom: "23px" }}>
              {/* row start */}
              <div
                className="fv-row mb-10"
                style={{ display: "flex", gap: "10px" }}
              >
                <div
                  className="form-floating mb-3"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <input
                    type="text"
                    className="form-control"
                    id="back_name"
                    name="back_name"
                    placeholder=""
                    value={offlineFormData.bankName}
                    onChange={handleChange}
                  />
                  <label htmlFor="back_name">Bank Name</label>
                </div>
                <div
                  className="form-floating mb-3"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <input
                    type="number"
                    className="form-control"
                    id="transection-reference_id"
                    name="transection-reference_id"
                    placeholder=""
                    value={offlineFormData.transection_ref_id}
                    onChange={handleChange}
                  />
                  <label htmlFor="transection-reference_id">Transection Id / Reference Number</label>
                </div>
                <div
                  className="form-floating mb-3"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <input
                    type="text"
                    className="form-control"
                    id="accountholdername"
                    name="accountholdername"
                    placeholder=""
                    value={offlineFormData.accountHolderName}
                    onChange={handleChange}
                  />
                  <label htmlFor="accountholdername">Account Holder Name</label>
                </div>
              </div>
              <div
                className="fv-row mb-10"
                style={{ display: "flex", gap: "10px" }}
              >
                <div
                  className="form-floating mb-3"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <input
                    type="text"
                    className="form-control"
                    id="branchname"
                    name="branchname"
                    placeholder=""
                    value={offlineFormData.branchName}
                    onChange={handleChange}
                  />
                  <label htmlFor="branchname">Branch Name</label>
                </div>
                <div
                  className="form-floating mb-3"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <input
                    type="date"
                    className="form-control"
                    id="paymentDate"
                    name="paymentDate"
                    placeholder=""
                    value={offlineFormData.paymentDate}
                    onChange={handleChange}
                  />
                  <label htmlFor="paymentDate">Payment Date</label>
                </div>
                <div
                  className="form-floating mb-3"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <select
                    className="form-select"
                    id="reference"
                    name="reference"
                    aria-label="Default select example"
                    value={offlineFormData.paymentMode}
                    onChange={handleChange}
                  >
                    <option value="cash">Cash</option>
                    <option value="check">Check</option>
                    <option value="check">Back Transfer</option>
                    <option value="check">Demand Draft</option>
                    <option value="bank_transfer">Bank Transfer</option>
                  </select>
                  <label htmlFor="reference">Select Reference</label>
                </div>
                
              </div>
              <div
                className="fv-row mb-10"
                style={{ display: "flex", gap: "10px" }}
              >
                <div
                  className="form-floating mb-3"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <input
                    type="number"
                    className="form-control"
                    id="student_email"
                    name="student_email"
                    placeholder=""
                    value={offlineFormData.amount}
                    onChange={handleChange}
                  />
                  <label htmlFor="student_email">Amount Paid</label>
                </div>
              </div>
              <button
              type="button"
              className="btn btn-primary"
              // onClick={handleSubmit}
              style={{ marginTop: '20px' }}
            >
              Submit
            </button>
              </div>
              </form>
    </div>
  )}
</div>

{selectedGroup && (
  <div className="modal-footer border-0 d-flex justify-content-end">
    <Button onClick={handleSubmit} variant="success"
      disabled={detailedData.every((item) => item.status === "paid" || disableonlinebutton === 'disable')}
      >
      {loading ? "Sending..." : "Send Payment Link"}
    </Button>
    <Button
      onClick={handleOfflineClick}
      variant="secondary"
      disabled={detailedData.every((item) => item.status === "paid")}
    >
      {offlineButtonText}
    </Button>
  </div>
)}
</div>

    </Modal>,
    modalsRoot
  );
};


export { CreateCollectFees };
