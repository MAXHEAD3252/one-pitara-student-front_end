import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../../../../app/modules/auth";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";
import { Col, Form, InputGroup, Modal, Row } from "react-bootstrap";

type Props = {
  show: boolean;
  handleClose: () => void;
  setRefresh: any;
};

interface SectionData {
  section_id: string;
  section: string;
}

interface FormData {
  class_name: string;
  section_ids: string[]; // Store selected section IDs directly in formData
}

const modalsRoot = document.getElementById("root-modals") || document.body;

const AddClasses = ({ show, handleClose, setRefresh }: Props) => {
  const { currentUser } = useAuth();
  const school_id = currentUser?.school_id;

  const initialFormData: FormData = {
    class_name: "",
    section_ids: [], // Initialize as an empty array
  };
  const [formData, setFormData] = useState<FormData>(initialFormData);
  console.log(formData);
  
  const [sections, setSections] = useState<SectionData[]>([]);

  // Fetch sections from API
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/api/school/get-onlysections/${school_id}`
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

  // Handle form input and checkbox changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const sectionId = value; // Use the value of the checkbox (section ID)
      setFormData((prevState) => {
        // Toggle section ID selection
        if (prevState.section_ids.includes(sectionId)) {
          // If the section is already selected, remove it
          return {
            ...prevState,
            section_ids: prevState.section_ids.filter((id) => id !== sectionId),
          };
        } else {
          // If it's not selected, add it
          return {
            ...prevState,
            section_ids: [...prevState.section_ids, sectionId],
          };
        }
      });
    } else {
      // For regular text input (e.g., class name)
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Handling form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.class_name || formData.section_ids.length === 0) {
      alert("Please enter class name and select at least one section.");
      return;
    }
    try {
      const response = await fetch(
        `${DOMAIN}/api/school/add-class/${school_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Form submitted successfully!", result);
      handleClose(); // Close the modal after submission
      setRefresh(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };


  const handleCloseModal = () =>{
    setFormData(initialFormData);
    handleClose();
  }




  return createPortal(
    <Modal
      id="kt_modal_create_app"
      tabIndex={-1}
      size="lg"
      aria-hidden="true"
      dialogClassName="modal-dialog modal-dialog-centered mw-500px"
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
        <h2>Add Classes</h2>
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={handleCloseModal}
        >
          <i className="fas fa-times"></i>
        </div>
      </div>
      <div className="modal-body" style={{ backgroundColor: "#F2F6FF" }}>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId="class_name">
                <Form.Label>Class Name</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-user"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Enter Class Name"
                    name="class_name"
                    value={formData.class_name}
                    onChange={handleChange}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Form.Group className="mb-3" controlId="formSource">
                <Form.Label>Select Sections</Form.Label>
                <Row>
                  {sections.length > 0 ? (
                    sections.map((section, index) => (
                      <Col md={4} key={section.section_id}> {/* 4 columns per row */}
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={section.section_id}
                            id={`section-${section.section_id}`}
                            checked={formData.section_ids.includes(String(section.section_id))}
                            onChange={handleChange} // Single handler for both checkbox and input
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`section-${section.section_id}`}
                          >
                            {section.section}
                          </label>
                        </div>
                      </Col>
                    ))
                  ) : (
                    <p>No sections available.</p>
                  )}
                </Row>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </Form>
      </div>
    </Modal>,
    modalsRoot
  );
};

export { AddClasses };
