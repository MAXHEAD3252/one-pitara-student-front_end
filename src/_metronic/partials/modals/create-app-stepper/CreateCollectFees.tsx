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
  setRefresh: (refresh: boolean) => void;
};

interface ApplicationData {
  fee_group_name: string;
  fee_type_name: string;
  amount: string;
  adjustment: string;
  is_active: string;
  checked: boolean; // Added checked property
}

const modalsRoot = document.getElementById("root-modals") || document.body;

const CreateCollectFees = ({ show, handleClose, class_id, session_id, setRefresh }: Props) => {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const schoolId = currentUser?.school_id;
  const [data, setData] = useState<ApplicationData[]>([]);

  useEffect(() => {
    const fetchFeeGroupType = async () => {
      try {
        const response = await fetch(`${DOMAIN}/api/staff/get-feegrouptype/${schoolId}/${class_id}/${session_id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        // Add a checked property to each item
        const formattedData = result.map((item: ApplicationData) => ({ ...item, checked: false }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching application review data:", error);
      }
    };
    fetchFeeGroupType();
  }, [schoolId, class_id, session_id]);

  // Function to group data by fee_group_name
  const groupDataByFeeGroupName = (data: ApplicationData[]) => {
    return data.reduce((acc, item) => {
      if (!acc[item.fee_group_name]) {
        acc[item.fee_group_name] = [];
      }
      acc[item.fee_group_name].push(item);
      return acc;
    }, {} as Record<string, ApplicationData[]>);
  };

  // Grouped data
  const groupedData = groupDataByFeeGroupName(data);

  // Calculate the total amount
  const totalAmount = data.reduce((total, item) => total + parseFloat(item.amount), 0);

  // Handle checkbox change
  const handleCheckboxChange = (groupIndex: number, itemIndex: number) => {
    const newData = [...data];
    const item = groupedData[Object.keys(groupedData)[groupIndex]][itemIndex];
    item.checked = !item.checked;
    setData(newData);
  };

  // Handle adjustment input change
  const handleAdjustmentChange = (groupIndex: number, itemIndex: number, value: string) => {
    const newData = [...data];
    const item = groupedData[Object.keys(groupedData)[groupIndex]][itemIndex];
    item.adjustment = value;
    setData(newData);
  };

  // Handle submit
  const handleSubmit = async () => {
    const formData = new FormData();

    data.forEach((item, index) => {
      formData.append(`data[${index}][fee_group_name]`, item.fee_group_name);
      formData.append(`data[${index}][fee_type_name]`, item.fee_type_name);
      formData.append(`data[${index}][amount]`, item.amount);
      formData.append(`data[${index}][adjustment]`, item.checked ? item.adjustment : '');
      formData.append(`data[${index}][is_active]`, item.is_active);
    });
    console.log(data)
    // try {
    //   const response = await fetch(`${DOMAIN}/api/your-endpoint`, {
    //     method: 'POST',
    //     body: formData,
    //   });

    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }

    //   const result = await response.json();
    //   console.log("Data submitted successfully:", result);
    //   setRefresh(true);
    //   handleClose();
    // } catch (error) {
    //   console.error("Error submitting data:", error);
    // }
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
          <span data-bs-dismiss="modal" onClick={handleClose} aria-label="Close">
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
        <div className="modal-body" style={{ padding: '20px' }}>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', marginBottom: '0' }}>
              <thead style={{ backgroundColor: '#1C335C', color: 'white' }}>
                <tr>
                  <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Select</th>
                  <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Fee Group Name</th>
                  <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Fee Type Name</th>
                  <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Amount</th>
                  <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Adjustment</th>
                  <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Total Amount</th>
                  <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(groupedData).map((groupName, groupIndex) => (
                  <React.Fragment key={groupIndex}>
                    {groupedData[groupName].map((item, itemIndex) => (
                      <tr key={itemIndex} style={{ fontSize: '16px' }}>
                        <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>
                          <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={() => handleCheckboxChange(groupIndex, itemIndex)}
                          />
                        </td>
                        {itemIndex === 0 && (
                          <td style={{ padding: '10px', border: '1px solid #dee2e6' }} rowSpan={groupedData[groupName].length}>
                            {groupName}
                          </td>
                        )}
                        <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{item.fee_type_name}</td>
                        <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{item.amount}</td>
                        <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>
                          <input
                            type="text"
                            value={item.adjustment || ''}
                            onChange={(e) => handleAdjustmentChange(groupIndex, itemIndex, e.target.value)}
                            style={{ width: '100%', boxSizing: 'border-box', border: '1px solid #ced4da', borderRadius: '4px', padding: '4px' }}
                          />
                        </td>
                        <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{item.amount}</td>
                        <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{item.is_active}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '20px', textAlign: 'right' }}>
            <strong>Total Amount: </strong>
            <span>{totalAmount.toFixed(2)}</span>
          </div>
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <Button variant="primary" onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      </div>
    </Modal>,
    modalsRoot
  );
};

export { CreateCollectFees };
