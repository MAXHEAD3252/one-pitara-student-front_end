import React, { useState } from "react";
import { useAuth } from "../../../../app/modules/auth";

const TablesWidget11: React.FC = () => {
  const [showLastYearValue, setLastYearValue] = useState(false);

  const handelLastYear = () => {
    setLastYearValue((prevState) => !prevState);
  };
  const { currentUser } = useAuth();
  const currency = currentUser.currency_symbol;

  return (
    <div
      className=""
      style={{
        width: "100%",
        height: "585px",
        borderRadius: "16px",
        border: "1px solid #F5F5F5",
        overflow: "hidden",
      }}
    >
      {/* <div
        style={{
          width: "100%",
          height: "83px",
          padding: "24px 25px 9px 30px",
          display: "flex",
          gap: "20px",
          backgroundColor: "#F5F5F5",
          borderRadius: "16px 16px 0px 0px",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "36px",
            top: "24px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "80%", height: "10px" }}>
            <span
              style={{
                fontSize: "18px",
                lineHeight: "19.12px",
                fontWeight: "700",
                // color: "#000000",
                color: "#000",
              }}
            >
              Fee Breakdown by Class
            </span>
          </div>
          <div className="">
            <div
              style={{
                width: "95px",
                height: "36px",
                display: "flex",
                border: "1px solid #E3E3E3",
                borderRadius: "42px",
                padding: "8px 9px 8px 9px",
                // alignItems: "center",
                gap: "10px",
              }}
            >
              <label
                style={{
                  fontSize: "12px",
                  lineHeight: "17px",
                  fontWeight: "500",
                  width: "30px",
                  height: "20px",
                  color:'#252525',
                paddingTop:'1px'
                }}
                htmlFor="googleswitch"
              >
                LYSM
              </label>
              <div className="form-check  form-switch">
                <input
                  className="form-check-input bg-pink"
                  type="checkbox"
                  // id="googleswitch"
                  style={{
                    width: "35px",
                    height: "20px",
                    gap: "10px",
                    color: "#1F3259",
                    // backgroundColor:'gray'
                  }}
                  onClick={() => handelLastYear()}
                />
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <table
        className=""
        style={{
          top: "123px",
          width: "100%",
          // height: "250px",
          borderCollapse: "collapse",
          // overflowX: "hidden",
          overflowY: "auto",
          whiteSpace: "nowrap",
        }}
      >
        <thead
          style={{
            // border:'1px solid ',
            backgroundColor: "#F5F5F5",
            display: "flex",
            flexDirection: "column",
            // width:'100%',
            height: "120px",
            maxHeight: "100%",
            justifyContent: "space-between",
            zIndex: 999,
            paddingLeft: "24px",
            paddingRight: "24px",
            // borderBottom: "1px solid #DADADA",
          }}
        >
          <caption
            style={{
              // backgroundColor: "#1C335C",
              // backgroundColor:'#1C335C',
              // padding: "20px",
              paddingLeft: "20px",
              paddingRight: "20px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "24px",

              padding: "0px",
              // border:'1px solid'
            }}
          >
            <div style={{ display: "flex", gap: "10px" }}>
              <span
                style={{
                  color: "#000",
                  fontSize: "16px",
                  fontWeight: "600",
                  fontFamily: "Manrope",
                }}
              >
                Fee Breakdown by Class
              </span>
            </div>
            <div className="">
              <div
                style={{
                  width: "95px",
                  height: "36px",
                  display: "flex",
                  border: "1px solid #DADADA",
                  borderRadius: "42px",
                  padding: "7px 9px 8px 10px",
                  // alignItems: "center",
                  gap: "10px",
                }}
              >
                <label
                  style={{
                    fontSize: "12px",
                    lineHeight: "17px",
                    fontWeight: "600",
                    width: "30px",
                    height: "20px",
                    color: "#000",
                    paddingTop: "2px",
                    fontFamily: "Manrope",
                  }}
                  htmlFor="googleswitch"
                >
                  LYSM
                </label>
                <div
                  className="form-check  form-switch"
                  style={{ paddingTop: "2px" }}
                >
                  <input
                    className="form-check-input bg-pink"
                    type="checkbox"
                    // id="googleswitch"
                    style={{
                      width: "35px",
                      height: "20px",
                      gap: "10px",
                      color: "#1F3259",
                      // paddingTop:'5px'
                    }}
                    onClick={() => handelLastYear()}
                  />
                </div>
              </div>
            </div>
          </caption>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <tr
              style={{
                width: "100%",
                height: "34px",
                display: "flex",
                paddingRight: "24px",
                justifyContent: "space-between",
                gap: "20px",
                // backgroundColor:'#1C335C',
                // backgroundColor:'#F5F5F5',
                // paddingLeft: "15px",
                // paddingTop: "15px",
                // paddingRight:'35px'
              }}
            >
              <th style={{ width: "fit-content", height: "18px" }}>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    lineHeight: "18px",
                    color: "#000",
                    fontFamily: "Manrope",
                  }}
                >
                  Class
                </span>
              </th>
              <th style={{ width: "fit-content", height: "18px" }}>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    lineHeight: "18px",
                    color: "#000",
                    fontFamily: "Manrope",
                  }}
                >
                  Expected Fee
                </span>
              </th>
              <th style={{ width: "fit-content", height: "18px" }}>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    lineHeight: "18px",
                    color: "#000",
                    fontFamily: "Manrope",
                  }}
                >
                  Collected Fee
                </span>
              </th>
              <th style={{ width: "fit-content", height: "18px" }}>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    lineHeight: "18px",
                    color: "#000",
                    fontFamily: "Manrope",
                  }}
                >
                  Due Fee
                </span>
              </th>
            </tr>
          </div>
        </thead>
        <tbody
          className=""
          style={{
            display: "block",
            height: "418px",
            overflowY: "auto",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            className="tile-shadow"
            style={{
              display: "flex",
              height: "61px",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              backgroundColor: "#F7F9FB",
            }}
          >
            <tr
              className=""
              style={{
                width: "100%",
                height: "61px",
                display: "flex",
                paddingLeft: "24px",
                paddingRight: "24px",
                paddingTop: "18px",
                justifyContent: "space-between",
              }}
            >
              <td>
                <div
                  className=""
                  style={{
                    width: "fit-content",
                    display: "flex",
                    justifyContent: "start",
                    flexDirection: "column",
                  }}
                >
                  <a
                    href="#"
                    className=""
                    style={{
                      fontFamily: "Manrope",
                      fontSize: "14px",
                      fontWeight: "700",
                      color: "#000",
                    }}
                  >
                    Class 1
                  </a>
                </div>
              </td>
              <td style={{ width: "fit-content" }}>
                <div
                  style={{
                    width: "fit-content",
                    display: "flex",
                    marginRight: "25px",
                    justifyContent: "start",
                    flexDirection: "column",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "400",
                      lineHeight: "18px",
                      color: "#1F1F1F",
                      fontFamily: "Manrope",
                    }}
                  >
                    {currency + " " + "200,000"}
                  </span>
                  {showLastYearValue ? (
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "400",
                        lineHeight: "18px",
                        color: "#737373",
                        fontFamily: "Manrope",
                      }}
                    >
                      {currency + " " + "200,000"}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </td>
              <td style={{ width: "fit-content" }}>
                <div
                  style={{
                    width: "fit-content",
                    display: "flex",
                    justifyContent: "start",
                    flexDirection: "column",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "400",
                      lineHeight: "18px",
                      color: "#1F1F1F",
                      fontFamily: "Manrope",
                    }}
                  >
                    {currency + " " + "200,000"}
                  </span>
                  {showLastYearValue ? (
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "400",
                        lineHeight: "18px",
                        color: "#737373",
                        fontFamily: "Manrope",
                      }}
                    >
                      {currency + " " + "200,000"}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </td>
              <td>
                <div
                  style={{
                    width: "fit-content",
                    display: "flex",
                    marginRight: "25px",
                    justifyContent: "start",
                    flexDirection: "column",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "400",
                      lineHeight: "18px",
                      color: "#1F1F1F",
                      fontFamily: "Manrope",
                    }}
                  >
                    {currency + " " + "200,000"}
                  </span>
                  {showLastYearValue ? (
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "400",
                        lineHeight: "18px",
                        color: "#737373",
                        fontFamily: "Manrope",
                      }}
                    >
                      {currency + " " + "200,000"}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </td>
            </tr>
          </div>
          <div
            className="tile-shadow"
            style={{
              display: "flex",
              justifyContent: "center",
              height: "61px",
              width: "100%",
              alignItems: "center",
            }}
          >
            <tr
              className=""
              style={{
                width: "100%",
                height: "61px",
                display: "flex",
                paddingLeft: "24px",
                paddingRight: "24px",
                paddingTop: "18px",

                justifyContent: "space-between",
                backgroundColor: "#FFF",
              }}
            >
              <td>
                <div
                  className=""
                  style={{
                    width: "fit-content",
                    display: "flex",
                    justifyContent: "start",
                    flexDirection: "column",
                  }}
                >
                  <a
                    href="#"
                    className=""
                    style={{
                      fontFamily: "Manrope",
                      fontSize: "14px",
                      fontWeight: "700",
                      color: "#000",
                    }}
                  >
                    Class 1
                  </a>
                </div>
              </td>
              <td style={{ width: "fit-content" }}>
                <div
                  style={{
                    width: "fit-content",
                    display: "flex",
                    marginRight: "25px",
                    justifyContent: "start",
                    flexDirection: "column",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "400",
                      lineHeight: "18px",
                      fontFamily: "Manrope",
                      color: "#1F1F1F",
                    }}
                  >
                    {currency + " " + "200,000"}
                  </span>
                  {showLastYearValue ? (
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "400",
                        lineHeight: "18px",
                        fontFamily: "Manrope",
                        color: "#737373",
                      }}
                    >
                      {currency + " " + "200,000"}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </td>
              <td style={{ width: "fit-content" }}>
                <div
                  style={{
                    width: "fit-content",
                    display: "flex",
                    justifyContent: "start",
                    flexDirection: "column",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "400",
                      lineHeight: "18px",
                      color: "#1F1F1F",
                      fontFamily: "Manrope",
                    }}
                  >
                    {currency + " " + "200,000"}
                  </span>
                  {showLastYearValue ? (
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "400",
                        lineHeight: "18px",
                        color: "#737373",
                        fontFamily: "Manrope",
                      }}
                    >
                      {currency + " " + "200,000"}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </td>
              <td>
                <div
                  style={{
                    width: "fit-content",
                    marginRight: "25px",
                    display: "flex",
                    justifyContent: "start",
                    flexDirection: "column",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "400",
                      lineHeight: "18px",
                      color: "#1F1F1F",
                      fontFamily: "Manrope",
                    }}
                  >
                    {currency + " " + "200,000"}
                  </span>
                  {showLastYearValue ? (
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "400",
                        lineHeight: "18px",
                        color: "#737373",
                        fontFamily: "Manrope",
                      }}
                    >
                      {currency + " " + "200,000"}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </td>
            </tr>
          </div>
          <div
            className="tile-shadow"
            style={{
              display: "flex",
              height: "61px",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              backgroundColor: "#F7F9FB",
            }}
          >
            <tr
              className=""
              style={{
                width: "100%",
                height: "59px",
                display: "flex",
                paddingLeft: "24px",
                paddingRight: "24px",
                paddingTop: "18px",
                justifyContent: "space-between",
              }}
            >
              <td>
                <div
                  className=""
                  style={{
                    width: "fit-content",
                    display: "flex",
                    justifyContent: "start",
                    flexDirection: "column",
                  }}
                >
                  <a
                    href="#"
                    style={{
                      fontFamily: "Manrope",
                      fontSize: "14px",
                      fontWeight: "700",
                      color: "#000",
                    }}
                  >
                    Class 1
                  </a>
                </div>
              </td>
              <td style={{ width: "fit-content" }}>
                <div
                  style={{
                    width: "fit-content",
                    display: "flex",
                    marginRight: "25px",
                    justifyContent: "start",
                    flexDirection: "column",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "400",
                      lineHeight: "18px",
                      color: "#1F1F1F",
                      fontFamily: "Manrope",
                    }}
                  >
                    {currency + " " + "200,000"}
                  </span>
                  {showLastYearValue ? (
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "400",
                        lineHeight: "18px",
                        color: "#737373",
                        fontFamily: "Manrope",
                      }}
                    >
                      {currency + " " + "200,000"}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </td>
              <td style={{ width: "fit-content" }}>
                <div
                  style={{
                    width: "fit-content",
                    display: "flex",
                    justifyContent: "start",
                    flexDirection: "column",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "400",
                      lineHeight: "18px",
                      color: "#1F1F1F",
                      fontFamily: "Manrope",
                    }}
                  >
                    {currency + " " + "200,000"}
                  </span>
                  {showLastYearValue ? (
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "400",
                        lineHeight: "18px",
                        color: "#737373",
                        fontFamily: "Manrope",
                      }}
                    >
                      {currency + " " + "200,000"}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </td>
              <td>
                <div
                  style={{
                    width: "fit-content",
                    display: "flex",
                    marginRight: "25px",
                    justifyContent: "start",
                    flexDirection: "column",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "400",
                      lineHeight: "18px",
                      color: "#1F1F1F",
                      fontFamily: "Manrope",
                    }}
                  >
                    {currency + " " + "200,000"}
                  </span>
                  {showLastYearValue ? (
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "400",
                        lineHeight: "18px",
                        color: "#737373",
                        fontFamily: "Manrope",
                      }}
                    >
                      {currency + " " + "200,000"}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </td>
            </tr>
          </div>
        </tbody>
        {/* end::Table body */}
      </table>
      {/* end::Table */}
    </div>
  );
};

