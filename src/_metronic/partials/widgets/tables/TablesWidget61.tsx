import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
// import { Tooltip as ReactTooltip } from "react-tooltip";
import "../../../../app/pages/StaffPages/FinancialManagement/style.css";
// import { CreateWalkinEnquiry } from "../../modals/create-app-stepper/CreateWalkinEnquiry";
// import { CreateEnquiryAction } from "../../modals/create-app-stepper/CreateEnquiryAction";
// import { CreateEditEnquiry } from "../../modals/create-app-stepper/CreateEditEnquiry";
import { useAuth } from "../../../../app/modules/auth/core/Auth";
// import { UploadsFilter } from "../../modals/create-app-stepper/UploadsFilter";
// import { AddClasses } from "../../modals/create-app-stepper/AddClasses";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";
// import { DeleteFeeGroupModal } from "../../modals/create-app-stepper/DeleteFeeGroupModal";
import { CreateEditFeeGroup } from "../../modals/create-app-stepper/CreateEditFeeGroup";
import {
  Button,
  Col,
  Form,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";

interface CurrentUser {
  school_id: string;
}

interface DataItem {
  id: number;
  fee_group_name: string;
}
interface Session {
  id: number;
  session: number;
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
interface SessionData {
  id: number;
  session: number;
}

const TablesWidget61 = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const { currentUser } = useAuth();

  const [referesh, setReferesh] = useState(false);
  const [fee_group_id, setfee_group_id] = useState<number | null>(null);
  // const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  // const [session_id, setSession_id] = useState<boolean>(false);

  const schoolId = (currentUser as CurrentUser)?.school_id;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    class_id: 0,
    section_id: "",
    session_id: "",
  });

  const [getClass, setClass] = useState<Class[]>([]);
  const [getSession, setSession] = useState<Session[]>([]);

  const [getSection, setSection] = useState<Section[]>([]);

  const [selectedClass, setSelectedClass] = useState<ClassData>({
    id: 0,
    className: "",
  });
  const [selectedSession, setSelectedSession] = useState<SessionData>({
    id: 0,
    session: 0,
  });

  const [selectedSections, setSelectedSections] = useState<Section[]>([]);
  const [isAllSectionsSelected, setIsAllSectionsSelected] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const handleShowEditModal = (fee_type_id: number) => {
    setfee_group_id(fee_type_id);
    setShowEditModal(true);
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };
  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setfee_group_id(null);
  };

  // const handleShowDeleteModal = (fee_group_id: number) => {
  //   setfee_group_id(fee_group_id);
  //   setShowDeleteModal(true);
  // };

  // const handleCloseDeleteModal = () => {
  //   setShowDeleteModal(false);
  //   setfee_group_id(null);
  // };

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
    const fetchSessions = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/api/school/get-session?schoolId=${schoolId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();
        setSession(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSessions();
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

  useEffect(() => {
    const fetchFeeGroups = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/api/school/getfeegroup/${schoolId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch fee groups");
        }
        const responseData = await response.json();
        console.log(responseData);

        console.log(responseData);
        setData(responseData);
      } catch (error) {
        console.error("Error fetching fee groups:", error);
      }
    };

    fetchFeeGroups();
    setReferesh(false);
  }, [schoolId, referesh]);

  const handleSessionSelected = (session: SessionData) => {
    setSelectedSession(session);
    setFormData((prevFormData) => ({
      ...prevFormData,
      session_id: session.id.toString(),
    }));
  };

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
        `${DOMAIN}/api/school/add-feegroup/${schoolId}`,
        {
          method: "POST",
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
      console.log("Response:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      className="card-style"
      style={{
        width: "100%",
        borderRadius: "16px",
        backgroundColor: "rgb(242, 246, 255)",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        marginTop: "20px",
        padding: "20px",
      }}
    >
      <div
        className="card-header"
        style={{
          backgroundColor: "rgb(242, 246, 255)",
          padding: "16px 20px",
          borderBottom: "1px solid #E0E4F0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "#1C335C",
            fontFamily: "Manrope",
          }}
        >
          Fees Group List
        </span>
        <div style={{ display: "flex", gap: "10px" }}>
          <div
            className="input-group flex-nowrap"
            style={{
              width: "300px",
              height: "36px",
              borderRadius: "8px",
              border: "1px solid #1C335C",
            }}
          >
            <span
              className="input-group-text border-0 pe-1 pr-0"
              style={{ backgroundColor: "transparent" }}
              id="addon-wrapping"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_582_4295)">
                  <circle
                    cx="8.50002"
                    cy="7.66665"
                    r="6.33333"
                    stroke="#1C335C"
                    stroke-width="1.5"
                  />
                  <path
                    d="M14.1667 13.3333L15.5 14.6666"
                    stroke="#1C335C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_582_4295">
                    <rect
                      width="16"
                      height="16"
                      fill="#1C335C"
                      transform="translate(0.833374)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </span>
            <input
              type="text"
              style={{
                backgroundColor: "transparent",
                color: "#1C335C",
              }}
              className="form-control border-0"
              placeholder="Search ...."
              aria-label="Search"
              aria-describedby="addon-wrapping"
            />
          </div>
          <div
            onClick={showAddModal}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 12px",
              backgroundColor: "#1C335C",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#16294D")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#1C335C")
            }
          >
            <span
              style={{
                marginRight: "8px",
                color: "white",
                fontSize: "14px",
                fontWeight: "700",
                fontFamily: "Manrope",
              }}
            >
              Add Group
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16px"
              height="16px"
              fill="#ffffff"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M3 17.25V21h3.75l11-11.03-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
          </div>
        </div>
      </div>
      <div
        style={{
          height: "650px", // Fixed height for the table container
          overflowY: "auto", // Enable vertical scrolling
          padding: "16px 0", // Optional: adds some padding around the table
        }}
      >
        <table
          className="table"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "10px",
            backgroundColor: "#FFFFFF", // White background for the table
            borderRadius: "12px", // Round corners for the table
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)", // Light shadow for the table
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "rgb(242, 246, 255)", // Header background color
                borderBottom: "1px solid #E0E4F0",
                fontFamily: "Manrope",
                fontWeight: "600",
                color: "#1C335C",
                fontSize: "14px",
              }}
            >
              <th
                style={{
                  padding: "12px 20px",
                  textAlign: "left",
                }}
              >
                Fee Group
              </th>

              <th
                style={{
                  padding: "12px 20px",
                  textAlign: "right",
                }}
              >
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor:
                    index % 2 === 0 ? "rgb(242, 246, 255)" : "#FFFFFF",
                  borderBottom: "1px solid #E0E4F0",
                  fontFamily: "Manrope",
                  fontSize: "14px",
                  color: "#1C335C",
                }}
              >
                <td
                  style={{
                    padding: "12px 20px",
                  }}
                >
                  {item.fee_group_name}
                </td>
                <td
                  style={{
                    display: "flex",
                    gap: "10px", // Adds space between the buttons
                    justifyContent: "right", // Aligns buttons horizontally in the center
                    alignItems: "center", // Vertically centers the buttons
                    padding: "12px 20px",
                  }}
                >
                  <div
                    onClick={() => handleShowEditModal(item.fee_groups_id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "8px 12px",
                      backgroundColor: "#1C335C",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#16294D")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#1C335C")
                    }
                  >
                    <span
                      style={{
                        marginRight: "8px",
                        color: "white",
                        fontSize: "14px",
                        fontWeight: "700",
                        fontFamily: "Manrope",
                      }}
                    >
                      Edit
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="16px"
                      height="16px"
                      fill="#ffffff"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M3 17.25V21h3.75l11-11.03-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                    </svg>
                  </div>
                  <div
                    onClick={() => handleShowDeleteModal(item.fee_groups_id)}
                    style={{
                      width: "32px",
                      height: "40px",
                      borderRadius: "6px",
                      padding: "10px 6px 10px 6px",
                      gap: "10px",
                      backgroundColor: "#FFE7E1",
                      cursor: "pointer",
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.0834 5H2.91663"
                        stroke="#ED5578"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M15.6944 7.08331L15.3111 12.8326C15.1637 15.045 15.0899 16.1512 14.3691 16.8256C13.6482 17.5 12.5396 17.5 10.3222 17.5H9.67775C7.46042 17.5 6.35175 17.5 5.63091 16.8256C4.91007 16.1512 4.83632 15.045 4.68883 12.8326L4.30554 7.08331"
                        stroke="#ED5578"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M7.91663 9.16669L8.33329 13.3334"
                        stroke="#ED5578"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M12.0833 9.16669L11.6666 13.3334"
                        stroke="#ED5578"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M5.41663 5C5.46319 5 5.48648 5 5.50758 4.99947C6.19379 4.98208 6.79915 4.54576 7.03264 3.90027C7.03982 3.88041 7.04719 3.85832 7.06191 3.81415L7.14282 3.57143C7.21188 3.36423 7.24642 3.26063 7.29222 3.17267C7.47497 2.82173 7.81308 2.57803 8.2038 2.51564C8.30173 2.5 8.41094 2.5 8.62934 2.5H11.3706C11.589 2.5 11.6982 2.5 11.7961 2.51564C12.1868 2.57803 12.525 2.82173 12.7077 3.17267C12.7535 3.26063 12.788 3.36423 12.8571 3.57143L12.938 3.81415C12.9527 3.85826 12.9601 3.88042 12.9673 3.90027C13.2008 4.54576 13.8061 4.98208 14.4923 4.99947C14.5134 5 14.5367 5 14.5833 5"
                        stroke="#ED5578"
                        stroke-width="1.5"
                      />
                    </svg>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

          {/* 
          <UploadsFilter
            show={showModal}
            handleClose={handleModalClose}
            filterData={applyfilters}
          /> */}
          {/* <CreateEnquiryAction show={showActionModal} handleClose={handleActionModalClose} enqId={enqId}/> */}
          {/* <AddClasses show={showModal} handleClose={handleModalClose} /> */}

          {/* end::Table body */}
        </table>
      </div>
      <Modal
        id="kt_modal_create_app"
        tabIndex={-1}
        aria-hidden="true"
        dialogClassName="modal-dialog modal-dialog-centered mw-1000px"
        show={isAddModalVisible}
        onHide={handleAddCancel}
        backdrop={true}
      >
        <div className="modal-header">
          <h2 style={{ fontFamily: "Manrope" }}>Add Fee Group :</h2>
          <div
            className="btn btn-sm btn-icon btn-active-color-primary"
            onClick={handleAddCancel}
          >
            <i className="fas fa-times"></i>
          </div>
        </div>
        <div className="modal-body py-lg-10 px-lg-10">
          <Form onSubmit={handleSubmit}>
            <Row>
              {/* Fees Group Name */}
              <Col md={6}>
                <Form.Group className="mb-4" controlId="formGroupName">
                  <Form.Label>Fees Group Name</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="fas fa-school"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter Fees Type name"
                      value={formData.name || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>

              {/* Select Class */}
              <Col md={6}>
                <div className="mb-2">
                  <span>Select Class</span>
                </div>
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
              </Col>

              {/* Select Section */}
              <Col md={6}>
                <div className="mb-2">
                  <span>Select Section</span>
                </div>
                <div style={{ marginBottom: "23px", width: "100%" }}>
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
                </div>
              </Col>

              {/* Select Session */}
              <Col md={6}>
                <div className="mb-2">
                  <span>Select Section</span>
                </div>
                <div style={{ marginBottom: "23px", width: "100%" }}>
                  <div className="dropdown" id="selectSession">
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
                      {selectedSession.session
                        ? selectedSession.session
                        : "Select Session"}
                    </div>
                    <ul
                      className="dropdown-menu"
                      style={{
                        width: "100%",
                        maxHeight: "150px",
                        overflowY: "scroll",
                      }}
                    >
                      {getSession.map((item) => (
                        <li key={item.id}>
                          <div
                            className="dropdown-item"
                            onClick={(e) => {
                              e.preventDefault();
                              handleSessionSelected({
                                id: item.id,
                                session: item.session,
                              });
                            }}
                          >
                            {item.session}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Col>
            </Row>

            {/* Add Button */}
            <div style={{ justifyContent: "flex-end", display: "flex" }}>
              <Button
                type="submit"
                variant="primary"
                style={{
                  width: "118px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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
                  Add
                </span>
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
      <CreateEditFeeGroup
        show={showEditModal}
        handleClose={handleCloseEditModal}
        fee_group_id={fee_group_id}
        setReferesh={setReferesh} 
      />
    </div>
  );
};

export { TablesWidget61 };

//     <DeleteFeeGroupModal
//       show={showDeleteModal}
//       onHide={handleCloseDeleteModal}
//       fee_group_id={fee_group_id}
//       setReferesh={setReferesh}
//     />
//   </div>
// </div>
