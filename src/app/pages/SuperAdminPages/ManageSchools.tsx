/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
// import { FC } from "react";
import { useIntl } from "react-intl";
import { PageTitle } from "../../../_metronic/layout/core";
import { Content } from "../../../_metronic/layout/components/content";
import { HeaderWrapper } from "../../../_metronic/layout/components/header_staff";
import { useEffect, useState } from "react";
import { CreateSchoolDetailModal } from "../../../_metronic/partials/";
import { CreateSchoolModal } from "../../../_metronic/partials/modals/create-app-stepper/CreateSchoolModal";
import { useNavigate } from "react-router-dom";
import { DOMAIN } from "../../routing/ApiEndpoints";

interface School {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  // Add other properties as needed
}

export const ManageSchoolsPage = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [showModal, setShowModal] = useState(false);
  // const [selectedSchool, setSelectedSchool] = useState(0);
  const [refreshData, setRefreshData] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch schools data from API
    const fetchSchools = async () => {
      try {
        const response = await fetch(`${DOMAIN}/api/superadmin/get_schools`);
        if (!response.ok) {
          throw new Error("Failed to fetch schools");
        }
        const data = await response.json();
        // console.log(data);

        setSchools(data);
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };

    fetchSchools();
  }, [refreshData]);

  // const editDetails = (id) => {
  //   // Navigate to a page/modal to edit details of the school with the given ID
  // };

  // const deleteSchool = (id) => {
  //   // Implement logic to delete the school with the given ID
  // };

  const handlePrimaryButtonClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };

  const handleViewSchool = (value: any) => {
    const schoolId = value;

    navigate(`/superadmin/school-profile/${schoolId}`);
  };

  return (
    <div className="bg-white">
      {/* <HeaderWrapper toggleView={() => {}} /> */}

      {/* <ToolbarDashBoard /> */}
      <Content>
        <div className="d-flex" style={{ gap: "10px" }}>
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
                style={{
                  top: "223px",
                  height: "613px",
                  maxHeight: "100%",
                  borderCollapse: "collapse",
                  overflowX: "hidden",
                  overflowY: "auto",
                  whiteSpace: "nowrap",
                  width: "100%",
                }}
              >
                <thead
                  style={{
                    height: "123px",
                    maxHeight: "100%",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#1C335C",
                    justifyContent: "space-between",
                    zIndex: 999,
                    alignItems: "center",
                  }}
                  className="col-xxl-12 col-lg-6"
                >
                  <caption
                    style={{
                      backgroundColor: "#1C335C",
                      padding: "20px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <div style={{ width: "224px", height: "13px" }}>
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: "700",
                          lineHeight: "21.86px",
                          color: "#FFFFFF",
                          fontFamily: "Manrope",
                        }}
                      >
                        Schools List
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
                          style={{
                            backgroundColor: "transparent",
                            color: "#FFFFFF",
                          }}
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
                        onClick={handlePrimaryButtonClick}
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
                        <div style={{ width: "105px", height: "9px" }}>
                          <span
                            style={{
                              fontSize: "12px",
                              fontWeight: "500",
                              color: "#000000",
                              lineHeight: "16.39px",
                              fontFamily: "Manrope",
                            }}
                          >
                            Add New School
                          </span>
                        </div>
                      </span>
                    </div>
                    {/* <AddschoolModal
                    show={showCreateAppModal}
                    handleClose={handleModalClose}
                    refresh={function (refresh: boolean): void {
                      throw new Error("Function not implemented.");
                    }}
                  /> */}
                  </caption>

                  <tr
                    style={{
                      height: "51px",
                      display: "flex",
                      // paddingLeft: "30px",
                      justifyContent: "space-between",
                      width: "95%",
                      overflowY: "auto",
                      overflowX: "hidden",
                      backgroundColor: "#1C335C",
                      alignItems: "center",
                    }}
                  >
                    <th>
                      <div
                        style={{
                          flex: "1",
                          maxWidth: "355px",
                          minWidth: "160px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "13px",
                            fontWeight: "700",
                            lineHeight: "18px",
                            color: "#FFFFFF",
                            position: "sticky",
                            top: "0",
                            zIndex: "1",
                            fontFamily: "Manrope",
                          }}
                        >
                          School Id
                        </span>
                      </div>
                    </th>
                    <th>
                      <div
                        style={{
                          flex: "1",
                          maxWidth: "350px",
                          minWidth: "230px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "13px",
                            fontWeight: "700",
                            lineHeight: "18px",
                            color: "#FFFFFF",
                            position: "sticky",
                            top: "0",
                            zIndex: "1",
                            fontFamily: "Manrope",
                          }}
                        >
                          School Name
                        </span>
                      </div>
                    </th>
                    <th>
                      <div
                        style={{
                          flex: "1",
                          maxWidth: "380px",
                          minWidth: "290px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "13px",
                            fontWeight: "700",
                            lineHeight: "18px",
                            color: "#FFFFFF",
                            fontFamily: "Manrope",
                          }}
                        >
                          School Email
                        </span>
                      </div>
                    </th>
                    <th>
                      <div
                        style={{
                          flex: "1",
                          maxWidth: "680px",
                          minWidth: "280px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "13px",
                            fontWeight: "700",
                            lineHeight: "18px",
                            color: "#FFFFFF",
                            fontFamily: "Manrope",
                          }}
                        >
                          School Phone
                        </span>
                      </div>
                    </th>
                    <th>
                      <div
                        style={{
                          flex: "1",
                          maxWidth: "680px",
                          minWidth: "460px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "13px",
                            fontWeight: "700",
                            lineHeight: "18px",
                            color: "#FFFFFF",
                            fontFamily: "Manrope",
                          }}
                        >
                          School Address
                        </span>
                      </div>
                    </th>
                    <th>
                      <div
                        style={{
                          flex: "1",
                          maxWidth: "115px",
                          minWidth: "50px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "13px",
                            fontWeight: "700",
                            lineHeight: "18px",
                            color: "#FFFFFF",
                            fontFamily: "Manrope",
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
                    minHeight: "calc(100vh - 250px)",
                    overflowY: "auto",
                    backgroundColor: "#F5F5F5",
                  }}
                >
                  {schools.map((group, index) => (
                    <tr
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        height: "fit-content",
                        paddingTop: "20px",
                        paddingLeft: "40px",
                        paddingRight: "75px",
                        paddingBottom: "20px",
                      }}
                    >
                      <td
                        style={{
                          maxWidth: "340px",
                          minWidth: "195px",
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
                            {group.school_id}
                          </span>
                        </div>
                      </td>
                      <td style={{ maxWidth: "355px", minWidth: "240px" }}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            fontFamily: "Manrope",
                          }}
                        >
                          {group.name}
                        </div>
                      </td>
                      <td style={{ maxWidth: "355px", minWidth: "300px" }}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            fontFamily: "Manrope",
                          }}
                        >
                          {group.email}
                        </div>
                      </td>
                      <td style={{ maxWidth: "355px", minWidth: "230px" }}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            fontFamily: "Manrope",
                          }}
                        >
                          {group.phone}
                        </div>
                      </td>
                      <td
                        style={{
                          width: "465px",
                          // paddingLeft:'5px',
                          display: "flex",
                          justifyContent: "start",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          className="overflow-hidden whitespace-nowrap"
                          style={{
                            width: "80%",
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            fontFamily: "Manrope",
                          }}
                        >
                          {group.address}
                        </div>
                      </td>

                      <td style={{ maxWidth: "115px", minWidth: "50px" }}>
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
                              width: "32px",
                              height: "40px",
                              borderRadius: "6px",
                              padding: "10px 6px 10px 6px",
                              gap: "10px",
                              backgroundColor: "#F5F5F5",
                              display: "flex",
                              // alignItems: "center",
                            }}
                            onClick={() => handleViewSchool(group.school_id)}
                          >
                            <img
                              src="/media/svg/files/view.svg"
                              style={{ width: "20px", height: "20px" }}
                            />
                            {/* <button
                            type="button"
                            className="btn btn-primary"
                            
                            style={{
                              fontFamily: "Manrope",
                              fontSize: "13px",
                              fontWeight: "500",
                            }}
                          >
                            View
                          </button> */}
                            {/* <CreateschoolDetailModal
                            show={showModal}
                            onHide={handleCloseModal}
                            school={selectedschool}
                          /> */}
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
            </div>
            <CreateSchoolModal
              show={showModal}
              handleClose={handleModalClose}
              refresh={function (refresh: boolean): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
        </div>
      </Content>
    </div>
  );
};

const ManageSchools = () => {
  const intl = useIntl();

  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.HOMEWORK" })}
      </PageTitle>

      <HeaderWrapper toggleView={() => {}} />
      <ManageSchoolsPage />
    </>
  );
};

export { ManageSchools };
