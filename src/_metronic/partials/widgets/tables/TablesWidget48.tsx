import React, { useEffect, useState } from "react";
// import { Tooltip as ReactTooltip } from "react-tooltip";
import "../../../../app/pages/StaffPages/FinancialManagement/style.css";
// import { CreateWalkinEnquiry } from "../../modals/create-app-stepper/CreateWalkinEnquiry";
// import { CreateEnquiryAction } from "../../modals/create-app-stepper/CreateEnquiryAction";
// import { CreateEditEnquiry } from "../../modals/create-app-stepper/CreateEditEnquiry";
import { useAuth } from "../../../../app/modules/auth/core/Auth";
// import { UploadsFilter } from "../../modals/create-app-stepper/UploadsFilter";
import { AddClasses } from "../../modals/create-app-stepper/AddClasses";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";

interface TablesWidgetProps {
  classId: string;
  sectionId?: string;
  subjectId?: string;
  lessonId?: string;
  topicId?: string;
}



interface ClassData {
  class: string;
  sections: string[];
}

// interface DataItem {
//   class: string;
//   section: string;
//   subject: string;
//   type: string;
//   lesson: string;
//   topic: string;
//   title: string;
//   upload_type: string;
//   staff_name: string;
//   created_at: Date;
//   updated_at: Date;
// }

interface CurrentUser {
  school_id: string; // Adjust type as per your actual data type for school_id
  // Add other properties if `currentUser` has more properties
}


