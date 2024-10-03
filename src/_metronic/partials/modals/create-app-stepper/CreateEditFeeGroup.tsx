import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  Button,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { useAuth } from "../../../../app/modules/auth";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";

type Props = {
  show: boolean;
  handleClose: () => void;
  fee_group_id: number | null;
  setReferesh: any;
};

interface CurrentUser {
  school_id: string;
}

interface DataItem {
  id: number;
  fee_group_name: string;
}

interface Class {
  class_id: number;
  id: number;
  name: string;
  class: string;
}

interface Section {
  id: number;
  section: string;
}

interface ClassData {
  id: number;
  className: string;
}

const modalsRoot = document.getElementById("root-modals") || document.body;

const CreateEditFeeGroup = ({
  show,
  handleClose,
  fee_group_id,
  setReferesh,
}: Props) => {
  const [data, setData] = useState<DataItem[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    class_id: 0,
    section_id: "",
    session_id: "19",
  });

  const [getClass, setClass] = useState<Class[]>([]);
  const [getSection, setSection] = useState<Section[]>([]);
  console.log(getSection);

  const [selectedClass, setSelectedClass] = useState<ClassData>({
    id: 0,
    className: "",
  });
  const [selectedSections, setSelectedSections] = useState<Section[]>([]);
  const [isAllSectionsSelected, setIsAllSectionsSelected] = useState(false);

  console.log(selectedSections);

  const { currentUser } = useAuth();
  const schoolId = (currentUser as CurrentUser)?.school_id;

  //   console.log(fee_group_id)

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/api/school/get-onlyclasses/${schoolId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();
        setClass(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchClasses();
  }, [schoolId]);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const class_id = selectedClass.id;
        const response = await fetch(
          `${DOMAIN}/api/school/get-classwise-section/${class_id}/${schoolId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSection(data);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };

    if (selectedClass.id) {
      fetchSections();
    }
  }, [selectedClass.id, schoolId]);

  const handleClassSelected = ({ id, className }: ClassData) => {
    setSelectedClass({ id, className });
    setFormData((prevFormData) => ({
      ...prevFormData,
      class_id: id,
    }));
  };

  const handleSelectAllSections = () => {
    if (isAllSectionsSelected) {
      setSelectedSections([]); // Deselect all sections
    } else {
      setSelectedSections(getSection); // Select all sections
    }
    setIsAllSectionsSelected(!isAllSectionsSelected);
  };

  const handleSectionSelected = (section) => {
    if (isSelectedSection(section)) {
      setSelectedSections(selectedSections.filter((s) => s.id !== section.id));
    } else {
      setSelectedSections([...selectedSections, section]);
    }
  };

  const isSelectedSection = (section) => {
    return selectedSections.some((s) => s.id === section.id);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${DOMAIN}/api/school/edit-feegroup/${fee_group_id}/${schoolId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            section_id: selectedSections.map((s) => s.id).join(","),
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setReferesh(true);
      handleClose();
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
        <h2>Edit Fee Group</h2>
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={handleClose}
        >
          <i className="fas fa-times"></i>
        </div>
      </div>

      <div className="modal-body" style={{ backgroundColor: "#F2F6FF" }}>
        <Form
          onSubmit={handleSubmit}
          className="d-flex flex-column align-items-center"
          style={{ padding: "20px", marginTop: "10px" }}
        >
          <Row style={{ width: "100%" }}>
            {/* Name Field */}
            <Col md={12} style={{ marginBottom: "23px" }}>
              <Form.Group controlId="formName">
                <Form.Label
                  style={{
                    fontSize: "12px",
                    color: "#434343",
                    fontWeight: "500",
                  }}
                >
                  Name
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    style={{
                      height: "46px",
                      paddingLeft: "10px",
                      backgroundColor: "transparent",
                      border: "1px solid #ECEDF1",
                      borderRadius: "8px",
                    }}
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            {/* Select Class Dropdown */}
            <Col md={12}>
              <Form.Group controlId="formSelectClass">
                <Form.Label>Select Class</Form.Label>
                <div style={{ marginBottom: "23px", width: "100%" }}>
                  <div className="dropdown" id="selectClass">
                    <div
                      className="btn btn-secondary dropdown-toggle"
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "transparent",
                        border: "1px solid #ECEDF1",
                        borderRadius: "8px",
                      }}
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {selectedClass.className
                        ? selectedClass.className
                        : "Select Class"}
                    </div>
                    <ul
                      className="dropdown-menu"
                      style={{
                        width: "100%",
                        maxHeight: "150px",
                        overflowY: "scroll",
                      }}
                    >
                      {getClass.map((item) => (
                        <li key={item.class_id}>
                          <div
                            className="dropdown-item"
                            onClick={(e) => {
                              e.preventDefault();
                              handleClassSelected({
                                id: item.class_id,
                                className: item.class,
                              });
                            }}
                          >
                            {item.class}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Form.Group>
            </Col>

            {/* Select Section Dropdown */}
            <Col md={12} style={{ marginBottom: "23px" }}>
              <Form.Group controlId="formSelectSection">
                <Form.Label>Select Section</Form.Label>
                <div className="dropdown" id="selectSection">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: "transparent",
                      border: "1px solid #ECEDF1",
                      borderRadius: "8px",
                    }}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {selectedSections.length
                      ? selectedSections
                          .map((section) => section.section)
                          .join(", ")
                      : "Select Section"}
                  </button>
                  <ul
                    className="dropdown-menu"
                    style={{
                      width: "100%",
                      maxHeight: "150px",
                      overflowY: "scroll",
                    }}
                  >
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={(e) => {
                          e.preventDefault();
                          handleSelectAllSections();
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isAllSectionsSelected}
                          readOnly
                          style={{ marginRight: "8px" }}
                        />
                        Select All
                      </button>
                    </li>
                    {getSection.map((section) => (
                      <li key={section.id}>
                        <button
                          className="dropdown-item"
                          onClick={(e) => {
                            e.preventDefault();
                            handleSectionSelected(section);
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isSelectedSection(section)}
                            readOnly
                            style={{ marginRight: "8px" }}
                          />
                          {section.section}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </Form.Group>
            </Col>

            {/* Submit Button */}
            <Col md={12}>
              <Button
                type="submit"
                variant="primary"
                className="w-100"
                style={{
                  borderRadius: "8px",
                  padding: "10px",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>,
    modalsRoot
  );
};

export { CreateEditFeeGroup };
