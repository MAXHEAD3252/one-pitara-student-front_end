import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Modal } from "react-bootstrap";
import { useAuth } from "../../../../app/modules/auth/core/Auth";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";
// import "./Style.css";

type Props = {
  show: boolean;
  handleClose: () => void;
  // refresh: (refresh: boolean) => void;
};

const modalsRoot = document.getElementById("root-modals") || document.body;

const CreateWalkinEnquiry = ({ show, handleClose }: Props) => {
  const { currentUser } = useAuth();
  // console.log(currentUser);

  const schoolId = currentUser?.school_id;
  // const [sections, setSections] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sessions, setSessions] = useState([]);
  
  const [source, setSource] = useState([]);
  const [reference, setReference] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    address: "",
    reference: "",
    source: "",
    email: "",
    class: "",
    status: "",
    date_of_birth: "",
    gender: "",
    current_school: "",
    father_name: "",
    father_contact_number: "",
    father_occupation: "",
    father_type_of_work: "",
    father_organization: "",
    mother_name: "",
    mother_contact_number: "",
    mother_occupation: "",
    mother_organization: "",
    academic_year: "",
    description: "",
    follow_up_date: "",
    note: "",
    school_id: schoolId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // useEffect(() => {
  //   const fetchSections = async () => {
  //     if (!formData.class) return;

  //     const schoolId = currentUser?.school_id;
  //     try {
  //       const response = await fetch(
  //         `${DOMAIN}/api/staff/get-sections?schoolId=${schoolId}&classId=${formData.class}`
  //       );
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       setSections(data);
  //     } catch (error) {
  //       console.error("Error fetching sections:", error);
  //     }
  //   };

  //   fetchSections();
  // }, [formData.class]);

  useEffect(() => {
    const fetchClasses = async () => {
      const schoolId = currentUser?.school_id;
      if (!schoolId) return;

      try {
        const response = await fetch(
          `${DOMAIN}/api/staff/get-classes?schoolId=${schoolId}`
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
          `${DOMAIN}/api/staff/get-reference?schoolId=${schoolId}`
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
          `${DOMAIN}/api/staff/get-source?schoolId=${schoolId}`
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
          `${DOMAIN}/api/staff/get-session?schoolId=${schoolId}`
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


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${DOMAIN}/api/staff/walkinEnquiry/${schoolId}`,
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
      handleClose();
      // refresh(true);
    } catch (error) {
      console.error("Error creating student:", error);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(formData)
  //   console.log(schoolId);
    
    
  //   try {
  //     const response = await fetch(
  //       `${DOMAIN}/api/staff/walkinEnquiry/:${schoolId}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           formData,
  //         }),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to create student");
  //     }

  //     const data = await response.json();
  //     console.log("Student created successfully:", data);
  //     handleClose();
  //     // refresh(true);
  //   } catch (error) {
  //     console.error("Error creating student:", error);
  //   }
  // };

  return createPortal(
    <Modal
      id="kt_modal_create_app"
      tabIndex={-1}
      size="lg"
      aria-hidden="true"
      dialogClassName="modal-dialog modal-dialog-centered mw-1000px"
      show={show}
      onHide={handleClose}
      // fullscreen={true}
    >
      <div
        className="modal-content"
        style={{ padding: "20px 5px", borderRadius: "17px" }}
      >
        <div
          className="modal-header border-0"
          style={{ width: "100%", height: "27px" }}
        >
          <span
            className=""
            id="staticBackdropLabel"
            style={{
              justifyContent: "center",
              textAlign: "center",
              alignItems: "center",
              fontSize: "24px",
              fontWeight: "600",
              fontFamily: "Manrope",
            }}
          >
            WalkIn Enquiry
          </span>

          <span
            data-bs-dismiss="modal"
            onClick={handleClose}
            aria-label="Close"
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
        <hr></hr>

        <div className="modal-body" style={{ justifyContent: "center" }}>
          <form action="/" method="post" onSubmit={handleSubmit}>
            <div style={{ marginBottom: "23px" }}>
              {/* row start */}
              <div
                className="fv-row mb-10"
                style={{ display: "flex", gap: "10px" }}
              >
                <div
                  className="form-floating mb-3"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder=""
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <label htmlFor="admission_no">Name</label>
                </div>
                <div
                  className="form-floating mb-3"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <input
                    type="tel"
                    className="form-control"
                    id="contact"
                    name="contact"
                    placeholder=""
                    value={formData.contact}
                    onChange={handleChange}
                  />
                  <label htmlFor="contact">Contact no</label>
                </div>
                <div
                  className="form-floating mb-3"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    placeholder=""
                    value={formData.address}
                    onChange={handleChange}
                  />
                  <label htmlFor="address">Address</label>
                </div>
              </div>
              {/* row end */}

              {/* row start */}
              <div
                className="fv-row mb-10"
                style={{ display: "flex", gap: "10px" }}
              >
                <div
                  className="form-floating mb-3"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder=""
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <label htmlFor="admission_no">E-Mail</label>
                </div>
                <div
                  className="form-floating mb-3"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <select
                    className="form-select"
                    id="reference"
                    name="reference"
                    aria-label="Default select example"
                    value={formData.reference}
                    onChange={handleChange}
                  >
                    <option value="reference">Reference</option>
                    {reference.map((value) => (
                      <option key={value.id} value={value.id}>
                        {value.reference}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="reference">Select Reference</label>
                </div>
                <div
                  className="form-floating mb-3"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <select
                    className="form-select"
                    id="source"
                    name="source"
                    aria-label="Default select example"
                    value={formData.source}
                    onChange={handleChange}
                  >
                    <option value="source">Source</option>
                    {source.map((value) => (
                      <option key={value.id} value={value.id}>
                        {value.source}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="source">Select Source</label>
                </div>
              </div>
              {/* row end */}

              {/* row start */}
              <div
                className="fv-row mb-10"
                style={{ display: "flex", gap: "10px" }}
              >
                <div
                  className="form-floating mb-3"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <select
                    className="form-select"
                    id="class"
                    name="class"
                    aria-label="Default select example"
                    value={formData.class}
                    onChange={handleChange}
                  >
                    <option value="class">Class</option>
                    {classes.map((value) => (
                      <option key={value.id} value={value.id}>
                        {value.class}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="Class">Select Class</label>
                </div>
                <div
                  className="form-floating mb-3"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <select
                    className="form-select"
                    id="status"
                    name="status"
                    aria-label="Default select example"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="active">Active</option>
                    <option value="dead">Dead</option>
                    <option value="lost">Lost</option>
                    <option value="won">Won</option>
                    {/* {classes.map((value) => (
                      <option key={value.id} value={value.id}>
                        {value.reference}
                      </option>
                    ))} */}
                  </select>
                  <label htmlFor="Status">Status</label>
                </div>
                <div
                  className="form-floating mb-3"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <input
                    type="date"
                    className="form-control"
                    id="date_of_birth"
                    name="date_of_birth"
                    placeholder=""
                    value={formData.date_of_birth}
                    onChange={handleChange}
                  />
                  <label htmlFor="date_of_birth">Date_of_birth</label>
                </div>
              </div>
              {/* row end */}

              {/* row start */}
              <div
                className="fv-row mb-10"
                style={{ display: "flex", gap: "10px" }}
              >
                <div
                  className="form-floating mb-3"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <select
                    className="form-select"
                    id="gender"
                    name="gender"
                    aria-label="Default select example"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option defaultChecked disabled>Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    {/* {classes.map((value) => (
                      <option key={value.id} value={value.id}>
                        {value.reference}
                      </option>
                    ))} */}
                  </select>
                  <label htmlFor="gender">Select Gender</label>
                </div>
                <div
                  className="form-floating mb-3"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <input
                    type="text"
                    className="form-control"
                    id="current_school"
                    name="current_school"
                    placeholder=""
                    value={formData.current_school}
                    onChange={handleChange}
                  />
                  <label htmlFor="current_school">Current_school</label>
                </div>
                <div
                  className="form-floating mb-3"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <select
                    className="form-select"
                    id="academic_year"
                    name="academic_year"
                    aria-label="Default select example"
                    value={formData.academic_year}
                    onChange={handleChange}
                  >
                    <option value="academic_year">Academic_year</option>
                    {sessions.map((value) => (
                      <option key={value.id} value={value.id}>
                        {value.session}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="academic_year">Academic_year</label>
                </div>
              </div>
              {/* row end */}

              {/* row start */}
              <div
                className="fv-row mb-10"
                style={{ display: "flex", gap: "10px" }}
              >
                <div
                  className="form-floating mb-3"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <input
                    type="text"
                    className="form-control"
                    id="father_name"
                    name="father_name"
                    placeholder=""
                    value={formData.father_name}
                    onChange={handleChange}
                  />
                  <label htmlFor="father_name">Father name</label>
                </div>
                <div
                  className="form-floating mb-3"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <input
                    type="tel"
                    className="form-control"
                    id="father_contact_number"
                    name="father_contact_number"
                    placeholder=""
                    value={formData.father_contact_number}
                    onChange={handleChange}
                  />
                  <label htmlFor="father_contact_number">
                    Father contact no
                  </label>
                </div>
                <div
                  className="form-floating mb-3"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <input
                    type="text"
                    className="form-control"
                    id="father_occupation"
                    name="father_occupation"
                    placeholder=""
                    value={formData.father_occupation}
                    onChange={handleChange}
                  />
                  <label htmlFor="father_occupation">Father occupation</label>
                </div>
              </div>
              {/* row end */}

              {/* row start */}
              <div
                className="fv-row mb-10"
                style={{ display: "flex", gap: "10px" }}
              >
                <div
                  className="form-floating mb-3"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <input
                    type="text"
                    className="form-control"
                    id="father_type_of_work"
                    name="father_type_of_work"
                    placeholder=""
                    value={formData.father_type_of_work}
                    onChange={handleChange}
                  />
                  <label htmlFor="father_type_of_work">
                    Father type of work
                  </label>
                </div>
                <div
                  className="form-floating mb-3"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <input
                    type="text"
                    className="form-control"
                    id="father_organization"
                    name="father_organization"
                    placeholder=""
                    value={formData.father_organization}
                    onChange={handleChange}
                  />
                  <label htmlFor="father_organization">
                    Father organization
                  </label>
                </div>
                <div
                  className="form-floating mb-3"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <input
                    type="text"
                    className="form-control"
                    id="mother_name"
                    name="mother_name"
                    placeholder=""
                    value={formData.mother_name}
                    onChange={handleChange}
                  />
                  <label htmlFor="mother_name">Mother name</label>
                </div>
              </div>
              {/* row end */}

              {/* row start */}
              <div
                className="fv-row mb-10"
                style={{ display: "flex", gap: "10px" }}
              >
                <div
                  className="form-floating mb-3"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <input
                    type="tel"
                    className="form-control"
                    id="mother_contact_number"
                    name="mother_contact_number"
                    placeholder=""
                    value={formData.mother_contact_number}
                    onChange={handleChange}
                  />
                  <label htmlFor="mother_contact_number">
                    Mother contact number
                  </label>
                </div>
                <div
                  className="form-floating mb-3"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <input
                    type="text"
                    className="form-control"
                    id="mother_occupation"
                    name="mother_occupation"
                    placeholder=""
                    value={formData.mother_occupation}
                    onChange={handleChange}
                  />
                  <label htmlFor="mother_occupation">Mother occupation</label>
                </div>
                <div
                  className="form-floating mb-3"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <input
                    type="text"
                    className="form-control"
                    id="mother_organization"
                    name="mother_organization"
                    placeholder=""
                    value={formData.mother_organization}
                    onChange={handleChange}
                  />
                  <label htmlFor="mother_organization">
                    Mother organization
                  </label>
                </div>
              </div>
              {/* row end */}

              {/* row start */}
              <div
                className="fv-row mb-10"
                style={{ display: "flex", gap: "10px" }}
              >
                <div
                  className="form-floating mb-3"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <input
                    type="date"
                    className="form-control"
                    id="follow_up_date"
                    name="follow_up_date"
                    placeholder=""
                    value={formData.follow_up_date}
                    onChange={handleChange}
                  />
                  <label htmlFor="follow_up_date">Follow up date</label>
                </div>
                <div
                  className="form-floating mb-3"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    placeholder=""
                    value={formData.description}
                    onChange={handleChange}
                  />
                  <label htmlFor="description">Description</label>
                </div>
                <div
                  className="form-floating mb-3"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <input
                    type="text"
                    className="form-control"
                    id="note"
                    name="note"
                    placeholder=""
                    value={formData.note}
                    onChange={handleChange}
                  />
                  <label htmlFor="note">Note</label>
                </div>
              </div>
              {/* row end */}

              <div style={{ display: "flex", justifyContent: "end" }}>
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>,
    modalsRoot
  );
};

export { CreateWalkinEnquiry };
