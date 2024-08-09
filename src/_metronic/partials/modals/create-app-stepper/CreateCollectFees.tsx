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
  admission_enquiry_id:string | undefined;
  setRefresh: (refresh: boolean) => void;
};

interface FeeType {
  fee_type_id: number;
  fee_type_name: string;
  amount: string;
  due_date: string;
}

interface FeeGroup {
  fee_group_id: number;
  fee_group_name: string;
  fee_session_group_id:string;
  fees: FeeType[];
}

interface ApplicationData {
  fee_group_id: number;
  fee_type_id: number;
  fee_session_group_id:string;
  fee_group_name: string;
  fee_type_name: string;
  amount: string;
  due_date: string;
  adjustment: string;
  is_active: string;
  checked: boolean;
}

const modalsRoot = document.getElementById("root-modals") || document.body;

const CreateCollectFees = ({
  show,
  handleClose,
  class_id,
  session_id,
  admission_enquiry_id,
  setRefresh,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const schoolId = currentUser?.school_id;
  const [data, setData] = useState<ApplicationData[]>([]);
  const [groupedData, setGroupedData] =
    useState<Map<string, ApplicationData[]>>();
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [groupChecked, setGroupChecked] = useState<Map<string, boolean>>();

  useEffect(() => {
    const fetchFeeGroupType = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/api/staff/get-feegrouptype/${schoolId}/${class_id}/${session_id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result: FeeGroup[] = await response.json();
        console.log(result);
        const formattedData = result.flatMap(group =>
          group.fees.map(fee => ({
            fee_group_id: group.fee_group_id,
            fee_type_id: fee.fee_type_id,
            fee_session_group_id: group.fee_session_group_id,
            fee_group_name: group.fee_group_name,
            fee_type_name: fee.fee_type_name,
            amount: fee.amount,
            due_date: fee.due_date,
            adjustment: '',
            is_active: '1',
            checked: false
          }))
        );
        console.log(formattedData);

        const grouped = formattedData.reduce((acc, item) => {
          if (!acc[item.fee_group_name]) {
            acc[item.fee_group_name] = [];
          }
          acc[item.fee_group_name].push(item);
          return acc;
        }, {} as { [key: string]: ApplicationData[] });

        setGroupedData(new Map(Object.entries(grouped)));
        setData(formattedData);
        setGroupChecked(
          new Map(Object.keys(grouped).map((group) => [group, false]))
        );
      } catch (error) {
        console.error("Error fetching application review data:", error);
      }
    };
    fetchFeeGroupType();
  }, [schoolId, class_id, session_id]);

  const handleGroupClick = (groupName: string) => {
    setExpandedGroup(expandedGroup === groupName ? null : groupName);
  };

  const handleAdjustmentChange = (
    groupName: string,
    feeTypeId: number,
    value: string
  ) => {
    const newData = data.map((item) =>
      item.fee_group_name === groupName && item.fee_type_id === feeTypeId
        ? { ...item, adjustment: value }
        : item
    );
    setData(newData);
  };

  const calculateTotalAmount = (groupName: string) => {
    const groupItems = data.filter((item) => item.fee_group_name === groupName);
    return groupItems.reduce((total, item) => {
      const amountNum = parseFloat(item.amount) || 0;
      const adjustmentNum = parseFloat(item.adjustment) || 0;
      return total + amountNum + adjustmentNum;
    }, 0);
  };

  const handleSubmit = async () => {
    // setLoading(true);

    const selectedData = data.filter((item) => item.checked);

    const formData = new FormData();

    selectedData.forEach((item, index) => {
      formData.append(
        `data[${index}][fee_group_id]`,
        item.fee_group_id.toString()
      );
      formData.append(
        `data[${index}][fee_type_id]`,
        item.fee_type_id.toString()
      );
      formData.append(`data[${index}][fee_group_name]`, item.fee_group_name);
      formData.append(`data[${index}][fee_type_name]`, item.fee_type_name);
      formData.append(`data[${index}][amount]`, item.amount);
      formData.append(`data[${index}][adjustment]`, item.adjustment);
      formData.append(`data[${index}][is_active]`, item.is_active);
      formData.append(`data[${index}][fee_session_group_id]`, item.fee_session_group_id);
      // formData.append(`data[${index}][admission_enquiry_id]`, item.admission_enquiry_id);
    });

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    // console.log("Data submitted successfully:", formData);
    // try {
      // const response = await fetch(`${DOMAIN}/api/your-endpoint`, {
      //   method: "POST",
      //   body: formData,
      // });

      // if (!response.ok) {
      //   throw new Error("Network response was not ok");
      // }

      // const result = await response.json();
      // console.log("Data submitted successfully:", formData);
    //   setRefresh(true);
    //   handleClose();
    // } catch (error) {
    //   console.error("Error submitting data:", error);
    // } finally {
    //   setLoading(false);
    // }
  };

  // console.log(admission_enquiry_id)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


  return createPortal(
    <Modal
      id="kt_modal_create_app"
      tabIndex={-1}
      size="lg"
      aria-hidden="true"
      dialogClassName="modal-dialog modal-dialog-centered mw-1000px"
      show={show}
      onHide={handleClose}
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
            Collect Fees
          </span>
          <span
            data-bs-dismiss="modal"
            onClick={handleClose}
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
                  <th style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                    Fee Group Name
                  </th>
                  <th style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                    Status
                  </th>
                  <th style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                    Amount
                  </th>
                  <th style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                    Administrative Charges
                  </th>
                  <th style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                    Total Amount
                  </th>
                  <th style={{ padding: "10px", border: "1px solid #dee2e6" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from(groupedData?.entries() || []).map(
                  ([groupName, items]) => (
                    <React.Fragment key={groupName}>
                      <tr>
                        <td
                          style={{
                            padding: "10px",
                            border: "1px solid #dee2e6",
                          }}
                        >
                          <strong>{groupName}</strong>
                        </td>
                        <td
                          style={{
                            padding: "10px",
                            border: "1px solid #dee2e6",
                          }}
                        >
                          {/* Placeholder for Status */}
                          <strong>Pending</strong>
                        </td>
                        <td
                          style={{
                            padding: "10px",
                            border: "1px solid #dee2e6",
                          }}
                        >
                          {/* Total Amount */}
                          <strong>₹{calculateTotalAmount(groupName)}</strong>
                        </td>
                        <td
                          style={{
                            padding: "10px",
                            border: "1px solid #dee2e6",
                          }}
                        >
                          {/* Placeholder for Administrative Charges */}
                          <span>₹0</span>
                        </td>
                        <td
                          style={{
                            padding: "10px",
                            border: "1px solid #dee2e6",
                          }}
                        >
                          {/* Final Total Amount with adjustments */}
                          <strong>₹{calculateTotalAmount(groupName)}</strong>
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
                            {expandedGroup === groupName ? "Close" : "Pay"}
                          </Button>
                        </td>
                      </tr>
                      {expandedGroup === groupName &&
                        items.map((item, index) => (
                          <tr key={`item-${item.fee_type_id}`}>
                            <td
                              colSpan={7}
                              style={{
                                padding: "10px",
                                border: "1px solid #dee2e6",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <span>
                                  <strong>Fee Type:</strong>{" "}
                                  {item.fee_type_name}
                                </span>
                                <span>
                                  <strong>Due Date:</strong>{" "}
                                  {formatDate(item.due_date)}
                                </span>
                                <span>
                                  <strong>Amount:</strong> {item.amount}
                                </span>
                                <span>
                                  <label
                                    htmlFor={`adjustment-${groupName}-${index}`}
                                  >
                                    <strong>Adjustment:</strong>
                                  </label>
                                  <input
                                    id={`adjustment-${groupName}-${index}`}
                                    type="number"
                                    value={item.adjustment}
                                    onChange={(e) =>
                                      handleAdjustmentChange(
                                        groupName,
                                        item.fee_type_id,
                                        e.target.value
                                      )
                                    }
                                    style={{
                                      marginLeft: "10px",
                                      padding: "5px",
                                      borderRadius: "4px",
                                      border: "1px solid #ccc",
                                    }}
                                  />
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </React.Fragment>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="modal-footer border-0 justify-content-center">
          <Button
            variant="secondary"
            onClick={handleClose}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              marginRight: "15px",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            style={{ padding: "10px 20px", fontSize: "16px" }}
          >
            Submit
          </Button>
        </div>
      </div>
    </Modal>,
    modalsRoot
  );
};

export { CreateCollectFees };
