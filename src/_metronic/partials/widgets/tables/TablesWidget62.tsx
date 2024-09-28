/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import "../../../../app/pages/StaffPages/FinancialManagement/style.css";
// import { CreateWalkinEnquiry } from "../../modals/create-app-stepper/CreateWalkinEnquiry";
import { CreateFeeCollectExist } from "../../modals/create-app-stepper/CreateFeeCollectExist";
import { CreateStartAdmissionProcess } from "../../modals/create-app-stepper/CreateStartAdmissionProcess";
import { useAuth } from "../../../../app/modules/auth/core/Auth";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";
import { useNavigate } from "react-router-dom";

interface DataItem {
  status: string;
  name: string;
}
interface FilterData {
 id:string;
 class :string;
}

const TablesWidget62: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const Navigate = useNavigate();

  const [filteredData, setFilteredData] = useState<FilterData[]>([]);
  

  const [searchQuery, setSearchQuery] = useState(0);
  const { currentUser } = useAuth();
  const schoolId = currentUser?.school_id;

  // const [showModal, setShowModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [feeGroup_id, setFeeGroup_id] = useState("");
  const [class_id, setClass_id] = useState('');
  const [referesh, setRefresh] = useState(false);
  

  // const handleModal = () => {
  //   setShowModal(true);
  // };
  // const handleModalClose = () => {
  //   setShowModal(false);
  // };

  const handleActionModal = (classId: string) => {
    setClass_id(classId);
    Navigate(`/fee-collect/assigned-students?classId=${classId}`);
};

  const handleActionModalClose = () => {
    setShowActionModal(false);
  };


  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/api/school/get-feeclasses/${schoolId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();
        setData(responseData);
        setFilteredData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEnquiries();
    setRefresh(false);
  }, [schoolId,referesh]);

  const handleSearch = (e: any) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = data.filter(
      (item) =>
        item.status.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query)
    );q
    /* @ts-ignore */
    setFilteredData(filtered);
  };

  const formatDate = (dateString: string | number | Date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const date = new Date(dateString);
    /* @ts-ignore */
    return date.toLocaleDateString("en-GB", options);
  };




  return (
    <div
      className="col-xxl-12"
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
                  width: "98%",
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
                    Fee Collect
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
                      onChange={handleSearch}
                      value={searchQuery}
                    />
                  </div>
                </div>
              </caption>
            </div>
            <tr
              style={{
                height: "61px",
                gap: "40px",
                display: "flex",
                paddingTop: "10px",
                paddingLeft: "55px",
                paddingRight:'50px',
                // position: "sticky",
                // top: 0,
                width: "auto",
                // border:'1px solid white',
                justifyContent:'space-between',
                overflowY: "auto",
                overflowX: "hidden",
                backgroundColor: "#1C335C",
                // zIndex: 100,
              }}
            >
              <th>
                <div style={{ width: "500px" }}>
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
              {/* <th>
                <div style={{ width: "700px" }}>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      lineHeight: "18px",
                      color: "#FFFFFF",
                      fontFamily: "Manrope",
                    }}
                  >
                    Fee Group
                  </span>
                </div>
              </th> */}
              

              <th>
                <div
                  style={{
                    width: "200px",
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
              // maxHeight: "100%",
              display: "flex",
              flexDirection: "column",
              minHeight: "calc(100vh - 550px)",
              overflowY: "auto",
            }}
          >
            {filteredData.map((item, index) => (
              <tr
                key={index}
                style={{
                  height: "61px",
                  gap: "40px",
                  paddingLeft: "55px",
                  paddingRight: "0px",
                  paddingTop: "16px",
                  width: "100%",          
                  display: "flex",
                  backgroundColor: index % 2 === 0 ? "#F5F5F5" : "#FFF",
                  // border:'1px solid'
                  justifyContent:'space-between'
                }}
              >
                <td>
                  <div
                    style={{
                      width: "400px",
                      display: "flex",
                      justifyContent: "start",
                      flexDirection: "column",
                      // border:'1px solid'
                    }}
                  >
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        lineHeight: "18px",
                        color: "#000000",
                        fontFamily: "Manrope",
                        // border:'1px solid'
                      }}
                    >
                      {item.class}
                    </span>
                  </div>
                </td>
                {/* <td>
                  <div
                    style={{
                      width: "890px",
                      display: "flex",
                      justifyContent: "start",
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
                      {item.fee_group_name}
                    </span>
                  </div>
                </td> */}
                
                <td>
                  <div
                    style={{
                      width: "200px",
                      display: "flex",
                      justifyContent: "space-around ",
                      flexDirection: "row",
                      gap: "6px",
                      marginTop: "-8px",
                      // border:'1px solid'
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
                      onClick={() => handleActionModal(item.id)}
                    >
                      Collect
                    </button>
                    
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          {/* <CreateWalkinEnquiry show={showModal} handleClose={handleModalClose} /> */}
          {/* <CreateFeeCollectExist show={showActionModal} handleClose={handleActionModalClose} feeGroup_id={feeGroup_id} class_id={class_id} setRefresh={setRefresh}/> */}
          {/* <CreateStartAdmissionProcess show={showEditModal} handleClose={handleModalEditClose} feeGroup_id={feeGroup_id} /> */}
        </table>
      </div>
    </div>
  );
};

export { TablesWidget62 };
