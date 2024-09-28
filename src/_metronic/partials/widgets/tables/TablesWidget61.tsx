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
import { DeleteFeeGroupModal } from "../../modals/create-app-stepper/DeleteFeeGroupModal";
import { CreateEditFeeGroup } from "../../modals/create-app-stepper/CreateEditFeeGroup";

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
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [session_id, setSession_id] = useState<boolean>(false);

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

  const handleShowEditModal = (fee_type_id: number) => {
    setfee_group_id(fee_type_id);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setfee_group_id(null);
  };

  const handleShowDeleteModal = (fee_group_id: number) => {
    setfee_group_id(fee_group_id);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setfee_group_id(null);
  };

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
    <div className="d-flex" style={{ gap: "10px" }}>
      <div
        className="col-xxl-8"
        style={{
          borderRadius: "16px",
          border: "1px solid #5D637A",
          overflowX: "hidden",
          minHeight: "100%",
          marginBottom: "20px",
          height: "770px",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Manrope",
          maxWidth: "100%",
          overflow: "hidden",
        }}
      >
        <div style={{ width: "auto", height: "100%", overflow: "hidden" }}>
          <table
            //   className="col-xxl-12"
            style={{
              top: "223px",
              height: "612px",
              maxHeight: "100%",
              borderCollapse: "collapse",
              // tableLayout: "fixed",
              overflowX: "hidden",
              overflowY: "auto",
              whiteSpace: "nowrap",
              width: "100%",
              // border:'8px solid black'
            }}
          >
            <thead
              style={{
                height: "123px",
                maxHeight: "100%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#1C335C",
                //   width:'fit-content',
                // overflowY: "auto",
                // overflowX: "hidden",
                justifyContent: "space-between",
                zIndex: 999,
              }}
              className="col-xxl-12 col-lg-6"
            >
              <div>
                <caption
                  style={{
                    backgroundColor: "#1C335C",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    // tableLayout: "fixed",
                    // borderCollapse: "collapse",

                    // border:'1px solid'
                    width: "100%",
                  }}
                >
                  <div>
                    <span
                      style={{
                        color: "#FFF",
                        fontSize: "16px",
                        fontWeight: "700",
                        fontFamily: "Manrope",
                      }}
                    >
                      Fees Group List
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                      className="input-group flex-nowrap"
                      style={{
                        width: "300px",
                        height: "36px",
                        borderRadius: "8px",
                        border: "1px solid #D9D9D9",
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
                              stroke="white"
                              stroke-width="1.5"
                            />
                            <path
                              d="M14.1667 13.3333L15.5 14.6666"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_582_4295">
                              <rect
                                width="16"
                                height="16"
                                fill="white"
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
                          color: "#FFFFFF",
                        }}
                        className="form-control border-0"
                        placeholder="Search ...."
                        aria-label="Search"
                        aria-describedby="addon-wrapping"
                      />
                    </div>
                  </div>
                </caption>
              </div>

              <tr
                style={{
                  height: "61px",
                  display: "flex",
                  paddingLeft: "30px",
                  justifyContent: "space-between",
                  width: "95%",
                  overflowY: "auto",
                  overflowX: "hidden",
                  backgroundColor: "#1C335C",
                }}
              >
                <th>
                  <div style={{ width: "0px" }}>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "600",
                        lineHeight: "18px",
                        color: "#FFFFFF",
                      }}
                    >
                      Fee Group
                    </span>
                  </div>
                </th>

                <th>
                  <div
                    style={{
                      width: "60px",
                      marginRight: "50px",
                      // textAlign:'left'
                      // border:'1px solid',
                      display: "flex",
                      justifyContent: "end",
                      fontFamily: "Manrope",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "600",
                        lineHeight: "18px",
                        color: "#FFFFFF",
                      }}
                    >
                      Action
                    </span>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody
              className="col-xxl-12 col-lg-6"
              style={{
                height: "105%",
                display: "flex",
                flexDirection: "column",
                minHeight: "calc(100vh - 550px)",
                overflowY: "auto",
                backgroundColor: "#F5F5F5",
              }}
            >
              {data.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    height: "80px",
                    paddingLeft: "30px",
                    paddingTop: "25px",
                    marginBottom: "5px",
                    justifyContent: "space-between",
                    width: "90%",
                    display: "flex",
                    // borderBottom:'1px solid grey'
                  }}
                >
                  <td>
                    <div
                      style={{
                        width: "55px",
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          lineHeight: "18px",
                          color: "#1F1F1F",
                          fontFamily: "Manrope",
                        }}
                      >
                        {item.fee_group_name}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div
                      style={{
                        width: "60px",
                        display: "flex",
                        justifyContent: "space-around",
                        flexDirection: "row",
                        gap: "6px",
                        marginTop: "-8px",
                      }}
                    >
                      <button
                        type="button"
                        className="btn"
                        style={{
                          backgroundColor: "#1F3259",
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#FFF",
                        }}
                        onClick={() => handleShowEditModal(item.fee_groups_id)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn"
                        style={{
                          border: "1px solid #1F3259",
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#1F3259",
                        }}
                        onClick={() =>
                          handleShowDeleteModal(item.fee_groups_id)
                        }
                      >
                        Delete
                      </button>
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
      </div>
      <div
        className="col-xxl-4"
        style={{
          borderRadius: "16px",
          border: "1px solid #5D637A",
          overflowX: "hidden",
          minHeight: "100%",
          marginBottom: "20px",
          height: "500px",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Manrope",
          maxWidth: "100%",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "20px",
            backgroundColor: "#1C335C",
            height: "80px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            className=""
            id="staticBackdropLabel"
            style={{
              fontSize: "18px",
              fontWeight: "600",
              fontFamily: "Manrope",
              color: "white",
            }}
          >
            Add Fee Group :
          </span>
        </div>
        <div>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "20px",
              flexDirection: "column",
              marginTop: "10px",
            }}
          >
            <div style={{ marginBottom: "23px", width: "100%" }}>
              <label
                htmlFor="name"
                className="form-label"
                style={{
                  fontSize: "12px",
                  color: "#434343",
                  fontWeight: "500",
                }}
              >
                Name
              </label>

              <div id="name">
                <input
                  className=""
                  style={{
                    height: "46px",
                    width: "100%",
                    paddingLeft: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "transparent",
                    border: "1px solid #ECEDF1",
                    borderRadius: "8px",
                  }}
                  onChange={handleInputChange}
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="Enter Name"
                  aria-expanded="false"
                  required
                />
              </div>
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

            <button
              type="submit"
              className="btn btn-primary"
              style={{
                borderRadius: "8px",
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              Add Fee Group
            </button>
          </form>
          <CreateEditFeeGroup
            show={showEditModal}
            handleClose={handleCloseEditModal}
            fee_group_id={fee_group_id}
            setReferesh={setReferesh}
          />
          <DeleteFeeGroupModal
            show={showDeleteModal}
            onHide={handleCloseDeleteModal}
            fee_group_id={fee_group_id}
            setReferesh={setReferesh}
          />
        </div>
      </div>
    </div>
  );
};

export { TablesWidget61 };
