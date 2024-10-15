import React, { FC } from "react";
import { useAuth } from "../../../../../app/modules/auth";

const CardsWidget25: FC = () => {

const { currentUser } = useAuth();
const currency = currentUser.currency_symbol;

  return (
    <div className=" h-md-100 mb-md-5 mb-lg-5"
      style={{
        backgroundColor: "#F2F6FF",
        // width: "100%",
        // height: "135px",
        borderRadius: "16px",
        padding: "20px ",
        gap: "27px",
        display: "flex",
        justifyContent: "center",
        
      }}
    >
      <div className="card-header d-flex" style={{width:'100%'}}>
        <div className="card-title d-flex flex-column" style={{width:'100%', justifyContent:'space-between'}}>
          <span
            style={{
              color: "#000000",
              fontWeight: "700",
              lineHeight: "19.12px",
              fontSize: "16px",
              fontFamily:"Manrope",
            }}
          >
            Fee Status
          </span>
          <div style={{width:'auto'}}>
            <div
              className="progress-stacked "
              style={{
                flex: "1",
                width: "100%",
                height: "30px",
                display: "flex",
                // border:'1px solid ',
                borderRadius:'8px'
              }}
            >
              <div
                className="progress"
                role="progressbar"
                aria-label="Segment one"
                aria-valuenow={40}
                aria-valuemin={0}
                aria-valuemax={100}
                style={{ width: "40%", height: "100%", background: "#34D399" }}
              >
                <div
                  className="progress-bar bg-success"
                  style={{
                    width: "100%",
                    color: "#FFFFFF",
                    fontWeight: "500",
                    fontSize: "14px",
                    lineHeight: "19.12px",
                    display: "flex",
                    alignItems: "end",
                    padding: "10px",
                    fontFamily:"Manrope",
                  }}
                >
                  40%
                </div>
              </div>
              <div
                className="progress"
                role="progressbar"
                aria-label="Segment two"
                aria-valuenow={60}
                aria-valuemin={0}
                aria-valuemax={100}
                style={{ width: "60%", height: "100%", background: "#FF66A1" }}
              >
                <div
                  className="progress-bar  bg-danger"
                  style={{
                    width: "100%",
                    color: "#FFFFFF",
                    fontWeight: "500",
                    fontSize: "14px",
                    lineHeight: "19.12px",
                    display: "flex",
                    alignItems: "end",
                    padding: "10px",
                    fontFamily:"Manrope",
                  }}
                >
                  60%
                </div>
              </div>
            </div>
          </div>
          <div>
          <div
            className="d-flex align-items-center"
            style={{
              gap: "20px",
              alignItems: "center",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <span
                style={{
                  color: "#2C2C2C",
                  fontWeight: "400",
                  lineHeight: "16.39px",
                  fontSize: "14px",
                  fontFamily:"Manrope",
                }}
              >
                Collected{" "}
                <span
                  style={{
                    color: "#329D00",
                    fontWeight: "700",
                    lineHeight: "16.39px",
                    fontSize: "14px",
                    fontFamily:"Manrope",
                  }}
                >
                  {currency +" "+'200,000'}
                </span>
              </span>
            </div>
            <div>
              <span
                style={{
                  color: "#2C2C2C",
                  fontWeight: "400",
                  lineHeight: "16.39px",
                  fontSize: "14px",
                  fontFamily:"Manrope",
                }}
              >
                Due{" "}
                <span
                  style={{
                    color: "#E04040",
                    fontWeight: "700",
                    lineHeight: "16.39px",
                    fontSize: "14px",
                    fontFamily:"Manrope",
                  }}
                >
                {currency +" "+'200,000'}
                </span>
              </span>
            </div>
          </div>
          <div
            className="d-flex align-items-center"
            style={{
              gap: "12px",
              alignItems: "center",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <span
                style={{
                  color: "#000",
                  fontWeight: "400",
                  lineHeight: "16.39px",
                  fontSize: "12px",
                  fontFamily:"Manrope",
                }}
              >
                <span style={{fontWeight:'400',color:'#4E4E4E',fontFamily:"Manrope",}}>Last Year</span> Collected{" "}
                <span
                  style={{
                    color: "#329D00",
                    fontWeight: "700",
                    lineHeight: "16.39px",
                    fontSize: "12px",
                    fontFamily:"Manrope",
                  }}
                >
                  {currency +" "+'200,000'}
                </span>
              </span>
            </div>
            <div>
              <span
                style={{
                  color: "#000",
                  fontWeight: "400",
                  lineHeight: "16.39px",
                  fontSize: "12px",
                  fontFamily:"Manrope",
                }}
              >
                Due {" "}
                <span
                  style={{
                    color: "#E04040",
                    fontWeight: "700",
                    lineHeight: "16.39px",
                    fontSize: "12px",
                    fontFamily:"Manrope",
                  }}
                >
                  {currency +" "+'200,000'}
                </span>
              </span>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CardsWidget25 };

{
  /* <div className="progress" role="progressbar" aria-label="Warning example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar text-bg-warning" style="width: 75%">75%</div>
</div> */
}
