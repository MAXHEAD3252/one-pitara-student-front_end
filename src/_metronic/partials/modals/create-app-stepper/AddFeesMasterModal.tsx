// import { useEffect, useState } from "react";
// import { createPortal } from "react-dom";
// import { Modal } from "react-bootstrap";
// import "react-datepicker/dist/react-datepicker.css";
// import { useAuth } from "../../../../app/modules/auth/core/Auth";
// import { DOMAIN } from "../../../../app/routing/ApiEndpoints";

// type Props = {
//   show: boolean;
//   onHide: () => void;
// };

// interface CurrentUser {
//   school_id: string;
// }

// interface FeeGroup {
//   fee_groups_id: number;
//   fee_group_name: string;
//   fee_group_session_id: number;
//   session:number;
// }

// interface FeeType {
//   id: string;
//   type: string;
// }

// const staticTypes = [
//   { id: "none", type: "None" },
//   { id: "daily", type: "Daily" },
//   { id: "weekly", type: "Weekly" },
//   { id: "monthly", type: "Monthly" },
// ];

// const modalsRoot = document.getElementById("root-modals") || document.body;

// const AddFeesMasterModal = ({ show, onHide }: Props) => {
//   const { currentUser } = useAuth();
//   const schoolId = (currentUser as unknown as CurrentUser)?.school_id;

//   const [feeGroups, setFeeGroups] = useState<FeeGroup[]>([]);
//   console.log(currentUser);

//   const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
//   const [selectedGroupName, setSelectedGroupName] =
//     useState<string>("Select Group");
//   const [feeGroupSessionId, setFeeGroupSessionId] = useState<number>(0);
//   const [feeTypes, setFeeTypes] = useState<FeeType[]>([]);
//   const [selectedType, setSelectedType] = useState<string | null>(null);
//   const [selectedTypeName, setSelectedTypeName] =
//     useState<string>("Select Type");
//   const [dueDate, setDueDate] = useState<string | null>(null);
//   const [dueType, setDueType] = useState<string | null>(null);
//   const [dueTypeName, setDueTypeName] = useState<string>("Select Due Type");
//   const [amount, setAmount] = useState<string>("");
//   const [fineType, setFineType] = useState<string>("none");
//   const [percentage, setPercentage] = useState<number | null>(0);
//   const [fineAmount, setFineAmount] = useState<number | null>(0);
//   const [session,setSession] = useState<number | null>(0);

//   const handleSelectGroup = (group: FeeGroup) => {
//     setSelectedGroup(group.fee_groups_id);
//     setSelectedGroupName(group.fee_group_name);
//     setFeeGroupSessionId(group.fee_group_session_id);
//     setSession(group.session);
//   };

//   const handleSelectType = (type: FeeType) => {
//     setSelectedType(type.id);
//     setSelectedTypeName(type.type);
//   };

//   const handleDueType = (type: { id: string; type: string }) => {
//     setDueType(type.id);
//     setDueTypeName(type.type);
//   };

//   const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setAmount(e.target.value);
//   };

//   const handleFineTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFineType(e.target.value);
//     if (e.target.value === "none") {
//       setPercentage(0.0);
//       setFineAmount(0.0);
//     }
//   };

//   const handlePercentageChange = (e: number) => {
//     setPercentage(e.target.value);
//   };

