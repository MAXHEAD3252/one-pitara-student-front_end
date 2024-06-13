import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Modal } from "react-bootstrap";
import { StepperComponent } from "../../../assets/ts/components";
import { KTIcon } from "../../../helpers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TablesWidget18 } from "../../widgets/tables/TablesWidget18";

type Props = {
  show: boolean;
  handleClose: () => void;
};

const modalsRoot = document.getElementById("root-modals") || document.body;

const AddFeesMasterModal = ({ show, handleClose }: Props) => {
  const stepperRef = useRef<HTMLDivElement | null>(null);
  const [stepper, setStepper] = useState<StepperComponent | null>(null);

  const loadStepper = () => {
    setStepper(
      StepperComponent.createInsance(stepperRef.current as HTMLDivElement)
    );
  };
  const handleSave = () => {
    handleClose();
  };

  return createPortal(
    <Modal
      id="kt_modal_create_app"
      tabIndex={-1}
      aria-hidden="true"
      dialogClassName="modal-dialog modal-dialog-centered mw-550px"
      show={show}
      onHide={handleClose}
      onEntered={loadStepper}
      backdrop={true}
    >
      <div
        className="modal-content"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "23px 21px",
          width: "547px",
          height: "729px",
          borderRadius: "17px",
          border: "1px solid",
        }}
      >
        <div
          className="modal-header"
          style={{
            width: "100%",
            height: "36px",
            display: "flex",
            justifyContent: "space-between",
            padding: "0px",
          }}
        >
          <div style={{ width: "100%" }}>
            <span
              style={{
                fontSize: "24px",
                fontWeight: "600",
                fontFamily: "Manrope",
              }}
            >
              Add Fees Master : 2023-24
            </span>
          </div>
          <div
            className="btn btn-sm btn-icon btn-active-color-primary"
            onClick={handleClose}
          >
            <span>
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
        </div>
        <TablesWidget18 className="card-xxl-stretch mb-5 mb-xl-8" />
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>,
    modalsRoot
  );
};

export { AddFeesMasterModal };
