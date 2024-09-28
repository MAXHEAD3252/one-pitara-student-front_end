import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Modal } from "react-bootstrap";
import { useAuth } from "../../../../app/modules/auth";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";

type Props = {
  show: boolean;
  handleClose: () => void;
  fee_type_id : number | null ;
  fee_type_code : string;
  fee_type_name : string;
  setReferesh : any;
};



const modalsRoot = document.getElementById("root-modals") || document.body;

const CreateEditFeeType = ({ show, handleClose, fee_type_id,fee_type_name,fee_type_code,setReferesh }: Props) => {
    const [formData, setFormData] = useState({
        name: fee_type_name,
        feeCode: fee_type_code,
        description: '',
      });
  const { currentUser } = useAuth();
  const schoolId = currentUser?.school_id;


//   console.log(fee_type_id)
//   console.log(fee_type_code)
//   console.log(fee_type_name)

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
        `${DOMAIN}/api/school/edit-feetype/${fee_type_id}/${schoolId}`,
        {
          method: 'PUT',
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
      setReferesh(true)
      handleClose();
      console.log('Response:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };



  return createPortal(
    <Modal
      id="kt_modal_create_app"
      tabIndex={-1}
      aria-hidden="true"
      dialogClassName="modal-dialog modal-dialog-centered mw-800px"
      show={show}
      onHide={handleClose}
      backdrop={true}
    >
        <div
        className="modal-content"
        style={{ padding: "20px 5px", borderRadius: "17px" }}
      >
        <div
          className="modal-header border-0"
          style={{ width: "100%", height: "27px" }}
        >
          <span
            className=""
            id="staticBackdropLabel"
            style={{
              justifyContent: "center",
              textAlign: "center",
              alignItems: "center",
              fontSize: "24px",
              fontWeight: "600",
              fontFamily: "Manrope",
            }}
          >
            Edit Fee Type
          </span>
          <span
            data-bs-dismiss="modal"
            onClick={handleClose}
            aria-label="Close"
          >
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
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        <hr />
    <div className="modal-body" 
    style={{ justifyContent: "center" }}
    >
    <div
        className="col-xxl-4"
        style={{
          borderRadius: "16px",
          border: "1px solid #5D637A",
          overflowX: "hidden",
          minHeight: "100%",
          marginBottom: "20px",
          height: "480px",
          width:'100%',
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
                Edit
              </span>
            </button>
          </div>
          </form>
        </div>
        </div>
        </div>
        </div>
    </Modal>,
    modalsRoot
  );
};

export { CreateEditFeeType };