//   const handleFineAmountChange = (e: number) => {
//     setFineAmount(e.target.value);
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   // Function to handle date change
//   const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedDate = event.target.value; // Value will be in YYYY-MM-DD format
//     const formattedDate = formatDate(selectedDate);
//     setDueDate(formattedDate);
//   };
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const formData = {
//       feeGroupSessionId,
//       selectedGroup,
//       selectedType,
//       amount,
//       fineType,
//       dueDate,
//       percentage,
//       fineAmount,
//       dueTypeName,
//       session,
//       schoolId,
//     };

//     try {
//       const response = await fetch(`${DOMAIN}/api/school/add-feegroupfeetype`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();
//       console.log("Success:", data);
//       onHide(); // Hide the modal on successful submission
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchFeeGroups = async () => {
//       try {
//         const response = await fetch(
//           `${DOMAIN}/api/school/getfeegroup/${schoolId}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch fee groups");
//         }
//         const responseData = await response.json();
//         setFeeGroups(responseData);
//       } catch (error) {
//         console.error("Error fetching fee groups:", error);
//       }
//     };

//     fetchFeeGroups();
//   }, [schoolId]);

//   useEffect(() => {
//     const fetchFeeTypes = async () => {
//       try {
//         const response = await fetch(
//           `${DOMAIN}/api/school/getfeetype/${schoolId}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch fee types");
//         }
//         const responseData = await response.json();
//         setFeeTypes(responseData);
//       } catch (error) {
//         console.error("Error fetching fee types:", error);
//       }
//     };

//     fetchFeeTypes();
//   }, [schoolId]);

//   return createPortal(
//     <Modal
//       id="kt_modal_create_app"
//       tabIndex={-1}
//       aria-hidden="true"
//       dialogClassName="modal-dialog modal-dialog-centered mw-800px"
//       show={show}
//       onHide={onHide}
//       backdrop="static"
//     >
//       <div
//         className="modal-content"
//         style={{ padding: "23px 5px", borderRadius: "17px" }}
//       >
//         <div
//           className="modal-header border-0"
//           style={{ width: "100%", height: "17px" }}
//         >
//           <span
//             className=""
//             id="staticBackdropLabel"
//             style={{
//               fontSize: "24px",
//               fontWeight: "600",
//               fontFamily: "Manrope",
//             }}
//           >
//             Add Fees Master : 2023-24
//           </span>
//           <button
//             type="button"
//             className="btn-close"
//             onClick={onHide}
//             aria-label="Close"
//           ></button>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="modal-body">
//             <div style={{ marginBottom: "23px" }}>
//               <label
//                 htmlFor="feeGroupDropdown"
//                 className="form-label"
//                 style={{
//                   fontSize: "12px",
//                   color: "#434343",
//                   fontWeight: "500",
//                 }}
//               >
//                 Fees Group
//               </label>

//               <div className="dropdown" id="feeGroupDropdown">
//                 <button
//                   className="btn btn-secondary dropdown-toggle"
//                   style={{
//                     width: "100%",
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     backgroundColor: "transparent",
//                     border: "1px solid #ECEDF1",
//                     borderRadius: "8px",
//                     overflow: "hidden",
//                   }}
//                   type="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                 >
//                   {selectedGroupName}
//                 </button>
//                 <ul
//                   className="dropdown-menu"
//                   style={{ width: "100%", height: "300px", overflow: "auto" }}
//                 >
//                   {feeGroups.map((group) => (
//                     <li key={group.fee_groups_id}>
//                       <a
//                         className="dropdown-item"
//                         href="#"
//                         onClick={() => handleSelectGroup(group)}
//                       >
//                         {group.fee_group_name}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//             <div style={{ marginBottom: "23px" }}>
//               <label
//                 htmlFor="feeTypeDropdown"
//                 className="form-label"
//                 style={{
//                   fontSize: "12px",
//                   color: "#434343",
//                   fontWeight: "500",
//                 }}
//               >
//                 Fees Type
//               </label>

//               <div className="dropdown" id="feeTypeDropdown">
//                 <button
//                   className="btn btn-secondary dropdown-toggle"
//                   style={{
//                     width: "100%",
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     backgroundColor: "transparent",
//                     border: "1px solid #ECEDF1",
//                     borderRadius: "8px",
//                   }}
//                   type="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                 >
//                   {selectedTypeName}
//                 </button>
//                 <ul className="dropdown-menu" style={{ width: "100%" }}>
//                   {feeTypes.map((type) => (
//                     <li key={type.id}>
//                       <a
//                         className="dropdown-item"
//                         href="#"
//                         onClick={() => handleSelectType(type)}
//                       >
//                         {type.type}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//             <div style={{ marginBottom: "23px" }}>
//               <label
//                 htmlFor="dueTypeDropdown"
//                 className="form-label"
//                 style={{
//                   fontSize: "12px",
//                   color: "#434343",
//                   fontWeight: "500",
//                 }}
//               >
//                 Due Type
//               </label>

//               <div className="dropdown" id="dueTypeDropdown">
//                 <button
//                   className="btn btn-secondary dropdown-toggle"
//                   style={{
//                     width: "100%",
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     backgroundColor: "transparent",
//                     border: "1px solid #ECEDF1",
//                     borderRadius: "8px",
//                   }}
//                   type="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                 >
//                   {selectedTypeName}
//                 </button>
//                 <ul className="dropdown-menu" style={{ width: "100%" }}>
//                   {staticTypes.map((type) => (
//                     <li key={type.id}>
//                       <a
//                         className="dropdown-item"
//                         href="#"
//                         onClick={() => handleDueType(type)}
//                       >
//                         {type.type}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//             <div style={{ marginBottom: "23px" }}>
//               <label
//                 htmlFor="dueDateInput"
//                 className="form-label"
//                 style={{
//                   fontSize: "12px",
//                   color: "#434343",
//                   fontWeight: "500",
//                 }}
//               >
//                 Due Date
//               </label>

//               <input
//                 className="form-control"
//                 id="exampleFormControlInput1"
//                 type="date"
//                 placeholder="Enter Due Date"
//                 onChange={handleDateChange}
//                 style={{
//                   width: "100%",
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   backgroundColor: "transparent",
//                   border: "1px solid #ECEDF1",
//                   borderRadius: "8px",
//                 }}
//               />
//             </div>
//             <div className="mb-3">
//               <label
//                 htmlFor="amountInput"
//                 className="form-label"
//                 style={{
//                   fontSize: "12px",
//                   color: "#434343",
//                   fontWeight: "500",
//                 }}
//               >
//                 Amount
//               </label>
//               <input
//                 type="number"
//                 className="form-control"
//                 id="amountInput"
//                 placeholder="Enter Amount"
//                 style={{ border: "1px solid #ECEDF1" }}
//                 value={amount}
//                 onChange={handleAmountChange}
//               />
//             </div>
//             <div className="mb-3">
//               <label
//                 htmlFor="exampleFormControlInput1"
//                 className="form-label"
//                 style={{
//                   fontSize: "12px",
//                   color: "#434343",
//                   fontWeight: "500",
//                 }}
//               >
//                 Fine Type
//               </label>
//               <div
//                 style={{
//                   display: "flex",
//                   padding: "13px 12px",
//                   gap: "12px",
//                   border: "1px solid #ECEDF1",
//                   borderRadius: "8px",
//                 }}
//               >
//                 <div
//                   className="form-check"
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "8px",
//                   }}
//                 >
//                   <input
//                     className="form-check-input"
//                     type="radio"
//                     name="fineType"
//                     id="none"
//                     value="none"
//                     checked={fineType === "none"}
//                     onChange={handleFineTypeChange}
//                     style={{ width: "15px", height: "15px" }}
//                   />
//                   <label className="form-check-label" htmlFor="none">
//                     None
//                   </label>
//                 </div>
//                 <div
//                   className="form-check"
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "8px",
//                   }}
//                 >
//                   <input
//                     className="form-check-input"
//                     type="radio"
//                     name="fineType"
//                     id="percentage"
//                     value="percentage"
//                     checked={fineType === "percentage"}
//                     onChange={handleFineTypeChange}
//                     style={{ width: "15px", height: "15px" }}
//                   />
//                   <label className="form-check-label" htmlFor="percentage">
//                     Percentage
//                   </label>
//                 </div>
//                 <div
//                   className="form-check"
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "8px",
//                   }}
//                 >
//                   <input
//                     className="form-check-input"
//                     type="radio"
//                     name="fineType"
//                     id="fixedAmount"
//                     value="fixedAmount"
//                     checked={fineType === "fixedAmount"}
//                     onChange={handleFineTypeChange}
//                     style={{ width: "15px", height: "15px" }}
//                   />
//                   <label className="form-check-label" htmlFor="fixedAmount">
//                     Fixed Amount
//                   </label>
//                 </div>
//               </div>
//             </div>
//             <div
//               style={{
//                 width: "100%",
//                 display: "flex",
//                 flexDirection: "row",
//                 gap: "23px",
//               }}
//             >
//               <div style={{ width: "50%" }}>
//                 <label
//                   htmlFor="percentageInput"
//                   className="form-label"
//                   style={{
//                     fontSize: "12px",
//                     color: "#434343",
//                     fontWeight: "500",
//                   }}
//                 >
//                   Percentage
//                 </label>
//                 <input
//                   type="number"
//                   className="form-control"
//                   id="percentageInput"
//                   placeholder="Enter Percentage"
//                   style={{ border: "1px solid #ECEDF1" }}
//                   value={percentage}
//                   onChange={handlePercentageChange}
//                   disabled={fineType !== "percentage"}
//                 />
//               </div>
//               <div style={{ width: "50%" }}>
//                 <label
//                   htmlFor="fineAmountInput"
//                   className="form-label"
//                   style={{
//                     fontSize: "12px",
//                     color: "#434343",
//                     fontWeight: "500",
//                   }}
//                 >
//                   Fine Amount
//                 </label>
//                 <input
//                   type="number"
//                   className="form-control"
//                   id="fineAmountInput"
//                   placeholder="Enter Fine Amount"
//                   style={{ border: "1px solid #ECEDF1" }}
//                   value={fineAmount}
//                   onChange={handleFineAmountChange}
//                   disabled={fineType !== "fixedAmount"}
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="modal-footer border-0 d-flex justify-content-center">
//             <button
//               type="submit"
//               className="btn btn-primary"
//               style={{ width: "150px", borderRadius: "8px" }}
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </Modal>,
//     modalsRoot
//   );
// };

// export { AddFeesMasterModal };

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Modal } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../../../../app/modules/auth/core/Auth";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";

type Props = {
  show: boolean;
  onHide: () => void;
};

interface CurrentUser {
  school_id: string;
}

interface FeeGroup {
  fee_groups_id: number;
  fee_group_name: string;
  fee_group_session_id: number;
  session: number;
}

interface FeeType {
  id: string;
  type: string;
}

const modalsRoot = document.getElementById("root-modals") || document.body;

const AddFeesMasterModal = ({ show, onHide }: Props) => {
  const { currentUser } = useAuth();
  const schoolId = (currentUser as unknown as CurrentUser)?.school_id;

  const [feeGroups, setFeeGroups] = useState<FeeGroup[]>([]);
  const [feeTypes, setFeeTypes] = useState<FeeType[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedGroupName, setSelectedGroupName] =
    useState<string>("Select Group");
  const [feeGroupSessionId, setFeeGroupSessionId] = useState<number>(0);
  const [session, setSession] = useState<number | null>(0);

  const [selectedFeeTypes, setSelectedFeeTypes] = useState<
    { id: string; type: string; amount: number }[]
  >([]);
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [dueType, setDueType] = useState<string | null>(null);
  const [dueTypeName, setDueTypeName] = useState<string>("Select Due Type");
  const [fineType, setFineType] = useState<string>("none");
  const [percentage, setPercentage] = useState<number | null>(0);
  const [fineAmount, setFineAmount] = useState<number | null>(0);

  const handleSelectGroup = (group: FeeGroup) => {
    setSelectedGroup(group.fee_groups_id.toString());
    setSelectedGroupName(group.fee_group_name);
    setFeeGroupSessionId(group.fee_group_session_id);
    setSession(group.session);
  };

  const handleSelectFeeType = (type: FeeType) => {
    setSelectedFeeTypes((prev) => {
      const existingType = prev.find((t) => t.id === type.id);
      if (existingType) {
        return prev.map((t) =>
          t.id === type.id ? { ...t, amount: t.amount } : t
        );
      } else {
        return [...prev, { id: type.id, type: type.type, amount: 0 }];
      }
    });
  };

  const handleAmountChange = (id: string, amount: number) => {
    setSelectedFeeTypes((prev) =>
      prev.map((t) => (t.id === id ? { ...t, amount } : t))
    );
  };

  const handleDeleteFeeType = (id: string) => {
    setSelectedFeeTypes((prev) => prev.filter((t) => t.id !== id));
  };

  const handleDueType = (type: { id: string; type: string }) => {
    setDueType(type.id);
    setDueTypeName(type.type);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value; // Value will be in YYYY-MM-DD format
    const formattedDate = formatDate(selectedDate);
    setDueDate(formattedDate);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation check
    if (!selectedGroup || !session || !schoolId) {
      console.error("Required fields are missing.");
      return;
    }

    try {
      const response = await fetch(`${DOMAIN}/api/school/add-feegroupfeetype`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          feeGroupSessionId,
          selectedGroup,
          feeTypes: selectedFeeTypes,
          fineType,
          dueDate,
          percentage,
          fineAmount,
          dueTypeName,
          session,
          schoolId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);
      onHide(); // Hide the modal on successful submission
    } catch (error) {
      console.error("Error:", error);
      // Optional: Provide user feedback here
    }
  };

  useEffect(() => {
    const fetchFeeGroups = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/api/school/getfeegroup/${schoolId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch fee groups");
        }
        const responseData = await response.json();
        setFeeGroups(responseData);
      } catch (error) {
        console.error("Error fetching fee groups:", error);
      }
    };

    fetchFeeGroups();
  }, [schoolId]);

  useEffect(() => {
    const fetchFeeTypes = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/api/school/getfeetype/${schoolId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch fee types");
        }
        const responseData = await response.json();
        setFeeTypes(responseData);
      } catch (error) {
        console.error("Error fetching fee types:", error);
      }
    };

    fetchFeeTypes();
  }, [schoolId]);

  return createPortal(
    <Modal
      id="kt_modal_create_app"
      tabIndex={-1}
      aria-hidden="true"
      dialogClassName="modal-dialog modal-dialog-centered mw-800px"
      show={show}
      onHide={onHide}
      backdrop="static"
    >
      <div
        className="modal-header"
        style={{
          backgroundColor: "#F2F6FF",
          borderBottom: "1px solid lightgray",
          fontFamily: "Manrope",
        }}
      >
        <h2>Add Fees Master : 2023-24</h2>
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={onHide}
        >
          <i className="fas fa-times"></i>
        </div>
      </div>

 
      <div
        className="modal-body py-lg-10 px-lg-10"
        style={{
          backgroundColor: "#F2F6FF",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "23px" }}>
            <label
              htmlFor="feeGroupDropdown"
              className="form-label"
              style={{
                fontSize: "12px",
                color: "#434343",
                fontWeight: "500",
              }}
            >
              Fees Group
            </label>

            <div className="dropdown" id="feeGroupDropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "transparent",
                  border: "1px solid #ECEDF1",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {selectedGroupName}
              </button>
              <ul
                className="dropdown-menu"
                style={{ width: "100%", height: "300px", overflow: "auto" }}
              >
                {feeGroups.map((group) => (
                  <li key={group.fee_groups_id}>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => handleSelectGroup(group)}
                    >
                      {group.fee_group_name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{ marginBottom: "23px" }}>
            <label
              htmlFor="feeTypeDropdown"
              className="form-label"
              style={{
                fontSize: "12px",
                color: "#434343",
                fontWeight: "500",
              }}
            >
              Fees Type
            </label>

            <div className="dropdown" id="feeTypeDropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "transparent",
                  border: "1px solid #ECEDF1",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {selectedFeeTypes.length > 0
                  ? selectedFeeTypes.map((ft) => ft.type).join(", ")
                  : "Select Fee Type"}
              </button>
              <ul
                className="dropdown-menu"
                style={{ width: "100%", height: "300px", overflow: "auto" }}
              >
                {feeTypes.map((type) => (
                  <li key={type.id}>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => handleSelectFeeType(type)}
                    >
                      {type.type}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {selectedFeeTypes.length > 0 && (
            <div style={{ marginBottom: "23px" }}>
              <label
                htmlFor="feeAmounts"
                className="form-label"
                style={{
                  fontSize: "12px",
                  color: "#434343",
                  fontWeight: "500",
                }}
              >
                Fee Amounts
              </label>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Fee Type</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedFeeTypes.map((feeType) => (
                    <tr key={feeType.id}>
                      <td>{feeType.type}</td>
                      <td>
                        <input
                          type="number"
                          value={feeType.amount}
                          onChange={(e) =>
                            handleAmountChange(
                              feeType.id,
                              parseFloat(e.target.value)
                            )
                          }
                          style={{ width: "100%" }}
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteFeeType(feeType.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div style={{ marginBottom: "23px" }}>
            <label
              htmlFor="dueDate"
              className="form-label"
              style={{
                fontSize: "12px",
                color: "#434343",
                fontWeight: "500",
              }}
            >
              Due Date
            </label>
            <input
              type="date"
              className="form-control"
              id="dueDate"
              value={dueDate || ""}
              onChange={handleDateChange}
            />
          </div>
          <div style={{ marginBottom: "23px" }}>
            <label
              htmlFor="dueTypeDropdown"
              className="form-label"
              style={{
                fontSize: "12px",
                color: "#434343",
                fontWeight: "500",
              }}
            >
              Due Type
            </label>

            <div className="dropdown" id="dueTypeDropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "transparent",
                  border: "1px solid #ECEDF1",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {dueTypeName}
              </button>
              <ul
                className="dropdown-menu"
                style={{ width: "100%", height: "300px", overflow: "auto" }}
              >
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => handleDueType({ id: "1", type: "Monthly" })}
                  >
                    Monthly
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() =>
                      handleDueType({ id: "2", type: "Quarterly" })
                    }
                  >
                    Quarterly
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => handleDueType({ id: "3", type: "Annually" })}
                  >
                    Annually
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div style={{ marginBottom: "23px" }}>
            <label
              htmlFor="fineTypeDropdown"
              className="form-label"
              style={{
                fontSize: "12px",
                color: "#434343",
                fontWeight: "500",
              }}
            >
              Fine Type
            </label>

            <div className="dropdown" id="fineTypeDropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "transparent",
                  border: "1px solid #ECEDF1",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {fineType}
              </button>
              <ul
                className="dropdown-menu"
                style={{ width: "100%", height: "300px", overflow: "auto" }}
              >
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setFineType("none")}
                  >
                    None
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setFineType("fixed")}
                  >
                    Fixed
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setFineType("percentage")}
                  >
                    Percentage
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {fineType !== "none" && (
            <div style={{ marginBottom: "23px" }}>
              <label
                htmlFor="fineAmount"
                className="form-label"
                style={{
                  fontSize: "12px",
                  color: "#434343",
                  fontWeight: "500",
                }}
              >
                {fineType === "percentage" ? "Percentage" : "Fine Amount"}
              </label>
              <input
                type="number"
                className="form-control"
                id="fineAmount"
                value={fineType === "percentage" ? percentage : fineAmount}
                onChange={(e) =>
                  fineType === "percentage"
                    ? setPercentage(parseFloat(e.target.value))
                    : setFineAmount(parseFloat(e.target.value))
                }
              />
            </div>
          )}

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onHide}
            >
              Close
            </button>
            <button type="submit" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </Modal>,
    modalsRoot
  );
};

export { AddFeesMasterModal };
