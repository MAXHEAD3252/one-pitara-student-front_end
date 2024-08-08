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

interface FeeType {
  fee_type_id: number;
  fee_type_name: string;
}

interface FeeGroup {
  fee_group_id: number;
  fee_group_name: string;
  fees: FeeType[];
}

interface ApplicationData {
  fee_group_id: number;
  fee_type_id: number;
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
  const [groupedData, setGroupedData] = useState<Map<string, ApplicationData[]>>();
  const [groupChecked, setGroupChecked] = useState<Map<string, boolean>>();
  const [selectedData, setSelectedData] = useState<ApplicationData[]>([]); // State to track selected data
  

  useEffect(() => {
    const fetchFeeGroupType = async () => {
      try {
        const response = await fetch(`${DOMAIN}/api/staff/get-feegrouptype/${schoolId}/${class_id}/${session_id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result: FeeGroup[] = await response.json();

        // Transform the API data into a flat array
        const formattedData = result.flatMap(group =>
          group.fees.map(fee => ({
            fee_group_id: group.fee_group_id,
            fee_type_id: fee.fee_type_id,
            fee_group_name: group.fee_group_name,
            fee_type_name: fee.fee_type_name,
            amount: '0', // Placeholder, adjust as needed
            adjustment: '0', // Placeholder, adjust as needed
            is_active: '1', // Placeholder, adjust as needed
            checked: false
          }))
        );

        // Group data by fee_group_name
        const grouped = formattedData.reduce((acc, item) => {
          if (!acc[item.fee_group_name]) {
            acc[item.fee_group_name] = [];
          }
          acc[item.fee_group_name].push(item);
          return acc;
        }, {} as { [key: string]: ApplicationData[] });

        setGroupedData(new Map(Object.entries(grouped)));
        setData(formattedData);
        setGroupChecked(new Map(Object.keys(grouped).map(group => [group, false])));
      } catch (error) {
        console.error("Error fetching application review data:", error);
      }
    };
    fetchFeeGroupType();
  }, [schoolId, class_id, session_id]);

  const handleGroupCheckboxChange = (groupName: string) => {
    const newCheckedState = !groupChecked.get(groupName);
    setGroupChecked(new Map(groupChecked).set(groupName, newCheckedState));

    const newData = data.map(item =>
      item.fee_group_name === groupName
        ? { ...item, checked: newCheckedState }
        : item
    );
    setData(newData);

    // Update selected data state based on the checkbox change
    const selected = newData.filter(item => item.checked);
    setSelectedData(selected);
  };

  const handleAdjustmentChange = (index: number, value: string) => {
    const newData = [...data];
    newData[index] = { ...newData[index], adjustment: value };
    setData(newData);

    // Update selected data state if the item is selected
    const selected = newData.filter(item => item.checked);
    setSelectedData(selected);
  };

  const calculateTotalAmount = (amount: string, adjustment: string) => {
    const amountNum = parseFloat(amount) || 0;
    const adjustmentNum = parseFloat(adjustment) || 0;
    return amountNum + adjustmentNum;
  };

  console.log(selectedData);
  const handleSubmit = async () => {
    setLoading(true);

    const formData = new FormData();
    
    selectedData.forEach((item, index) => {
      formData.append(`data[${index}][fee_group_id]`, item.fee_group_id.toString());
      formData.append(`data[${index}][fee_type_id]`, item.fee_type_id.toString());
      formData.append(`data[${index}][fee_group_name]`, item.fee_group_name);
      formData.append(`data[${index}][fee_type_name]`, item.fee_type_name);
      formData.append(`data[${index}][amount]`, item.amount);
      formData.append(`data[${index}][adjustment]`, item.adjustment);
      formData.append(`data[${index}][is_active]`, item.is_active);
    });
    
    
  return;
    try {
      const response = await fetch(`${DOMAIN}/api/your-endpoint`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
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
                {Array.from(groupedData?.entries() || []).map(([groupName, items]) => (
                  <>
                    <tr key={`group-${groupName}`}>
                      <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>
                        <input
                          type="checkbox"
                          checked={groupChecked.get(groupName) || false}
                          onChange={() => handleGroupCheckboxChange(groupName)}
                        />
                      </td>
                      <td style={{ padding: '10px', border: '1px solid #dee2e6' }} colSpan={6}>
                        <strong>{groupName}</strong>
                      </td>
                    </tr>
                    {items.map((item, index) => (
                      <tr key={`item-${item.fee_type_id}`}>
                        <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>
                          {item.checked ? (
                            <input
                              type="checkbox"
                              checked
                              readOnly
                            />
                          ) : null}
                        </td>
                        <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>
                          {item.fee_group_name}
                        </td>
                        <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>
                          {item.fee_type_name}
                        </td>
                        <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>
                          <input
                            type="number"
                            // value={item.amount}
                            onChange={(e) => handleAdjustmentChange(index, e.target.value)}
                            min={0}
                          />
                        </td>
                        <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>
                          <input
                            type="number"
                            // value={item.adjustment}
                            onChange={(e) => handleAdjustmentChange(index, e.target.value)}
                          />
                        </td>
                        <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>
                          {calculateTotalAmount(item.amount, item.adjustment)}
                        </td>
                        <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>
                          {item.is_active === '1' ? 'Active' : 'Inactive'}
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="modal-footer">
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    </Modal>,
    modalsRoot
  );
};

export { CreateCollectFees };
