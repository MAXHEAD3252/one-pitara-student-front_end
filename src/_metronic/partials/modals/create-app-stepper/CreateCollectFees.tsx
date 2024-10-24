import { ChangeEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Modal, Button } from "react-bootstrap";
import { useAuth } from "../../../../app/modules/auth/core/Auth";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  show: boolean;
  handleClose: () => void;
  class_id: string | undefined;
  session_id: string | undefined;
  admission_enquiry_id: string | null;
  enqId: string | null;
  studentId: number | null;
  studentEmail: string | null;
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
  paymentMode: string;
  paymentDate: string;
  checkNo?: string;
  accountHolderName?: string;
  branchName?: string;
  ifscCode?: string;
  bankName?: string;
  transactionRef?: string;
  transferDate?: string;
}

interface ApplicationData {
  currentlyPaying: string | null;
  amount_paid: number;
  student_fees_master_id: any;
  fee_group_id: number | null;
  feetype_id: number | null;
  fee_session_group_id: string | null;
  fee_group_name: string | null;
  fee_type_name: string | null;
  amount: string;
  due_date: string | null;
  status: string | null;
  adjustment: string | null;
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
  studentId,
  studentEmail,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const schoolId = currentUser?.school_id;
  const userId = currentUser?.id;
  const [data, setData] = useState<ApplicationData[]>([]);
  const [showOfflineForm, setShowOfflineForm] = useState(false);
  const [offlineButtonText, setOfflineButtonText] = useState("Collect Offline");
  const [disableonlinebutton, setdisableonlinebutton] = useState("active");
  const [allRefresh, setAllRefresh] = useState(false);
  const [groupedData, setGroupedData] =
    useState<Map<string, ApplicationData[]>>();
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [detailedData, setDetailedData] = useState<ApplicationData[]>([]);

  const [selectedId, setSelectedId] = useState(0);
  const [studentTransaction, setStudentTransaction] = useState([]);
  const [sendOffline, setSendOffline] = useState([]);
  const [transactionDetails, setTransactionDetails] = useState([]);
  const [showTransactionDetails, setShowTransactionDetails] = useState(false);
  const [offlineFormData, setOfflineFormData] = useState<OfflineFormData>({
    paymentMode: "",
    paymentDate: "",
    checkNo: null,
    accountHolderName: "",
    branchName: "",
    ifscCode: "",
    bankName: "",
    transactionRef: "",
    transferDate: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setOfflineFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOfflineClick = () => {
    if (showOfflineForm) {
      setShowOfflineForm(false);
      setOfflineButtonText("Collect Offline");
      setdisableonlinebutton("active");
    } else {
      setShowOfflineForm(true);
      setdisableonlinebutton("disable");
      setOfflineButtonText("Close");
    }
  };

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
            amount_paid: fee.amount_paid,
            adjustment: fee.adjustment,
            total_amount: fee.total_amount, // Initialize total_amount with amount value
            session_id: session_id, // Add session_id prop
            school_id: schoolId, // Add school_id from auth
            user_id: userId, // Add user_id from auth
            enqId: enqId,
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
              amount_paid: fee.amount_paid,
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
          ? `${DOMAIN}/api/school/get-studentwisefeegrouptype/${schoolId}/${studentId}/${session_id}`
          : `${DOMAIN}/api/school/get-feegrouptype/${schoolId}/${class_id}/${session_id}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Network response was not ok for URL: ${url}`);
        }

