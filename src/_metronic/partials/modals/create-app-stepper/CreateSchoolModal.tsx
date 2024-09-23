import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";
import './CreateSchoolModal.css'; 

type Props = {
  show: boolean;
  handleClose: () => void;
  refresh: (refresh: boolean) => void;
};

const modalsRoot = document.getElementById('root-modals') || document.body;

const CreateSchoolModal = ({ show, handleClose, refresh }: Props) => {
  const [schoolName, setSchoolName] = useState('');
  const [tagline, setTagline] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [educationalBoard, setEducationalBoard] = useState('');
  const [dateFormat, setDateFormat] = useState('dd/mm/yyyy');
  const [timeFormat, setTimeFormat] = useState('hh:mm');
  const [currency, setCurrency] = useState('Rs');
  const [currencySymbol, setCurrencySymbol] = useState('₹');
  const [bankAccountNo, setBankAccountNo] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [bankName, setBankName] = useState('');
  const [subscriptionType, setSubscriptionType] = useState('');
  const [subscriptionOptions, setSubscriptionOptions] = useState([]);
  const [schoolLogo, setSchoolLogo] = useState<File | null>(null);
  const [schoolSmallLogo, setSchoolSmallLogo] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSchoolLogo(e.target.files[0]);
    }
  };

  const handleSmallLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSchoolSmallLogo(e.target.files[0]);
    }
  };

  const validateForm = () => {
    if (!schoolName || !email || !phone || !schoolLogo || !schoolSmallLogo) {
      return false;
    }
    return true;
  };



   // Fetch subscription options from the backend
   useEffect(() => {
    const fetchSubscriptionOptions = async () => {
      try {
        const response = await fetch(`${DOMAIN}/api/superadmin/get-allsubscriptions`);
        if (!response.ok) {
          throw new Error('Failed to fetch subscription types');
        }
        const data = await response.json();
        console.log(data);
        
        setSubscriptionOptions(data); // Assuming the response has this structure
      } catch (error) {
        console.error('Error fetching subscription types:', error);
      }
    };

    fetchSubscriptionOptions();
  }, []);





  const handleSubmit = async () => {
    if (!validateForm()) {
      alert('Please fill in all required fields and upload the logos.');
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('name', schoolName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('state', state);
    formData.append('country', country);
    formData.append('educational_board', educationalBoard);
    formData.append('date_format', dateFormat);
    formData.append('time_format', timeFormat);
    formData.append('currency', currency);
    formData.append('currency_symbol', currencySymbol);
    formData.append('bank_account_no', bankAccountNo);
    formData.append('ifsc_code', ifscCode);
    formData.append('bank_name', bankName);
    formData.append('school_logo', schoolLogo as Blob);
    formData.append('school_small_logo', schoolSmallLogo as Blob);
    formData.append('subscription_type', subscriptionType);

    try {
      const response = await fetch(`${DOMAIN}/api/superadmin/create_school`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create school');
      }

      const result = await response.json();
      console.log('School created successfully:', result);
      handleClose();
      refresh(true);
    } catch (error) {
      console.error('Error creating school:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <Modal
      id='kt_modal_create_school'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-1000px'
      show={show}
      onHide={handleClose}
      backdrop={true}
    >
      <div className='modal-header'>
        <h2>Create School</h2>
        <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
          <i className='fas fa-times'></i>
        </div>
      </div>

      <div className='modal-body py-lg-10 px-lg-10'>
        <Form>
          <Row>
            <Col md={4}>
              <Form.Group className='mb-3 custom-input' controlId='formSchoolName'>
                <Form.Label>School Name *</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className='fas fa-school'></i>
                  </InputGroup.Text>
                  <Form.Control
                    type='text'
                    placeholder='Enter school name'
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    required
                  />
                </InputGroup>
                <Form.Text className='text-muted'>This is an input helper text.</Form.Text>
              </Form.Group>
            </Col>
            <Col md={4}>
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
            </Col>
            <Col md={4}>
              <Form.Group className='mb-3 custom-input' controlId='formEmail'>
                <Form.Label>School Email *</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className='fas fa-envelope'></i>
                  </InputGroup.Text>
                  <Form.Control
                    type='email'
                    placeholder='Enter school email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </InputGroup>
                <Form.Text className='text-muted'>This is an input helper text.</Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group className='mb-3 custom-input' controlId='formPhone'>
                <Form.Label>School Phone *</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className='fas fa-phone'></i>
                  </InputGroup.Text>
                  <Form.Control
                    type='text'
                    placeholder='Enter school phone'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </InputGroup>
                <Form.Text className='text-muted'>This is an input helper text.</Form.Text>
              </Form.Group>
            </Col>
            <Col md={8}>
              <Form.Group className='mb-3 custom-input' controlId='formAddress'>
                <Form.Label>School Address</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className='fas fa-map-marker-alt'></i>
                  </InputGroup.Text>
                  <Form.Control
                    type='text'
                    placeholder='Enter school address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </InputGroup>
                <Form.Text className='text-muted'>This is an input helper text.</Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group className='mb-3 custom-input' controlId='formState'>
                <Form.Label>State</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className='fas fa-location-arrow'></i>
                  </InputGroup.Text>
                  <Form.Control
                    type='text'
                    placeholder='Enter state'
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </InputGroup>
                <Form.Text className='text-muted'>This is an input helper text.</Form.Text>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className='mb-3 custom-input' controlId='formCountry'>
                <Form.Label>Country</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className='fas fa-globe'></i>
                  </InputGroup.Text>
                  <Form.Control
                    type='text'
                    placeholder='Enter country'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </InputGroup>
                <Form.Text className='text-muted'>This is an input helper text.</Form.Text>
              </Form.Group>
            </Col>
            <Col md={4}>
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
            </Col>
            <Col md={4}>
              <Form.Group className='mb-3 custom-input' controlId='formCountry'>
                <Form.Label>Date Formate</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className='fas fa-calendar'></i>
                  </InputGroup.Text>
                  <Form.Control
                    type='text'
                    placeholder='Enter Date Formate'
                    value={dateFormat}
                    onChange={(e) => setDateFormat(e.target.value)}
                  />
                </InputGroup>
                <Form.Text className='text-muted'>This is an input helper text.</Form.Text>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className='mb-3 custom-input' controlId='formState'>
                <Form.Label>Time Format</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className='fas fa-clock'></i>
                  </InputGroup.Text>
                  <Form.Control
                    type='text' 
                    placeholder='Enter Time Format'
                    value={timeFormat}
                    onChange={(e) => setTimeFormat(e.target.value)}
                  />
                </InputGroup>
                <Form.Text className='text-muted'>This is an input helper text.</Form.Text>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className='mb-3 custom-input' controlId='formCountry'>
                <Form.Label>Currency</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className='fas fa-money-bill'></i>
                  </InputGroup.Text>
                  <Form.Control
                    type='text'
                    placeholder='Enter Curreny'
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  />
                </InputGroup>
                <Form.Text className='text-muted'>Enter the Short form of the currency.</Form.Text>
              </Form.Group>
            </Col>
            </Row>
            <Row>
            <Col md={4}>
              <Form.Group className='mb-3 custom-input' controlId='formCountry'>
                <Form.Label>Currency Symbol</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className='fas fa-indian-rupee'></i>
                  </InputGroup.Text>
                  <Form.Control
                    type='text'
                    placeholder='Enter Curreny Symbol'
                    value={currencySymbol}
                    onChange={(e) => setCurrencySymbol(e.target.value)}
                  />
                </InputGroup>
                <Form.Text className='text-muted'>Enter the Short form of the currency.</Form.Text>
              </Form.Group>
            </Col>
            <Col md={4}>
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
            </Col>
            <Col md={4}>
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
            </Col>
            </Row>
            <Row>
            <Col md={4}>
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
            </Col>
            <Col md={8}>
              <Form.Group className='mb-3' controlId='formSubscriptionType'>
                <Form.Label>Subscription Type *</Form.Label>
                <Form.Select
                  value={subscriptionType}
                  onChange={(e) => setSubscriptionType(e.target.value)}
                  required
                >
                  <option value=''>Select Subscription Type</option>
                  {subscriptionOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Text className='text-muted'>Choose the type of subscription for the school.</Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className='mb-3 custom-input' controlId='formSchoolLogo'>
                <Form.Label>School Logo *</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <i className='fas fa-upload'></i>
                  </InputGroup.Text>
                  <Form.Control type='file' onChange={handleLogoUpload} required />
                </InputGroup>
                {schoolLogo && <p className='mt-2'>Selected file: {schoolLogo.name}</p>}
              </Form.Group>
            </Col>
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
          </Row>
          <div className='d-flex justify-content-end'>
            <Button variant='secondary' onClick={handleClose} className='me-2'>
              Cancel
            </Button>
            <Button variant='primary' onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </Form>
      </div>
    </Modal>,
    modalsRoot
  );
};

export { CreateSchoolModal };
