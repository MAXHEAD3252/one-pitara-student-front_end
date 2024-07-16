/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC,useEffect, useState } from "react";
import { useAuth } from "../../../../../app/modules/auth/core/Auth";
import { DOMAIN } from "../../../../../app/routing/ApiEndpoints";

const CardsWidget35: FC = () => {

  const { currentUser } = useAuth();
  const school_id = currentUser?.school_id;

  const [totalContentUploads, setTotalContentUploads] = useState();


  useEffect(() => {
    const fetchTotalContentUploads = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/api/staff/get-totaluploadedcontent/${school_id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTotalContentUploads(data.totaluploadedContents);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTotalContentUploads();
  }, []);

  return (
    <div
      className="h-md-100 mb-md-5 mb-lg-5"
      style={{
        backgroundColor: "#1F3259",
        borderRadius: "16px",
        gap: "10px",
        // height:'auto',
        padding:'18px',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="card-header"
        style={{
          display: "flex",
          width:'100%',
          justifyContent: "center",
        }}
      >
        <div
          className="card-title"
          style={{
            justifyContent: "center",

            display: "flex",
            flexDirection: "column",
          }}
        >
          <span
            style={{
              color: "#FFFFFF",
              fontWeight: "600",
              lineHeight: "30.12px",
              fontSize: "20px",
              fontFamily: "Manrope",
            }}
          >
            Total Content Uploads
          </span>
        </div>
      </div>
      <div
        className="card-body"
        style={{
          display: "flex",
          width:'100%',
          justifyContent: "center",alignItems:'center'
        }}
      >
        <div
          className="d-flex"
          style={{
            gap: "24px",
          }}
        >
          <span
            style={{
              color: "#A7FFB0",
              fontWeight: "700",
              fontSize: "42px",
              lineHeight: "30px",
              fontFamily: "Manrope",
            }}
          >
            {totalContentUploads}
          </span>
        </div>
      </div>
    </div>
  );
};

export { CardsWidget35 };
