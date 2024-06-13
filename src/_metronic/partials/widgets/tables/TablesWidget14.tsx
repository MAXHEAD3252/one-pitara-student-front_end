import React, { useEffect, useState } from "react";
import "../../../../app/pages/StaffPages/FeeDetails/style.css";
//  backgroundColor: "#F5F5F5",
import { useAuth } from "../../../../app/modules/auth/index.ts";
import { EditFessMasterModal } from "../../modals/create-app-stepper/EditFessMasterModal.tsx";
const TablesWidget14: React.FC = () => {
  const [feeData, setFeeData] = useState([]);
  const { currentUser } = useAuth();
  const schoolId = currentUser?.school_id;

  const [showModal, setShowModal] = useState(false);
  const [feeId, setFeeId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/staff/getfeemaster-list/${schoolId}/${19}`
        );
        const data = await response.json();

        // Grouping fee data by fee_group_id`
        const groupedData = data.reduce((acc, item) => {
          const { fee_group_id, fee_group_name, fee_type, fee_amount, fee_id } =
            item;
          if (!acc[fee_group_id]) {
            acc[fee_group_id] = {
              name: fee_group_name,
              fees: [{ type: fee_type, amount: fee_amount, fid: fee_id }],
            };
          } else {
            acc[fee_group_id].fees.push({
              type: fee_type,
              amount: fee_amount,
              fid: fee_id,
            });
          }
          return acc;
        }, {});

        setFeeData(Object.values(groupedData));
      } catch (error) {
        console.error("Error fetching fee data:", error);
      }
    };

    fetchData();
  }, [showModal]);

  function handleOpenModal(id: any): void {
    setFeeId(id);
    setShowModal(true);
  }
  function handleCloseModal(): void {
    setShowModal(false);
  }

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
      <div style={{ overflow: "auto", width: "100%", height: "100%" }}>
        <table
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
          }}
        >
          <thead
            className="col-xxl-12"
            style={{
              position: "sticky",
              top: "0",
              zIndex: "1",
              height: "133px",
              maxHeight: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#1C335C",
              justifyContent: "space-between",
              gap: "0px",
              padding: "9px 24px 9px 24px",
            }}
          >
            <caption
              className="col-xxl-12"
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              <div style={{ width: "224px", height: "12px" }}>
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    lineHeight: "21.86px",
                    color: "#FFFFFF",
                  }}
                >
                  Fee Master List: 2022- 2023{" "}
                </span>
              </div>
              <div
                className="card-header"
                style={{
                  width: "497px",
                  height: "37px",
                  display: "flex",
                  gap: "8px",
                  justifyContent: "end",
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
                    style={{ backgroundColor: "transparent", color: "#FFFFFF" }}
                    className="form-control border-0 "
                    placeholder="Search ...."
                    aria-label="Username"
                    aria-describedby="addon-wrapping"
                  />
                </div>

                <span
                  // onClick={handlePrimaryButtonClick}
                  style={{
                    // width: "137px",
                    height: "36px",
                    borderRadius: "8px",
                    padding: "8px 10px 8px 10px",
                    gap: "5px",
                    backgroundColor: "#FFFFFF",
                    display: "flex",
                    flexDirection: "row",
                    cursor: "pointer",
                  }}
                  // onClick={handlePrimaryButtonClick}
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_103_1850)">
                      <path
                        d="M1.66663 10C1.66663 6.07165 1.66663 4.10746 2.88701 2.88708C4.1074 1.66669 6.07159 1.66669 9.99996 1.66669C13.9283 1.66669 15.8925 1.66669 17.1129 2.88708C18.3333 4.10746 18.3333 6.07165 18.3333 10C18.3333 13.9284 18.3333 15.8926 17.1129 17.113C15.8925 18.3334 13.9283 18.3334 9.99996 18.3334C6.07159 18.3334 4.1074 18.3334 2.88701 17.113C1.66663 15.8926 1.66663 13.9284 1.66663 10Z"
                        stroke="black"
                        stroke-width="1.5"
                      />
                      <path
                        d="M12.5 10L10 10M10 10L7.5 10M10 10L10 7.5M10 10L10 12.5"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_103_1850">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div style={{ width: "97px", height: "9px" }}>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "#000000",
                        lineHeight: "16.39px",
                      }}
                    >
                      Add Fee Master
                    </span>
                  </div>
                </span>
              </div>
            </caption>

            <tr
              style={{
                // gap: "40px",
                display: "flex",
                paddingTop: "15px",
                justifyContent: "space-between",
                paddingLeft: "40px",
                paddingRight: "85px",
                // border:'1px solid black',
                // width: "100%",

                backgroundColor: "#1C335C",
              }}
            >
              <th>
                <div
                  style={{ flex: "1", maxWidth: "355px", minWidth: "235px" }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "700",
                      lineHeight: "18px",
                      color: "#FFFFFF",
                      position: "sticky",
                      top: "0",
                      zIndex: "1",
                    }}
                  >
                    Fees Group
                  </span>
                </div>
              </th>
              <th>
                <div
                  style={{ flex: "1", maxWidth: "680px", minWidth: "500px" }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "700",
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
                  style={{ flex: "1", maxWidth: "115px", minWidth: "100px" }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "700",
                      lineHeight: "18px",
                      color: "#FFFFFF",
                    }}
                  >
                    Actions
                  </span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody
            className="col-xxl-12"
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              // width:'100%',
              // border: "1px solid #CCCCCC",
            }}
          >
            {feeData.map((group, index) => (
              <tr
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  height: "fit-content",
                  paddingTop: "20px",
                  paddingLeft: "60px",
                  paddingRight: "75px",
                  paddingBottom: "20px",
                }}
              >
                <td
                  style={{
                    maxWidth: "345px",
                    minWidth: "235px",
                    height: "9px",
                  }}
                >
                  <div className="d-flex align-items-center">
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        lineHeight: "18px",
                        color: "#000000",
                        fontFamily: "Manrope",
                      }}
                    >
                      {group.name}
                    </span>
                  </div>
                </td>

                <td style={{ maxWidth: "670px", minWidth: "500px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    {group.fees.map((fee, idx) => (
                      <div
                        key={idx}
                        style={{
                          height: "36px",
                          width: "fit-content",
                          display: "inline-flex",
                          flexDirection: "row",
                          borderRadius: "6px",
                          border: "1px solid #CCCCCC",
                          padding: "0px 6px",
                          gap: "0px",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "fit-content",
                            height: "36px",
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                            padding: "10px 6px 10px 6px",
                            alignItems: "center",
                            textAlign: "start",
                          }}
                        >
                          <span className="text-gray-900">{`${fee.type} RS${fee.amount}`}</span>
                          <div>
                            <button
                              //  onClick={() => handleOpenModal(fee.fid)} // Replace fee.id with the actual id
                              onClick={() => handleOpenModal(fee.fid)} // Replace fee.id with the actual id
                              style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                              }}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clip-path="url(#clip0_102_1546)">
                                  <path
                                    d="M14.6666 6.99998V7.99998C14.6666 11.1427 14.6666 12.714 13.6903 13.6903C12.714 14.6666 11.1427 14.6666 7.99998 14.6666C4.85728 14.6666 3.28593 14.6666 2.30962 13.6903C1.33331 12.714 1.33331 11.1427 1.33331 7.99998C1.33331 4.85728 1.33331 3.28593 2.30962 2.30962C3.28593 1.33331 4.85728 1.33331 7.99998 1.33331H8.99998"
                                    stroke="#1C274C"
                                    stroke-linecap="round"
                                  />
                                  <path
                                    d="M11.1013 2.30335L11.5339 1.87081C12.2505 1.15415 13.4125 1.15415 14.1291 1.87081C14.8458 2.58747 14.8458 3.74941 14.1291 4.46607L13.6966 4.89862M11.1013 2.30335C11.1013 2.30335 11.1554 3.22251 11.9664 4.03353C12.7775 4.84455 13.6966 4.89862 13.6966 4.89862M11.1013 2.30335L7.12476 6.27993C6.85542 6.54927 6.72075 6.68395 6.60493 6.83244C6.46831 7.0076 6.35118 7.19712 6.25561 7.39766C6.17459 7.56765 6.11436 7.74833 5.99391 8.1097L5.60826 9.26665M13.6966 4.89862L9.72003 8.87519C9.45068 9.14454 9.31601 9.27921 9.16752 9.39503C8.99236 9.53165 8.80284 9.64878 8.6023 9.74435C8.4323 9.82537 8.25162 9.8856 7.89026 10.006L6.73331 10.3917M6.73331 10.3917L5.98471 10.6412C5.80688 10.7005 5.61082 10.6542 5.47827 10.5217C5.34573 10.3891 5.29945 10.1931 5.35872 10.0153L5.60826 9.26665M6.73331 10.3917L5.60826 9.26665"
                                    stroke="#1C274C"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_102_1546">
                                    <rect width="16" height="16" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="7" cy="7" r="7" fill="white" />
                            <path
                              d="M10 4L4 10M4 4L10 10"
                              stroke="#464646"
                              stroke-linecap="square"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </td>

                <td style={{ maxWidth: "135px", minWidth: "75px" }}>
                  <div
                    style={{
                      width: "135px",
                      height: "40px",
                      display: "flex",
                      flexDirection: "row",
                      gap: "6px",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "90px",
                        height: "29px",
                        borderRadius: "6px",
                        padding: "0px 6px 0px 6px",
                        gap: "10px",
                        backgroundColor: "#F5F5F5",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: "400",
                          lineHeight: "18px",
                          color: "#000000",
                        }}
                      >
                        Tag?
                      </span>
                    </div>
                    <div
                      style={{
                        width: "32px",
                        height: "40px",
                        borderRadius: "6px",
                        padding: "10px 6px 10px 6px",
                        gap: "10px",
                        backgroundColor: "#FFE7E1",
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.0834 5H2.91663"
                          stroke="#ED5578"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                        <path
                          d="M15.6944 7.08331L15.3111 12.8326C15.1637 15.045 15.0899 16.1512 14.3691 16.8256C13.6482 17.5 12.5396 17.5 10.3222 17.5H9.67775C7.46042 17.5 6.35175 17.5 5.63091 16.8256C4.91007 16.1512 4.83632 15.045 4.68883 12.8326L4.30554 7.08331"
                          stroke="#ED5578"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                        <path
                          d="M7.91663 9.16669L8.33329 13.3334"
                          stroke="#ED5578"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                        <path
                          d="M12.0833 9.16669L11.6666 13.3334"
                          stroke="#ED5578"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                        <path
                          d="M5.41663 5C5.46319 5 5.48648 5 5.50758 4.99947C6.19379 4.98208 6.79915 4.54576 7.03264 3.90027C7.03982 3.88041 7.04719 3.85832 7.06191 3.81415L7.14282 3.57143C7.21188 3.36423 7.24642 3.26063 7.29222 3.17267C7.47497 2.82173 7.81308 2.57803 8.2038 2.51564C8.30173 2.5 8.41094 2.5 8.62934 2.5H11.3706C11.589 2.5 11.6982 2.5 11.7961 2.51564C12.1868 2.57803 12.525 2.82173 12.7077 3.17267C12.7535 3.26063 12.788 3.36423 12.8571 3.57143L12.938 3.81415C12.9527 3.85826 12.9601 3.88042 12.9673 3.90027C13.2008 4.54576 13.8061 4.98208 14.4923 4.99947C14.5134 5 14.5367 5 14.5833 5"
                          stroke="#ED5578"
                          stroke-width="1.5"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <EditFessMasterModal
          show={showModal}
          onHide={handleCloseModal}
          feeId={feeId}
        />
        <div
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
              width: "540px",
              height: "709px",
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
                  Add Fees Master : 2023-24
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
                <div style={{ marginBottom: "23px" }}>
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                    style={{
                      fontSize: "12px",
                      color: "#434343",
                      fontWeight: "500",
                    }}
                  >
                    Fees Group
                  </label>

                  <div className="dropdown" id="exampleFormControlInput1">
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
                      Select Group
                    </button>
                    <ul className="dropdown-menu" style={{ width: "100%" }}>
                      <li>
                        <a className="dropdown-item" href="#">
                          Action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Another action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Something else here
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div style={{ marginBottom: "23px" }}>
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                    style={{
                      fontSize: "12px",
                      color: "#434343",
                      fontWeight: "500",
                    }}
                  >
                    Fees Type
                  </label>

                  <div className="dropdown" id="exampleFormControlInput1">
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
                      Select Type
                    </button>
                    <ul className="dropdown-menu" style={{ width: "100%" }}>
                      <li>
                        <a className="dropdown-item" href="#">
                          Action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Another action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Something else here
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div style={{ marginBottom: "23px" }}>
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                    style={{
                      fontSize: "12px",
                      color: "#434343",
                      fontWeight: "500",
                    }}
                  >
                    Due Type
                  </label>

                  <div className="dropdown" id="exampleFormControlInput1">
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
                      Select Due Type
                    </button>
                    <ul className="dropdown-menu" style={{ width: "100%" }}>
                      <li>
                        <a className="dropdown-item" href="#">
                          Action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Another action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Something else here
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
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
                    Due Amount
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter Amount"
                    style={{ border: "1px solid #ECEDF1" }}
                  />
                </div>
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
                    Due Type
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
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    gap: "23px",
                  }}
                >
                  <div className="" style={{ width: "50%" }}>
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                      style={{
                        fontSize: "12px",
                        color: "#434343",
                        fontWeight: "500",
                      }}
                    >
                      Percentage
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Enter Percentage"
                      style={{ border: "1px solid #ECEDF1" }}
                    />
                  </div>
                  <div className="" style={{ width: "50%" }}>
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                      style={{
                        fontSize: "12px",
                        color: "#434343",
                        fontWeight: "500",
                      }}
                    >
                      Fine Amount
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Enter Fine Amount"
                      style={{ border: "1px solid #ECEDF1" }}
                    />
                  </div>
                </div>
              </div>
              <div
                className="modal-footer border-0"
                style={
                  {
                    // width: "100%",
                    // height: "30px",
                    // display: "flex",
                    // justifyContent: "end",
                    // padding: "0px 24px 21px 24px",
                    // border: "1px solid",
                  }
                }
              >
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
                    Save
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { TablesWidget14 };