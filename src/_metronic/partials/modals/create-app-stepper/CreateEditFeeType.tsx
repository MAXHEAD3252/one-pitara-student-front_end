import { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { createPortal } from "react-dom";
import { useAuth } from "../../../../app/modules/auth";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";

const modalsRoot = document.getElementById("root-modals") || document.body;

type Props = {
  show: boolean;
  handleClose: () => void;
  fee_type_id: number | null;
  fee_type_code: string;
  fee_type_name: string;
  fee_type_description: string;
  setReferesh: any;
};

const CreateEditFeeType = ({
  show,
  handleClose,
  fee_type_id,
  fee_type_name,
  fee_type_code,
  fee_type_description,
  setReferesh,
}: Props) => {
  const [formData, setFormData] = useState({
    name: fee_type_name || "",
    feeCode: fee_type_code || "",
    description: "",
  });

  const { currentUser } = useAuth();
  const schoolId = currentUser?.school_id;

  // Store original values for comparison
  const [initialFormData, setInitialFormData] = useState({
    name: fee_type_name || "",
    feeCode: fee_type_code || "",
    description: fee_type_description || "",
  });

  // Initialize form values when modal opens
  useEffect(() => {
    if (show) {
      setFormData({
        name: fee_type_name || "",
        feeCode: fee_type_code || "",
        description: fee_type_description || "",
      });
      setInitialFormData({
        name: fee_type_name || "",
        feeCode: fee_type_code || "",
        description:fee_type_description || "",
      });
    }
  }, [show, fee_type_name, fee_type_code]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Compare the current form data with the initial data and only include changed fields
    const updatedFields = Object.keys(formData).reduce((acc, key) => {
      if (formData[key] !== initialFormData[key]) {
        acc[key] = formData[key];
      }
      return acc;
    }, {});

    // If no fields were changed, don't submit
    if (Object.keys(updatedFields).length === 0) {
      console.log("No changes detected.");
      return;
    }

    try {
      const response = await fetch(
        `${DOMAIN}/api/school/edit-feetype/${fee_type_id}/${schoolId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFields), // Send only changed values
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setReferesh(true); // Update the parent component
      handleClose(); // Close the modal after successful update
      console.log("Response:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return createPortal(
    <Modal
      id="kt_modal_create_app"
      tabIndex={-1}
      aria-hidden="true"
      dialogClassName="modal-dialog modal-dialog-centered mw-800px"
      show={show}
      onHide={handleClose}
      backdrop={true}
    >
      <div
        className="modal-header"
        style={{
          backgroundColor: "#F2F6FF",
          borderBottom: "1px solid lightgray",
        }}
      >
        <h2>Edit Fee Type</h2>
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={handleClose}
        >
          <i className="fas fa-times"></i>
        </div>
      </div>

      <div className="modal-body" style={{ backgroundColor: "#F2F6FF" }}>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3 custom-input" controlId="formName">
                <Form.Label>Name</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-user"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={formData.name || ""}
                    onChange={handleInputChange}
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3 custom-input" controlId="formFeesCode">
                <Form.Label>Fees Code</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-code"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="feeCode"
                    placeholder="Enter Fee Code"
                    value={formData.feeCode || ""}
                    onChange={handleInputChange}
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group
                className="mb-3 custom-input"
                controlId="formDescription"
              >
                <Form.Label>Description</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-info-circle"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="description"
                    placeholder="Enter Description"
                    value={formData.description || ""}
                    onChange={handleInputChange}
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <div style={{ justifyContent: "right", display: "flex" }}>
            <Button
              type="submit"
              variant="secondary"
              style={{
                width: "118px",
                height: "36px",
                padding: "8px 10px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                backgroundColor: "rgba(39, 59, 99, 0.76)",
              }}
            >
              <span
                style={{
                  color: "#FFF",
                  fontFamily: "Manrope",
                  fontSize: "12px",
                  fontWeight: "500",
                }}
              >
                Edit
              </span>
            </Button>
          </div>
        </Form>
      </div>
    </Modal>,
    modalsRoot
  );
};

export { CreateEditFeeType };
