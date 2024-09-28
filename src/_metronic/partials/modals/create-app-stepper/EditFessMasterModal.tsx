/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useAuth } from "../../../../app/modules/auth/index.ts";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints.tsx";

type Props = {
  show: boolean;
  onHide: () => void;
  feeId: number | null;
};

interface FeeGroup {
  id : string;
  name : string;
}

interface FeeTypes {
  id : string;
  type : string;
}

interface FormData {
  Fees_group: string;
  fee_groups_id: string;
  Fees_Type: string;
  feetype_id: string;
  due_date: string;
  due_type: string;
  amount: number;
  fine_percentage: number;
  fine_amount: number;
}


const EditFessMasterModal = ({ show, onHide, feeId }: Props) => {
  // const [FeeDetails, setFeesDetails] = useState([]);
  const [feeFineType, setFeeFineType] = useState("");
  const { currentUser } = useAuth();
  const schoolId = currentUser?.school_id;
  const [formData, setFormData] = useState<FormData>({
    Fees_group: "",
    fee_groups_id: "",
    Fees_Type: "",
    feetype_id: "",
    due_date: "",
    due_type: "",
    amount: 0,
    fine_percentage: 0,
    fine_amount: 0,
  });

  const [feeGroups, setFeeGroups] = useState<FeeGroup[]>([]);
  const [feeTypes, setFeeTypes] = useState<FeeTypes[]>([]);
  const [initialData, setInitialData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/api/school/getfeemaster/${schoolId}/${feeId}`
        );
        const data = await response.json();

        const initialData = {
          Fees_group: data[0]?.name || "",
          fee_groups_id: data[0]?.fee_groups_id || "",
          Fees_Type: data[0]?.type || "",
          feetype_id: data[0]?.feetype_id || "",
          due_date: data[0]?.due_date || "",
          due_type: data[0]?.due_type || "",
          amount: data[0]?.amount || 0,
          fine_percentage: data[0]?.fine_percentage || 0,
          fine_amount: data[0]?.fine_amount || 0,
        };
        setFormData(initialData);
        setInitialData(initialData);
      } catch (error) {
        console.error("Error fetching fee data:", error);
      }
    };
    fetchData();
  }, [feeId, schoolId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/api/school/getfeemaster-dropdown/${schoolId}`
        );
        const data = await response.json();

        const groups =
          data.find((item: { dataType: string; }) => item.dataType === "feeGroups")?.data || [];
        const types =
          data.find((item: { dataType: string; }) => item.dataType === "feeTypes")?.data || [];

        setFeeGroups(groups);
        setFeeTypes(types);
      } catch (error) {
        console.error("Error fetching fee master dropdown data:", error);
      }
    };

    fetchData();
  }, []);
                      /* @ts-ignore */

  const handleChangeForm = (value) => {
    setFeeFineType(value);
  };
                      /* @ts-ignore */

  const handleForm = (field, value, idField = "", id = "") => {
    if (field === "Fees_group" || field === "Fees_Type") {
      setFormData({
        ...formData,
        [field]: value,
        [idField]: id,
      });
    } else {
      setFormData({
        ...formData,
        [field]: value,
      });
    }
  };

  const handlesubmit = async () => {
    const modifiedData = {}; // Adjust the type as per your actual data structure
  
    for (const key in formData) {
      if (Object.prototype.hasOwnProperty.call(formData, key)) {
         /* @ts-ignore */
        if (formData[key] !== initialData[key]) {
          if (key === "Fees_group") {
             /* @ts-ignore */
            modifiedData["fee_groups_id"] = formData["fee_groups_id"];
          } else if (key === "Fees_Type") {
             /* @ts-ignore */
            modifiedData["feetype_id"] = formData["feetype_id"];
          } else {
             /* @ts-ignore */
            modifiedData[key] = formData[key];
          }
        }
      }
    }
    
    if (Object.keys(modifiedData).length > 0) {
      try {
        const response = await fetch(
          `${DOMAIN}/api/school/updateFeeMasterById/${schoolId}/${feeId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(modifiedData),
          }
        );
        
        const data = await response.json();
        if (response.ok) {
          onHide();
        }
        
      } catch (error) {
        console.error("Error updating fee data:", error);
      }
    }
  };

  const convertDateFormat = (dateString: string | number | Date) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <Modal
      id="kt_modal_create_app"
      tabIndex={-1}
      aria-hidden="true"
      dialogClassName="modal-dialog modal-dialog-centered mw-850px"
      show={show}
      onHide={onHide}
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
            Edit Fees Master : 2023-24
          </span>
          <span data-bs-dismiss="modal" onClick={onHide} aria-label="Close">
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
          <form action="/" method="post">
            <div style={{ marginBottom: "23px" }}>
              <label
                htmlFor="Fees_Group"
                className="form-label"
                style={{
                  fontSize: "12px",
                  color: "#434343",
                  fontWeight: "500",
                }}
              >
                Fees Group
              </label>

              <div className="dropdown" id="Fees_Group">
                <select
                  className="form-select"
                  value={formData.Fees_group}
                  onChange={(e) => {
                    const selectedIndex = e.target.selectedIndex;
                    const selectedOption = e.target.options[selectedIndex];
                    const selectedId = selectedOption.getAttribute("data-id");
                    handleForm(
                      "Fees_group",
                      selectedOption.value,
                      "fee_groups_id",
                       /* @ts-ignore */
                      selectedId
                    );
                  }}
                >
                   /* @ts-ignore */
                  <option value={formData.Fees_group}>
                    {formData.Fees_group}
                  </option>
                  {feeGroups.map((group) => (
                    <option
                      key={group.id}
                      value={group.name}
                      data-id={group.id}
                    >
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div style={{ marginBottom: "23px" }}>
              <label
                htmlFor="Fees_Type"
                className="form-label"
                style={{
                  fontSize: "12px",
                  color: "#434343",
                  fontWeight: "500",
                }}
              >
                Fees Type
              </label>

              <div className="dropdown" id="Fees_Type">
                <select
                  className="form-select"
                  value={formData.Fees_Type}
                  onChange={(e) => {
                    const selectedIndex = e.target.selectedIndex;
                    const selectedOption = e.target.options[selectedIndex];
                    const selectedId = selectedOption.getAttribute("data-id");
                    handleForm(
                      "Fees_Type",
                      selectedOption.value,
                      "feetype_id",
                       /* @ts-ignore */
                      selectedId
                    );
                  }}
                >
                  <option value={formData.Fees_Type}>
                    {formData.Fees_Type}
                  </option>
                  {feeTypes.map((group) => (
                    <option
                      key={group.id}
                      value={group.type}
                      data-id={group.id}
                    >
                      {group.type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div style={{ marginBottom: "23px" }}>
              <label
                htmlFor="due_date"
                className="form-label"
                style={{
                  fontSize: "12px",
                  color: "#434343",
                  fontWeight: "500",
                }}
              >
                Due Date
              </label>

              <div className="dropdown" id="due_date">
                <input
                  type="date"
                  name="due_date"
                  id="due_date"
                  className="form-control"
                  placeholder="Enter Percentage"
                  value={convertDateFormat(formData.due_date)}
                  onChange={(e) => handleForm("due_date", e.target.value)}
                  style={{ border: "1px solid #ECEDF1" }}
                />
              </div>
            </div>
            <div style={{ marginBottom: "23px" }}>
              <label
                htmlFor="amount"
                className="form-label"
                style={{
                  fontSize: "12px",
                  color: "#434343",
                  fontWeight: "500",
                }}
              >
                Amount
              </label>

              <div className="dropdown" id="amount">
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  className="form-control"
                  placeholder="Enter Percentage"
                  value={formData.amount}
                  onChange={(e) => handleForm("amount", e.target.value)}
                  style={{ border: "1px solid #ECEDF1" }}
                />
              </div>
            </div>
            <div style={{ marginBottom: "23px" }}>
              <label
                htmlFor="exampleFormControlInput1"
                className="form-label"
                style={{
                  fontSize: "12px",
                  color: "#434343",
                  fontWeight: "500",
                }}
              >
                Due Type
              </label>

              <div className="dropdown" id="feeDueType">
                <select
                  className="form-select"
                  value={formData.due_type || "None"}
                  onChange={(e) => handleForm("due_type", e.target.value)}
                >
                  {/* <option value={formData.Due_Type}>{formData.Due_Type}</option> */}
                  <option value="None">None</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option 
                   /* @ts-ignore */
                  value={initialData.due_type}>
                    
                    {
                     /* @ts-ignore */
                    initialData.due_type}
                  </option>
                </select>
              </div>
            </div>
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
                Fine Type
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
                    name="feeDueType"
                    id="none"
                    defaultChecked
                    onChange={() => handleChangeForm("none")}
                    style={{ width: "15px", height: "15px" }}
                  />
                  <label className="form-check-label" htmlFor="none">
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
                    name="feeDueType"
                    id="percentage"
                    onChange={() => handleChangeForm("percentage")}
                    style={{ width: "15px", height: "15px" }}
                  />
                  <label className="form-check-label" htmlFor="percentage">
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
                    name="feeDueType"
                    id="fixed"
                    onChange={() => handleChangeForm("fixed")}
                    style={{ width: "15px", height: "15px" }}
                  />
                  <label className="form-check-label" htmlFor="fixed">
                    Fixed Amount
                  </label>
                </div>
              </div>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                gap: "23px",
              }}
            >
              <div className="" style={{ width: "50%" }}>
                <label
                  htmlFor="Fine_Amount"
                  className="form-label"
                  style={{
                    fontSize: "12px",
                    color: "#434343",
                    fontWeight: "500",
                  }}
                >
                  Percentage
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Fine_Amount"
                  name="Fine_Amount"
                  placeholder="Enter Percentage"
                  value={formData.fine_percentage}
                  onChange={(e) =>
                    handleForm("fine_percentage", e.target.value)
                  }
                  style={{ border: "1px solid #ECEDF1" }}
                  disabled={feeFineType === "percentage" ? false : true}
                />
              </div>
              <div className="" style={{ width: "50%" }}>
                <label
                  htmlFor="fine_amount"
                  className="form-label"
                  style={{
                    fontSize: "12px",
                    color: "#434343",
                    fontWeight: "500",
                  }}
                >
                  Fine Amount
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fine_amount"
                  name="fine_amount"
                  placeholder="Enter Fine Amount"
                  value={formData.fine_amount}
                  onChange={(e) => handleForm("fine_amount", e.target.value)}
                  style={{ border: "1px solid #ECEDF1" }}
                  disabled={feeFineType === "fixed" ? false : true}
                />
              </div>
            </div>
          </form>
        </div>
        <div
          className="modal-footer border-0"
          style={
            {
              // width: "100%",
              // height: "30px",
              // display: "flex",
              // justifyContent: "end",
              // padding: "0px 24px 21px 24px",
              // border: "1px solid",
            }
          }
        >
          <button
            type="submit"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            onClick={handlesubmit}
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
              Save
            </span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export { EditFessMasterModal };
