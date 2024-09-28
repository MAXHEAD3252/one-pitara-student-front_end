import React, { useEffect, useState } from "react";
// import { Tooltip as ReactTooltip } from "react-tooltip";
import "../../../../app/pages/StaffPages/FinancialManagement/style.css";
// import { CreateWalkinEnquiry } from "../../modals/create-app-stepper/CreateWalkinEnquiry";
// import { CreateEnquiryAction } from "../../modals/create-app-stepper/CreateEnquiryAction";
// import { CreateEditEnquiry } from "../../modals/create-app-stepper/CreateEditEnquiry";
import { useAuth } from "../../../../app/modules/auth/core/Auth";
// import { UploadsFilter } from "../../modals/create-app-stepper/UploadsFilter";
// import { AddClasses } from "../../modals/create-app-stepper/AddClasses";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";


interface CurrentUser {
  school_id: string; // Adjust type as per your actual data type for school_id
  // Add other properties if `currentUser` has more properties
}

interface HandleSectionSelectedParams {
  section: string; 
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>; 
}
interface HandleSectionSubjectParams {
  subject: string; 
  event:  React.MouseEvent<HTMLButtonElement, MouseEvent>; 
}
interface ClassData {
  id: number;
  className: string;
}
interface Subject {
  id: string;
  name: string;
  // Add more properties as needed
}

interface Class {
  class_id : number;
  id: number;
  name: string;
  class : string;

  // Add more properties as needed
}

interface Section {
  id: number;
  name: string;
  section:string;
  // Add more properties as needed
}


const TablesWidget50 = () => {
  const [getClass, setClass] = useState<Class[]>([]);
const [getSection, setSection] = useState<Section[]>([]);
  const [getSubject, setSubject] = useState<Subject[]>([]);


  const { currentUser } = useAuth();

  const school_id = (currentUser as unknown as CurrentUser)?.school_id;

  // const [showModal, setShowModal] = useState(false);

  const [selectedClass, setSelectedClass] = useState({
    id: 0,
    className: "",
  }); // State to hold selected section
  // const [selectedSection, setSelectedSection] = useState(null); // State to hold selected section
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedSections, setSelectedSections] = useState([]);

  // const handleModal = () => {
  //   setShowModal(true);
  // };
  // const handleModalClose = () => {
  //   setShowModal(false);
  // };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/api/school/get-onlyclasses/${school_id}`
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
  }, [school_id]);


  useEffect(() => {
    const fetchSections = async () => {
      try {
        const class_id = selectedClass?.id;
        const response = await fetch(
          `${DOMAIN}/api/school/get-classwise-section/${class_id}/${school_id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setSection(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSections();
  }, [selectedClass?.id]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/api/school/get-onlysubjects/${school_id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();
        setSubject(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSubjects();
  }, [school_id]);

  const handleSectionSelected = ({ section, event }: HandleSectionSelectedParams) => {
    event.stopPropagation();
    /* @ts-ignore */
    setSelectedSections((prevSelected) => {
      /* @ts-ignore */
      if (prevSelected.includes(section)) {
        return prevSelected.filter((s) => s !== section);
      } else {
        return [...prevSelected, section];
      }
    });
  };

  const handleSubjectSelected = ({subject, event}:HandleSectionSubjectParams) => {
    event.stopPropagation(); // Prevent the dropdown from closing
    /* @ts-ignore */
    setSelectedSubjects((prevSelected) => {
      /* @ts-ignore */
      if (prevSelected.includes(subject)) {
        return prevSelected.filter((s) => s !== subject);
      } else {
        return [...prevSelected, subject];
      }
    });
  };
 /* @ts-ignore */
  const isSelectedSection = (section: string): boolean => selectedSections.includes(section);
 /* @ts-ignore */
  const isSelectedSubject = (subject: string): boolean => selectedSubjects.includes(subject);

  const handleClassSelected = ({ id, className }: ClassData) => {
    setSelectedClass({ id, className });
  };

  // const handleSubjectSelected = (subjectName: React.SetStateAction<null>) => {
  //   setSelectedSubject(subjectName); // Update selected section state
  // };

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
                      Subjects List
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
                  <div style={{ width: "40px" }}>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "600",
                        lineHeight: "18px",
                        color: "#FFFFFF",
                      }}
                    >
                      Subjects
                    </span>
                  </div>
                </th>
                <th>
                  <div
                    style={{
                      width: "60px",
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
              {getSubject.map((item, index) => (
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
                        {item.name}
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
                        // onClick={() => handleModalEdit(item.id)}
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
                        // onClick={() => handleActionModal(item.id)}
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
          height: "480px",
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
            Add Subjects Group :
          </span>
        </div>
        <div
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
              htmlFor="materialtitle"
              className="form-label"
              style={{
                fontSize: "12px",
                color: "#434343",
                fontWeight: "500",
              }}
            >
              Subject Name
            </label>

            <div id="materialtitle">
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
                // onChange={(e) =>
                //   // handleMaterialChange("title", e.target.value)
                // }
                type="text"
                placeholder="Enter Name"
                aria-expanded="false"
              />
            </div>
          </div>
          <div style={{ marginBottom: "23px", width: "100%" }}>
            <div className="dropdown" id="selectClass">
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
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {selectedClass.className
                  ? selectedClass.className
                  : "Select Class"}
              </button>
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
                    <button
                      className="dropdown-item"
                      onClick={() =>
                        handleClassSelected({
                          id: item.class_id,
                          className: item.class,
                        })
                      } // Pass section class to handler
                    >
                      {item.class}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{ marginBottom: "23px", width: "100%" }}>
            <div className="dropdown" id="selectClass">
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
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {selectedSections.length > 0
                  ? selectedSections.join(", ")
                  : "Select Sections"}
              </button>
              <ul
                className="dropdown-menu"
                style={{
                  width: "100%",
                  maxHeight: "150px",
                  overflowY: "scroll",
                }}
              >
                {getSection.map((item) => (
                  <li key={item.id}>
                    <button
                      className={`dropdown-item ${
                        isSelectedSection(item.section) ? "selected" : ""
                      }`}
                      onClick={(event) => handleSectionSelected({ section: item.section, event })}
                    >
                      {item.section}
                      {isSelectedSection(item.section) && (
                        <span style={{ marginLeft: "8px", color: "green" }}>
                          ✓
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{ marginBottom: "23px", width: "100%" }}>
            <div className="dropdown" id="selectClass">
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
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {selectedSubjects.length > 0
                  ? selectedSubjects.join(", ")
                  : "Select Subjects"}
              </button>
              <ul
                className="dropdown-menu"
                style={{
                  width: "100%",
                  maxHeight: "150px",
                  overflowY: "scroll",
                }}
              >
                {getSubject.map((item) => (
                  <li key={item.id}>
                    <button
                      className={`dropdown-item ${
                        isSelectedSubject(item.name) ? "selected" : ""
                      }`}
                      onClick={(event) => handleSubjectSelected({ subject: item.name, event })}
                    >
                      {item.name}
                      {isSelectedSubject(item.name) && (
                        <span style={{ marginLeft: "8px", color: "green" }}>
                          ✓
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            style={{
              width: "100%",
              justifyContent: "right",
              display: "flex",
            }}
          >
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              style={{
                width: "118px",
                height: "36px",
                padding: "8px 10px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                flexShrink: "0",
                backgroundColor: "rgba(39, 59, 99, 0.76)",
              }}
              // onClick={handleSubmit}
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
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { TablesWidget50 };
