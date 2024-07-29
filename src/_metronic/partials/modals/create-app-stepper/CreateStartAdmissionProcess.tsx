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
    enquiry_id:string,
    name: string,
    contact: string,
    state: string,
    city : string,
    pincode : string,
    religion : string,
    aadhaar_no : string,
    reference_id:string,
    date: string,
    description: string,
    follow_up_date: string,
    note: string,
    source_id: string,
    email: string,
    status: string,
    enquiry_type:string,
    class_id: string,
    gender: string,
    date_of_birth: string,
    current_school: string,
    academic_year: string,
    father_name: string,
    father_contact_number: string,
    father_occupation : string,
    father_type_of_work : string,
    father_organization : string,
    mother_name: string,
    mother_contact_number: string,
    mother_occupation : string,
    mother_organization : string,
    bank_name : string,
    back_account_no :string,
    ifsc_code : string,
    gardian_name: string,
    gardian_contact_number: string,
    gardian_occupation: string,
    gardian_relation: string,
    gardian_address: string
}

const CreateStartAdmissionProcess = ({ show, handleClose, enqId }: Props) => {
  const { currentUser } = useAuth();

  const schoolId = currentUser?.school_id;

  // const [data, setData] = useState({});
  const [source, setSource] = useState<Source[]>([]);
  const [reference, setReference] = useState<Reference[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [sessions, setSessions] =  useState<Session[]>([]);
  const [changedFields, setChangedFields] = useState({});

  const [currentStep, setCurrentStep] = useState(1);

  const [reviewStatus, setReviewStatus] = useState(1);

  const [pic_data, set_pic_data] = useState({
    student_pic : null,
    father_pic : null,
    mother_pic : null,
    gardian_pic : null,
  });


  const [formData, setFormData] = useState<FormData>({
    enquiry_id:"",
    name: "",
    contact: "",
    state: "",
    city: "",
    pincode : "",
    religion : "",
    aadhaar_no : "",
    reference_id:"",
    date: "",
    description: "",
    follow_up_date: "",
    note: "",
    source_id: "",
    email: "",
    status: "",
    enquiry_type:"",
    class_id: "",
    gender: "",
    date_of_birth: "",
    current_school: "",
    academic_year: "",
    father_name: "",
    father_contact_number: "",
    father_occupation : "",
    father_type_of_work : "",
    father_organization: "",
    mother_name: "",
    mother_contact_number: "",
    mother_occupation : "",
    mother_organization : "",
    bank_name : "",
    back_account_no :"",
    ifsc_code : "",
    gardian_name: "",
    gardian_contact_number: "",
    gardian_occupation: "",
    gardian_relation: "",
    gardian_address: ""
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
      console.log(enqId);
      
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

        setFormData({
          enquiry_id: data[0]?.enqId || "",
          name: data[0]?.name || "",
          contact: data[0]?.contact || "",
          mother_name: data[0]?.mother_name || "",
          mother_contact_number: data[0]?.mother_contact_number || "",
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
          father_contact_number: data[0]?.father_contact_number || "",
          current_school: data[0]?.current_school || "",
          gender: data[0]?.gender || "",
          academic_year: data[0]?.academic_year || "",
          father_name: data[0]?.father_name || "",
          father_occupation: data[0]?.father_occupation || "",
          father_type_of_work: data[0]?.father_type_of_work || "",
          father_organization: data[0]?.father_organization || "",
          email: data[0]?.email || "",
          class_id: data[0]?.class_id || "",
          source_id: data[0]?.source_id || "",
          follow_up_date: followUpDate,
          enquiry_type:data[0]?.enquiry_type,
          bank_name:data[0]?.bank_name|| "",
          back_account_no:data[0]?.back_account_no|| "",
          ifsc_code:data[0]?.ifsc_code|| "",
          gardian_name:data[0]?.gardian_name|| "",
          gardian_contact_number:data[0]?.gardian_contact_number|| "",
          gardian_occupation:data[0]?.gardian_occupation|| "",
          gardian_relation:data[0]?.gardian_relation|| "",
          gardian_address:data[0]?.gardian_address|| "",
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
    console.log(formData);
    
    const formDataToSend = new FormData();
  
    // Append form data fields
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
  
    // Append picture data fields
    Object.keys(pic_data).forEach((key) => {
      formDataToSend.append(key, pic_data[key]);
    });
  
    try {
      const response = await fetch('your_backend_endpoint', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Authorization': 'Bearer your_token' // If you need authorization header
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log(result);
  
      // Handle success
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      // Handle error
    }
  };
  

  /* @ts-ignore */
  const handleMaterialChange = (key, event) => {
    const file = event.target.files[0];
    set_pic_data((prevState) => ({
      ...prevState,
      [key]: file,
    }));
  };
  
  

  console.log(formData)
  console.log(pic_data)


  const nextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, stepNames.length));
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };


  const stepNames = [
    'Admission Form',
    'Review Status',
    'Fees'
  ];

  const progress = (currentStep / stepNames.length) * 100;


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
      <div className="modal-body" style={{ height:'20px',justifyContent: 'space-around',display: 'flex',
                  alignItems:'center',
                  flexDirection:'row', }}>
      {stepNames.map((step, index) => (
              <span
                key={index}
                style={{
                  left: `${(index / (stepNames.length - 1)) * 100}%`,
                  transform: 'translateX(-50%)',
                  color:'black',
                  fontSize:'20px',
                }}
              >
                {step}
              </span>
            ))}
            </div>
      <div className="modal-body" style={{ justifyContent: "center" }}>
      <div className="progress" style={{ height: '20px',marginBottom:'20px',}}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${progress}%` }}
            aria-valuenow={currentStep}
            aria-valuemin={1}
            aria-valuemax={stepNames.length}
          >
            
          </div>
        </div>


        <form onSubmit={()=>handleSubmit(e)}>
          {currentStep === 1 && (
            <div style={{ marginBottom: "23px", overflowY:'scroll', height:'500px', }}>
              
              <div className="head" style={{display:'flex',justifyContent:'space-around',alignItems:'center',marginBottom:'20px',}}>
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
        <hr style={{marginBottom:'30px',}}/>
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
                    value={formData.state}
                    onChange={handleChange}
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
                    value={formData.city}
                    onChange={handleChange}
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
                    value={formData.pincode}
                    onChange={handleChange}
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
                    value={formData.religion}
                    onChange={handleChange}
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
                  <input
                    type="text"
                    className="form-control"
                    id="aadhaar_no"
                    name="aadhaar_no"
                    placeholder=""
                    value={formData.aadhaar_no}
                    onChange={handleChange}
                  />
                  <label htmlFor="aadhaar_no">
                    Aadhaar No
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
                Upload Student Image 
              </label>
              <input
                type="file"
                className="form-control"
                id="student_image"
                placeholder="Upload Student Image"
                onChange={(e) => handleMaterialChange("Student_pic", e)}
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
                    value={formData.reference_id}
                    onChange={handleChange}
                  >
                    {!reference.some(
                      (value) => value.id === formData.reference_id
                    ) && (
                      <option value={formData.reference_id}>
                        {formData.reference_id}
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
                    {!source.some(
                      (value) => value.id === formData.source_id
                    ) && (
                      <option value={formData.source_id}>
                        {formData.source_id}
                      </option>
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



              </div>


              <div className="head" style={{display:'flex',justifyContent:'space-around',alignItems:'center',marginBottom:'20px',}}>
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
        <hr style={{marginBottom:'30px',}}/>

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
                onChange={(e) => handleMaterialChange("father_pic", e)}
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
                onChange={(e) => handleMaterialChange("mother_pic", e)}
                style={{
                  border: "1px solid #ECEDF1",
                  borderRadius: "8px",
                  padding: "10px",
                }}
              />
            </div>
              </div>
              <div className="head" style={{display:'flex',justifyContent:'space-around',alignItems:'center',marginBottom:'20px',}}>
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
        <hr style={{marginBottom:'30px',}}/>
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
                    value={formData.back_account_no}
                    onChange={handleChange}
                  />
                  <label htmlFor="back_account_no">
                    Bank Account No
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
                    id="bank_name"
                    name="bank_name"
                    placeholder=""
                    value={formData.bank_name}
                    onChange={handleChange}
                  />
                  <label htmlFor="bank_name">
                     Bank Name
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
                    id="ifsc_code"
                    name="ifsc_code"
                    placeholder=""
                    value={formData.ifsc_code}
                    onChange={handleChange}
                  />
                  <label htmlFor="ifsc_code">
                     IFSC Code
                  </label>
                </div>

                

              </div>
              <div className="head" style={{display:'flex',justifyContent:'space-around',alignItems:'center',marginBottom:'20px',}}>
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
        <hr style={{marginBottom:'30px',}}/>

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
                    value={formData.gardian_name}
                    onChange={handleChange}
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
                    value={formData.gardian_contact_number}
                    onChange={handleChange}
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
                    value={formData.gardian_occupation}
                    onChange={handleChange}
                  />
                  <label htmlFor="gardian_occupation">Gardian occupation</label>
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
                    value={formData.gardian_relation}
                    onChange={handleChange}
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
                    value={formData.gardian_address}
                    onChange={handleChange}
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
                onChange={(e) => handleMaterialChange("gardian_pic", e)}
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
              
              <div style={{ marginBottom: "23px",display:'flex',
                justifyContent:'space-around',
                alignItems:'center',
                flexDirection:'column',}}>
                  {reviewStatus === 0 ? (
                <div className="review-status" style={{display:'flex',alignItems:'center',flexDirection:'column',}}>
                  <span className="exclamation-mark" style={{fontSize:'200px',}}>⚠️</span>
                  <h3 style={{fontSize:'40px',}}>Review Pending</h3>
                </div>) : (
                  <div className="review-status" style={{display:'flex',alignItems:'center',flexDirection:'column',}}>
                  <span className="exclamation-mark" style={{fontSize:'200px',}}>✅</span>
                  <h3 style={{fontSize:'40px',}}>Completed</h3>
                </div>
                )}
              </div>
              )}


              {currentStep === 3 && (
              <div className="fee">
                <div style={{ marginBottom: "23px",display:'flex',
                justifyContent:'space-around',
                alignItems:'center',
                flexDirection:'column',}}>
                  { reviewStatus === 1 ? (
                  <div className="review-status" style={{display:'flex',alignItems:'center',flexDirection:'column',}}>
                  <span className="exclamation-mark" style={{fontSize:'200px',}}>⚠️</span>
                  <h3 style={{fontSize:'40px',}}>Fees Pending</h3>
                </div>) : (
                 <></> 
                )}
                </div>
              </div>
            )}
            {/* Add more steps as needed */}

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {currentStep > 1 && (
                <button type="button" className="btn btn-secondary" onClick={prevStep}>
                  Previous
                </button>
              )}
              {currentStep < 3 ? (
                <button type="button" className="btn btn-primary" onClick={nextStep}>
                  Next
                </button>
              ) : (
                currentStep === 3 && (
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
