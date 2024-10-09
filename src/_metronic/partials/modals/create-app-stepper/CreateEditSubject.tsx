import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../../../../app/modules/auth";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";
import { Col, Form, InputGroup, Modal, Row } from "react-bootstrap";

type Props = {
  show: boolean;
  handleClose: () => void;
  setRefresh: any;
  subjectId: number;
  subjectname: string;
  subjecttype:string;
  subjectcode: string;
};


const modalsRoot = document.getElementById("root-modals") || document.body;

const CreateEditSubject = ({
  show,
  handleClose,
  setRefresh,
  subjectId,
  subjectname,
  subjectcode,
  subjecttype,
}: Props) => {
    const [subjectName, setSubjectName] = useState(subjectname);
    const [subjectCode, setSubjectCode] = useState(subjectcode);
    const [subjectType, setSubjectType] = useState(subjecttype);
  const { currentUser } = useAuth();
  const school_id = currentUser?.school_id;

console.log(subjectId,
    subjectname,
    subjectcode,
    subjecttype,)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectName || !subjectCode || !subjectType) {
      alert("Please enter subject name, subject code and select subject type.");
      return;
    }

    try {
      const response = await fetch(
        `${DOMAIN}/api/school/edit-subject/${school_id}/${subjectId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body:  JSON.stringify({
            subjectName,
            subjectCode,
            subjectType,
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

  const handleSubjectTypeSelect = (value: string) => {
    setSubjectType(value); // Update the selected subject type
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
        <h2>Edit Section</h2>
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
              <Form.Group controlId="subject_name">
                <Form.Label>Subject Name</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-user"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="subject_name"
                    placeholder="Enter Subject Name"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="subject_code">
                <Form.Label>Section Code</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-user"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="subject_code"
                    placeholder="Enter Subject Code"
                    value={subjectCode}
                    onChange={(e) => setSubjectCode(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group
                className="mb-3 custom-input"
                controlId="formSubjectType"
              >
                <Form.Label>Select Subject Type</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-book"></i>
                  </InputGroup.Text>
                  <Form.Select
                    value={subjectType} // Updated to reflect subject type selection
                    onChange={(e) => handleSubjectTypeSelect(e.target.value)} // Updated to handle subject type selection
                    name="subjectType"
                  >
                    <option value="">
                      {"Select Subject Type"}
                    </option>
                    <option
                      value="theory"
                      selected={subjectType === "theory"}
                    >
                      Theory
                    </option>
                    <option
                      value="practical"
                      selected={subjectType === "practical"}
                    >
                      Practical
                    </option>
                  </Form.Select>
                </InputGroup>
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

export { CreateEditSubject };
