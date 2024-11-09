import React, { useState, useEffect } from "react";
import { useAuth } from "../../../modules/auth";
import { useLocation } from "react-router-dom";
import { DOMAIN } from "../../../routing/ApiEndpoints";
import { CreateStudentTransection } from "../../../../_metronic/partials/modals/create-app-stepper/CreateStudentTransection";
import { CreateEditStudent } from "../../../../_metronic/partials/modals/create-app-stepper/CreateEditStudent";
import { CreateEditStudentUpload } from "../../../../_metronic/partials/modals/create-app-stepper/CreateEditStudentUpload";

const StudentProfileView: React.FC = () => {
  const [student, setStudent] = useState<any[]>([]);
  const [fee, setFee] = useState<any[]>([]);
  const { currentUser } = useAuth();
  const school_id = (currentUser as any)?.school_id;
  const [refresh, setRefresh] = useState(false);
  const [showTransectionModal, setShowTransectionModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditDocumentModal, setShowEditDocumentModal] = useState(false);
  const [sessionId, setSessionId] = useState(0);
  const [studentFeeMasterId, setStudentFeeMasterId] = useState(0);
  const [studentId, setStudentId] = useState(0);
  const [activeTab, setActiveTab] = useState("Profile");

  const [studentPic, setStudentPic] = useState("");
  const [fatherPic, setFatherPic] = useState("");
  const [motherPic, setMotherPic] = useState("");
  const [guardianPic, setGuardianPic] = useState("");


  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const [student_pic, setStudent_Pic] = useState("");
  const [father_pic, setFather_Pic] = useState("");
  const [mother_pic, setMother_Pic] = useState("");
  const [guardian_pic, setGuardian_Pic] = useState("");


  // Extract the staff_id from the query params
  const params = new URLSearchParams(location.search);
  const student_id = params.get("id"); // Get the staff_id from the query params

  const handleModal = (student_fees_master_id: number) => {
    setShowTransectionModal(true);
    setStudentFeeMasterId(student_fees_master_id);
  };

  const handleModalClose = () => {
    setShowTransectionModal(false);
    setStudentFeeMasterId(0);
  };

  const handleEditModal = (student_id: number) => {
    setStudentId(student_id);
    setShowEditModal(true);
  };

  const handleEditDocumentModal = (student_id: number) => {
    setStudentId(student_id);
    setShowEditDocumentModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const handleEditDocumentModalClose = () => {
    setShowEditDocumentModal(false);
  };


  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/api/school/get-student-details/${school_id}/${student_id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();
        setStudent(responseData);
        console.log(responseData);
        const session_id = responseData[0].session_id;
        const studentpic = responseData[0].image;
        const fatherpic = responseData[0].father_pic;
        const motherpic = responseData[0].mother_pic;
        const guardianpic = responseData[0].session_id;
        setStudent_Pic(studentpic)
        setFather_Pic(fatherpic);
        setMother_Pic(motherpic);
        setGuardian_Pic(guardianpic);
        setSessionId(session_id);
        setRefresh(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStudent();
  }, [school_id, refresh]);

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/api/school/get-studentwisefeegrouptype/${school_id}/${student_id}/${sessionId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();
        setFee(responseData);
        console.log(responseData);
        setRefresh(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchFees();
  }, [school_id,student_id]);



  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  if (student.length === 0) {
    return <div>Loading...</div>;
  }

  const studentDetail = student[0]; // Assuming you're fetching one employee, adjust as necessary



  // useEffect(() => {
  //   const fetchStudentPic = async () => {
  //     try {
  //         const studentResponse = await fetch(
  //           `${DOMAIN}/api/school/get-student-pic`,
  //           {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({ student_pic: studentDetail.image }),
  //           }
  //         );
  //         if (!studentResponse.ok) {
  //           throw new Error(`Failed to fetch student picture!`);
  //         }
  //         const studentBlob = await studentResponse.blob();
  //         const studentImageObjectURL = URL.createObjectURL(studentBlob);
  //         setStudentPic(studentImageObjectURL);
  //     } catch (error) {
  //       console.error("Error fetching student picture:", error);
  //     }
  //   };
  
  //   fetchStudentPic();
  // }, []);
  
  // useEffect(() => {
  //   const fetchFatherPic = async () => {
  //     try {
  //       if (father_pic) {
  //         const fatherResponse = await fetch(
  //           `${DOMAIN}/api/school/get-father-pic`,
  //           {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({ father_pic: father_pic }),
  //           }
  //         );
  //         if (!fatherResponse.ok) {
  //           throw new Error(`Failed to fetch father picture!`);
  //         }
  //         const fatherBlob = await fatherResponse.blob();
  //         const fatherImageObjectURL = URL.createObjectURL(fatherBlob);
  //         setFatherPic(fatherImageObjectURL);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching father picture:", error);
  //     }
  //   };
  
  //   fetchFatherPic();
  // }, []);
  
  // useEffect(() => {
  //   const fetchMotherPic = async () => {
  //     try {
  //       if (mother_pic) {
  //         const motherResponse = await fetch(
  //           `${DOMAIN}/api/school/get-mother-pic`,
  //           {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({ mother_pic: mother_pic }),
  //           }
  //         );
  //         if (!motherResponse.ok) {
  //           throw new Error(`Failed to fetch mother picture!`);
  //         }
  //         const motherBlob = await motherResponse.blob();
  //         const motherImageObjectURL = URL.createObjectURL(motherBlob);
  //         setMotherPic(motherImageObjectURL);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching mother picture:", error);
  //     }
  //   };
  
  //   fetchMotherPic();
  // }, []);
  
  // useEffect(() => {
  //   const fetchGuardianPic = async () => {
  //     try {
  //       if (guardian_pic) {
  //         const guardianResponse = await fetch(
  //           `${DOMAIN}/api/school/get-guardian-pic`,
  //           {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({ guardian_pic: guardian_pic }),
  //           }
  //         );
  //         if (!guardianResponse.ok) {
  //           throw new Error(`Failed to fetch guardian picture!`);
  //         }
  //         const guardianBlob = await guardianResponse.blob();
  //         const guardianImageObjectURL = URL.createObjectURL(guardianBlob);
  //         setGuardianPic(guardianImageObjectURL);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching guardian picture:", error);
  //     }
  //   };
  
  //   fetchGuardianPic();
  // }, []);
  
  



  return (
    <div
      className="student-profile-container"
      style={{ padding: "20px", width: "100%", height: "100%", margin: "auto" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "transparent",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <div className="d-flex align-items-center mb-4">
          <img
            src={studentPic || "https://via.placeholder.com/80"}
            alt="Profile"
            className="rounded-circle"
            style={{
              width: "90px",
              height: "90px",
              marginRight: "15px",
              objectFit: "cover",
            }}
          />
          <div>
            <h4>{`${studentDetail.firstname} ${studentDetail.middlename} ${studentDetail.lastname}`}</h4>
            <p className="mb-0 text-muted">
              <strong>Admission No: </strong>
              {studentDetail.admission_no}
            </p>
            <p className="mb-0 text-muted">
              <strong>Roll No: </strong>
              {studentDetail.roll_no}
            </p>
            <p className="mb-0 text-muted">
              <strong>Class: </strong>
              {studentDetail.class}
            </p>
            <p className="mb-0 text-muted">
              <strong>Section: </strong>
              {studentDetail.section}
            </p>
            <p className="mb-0 text-muted">
              <strong>Academic Year: </strong>
              {studentDetail.academic_year}
            </p>
          </div>
        </div>
        <div
          onClick={() => handleEditModal(studentDetail.id)}
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
            Edit Profile
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

      {/* Tabs */}
      <div
        className="tabs"
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "20px",
        }}
      >
        {["Profile", "Exam", "Documents", "Timeline", "Fee Information"].map(
          (tab) => (
            <div
              key={tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => handleTabChange(tab)}
              style={{
                padding: "10px 20px",
                cursor: "pointer",
                borderBottom: activeTab === tab ? "3px solid #1C335C" : "none",
              }}
            >
              {tab}
            </div>
          )
        )}
      </div>

      {/* Tab Content */}
      <div
        className="tab-content"
        style={{
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "10px",
        }}
      >
        {activeTab === "Profile" && (
          <>
            <div
              className="card p-5 mb-4"
              style={{
                backgroundColor: "#B1E3FF",
                color: "#1C335C",
                fontFamily: "Manrope",
              }}
            >
              <h5>Personal Information</h5>
              <div className="row">
                <div className="col-md-4">
                  <hr />
                  <p>
                    <strong>Date of Birth:</strong>{" "}
                    {new Date(studentDetail.dob).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Gender:</strong> {studentDetail.gender}
                  </p>
                  <p>
                    <strong>Blood Group:</strong> {studentDetail.blood_group}
                  </p>
                  <p>
                    <strong>Religion:</strong> {studentDetail.religion}
                  </p>
                  <p>
                    <strong>Caste:</strong> {studentDetail.caste}
                  </p>
                  <p>
                    <strong>Aadhaar No:</strong> {studentDetail.adhar_no}
                  </p>
                </div>
              </div>
            </div>

            <div
              className="card p-5 mb-4"
              style={{
                backgroundColor: "#FFF8B6",
                color: "#1C335C",
                fontFamily: "Manrope",
              }}
            >
              <h5>Family Information</h5>
              <div className="row">
                <div className="col-md-4">
                  <hr />
                  <p>
                    <strong>Father's Name:</strong> {studentDetail.father_name}
                  </p>
                  <p>
                    <strong>Mother's Name:</strong> {studentDetail.mother_name}
                  </p>
                  <p>
                    <strong>Father's Phone:</strong>{" "}
                    {studentDetail.father_phone}
                  </p>
                  <p>
                    <strong>Mother's Phone:</strong>{" "}
                    {studentDetail.mother_phone}
                  </p>
                </div>
              </div>
            </div>

            <div
              className="card p-5 mb-4"
              style={{
                backgroundColor: "#DFFFB6",
                color: "#1C335C",
                fontFamily: "Manrope",
              }}
            >
              <h5>Address and Contact Information</h5>
              <div className="row">
                <div className="col-md-4">
                  <hr />
                  <div>
                    <p>
                      <strong>Current Address:</strong>{" "}
                      {studentDetail.current_address}
                    </p>
                    <p>
                      <strong>Permanent Address:</strong>{" "}
                      {studentDetail.permanent_address}
                    </p>
                    <p>
                      <strong>State:</strong> {studentDetail.state}
                    </p>
                    <p>
                      <strong>City:</strong> {studentDetail.city}
                    </p>
                    <p>
                      <strong>Pincode:</strong> {studentDetail.pincode}
                    </p>
                    <p>
                      <strong>Mobile No:</strong> {studentDetail.mobileno}
                    </p>
                    <p>
                      <strong>Email:</strong> {studentDetail.email || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="card p-5 mb-4"
              style={{
                backgroundColor: "#B1E3FF",
                color: "#1C335C",
                fontFamily: "Manrope",
              }}
            >
              <h5>Guardian Information</h5>
              <div className="row">
                <div className="col-md-4">
                  <hr />
                  <p>
                    <strong>Guardian's Name:</strong>{" "}
                    {studentDetail.guardian_name}
                  </p>
                  <p>
                    <strong>Relation:</strong> {studentDetail.guardian_relation}
                  </p>
                  <p>
                    <strong>Guardian's Phone:</strong>{" "}
                    {studentDetail.guardian_phone}
                  </p>
                  <p>
                    <strong>Guardian's Occupation:</strong>{" "}
                    {studentDetail.guardian_occupation || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div
              className="card p-5 mb-4"
              style={{
                backgroundColor: "#FFF8B6",
                color: "#1C335C",
                fontFamily: "Manrope",
              }}
            >
              <h5>Miscellaneous Details And Bank Details</h5>
              <div className="row">
                <div className="col-md-4">
                  <hr />
                  <p>
                    <strong>Blood Type:</strong> {studentDetail.blood_group}
                  </p>
                  <p>
                    <strong>Student House:</strong>{" "}
                    {studentDetail.current_address}
                  </p>
                  <p>
                    <strong>Previous School Details:</strong>{" "}
                    {studentDetail.guardian_phone}
                  </p>
                  <p>
                    <strong>Bank Account Number:</strong>{" "}
                    {studentDetail.bank_account_no}
                  </p>
                  <p>
                    <strong>Name of the bank:</strong> {studentDetail.bank_name}
                  </p>
                  <p>
                    <strong>IFSC Code:</strong> {studentDetail.ifsc_code}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "Documents" && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <table
                className="table"
                style={{
                  width: "100%",
                  height: "100%",
                  borderCollapse: "collapse",
                  // marginTop: "10px",
                  backgroundColor: "#FFFFFF", // White background for the table
                  borderRadius: "12px", // Round corners for the table
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)", // Light shadow for the table
                }}
              >
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
                      textAlign: "center",
                    }}
                  >
                    Student Pic
                  </th>
                  <th
                    style={{
                      padding: "12px 20px",
                      textAlign: "center",
                    }}
                  >
                    Father Pic
                  </th>
                  <th
                    style={{
                      padding: "12px 20px",
                      textAlign: "center",
                    }}
                  >
                    Mother Pic
                  </th>
                  <th
                    style={{
                      padding: "12px 20px",
                      textAlign: "center",
                    }}
                  >
                    Guardian Pic
                  </th>
                  <th
                    style={{
                      padding: "12px 20px",
                      textAlign: "left",
                    }}
                  >
                    Action
                  </th>
                </tr>
                <tbody>
                  <tr
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderBottom: "1px solid #E0E4F0",
                      fontFamily: "Manrope",
                      fontSize: "14px",
                      color: "#1C335C",
                    }}
                  >
                    <td
                      style={{
                        padding: "12px 20px",
                        textAlign: "center",
                      }}
                    >
                      <img
                        src={studentPic || "https://via.placeholder.com/80"}
                        alt="Profile"
                        className="rounded-circle"
                        style={{
                          width: "100px",
                          height: "100px",
                          marginRight: "15px",
                          objectFit: "cover",
                        }}
                      />
                    </td>
                    <td
                      style={{
                        padding: "12px 20px",
                        textAlign: "center",
                      }}
                    >
                      <img
                        src={fatherPic || "https://via.placeholder.com/80"}
                        alt="Profile"
                        className="rounded-circle"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </td>
                    <td
                      style={{
                        padding: "12px 20px",
                        textAlign: "center",
                      }}
                    >
                      <img
                        src={motherPic || "https://via.placeholder.com/80"}
                        alt="Profile"
                        className="rounded-circle"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </td>

                    <td
                      style={{
                        padding: "12px 20px",
                        textAlign: "center",
                      }}
                    >
                      <img
                        src={guardianPic || "https://via.placeholder.com/80"}
                        alt="Profile"
                        className="rounded-circle"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </td>
                    <td
                      style={{
                        padding: "12px 20px",
                        textAlign: "left",
                      }}
                    >
                      <div
                        onClick={() => handleEditDocumentModal(studentDetail.id)}
                        style={{
                          width:'180px',
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
                          Edit Documents
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
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === "Exam" && <></>}

        {activeTab === "Timeline" && <></>}
        {activeTab === "Fee Information" && (
          <div>
            <p>
              <strong>Total Fees:</strong>
              {fee.reduce(
                (total, group) =>
                  total +
                  group.fees.reduce(
                    (groupTotal, feeItem) =>
                      groupTotal + parseFloat(feeItem.total_amount),
                    0
                  ),
                0
              )}
            </p>
            <p>
              <strong>Paid Amount:</strong>
              {fee.reduce(
                (total, group) =>
                  total +
                  group.fees.reduce(
                    (groupTotal, feeItem) =>
                      groupTotal + parseFloat(feeItem.amount_paid),
                    0
                  ),
                0
              )}
            </p>

            {/* Fees Table */}
            <table
              className="table"
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "10px",
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: "rgb(242, 246, 255)",
                    borderBottom: "1px solid #E0E4F0",
                    fontFamily: "Manrope",
                    fontWeight: "600",
                    color: "#1C335C",
                    fontSize: "14px",
                  }}
                >
                  <th style={{ padding: "12px 20px", textAlign: "left" }}>
                    Fee Group
                  </th>
                  <th style={{ padding: "12px 20px", textAlign: "left" }}>
                    Fee Type
                  </th>
                  <th style={{ padding: "12px 20px", textAlign: "left" }}>
                    Amount
                  </th>
                  <th style={{ padding: "12px 20px", textAlign: "left" }}>
                    Due Date
                  </th>
                  <th style={{ padding: "12px 20px", textAlign: "left" }}>
                    Status
                  </th>
                  <th style={{ padding: "12px 20px", textAlign: "left" }}>
                    Paid Amount
                  </th>
                  <th style={{ padding: "12px 20px", textAlign: "left" }}>
                    Transection History
                  </th>
                </tr>
              </thead>

              <tbody>
                {fee.map((group) =>
                  group.fees.map((feeItem, index) => (
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
                      <td style={{ padding: "12px 20px" }}>
                        {group.fee_group_name}
                      </td>
                      <td style={{ padding: "12px 20px" }}>
                        {feeItem.fee_type_name}
                      </td>
                      <td style={{ padding: "12px 20px" }}>{feeItem.amount}</td>
                      <td style={{ padding: "12px 20px" }}>
                        {new Date(feeItem.due_date).toLocaleDateString()}
                      </td>
                      <td style={{ padding: "12px 20px" }}>{feeItem.status}</td>
                      <td style={{ padding: "12px 20px" }}>
                        {feeItem.amount_paid}
                      </td>
                      <td
                        style={{
                          padding: "12px 20px",
                        }}
                      >
                        <div
                          style={{
                            width: "32px",
                            height: "35px",
                            borderRadius: "6px",
                            padding: "6px",
                            backgroundColor: "#b0efff",
                            display: "flex",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleModal(feeItem.student_fees_master_id)
                          }
                        >
                          <img
                            src="/media/svg/files/view.svg"
                            alt="View"
                            style={{ width: "22px", height: "22px" }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <CreateStudentTransection
        show={showTransectionModal}
        handleClose={handleModalClose}
        setRefresh={setRefresh}
        studentFeesMasterId={studentFeeMasterId}
      />
      <CreateEditStudent
        show={showEditModal}
        handleClose={handleEditModalClose}
        setRefresh={setRefresh}
        studentDetail={studentDetail}
        studentId={studentId}
      />
      <CreateEditStudentUpload
        show={showEditDocumentModal}
        handleClose={handleEditDocumentModalClose}
        setRefresh={setRefresh}
        studentId={studentId}
      />


    </div>
  );
};

export default StudentProfileView;
