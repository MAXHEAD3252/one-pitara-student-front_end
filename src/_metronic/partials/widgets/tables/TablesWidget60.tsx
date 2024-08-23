import React, { useEffect, useState } from "react";
// import { Tooltip as ReactTooltip } from "react-tooltip";
import "../../../../app/pages/StaffPages/FeeDetails/style.css";
// import { CreateWalkinEnquiry } from "../../modals/create-app-stepper/CreateWalkinEnquiry";
import { DeleteFeeTypeModal } from "../../modals/create-app-stepper/DeleteFeeTypeModal";
import { CreateEditFeeType } from "../../modals/create-app-stepper/CreateEditFeeType";
import { useAuth } from "../../../../app/modules/auth/core/Auth";
// import { UploadsFilter } from "../../modals/create-app-stepper/UploadsFilter";
// import { AddClasses } from "../../modals/create-app-stepper/AddClasses";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";

interface CurrentUser {
  school_id: string;
}
interface DataItem {
    id: number;
    name: string;
    feecode: string;
  }

const TablesWidget60 = () => {
    const [data, setData] = useState<DataItem[]>([]);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [referesh, setReferesh] = useState(false);
  const { currentUser } = useAuth();
  const [fee_type_id, setfee_type_id] = useState<number | null>(null);
  const [fee_type_name, setfee_type_name] = useState<string>('');
  const [fee_type_code, setfee_type_code] = useState<string>('');
  const schoolId = (currentUser as unknown as CurrentUser)?.school_id;

  const [formData, setFormData] = useState({
    name: '',
    feeCode: '',
    description: '',
  });


  const handleShowEditModal = (fee_type_id: number,name : string, feecode : string) => {
    setfee_type_id(fee_type_id);
    setfee_type_name(name)
    setfee_type_code(feecode)
    setShowEditModal(true);
  };

  const handleShowDeleteModal = (fee_type_id: number) =>{
    setfee_type_id(fee_type_id)
    setShowDeleteModal(true);
  }


  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setfee_type_id(null);
  };


  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setfee_type_id(null);
    setfee_type_name('')
    setfee_type_code('')
  };



  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/api/staff/getfeetype/${schoolId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();
        console.log(responseData);
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEnquiries();
    setReferesh(false);

  }, [schoolId,referesh]);

//   const handleSearch = (e: any) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     const filtered = data.filter(
//       (item) =>
//         item.status.toLowerCase().includes(query) ||
//         item.name.toLowerCase().includes(query)
//     );
//     /* @ts-ignore */
//     setFilteredData(filtered);
//   };


const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(
      `${DOMAIN}/api/staff/add-feetype/${schoolId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setReferesh(true);
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
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
                      Fees Type List
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
                      Fee Type
                    </span>
                  </div>
                </th>
                <th>
                  <div style={{ width: "70px" }}>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "600",
                        lineHeight: "18px",
                        color: "#FFFFFF",
                      }}
                    >
                      Fee Code
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
                        {item.type}
                      </span>
                    </div>
                  </td>
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
                        {item.code}
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
                        onClick={() => handleShowEditModal(item.id,item.type,item.code)}
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
                        onClick={() => handleShowDeleteModal(item.id)}
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
            Add Fees Type :
          </span>
        </div>
        <div
          
        >
          <form onSubmit={handleSubmit} style={{
            display: "flex",
            alignItems: "center",
            padding: "20px",
            flexDirection: "column",
            marginTop: "10px",
          }}>
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
                height: '46px',
                width: '100%',
                paddingLeft: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'transparent',
                border: '1px solid #ECEDF1',
                borderRadius: '8px',
                
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
            <label
              htmlFor="materialtitle"
              className="form-label"
              style={{
                fontSize: "12px",
                color: "#434343",
                fontWeight: "500",
              }}
            >
              Fees Code
            </label>

            <div id="materialtitle">
            <input
              className=""
              style={{
                height: '46px',
                width: '100%',
                paddingLeft: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'transparent',
                border: '1px solid #ECEDF1',
                borderRadius: '8px',
              }}
              onChange={handleInputChange}
              type="text"
              name="feeCode"
              value={formData.feeCode}
              placeholder="Enter Fee Code"
              aria-expanded="false"
              required
            />
            </div>
          </div>
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
              Description
            </label>

            <div id="materialtitle">
            <input
              className=""
              style={{
                height: '46px',
                width: '100%',
                paddingLeft: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'transparent',
                border: '1px solid #ECEDF1',
                borderRadius: '8px',
              }}
              onChange={handleInputChange}
              type="text"
              name="description"
              value={formData.description}
              placeholder="Enter Description"
              aria-expanded="false"
              required
            />
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
              type="submit"
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
                Add
              </span>
            </button>
          </div>
          </form>
        </div>
        <CreateEditFeeType
          show={showEditModal}
          handleClose={handleCloseEditModal}
          fee_type_id={fee_type_id}
          fee_type_name = {fee_type_name}
          fee_type_code = {fee_type_code}
          setReferesh = {setReferesh}
        />
        <DeleteFeeTypeModal
          show={showDeleteModal}
          onHide={handleCloseDeleteModal}
          fee_type_id={fee_type_id}
          setReferesh = {setReferesh}
        />
      </div>
    </div>
  );
};

export { TablesWidget60 };
