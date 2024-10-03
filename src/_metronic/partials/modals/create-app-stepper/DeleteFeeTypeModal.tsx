/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useAuth } from "../../../../app/modules/auth/index.ts";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints.tsx";

type Props = {
  show: boolean;
  onHide: () => void;
  fee_type_id: number | null;
  setReferesh : any;
};




const DeleteFeeTypeModal = ({ show, onHide, fee_type_id, setReferesh}: Props) => {
  // const [FeeDetails, setFeesDetails] = useState([]);
  const { currentUser } = useAuth();
  const schoolId = currentUser?.school_id;
  const [isConfirmed, setIsConfirmed] = useState(false); // State to track confirmation
  

  const handleConfirm = () => {
    setIsConfirmed(true); // Set confirmation state to true
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${DOMAIN}/api/school/delete-feetype/${fee_type_id}/${schoolId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Deleted Successfully:", data);
      onHide();
      setReferesh(true);
    } catch (error) {
      console.error("Error in Delete:", error);
    }
  };

  return(
    <Modal
      id="kt_modal_create_app"
      tabIndex={-1}
      size='sm'
      aria-hidden="true"
      dialogClassName="modal-dialog modal-dialog-centered mw-500px"
      show={show}
      onHide={onHide}
    >
      <div
        className="modal-header"
        style={{
          backgroundColor: "#F2F6FF",
          borderBottom: "1px solid lightgray",
        }}
      >
        <h2>Delete Entry</h2>
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={onHide}
        >
          <i className="fas fa-times"></i>
        </div>
      </div>
      <div className="modal-body" style={{ backgroundColor: "#F2F6FF" }}>
          {!isConfirmed ? (
            <div style={{ textAlign: "center" }}>
              <p>Are you sure you want to Delete this Entry?</p>
              <button className="btn btn-danger" onClick={handleConfirm}>
                Confirm
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "23px" , display:'flex', justifyContent:'center',alignItems:'center',}}>

                <div style={{ display: "flex", justifyContent: "end" , marginRight:'5px',}}>
                  <button className="btn btn-danger" type="submit">
                    Delete
                  </button>
                </div>
                <div style={{ display: "flex", justifyContent: "end", marginLeft:'5px', }}>
                  <button className="btn btn-danger" type="button" onClick={()=>onHide()}>
                    Cancel
                  </button>
                </div>

              </div>
            </form>
          )}
        </div>
    </Modal>
  );
};

export { DeleteFeeTypeModal };
