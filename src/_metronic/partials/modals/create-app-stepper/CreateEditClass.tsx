import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../../../../app/modules/auth";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";
import { Col, Form, InputGroup, Modal, Row } from "react-bootstrap";

type Props = {
  show: boolean;
  handleClose: () => void;
  setRefresh: any;
  classId: string;
  classname: string;
};

interface FormData {
  class_name: string;
}

const modalsRoot = document.getElementById("root-modals") || document.body;

const CreateEditClass = ({
  show,
  handleClose,
  setRefresh,
  classId,
  classname,
}: Props) => {
  const { currentUser } = useAuth();
  const school_id = currentUser?.school_id;

  const initialFormData: FormData = {
    class_name: classname || "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  // Sync the classname prop to the form data when it changes
  useEffect(() => {
    setFormData({ class_name: classname });
  }, [classname]);

  // Handler for class name input
  const handleClassNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      class_name: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.class_name) {
      alert("Please enter a class name.");
      return;
    }

    try {
      const response = await fetch(`${DOMAIN}/api/school/edit-class/${school_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ class_name: formData.class_name, classId }),
      });

      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      console.log("Form submitted successfully!", result);
      setRefresh(true);
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCloseModal = () => {
    setFormData(initialFormData); // Reset the form data when modal closes
    handleClose();
  };

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
        style={{ backgroundColor: "#F2F6FF", borderBottom: "1px solid lightgray" }}
      >
        <h2>Edit Class Name</h2>
        <div className="btn btn-sm btn-icon btn-active-color-primary" onClick={handleCloseModal}>
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
                    name="class_name"
                    placeholder="Enter Class Name"
                    value={formData.class_name}
                    onChange={handleClassNameChange}
                  />
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

export { CreateEditClass };
