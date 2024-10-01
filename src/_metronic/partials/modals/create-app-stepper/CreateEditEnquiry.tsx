import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { useAuth } from "../../../../app/modules/auth/core/Auth";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";
// import "./Style.css";

type Props = {
  show: boolean;
  handleClose: () => void;
  enqId: string | undefined;
  setRefresh: (refresh: boolean) => void;
  // refresh: (refresh: boolean) => void;
};
type Reference = {
  id: string;
  reference: string;
};

const modalsRoot = document.getElementById("root-modals") || document.body;
interface Source {
  id: string; // Adjust the type as per your data structure
  source: string;
  // Add other properties if needed
}
interface Class {
  class: string;
  id: string; // Adjust the type as per your data structure
  // Add other properties if needed
}
interface Session {
  session: string;
  id: string; // Adjust the type as per your data structure
  // Add other properties if needed
}

interface FormData {
  student_name: string;
  student_phone: string;
  student_address: string;
  reference_id: number;
  reference: string;
  description: string;
  follow_up_date: Date;
  note: string;
  source_id: number;
  source: string;
  student_email: string;
  status: string;
  enquiry_type: string;
  class_id: number;
  class: string;
  gender: string;
  date_of_birth: Date;
  current_school: string;
  academic_year: string;
  father_name: string;
  father_phone: string;
  mother_name: string;
  mother_phone: string;
}

