import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Modal } from "react-bootstrap";
import { useAuth } from "../../../../app/modules/auth/core/Auth";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";
type Props = {
  show: boolean;
  handleClose: () => void;
  enqId: string | undefined;
  setRefresh: (refresh: boolean) => void;
  // refresh: (refresh: boolean) => void;
};


const modalsRoot = document.getElementById("root-modals") || document.body;



const ReviewApplication = ({ show, handleClose, enqId, setRefresh }: Props) => {


  const { currentUser } = useAuth();
  const schoolId = currentUser?.school_id;
  const [data, setData] = useState([]);
  

  useEffect(() => {
    const enquiry_id = enqId
      const fetchApplication = async () => {
        try {
          const response = await fetch(`${DOMAIN}/api/staff/get-application-review/${schoolId}/${enquiry_id}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();
          setData(result);
        } catch (error) {
            console.error("Error fetching application review data:", error);
        }
    };
    fetchApplication();
    
}, [schoolId,enqId]); 

console.log(data)


  return createPortal(
    <Modal
      id="kt_modal_create_app"
      tabIndex={-1}
      size="lg"
      aria-hidden="true"
      dialogClassName="modal-dialog modal-dialog-centered mw-1000px"
      show={show}
      onHide={handleClose}
      // fullscreen={true}
    >
      <div
        className="modal-content"
        style={{ padding: "20px 5px", borderRadius: "17px" }}
      > <div
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
        Edit Enquiry
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
            stroke-width="2"
            stroke-linecap="square"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </div>
    <hr></hr>

    <div className="modal-body" style={{ justifyContent: "center" }}>
    <div className="table-responsive" style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
              <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th>Student Name</th>
                    <th>Student Phone</th>
                    <th>Student Address</th>
                    <th>Student Email</th>
                    <th>Status</th>
                    <th>Class</th>
                    <th>Gender</th>
                    <th>Date of Birth</th>
                    <th>Current School</th>
                    <th>Academic Year</th>
                    <th>Father's Name</th>
                    <th>Father's Phone</th>
                    <th>Mother's Name</th>
                    <th>Mother's Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.student_name}</td>
                      <td>{item.student_phone}</td>
                      <td>{item.student_address}</td>
                      <td>{item.reference_id}</td>
                      <td>{item.reference}</td>
                      <td>{item.description}</td>
                      <td>{item.follow_up_date ? new Date(item.follow_up_date).toLocaleDateString() : 'N/A'}</td>
                      <td>{item.note}</td>
                      <td>{item.source_id}</td>
                      <td>{item.source}</td>
                      <td>{item.student_email}</td>
                      <td>{item.status}</td>
                      <td>{item.enquiry_type}</td>
                      <td>{item.class_id}</td>
                      <td>{item.class}</td>
                      <td>{item.gender}</td>
                      <td>{item.date_of_birth ? new Date(item.date_of_birth).toLocaleDateString() : 'N/A'}</td>
                      <td>{item.current_school}</td>
                      <td>{item.academic_year}</td>
                      <td>{item.father_name}</td>
                      <td>{item.father_phone}</td>
                      <td>{item.mother_name}</td>
                      <td>{item.mother_phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
      </div>
    </Modal>
    ,modalsRoot,
  );
};

export { ReviewApplication };
