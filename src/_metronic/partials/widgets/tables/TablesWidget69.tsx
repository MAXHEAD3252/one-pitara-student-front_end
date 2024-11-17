/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import "../../../../app/pages/StaffPages/FinancialManagement/style.css";
import { useAuth } from "../../../../app/modules/auth/core/Auth";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";
import { useNavigate } from "react-router-dom";

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

const TablesWidget69: React.FC = () => {
  const { currentUser } = useAuth();
  const schoolId = currentUser?.school_id;
  const studentId = currentUser?.id;
  const sessionId = currentUser?.session_id;
  const class_id = currentUser?.class_id;

  const [groupedData, setGroupedData] = useState<Map<string, FeeGroup[]>>(new Map());
  const [selectedId, setSelectedId] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [detailedData, setDetailedData] = useState<ApplicationData[]>([]);
  const [data, setData] = useState<ApplicationData[]>([]);
  const [studentTransaction, setStudentTransaction] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeeGroupType = async () => {
      try {
        const url = `${DOMAIN}/api/student/get-feegroup-for-student/${schoolId}/${studentId}/${sessionId}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Network response was not ok for URL: ${url}`);
        }
        const result: FeeGroup[] = await response.json();
        const grouped = result.reduce((acc, group) => {
          acc.set(group.fee_group_name, group);
          return acc;
        }, new Map<string, FeeGroup>());
        setGroupedData(grouped);
      } catch (error) {
        console.error("Error fetching fee group/type data:", error);
      }
    };

    if (studentId) {
      fetchFeeGroupType();
    }
  }, [schoolId, class_id, sessionId, studentId]);

  const calculateTotalAmount = (fees: FeeType[]) => {
    return fees.reduce((total, fee) => {
      const amount = parseFloat(fee.amount) || 0;
      const adjustment = parseFloat(fee.adjustment) || 0;
      return total + amount + adjustment;
    }, 0);
  };



  const handleGroupClick = (groupName: string) => {
    const groupDetails = groupedData.get(groupName);
    if (!groupDetails) {
      console.error("No details found for group:", groupName);
      return;
    }
  
    const groupId = groupDetails?.fee_group_id;
    if (!groupId) {
      console.error("Invalid group ID:", groupId);
      return;
    }
  
    setSelectedId(groupId);
    setSelectedGroup(groupName);
    setDetailedData(groupDetails);
  
    setData((prevData) =>
      prevData.map((item) =>
        item.fee_group_id === groupId ? { ...item, is_tagged: true } : item
      )
    );
  
    console.log(groupDetails);
  
    navigate("/student-fee-collect", { state: { groupDetails } });
  };
  

  return (
    <div
      style={{
        width: "auto",
        borderRadius: "16px",
        backgroundColor: "rgb(242, 246, 255)",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        marginLeft: "6vh",
        marginRight:'5vh',
      }}
    >
      <h2 style={{ fontSize: "20px", fontWeight: 600, color: "#1C335C" }}>
        Fee Payment
      </h2>
      <div style={{ overflowY: "auto", maxHeight: "50vh", marginTop: "20px" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#FFFFFF",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "rgb(242, 246, 255)", color: "#1C335C" }}>
              <th style={{ padding: "12px 20px", textAlign: "left" }}>Fee Group</th>
              <th style={{ padding: "12px 20px", textAlign: "left" }}>Total Amount</th>
              <th style={{ padding: "12px 20px", textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {groupedData.size > 0 ? (
              Array.from(groupedData.entries()).map(([groupName, group]) => (
                <tr key={groupName} style={{ borderBottom: "1px solid #E0E4F0" }}>
                  <td style={{ padding: "12px 20px" }}>{groupName}</td>
                  <td style={{ padding: "12px 20px" }}>
                    ₹{calculateTotalAmount(group.fees).toFixed(2)}
                  </td>
                  <td
                    style={{
                      padding: "12px 20px",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    <div
                      style={{
                        display: "inline-flex",
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
                        Pay Fees
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} style={{ textAlign: "center", padding: "20px" }}>
                  No fee groups available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { TablesWidget69 };