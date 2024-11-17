import React, { FC } from "react";

interface TablesWidget17Props {
  groupDetails: any;
  className?: string;
}

const TablesWidget17: FC<TablesWidget17Props> = ({ groupDetails, className }) => {
  const { fee_group_name, fees } = groupDetails;

  return (
    <div className={className}>
      <h3>Fee Details</h3>
      <p><strong>Fee Group Name:</strong> {fee_group_name}</p>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Fee Type Name</th>
            <th>Amount</th>
            <th>Amount Paid</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {fees.map((fee: any) => (
            <tr key={fee.student_fees_master_id}>
              <td>{fee.fee_type_name}</td>
              <td>{fee.amount}</td>
              <td>{fee.amount_paid}</td>
              <td>{fee.total_amount}</td>
              <td>{fee.status}</td>
              <td>{new Date(fee.due_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
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
                      // onClick={() => handleGroupClick(groupName)}
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
      </table>
    </div>
  );
};

export { TablesWidget17 };
