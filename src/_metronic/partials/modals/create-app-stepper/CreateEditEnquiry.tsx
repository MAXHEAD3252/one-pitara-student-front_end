import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Modal } from "react-bootstrap";
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

    const fetchSource = async () => {
      const schoolId = currentUser?.school_id;
      if (!schoolId) return;

      try {
        const response = await fetch(
          `${DOMAIN}/api/staff/get-source?schoolId=${schoolId}`
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
          `${DOMAIN}/api/staff/getEnquiryById/${schoolId}/${enqId}`,
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
    // console.log(changedFields);
    // return;
    

    try {
      const response = await fetch(
        `${DOMAIN}/api/staff/updateEnquiryById/${schoolId}/${enquiry_id}`,
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
                    id="student_name"
                    name="student_name"
                    placeholder=""
                    value={formData.student_name}
                    onChange={handleChange}
                  />
                  <label htmlFor="admissstudent_nameion_no">Name</label>
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
                    id="student_phone"
                    name="student_phone"
                    placeholder=""
                    value={formData.student_phone}
                    onChange={handleChange}
                  />
                  <label htmlFor="contstudent_phoneact">Contact no</label>
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
                    id="student_address"
                    name="student_address"
                    placeholder=""
                    value={formData.student_address}
                    onChange={handleChange}
                  />
                  <label htmlFor="student_address">Address</label>
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
                    id="student_email"
                    name="student_email"
                    placeholder=""
                    value={formData?.student_email}
                    onChange={handleChange}
                  />
                  <label htmlFor="student_email">E-Mail</label>
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
                    <option value="reference">
                      {formData.reference
                        ? formData.reference
                        : "Selecr Reference"}
                    </option>
                    {reference.map((value) => (
                      <option
                        key={value.id}
                        value={`${value.id}:${value.reference}`}
                      >
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
                    <option value="">
                      {formData.source ? formData.source : "Selecr Source"}
                    </option>
                    {source.map((value) => (
                      <option
                        key={value.id}
                        value={`${value.id}:${value.source}`}
                      >
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
                    id="follow_up_date"
                    name="follow_up_date"
                    placeholder=""
                    /* @ts-ignore */
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
                  <select
                    className="form-control"
                    id="enquiry_type"
                    name="enquiry_type"
                    value={formData.enquiry_type}
                    onChange={handleChange}
                  >
                    <option value="general">General</option>
                    <option value="admission">Admission</option>
                  </select>
                  <label htmlFor="enquiry_type">Enquiry Type</label>
                </div>
              </div>
              {/* row end */}
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
              {/* row start */}

              {formData.enquiry_type === "admission" && (
                <>
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
                        <option value="class">
                          {formData.class ? formData.class : "Selecr Class"}
                        </option>
                        {classes.map((value) => (
                          <option
                            key={value.id}
                            value={`${value.id}:${value.class}`}
                          >
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
                      <input
                        type="date"
                        className="form-control"
                        id="date_of_birth"
                        name="date_of_birth"
                        placeholder=""
                        /* @ts-ignore */
                        value={formData.date_of_birth}
                        onChange={handleChange}
                      />
                      <label htmlFor="date_of_birth">Date_of_birth</label>
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
                  </div>
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
                        id="academic_year"
                        name="academic_year"
                        aria-label="Default select example"
                        value={formData.academic_year}
                        onChange={handleChange}
                      >
                        <option value="academic_year">
                          {formData.academic_year
                            ? formData.academic_year
                            : "Selecr Session"}
                        </option>
                        {sessions.map((value) => (
                          <option
                            key={value.id}
                            value={`${value.id}:${value.session}`}
                          >
                            {value.session}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="academic_year">Academic_year</label>
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
                        id="father_phone"
                        name="father_phone"
                        placeholder=""
                        value={formData.father_phone}
                        onChange={handleChange}
                      />
                      <label htmlFor="father_phone">Father contact no</label>
                    </div>
                  </div>
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
                        id="mother_name"
                        name="mother_name"
                        placeholder=""
                        value={formData.mother_name}
                        onChange={handleChange}
                      />
                      <label htmlFor="mother_name">Mother name</label>
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
                        id="mother_phone"
                        name="mother_phone"
                        placeholder=""
                        value={formData.mother_phone}
                        onChange={handleChange}
                      />
                      <label htmlFor="mother_phone">
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
                        id="current_school"
                        name="current_school"
                        placeholder=""
                        value={formData.current_school}
                        onChange={handleChange}
                      />
                      <label htmlFor="current_school">Current_school</label>
                    </div>
                  </div>
                </>
              )}
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
