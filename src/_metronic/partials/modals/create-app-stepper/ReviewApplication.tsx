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

interface ApplicationData {
  name: string;
  contact: string;
  state: string;
  city: string;
  pincode: string;
  email: string;
  status: string | null;
  class: string;
  gender: string;
  date_of_birth: string | null;
  current_school: string;
  academic_year: string;
  father_name: string;
  father_contact_number: string;
  mother_name: string;
  mother_contact_number: string;
  school_id: string;
  enquiry_id: string;
}

const modalsRoot = document.getElementById("root-modals") || document.body;


const ReviewApplication = ({ show, handleClose, enqId, setRefresh }: Props) => {

  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const schoolId = currentUser?.school_id;
  const [data, setData] = useState<ApplicationData[]>([]);
  

  useEffect(() => {
    const enquiry_id = enqId
      const fetchApplication = async () => {
        try {
          const response = await fetch(`${DOMAIN}/api/school/get-application-review/${schoolId}/${enquiry_id}`);
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



const handleAccept = async (schoolId: string, enquiryId: string) => {
  setLoading(true);
  try {
    const response = await fetch(
      `${DOMAIN}/api/school/application-accept/${schoolId}/${enquiryId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log("Application accepted successfully:", result);
    handleClose(); // Close the modal after a successful accept
    setRefresh(true);
  } catch (error) {
    console.error("Error accepting application:", error);
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
          Review Application
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
      <div className="modal-body">
        {data.map((item, index) => (
          <div key={index} className="row mb-3" style={{fontSize:'20px',}}>
            <div className="col-6">
              <strong>Student Name:</strong> {item.name}
            </div>
            <div className="col-6">
              <strong>Contact:</strong> {item.contact}
            </div>
            <div className="col-6">
              <strong>Address:</strong> {item.state}, {item.city}, {item.pincode}
            </div>
            <div className="col-6">
              <strong>Email:</strong> {item.email}
            </div>
            <div className="col-6">
              <strong>Status:</strong> {item.status || 'N/A'}
            </div>
            <div className="col-6">
              <strong>Class:</strong> {item.class}
            </div>
            <div className="col-6">
              <strong>Gender:</strong> {item.gender}
            </div>
            <div className="col-6">
              <strong>Date of Birth:</strong> {item.date_of_birth ? new Date(item.date_of_birth).toLocaleDateString() : 'N/A'}
            </div>
            <div className="col-6">
              <strong>Current School:</strong> {item.current_school}
            </div>
            <div className="col-6">
              <strong>Academic Year:</strong> {item.academic_year}
            </div>
            <div className="col-6">
              <strong>Father's Name:</strong> {item.father_name}
            </div>
            <div className="col-6">
              <strong>Father's Contact:</strong> {item.father_contact_number}
            </div>
            <div className="col-6">
              <strong>Mother's Name:</strong> {item.mother_name}
            </div>
            <div className="col-6">
              <strong>Mother's Contact:</strong> {item.mother_contact_number}
            </div>
            <div className="col-12" style={{marginTop:'20px',}}>
            {item.status === "isReviewed" ? (
                  <span className="badge bg-success">Already Accepted</span>
                ) : (
                  <button
                    className="btn btn-success"
                    onClick={() => handleAccept(item.school_id, item.enquiry_id)}
                    disabled={loading}
                  >
                    {loading ? "Accepting..." : "Accept Application"}
                  </button>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </Modal>
    ,modalsRoot,
  );
};

export { ReviewApplication };
