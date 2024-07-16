import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Modal } from "react-bootstrap";
import { useAuth } from "../../../../app/modules/auth";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";

type Props = {
  show: boolean;
  handleClose: () => void;
};

interface SectionData {
  id: string;
  section: string;
}

const modalsRoot = document.getElementById("root-modals") || document.body;

const AddClasses = ({ show, handleClose }: Props) => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [sections, setSections] = useState<SectionData[]>([]);
  const { currentUser } = useAuth();
  const school_id = currentUser?.school_id;

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/api/staff/get-onlysections/${school_id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSections(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (school_id) {
      fetchSections();
    }
  }, [school_id]);

  const handleSectionSelect = (section: string) => {
    setSelectedSection(section);
  };

  const handleSubmit = async () => {
    try {
      // Add your form submission logic here
      console.log("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return createPortal(
    <Modal
      id="kt_modal_create_app"
      tabIndex={-1}
      aria-hidden="true"
      dialogClassName="modal-dialog modal-dialog-centered mw-500px"
      show={show}
      onHide={handleClose}
      backdrop={true}
    >
      <div className="modal-content" style={{ padding: "23px 5px", borderRadius: "17px" }}>
        <div className="modal-header border-0" style={{ width: "100%", height: "17px" }}>
          <span className="" id="staticBackdropLabel" style={{ fontSize: "24px", fontWeight: "600", fontFamily: "Manrope" }}>
            Add Classes :
          </span>
          <span data-bs-dismiss="modal" aria-label="Close" onClick={handleClose} style={{ cursor: "pointer" }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16" fill="#ECECEC" />
              <path d="M22.8572 9.14294L9.14288 22.8572M9.14288 9.14294L22.8572 22.8572" stroke="#464646" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        <div className="modal-body">
          <div style={{ marginBottom: "23px", width: "100%" }}>
            <label htmlFor="materialtitle" className="form-label" style={{ fontSize: "12px", color: "#434343", fontWeight: "500" }}>
              Class Name
            </label>
            <div id="materialtitle">
              <input
                className=""
                style={{
                  height: "46px",
                  width: "100%",
                  paddingLeft: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "transparent",
                  border: "1px solid #ECEDF1",
                  borderRadius: "8px",
                }}
                type="text"
                placeholder="Enter Name"
                aria-expanded="false"
              />
            </div>
          </div>
          <div style={{ marginBottom: "23px", width: "100%" }}>
            <label htmlFor="selectClass" className="form-label" style={{ fontSize: "12px", color: "#434343", fontWeight: "500" }}>
              Select Section
            </label>
            <div className="dropdown" id="selectClass">
              <button
                className="btn btn-secondary dropdown-toggle"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "transparent",
                  border: "1px solid #ECEDF1",
                  borderRadius: "8px",
                }}
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {selectedSection ? selectedSection : "Select Section"}
              </button>
              <ul className="dropdown-menu" style={{ width: "100%", maxHeight: "150px", overflowY: "scroll" }}>
                {sections.map((item) => (
                  <li key={item.id}>
                    <button className="dropdown-item" onClick={() => handleSectionSelect(item.section)}>
                      {item.section}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="modal-footer border-0">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            style={{
              width: "118px",
              height: "36px",
              padding: "8px 10px",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              flexShrink: "0",
              backgroundColor: "rgba(39, 59, 99, 0.76)",
            }}
            onClick={handleSubmit}
          >
            <span style={{ color: "#FFF", fontFamily: "Manrope", fontSize: "12px", fontWeight: "500" }}>
              Add
            </span>
          </button>
        </div>
      </div>
    </Modal>,
    modalsRoot
  );
};

export { AddClasses };
