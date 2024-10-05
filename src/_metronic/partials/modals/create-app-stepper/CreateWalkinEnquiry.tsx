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

interface ClassDetails {
  id: string;
  class: string;
}

interface Sessions {
  id: string;
  session_id: string;
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
  session_id: number;
  father_name: string;
  father_phone: string;
  mother_name: string;
  mother_phone: string;
}

const modalsRoot = document.getElementById("root-modals") || document.body;

const CreateWalkinEnquiry = ({ show, handleClose, setRefresh }: Props) => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  

  const schoolId = currentUser?.school_id;
  /* @ts-ignore */
  const userId = currentUser?.id;

  const [classes, setClasses] = useState<ClassDetails[]>([]);
  const [sessions, setSessions] = useState<Sessions[]>([]);
  const [source, setSource] = useState<Source[]>([]);
  const [reference, setReference] = useState<Reference[]>([]);
  const [formData, setFormData] = useState<FormData>({
    enquiry_type: "General",
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
    session_id:0,
    reference: "",
  });
  /* @ts-ignore */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "reference" ||
      name === "source" ||
      name === "session_id" ||
      name === "class"
    ) {
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
    if (formData.enquiry_type === "general") {
      /* @ts-ignore */
      setFormData((prevState) => ({
        ...prevState,
        date_of_birth: null,
        gender: "",
        current_school: "",
        father_name: "",
        father_phone: "",
        mother_name: "",
        mother_phone: "",
        session_id: 0,
      }));
    }
  }, [formData.enquiry_type]);

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

    const fetchSource = async () => {
      const schoolId = currentUser?.school_id;
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
        console.error("Error fetching classes:", error);
      }
    };

    fetchSource();
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

  /* @ts-ignore */
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(
          `${DOMAIN}/api/school/walkinEnquiry/${schoolId}/${userId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to create student");
        }

        const data = await response.json();
        console.log("Student created successfully:", data);
        toast.success("Enquiry created successfully!");
        handleClose();
        setRefresh(true);
      } catch (error) {
        console.error("Error creating Enquiry:", error);
        toast.error("Error creating Enquiry. Please try again.");
      }
    };

  return createPortal(
    <Modal
      id="kt_modal_create_school"
      tabIndex={-1}
      aria-hidden="true"
      dialogClassName="modal-dialog modal-dialog-centered mw-1000px"
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
        <h2>WalkIn Enquiry</h2> 
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={handleClose}
        >
          <i className="fas fa-times"></i>
        </div>
      </div>

      <div
        className="modal-body py-lg-10 px-lg-10"
        style={{ backgroundColor: "#F2F6FF" }}
      >
        <Form onSubmit={handleSubmit}>
          <Row>
            {/* Student Name */}
            <Col md={4}>
              <Form.Group
                className="mb-3 custom-input"
                controlId="formStudentName"
              >
                <Form.Label>Student Name *</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-user"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Enter student name"
                    value={formData.student_name}
                    onChange={handleChange}
                    name="student_name"
                    required
                  />
                </InputGroup>
                <Form.Text className="text-muted">
                  This is an input helper text.
                </Form.Text>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group
                className="mb-3 custom-input"
                controlId="formStudentPhone"
              >
                <Form.Label>Phone Number *</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-phone"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="tel"
                    placeholder="Enter phone number"
                    value={formData.student_phone}
                    onChange={handleChange}
                    name="student_phone"
                    required
                  />
                </InputGroup>
                <Form.Text className="text-muted">
                  This is an input helper text.
                </Form.Text>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group
                className="mb-3 custom-input"
                controlId="formStudentAddress"
              >
                <Form.Label>Address *</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-map-marker-alt"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Enter address"
                    value={formData.student_address}
                    onChange={handleChange}
                    name="student_address"
                    required
                  />
                </InputGroup>
                <Form.Text className="text-muted">
                  This is an input helper text.
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            {/* Email */}
            <Col md={4}>
              <Form.Group
                className="mb-3 custom-input"
                controlId="formStudentEmail"
              >
                <Form.Label>Email *</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-envelope"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={formData.student_email}
                    onChange={handleChange}
                    name="student_email"
                    required
                  />
                </InputGroup>
                <Form.Text className="text-muted">
                  This is an input helper text.
                </Form.Text>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group
                className="mb-3 custom-input"
                controlId="formReference"
              >
                <Form.Label>Select Reference</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-link"></i>
                  </InputGroup.Text>
                  <Form.Select
                    value={formData.reference}
                    onChange={handleChange}
                    name="reference"
                  >
                    <option value="">
                      {formData.reference
                        ? formData.reference
                        : "Select Reference"}
                    </option>
                    {reference.map((ref) => (
                      <option key={ref.id} value={`${ref.id}:${ref.reference}`}>
                        {ref.reference}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
                <Form.Text className="text-muted">
                  Select a reference.
                </Form.Text>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3 custom-input" controlId="formSource">
                <Form.Label>Select Source</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-globe"></i>
                  </InputGroup.Text>
                  <Form.Select
                    value={formData.source}
                    onChange={handleChange}
                    name="source"
                  >
                    <option value="">
                      {formData.source ? formData.source : "Select Source"}
                    </option>
                    {source.map((src) => (
                      <option key={src.id} value={`${src.id}:${src.source}`}>
                        {src.source}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
                <Form.Text className="text-muted">Select a source.</Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            {/* Status */}
            <Col md={4}>
              <Form.Group className="mb-3 custom-input" controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-flag"></i>
                  </InputGroup.Text>
                  <Form.Select
                    value={formData.status}
                    onChange={handleChange}
                    name="status"
                  >
                    <option value="active">Active</option>
                    <option value="dead">Dead</option>
                    <option value="lost">Lost</option>
                    <option value="won">Won</option>
                  </Form.Select>
                </InputGroup>
                <Form.Text className="text-muted">
                  Select the current status.
                </Form.Text>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group
                className="mb-3 custom-input"
                controlId="formFollowUpDate"
              >
                <Form.Label>Follow-up Date</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-calendar"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="date"
                    value={formData.follow_up_date}
                    onChange={handleChange}
                    name="follow_up_date"
                  />
                </InputGroup>
                <Form.Text className="text-muted">
                  Select a follow-up date.
                </Form.Text>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group
                className="mb-3 custom-input"
                controlId="formEnquiryType"
              >
                <Form.Label>Enquiry Type</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-info-circle"></i>
                  </InputGroup.Text>
                  <Form.Select
                    value={formData.enquiry_type}
                    onChange={handleChange}
                    name="enquiry_type"
                  >
                    <option value="general">General</option>
                    <option value="admission">Admission</option>
                  </Form.Select>
                </InputGroup>
                <Form.Text className="text-muted">
                  Select the type of enquiry.
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            {/* Description */}
            <Col md={6}>
              <Form.Group
                className="mb-3 custom-input"
                controlId="formDescription"
              >
                <Form.Label>Description</Form.Label>
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

            {/* Note */}
            <Col md={6}>
              <Form.Group className="mb-3 custom-input" controlId="formNote">
                <Form.Label>Note</Form.Label>
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
          {formData.enquiry_type === "admission" && (
            <>
              <Row className="mb-3">
                {/* Class */}
                <Col md={4}>
                  <Form.Group
                    className="mb-3 custom-input"
                    controlId="formClass"
                  >
                    <Form.Label>Select Class</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="fas fa-chalkboard"></i>
                      </InputGroup.Text>
                      <Form.Select
                        value={formData.class}
                        onChange={handleChange}
                        name="class"
                      >
                        <option value="class">
                          {formData.class ? formData.class : "Select Class"}
                        </option>
                        {classes.map((value) => (
                          <option
                            key={value.id}
                            value={`${value.id}:${value.class}`}
                          >
                            {value.class}
                          </option>
                        ))}
                      </Form.Select>
                    </InputGroup>
                    <Form.Text className="text-muted">
                      Select the class for admission.
                    </Form.Text>
                  </Form.Group>
                </Col>

                {/* Date of Birth */}
                <Col md={4}>
                  <Form.Group
                    className="mb-3 custom-input"
                    controlId="formDateOfBirth"
                  >
                    <Form.Label>Date of Birth</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="fas fa-calendar-alt"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="date"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                        name="date_of_birth"
                      />
                    </InputGroup>
                    <Form.Text className="text-muted">
                      Enter the student's date of birth.
                    </Form.Text>
                  </Form.Group>
                </Col>

                {/* Gender */}
                <Col md={4}>
                  <Form.Group
                    className="mb-3 custom-input"
                    controlId="formGender"
                  >
                    <Form.Label>Select Gender</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="fas fa-venus-mars"></i>
                      </InputGroup.Text>
                      <Form.Select
                        value={formData.gender}
                        onChange={handleChange}
                        name="gender"
                      >
                        <option defaultChecked disabled>
                          Gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Form.Select>
                    </InputGroup>
                    <Form.Text className="text-muted">
                      Select the student's gender.
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                {/* Academic Year */}
                <Col md={4}>
                  <Form.Group
                    className="mb-3 custom-input"
                    controlId="formAcademicYear"
                  >
                    <Form.Label>Academic Year</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="fas fa-calendar"></i>
                      </InputGroup.Text>
                      <Form.Select
                        value={formData.session_id}
                        onChange={handleChange}
                        name="session_id"
                      >
                        <option value="session_id">
                          {formData.session_id
                            ? formData.session_id
                            : "Select Session"}
                        </option>
                        {sessions.map((value) => (
                          <option
                            key={value.id}
                            value={`${value.id}:${value.session_id}`}
                          >
                            {value.session_id}
                          </option>
                        ))}
                      </Form.Select>
                    </InputGroup>
                    <Form.Text className="text-muted">
                      Select the academic year.
                    </Form.Text>
                  </Form.Group>
                </Col>

                {/* Father Name */}
                <Col md={4}>
                  <Form.Group
                    className="mb-3 custom-input"
                    controlId="formFatherName"
                  >
                    <Form.Label>Father Name</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="fas fa-user-tie"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Enter father's name"
                        value={formData.father_name}
                        onChange={handleChange}
                        name="father_name"
                      />
                    </InputGroup>
                    <Form.Text className="text-muted">
                      Enter the father's name.
                    </Form.Text>
                  </Form.Group>
                </Col>

                {/* Father Contact Number */}
                <Col md={4}>
                  <Form.Group
                    className="mb-3 custom-input"
                    controlId="formFatherPhone"
                  >
                    <Form.Label>Father Contact Number</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="fas fa-phone"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="tel"
                        placeholder="Enter father's contact number"
                        value={formData.father_phone}
                        onChange={handleChange}
                        name="father_phone"
                      />
                    </InputGroup>
                    <Form.Text className="text-muted">
                      Enter the father's contact number.
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                {/* Mother Name */}
                <Col md={4}>
                  <Form.Group
                    className="mb-3 custom-input"
                    controlId="formMotherName"
                  >
                    <Form.Label>Mother Name</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="fas fa-user-tie"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Enter mother's name"
                        value={formData.mother_name}
                        onChange={handleChange}
                        name="mother_name"
                      />
                    </InputGroup>
                    <Form.Text className="text-muted">
                      Enter the mother's name.
                    </Form.Text>
                  </Form.Group>
                </Col>

                {/* Mother Contact Number */}
                <Col md={4}>
                  <Form.Group
                    className="mb-3 custom-input"
                    controlId="formMotherPhone"
                  >
                    <Form.Label>Mother Contact Number</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="fas fa-phone"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="tel"
                        placeholder="Enter mother's contact number"
                        value={formData.mother_phone}
                        onChange={handleChange}
                        name="mother_phone"
                      />
                    </InputGroup>
                    <Form.Text className="text-muted">
                      Enter the mother's contact number.
                    </Form.Text>
                  </Form.Group>
                </Col>

                {/* Current School */}
                <Col md={4}>
                  <Form.Group
                    className="mb-3 custom-input"
                    controlId="formCurrentSchool"
                  >
                    <Form.Label>Current School</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="fas fa-school"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Enter current school"
                        value={formData.current_school}
                        onChange={handleChange}
                        name="current_school"
                      />
                    </InputGroup>
                    <Form.Text className="text-muted">
                      Enter the current school of the student.
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>
            </>
          )}

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

export { CreateWalkinEnquiry };