const CreateEditEnquiry = ({ show, handleClose, enqId, setRefresh }: Props) => {
  const { currentUser } = useAuth();

  const schoolId = currentUser?.school_id;

  // const [data, setData] = useState({});
  const [source, setSource] = useState<Source[]>([]);
  const [reference, setReference] = useState<Reference[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [changedFields, setChangedFields] = useState({});

  const [formData, setFormData] = useState<FormData>({
    enquiry_type: "",
    student_name: "",
    student_phone: "",
    student_address: "",
    reference_id: 0,
    description: "",
    follow_up_date: new Date(),
    note: "",
    source_id: 0,
    source: "",
    student_email: "",
    class_id: 0,
    class: "",
    status: "Active",
    /* @ts-ignore */
    date_of_birth: "",
    gender: "",
    current_school: "",
    father_name: "",
    father_phone: "",
    mother_name: "",
    mother_phone: "",
    academic_year: "",
    reference: "",
  });

  useEffect(() => {
    const fetchClasses = async () => {
      const schoolId = currentUser?.school_id;
      if (!schoolId) return;

      try {
        const response = await fetch(
          `${DOMAIN}/api/school/get-classes?schoolId=${schoolId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setClasses(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchClasses();

    const fetchSource = async () => {
      const schoolId = currentUser?.school_id;
      if (!schoolId) return;

      try {
        const response = await fetch(
          `${DOMAIN}/api/school/get-source?schoolId=${schoolId}`
        );
        if (!response.ok) {
          throw new Error(`Error in Fetching source ${response.status}`);
        }
        const data = await response.json();
        setSource(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchSource();

    const fetchReference = async () => {
      const schoolId = currentUser?.school_id;
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
        console.error("Error fetching classes:", error);
      }
    };

    fetchReference();

    const fetchSessions = async () => {
      const schoolId = currentUser?.school_id;
      if (!schoolId) return;

      try {
        const response = await fetch(
          `${DOMAIN}/api/school/get-session?schoolId=${schoolId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSessions(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchSessions();
  }, [currentUser]);

  const formatDateToYYYYMMDD = (dateString: string | number | Date) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    /* @ts-ignore */
    if (isNaN(date)) return ""; // Return empty string if date is invalid

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  };

  // Ensure data is an array and check for valid first element

  useEffect(() => {
    const fetchById = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/api/school/getEnquiryById/${schoolId}/${enqId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Data not received ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        // Format dates if they exist
        const followUpDate = data?.[0]?.follow_up_date
          ? formatDateToYYYYMMDD(data[0].follow_up_date)
          : "";
        const dateOfBirth = data?.[0]?.date_of_birth
          ? formatDateToYYYYMMDD(data[0].date_of_birth)
          : "";
        /* @ts-ignore */
        setFormData({
          enquiry_id: data[0]?.enquiry_id || "",
          student_name: data[0]?.student_name || "",
          student_phone: data[0]?.student_phone || "",
          mother_name: data[0]?.mother_name || "",
          mother_phone: data[0]?.mother_phone || "",
          description: data[0]?.description || "",
          note: data[0]?.note || "",
          student_address: data[0]?.student_address || "",
          date: data[0]?.date || "",
          reference: data[0]?.reference || "",
          status: data[0]?.status || "",
          date_of_birth: dateOfBirth,
          father_phone: data[0]?.father_phone || "",
          current_school: data[0]?.current_school || "",
          gender: data[0]?.gender || "",
          academic_year: data[0]?.academic_year || "",
          father_name: data[0]?.father_name || "",
          student_email: data[0]?.student_email || "",
          class_id: data[0]?.class_id || "",
          source: data[0]?.source || "",
          follow_up_date: followUpDate,
          enquiry_type: data[0]?.enquiry_type,
        });
      } catch (error) {
        console.error("Error fetching enquiry details:", error);
      }
    };

    fetchById();
  }, [schoolId, enqId]);

  /* @ts-ignore */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Update changedFields state
    setChangedFields((prevChangedFields) => ({
      ...prevChangedFields,
      [name]: value,
    }));
  };
  /* @ts-ignore */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const enquiry_id = enqId;

    try {
      const response = await fetch(
        `${DOMAIN}/api/school/updateEnquiryById/${schoolId}/${enquiry_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(changedFields), // Send only updated fields
        }
      );

      if (!response.ok) {
        throw new Error("Failed to edit info");
      }

      const data = await response.json();
      setRefresh(true);
      handleClose();
    } catch (error) {
      console.error("Error editing info:", error);
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
        className="modal-header"
        style={{
          backgroundColor: "#F2F6FF",
          borderBottom: "1px solid lightgray",
        }}
      >
        <h2>Edit Enquiry</h2>
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={handleClose}
        >
          <i className="fas fa-times"></i>
        </div>
      </div>
        <div className="modal-body"    style={{ backgroundColor: "#F2F6FF" }}>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="student_name">
                  <Form.Label>Student Name</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="fas fa-user"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="student_name"
                      value={formData.student_name}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="student_phone">
                  <Form.Label>Contact Number</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="fas fa-phone"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="tel"
                      name="student_phone"
                      value={formData.student_phone}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="student_address">
                  <Form.Label>Address</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="fas fa-map-marker-alt"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="student_address"
                      value={formData.student_address}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="student_email">
                  <Form.Label>Email</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="fas fa-envelope"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      name="student_email"
                      value={formData.student_email}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="reference">
                  <Form.Label>Select Reference</Form.Label>
                  <Form.Select
                    name="reference"
                    value={formData.reference}
                    onChange={handleChange}
                  >
                    <option value="">Select Reference</option>
                    {reference.map((ref) => (
                      <option key={ref.id} value={ref.reference}>
                        {ref.reference}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="source">
                  <Form.Label>Select Source</Form.Label>
                  <Form.Select
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                  >
                    <option value="">Select Source</option>
                    {source.map((src) => (
                      <option key={src.id} value={src.source}>
                        {src.source}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="status">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="active">Active</option>
                    <option value="dead">Dead</option>
                    <option value="lost">Lost</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="follow_up_date">
                  <Form.Label>Follow Up Date</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="fas fa-calendar-alt"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="date"
                      name="follow_up_date"
                      value={formData.follow_up_date}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="enquiry_type">
                  <Form.Label>Enquiry Type</Form.Label>
                  <Form.Select
                    name="enquiry_type"
                    value={formData.enquiry_type}
                    onChange={handleChange}
                  >
                    <option value="general">General</option>
                    <option value="admission">Admission</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="fas fa-info-circle"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="note">
                  <Form.Label>Note</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="fas fa-sticky-note"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="note"
                      value={formData.note}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            {formData.enquiry_type === "admission" && (
              <>
                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Group controlId="class_id">
                      <Form.Label>Select Class</Form.Label>
                      <Form.Select
                        name="class_id"
                        value={formData.class_id}
                        onChange={handleChange}
                      >
                        <option value="">Select Class</option>
                        {classes.map((cls) => (
                          <option key={cls.id} value={cls.id}>
                            {cls.class}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="date_of_birth">
                      <Form.Label>Date of Birth</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <i className="fas fa-birthday-cake"></i>
                        </InputGroup.Text>
                        <Form.Control
                          type="date"
                          name="date_of_birth"
                          value={formData.date_of_birth}
                          onChange={handleChange}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="gender">
                      <Form.Label>Select Gender</Form.Label>
                      <Form.Select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Group controlId="academic_year">
                      <Form.Label>Academic Year</Form.Label>
                      <Form.Select
                        name="academic_year"
                        value={formData.academic_year}
                        onChange={handleChange}
                      >
                        <option value="">Select Academic Year</option>
                        {sessions.map((sess) => (
                          <option key={sess.id} value={sess.session}>
                            {sess.session}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="father_name">
                      <Form.Label>Father's Name</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <i className="fas fa-user-tie"></i>
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          name="father_name"
                          value={formData.father_name}
                          onChange={handleChange}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="father_phone">
                      <Form.Label>Father's Contact Number</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <i className="fas fa-phone"></i>
                        </InputGroup.Text>
                        <Form.Control
                          type="tel"
                          name="father_phone"
                          value={formData.father_phone}
                          onChange={handleChange}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Group controlId="mother_name">
                      <Form.Label>Mother's Name</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <i className="fas fa-user-tie"></i>
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          name="mother_name"
                          value={formData.mother_name}
                          onChange={handleChange}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="mother_phone">
                      <Form.Label>Mother's Contact Number</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <i className="fas fa-phone"></i>
                        </InputGroup.Text>
                        <Form.Control
                          type="tel"
                          name="mother_phone"
                          value={formData.mother_phone}
                          onChange={handleChange}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="current_school">
                      <Form.Label>Current School</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <i className="fas fa-school"></i>
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          name="current_school"
                          value={formData.current_school}
                          onChange={handleChange}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>
              </>
            )}

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

export { CreateEditEnquiry };