const TablesWidget48: React.FC<TablesWidgetProps> = () => {
  const [data, setData] = useState<ClassData[]>([]);
  const { currentUser } = useAuth();
  const school_id = (currentUser as unknown as CurrentUser)?.school_id;
  const [showModal, setShowModal] = useState(false);
  //   const [showActionModal, setShowActionModal] = useState(false);
  //   const [showEditModal, setShowEditModal] = useState(false);

  const handleModal = () => {
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };

  //   const handleActionModal = (value) => {
  //     setEnqId(value)
  //     setShowActionModal(true);
  //   };
  //   const handleActionModalClose = () => {
  //     setShowActionModal(false);
  //   };

  //   const handleModalEdit=(value)=>{
  //     setEnqId(value)
  //     setShowEditModal(true)
  //       }

  //       const handleModalEditClose=()=>{
  //         setShowEditModal(false)
  //           }

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        
          const response = await fetch(
            `${DOMAIN}/api/school/get-classes/${school_id}`
          );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const responseData = await response.json();
        
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchClasses();
  }, [school_id]);
  
  return (
    <div
      className="col-xxl-12"
      style={{
        borderRadius: "16px",
        border: "1px solid #5D637A",
        overflowX: "hidden",
        minHeight: "100%",
        marginBottom: "20px",
        height: "850px",
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
            className=""
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
                className="col-xxl-12 col-lg-6"
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
                    All Classes
                  </span>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
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
                  <div>
                    <span
                      className=""
                      style={{
                        height: "36px",
                        border: "1px solid #D9D9D9",
                        width: "100px",
                        borderRadius: "8px",
                        padding: "8px 10px 8px 10px",
                        gap: "10px",
                        display: "flex",
                        alignItems: "center",
                        color: "#FFF",
                        cursor: "pointer",
                      }}
                        onClick={handleModal}
                      
                    >
                      <svg
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.16672 9.3333C8.27129 9.3333 9.16672 10.2287 9.16672 11.3333C9.16672 12.4379 8.27129 13.3333 7.16672 13.3333C6.06215 13.3333 5.16672 12.4379 5.16672 11.3333C5.16672 10.2287 6.06215 9.3333 7.16672 9.3333Z"
                          stroke="white"
                        />
                        <path
                          d="M10.5 2.66667C9.39546 2.66667 8.50003 3.5621 8.50003 4.66667C8.50003 5.77124 9.39546 6.66667 10.5 6.66667C11.6046 6.66667 12.5 5.77124 12.5 4.66667C12.5 3.5621 11.6046 2.66667 10.5 2.66667Z"
                          stroke="white"
                        />
                        <path
                          d="M10.8334 11.3057L15.5 11.3057"
                          stroke="white"
                          stroke-linecap="round"
                        />
                        <path
                          d="M6.83337 4.63898L2.16671 4.63898"
                          stroke="white"
                          stroke-linecap="round"
                        />
                        <path
                          d="M2.16672 11.3057L3.50005 11.3057"
                          stroke="white"
                          stroke-linecap="round"
                        />
                        <path
                          d="M15.5 4.63898L14.1667 4.63898"
                          stroke="white"
                          stroke-linecap="round"
                        />
                      </svg>
                      Add Class
                    </span>
                  </div>
                </div>
              </caption>
            </div>

            <tr
              style={{
                height: "61px",
                // gap: "40px",
                display: "flex",
                // paddingTop: "10px",
                paddingLeft: "30px",
                justifyContent:'space-between',
                // paddingBottom:'10px',
                // position: "sticky",
                // top: 0,
                width: "95%",
                // border:'1px solid white',
                overflowY: "auto",
                overflowX: "hidden",
                backgroundColor: "#1C335C",
                // zIndex: 100,
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
                    Class
                  </span>
                </div>
              </th>
                <th>
                  <div style={{ width: "60px" }}>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "600",
                        lineHeight: "18px",
                        color: "#FFFFFF",
                        fontFamily: "Manrope",
                      }}
                    >
                      Section(s)
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
  className="col-xxl-12 h-[s]"
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
        paddingTop:"25px",
        marginBottom:'5px',
        justifyContent: 'space-between',
        width: "94%",
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
            {item.class}
          </span>
        </div>
      </td>
      <td>
        <div
          className="overflow-hidden whitespace-nowrap"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {item.sections.map((section, sectionIndex) => (
            <span
              key={sectionIndex}
              data-tooltip-id={`tooltip-${index}-${sectionIndex}`}
              style={{
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "18px",
                color: "#1F1F1F",
                fontFamily: "Manrope",
              }}
            >

               Section
               <span style={{fontWeight:'600',paddingLeft:'10px'}}> {section}</span>
            </span>
          ))}
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
          <AddClasses show={showModal} handleClose={handleModalClose}  />

          {/* end::Table body */}
        </table>

        {/* modal */}

        {/* <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog "
            style={{
              display: "flex",
              width: "505px",
              height: "521px",
              padding: "0px",
              // borderRadius:'18px'
            }}
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
                  Filters
                </span>
                <span data-bs-dismiss="modal" aria-label="Close">
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
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                    style={{
                      fontSize: "12px",
                      color: "#434343",
                      fontWeight: "500",
                    }}
                  >
                    By Payment Status
                  </label>
                  <div
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
                        name="gridRadios"
                        id="gridRadios1"
                        value="option1"
                        defaultChecked
                        style={{ width: "15px", height: "15px" }}
                      />
                      <label className="form-check-label" htmlFor="gridRadios1">
                        None
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
                        name="gridRadios"
                        id="gridRadios1"
                        value="option1"
                        defaultChecked
                        style={{ width: "15px", height: "15px" }}
                      />
                      <label className="form-check-label" htmlFor="gridRadios1">
                        Percentage
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
                        name="gridRadios"
                        id="gridRadios1"
                        value="option1"
                        defaultChecked
                        style={{ width: "15px", height: "15px" }}
                      />
                      <label className="form-check-label" htmlFor="gridRadios1">
                        Fixed Amount
                      </label>
                    </div>
                  </div>
                </div>
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
                >
                  <span
                    style={{
                      color: "#FFF",
                      fontFamily: "Manrope",
                      fontSize: "12px",
                      fontWeight: "500",
                    }}
                  >
                    Confirm
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      {/* end::Table */}
    </div>
  );
};

export { TablesWidget48 };
