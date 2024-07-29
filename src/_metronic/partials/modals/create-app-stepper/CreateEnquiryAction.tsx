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
};

const modalsRoot = document.getElementById("root-modals") || document.body;

const CreateEnquiryAction = ({ show, handleClose, enqId,setRefresh }: Props) => {
  const { currentUser } = useAuth();
  const schoolId = currentUser?.school_id;
  const [enqdata, setEnqdata] = useState({
    follow_up_date: "",
    status: "",
    name: "",
    father_name: "",
    father_phone: "",
  });

  const [formData, setFormData] = useState({
    status: "",
    is_move_to_adm: "",
    school_id: schoolId,
    follow_up_date: "",
  });
  /* @ts-ignore */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
    setEnqdata((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const formatDateToYYYYMMDD = (dateString: string | null | undefined): string => {
    if (!dateString) return "";
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ""; // Use getTime() to check if date is valid
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    
    return `${year}-${month}-${day}`;
  };
  

  useEffect(() => {
    const fetchEnquiryById = async () => {
      if (!schoolId || !enqId) return;

      try {
        const response = await fetch(
          `${DOMAIN}/api/staff/getEnquiryById/${schoolId}/${enqId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        

        // Ensure data is an array and check for valid first element
        const follow_up_date = data?.[0]?.follow_up_date
          ? formatDateToYYYYMMDD(data[0].follow_up_date)
          : "";

        setEnqdata({
          name: data[0]?.student_name || "",
          /* @ts-ignore */
          father_contact_number: data[0]?.father_phone || "",
          father_name: data[0]?.father_name || "",
          follow_up_date: follow_up_date || "",
          status: data[0]?.status || "",
        });
      } catch (error) {
        console.error("Error fetching Enquiry:", error);
      }
    };
    fetchEnquiryById();
  }, [schoolId, enqId]);
/* @ts-ignore */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${DOMAIN}/api/staff/update-followup/${schoolId}/${enqId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formData,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Follow-up updated successfully:", data);
      handleClose();
      setRefresh(true);
    } catch (error) {

      console.error("Error updating follow-up:", error);
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
            Enquiry Follow UP
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
        <div className="modal-body" style={{ justifyContent: "center" }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "23px" }}>
              {enqdata ? (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Manrope",
                      fontSize: "14px",
                      fontWeight: "700",
                    }}
                  >
                    Name:{" "}
                    <span
                      style={{
                        fontFamily: "Manrope",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      {enqdata?.name}
                    </span>
                  </span>
                  {enqdata?.father_name && (
                    <>
                    <span
                    style={{
                      fontFamily: "Manrope",
                      fontSize: "14px",
                      fontWeight: "700",
                    }}
                  >
                    Father's Name:{" "}
                    <span
                      style={{
                        fontFamily: "Manrope",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      
                      {
                      enqdata?.father_name}
                    </span>{" "}
                  </span>
                  <span
                    style={{
                      fontFamily: "Manrope",
                      fontSize: "14px",
                      fontWeight: "700",
                    }}
                  >
                    Father's Contact:{" "}
                    <span
                      style={{
                        fontFamily: "Manrope",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      {
                      enqdata?.father_phone}
                    </span>{" "}
                  </span>
                    </>

                  )}
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
            <div
              className="fv-row mb-10"
              style={{ display: "flex", gap: "10px", alignItems: "center" }}
            >
              <div
                className="form-floating mb-3"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <input
                  type="date"
                  className="form-control"
                  id="follow_up_date"
                  name="follow_up_date"
                  placeholder=""
                  value={enqdata.follow_up_date}
                  onChange={handleChange}
                />
                <label htmlFor="follow_up_date">Follow up date</label>
              </div>

              <div
                className="form-floating mb-3"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <select
                  className="form-select"
                  id="status"
                  name="status"
                  aria-label="Default select example"
                  value={enqdata?.status}
                  onChange={handleChange}
                >
                  <option value="active">Active</option>
                  <option value="dead">Dead</option>
                  <option value="lost">Lost</option>
                  <option value="won">Won</option>
                </select>
                <label htmlFor="Status">Status</label>
              </div>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="is_move_to_adm"
                name="is_move_to_adm"
                value={formData.is_move_to_adm}
                onChange={handleChange}
                disabled={formData.status !== "won"}
              />
              <label
                className="form-check-label"
                htmlFor="is_move_to_adm"
                style={{ color: "black" }}
              >
                is_move_to_adm
              </label>
            </div>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>,
    modalsRoot
  );
};

export { CreateEnquiryAction };
