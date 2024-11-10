import React, { useState } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";
import { useAuth } from "../../../../app/modules/auth/core/Auth";

type Props = {
  show: boolean;
  onHide: () => void;
  setRefresh: (refreshState: boolean) => void;
  userType: string;
};

const CreateSchoolMasterModal = ({
  show,
  setRefresh,
  onHide,
  userType,
}: Props) => {
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [otherDocument, setOtherDocument] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();
  const userId = currentUser?.id;

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    contact_no: "",
    emergency_contact_no: "",
    email: "",
    dob: "",
    permanent_address: "",
    password: "",
    gender: "",
    location: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    other_document_name: "",
    user_id: userId,
    is_active: 1,
    disable_at: "0000-00-00",
    userType: userType,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "password" || name === "confirmpassword") {
      setPasswordError("");
    }
    if (name === "confirmpassword" && value !== formData.password) {
      setPasswordError("Passwords do not match");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (!files) return;

    if (name === "image") setImage(files[0]);
    if (name === "other_document_file") setOtherDocument(files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploadStatus("Processing...");
    setError(null);

    try {
      const response = await fetch(
        `${DOMAIN}/api/superadmin/create-school-masters`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) throw new Error("Failed to store details");

      const { staffId } = await response.json();
      setUploadStatus("Uploading Files...");

      if (image) await uploadFile(image, staffId, "image");
      if (otherDocument) await uploadFile(otherDocument, staffId, "document");

      setUploadStatus("Completed");
      setRefresh(true);
      onHide();
    } catch (error) {
      console.error("Error during submission:", error);
      setError("An error occurred. Please try again.");
      setUploadStatus("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const uploadFile = async (file: File, staffId: string, fileType: string) => {
    try {
      const fileData = new FormData();
      fileData.append("file", file);
      fileData.append("master_id", staffId);
      fileData.append("file_type", fileType);

      const response = await fetch(
        `${DOMAIN}/api/superadmin/uploadMasterFile`,
        {
          method: "POST",
          body: fileData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to upload ${fileType}: ${errorData.error}`);
      }
    } catch (error) {
      console.error(`Error uploading ${fileType}:`, error);
      throw error;
    }
  };

  return (
    <Modal
      id="kt_modal_create_school"
      tabIndex={-1}
      aria-hidden="true"
      dialogClassName="modal-dialog modal-dialog-centered mw-1000px"
      show={show}
      onHide={onHide}
      backdrop={true}
    >
      <div
        className="modal-header"
        style={{
          backgroundColor: "#F2F6FF",
          borderBottom: "1px solid lightgray",
        }}
      >
        <h2>Create a Compay Master</h2>
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={onHide}
        >
          <i className="fas fa-times"></i>
        </div>
      </div>
      <div
        className="modal-body"
        style={{
          backgroundColor: "#F2F6FF",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        
        
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formName">
                <Form.Label>Master Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formSurname">
                <Form.Label>Master Surname:</Form.Label>
                <Form.Control
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  placeholder="Enter surname"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formContactNo">
                <Form.Label>Contact No:</Form.Label>
                <Form.Control
                  type="text"
                  name="contact_no"
                  value={formData.contact_no}
                  onChange={handleChange}
                  placeholder="Enter contact number"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formEmergencyContactNo">
                <Form.Label>Emergency Contact No:</Form.Label>
                <Form.Control
                  type="number"
                  name="emergency_contact_no"
                  value={formData.emergency_contact_no}
                  onChange={handleChange}
                  placeholder="Enter emergency contact number"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formDOB">
                <Form.Label>Date of Birth:</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formFacebook">
                <Form.Label>Facebook:</Form.Label>
                <Form.Control
                  type="url"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleChange}
                  placeholder="Enter Facebook profile link"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formTwitter">
                <Form.Label>Twitter:</Form.Label>
                <Form.Control
                  type="url"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  placeholder="Enter Twitter profile link"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formLinkedIn">
                <Form.Label>LinkedIn:</Form.Label>
                <Form.Control
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="Enter LinkedIn profile link"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formInstagram">
                <Form.Label>Instagram:</Form.Label>
                <Form.Control
                  type="url"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  placeholder="Enter Instagram profile link"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formImage">
                <Form.Label>Image:</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formOtherDocumentFile">
                <Form.Label>Other Document:</Form.Label>
                <Form.Control
                  type="file"
                  name="other_document_file"
                  onChange={handleFileChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
        <br />
        <Button
          variant="primary"
          type="submit"
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {uploadStatus || "Submit"}
        </Button>
        {error && <div className="text-danger mt-2">{error}</div>}
      </div>
    </Modal>
  );
};

export { CreateSchoolMasterModal };