export { TablesWidget11 };

//this is the code when the list is comeing from the api and it has the functionallity to behave in such as way that the odd will not have the background color and even will
// const dataFromApi = [/* your API data here */];

// <table
//   style={{ top: "123px", width: "619px", height: "408px", borderCollapse: "collapse" }}
// >
//   <tbody className="d-flex justify-content-center">
//     {dataFromApi.map((item, index) => (
//       <tr
//         key={index}
//         style={{
//           width: "520px",
//           height: "51px",
//           gap: "45px",
//           display: "flex",
//           paddingTop: '15px',
//           background: index % 2 === 0 ? 'lightblue' : 'white',
//         }}
//       >
//         <td style={{ width: "110px" }}>
//           <div className="d-flex justify-content-start">
//             <a href="#" className="text-gray-900 fw-bold text-hover-primary mb-1 fs-6">
//               {item.field1}
//             </a>
//           </div>
//         </td>
//         <td style={{ width: "110px" }}>
//           <div className="d-flex justify-content-start">
//             <a href="#" className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
//               {item.field2}
//             </a>
//           </div>
//         </td>
//         <td style={{ width: "110px" }}>
//           <div className="d-flex justify-content-start">
//             <a href="#" className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
//               {item.field3}
//             </a>
//           </div>
//         </td>
//         <td style={{ width: "110px" }}>
//           <div className="d-flex justify-content-start">
//             <a href="#" className="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6">
//               {item.field4}
//             </a>
//           </div>
//         </td>
//       </tr>
//     ))}
//   </tbody>
// </table>
