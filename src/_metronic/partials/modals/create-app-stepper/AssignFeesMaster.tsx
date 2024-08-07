import React, { useEffect, useState } from "react";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";
import { Modal } from "react-bootstrap";
import './AssignFeesMaster.css'; // Ensure you import the CSS file

interface AssignFeesMasterProps {
  show: boolean;
  onHide: () => void;
  classId: string | null;
  schoolId: string | undefined;
  feeDetails: FeeDetail[];
}
interface FeeDetail {
  fee_id: number;
  fee_name: string;
  fee_group_id: number;
  fee_amount: string;
}

interface Student {
  id: string;
  student_name: string;
}

const AssignFeesMaster: React.FC<AssignFeesMasterProps> = ({
  show,
  onHide,
  classId,
  schoolId,
  feeDetails
}) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [checkedStudents, setCheckedStudents] = useState<{ [key: string]: boolean }>({});
  const [selectAll, setSelectAll] = useState(false);

  

  useEffect(() => {
    if (classId && schoolId) {
      fetchStudents(classId, schoolId);
    }
  }, [classId, schoolId]);

  const fetchStudents = async (classId, schoolId) => {
    try {
      const response = await fetch(
        `${DOMAIN}/api/staff/classes/${classId}/students?schoolId=${schoolId}`
      );
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleCheck = (studentId: string) => {
    setCheckedStudents(prevState => ({
      ...prevState,
      [studentId]: !prevState[studentId],
    }));
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    
    const newCheckedStudents = students.reduce((acc, student) => {
      acc[student.id] = newSelectAll;
      return acc;
    }, {} as { [key: string]: boolean });
    
    setCheckedStudents(newCheckedStudents);
  };

  const handleSubmit = async () => {
    const selectedStudents = students
      .filter(student => checkedStudents[student.id])
      .map(student => student.id);
  
    const entries = selectedStudents.flatMap(studentId =>
      feeDetails.map(feeDetail => ({
        studentId,
        feeGroupId: feeDetail.fee_group_id,
        feeTypeId: feeDetail.fee_id,
        amount: feeDetail.fee_amount // Use the actual fee amount from fee details
      }))
    );
  
    console.log(entries);
    return;

    try {
      await fetch(`${DOMAIN}/api/fees/assign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(entries)
      });
      console.log('Data saved successfully');
      onHide(); // Close modal after saving
    } catch (error) {
      console.error('Error saving data:', error);
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
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        <div className="modal-body" style={{ overflow: 'auto' }}>
          <form>
            <div className="table-container">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Student Name</th>
                    <th>
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                      Select All
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(student => (
                    <tr key={student.id}>
                      <td>{student.id}</td>
                      <td>{student.student_name}</td>
                      <td>
                        <input
                          type="checkbox"
                          checked={!!checkedStudents[student.id]}
                          onChange={() => handleCheck(student.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
              style={{ marginTop: '20px' }}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AssignFeesMaster;