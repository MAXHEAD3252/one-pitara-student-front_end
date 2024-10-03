import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Modal } from "react-bootstrap";
import { useAuth } from "../../../../app/modules/auth/core/Auth";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";

type Props = {
  show: boolean;
  handleClose: () => void;
  enqId: string | undefined;
  isReviwed: string | undefined;
  setRefresh: (refresh: boolean) => void;
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
  student_pic: string | null;
  father_pic: string | null;
  mother_pic: string | null;
  school_id: string;
  enquiry_id: string;
}

const modalsRoot = document.getElementById("root-modals") || document.body;

const ReviewApplication = ({ show, handleClose, enqId, setRefresh,isReviwed }: Props) => {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const schoolId = currentUser?.school_id;
  const [data, setData] = useState<ApplicationData[]>([]);
  const [studentPic, setStudentPic] = useState("");
  const [fatherPic, setFatherPic] = useState("");
  const [motherPic, setMotherPic] = useState("");
  const [guardianPic, setGuardianPic] = useState("");
  console.log(data);
  
  

  useEffect(() => {
    const enquiry_id = enqId;
    const fetchApplication = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/api/school/get-application-review/${schoolId}/${enquiry_id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
        handleStudentPic(result[0]?.student_pic); 
        handleFatherPic(result[0]?.father_pic); 
        handleMotherPic(result[0]?.mother_pic); 
        handleGuardianPic(result[0]?.gardian_pic); 
      } catch (error) {
        console.error("Error fetching application review data:", error);
      }
    };
    fetchApplication();
  }, [schoolId, enqId]);

  const handleCloseModal = () =>{
    setData([]);
    setStudentPic('');
    setFatherPic('');
    setMotherPic('');
    setGuardianPic('');
handleClose();


  }
  const handleStudentPic = async (student_pic: string) => {
    if (!student_pic) return; // If no student pic, exit early

    setLoading(true);
    try {
      const response = await fetch(
        `${DOMAIN}/api/school/get-student-pic`, // Endpoint for fetching student image
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ student_pic }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const imageObjectURL = URL.createObjectURL(blob);
      setStudentPic(imageObjectURL);
    } catch (error) {
      console.error("Error fetching student picture:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleFatherPic = async (father_pic: string) => {
    if (!father_pic) return; // If no student pic, exit early

    setLoading(true);
    try {
      const response = await fetch(
        `${DOMAIN}/api/school/get-father-pic`, // Endpoint for fetching student image
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ father_pic }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const imageObjectURL = URL.createObjectURL(blob);
      setFatherPic(imageObjectURL);
    } catch (error) {
      console.error("Error fetching student picture:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleMotherPic = async (mother_pic: string) => {
    if (!mother_pic) return; // If no student pic, exit early

    setLoading(true);
    try {
      const response = await fetch(
        `${DOMAIN}/api/school/get-mother-pic`, // Endpoint for fetching student image
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mother_pic }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const imageObjectURL = URL.createObjectURL(blob);
      setMotherPic(imageObjectURL);
    } catch (error) {
      console.error("Error fetching student picture:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleGuardianPic = async (gardian_pic: string) => {
    if (!gardian_pic) return; // If no student pic, exit early
    

    setLoading(true);
    try {
      const response = await fetch(
        `${DOMAIN}/api/school/get-guardian-pic`, // Endpoint for fetching student image
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ gardian_pic }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const imageObjectURL = URL.createObjectURL(blob);
      setGuardianPic(imageObjectURL);
    } catch (error) {
      console.error("Error fetching student picture:", error);
    } finally {
      setLoading(false);
    }
  };

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
      onHide={handleCloseModal}
    >
      <div
        className="modal-header"
        style={{
          backgroundColor: "#F2F6FF",
          borderBottom: "1px solid lightgray",
        }}
      >
        <h2> Review Application</h2>
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={handleCloseModal}
        >
          <i className="fas fa-times"></i>
        </div>
      </div>

      <div
        className="modal-body"
        style={{ padding: "20px", backgroundColor: "#F2F6FF" }}
      >
        {data.map((item, index) => (
          <div key={index}>
            {/* Profile Section */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="d-flex align-items-center mb-4">
                <img
                  src={studentPic || "https://via.placeholder.com/80"}
                  alt="Profile"
                  className="rounded-circle"
                  style={{ width: "90px", height: "90px", marginRight: "15px", objectFit: "cover"  }}
                />
                <div>
                  <h4>{item.name}</h4>
                  <p className="mb-0 text-muted">
                    <strong>Applied For :</strong> {item.class}
                  </p>
                  <p className="mb-0 text-muted">
                    <strong>Academic Year : </strong>20{item.academic_year}
                  </p>
                  <p className="text-muted">
                    <strong>Application Id :</strong>{" "}
                    {item.application_submit_id}
                  </p>
                </div>
              </div>
              <div style={{display:'flex', gap:'10px'}}>
                <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'5px'}}>
                <img
                  src={fatherPic || "https://via.placeholder.com/80"}
                  alt="Profile"
                  className="rounded-circle"
                  style={{ width: "90px", height: "90px" , objectFit: "cover" }}
                />
                <span className="text-muted" style={{color:'#1C335C'}}>Father's Pic</span>
                </div>
                <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'5px'}}>
                <img
                  src={motherPic || "https://via.placeholder.com/80"}
                  alt="Profile"
                  className="rounded-circle"
                  style={{ width: "90px", height: "90px", objectFit: "cover"  }}
                />
                <span className="text-muted" style={{color:'#1C335C'}}>Father's Pic</span>
                </div>
                <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'5px'}}>
                <img
                  src={guardianPic || "https://via.placeholder.com/80"}
                  alt="Profile"
                  className="rounded-circle"
                  style={{ width: "90px", height: "90px", objectFit: "cover"  }}
                />
                <span className="text-muted" style={{color:'#1C335C'}}>Father's Pic</span>
                </div>
                
              </div>
            </div>

            <hr />

            {/* Personal Information Section */}
            <div
              className="card p-5 mb-4"
              style={{
                backgroundColor: "#B1E3FF",
                color: "#1C335C",
                fontFamily: "Manrope",
              }}
            >
              <h5>Personal Information</h5>
              <hr />
              <div className="row">
                <div className="col-md-4">
                  <p>
                    <strong>Student Name:</strong> {item.name}
                  </p>
                  <p>
                    <strong>Contact:</strong> {item.contact}
                  </p>
                  <p>
                    <strong>Email:</strong> {item.email}
                  </p>
                </div>
                <div className="col-md-4">
                  <p>
                    <strong>Gender:</strong> {item.gender}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong>{" "}
                    {item.date_of_birth
                      ? new Date(item.date_of_birth).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <p>
                    <strong>Current School:</strong> {item.current_school}
                  </p>
                </div>
                <div className="col-md-4">
                  <p>
                    <strong>Aadhaar No:</strong> {item.aadhaar_no}
                  </p>
                  <p>
                    <strong>Religion:</strong> {item.religion}
                  </p>
                  <p>
                    <strong>Address:</strong> {item.city}, {item.state},{" "}
                    {item.pincode}
                  </p>
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div
              className="card p-5 mb-4"
              style={{
                backgroundColor: "#FFF8B6",
                color: "#1C335C",
                fontFamily: "Manrope",
              }}
            >
              <h5>Parent Information</h5>
              <hr />
              <div className="row">
                <div className="col-md-4">
                  <p>
                    <strong>Father Name:</strong> {item.father_name}
                  </p>
                  <p>
                    <strong>Father Contact Number:</strong>{" "}
                    {item.father_contact_number}
                  </p>
                  <p>
                    <strong>Father Occupation:</strong> {item.father_occupation}
                  </p>
                  <p>
                    <strong>Father Organization:</strong>{" "}
                    {item.father_organization}
                  </p>
                  <p>
                    <strong>Father Type Of Work:</strong>{" "}
                    {item.father_type_of_work}
                  </p>
                </div>
                <div className="col-md-4">
                  <p>
                    <strong>Mother Name:</strong> {item.mother_name}
                  </p>
                  <p>
                    <strong>Mother Contact Number:</strong>{" "}
                    {item.mother_contact_number}
                  </p>
                  <p>
                    <strong>Mother Occupation:</strong> {item.mother_occupation}
                  </p>
                  <p>
                    <strong>Mother Organization:</strong>{" "}
                    {item.mother_organization}
                  </p>
                </div>
                <div className="col-md-4">
                  <p>
                    <strong>Guardian Name:</strong> {item.gardian_name}
                  </p>
                  <p>
                    <strong>Guardian Contact Number:</strong>{" "}
                    {item.gardian_contact_number}
                  </p>
                  <p>
                    <strong>Guardian Occupation:</strong>{" "}
                    {item.gardian_occupation}
                  </p>
                  <p>
                    <strong>Guardian Relation:</strong> {item.gardian_relation}
                  </p>
                </div>
              </div>
            </div>
            <div
              className="card p-5 mb-4"
              style={{
                backgroundColor: "#DFFFB6",
                color: "#1C335C",
                fontFamily: "Manrope",
              }}
            >
              <h5>Additional Information</h5>
              <hr />
              <div className="row">
                <div className="col-md-4">
                  <p>
                    <strong>Current School:</strong> {item.current_school }
                  </p>
                  <p>
                    <strong>Back Account No:</strong>{" "}
                    {item.back_account_no}
                  </p>
                </div>
                <div className="col-md-4">
                  <p>
                    <strong>Bank Name:</strong> {item.bank_name}
                  </p>
                </div>
                <div className="col-md-4">
                  <p>
                    <strong>IFSC Code:</strong>{" "}
                    {item.ifsc_code}
                  </p>
                </div>
              </div>
            </div>

           
              <div className="text-end mt-10">
                {isReviwed === "isReviewed" ? (
                  <span className="bg-success p-3" style={{fontFamily:'Manrope', fontSize:'14px', borderRadius:'10px', color:'#fff', fontWeight:'600'}}>Already Accepted</span>
                ) : (
                  <button
                    className="btn btn-success"
                    onClick={() =>
                      handleAccept(item.school_id, item.enquiry_id)
                    }
                    disabled={loading}
                  >
                    {loading ? "Accepting..." : "Accept Application"}
                  </button>
                )}
              </div>
          </div>
        ))}
      </div>
    </Modal>,
    modalsRoot
  );
};

export { ReviewApplication };
