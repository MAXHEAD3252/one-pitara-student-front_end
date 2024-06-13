import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Modal } from "react-bootstrap";
import { useAuth } from "../../../../app/modules/auth/core/Auth";
// import "./Style.css";

type Props = {
  show: boolean;
  handleClose: () => void;
  enqId: number;
  // refresh: (refresh: boolean) => void;
};

const modalsRoot = document.getElementById("root-modals") || document.body;

const CreateEditEnquiry = ({ show, handleClose, enqId }: Props) => {
  const { currentUser } = useAuth();

  const schoolId = currentUser?.school_id;

  const [data, setData] = useState({});
  const [source, setSource] = useState([]);
  const [reference, setReference] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [changedFields, setChangedFields] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    address: "",
    date: "",
    reference_id: "",
    status: "",
    gender: "",
    current_school: "",
    academic_year: "",
    date_of_birth: "",
    email: "",
    class_id: "",
    source_id: "",
    follow_up_date: "",
    father_name: "",
    father_contact_number: "",
    father_occupation: "",
    father_type_of_work: "",
    father_organization: "",
    mother_name: "",
    mother_contact_number: "",
    mother_occupation: "",
    mother_organization: "",
    description: "",
    note: "",
  });


  useEffect(() => {
    const fetchClasses = async () => {
      const schoolId = currentUser?.school_id;
      if (!schoolId) return;

      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/staff/get-classes?schoolId=${schoolId}`
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
          `http://127.0.0.1:5000/api/staff/get-source?schoolId=${schoolId}`
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
          `http://127.0.0.1:5000/api/staff/get-reference?schoolId=${schoolId}`
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
          `http://127.0.0.1:5000/api/staff/get-session?schoolId=${schoolId}`
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



  const formatDateToYYYYMMDD = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
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
          `http://127.0.0.1:5000/api/staff/getEnquiryById/${schoolId}/${enqId}`,
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
        const follow_up_date = data?.[0]?.follow_up_date
          ? formatDateToYYYYMMDD(data[0].follow_up_date)
          : "";
        const date_of_birth = data?.[0]?.follow_up_date
          ? formatDateToYYYYMMDD(data[0].follow_up_date)
          : "";

        setFormData({
          name: data[0]?.name || "",
          father_organization: data[0]?.father_organization || "",

          contact: data[0]?.contact || "",
          mother_name: data[0]?.mother_name || "",
          mother_contact_number: data[0]?.mother_contact_number || "",
          mother_occupation: data[0]?.mother_occupation || "",
          mother_organization: data[0]?.mother_organization || "",

          description: data[0]?.description || "",
          note: data[0]?.note || "",
          address: data[0]?.address || "",
          date: data[0]?.date || "",
          reference: data[0]?.reference || "",
          status: data[0]?.status || "",
          date_of_birth: date_of_birth || "",
          father_contact_number: data[0]?.father_contact_number || "",
          current_school: data[0]?.current_school || "",
          gender: data[0]?.gender || "",

          father_type_of_work: data[0]?.father_type_of_work || "",
          academic_year: data[0]?.academic_year || "",

          father_name: data[0]?.father_name || "",
          father_occupation: data[0]?.father_occupation || "",
          email: data[0]?.email || "",
          class: data[0]?.class || "",
          source: data[0]?.source || "",
          follow_up_date: follow_up_date || "",
        });
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };

    fetchById();
  }, [schoolId, enqId]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = enqId;

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/staff/updateEnquiryById/${schoolId}/${id}`,
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
      console.log("Student info edited successfully:", data);
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
            Edit Enquiry
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
          <form onSubmit={handleSubmit}>
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
                    id="reference_id"
                    name="reference_id"
                    aria-label="Default select example"
                    value={formData.reference_id}
                    onChange={handleChange}
                  >
                    {!reference.some(
                      (value) => value.id === formData.reference_id
                    ) && (
                      <option value={formData.reference_id}>
                        {formData.reference}
                      </option>
                    )}

                    {reference.map((value) => (
                      <option key={value.id} value={value.id}>
                        {value.reference}
                      </option>
                    ))}
                  </select>

                  <label htmlFor="reference_id">Select Reference</label>
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
                    id="source_id"
                    name="source_id"
                    aria-label="Default select example"
                    value={formData.source_id}
                    onChange={handleChange}
                  >
                    {!source.some((value) => value.id === formData.source_id) && (
                      <option value={formData.source_id}>{formData.source_id}</option>
                    )}{" "}
                    {source.map((value) => (
                      <option key={value.id} value={value.id}>
                        {value.source}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="source_id">Select Source</label>
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
                    id="class_id"
                    name="class_id"
                    aria-label="Default select example"
                    value={formData.class_id}
                    onChange={handleChange}
                  >
                    {classes.map((value) => (
                      <option key={value.id} value={value.id}>
                        {value.class}
                      </option>
                    ))}
                  </select>

                  <label htmlFor="class_id">Select Class</label>
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
                    <option defaultChecked disabled>
                      Gender
                    </option>
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
                    {!sessions.some(
                      (value) => value.id === formData.academic_year
                    ) && (
                      <option value={formData.academic_year}>
                        {formData.academic_year}
                      </option>
                    )}
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

export { CreateEditEnquiry };
