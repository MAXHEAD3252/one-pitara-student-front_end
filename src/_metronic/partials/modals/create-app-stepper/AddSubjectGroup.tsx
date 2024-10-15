import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../../../../app/modules/auth";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";
import { Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import Select from "react-select";

interface Class {
  class_id: number;
  class: string;
}

interface Section {
  id: number;
  section: string;
}

interface Subject {
  id: number;
  name: string;
}

interface Sessions {
  id: number;
  session: string;
}

type Props = {
  show: boolean;
  handleClose: () => void;
  setRefresh: any;
};

const modalsRoot = document.getElementById("root-modals") || document.body;

const AddSubjectGroup = ({ show, handleClose, setRefresh }: Props) => {
  const [getClass, setClass] = useState<Class[]>([]);
  const [getSection, setSection] = useState<Section[]>([]);
  const [getSubject, setSubject] = useState<Subject[]>([]);
  const [getSession, setSession] = useState<Sessions[]>([]);
  const { currentUser } = useAuth();
  const school_id = currentUser?.school_id;

  const [selectedClass, setSelectedClass] = useState({ id: 0, className: "" });
  const [selectedSession, setSelectedSession] = useState({
    id: 0,
    session: "",
  });
  const [selectedSections, setSelectedSections] = useState<number[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<number[]>([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/api/school/get-onlyclasses/${school_id}`
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setClass(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchClasses();
  }, [school_id]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/api/school/get-session-subjectgroup/${school_id}`
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setSession(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchSessions();
  }, [school_id]);

  useEffect(() => {
    const fetchSections = async () => {
      if (selectedClass.id === 0) return;
      try {
        const response = await fetch(
          `${DOMAIN}/api/school/get-classwise-section/${selectedClass.id}/${school_id}`
        );
        if (!response.ok) throw new Error("Failed to fetch sections");
        const data = await response.json();
        setSection(data);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };
    fetchSections();
  }, [selectedClass.id]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/api/school/get-onlysubjects/${school_id}`
        );
        if (!response.ok) throw new Error("Failed to fetch subjects");
        const data = await response.json();
        setSubject(data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    fetchSubjects();
  }, [school_id]);

  const handleClassSelected = (id: number, className: string) => {
    setSelectedClass({ id, className });
    setSelectedSections([]); // Reset sections on class change
  };
  const handleSessionSelected = (id: number, session: string) => {
    setSelectedSession({ id, session });
  };

 
  const handleSectionSelected = (selectedOptions: any) => {
    const selectedIds = selectedOptions.map((option: any) => option.value);
    setSelectedSections(selectedIds);
  };


  const handleSubjectSelected = (selectedOptions: any) => {
    const selectedIds = selectedOptions.map((option: any) => option.value);
    setSelectedSubjects(selectedIds);
  };


  const sectionOptions = getSection.map((section) => ({
    value: section.id,
    label: section.section,
  }));

  const subjectOptions = getSubject.map((subject) => ({
    value: subject.id,
    label: subject.name,
  }));



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      selectedClass.id === 0 ||
      selectedSections.length === 0 ||
      selectedSubjects.length === 0 ||
      selectedSession.id === 0
    ) {
      alert("Please select a class, section(s), subject(s), session(s).");
      return;
    }

    console.log(
      selectedClass.id,
      selectedSections,
      selectedSubjects,
      selectedSession.id
    );
    try {
      const response = await fetch(
        `${DOMAIN}/api/school/add-subject-group/${school_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            classId: selectedClass.id,
            sections: selectedSections,
            subjects: selectedSubjects,
            sessionId: selectedSession.id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Form submitted successfully!", result);
      handleClose(); // Close the modal after submission
      setRefresh(true); // Trigger refresh if needed
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return createPortal(
    <Modal
      id="kt_modal_create_app"
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
        <h2>Add Subjects Group</h2>
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
              <Form.Group controlId="session">
                <Form.Label>Select Session</Form.Label>
                <Form.Select
                  onChange={(e) =>
                    handleSessionSelected(
                      parseInt(e.target.value),
                      e.target.options[e.target.selectedIndex].text
                    )
                  }
                >
                  <option value="">Select Session</option>
                  {getSession.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.session}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="class">
                <Form.Label>Select Class</Form.Label>
                <Form.Select
                  onChange={(e) =>
                    handleClassSelected(
                      parseInt(e.target.value),
                      e.target.options[e.target.selectedIndex].text
                    )
                  }
                >
                  <option value="">Select Class</option>
                  {getClass.map((cls) => (
                    <option key={cls.class_id} value={cls.class_id}>
                      {cls.class}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Form.Group className="mb-3" controlId="formSource">
                <Form.Label>Select Sections</Form.Label>
                      <Select
                        options={sectionOptions}
                        isMulti
                        onChange={handleSectionSelected}
                        placeholder="Select Sections..."
                        className="basic-multi-select"
                        classNamePrefix="select"
                      />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Form.Group className="mb-3" controlId="formSource">
                <Form.Label>Select Subjects</Form.Label>
                      <Select
                        options={subjectOptions}
                        isMulti
                        onChange={handleSubjectSelected}
                        placeholder="Select Sections..."
                        className="basic-multi-select"
                        classNamePrefix="select"
                      />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </Form>
      </div>
    </Modal>,
    modalsRoot
  );
};

export { AddSubjectGroup };
