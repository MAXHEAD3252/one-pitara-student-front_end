import React, { useEffect, useState } from "react";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";
import { Button, Form, Modal, Table } from "react-bootstrap";
import "./AssignFeesMaster.css"; // Ensure you import the CSS file
import { useAuth } from "../../../../app/modules/auth/core/Auth";
import Feedback from "react-bootstrap/esm/Feedback";

interface AssignFeesMasterProps {
  show: boolean;
  onHide: () => void;
  classId: string | null;
  groupName: string | null;
  schoolId: string | undefined;
  feeDetails: FeeDetail[];
}
interface FeeDetail {
  fee_type_id: any;
  fee_group_type_id: any;
  fee_id: number;
  fee_name: string;
  fee_group_id: number;
  fee_amount: string;
  fee_group_session_id: string;
}

interface Student {
  student_id: string;
  student_name: string;
  student_session_id: string;
}

const AssignFeesMaster: React.FC<AssignFeesMasterProps> = ({
  show,
  onHide,
  classId,
  groupName,
  schoolId,
  feeDetails,
}) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [checkedStudents, setCheckedStudents] = useState<{
    [key: string]: { checked: boolean; session_id: string | null };
  }>({});
  const [selectAll, setSelectAll] = useState(false);
  const { currentUser } = useAuth();
  const userId = currentUser?.id;

  useEffect(() => {
    if (classId && schoolId) {
      fetchStudents(classId, schoolId);
    }
  }, [classId, schoolId]);

  const fetchStudents = async (classId: string, schoolId: string) => {
    try {
      const response = await fetch(
        `${DOMAIN}/api/school/classes/${classId}/students?schoolId=${schoolId}`
      );
      const data = await response.json();
      console.log(data);

      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleCheck = (studentId: string, studentSessionId: string) => {
    setCheckedStudents((prevState) => ({
      ...prevState,
      [studentId]: {
        checked: !prevState[studentId]?.checked,
        session_id: !prevState[studentId]?.checked ? studentSessionId : null,
      },
    }));
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    const newCheckedStudents = students.reduce((acc, student) => {
      acc[student.student_id] = {
        checked: newSelectAll,
        session_id: newSelectAll ? student.student_session_id : null,
      };
      return acc;
    }, {} as { [key: string]: { checked: boolean; session_id: string | null } });

    setCheckedStudents(newCheckedStudents);
  };

  const handleSubmit = async () => {
    const selectedStudents = students
      .filter((student) => checkedStudents[student.student_id]?.checked)
      .map((student) => ({
        studentId: student.student_id,
        studentSessionId: checkedStudents[student.student_id]?.session_id,
      }));

    const entries = selectedStudents.flatMap(
      ({ studentId, studentSessionId }) =>
        feeDetails.map((feeDetail) => ({
          studentId,
          studentSessionId,
          feeGroupId: feeDetail.fee_group_id,
          feeTypeId: feeDetail.fee_type_id,
          fee_group_session_id: feeDetail.fee_group_session_id,
          fee_group_type_id: feeDetail.fee_group_type_id,
          amount: feeDetail.fee_amount,
          userId: userId,
          session_id: studentSessionId,
          schoolId,
        }))
    );

    // console.log(entries);

    // return;

    try {
      await fetch(`${DOMAIN}/api/school/add-studentfeesmaster`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entries),
      });
      console.log("Data saved successfully");
      onHide(); // Close modal after saving
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <Modal
    id="kt_modal_create_app"
    tabIndex={-1}
    aria-hidden="true"
    dialogClassName="modal-dialog modal-dialog-centered mw-1000px"
    show={show}
    onHide={onHide}
    backdrop="static"
    className="custom-modal"
  >
    {/* Modal Header */}
    <Modal.Header
      style={{
        backgroundColor: "#F2F6FF",
        borderBottom: "1px solid lightgray",
        fontFamily: "Manrope",
      }}
      closeButton
    >
      <Modal.Title style={{ fontWeight: "600", fontSize: "20px", color: "#273B63" }}>
        Assign Fees Master : 2023-24
      </Modal.Title>
    </Modal.Header>

    {/* Modal Body */}
    <Modal.Body style={{ backgroundColor: "#F9FBFF", padding: "30px",maxHeight: "680px", // Limit the height of the modal body
          overflowY: "auto"}}>
      <div style={{ fontFamily: "Manrope" }}>
        <div style={{ marginBottom: "20px", fontSize: "14px", color: "#4A4A4A" }}>
          <strong>Group Name: </strong> {groupName}
        </div>
        <div style={{ marginBottom: "20px", fontSize: "14px", color: "#4A4A4A" }}>
          <strong>Fee Type: </strong>
          {feeDetails.map((fee, idx) => (
            <span key={idx} style={{ marginRight: "10px" }}>
              {fee.fee_name},
            </span>
          ))}
        </div>
      </div>

      {/* Student List Table */}
      <div className="table-responsive">
        <Table bordered hover className="table-striped" style={{ border: "1px solid #DEE2E6" }}>
          <thead style={{ backgroundColor: "#E8F0FF", color: "#273B63" }}>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>
                <Form.Check
                  type="checkbox"
                  label="Select All"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  style={{ marginLeft: "10px" }}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.student_id}>
                <td>{student.student_id}</td>
                <td>{student.student_name}</td>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={!!checkedStudents[student.student_id]?.checked}
                    onChange={() =>
                      handleCheck(student.student_id, student.student_session_id)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Save Button */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
        <Button
          variant="primary"
          onClick={handleSubmit}
          style={{
            backgroundColor: "#273B63",
            borderColor: "#273B63",
            padding: "10px 20px",
            borderRadius: "8px",
            fontWeight: "500",
          }}
        >
          Save
        </Button>
      </div>
    </Modal.Body>
  </Modal>
  );
};

export default AssignFeesMaster;
