/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Modal } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../../../../app/modules/auth";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";
import axios from "axios";
import { useLocation } from "react-router-dom";

type Props = {
  show: boolean;
  handleClose: () => void;
};
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const modalsRoot = document.getElementById("root-modals") || document.body;

const UploadAssignmentModal = ({ show, handleClose }: Props) => {
  const { currentUser } = useAuth();
  const school_id = currentUser?.school_id;
  const staff_id = currentUser?.id;
  const query = useQuery();
  const classIdParam = query.get("class_id");
  const sectionIdParam = query.get("section_id");
  const subjectIdParam = query.get("subject_id");
  const lessonIdParam = query.get("lesson_id");
  const topicIdParam = query.get("topic_id");


  
  const [getClasses, setClasses] = useState([]);
  const [getSections, setSections] = useState([]);
  const [getSubjects, setSubjects] = useState([]);
  const [getLessons, setLessons] = useState([]);
  const [getTopics, setTopics] = useState([]);
  const [data, setData] = useState({
    classId: classIdParam || "",
    sectionId: sectionIdParam || 0,
    subjectId: subjectIdParam || 0,
    lessonId: lessonIdParam || 0,
    topicId: topicIdParam || 0,
    school_id: school_id,
    staff_id: staff_id,
    title: "",
    description: "",
    document_type: "",
    submit_date: "",
    evaluation_date: "",
    file: null,
    is_public: 0,
  });

  const [selectedClass, setSelectedClass] = useState({
    id: classIdParam || null,
    name: "Select Class",
  });
  const [selectedSection, setSelectedSection] = useState({
    id: sectionIdParam || null,
    name: "Select Section",
    class_section_id: null,
  });
  const [selectedSubjects, setSelectedSubjects] = useState({
    id: subjectIdParam || null,
    name: "Select Subject",
    class_section_subject_id: null,
  });
  const [selectedLesson, setSelectedLesson] = useState({
    id: lessonIdParam || null,
    name: "Select Lesson",
    class_section_subject_lesson_id: null,
  });
  const [selectedTopic, setSelectedTopic] = useState({
    id: topicIdParam || null,
    name: "Select Topic",
  });

  useEffect(() => {
    if (selectedClass.id !== null) {
    const fetchClasses = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/api/staff/get-allclasses/${school_id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setClasses(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchClasses();
  } else {
    return;
  }
  }, []);

  useEffect(() => {
    if (selectedClass.id !== null) {
      const fetchSections = async () => {
        try {
          const response = await fetch(
            `${DOMAIN}/api/staff/get-allsections/${school_id}/${selectedClass.id}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          if (sectionIdParam) {
            const filteredData = data.filter(
              (section: { id: number }) =>
                section.id === parseInt(sectionIdParam)
            );
            setSections(filteredData);
          } else {
            setSections(data);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchSections();
    }
  }, [selectedClass.id,sectionIdParam]);

  useEffect(() => {
    if (selectedSection.id !== null) {
      const fetchSubjects = async () => {
        try {
          let class_section_id = null;
          if (getSections !== null) {
            class_section_id = getSections[0].class_section_id;
          } else {
            class_section_id = selectedSection.class_section_id;
          }
          const response = await fetch(
            `${DOMAIN}/api/staff/get-allsubjects/${class_section_id}/${school_id}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          if (subjectIdParam) {
            const filteredData = data.filter(
              (subject: { id: number }) =>
                subject.subject_id === parseInt(subjectIdParam)
            );
            setSubjects(filteredData);
          } else {
            setSubjects(data);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchSubjects();
    }
  }, [selectedSection.id,getSections]);

  useEffect(() => {
    if (selectedSubjects.id !== null) {
      const fetchLessons = async () => {
        try {
          let class_section_subject_id = null;
          if (getSubjects !== null) {
            class_section_subject_id = getSubjects[0].class_section_subject_id;
          } else {
            class_section_subject_id =
              selectedSubjects.class_section_subject_id;
          }

          const response = await fetch(
            `${DOMAIN}/api/staff/get-alllessons/${class_section_subject_id}/${school_id}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          if (lessonIdParam) {
            const filteredData = data.filter(
              (lesson: { id: number }) =>
                lesson.lesson_id === parseInt(lessonIdParam)
            );
            setLessons(filteredData);
          } else {
            setLessons(data);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchLessons();
    }
  }, [selectedSubjects.id,getSubjects]);

  useEffect(() => {
    if (selectedLesson.id !== null) {
      const fetchTopics = async () => {
        try {
          let class_section_subject_lesson_id = null;
          if (getSections !== null) {
            class_section_subject_lesson_id = getLessons[0].class_section_subject_lesson_id;
          } else {
            class_section_subject_lesson_id = selectedLesson.class_section_subject_lesson_id;
          }
          const response = await fetch(
            `${DOMAIN}/api/staff/get-alltopics/${class_section_subject_lesson_id}/${school_id}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          if (topicIdParam) {
            const filteredData = data.filter(
              (topic: { id: number }) =>
                topic.topic_id === parseInt(topicIdParam)
            );
            setTopics(filteredData);
          } else {
            setTopics(data);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchTopics();
    }
  }, [selectedLesson.id,getLessons]);

  const handleClassSelect = (id, name) => {
    setSelectedClass({ id, name });
    setData({
      ...data,
      classId: id,
    });
  };

  const handleSectionSelect = (id, name, class_section_id) => {
    setSelectedSection({ id, name, class_section_id });
    setData({
      ...data,
      sectionId: id,
    });
  };

  const handleSubjectSelect = (id, name, class_section_subject_id) => {
    setSelectedSubjects({ id, name, class_section_subject_id });
    setData({
      ...data,
      subjectId: id,
    });
  };
  const handleLessonSelect = (id, name, class_section_subject_lesson_id) => {
    setSelectedLesson({ id, name, class_section_subject_lesson_id });
    setData({
      ...data,
      lessonId: id,
    });
  };

  const handleTopicSelect = (id, name) => {
    setSelectedTopic({ id, name });
    setData({
      ...data,
      topicId: id,
    });
  };

  const handleSubmit = async () => {

    const formData = new FormData();
    formData.append("classId", data.classId);
    formData.append("sectionId", data.sectionId);
    formData.append("subjectId", data.subjectId);
    formData.append("lessonId", data.lessonId);
    formData.append("topicId", data.topicId);
    formData.append("school_id", data.school_id);
    formData.append("staff_id", data.staff_id);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("document_type", data.document_type);
    formData.append("submit_date", data.submit_date);
    formData.append("evaluation_date", data.evaluation_date);
    formData.append("is_public", data.is_public);
    formData.append("file", data.file);
    formData.append("upload_type", 'assignment');

    try {
      const response = await axios.post(
        `${DOMAIN}/api/staff/get-uploadcontent`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Data submitted successfully!", response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  const handleAssignmentChange = (key, value) => {
    if (key === "file") {
      // Update file state with FileList from input
      setData({
        ...data,
        file: value.target.files[0],
      });
    } else {
      // Handle other form data changes
      setData({
        ...data,
        [key]: value,
      });
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
        className="modal-content"
        style={{ padding: "23px 5px", borderRadius: "17px" }}
      >
        <div
          className="modal-header border-0"
          style={{ width: "100%", height: "17px" }}
        >
          <span
            className=""
            id="staticBackdropLabel"
            style={{
              fontSize: "24px",
              fontWeight: "600",
              fontFamily: "Manrope",
            }}
          >
            Upload Assignment :
          </span>
          <span
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={handleClose}
            style={{ cursor: "pointer" }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="16" cy="16" r="16" fill="#ECECEC" />
              <path
                d="M22.8572 9.14294L9.14288 22.8572M9.14288 9.14294L22.8572 22.8572"
                stroke="#464646"
                stroke-width="2"
                stroke-linecap="square"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </div>
        <div className="modal-body">
          {sectionIdParam === "" ? (
            <div style={{ marginBottom: "23px", width: "50%" }}>
              <label
                htmlFor="selectClass"
                className="form-label"
                style={{
                  fontSize: "12px",
                  color: "#434343",
                  fontWeight: "500",
                }}
              >
                Select Section
              </label>

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
                  {selectedSection.name}
                </button>
                <ul
                  className="dropdown-menu"
                  style={{
                    width: "100%",
                    maxHeight: "150px",
                    overflowY: "scroll",
                  }}
                >
                  {getSections.map((item) => (
                    <li key={item.id}>
                      <button
                        className="dropdown-item"
                        onClick={() =>
                          handleSectionSelect(
                            item.id,
                            item.section,
                            item.class_section_id
                          )
                        }
                      >
                        {item.section}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            ) : (
              <></>
            )}

{subjectIdParam === "" ? (
            <div style={{ marginBottom: "23px", width: "100%" }}>
              <label
                htmlFor="selectSubject"
                className="form-label"
                style={{
                  fontSize: "12px",
                  color: "#434343",
                  fontWeight: "500",
                }}
              >
                Select Subject
              </label>

              <div className="dropdown" id="selectSubject">
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
                  {selectedSubjects.name}
                </button>
                <ul className="dropdown-menu" style={{ width: "100%" }}>
                  {getSubjects.map((item) => (
                    <li key={item.subject_id}>
                      <button
                        className="dropdown-item"
                        onClick={() =>
                          handleSubjectSelect(
                            item.subject_id,
                            item.subject_name,
                            item.class_section_subject_id
                          )
                        }
                      >
                        {item.subject_name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <></>
          )} 
{lessonIdParam === "" ? (
            <div style={{ marginBottom: "23px", width: "100%" }}>
              <label
                htmlFor="selectSubject"
                className="form-label"
                style={{
                  fontSize: "12px",
                  color: "#434343",
                  fontWeight: "500",
                }}
              >
                Select Lesson
              </label>

              <div className="dropdown" id="selectSubject">
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
                  {selectedLesson.name}
                </button>
                <ul className="dropdown-menu" style={{ width: "100%" }}>
                  {getLessons.map((item) => (
                    <li key={item.lesson_id}>
                      <button
                        className="dropdown-item"
                        onClick={() =>
                          handleLessonSelect(
                            item.lesson_id,
                            item.lesson_name,
                            item.class_section_subject_lesson_id
                          )
                        }
                      >
                        {item.lesson_name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <></>
          )}

{topicIdParam === "" ? (
            <div style={{ marginBottom: "23px", width: "100%" }}>
              <label
                htmlFor="selectTopic"
                className="form-label"
                style={{
                  fontSize: "12px",
                  color: "#434343",
                  fontWeight: "500",
                }}
              >
                Select Topic
              </label>

              <div className="dropdown" id="selectTopic">
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
                  {selectedTopic.name}
                </button>
                <ul className="dropdown-menu" style={{ width: "100%" }}>
                  {getTopics.map((item) => (
                    <li key={item.topic_id}>
                      <button
                        className="dropdown-item"
                        onClick={() =>
                          handleTopicSelect(item.topic_id, item.topic_name)
                        }
                      >
                        {item.topic_name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <></>
          )}
          

          <div style={{ display: "flex", width: "100%", gap: "20px" }}>
            <div style={{ marginBottom: "23px", width: "50%" }}>
              <label
                htmlFor="AssignmentTitle"
                className="form-label"
                style={{
                  fontSize: "12px",
                  color: "#434343",
                  fontWeight: "500",
                }}
              >
                Enter Title
              </label>

              <div id="AssignmentTitle">
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
                  onChange={(e) =>
                    handleAssignmentChange("title", e.target.value)
                  }
                  type="text"
                  placeholder="Enter Title"
                  aria-expanded="false"
                />
              </div>
            </div>
          </div>

          <div style={{ display: "flex", width: "100%", gap: "20px" }}>
            <div style={{ marginBottom: "23px", width: "50%" }}>
              <label
                htmlFor="AssignmentDescription"
                className="form-label"
                style={{
                  fontSize: "12px",
                  color: "#434343",
                  fontWeight: "500",
                }}
              >
                Enter Description
              </label>

              <div className="dropdown" id="AssignmentDescription">
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
                  onChange={(e) =>
                    handleAssignmentChange("description", e.target.value)
                  }
                  type="text"
                  placeholder="Enter Description"
                  aria-expanded="false"
                ></input>
              </div>
            </div>
            <div style={{ marginBottom: "23px", width: "50%" }}>
              <label
                htmlFor="AssignmentSubmitDate"
                className="form-label"
                style={{
                  fontSize: "12px",
                  color: "#434343",
                  fontWeight: "500",
                }}
              >
                Submit Date
              </label>

              <div id="AssignmentSubmitDate">
                <input
                  className=""
                  style={{
                    paddingLeft: "10px",
                    height: "46px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "transparent",
                    border: "1px solid #ECEDF1",
                    borderRadius: "8px",
                  }}
                  onChange={(e) =>
                    handleAssignmentChange("submit_date", e.target.value)
                  }
                  type="date"
                  aria-expanded="false"
                >
                  {/* {selectedTopic.name} */}
                </input>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", width: "100%", gap: "20px" }}>
            <div style={{ marginBottom: "23px", width: "50%" }}>
              <label
                htmlFor="AssignmentEvaluationDate"
                className="form-label"
                style={{
                  fontSize: "12px",
                  color: "#434343",
                  fontWeight: "500",
                }}
              >
                Evaluation Date
              </label>

              <div id="AssignmentEvaluationDate">
                <input
                  className=""
                  style={{
                    paddingLeft: "10px",
                    height: "46px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "transparent",
                    border: "1px solid #ECEDF1",
                    borderRadius: "8px",
                  }}
                  onChange={(e) =>
                    handleAssignmentChange("evaluation_date", e.target.value)
                  }
                  type="date"
                  aria-expanded="false"
                ></input>
              </div>
            </div>
            <div className="" style={{ marginBottom: "23px", width: "50%"  }}>
              <label
                htmlFor="AssignmentDocumentType"
                className="form-label"
                style={{
                  fontSize: "12px",
                  color: "#434343",
                  fontWeight: "500",
                }}
              >
                Document Type
              </label>
              <div
                id="AssignmentDocumentType"
                style={{
                  display: "flex",
                  padding: "13px 12px",
                  gap: "12px",
                  border: "1px solid #ECEDF1",
                  borderRadius: "8px",
                }}
              >
                <div
                  className="form-check"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <input
                    className="form-check-input"
                    type="radio"
                    name="PDF"
                    id="PDF"
                    value="PDF"
                    style={{ width: "15px", height: "15px" }}
                    onClick={(e) =>
                      handleAssignmentChange("document_type", e.target.value)
                    }
                  />
                  <label className="form-check-label" htmlFor="PDF">
                    PDF
                  </label>
                </div>
                <div
                  className="form-check"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "black",
                  }}
                >
                  <input
                    className="form-check-input"
                    type="radio"
                    name="image"
                    id="image"
                    value="Image"
                    style={{ width: "15px", height: "15px" }}
                    onClick={(e) =>
                      handleAssignmentChange("document_type", e.target.value)
                    }
                  />
                  <label className="form-check-label" htmlFor="image">
                    Image
                  </label>
                </div>
                <div
                  className="form-check"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <input
                    className="form-check-input"
                    type="radio"
                    name="Doc"
                    id="Doc"
                    value="Doc"
                    style={{ width: "15px", height: "15px" }}
                    onClick={(e) =>
                      handleAssignmentChange("document_type", e.target.value)
                    }
                  />
                  <label className="form-check-label" htmlFor="Doc">
                    Doc
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "23px", width: "100%" }}>
            <label
              htmlFor="AssignmentUploadFile"
              className="form-label"
              style={{
                fontSize: "12px",
                color: "#434343",
                fontWeight: "500",
              }}
            >
              Select File to Upload
            </label>
            <input
              className="form-control"
              id="AssignmentUploadFile"
              style={{
                border: "1px solid #ECEDF1",
                borderRadius: "8px",
                padding: "10px",
              }}
              onChange={(e) => handleAssignmentChange("file", e)}
              type="file"
            />
          </div>
          <div style={{ width: "17%" }}>
            <label
              htmlFor="AssignmentIsPublic"
              className="form-label"
              style={{
                fontSize: "12px",
                color: "#434343",
                fontWeight: "500",
              }}
            >
              Is Public
            </label>
            <div
              id="AssignmentIsPublic"
              style={{
                display: "flex",
                padding: "13px 12px",
                gap: "12px",
                border: "1px solid #ECEDF1",
                borderRadius: "8px",
              }}
            >
              <div
                className="form-check"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <input
                  className="form-check-input"
                  type="radio"
                  name="Yes"
                  id="Yes"
                  value="1"
                  style={{ width: "15px", height: "15px" }}
                  onClick={(e) =>
                    handleAssignmentChange("is_public", e.target.value)
                  }
                />
                <label className="form-check-label" htmlFor="Yes">
                  Yes
                </label>
              </div>
              <div
                className="form-check"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <input
                  className="form-check-input"
                  type="radio"
                  name="No"
                  id="No"
                  value="0"
                  style={{ width: "15px", height: "15px" }}
                  onClick={(e) =>
                    handleAssignmentChange("is_public", e.target.value)
                  }
                />
                <label className="form-check-label" htmlFor="No">
                  No
                </label>
              </div>
            </div>
          </div>

          {/* is Public */}
        </div>

        <div className="modal-footer border-0">
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
            onClick={handleSubmit}
          >
            <span
              style={{
                color: "#FFF",
                fontFamily: "Manrope",
                fontSize: "12px",
                fontWeight: "500",
              }}
            >
              Upload
            </span>
          </button>
        </div>
      </div>
    </Modal>,
    modalsRoot
  );
};

export { UploadAssignmentModal };
