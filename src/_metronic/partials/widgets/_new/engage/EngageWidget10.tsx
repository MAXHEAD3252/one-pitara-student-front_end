/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import "../../../../../app/pages/StaffPages/FinancialManagement/style.css";

const EngageWidget10 = ({title, number,image, backgroundColor,titlecolor, textcolor}:any) => {
  return (
    <div
      style={{ height: "340px", width: "100%" }}
    >
      <div className="card mb-3" style={{ maxWidth: "440px", backgroundColor: backgroundColor, justifyContent:'center', display:'flex', boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}>
        <div className="row g-0" style={{alignItems:'center' ,justifyContent:'center'}}>
          <div className="col-md-2">
            <img
              src={`/media/product/${image}.png`}
              className="img-fluid rounded-start"
              alt="..."
              width={90}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title" style={{fontFamily:'Manrope', fontSize:'18px', fontWeight:'600', color:titlecolor}}>{title}</h5>
              <p className="card-text" style={{fontFamily:'Manrope', fontSize:'28px', fontWeight:'700', color:textcolor}}>
               {number}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { EngageWidget10 };
