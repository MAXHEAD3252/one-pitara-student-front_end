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
  id: string;
  section: string;
}

const modalsRoot = document.getElementById("root-modals") || document.body;

const AddClasses = ({ show, handleClose, setRefresh }: Props) => {
  const [selectedSections, setSelectedSections] = useState<string[]>([]); // Updated to store multiple sections
  const [sections, setSections] = useState<SectionData[]>([]);
  const [className, setClassName] = useState(""); // State for class name
  const { currentUser } = useAuth();
  const school_id = currentUser?.school_id;

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

  const handleSectionSelect = (selectedId: any) => {
    setSelectedSections((prevSections) =>
      prevSections.includes(selectedId)
        ? prevSections.filter((id) => id !== selectedId) // remove if already selected
        : [...prevSections, selectedId] // add if not selected
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!className || selectedSections.length === 0) {
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
          body: JSON.stringify({
            className,
            selectedSections,
          }),
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

  return createPortal(
    <Modal
      id="kt_modal_create_app"
      tabIndex={-1}
      size="lg"
      aria-hidden="true"
      dialogClassName="modal-dialog modal-dialog-centered mw-500px"
      show={show}
      onHide={handleClose}
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
          onClick={handleClose}
        >
          <i className="fas fa-times"></i>
        </div>
      </div>
      <div className="modal-body" style={{ backgroundColor: "#F2F6FF" }}>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="class_name">
                <Form.Label>Class Name</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-user"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Enter Class Name"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Row>
          <Col md={6}>
              <Form.Group className="mb-3 custom-input" controlId="formSource">
                <Form.Label>Select Section</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-globe"></i>
                  </InputGroup.Text>
                  <Form.Select
                    value={selectedSections}
                    onChange={(e) => handleSectionSelect(e.target.value)}
                    name="section"
                  >
                    <option value="">
                      {className ? className : "Select Section"}
                    </option>
                    {sections.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                      selected={selectedSections.includes(item.id)}
                    >
                      {item.section}
                    </option>
                  ))}
                  </Form.Select>
                </InputGroup>
                <Form.Text className="text-muted">Select a source.</Form.Text>
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
