/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import "../../../../../app/pages/StaffPages/FinancialManagement/style.css";

const EngageWidget10 = ({title, number,image }:any) => {
  return (
    <div
      style={{ height: "340px", width: "100%" }}
    >
      <div className="card mb-3" style={{ maxWidth: "440px", backgroundColor:'#F2F6FF', justifyContent:'center', display:'flex'
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
              <h5 className="card-title" style={{fontFamily:'Manrope', fontSize:'18px', fontWeight:'600'}}>{title}</h5>
              <p className="card-text" style={{fontFamily:'Manrope', fontSize:'28px', fontWeight:'700', color:'#29B837'}}>
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
