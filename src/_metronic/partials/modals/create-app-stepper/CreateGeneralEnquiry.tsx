import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { useAuth } from "../../../../app/modules/auth/core/Auth";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  show: boolean;
  handleClose: () => void;
  setRefresh: (refresh: boolean) => void;
};

interface Reference {
  id: string;
  reference: string;
}

interface Source {
  id: string;
  source: string;
}

interface FormData {
  enquiry_id: string;
  enquiry_type: string;
  full_name: string;
  contact_number: string;
  email: string;
  address: string;
  reference_id: number;
  follow_up_date: Date | string;
  note: string;
  source_id: number;
  status: string;
  description: string;
  session_id:number;
}

const modalsRoot = document.getElementById("root-modals") || document.body;

const CreateGeneralEnquiry = ({ show, handleClose, setRefresh }: Props) => {
  const { currentUser } = useAuth();
  const schoolId = currentUser?.school_id;
  const userId = currentUser?.id;
  const sessionId = currentUser?.session_id;
  
  const [source, setSource] = useState<Source[]>([]);
  const [reference, setReference] = useState<Reference[]>([]);
  const initialFormData: FormData = {
    enquiry_id: "",
    enquiry_type: "General",
    full_name: "",
    contact_number: "",
    email: "",
    address: "",
    reference_id: 0,
    follow_up_date: new Date(),
    note: "",
    source_id: 0,
    status: "New",
    description: "",
    session_id: sessionId
  };
  const [formData, setFormData] = useState<FormData>(initialFormData);

  /* @ts-ignore */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "reference" || name === "source") {
      const [id, text] = value.split(":");
      setFormData((prevState) => ({
        ...prevState,
        [`${name}_id`]: id,
        [name]: text,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    const fetchReference = async () => {
      if (!schoolId) return;

      try {
        const response = await fetch(
          `${DOMAIN}/api/school/get-reference?schoolId=${schoolId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setReference(data);
      } catch (error) {
        console.error("Error fetching references:", error);
      }
    };

    const fetchSource = async () => {
      if (!schoolId) return;

      try {
        const response = await fetch(
          `${DOMAIN}/api/school/get-source?schoolId=${schoolId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSource(data);
      } catch (error) {
        console.error("Error fetching sources:", error);
      }
    };

    fetchReference();
    fetchSource();
  }, [schoolId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(
        `${DOMAIN}/api/school/generalEnquiry/${schoolId}/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      console.log(response);
      

      if (!response.ok) {
        throw new Error("Failed to create general enquiry");
      }

      const data = await response.json();
      toast.success("Enquiry created successfully!");
      handleCloseModal();
      setRefresh(true);
    } catch (error) {
      console.error("Error creating Enquiry:", error);
      toast.error("Error creating Enquiry. Please try again.");
    }
  };

  const handleCloseModal = () =>{
    setFormData(initialFormData);
    handleClose();
  }

  return createPortal(
    <Modal
      id="kt_modal_create_enquiry"
      tabIndex={-1}
      aria-hidden="true"
      dialogClassName="modal-dialog modal-dialog-centered mw-1000px"
      show={show}
      onHide={handleCloseModal}
      backdrop={true}
    >
      <div
        className="modal-header"
        style={{ backgroundColor: "#F2F6FF", borderBottom: "1px solid lightgray" }}
      >
        <h2 style={{ color: "#1C335C", fontFamily: "Manrope" }}>Walk-In General Enquiry</h2>
        <div className="btn btn-sm btn-icon btn-active-color-primary" onClick={handleCloseModal}>
          <i className="fas fa-times" style={{ color: "#1C335C" }}></i>
        </div>
      </div>

      <div className="modal-body py-lg-10 px-lg-10">
        <Form onSubmit={handleSubmit}>
          <Row style={{ fontFamily: "Manrope" }}>
            {/* Full Name */}
            <Col md={4}>
              <Form.Group className="mb-3 custom-input" controlId="formFullName">
                <Form.Label style={{ color: "#1C335C" }}>Full Name *</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-user" style={{ color: "#1C335C" }}></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Enter Full Name"
                    value={formData.full_name}
                    onChange={handleChange}
                    name="full_name"
                    required
                    style={{ color: "#1C335C" }}
                  />
                </InputGroup>
                <Form.Text className="text-muted" style={{ color: "#1C335C" }}>
                  Please enter the full name of the enquirer.
                </Form.Text>
              </Form.Group>
            </Col>

            {/* Contact Number */}
            <Col md={4}>
              <Form.Group className="mb-3 custom-input" controlId="formContactNumber">
                <Form.Label style={{ color: "#1C335C" }}>Contact Number *</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-phone" style={{ color: "#1C335C" }}></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="tel"
                    placeholder="Enter phone number"
                    value={formData.contact_number}
                    onChange={handleChange}
                    name="contact_number"
                    required
                    style={{ color: "#1C335C" }}
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            {/* Address */}
            <Col md={4}>
              <Form.Group className="mb-3 custom-input" controlId="formAddress">
                <Form.Label style={{ color: "#1C335C" }}>Address *</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-map-marker-alt" style={{ color: "#1C335C" }}></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Enter address"
                    value={formData.address}
                    onChange={handleChange}
                    name="address"
                    required
                    style={{ color: "#1C335C" }}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            {/* Email */}
            <Col md={4}>
              <Form.Group className="mb-3 custom-input" controlId="formEmail">
                <Form.Label style={{ color: "#1C335C" }}>Email *</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-envelope" style={{ color: "#1C335C" }}></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                    required
                    style={{ color: "#1C335C" }}
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            {/* Reference */}
            <Col md={4}>
              <Form.Group className="mb-3 custom-input" controlId="formReference">
                <Form.Label style={{ color: "#1C335C" }}>Select Reference</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-link" style={{ color: "#1C335C" }}></i>
                  </InputGroup.Text>
                  <Form.Select value={formData.reference_id} onChange={handleChange} name="reference">
                    <option value="">Select Reference</option>
                    {reference.map((ref) => (
                      <option key={ref.id} value={ref.id}>
                        {ref.reference}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </Form.Group>
            </Col>

            {/* Source */}
            <Col md={4}>
              <Form.Group className="mb-3 custom-input" controlId="formSource">
                <Form.Label style={{ color: "#1C335C" }}>Select Source</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-globe" style={{ color: "#1C335C" }}></i>
                  </InputGroup.Text>
                  <Form.Select value={formData.source_id} onChange={handleChange} name="source">
                    <option value="">Select Source</option>
                    {source.map((src) => (
                      <option key={src.id} value={src.id}>
                        {src.source}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            {/* Status */}
            <Col md={4}>
              <Form.Group className="mb-3 custom-input" controlId="formStatus">
                <Form.Label style={{ color: "#1C335C" }}>Status</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-flag" style={{ color: "#1C335C" }}></i>
                  </InputGroup.Text>
                  <Form.Select value={formData.status} onChange={handleChange} name="status">
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                    <option value="Deferred">Deferred</option>
                  </Form.Select>
                </InputGroup>
              </Form.Group>
            </Col>

            {/* Follow-up Date */}
            <Col md={4}>
              <Form.Group className="mb-3 custom-input" controlId="formFollowUpDate">
                <Form.Label style={{ color: "#1C335C" }}>Follow-up Date</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-calendar" style={{ color: "#1C335C" }}></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="date"
                    value={formData.follow_up_date}
                    onChange={handleChange}
                    name="follow_up_date"
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            {/* Note */}
            <Col md={12}>
              <Form.Group className="mb-3 custom-input" controlId="formNote">
                <Form.Label style={{ color: "#1C335C" }}>Note</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter note"
                  value={formData.note}
                  onChange={handleChange}
                  name="note"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            {/* Description */}
            <Col md={12}>
              <Form.Group className="mb-3 custom-input" controlId="formDescription">
                <Form.Label style={{ color: "#1C335C" }}>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={handleChange}
                  name="description"
                />
              </Form.Group>
            </Col>
          </Row>

          <div style={{ display: "flex", justifyContent: "end" }}>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </Form>
      </div>
    </Modal>,
    modalsRoot
  );
};

export { CreateGeneralEnquiry };