        const result: FeeGroup[] = await response.json();
        console.log(result);
        setAllRefresh(false);
        // Format the data based on whether student data is present
        formatData(result, Boolean(studentId));
      } catch (error) {
        console.error("Error fetching fee group/type data:", error);
      }
    };

    if (show) {
      fetchFeeGroupType();
    }
  }, [schoolId, class_id, session_id, studentId, show, DOMAIN, allRefresh]);

  const handleGroupClick = (groupName: string) => {
    const groupDetails = groupedData.get(groupName);

    if (!groupDetails) {
      console.error("No details found for group:", groupName);
      return;
    }

    const groupId = groupDetails[0]?.fee_group_id;

    if (!groupId) {
      console.error("Invalid group ID:", groupId);
      return;
    }

    // Update selected state
    setSelectedId(groupId);
    setSelectedGroup(groupName);
    setDetailedData(groupDetails);

    // Update `is_tagged` to `true` only for the specific `fee_group_id`
    setData((prevData) =>
      prevData.map((item) =>
        item.fee_group_id === groupId ? { ...item, is_tagged: true } : item
      )
    );

    // If studentId is present, store all data related to the groupId in studentTransaction
    if (studentId) {
      const studentDataForGroup = groupDetails.map((item) => ({
        student_id: studentId,
        student_email: studentEmail,
        student_fees_master_id: item.student_fees_master_id,
        feetype_id: item.feetype_id,
        fee_group_id: item.fee_group_id,
        user_id: item.user_id,
        school_id: item.school_id,
        total_amount: item.total_amount, // Include total amount, default to amount if total_amount is not present
        // Add any other specific fields you want to include here
      }));

      console.log("Student Data for Group:", studentDataForGroup); // Debug log

      setStudentTransaction((prevState) => {
        const updatedStudentTransaction = [
          ...prevState,
          ...studentDataForGroup,
        ];
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
    type: "adjustment" | "currentlyPaying" // Added a type parameter to differentiate between adjustment and currently paying
  ) => {
    // Update detailedData based on the selected group
    const newDetailedData = detailedData.map((item) => {
      if (item.feetype_id === feeTypeId && item.fee_group_id === feeGroupId) {
        const adjustmentValue =
          type === "adjustment" ? value : item.adjustment || "0";
        const currentlyPayingValue =
          type === "currentlyPaying" ? value : item.currentlyPaying || "0";

        const adjustment = parseFloat(adjustmentValue) || 0;
        const currentlyPaying = parseFloat(currentlyPayingValue) || 0;
        const isNegative = adjustmentValue.startsWith("-");

        const amount = parseFloat(item.amount);
        const totalAmount = isNegative
          ? amount - Math.abs(adjustment)
          : amount + Math.abs(adjustment);

        return {
          ...item,
          adjustment: type === "adjustment" ? value : item.adjustment,
          currentlyPaying:
            type === "currentlyPaying" ? value : item.currentlyPaying,
          total_amount: totalAmount,
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
            adjustment: type === "adjustment" ? value : item.adjustment,
            currentlyPaying:
              type === "currentlyPaying" ? value : item.currentlyPaying,
            total_amount: newDetailedData.find(
              (d) => d.feetype_id === feeTypeId
            )?.total_amount,
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
              adjustment: type === "adjustment" ? value : item.adjustment,
              currentlyPaying:
                type === "currentlyPaying" ? value : item.currentlyPaying,
              total_amount: newDetailedData.find(
                (d) => d.feetype_id === feeTypeId
              )?.total_amount,
            }
          : item
      );

      setStudentTransaction(updatedStudentTransaction);
      setSendOffline(updatedStudentTransaction);
    }
  };

  const offlineFormSubmit = async (e) => {
    e.preventDefault();
    const updatedOfflineFormData = {
      ...offlineFormData,
      ...sendOffline,
    };
    try {
      // const response = await fetch(`${DOMAIN}/api/school/get-studentwisefeegrouptype/${}`, {
      const response = await fetch(
        `${DOMAIN}/api/school/store-offlinefeetransaction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedOfflineFormData),
        }
      );

      const result = await response.json();
      console.log(result);
      

      if (result.status === 200) {
        // Handle success
        console.log("Form submitted successfully:", result);
        setShowOfflineForm(false);
        setOfflineButtonText("Collect Offline");
        setdisableonlinebutton("active");
        setAllRefresh(true)
      } else {
        // Handle error
        console.error("Error submitting form:", result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleSubmit = async () => {
    setLoading(true); // Optionally show loading state

    try {
      if (!studentEmail || studentEmail.trim() === "") {
        toast.error(
          "Error: Student email is not present. Cannot send the transaction."
        );
        return; // Exit the function to prevent further execution
      }

      const url = studentId
        ? `${DOMAIN}/api/school/store-feetransaction`
        : `${DOMAIN}/api/school/collectadmissionfees`;

      const requestBody = studentId
        ? { transactions: studentTransaction }
        : { data: data };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      // Check if the response is not OK (status is not 200-299)
      if (!response.ok) {
        // Get the JSON error message from the response body
        const errorData = await response.json();
        throw new Error(errorData.error || "Network response was not ok");
      }

      const result = await response.json();
      toast.success("Data submitted successfully!");
      setAllRefresh(true); // Optionally refresh the UI
      handleClose(); // Optionally close the modal or form
    } catch (error) {
      // Display the error message in toast
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false); // Stop loading spinner or state
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
    const groupItems = data.filter((item) => item.fee_group_name === groupName);

    return groupItems.reduce((total, item) => {
      const amountNum = parseFloat(item.amount) || 0;
      const adjustmentNum = parseFloat(item.adjustment) || 0;
      return total + amountNum + adjustmentNum;
    }, 0);
  };

  const calculateTotalAmountPaid = (groupName: string, data: any[]): number => {
    const groupItems = data.filter((item) => item.fee_group_name === groupName);

    return groupItems.reduce((total, item) => {
      const amountPaid = parseFloat(item.amount_paid) || 0;
      const adjustment = parseFloat(item.adjustment) || 0;
      return total + amountPaid + adjustment;
    }, 0);
  };

  const calculateTotalPendingAmount = (
    groupName: string,
    data: any[]
  ): number => {
    const groupItems = data.filter((item) => item.fee_group_name === groupName);

    return groupItems.reduce((total, item) => {
      const totalAmount = parseFloat(item.total_amount) || 0;
      const amountPaid = parseFloat(item.amount_paid) || 0;
      return total + (totalAmount - amountPaid);
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
      const response = await fetch(
        `${DOMAIN}/api/school/get-transection-details/${studentFeesMasterId}`
      );
      if (!response.ok) {
        throw new Error(`Network response was not ok for URL`);
      }
      const result = await response.json();
      console.log(result);
      setTransactionDetails(result);
      setShowTransactionDetails(true);
    } catch (error) {
      console.error("Error fetching transaction details:", error);
    }
  };

  // Function to handle closing the transaction details view
  const handleCloseTransactionDetails = () => {
    setShowTransactionDetails(false);
  };


  const handleModalClose = () => {
    // Reset all useState values to their default or null
    setLoading(false);
    setData([]);
    setShowOfflineForm(false);
    setOfflineButtonText("Collect Offline");
    setdisableonlinebutton("active");
    setAllRefresh(false);
    setGroupedData(undefined);
    setSelectedGroup(null);
    setDetailedData([]);
    setSelectedId(0);
    setStudentTransaction([]);
    setSendOffline([]);
    setTransactionDetails([]);
    setShowTransactionDetails(false);
    setOfflineFormData({
      paymentMode: "",
      paymentDate: "",
      checkNo: null,
      accountHolderName: "",
      branchName: "",
      ifscCode: "",
      bankName: "",
      transactionRef: "",
      transferDate: "",
    });

    // Call the original handleClose from props
    handleClose();
  };

  <style>{`
    .custom-modal .modal-dialog {
      max-width: 90%; /* Adjust the modal width according to the content */
      width: auto; /* Let width adapt to content */
    }
    .custom-modal .modal-content {
      padding: 20px; /* Ensure padding around the content */
    }
  `}</style>;

  return createPortal(
    <Modal
      id="kt_modal_create_app"
      tabIndex={-1}
      size="xl"
      aria-hidden="true"
      dialogClassName="modal-dialog modal-dialog-centered"
      show={show}
      onHide={handleCloseModal}
    >
      <div
        className="modal-header"
        style={{
          backgroundColor: "#F2F6FF",
          borderBottom: "1px solid lightgray",
          fontFamily: "Manrope",
        }}
      >
        <h2>
          {" "}
          {showTransactionDetails
            ? "Transaction Details"
            : selectedGroup
            ? "Fee Types"
            : "Collect Fees"}
        </h2>
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={handleModalClose}
        >
          <i className="fas fa-times"></i>
        </div>
      </div>

      <div
        className="modal-body py-lg-5 px-lg-5"
        style={{
          backgroundColor: "#F2F6FF",
        }}
      >
        {selectedGroup ? (
          // Detailed view for fee types
          <>
            <div
              style={{
                display: "flex",
                gap: "10px", // Adds space between the buttons
                justifyContent: "left", // Aligns buttons horizontally in the center
                alignItems: "center", // Vertically centers the buttons
                marginBottom: "10px",
              }}
            >
              <div
                onClick={
                  showTransactionDetails
                    ? handleCloseTransactionDetails
                    : () => handleBackClick(selectedId)
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 12px",
                  backgroundColor: "#1C335C",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="white"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 1-.5.5H3.707l4.147 4.146a.5.5 0 0 1-.708.708l-5-5a.5.5 0 0 1 0-.708l5-5a.5.5 0 0 1 .708.708L3.707 7.5H14.5A.5.5 0 0 1 15 8z"
                  />
                </svg>
              </div>
            </div>

            {showTransactionDetails ? (
              <>
                <div
                  style={{
                    height: "auto", // Fixed height for the table container
                    overflowY: "hidden",
                    // border:'1px solid'
                  }}
                >
                  <table
                    className="table"
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      // marginTop: "10px",
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
                          Transaction ID
                        </th>
                        <th
                          style={{
                            padding: "12px 20px",
                            textAlign: "left",
                          }}
                        >
                          Transaction Date
                        </th>
                        <th
                          style={{
                            padding: "12px 20px",
                            textAlign: "left",
                          }}
                        >
                          Student Fees Master ID
                        </th>
                        <th
                          style={{
                            padding: "12px 20px",
                            textAlign: "left",
                          }}
                        >
                          Amount
                        </th>
                        <th
                          style={{
                            padding: "12px 20px",
                            textAlign: "left",
                          }}
                        >
                          Payment Method
                        </th>
                        <th
                          style={{
                            padding: "12px 20px",
                            textAlign: "left",
                          }}
                        >
                          Transaction Reference
                        </th>
                        <th
                          style={{
                            padding: "12px 20px",
                            textAlign: "left",
                          }}
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactionDetails.map((item, index) => (
                        <tr
                          key={index}
                          style={{
                            backgroundColor:
                              index % 2 === 0
                                ? "rgb(242, 246, 255)"
                                : "#FFFFFF",
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
                            {item.transaction_id}
                          </td>
                          <td
                            style={{
                              padding: "12px 20px",
                            }}
                          >
                            {new Date(
                              item.transaction_date
                            ).toLocaleDateString()}
                          </td>
                          <td
                            style={{
                              padding: "12px 20px",
                            }}
                          >
                            {item.student_fees_master_id}
                          </td>
                          <td
                            style={{
                              padding: "12px 20px",
                            }}
                          >{`$${Number(item.amount).toFixed(2)}`}</td>{" "}
                          {/* Conversion to number */}
                          <td
                            style={{
                              padding: "12px 20px",
                            }}
                          >
                            {item.payment_method}
                          </td>
                          <td
                            style={{
                              padding: "12px 20px",
                            }}
                          >
                            {item.transaction_ref || "N/A"}
                          </td>
                          <td
                            style={{
                              padding: "12px 20px",
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "Manrope",
                                fontSize: "14px",
                              }}
                              className={`badge ${
                                item.status === "Success"
                                  ? "bg-success"
                                  : "bg-danger"
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div
                style={{
                  height: "auto", // Fixed height for the table container
                  overflowY: "auto", // Enable vertical scrolling
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
                        Fee Type
                      </th>
                      <th
                        style={{
                          padding: "12px 20px",
                          textAlign: "left",
                        }}
                      >
                        Due Date
                      </th>
                      <th
                        style={{
                          padding: "12px 20px",
                          textAlign: "left",
                        }}
                      >
                        Amount
                      </th>
                      <th
                        style={{
                          padding: "12px 20px",
                          textAlign: "left",
                        }}
                      >
                        Adjustment
                      </th>
                      <th
                        style={{
                          padding: "12px 20px",
                          textAlign: "left",
                        }}
                      >
                        Total Amount
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
                          textAlign: "left",
                        }}
                      >
                        Amount Paid
                      </th>
                      <th
                        style={{
                          padding: "12px 20px",
                          textAlign: "left",
                        }}
                      >
                        Pending Amount
                      </th>
                      <th
                        style={{
                          padding: "12px 20px",
                          textAlign: "left",
                        }}
                      >
                        Currently Paying
                      </th>
                      <th
                        style={{
                          padding: "12px 20px",
                          textAlign: "left",
                        }}
                      >
                        Transaction History
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailedData.map((item) => {
                      const isPaid =
                        item.status === "paid" ||
                        disableonlinebutton === "disable";
                      return (
                        <tr
                          key={item.feetype_id}
                          style={{
                            backgroundColor:
                              item.feetype_id % 2 === 0
                                ? "rgb(242, 246, 255)"
                                : "#FFFFFF",
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
                            {item.fee_type_name}
                          </td>
                          <td
                            style={{
                              padding: "12px 20px",
                            }}
                          >
                            {formatDate(item.due_date)}
                          </td>
                          <td
                            style={{
                              padding: "12px 20px",
                            }}
                          >
                            {item.amount}
                          </td>
                          <td
                            style={{
                              padding: "12px 20px",
                            }}
                          >
                            <input
                              type="number"
                              disabled={isPaid}
                              value={item.adjustment}
                              onChange={(e) =>
                                handleAdjustmentChange(
                                  item.fee_group_id,
                                  item.feetype_id,
                                  e.target.value,
                                  "adjustment"
                                )
                              }
                              style={{ width: "100px" }}
                            />
                          </td>
                          <td
                            style={{
                              padding: "12px 20px",
                            }}
                          >
                            {(
                              parseFloat(item.amount) +
                              (parseFloat(item.adjustment) || 0)
                            ).toFixed(2)}
                          </td>
                          <td
                            style={{
                              padding: "12px 20px",
                            }}
                          >
                            {item.status}
                          </td>
                          <td
                            style={{
                              padding: "12px 20px",
                            }}
                          >
                            {item.amount_paid}
                          </td>
                          <td
                            style={{
                              padding: "12px 20px",
                            }}
                          >
                            {(
                              parseFloat(item.total_amount) -
                              parseFloat(item.amount_paid)
                            ).toFixed(2)}
                          </td>
                          <td
                            style={{
                              padding: "12px 20px",
                            }}
                          >
                            <input
                              type="number"
                              disabled={isPaid}
                              onChange={(e) =>
                                handleAdjustmentChange(
                                  item.fee_group_id,
                                  item.feetype_id,
                                  e.target.value,
                                  "currentlyPaying" // Specify that this is for currently paying
                                )
                              }
                              value={item.currentlyPaying}
                              placeholder={(
                                parseFloat(item.total_amount) -
                                parseFloat(item.amount_paid)
                              ).toFixed(2)}
                              style={{ width: "100px" }}
                            />
                          </td>

                          <td
                            style={{
                              padding: "12px 20px",
                            }}
                          >
                            <div
                              style={{
                                width: "32px",
                                height: "35px",
                                borderRadius: "6px",
                                padding: "6px",
                                backgroundColor: "#b0efff",
                                display: "flex",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                fetchTransactionDetails(
                                  item.student_fees_master_id
                                )
                              }
                            >
                              <img
                                src="/media/svg/files/view.svg"
                                alt="View"
                                style={{ width: "22px", height: "22px" }}
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>

                  <tfoot>
                    <tr
                      style={{
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
                        colSpan={2}
                      >
                        Total
                      </td>
                      <td
                        style={{
                          padding: "12px 20px",
                        }}
                      >
                        {calculateTotalAmount(selectedGroup)}
                      </td>
                      <td
                        style={{
                          padding: "12px 20px",
                        }}
                        colSpan={3}
                      >
                        Total Paid
                      </td>
                      <td
                        style={{
                          padding: "12px 20px",
                        }}
                      >
                        {calculateTotalAmountPaid(selectedGroup, data).toFixed(
                          2
                        )}
                      </td>
                      <td
                        style={{
                          padding: "12px 20px",
                        }}
                        colSpan={2}
                      >
                        Total Pending
                      </td>
                      <td
                        style={{
                          padding: "12px 20px",
                        }}
                      >
                        {calculateTotalPendingAmount(
                          selectedGroup,
                          data
                        ).toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
                <div className="modal-footer border-0 d-flex justify-content-end">
                  <Button
                    onClick={handleSubmit}
                    variant="success"
                    disabled={detailedData.every(
                      (item) =>
                        item.status === "paid" ||
                        disableonlinebutton === "disable"
                      // || showTransactionDetails === true
                    )}
                  >
                    {loading ? "Sending..." : "Send Payment Link"}
                  </Button>
                  <Button
                    onClick={handleOfflineClick}
                    variant="secondary"
                    disabled={detailedData.every(
                      (item) => item.status === "paid"
                      // || showTransactionDetails === true
                    )}
                  >
                    {offlineButtonText}
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          // Initial view of groups
          <div
            style={{
              height: "auto", // Fixed height for the table container
              overflowY: "auto", // Enable vertical scrolling
              // padding: "16px 0", // Optional: adds some padding around the table
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
                    Fee Group
                  </th>
                  <th
                    style={{
                      padding: "12px 20px",
                      textAlign: "left",
                    }}
                  >
                    Total Amount
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
                {groupedData &&
                  Array.from(groupedData.entries()).map(
                    ([groupName, items]) => (
                      <tr
                        key={groupName}
                        style={{
                          backgroundColor:
                            groupName.id % 2 === 0
                              ? "rgb(242, 246, 255)"
                              : "#FFFFFF",
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
                          {groupName}
                        </td>
                        <td
                          style={{
                            padding: "12px 20px",
                          }}
                        >
                          {calculateTotalAmount(groupName)}
                        </td>
                        <td
                          style={{
                            display: "flex",
                            gap: "10px", // Adds space between the buttons
                            justifyContent: "right", // Aligns buttons horizontally in the center
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
                            onClick={() => handleGroupClick(groupName)}
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
                              Collect
                            </span>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
          </div>
        )}

        {showOfflineForm && (
          <div className="offline-form mt-3">
            <hr />
            <h5
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#1C335C",
                fontFamily: "Manrope",
              }}
            >
              Offline Payment Details
            </h5>
            <form onSubmit={offlineFormSubmit}>
              <div style={{ marginBottom: "23px" }}>
                {/* Payment Mode Selection */}
                <div
                  className="fv-row mb-5"
                  style={{ display: "flex", gap: "10px" }}
                >
                  <div
                    className="form-floating mb-3"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      color: "#1C335C",
                      fontFamily: "Manrope",
                    }}
                  >
                    <select
                      className="form-select"
                      id="paymentMode"
                      name="paymentMode"
                      aria-label="Payment Mode"
                      value={offlineFormData.paymentMode}
                      onChange={handleChange}
                    >
                      <option value="">Select Payment Mode</option>
                      <option value="cash">Cash</option>
                      <option value="check">Check</option>
                      <option value="bank_transfer">Bank Transfer</option>
                      <option value="demand_draft">Demand Draft</option>
                    </select>
                    <label htmlFor="paymentMode">Payment Mode</label>
                  </div>
                </div>

                {/* Conditional Fields */}
                {offlineFormData.paymentMode === "cash" && (
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
                        type="date"
                        className="form-control"
                        id="paymentDate"
                        name="paymentDate"
                        placeholder="Payment Date"
                        value={offlineFormData.paymentDate}
                        onChange={handleChange}
                      />
                      <label htmlFor="paymentDate">Payment Date</label>
                    </div>
                  </div>
                )}

                {offlineFormData.paymentMode === "check" && (
                  <div className="fv-row mb-10">
                    {/* First row with 3 inputs */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                        marginBottom: "23px",
                      }}
                    >
                      <div
                        className="form-floating mb-3"
                        style={{
                          flex: "1",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <input
                          type="number"
                          className="form-control"
                          id="checkNo"
                          name="checkNo"
                          placeholder="Check No"
                          value={offlineFormData.checkNo || 0}
                          onChange={handleChange}
                        />
                        <label htmlFor="checkNo">Check No</label>
                      </div>
                      <div
                        className="form-floating mb-3"
                        style={{
                          flex: "1",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          id="accountHolderName"
                          name="accountHolderName"
                          placeholder="Account Holder Name"
                          value={offlineFormData.accountHolderName || ""}
                          onChange={handleChange}
                        />
                        <label htmlFor="accountHolderName">
                          Account Holder Name
                        </label>
                      </div>
                      <div
                        className="form-floating mb-3"
                        style={{
                          flex: "1",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          id="branchName"
                          name="branchName"
                          placeholder="Branch Name"
                          value={offlineFormData.branchName || ""}
                          onChange={handleChange}
                        />
                        <label htmlFor="branchName">Branch Name</label>
                      </div>
                    </div>

                    {/* Second row with remaining inputs */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                      }}
                    >
                      <div
                        className="form-floating mb-3"
                        style={{
                          flex: "1",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          id="ifscCode"
                          name="ifscCode"
                          placeholder="IFSC Code"
                          value={offlineFormData.ifscCode || ""}
                          onChange={handleChange}
                        />
                        <label htmlFor="ifscCode">IFSC Code</label>
                      </div>
                      <div
                        className="form-floating mb-3"
                        style={{
                          flex: "1",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <input
                          type="date"
                          className="form-control"
                          id="checkGivenDate"
                          name="checkGivenDate"
                          placeholder="Check Given Date"
                          value={offlineFormData.checkGivenDate || ""}
                          onChange={handleChange}
                        />
                        <label htmlFor="checkGivenDate">Check Given Date</label>
                      </div>
                      <div
                        className="form-floating mb-3"
                        style={{
                          flex: "1",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          id="bankName"
                          name="bankName"
                          placeholder="Bank Name"
                          value={offlineFormData.bankName || ""}
                          onChange={handleChange}
                        />
                        <label htmlFor="bankName">Bank Name</label>
                      </div>
                    </div>

                    <div
                      className="form-floating mb-3"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "10px",
                      }}
                    >
                      <input
                        type="text"
                        className="form-control"
                        id="transactionRef"
                        name="transactionRef"
                        placeholder="Transaction Reference (optional)"
                        value={offlineFormData.transactionRef || ""}
                        onChange={handleChange}
                      />
                      <label htmlFor="transactionRef">
                        Transaction Reference (optional)
                      </label>
                    </div>
                  </div>
                )}

                {offlineFormData.paymentMode === "bank_transfer" && (
                  <div className="fv-row mb-10">
                    {/* First row with 3 inputs */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                        marginBottom: "23px",
                      }}
                    >
                      <div
                        className="form-floating mb-3"
                        style={{
                          flex: "1",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          id="accountHolderName"
                          name="accountHolderName"
                          placeholder="Account Holder Name"
                          value={offlineFormData.accountHolderName || ""}
                          onChange={handleChange}
                        />
                        <label htmlFor="accountHolderName">
                          Account Holder Name
                        </label>
                      </div>
                      <div
                        className="form-floating mb-3"
                        style={{
                          flex: "1",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          id="bankName"
                          name="bankName"
                          placeholder="Bank Name"
                          value={offlineFormData.bankName || ""}
                          onChange={handleChange}
                        />
                        <label htmlFor="bankName">Bank Name</label>
                      </div>
                      <div
                        className="form-floating mb-3"
                        style={{
                          flex: "1",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          id="transactionRef"
                          name="transactionRef"
                          placeholder="Transaction or Reference No"
                          value={offlineFormData.transactionRef || ""}
                          onChange={handleChange}
                        />
                        <label htmlFor="transactionRef">
                          Transaction or Reference No
                        </label>
                      </div>
                    </div>

                    {/* Second row with remaining inputs */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                      }}
                    >
                      <div
                        className="form-floating mb-3"
                        style={{
                          flex: "1",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <input
                          type="date"
                          className="form-control"
                          id="transferDate"
                          name="transferDate"
                          placeholder="Transfer Date"
                          value={offlineFormData.transferDate || ""}
                          onChange={handleChange}
                        />
                        <label htmlFor="transferDate">Transfer Date</label>
                      </div>
                    </div>
                  </div>
                )}

                {offlineFormData.paymentMode === "demand_draft" && (
                  <div className="fv-row mb-10">
                    {/* First row with 3 inputs */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                        marginBottom: "23px",
                      }}
                    >
                      <div
                        className="form-floating mb-3"
                        style={{
                          flex: "1",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          id="checkNo"
                          name="checkNo"
                          placeholder="Check No"
                          value={offlineFormData.checkNo || ""}
                          onChange={handleChange}
                        />
                        <label htmlFor="checkNo">Check No</label>
                      </div>
                      <div
                        className="form-floating mb-3"
                        style={{
                          flex: "1",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          id="accountHolderName"
                          name="accountHolderName"
                          placeholder="Account Holder Name"
                          value={offlineFormData.accountHolderName || ""}
                          onChange={handleChange}
                        />
                        <label htmlFor="accountHolderName">
                          Account Holder Name
                        </label>
                      </div>
                      <div
                        className="form-floating mb-3"
                        style={{
                          flex: "1",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          id="branchName"
                          name="branchName"
                          placeholder="Branch Name"
                          value={offlineFormData.branchName || ""}
                          onChange={handleChange}
                        />
                        <label htmlFor="branchName">Branch Name</label>
                      </div>
                    </div>

                    {/* Second row with remaining inputs */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                      }}
                    >
                      <div
                        className="form-floating mb-3"
                        style={{
                          flex: "1",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          id="ifscCode"
                          name="ifscCode"
                          placeholder="IFSC Code"
                          value={offlineFormData.ifscCode || ""}
                          onChange={handleChange}
                        />
                        <label htmlFor="ifscCode">IFSC Code</label>
                      </div>
                      <div
                        className="form-floating mb-3"
                        style={{
                          flex: "1",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <input
                          type="date"
                          className="form-control"
                          id="checkGivenDate"
                          name="checkGivenDate"
                          placeholder="Check Given Date"
                          value={offlineFormData.checkGivenDate || ""}
                          onChange={handleChange}
                        />
                        <label htmlFor="checkGivenDate">Check Given Date</label>
                      </div>
                      <div
                        className="form-floating mb-3"
                        style={{
                          flex: "1",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          id="bankName"
                          name="bankName"
                          placeholder="Bank Name"
                          value={offlineFormData.bankName || ""}
                          onChange={handleChange}
                        />
                        <label htmlFor="bankName">Bank Name</label>
                      </div>
                    </div>

                    <div
                      className="form-floating mb-3"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "10px",
                      }}
                    >
                      <input
                        type="text"
                        className="form-control"
                        id="transactionRef"
                        name="transactionRef"
                        placeholder="Transaction Reference (optional)"
                        value={offlineFormData.transactionRef || ""}
                        onChange={handleChange}
                      />
                      <label htmlFor="transactionRef">
                        Transaction Reference (optional)
                      </label>
                    </div>
                  </div>
                )}
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </Modal>,
    modalsRoot
  );
};

export { CreateCollectFees };
