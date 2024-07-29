/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Modal } from "react-bootstrap";
import { useAuth } from "../../../../app/modules/auth/core/Auth";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";
import axios from "axios";
// import "./Style.css";

type Props = {
  show: boolean;
  handleClose: () => void;
  enqId: string | undefined;
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

interface Data {
  enquiry_id: string;
  name: string;
  contact: string;
  state: string;
  city: string;
  pincode: string;
  religion: string;
  aadhaar_no: string;
  reference_id: string;
  date: string;
  description: string;
  follow_up_date: string;
  note: string;
  source_id: string;
  email: string;
  status: string;
  enquiry_type: string;
  class_id: string;
  gender: string;
  date_of_birth: string;
  current_school: string;
  academic_year: string;
  father_name: string;
  father_contact_number: string;
  father_occupation: string;
  father_type_of_work: string;
  father_organization: string;
  mother_name: string;
  mother_contact_number: string;
  mother_occupation: string;
  mother_organization: string;
  bank_name: string;
  back_account_no: string;
  ifsc_code: string;
  gardian_name: string;
  gardian_contact_number: string;
  gardian_occupation: string;
  gardian_relation: string;
  gardian_address: string;
}

const CreateStartAdmissionProcess = ({ show, handleClose, enqId }: Props) => {
  const { currentUser } = useAuth();

  const schoolId = currentUser?.school_id;

  // const [data, setData] = useState({});
  const [source, setSource] = useState<Source[]>([]);
  const [reference, setReference] = useState<Reference[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  // const [changedFields, setChangedFields] = useState({});

  const stepNames = ["Admission Form", "Review Status", "Fees"];
  const [currentStep, setCurrentStep] = useState(1);
  const [reviewStatus, setReviewStatus] = useState(1);

  const [pic_data, set_pic_data] = useState({
    student_pic: null,
    father_pic: null,
    mother_pic: null,
    gardian_pic: null,
  });

  const [data, setData] = useState<Data>({
    enquiry_id: "",
    name: "",
    contact: "",
    state: "",
    city: "",
    pincode: "",
    religion: "",
    aadhaar_no: "",
    reference_id: "",
    date: "",
    description: "",
    follow_up_date: "",
    note: "",
    source_id: "",
    email: "",
    status: "",
    enquiry_type: "",
    class_id: "",
    gender: "",
    date_of_birth: "",
    current_school: "",
    academic_year: "",
    father_name: "",
    father_contact_number: "",
    father_occupation: "",
    father_type_of_work: "",
    father_organization: "",
    mother_name: "",
    mother_contact_number: "",
    mother_occupation: "",
    mother_organization: "",
    bank_name: "",
    back_account_no: "",
    ifsc_code: "",
    gardian_name: "",
    gardian_contact_number: "",
    gardian_occupation: "",
    gardian_relation: "",
    gardian_address: "",
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
      const enquiry_id = enqId;

      try {
        const response = await fetch(
          `${DOMAIN}/api/staff/getEnquiryById/${schoolId}/${enquiry_id}`,
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

        setData({
          enquiry_id: data[0]?.enqId || "",
          name: data[0]?.student_name || "",
          contact: data[0]?.student_phone || "",
          mother_name: data[0]?.mother_name || "",
          mother_contact_number: data[0]?.mother_phone || "",
          mother_organization: data[0]?.mother_organization || "",
          mother_occupation: data[0]?.mother_occupation || "",
          description: data[0]?.description || "",
          note: data[0]?.note || "",
          state: data[0]?.state || "",
          city: data[0]?.city || "",
          pincode: data[0]?.pincode || "",
          religion: data[0]?.religion || "",
          aadhaar_no: data[0]?.aadhaar_no || "",
          date: data[0]?.date || "",
          reference_id: data[0]?.reference_id || "",
          status: data[0]?.status || "",
          date_of_birth: dateOfBirth,
          father_contact_number: data[0]?.father_phone || "",
          current_school: data[0]?.current_school || "",
          gender: data[0]?.gender || "",
          academic_year: data[0]?.academic_year || "",
          father_name: data[0]?.father_name || "",
          father_occupation: data[0]?.father_occupation || "",
          father_type_of_work: data[0]?.father_type_of_work || "",
          father_organization: data[0]?.father_organization || "",
          email: data[0]?.student_email || "",
          class_id: data[0]?.class_id || "",
          source_id: data[0]?.source_id || "",
          follow_up_date: followUpDate,
          enquiry_type: data[0]?.enquiry_type,
          bank_name: data[0]?.bank_name || "",
          back_account_no: data[0]?.back_account_no || "",
          ifsc_code: data[0]?.ifsc_code || "",
          gardian_name: data[0]?.gardian_name || "",
          gardian_contact_number: data[0]?.gardian_phone || "",
          gardian_occupation: data[0]?.gardian_occupation || "",
          gardian_relation: data[0]?.gardian_relation || "",
          gardian_address: data[0]?.gardian_address || "",
        });
      } catch (error) {
        console.error("Error fetching enquiry details:", error);
      }
    };

    fetchById();
  }, [schoolId, enqId]);

  /* @ts-ignore */
  const handleChange = (key, value, type) => {
  
    if (type === "file") {
      set_pic_data((prevPicData) => ({
        ...prevPicData,
        [key]:  value.target.files[0],
      }));
    } else {
      setData((prevFormData) => ({
        ...prevFormData,
        [key]: value,
      }));
    }
  };
  

  /* @ts-ignore */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData();
    // Append data state
    formData.append("enquiry_id", data.enquiry_id);
    formData.append("name", data.name);
    formData.append("contact", data.contact);
    formData.append("state", data.state);
    formData.append("city", data.city);
    formData.append("pincode", data.pincode);
    formData.append("religion", data.religion);
    formData.append("aadhaar_no", data.aadhaar_no);
    formData.append("reference_id", data.reference_id);
    formData.append("date", data.date);
    formData.append("description", data.description);
    formData.append("follow_up_date", data.follow_up_date);
    formData.append("note", data.note);
    formData.append("source_id", data.source_id);
    formData.append("email", data.email);
    formData.append("status", data.status);
    formData.append("enquiry_type", data.enquiry_type);
    formData.append("class_id", data.class_id);
    formData.append("gender", data.gender);
    formData.append("date_of_birth", data.date_of_birth);
    formData.append("current_school", data.current_school);
    formData.append("academic_year", data.academic_year);
    formData.append("father_name", data.father_name);
    formData.append("father_contact_number", data.father_contact_number);
    formData.append("father_occupation", data.father_occupation);
    formData.append("father_type_of_work", data.father_type_of_work);
    formData.append("father_organization", data.father_organization);
    formData.append("mother_name", data.mother_name);
    formData.append("mother_contact_number", data.mother_contact_number);
    formData.append("mother_occupation", data.mother_occupation);
    formData.append("mother_organization", data.mother_organization);
    formData.append("bank_name", data.bank_name);
    formData.append("back_account_no", data.back_account_no);
    formData.append("ifsc_code", data.ifsc_code);
    formData.append("gardian_name", data.gardian_name);
    formData.append("gardian_contact_number", data.gardian_contact_number);
    formData.append("gardian_occupation", data.gardian_occupation);
    formData.append("gardian_relation", data.gardian_relation);
    formData.append("gardian_address", data.gardian_address);

    // Append pic_data state
    if (pic_data.student_pic)
      formData.append("student_pic", pic_data.student_pic);
    if (pic_data.father_pic) formData.append("father_pic", pic_data.father_pic);
    if (pic_data.mother_pic) formData.append("mother_pic", pic_data.mother_pic);
    if (pic_data.gardian_pic)
      formData.append("gardian_pic", pic_data.gardian_pic);

    console.log(formData);
    return;
    
    try {
      const response = await axios.post(
        `${DOMAIN}/api/staff/upload-application`,
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

  // const [formSubmitted, setFormSubmitted] = useState(false);
  // const [apiFetchStatus, setApiFetchStatus] = useState(false);

  /* @ts-ignore */
  const handleNextStep = () => {
    if (currentStep < stepNames.length) {
      setCurrentStep((prevStep) => Math.min(prevStep + 1, stepNames.length));
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
    }
  };

  const handleStepChange = (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // Prevent default form submission

    if (currentStep === stepNames.length) {
      handleSubmit(e); // Submit form data when on the last step
    } else {
      handleNextStep(); // Move to the next step
    }
  };

  // Adjust progress calculation to start at 5% and end at 100%
  const minProgress = 5; // Starting progress percentage
  const maxProgress = 100; // Maximum progress percentage
  const progress =
    minProgress +
    ((currentStep - 1) / (stepNames.length - 1)) * (maxProgress - minProgress);

  return createPortal(
    <Modal
      id="kt_modal_create_app"
      tabIndex={-1}
      size="lg"
      aria-hidden="true"
      dialogClassName="modal-dialog modal-dialog-centered mw-1000px"
      show={show}
      onHide={handleClose}
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
            Start Admission Process
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
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        <hr />
        <div
          className="modal-body"
          style={{
            height: "20px",
            justifyContent: "space-around",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          {stepNames.map((step, index) => (
            <span
              key={index}
              style={{
                color: currentStep === index + 1 ? "black" : "gray",
                fontSize: "20px",
              }}
            >
              {step}
            </span>
          ))}
        </div>
        <div className="modal-body" style={{ justifyContent: "center" }}>
          <div
            className="progress"
            style={{ height: "20px", marginBottom: "20px" }}
          >
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${progress}%` }}
              aria-valuenow={currentStep}
              aria-valuemin={1}
              aria-valuemax={stepNames.length}
            ></div>
          </div>

          <form onSubmit={handleStepChange}>
            {currentStep === 1 && (
              <div
                style={{
                  marginBottom: "23px",
                  overflowY: "scroll",
                  height: "500px",
                }}
              >
                <div
                  className="head"
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <span
                    className=""
                    id="staticBackdropLabel"
                    style={{
                      justifyContent: "center",
                      textAlign: "center",
                      alignItems: "center",
                      fontSize: "20px",
                      fontWeight: "600",
                      fontFamily: "Manrope",
                    }}
                  >
                    Student Information
                  </span>
                </div>
                <hr style={{ marginBottom: "30px" }} />
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
                      value={data.name}
                      onChange={(e)=>handleChange('name', e.target.value,'text')}
                    />
                    <label htmlFor="name">Name</label>
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
                      value={data.contact}
                      onChange={(e)=>handleChange('contact', e.target.value,'text')}
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
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder=""
                      value={data.email}
                      onChange={(e)=>handleChange('email', e.target.value,'text')}
                    />
                    <label htmlFor="admission_no">E-Mail</label>
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
                      id="state"
                      name="state"
                      placeholder=""
                      value={data.state}
                      onChange={(e)=>handleChange('state', e.target.value,'text')}
                    />
                    <label htmlFor="state">State</label>
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
                      id="city"
                      name="city"
                      placeholder=""
                      value={data.city}
                      onChange={(e)=>handleChange('city', e.target.value,'text')}
                    />
                    <label htmlFor="city">City</label>
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
                      id="pincode"
                      name="pincode"
                      placeholder=""
                      value={data.pincode}
                      onChange={(e)=>handleChange('pincode', e.target.value,'text')}
                    />
                    <label htmlFor="pincode">Pincode</label>
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
                      id="religion"
                      name="religion"
                      placeholder=""
                      value={data.religion}
                      onChange={(e)=>handleChange('religion', e.target.value,'text')}
                    />
                    <label htmlFor="religion">Religion</label>
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
                      value={data.gender}
                      onChange={(e)=>handleChange('gender', e.target.value,'text')}
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
                      value={data.current_school}
                      onChange={(e)=>handleChange('current_school', e.target.value,'text')}
                    />
                    <label htmlFor="current_school">Current_school</label>
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
                      type="date"
                      className="form-control"
                      id="date_of_birth"
                      name="date_of_birth"
                      placeholder=""
                      value={data.date_of_birth}
                      onChange={(e)=>handleChange('date_of_birth', e.target.value,'text')}
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
                    <input
                      type="text"
                      className="form-control"
                      id="aadhaar_no"
                      name="aadhaar_no"
                      placeholder=""
                      value={data.aadhaar_no}
                      onChange={(e)=>handleChange('aadhar_no', e.target.value,'text')}
                    />
                    <label htmlFor="aadhaar_no">Aadhaar No</label>
                  </div>
                </div>

                <div
                  className="fv-row mb-10"
                  style={{ display: "flex", gap: "10px" }}
                >
                  <div style={{ marginBottom: "23px", width: "50%" }}>
                    <label
                      htmlFor="student_image"
                      className="form-label"
                      style={{
                        fontSize: "12px",
                        color: "#434343",
                        fontWeight: "500",
                      }}
                    >
                      Upload Student Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="student_pic"
                      placeholder="Upload Student Image"
                      onChange={(e)=>handleChange('student_pic', e,'file')}
                      style={{
                        border: "1px solid #ECEDF1",
                        borderRadius: "8px",
                        padding: "10px",
                      }}
                    />
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
                      value={data.academic_year}
                      onChange={(e)=>handleChange('academic_year', e.target.value,'text')}
                    >
                      {!sessions.some(
                        (value) => value.id === data.academic_year
                      ) && (
                        <option value={data.academic_year}>
                          {data.academic_year}
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
                      id="reference_id"
                      name="reference_id"
                      aria-label="Default select example"
                      value={data.reference_id}
                      onChange={(e)=>handleChange('reference_id', e.target.value,'text')}
                    >
                      {!reference.some(
                        (value) => value.id === data.reference_id
                      ) && (
                        <option value={data.reference_id}>
                          {data.reference_id}
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
                      value={data.source_id}
                      onChange={(e)=>handleChange('source_id', e.target.value,'text')}
                    >
                      {!source.some((value) => value.id === data.source_id) && (
                        <option value={data.source_id}>{data.source_id}</option>
                      )}{" "}
                      {source.map((value) => (
                        <option key={value.id} value={value.id}>
                          {value.source}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="source_id">Select Source</label>
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
                      id="class_id"
                      name="class_id"
                      aria-label="Default select example"
                      value={data.class_id}
                      onChange={(e)=>handleChange('class_id', e.target.value,'text')}
                    >
                      {classes.map((value) => (
                        <option key={value.id} value={value.id}>
                          {value.class}
                        </option>
                      ))}
                    </select>

                    <label htmlFor="class_id">Select Class</label>
                  </div>
                </div>

                <div
                  className="head"
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <span
                    className=""
                    id="staticBackdropLabel"
                    style={{
                      justifyContent: "center",
                      textAlign: "center",
                      alignItems: "center",
                      fontSize: "20px",
                      fontWeight: "600",
                      fontFamily: "Manrope",
                    }}
                  >
                    Family Information
                  </span>
                </div>
                <hr style={{ marginBottom: "30px" }} />

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
                      value={data.father_name}
                      onChange={(e)=>handleChange('father_name', e.target.value,'text')}
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
                      value={data.father_contact_number}
                      onChange={(e)=>handleChange('father_contact_number', e.target.value,'text')}
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
                      value={data.father_occupation}
                      onChange={(e)=>handleChange('father_occupation', e.target.value,'text')}
                    />
                    <label htmlFor="father_occupation">Father occupation</label>
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
                      id="father_type_of_work"
                      name="father_type_of_work"
                      placeholder=""
                      value={data.father_type_of_work}
                      onChange={(e)=>handleChange('father_type_of_work', e.target.value,'text')}

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
                      value={data.father_organization}
                      onChange={(e)=>handleChange('father_organization', e.target.value,'text')}
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
                      value={data.mother_name}
                      onChange={(e)=>handleChange('mother_name', e.target.value,'text')}
                    />
                    <label htmlFor="mother_name">Mother name</label>
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
                      type="tel"
                      className="form-control"
                      id="mother_contact_number"
                      name="mother_contact_number"
                      placeholder=""
                      value={data.mother_contact_number}
                      onChange={(e)=>handleChange('mother_contact_number', e.target.value,'text')}
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
                      value={data.mother_occupation}
                      onChange={(e)=>handleChange('mother_occupation', e.target.value,'text')}
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
                      value={data.mother_organization}
                      onChange={(e)=>handleChange('mother_organization', e.target.value,'text')}
                    />
                    <label htmlFor="mother_organization">
                      Mother organization
                    </label>
                  </div>
                </div>

                <div
                  className="fv-row mb-10"
                  style={{ display: "flex", gap: "10px" }}
                >
                  <div style={{ marginBottom: "23px", width: "50%" }}>
                    <label
                      htmlFor="student_image"
                      className="form-label"
                      style={{
                        fontSize: "12px",
                        color: "#434343",
                        fontWeight: "500",
                      }}
                    >
                      Upload Father Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="father_image"
                      onChange={(e)=>handleChange('father_pic', e,'file')}
                      style={{
                        border: "1px solid #ECEDF1",
                        borderRadius: "8px",
                        padding: "10px",
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: "23px", width: "50%" }}>
                    <label
                      htmlFor="mother_image"
                      className="form-label"
                      style={{
                        fontSize: "12px",
                        color: "#434343",
                        fontWeight: "500",
                      }}
                    >
                      Upload Mother Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="student_image"
                      onChange={(e)=>handleChange('mother_pic', e,'file')}
                      style={{
                        border: "1px solid #ECEDF1",
                        borderRadius: "8px",
                        padding: "10px",
                      }}
                    />
                  </div>
                </div>
                <div
                  className="head"
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <span
                    className=""
                    id="staticBackdropLabel"
                    style={{
                      justifyContent: "center",
                      textAlign: "center",
                      alignItems: "center",
                      fontSize: "20px",
                      fontWeight: "600",
                      fontFamily: "Manrope",
                    }}
                  >
                    Bank Information
                  </span>
                </div>
                <hr style={{ marginBottom: "30px" }} />
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
                      id="back_account_no"
                      name="back_account_no"
                      placeholder=""
                      value={data.back_account_no}
                      onChange={(e)=>handleChange('back_account_no', e.target.value,'text')}
                    />
                    <label htmlFor="back_account_no">Bank Account No</label>
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
                      id="bank_name"
                      name="bank_name"
                      placeholder=""
                      value={data.bank_name}
                      onChange={(e)=>handleChange('bank_name', e.target.value,'text')}
                    />
                    <label htmlFor="bank_name">Bank Name</label>
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
                      id="ifsc_code"
                      name="ifsc_code"
                      placeholder=""
                      value={data.ifsc_code}
                      onChange={(e)=>handleChange('ifsc_code', e.target.value,'text')}
                    />
                    <label htmlFor="ifsc_code">IFSC Code</label>
                  </div>
                </div>
                <div
                  className="head"
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <span
                    className=""
                    id="staticBackdropLabel"
                    style={{
                      justifyContent: "center",
                      textAlign: "center",
                      alignItems: "center",
                      fontSize: "20px",
                      fontWeight: "600",
                      fontFamily: "Manrope",
                    }}
                  >
                    Gardian Information
                  </span>
                </div>
                <hr style={{ marginBottom: "30px" }} />

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
                      id="gardian_name"
                      name="gardian_name"
                      placeholder=""
                      value={data.gardian_name}
                      onChange={(e)=>handleChange('gardian_name', e.target.value,'text')}
                    />
                    <label htmlFor="gardian_name">Gardian Name</label>
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
                      id="gardian_contact_number"
                      name="gardian_contact_number"
                      placeholder=""
                      value={data.gardian_contact_number}
                      onChange={(e)=>handleChange('gardian_contact_number', e.target.value,'text')}
                    />
                    <label htmlFor="gardian_contact_number">
                      Gardian contact no
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
                      id="gardian_occupation"
                      name="gardian_occupation"
                      placeholder=""
                      value={data.gardian_occupation}
                      onChange={(e)=>handleChange('gardian_occupation', e.target.value,'text')}
                    />
                    <label htmlFor="gardian_occupation">
                      Gardian occupation
                    </label>
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
                      id="gardian_relation"
                      name="gardian_relation"
                      placeholder=""
                      value={data.gardian_relation}
                      onChange={(e)=>handleChange('gardian_relation', e.target.value,'text')}
                    />
                    <label htmlFor="gardian_relation">Gardian Relation</label>
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
                      id="gardian_address"
                      name="gardian_address"
                      placeholder=""
                      value={data.gardian_address}
                      onChange={(e)=>handleChange('gardian_address', e.target.value,'text')}
                    />
                    <label htmlFor="gardian_address">Gardian Address</label>
                  </div>
                </div>

                <div
                  className="fv-row mb-10"
                  style={{ display: "flex", gap: "10px" }}
                >
                  <div style={{ marginBottom: "23px", width: "50%" }}>
                    <label
                      htmlFor="gardian_image"
                      className="form-label"
                      style={{
                        fontSize: "12px",
                        color: "#434343",
                        fontWeight: "500",
                      }}
                    >
                      Upload Gardian Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="father_image"
                      onChange={(e)=>handleChange('gardian_pic', e,'file')}
                      style={{
                        border: "1px solid #ECEDF1",
                        borderRadius: "8px",
                        padding: "10px",
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div
                style={{
                  marginBottom: "23px",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                {reviewStatus === 0 ? (
                  <div
                    className="review-status"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <span
                      className="exclamation-mark"
                      style={{ fontSize: "200px" }}
                    >
                      ⚠️
                    </span>
                    <h3 style={{ fontSize: "40px" }}>Review Pending</h3>
                  </div>
                ) : (
                  <div
                    className="review-status"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <span
                      className="exclamation-mark"
                      style={{ fontSize: "200px" }}
                    >
                      ✅
                    </span>
                    <h3 style={{ fontSize: "40px" }}>Completed</h3>
                  </div>
                )}
              </div>
            )}

            {currentStep === 3 && (
              <div className="fee">
                <div
                  style={{
                    marginBottom: "23px",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  {reviewStatus === 1 ? (
                    <div
                      className="review-status"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <span
                        className="exclamation-mark"
                        style={{ fontSize: "200px" }}
                      >
                        ⚠️
                      </span>
                      <h3 style={{ fontSize: "40px" }}>Fees Pending</h3>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            )}
            {/* Add more steps as needed */}

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {currentStep > 1 && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handlePrevStep}
                >
                  Previous
                </button>
              )}
              {currentStep < stepNames.length ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNextStep}
                >
                  Next
                </button>
              ) : (
                currentStep === stepNames.length && (
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                )
              )}
            </div>
          </form>
        </div>
      </div>
    </Modal>,
    modalsRoot
  );
};

export { CreateStartAdmissionProcess };
