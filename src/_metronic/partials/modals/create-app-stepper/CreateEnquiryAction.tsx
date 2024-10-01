import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Modal, Form, Row, Col, InputGroup } from "react-bootstrap";
import { useAuth } from "../../../../app/modules/auth/core/Auth";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";

type Props = {
  show: boolean;
  handleClose: () => void;
  enqId: string | undefined;
  setRefresh: (refresh: boolean) => void;
};

const modalsRoot = document.getElementById("root-modals") || document.body;

const CreateEnquiryAction = ({ show, handleClose, enqId, setRefresh }: Props) => {
  const { currentUser } = useAuth();
  const schoolId = currentUser?.school_id;
  
  const [enqdata, setEnqdata] = useState({
    follow_up_date: "",
    status: "",
    name: "",
    father_name: "",
    father_phone: "",
  });

  const [formData, setFormData] = useState({
    status: "",
    is_move_to_adm: false,
    school_id: schoolId,
    follow_up_date: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
    setEnqdata((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const formatDateToYYYYMMDD = (dateString: string | null | undefined): string => {
    if (!dateString) return "";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ""; // Use getTime() to check if date is valid

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchEnquiryById = async () => {
      if (!schoolId || !enqId) return;

      try {
        const response = await fetch(
          `${DOMAIN}/api/school/getEnquiryById/${schoolId}/${enqId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const follow_up_date = data?.[0]?.follow_up_date
          ? formatDateToYYYYMMDD(data[0].follow_up_date)
          : "";

        setEnqdata({
          name: data[0]?.student_name || "",
          father_phone: data[0]?.father_phone || "",
          father_name: data[0]?.father_name || "",
          follow_up_date: follow_up_date || "",
          status: data[0]?.status || "",
        });
      } catch (error) {
        console.error("Error fetching Enquiry:", error);
      }
    };
    fetchEnquiryById();
  }, [schoolId, enqId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${DOMAIN}/api/school/update-followup/${schoolId}/${enqId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formData,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Follow-up updated successfully:", data);
      handleClose();
      setRefresh(true);
    } catch (error) {
      console.error("Error updating follow-up:", error);
    }
  };

  return createPortal(
    <Modal
      id="kt_modal_create_app"
      tabIndex={-1}
      size="lg"
      aria-hidden="true"
      dialogClassName="modal-dialog modal-dialog-centered mw-1000px"
      show={show}
      onHide={handleClose}
    >
      <div
        className="modal-header"
        style={{
          backgroundColor: "#F2F6FF",
          borderBottom: "1px solid lightgray",
          fontFamily:'Manrope'
        }}
      >
        <h2>WalkIn Enquiry</h2>
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={handleClose}
        >
          <i className="fas fa-times"></i>
        </div>
      </div>
      <div
        className="modal-body py-lg-10 px-lg-10"
        style={{ backgroundColor: "#F2F6FF",fontFamily:'Manrope' }}
      >
          <Form onSubmit={handleSubmit}>
            {/* Enquiry Info */}
            <Row className="mb-4">
              <Col>
                <strong>Name: </strong>{enqdata.name}
              </Col>
              <Col>
                <strong>Father’s Name: </strong>{enqdata.father_name}
              </Col>
              <Col>
                <strong>Father’s Contact: </strong>{enqdata.father_phone}
              </Col>
            </Row>

            {/* Follow Up Date and Status */}
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="formFollowUpDate">
                  <Form.Label>Follow Up Date</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="date"
                      name="follow_up_date"
                      value={enqdata.follow_up_date}
                      onChange={handleChange}
                      required
                    />
                    <InputGroup.Text>
                      <i className="fas fa-calendar"></i>
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formStatus">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={enqdata.status}
                    onChange={handleChange}
                    required
                  >
                    <option value="active">Active</option>
                    <option value="dead">Dead</option>
                    <option value="lost">Lost</option>
                    <option value="won">Won</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {/* Move to Admission Toggle */}
            <Form.Group controlId="formMoveToAdm" className="d-flex align-items-center mb-4">
              <Form.Label className="me-2">Move to Admission</Form.Label>
              <Form.Check
                type="switch"
                id="is_move_to_adm"
                name="is_move_to_adm"
                checked={formData.is_move_to_adm}
                onChange={handleChange}
                disabled={enqdata.status !== "won"}
              />
            </Form.Group>

            {/* Submit Button */}
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </Form>
        </div>
    </Modal>,
    modalsRoot
  );
};

export { CreateEnquiryAction };
