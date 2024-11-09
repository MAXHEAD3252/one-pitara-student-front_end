import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Modal, Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import { DOMAIN,get_subscriptions,get_acedamic_year,AddSchool } from "../../../../app/routing/ApiEndpoints";
import "./CreateSchoolModal.css";
import { useAuth } from "../../../../app/modules/auth";

type Props = {
  show: boolean;
  handleClose: () => void;
  refresh:any;
};

interface AcedamicYear {
  id:number;
  session:string;
}
interface Subscription {
  id:number;
  name:string;
}

const modalsRoot = document.getElementById("root-modals") || document.body;

const CreateSchoolModal = ({ show, handleClose, refresh }: Props) => {
  const { currentUser } = useAuth();
  const [schoolName, setSchoolName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [dateFormat, setDateFormat] = useState("dd/mm/yyyy");
  const [timeFormat, setTimeFormat] = useState("hh:mm");
  const [currency, setCurrency] = useState("Rs");
  const [currencySymbol, setCurrencySymbol] = useState("₹");
  const [subscriptionType, setSubscriptionType] = useState("");
  const [schoolMaster, setSchoolMaster] = useState("");
  const [academicType, setAcademicType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [schoolMasterOptions, setSchoolMasterOptions] = useState([]);
  // const [schoolLogo, setSchoolLogo] = useState<File | null>(null);
  // const [schoolSmallLogo, setSchoolSmallLogo] = useState<File | null>(null);
  const [subscriptionOptions, setSubscriptionOptions] = useState<Subscription[]>([]);
  const [academicYear, setAcademicYear] = useState<AcedamicYear[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const validateForm = () => {
    if (!schoolName || !email || !phone || !subscriptionType || !schoolMaster) {
      return false;
    }
    return true;
  };

  // Fetch subscription options from the backend
  useEffect(() => {
    const fetchSubscriptionOptions = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/${get_subscriptions}`
        );
        if (!response.ok) {
          // Extract the status and error message from the response
          const errorData = await response.json();
          throw new Error(`Error ${errorData.status}: ${errorData.error || "Unknown error"}`);
        }
        const result = await response.json();

        setSubscriptionOptions(result.data);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching Subscriptions:", error.message);
        } else {
          console.error("An unexpected error occurred");
        }
      }
    };

    fetchSubscriptionOptions();
    // const fetchAcademicYear = async () => {
    //   try {
    //     const response = await fetch(
    //       `${DOMAIN}/api/superadmin/get_academicyear`
    //     );
    //     if (!response.ok) {
    //       throw new Error("Failed to fetch subscription types");
    //     }
    //     const data = await response.json();

    //     setAcademicYear(data); // Assuming the response has this structure
    //   } catch (error) {
    //     console.error("Error fetching subscription types:", error);
    //   }
    // };

    // fetchAcademicYear();
    const fetchSchoolMaster = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/api/superadmin/get-all-schools-masters`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch subscription types");
        }
        const data = await response.json();
        console.log(data);

        setSchoolMasterOptions(data); // Assuming the response has this structure
      } catch (error) {
        console.error("Error fetching subscription types:", error);
      }
    };

    fetchSchoolMaster();
  }, []);

  const handleSubmit = async () => {
    // Validate form input
    if (!validateForm()) {
      alert("Please fill in all required fields.");
      return;
    }
    setIsSubmitting(true);

    const formData = {
      name: schoolName,
      email: email,
      phone: phone,
      address: address,
      state: state,
      country: country,
      date_format: dateFormat,
      time_format: timeFormat,
      currency: currency,
      currency_symbol: currencySymbol,
      academic_year: academicType,
      subscription_type: subscriptionType,
      school_master: schoolMaster,
      start_date: startDate,
      end_date: endDate,
      userId: currentUser?.id,
    };

    try {
      const response = await fetch(`${DOMAIN}/${AddSchool}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set header for JSON
        },
        body: JSON.stringify(formData), // Convert formData object to JSON string
      });

      if (!response.ok) {
        // Extract the status and error message from the response
        const errorData = await response.json();
        throw new Error(`Error ${errorData.status}: ${errorData.error || "Unknown error"}`);
      }

      const result = await response.json();
      console.log("School created successfully:", result);
      // newSchoolId(result.school_id)
      refresh(true);
      handleClose();
    } catch (error) {
      console.error("Error creating school:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <Modal
      id="kt_modal_create_school"
      tabIndex={-1}
      aria-hidden="true"
      dialogClassName="modal-dialog modal-dialog-centered mw-1000px"
      show={show}
      onHide={handleClose}
      backdrop={true}
    >
      <div
        className="modal-header"
        style={{
          backgroundColor: "#F2F6FF",
          borderBottom: "1px solid lightgray",
          fontFamily: "Manrope",
          color: "#",
        }}
      >
        <h2>Create School</h2>
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={handleClose}
        >
          <i className="fas fa-times"></i>
        </div>
      </div>

      <div
        className="modal-body py-lg-10 px-lg-10"
        style={{
          backgroundColor: "#F2F6FF",
        }}
      >
        <Form>
          <Row>
            <Col md={4}>
              <Form.Group
                className="mb-3 custom-input"
                controlId="formSchoolName"
              >
                <Form.Label>School Name *</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-school"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Enter school name"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    required
                  />
                </InputGroup>
                <Form.Text className="text-muted">
                  This is an input helper text.
                </Form.Text>
              </Form.Group>
            </Col>
            {/* <Col md={4}>
              <Form.Group className='mb-3 custom-input' controlId='formTagline'>
                <Form.Label>Tagline</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className='fas fa-pencil-alt'></i>
                  </InputGroup.Text>
                  <Form.Control
                    type='text'
                    placeholder='Enter school tagline'
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                  />
                </InputGroup>
                <Form.Text className='text-muted'>This is an input helper text.</Form.Text>
              </Form.Group>
            </Col> */}
            <Col md={4}>
              <Form.Group className="mb-3 custom-input" controlId="formEmail">
                <Form.Label>School Email *</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-envelope"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="Enter school email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </InputGroup>
                <Form.Text className="text-muted">
                  This is an input helper text.
                </Form.Text>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3 custom-input" controlId="formPhone">
                <Form.Label>School Phone *</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-phone"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Enter school phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </InputGroup>
                <Form.Text className="text-muted">
                  This is an input helper text.
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3 custom-input" controlId="formAddress">
                <Form.Label>School Address</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-map-marker-alt"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Enter school address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </InputGroup>
                <Form.Text className="text-muted">
                  This is an input helper text.
                </Form.Text>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3 custom-input" controlId="formState">
                <Form.Label>State</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-location-arrow"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Enter state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </InputGroup>
                <Form.Text className="text-muted">
                  This is an input helper text.
                </Form.Text>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3 custom-input" controlId="formCountry">
                <Form.Label>Country</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-globe"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Enter country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </InputGroup>
                <Form.Text className="text-muted">
                  This is an input helper text.
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            {/* <Col md={4}>
              <Form.Group className='mb-3 custom-input' controlId='formBoard'>
                <Form.Label>Educational Board</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className='fas fa-computer'></i>
                  </InputGroup.Text>
                  <Form.Control
                    type='text'
                    placeholder='Enter Education Board'
                    value={educationalBoard}
                    onChange={(e) => setEducationalBoard(e.target.value)}
                  />
                </InputGroup>
                <Form.Text className='text-muted'>This is an input helper text.</Form.Text>
              </Form.Group>
            </Col> */}
            <Col md={4}>
              <Form.Group className="mb-3 custom-input" controlId="formCountry">
                <Form.Label>Date Formate</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-calendar"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Enter Date Formate"
                    value={dateFormat}
                    onChange={(e) => setDateFormat(e.target.value)}
                  />
                </InputGroup>
                <Form.Text className="text-muted">
                  This is an input helper text.
                </Form.Text>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3 custom-input" controlId="formState">
                <Form.Label>Time Format</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-clock"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Enter Time Format"
                    value={timeFormat}
                    onChange={(e) => setTimeFormat(e.target.value)}
                  />
                </InputGroup>
                <Form.Text className="text-muted">
                  This is an input helper text.
                </Form.Text>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3 custom-input" controlId="formCountry">
                <Form.Label>Currency</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-money-bill"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Enter Curreny"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  />
                </InputGroup>
                <Form.Text className="text-muted">
                  Enter the Short form of the currency.
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="formAcademicYear">
                <Form.Label>Academic Year *</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-calendar"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Enter Academic year"
                    value={academicType}
                    onChange={(e) => setAcademicType(e.target.value)}
                    required
                  >
                    {/* <option value="">Select Academic Year</option>
                  {academicYear.map((option) => (
                    <option key={option.id} value={option.id}>
                    {option.session}
                    </option>
                    ))} */}
                  </Form.Control>
                </InputGroup>
                <Form.Text className="text-muted">
                  Choose the type of subscription for the school.
                </Form.Text>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group
                className="mb-3 custom-input"
                controlId="formStartDate"
              >
                <Form.Label>Start Date *</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-date"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="date"
                    placeholder="Enter Start Date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </InputGroup>
                <Form.Text className="text-muted">
                  Enter the Short form of the currency.
                </Form.Text>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3 custom-input" controlId="formEndDate">
                <Form.Label>End Date *</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-date"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="date"
                    placeholder="Enter End Date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </InputGroup>
                <Form.Text className="text-muted">
                  Enter the Short form of the currency.
                </Form.Text>
              </Form.Group>
            </Col>
            {/* <Col md={4}>
              <Form.Group className='mb-3 custom-input' controlId='formCountry'>
                <Form.Label>Bank Account</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className='fas fa-bank'></i>
                  </InputGroup.Text>
                  <Form.Control
                    type='text'
                    placeholder='Enter Bank Account'
                    value={bankAccountNo}
                    onChange={(e) => setBankAccountNo(e.target.value)}
                  />
                </InputGroup>
                <Form.Text className='text-muted'>Enter the Short form of the currency.</Form.Text>
              </Form.Group>
            </Col> */}
            {/* <Col md={4}>
              <Form.Group className='mb-3 custom-input' controlId='formCountry'>
                <Form.Label>Ifsc Code</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className='fas fa-key'></i>
                  </InputGroup.Text>
                  <Form.Control
                    type='text'
                    placeholder='Enter IFSC code'
                    value={ifscCode}
                    onChange={(e) => setIfscCode(e.target.value)}
                  />
                </InputGroup>
                <Form.Text className='text-muted'>Enter the Short form of the currency.</Form.Text>
              </Form.Group>
            </Col> */}
          </Row>
          <Row>
            {/* <Col md={4}>
              <Form.Group className='mb-3 custom-input' controlId='formCountry'>
                <Form.Label>Bank Name</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className='fas fa-building'></i>
                  </InputGroup.Text>
                  <Form.Control
                    type='text'
                    placeholder='Enter Bank name'
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                  />
                </InputGroup>
                <Form.Text className='text-muted'>Enter the Short form of the currency.</Form.Text>
              </Form.Group>
            </Col> */}
            <Col md={4}>
              <Form.Group className="mb-3" controlId="formSubscriptionType">
                <Form.Label>Subscription Type *</Form.Label>
                <Form.Select
                  value={subscriptionType}
                  onChange={(e) => setSubscriptionType(e.target.value)}
                  required
                >
                  <option value="">Select Subscription Type</option>
                  {subscriptionOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Text className="text-muted">
                  Choose the type of subscription for the school.
                </Form.Text>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="formCompannyMaster">
                <Form.Label>Select Company *</Form.Label>
                <Form.Select
                  value={schoolMaster}
                  onChange={(e) => setSchoolMaster(e.target.value)}
                  required
                >
                  <option value="">Select Company</option>
                  {schoolMasterOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Text className="text-muted">
                  Choose the Company for the school.
                </Form.Text>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3 custom-input" controlId="formCountry">
                <Form.Label>Currency Symbol</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fas fa-indian-rupee"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Enter Curreny Symbol"
                    value={currencySymbol}
                    onChange={(e) => setCurrencySymbol(e.target.value)}
                  />
                </InputGroup>
                <Form.Text className="text-muted">
                  Enter the Short form of the currency.
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
          {/* <Row>
            <Col md={6}>
              <Form.Group className='mb-3 custom-input' controlId='formSchoolSmallLogo'>
                <Form.Label>School Small Logo *</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className='fas fa-upload'></i>
                  </InputGroup.Text>
                  <Form.Control type='file' onChange={handleSmallLogoUpload} required />
                </InputGroup>
                {schoolSmallLogo && <p className='mt-2'>Selected file: {schoolSmallLogo.name}</p>}
              </Form.Group>
            </Col>
          </Row> */}
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </Form>
      </div>
    </Modal>,
    modalsRoot
  );
};

export { CreateSchoolModal };
