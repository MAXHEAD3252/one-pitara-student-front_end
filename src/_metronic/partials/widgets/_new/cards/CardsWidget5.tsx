import { FC, useEffect, useState } from "react";
import {
  DOMAIN,
  get_schoolbyid,
} from "../../../../../app/routing/ApiEndpoints";


interface CardsWidget5Props {
  schoolId: string | undefined;
}

interface SchoolDetail {
  id: string; // Replace with actual types as needed
  name: string;
  address: string;
  email: string;
  phone: string;
  state: string;
  country: string;
  bank_account_no: string;
  bank_name: string;
  // Add other fields here as needed
}
  

const CardsWidget5: FC<CardsWidget5Props> = ({ schoolId }) => {
const [schoolDetail, setschoolDetails] = useState<SchoolDetail | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${DOMAIN}/${get_schoolbyid}/${schoolId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setschoolDetails(data[0]);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching school details:", error);
      }
    };

    fetchData();
  }, [schoolId]);

  return (
    <div
      className=""
      style={{
        width: "100%",
        height: "250px",
        padding: "24px",
        borderRadius: "16px",
        backgroundColor: "#F2F6FF",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "36px",
          gap: "145px",
          display: "flex",
          // border: "1px solid",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "100%", borderBottom: "1px solid lightgray" }}>
          <span
            style={{
              width: "122px",
              height: "10px",
              fontSize: "16px",
              fontWeight: "600",
              lineHeight: "19.12px",
              color: "#212121",
              fontFamily: "Manrope",
            }}
          >
            school Details
          </span>
        </div>
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className="card-body" style={{ width: "100%" }}>
        <div
          style={{
            marginTop: "14px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div style={{ display: "flex", gap: "50px" }}>
            <div style={{ gap: "10px", display: "flex" }}>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "21.86px",
                  color: "#212121",
                  fontFamily: "Manrope",
                }}
              >
                school Name:
              </span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  lineHeight: "21.86px",
                  color: "#212121",
                  fontFamily: "Manrope",
                }}
              >
                {schoolDetail?.name}
              </span>
            </div>
            <div style={{ gap: "10px", display: "flex" }}>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "21.86px",
                  color: "#212121",
                  fontFamily: "Manrope",
                }}
              >
                school Email:
              </span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  lineHeight: "21.86px",
                  color: "#212121",
                  fontFamily: "Manrope",
                }}
              >
                {schoolDetail?.email}
              </span>
            </div>
            <div style={{ gap: "10px", display: "flex" }}>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "21.86px",
                  color: "#212121",
                  fontFamily: "Manrope",
                }}
              >
                school Phone:
              </span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  lineHeight: "21.86px",
                  color: "#212121",
                  fontFamily: "Manrope",
                }}
              >
                {schoolDetail?.phone}
              </span>
            </div>
            <div style={{ gap: "10px", display: "flex" }}>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "21.86px",
                  color: "#212121",
                  fontFamily: "Manrope",
                }}
              >
                school Address:
              </span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  lineHeight: "21.86px",
                  color: "#212121",
                  fontFamily: "Manrope",
                }}
              >
                {schoolDetail?.address}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: "50px" }}>
            <div style={{ gap: "10px", display: "flex" }}>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "21.86px",
                  color: "#212121",
                  fontFamily: "Manrope",
                }}
              >
                school Type:
              </span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  lineHeight: "21.86px",
                  color: "#212121",
                  fontFamily: "Manrope",
                }}
              >
                CBSE
                {/* {schoolDetail?.type_of_school} */}
              </span>
            </div>
            <div style={{ gap: "10px", display: "flex" }}>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "21.86px",
                  color: "#212121",
                  fontFamily: "Manrope",
                }}
              >
                school Website:
              </span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  lineHeight: "21.86px",
                  color: "#212121",
                  fontFamily: "Manrope",
                }}
              >
                {schoolDetail?.name}
              </span>
            </div>
            <div style={{ gap: "10px", display: "flex" }}>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "21.86px",
                  color: "#212121",
                  fontFamily: "Manrope",
                }}
              >
                Year founded:
              </span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  lineHeight: "21.86px",
                  color: "#212121",
                  fontFamily: "Manrope",
                }}
              >
                {schoolDetail?.name}
              </span>
            </div>
            <div style={{ gap: "10px", display: "flex" }}>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "21.86px",
                  color: "#212121",
                  fontFamily: "Manrope",
                }}
              >
                State:
              </span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  lineHeight: "21.86px",
                  color: "#212121",
                  fontFamily: "Manrope",
                }}
              >
                {schoolDetail?.state}
              </span>
            </div>
            <div style={{ gap: "10px", display: "flex" }}>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "21.86px",
                  color: "#212121",
                  fontFamily: "Manrope",
                }}
              >
                Country:
              </span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  lineHeight: "21.86px",
                  color: "#212121",
                  fontFamily: "Manrope",
                }}
              >
                {schoolDetail?.country}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: "50px" }}>
            <div style={{ gap: "10px", display: "flex" }}>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "21.86px",
                  color: "#212121",
                  fontFamily: "Manrope",
                }}
              >
                Bank Account Number:
              </span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  lineHeight: "21.86px",
                  color: "#212121",
                  fontFamily: "Manrope",
                }}
              >
                {schoolDetail?.bank_account_no}
              </span>
            </div>
            <div style={{ gap: "10px", display: "flex" }}>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "21.86px",
                  color: "#212121",
                  fontFamily: "Manrope",
                }}
              >
                Bank Name:
              </span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  lineHeight: "21.86px",
                  color: "#212121",
                  fontFamily: "Manrope",
                }}
              >
                {schoolDetail?.bank_name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CardsWidget5 };
