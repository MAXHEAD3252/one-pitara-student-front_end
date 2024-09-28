import React, { FC, useEffect, useState } from "react";
import { DOMAIN, get_schoolbyid } from "../../../../../app/routing/ApiEndpoints"; // Import the update endpoint if available
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CardsWidget5Props {
  schoolId: string | undefined;
}

interface SchoolDetail {
  id: string; // Replace with actual types as needed
  name: string;
  address: string;
  email: string;
  phone: string;
  state: string;
  country: string;
  bank_account_no: string;
  bank_name: string;
  tagline: string;
  type_of_school: string;
  website: string;
  year_founded: string;
  ifsc_code: string;
  // Add other fields here as needed
}

const CardsWidget5: FC<CardsWidget5Props> = ({ schoolId }) => {
  const [schoolDetail, setSchoolDetails] = useState<SchoolDetail | null>(null);
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState<Partial<SchoolDetail>>({});
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [smallLogoFile, setSmallLogoFile] = useState<File | null>(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${DOMAIN}/${get_schoolbyid}/${schoolId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSchoolDetails(data[0]);
        setFormData(data[0]); // Populate the form data
      } catch (error) {
        console.error("Error fetching school details:", error);
      }
    };

    if (schoolId) {
      setRefresh(false);
      fetchData();
    }
  }, [schoolId,refresh]);

  const showModal = () => {
    setIsModalVisible(true);
  };

 
  const handleSave = async () => {
    try {
      // Handle file uploads first if necessary
      const updatedFormData = { ...formData };

       if (logoFile) {
      const logoResponse = await uploadFile(logoFile, 'logo',schoolId);
      updatedFormData.school_logo = logoResponse.url; // Update logo URL in formData
    }
      if (imageFile) {
         const imageResponse = await uploadFile(imageFile, 'image',schoolId);
      updatedFormData.school_image = imageResponse.url;
      }
      if (smallLogoFile) {
        const smallLogoResponse = await uploadFile(smallLogoFile, 'smallLogo',schoolId);
        updatedFormData.school_small_logo = smallLogoResponse.url;
      }

      // Update school details after file uploads
      const response = await fetch(`${DOMAIN}/api/superadmin/school_update/${schoolId}`, {
        method: "PUT", // Assuming you are using PUT method to update
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData), // Send updated form data
      });
      if (!response.ok) {
        toast.error("An error occurred!", { autoClose: 3000 });
        throw new Error("Failed to update school details");
      }
      const updatedData = await response.json();
      toast.success("Data sent successfully.", { autoClose: 3000 });
      setSchoolDetails(updatedData); // Update the state with the new data
      setIsModalVisible(false);
      setRefresh(true);

    // Close the modal
    handleCancel(); // Close the modal
    } catch (error) {
      console.error("Error updating school details:", error);
      toast.error("Failed to communicate with server!", { autoClose: 3000 });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (type === 'logo') {
        setLogoFile(file);
      } else if (type === 'image') {
        setImageFile(file);
      } else if (type === 'smallLogo') {
        setSmallLogoFile(file);
      }
    }
  };

  const uploadFile = async (file, type,schoolId) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    formData.append('school_id', schoolId);
  
    try {
      const response = await fetch(`${DOMAIN}/api/superadmin/school_update_upload`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('File upload failed');
      }
      return await response.json(); // Return the file URL from the response
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };


  const iconMap = {
    name: "fas fa-school",
    email: "fas fa-envelope",
    phone: "fas fa-phone",
    address: "fas fa-map-marker-alt",
    state: "fas fa-map",
    country: "fas fa-globe",
    bank_account_no: "fas fa-university",
    bank_name: "fas fa-university",
    ifsc_code:"fas fa-shield-havled",
    year_founded: "fas fa-calendar-alt",
    type_of_school: "fas fa-graduation-cap",
    website: "fas fa-globe",
    tagline: "fas fa-tag",
    timezone: "fas fa-clock",
    date_format: "fas fa-calendar",
    currency: "fas fa-money-bill-wave",
    currency_symbol: "fas fa-rupee-sign",
    educational_board: "fas fa-book",
    school_id: "fas fa-id-card",
    is_active: "fas fa-check",
    upload_documents: "fas fa-file-upload",
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "24px",
        borderRadius: "16px",
        backgroundColor: "#F2F6FF", 
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid lightgray",
          paddingBottom: "8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#1C335C",
              fontFamily: "Manrope",
            }}
          >
            School Details
          </span>
        </div>
        <div
          onClick={showModal}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 12px",
            backgroundColor: "#1C335C",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#16294D")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#1C335C")
          }
        >
          <span
            style={{
              marginRight: "8px",
              color: "white",
              fontSize: "14px",
              fontWeight: "700",
              fontFamily: "Manrope",
            }}
          >
            Edit
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16px"
            height="16px"
            fill="#ffffff"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M3 17.25V21h3.75l11-11.03-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
          </svg>
        </div>
      </div>

      <div className="card-body" style={{ marginTop: "20px", width: "100%" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)", // 4 items per row
            gap: "20px",
          }}
        >
          {schoolDetail && Object.entries(schoolDetail).map(([key, value]) => (
            <div
              key={key}
              style={{ display: "flex", gap: "10px", alignItems: "center" }}
            >
              <i
                className={iconMap[key] || "fas fa-info-circle"}
                style={{ fontSize: "20px", color: "#1C335C" }}
              ></i>
              <div>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",  
                    color: "#212121",
                    fontFamily: "Manrope",
                    textTransform: "capitalize",
                  }}
                >
                  {key.replace(/_/g, " ")}:
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1C335C",
                    fontFamily: "Manrope",
                  }}
                >
                  {typeof value === "string" && value.startsWith("http") ? (
                    <a href={value} target="_blank" rel="noopener noreferrer">
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Editing School Details */}
      <Modal
        id="kt_modal_create_app"
        tabIndex={-1}
        aria-hidden="true"
        dialogClassName="modal-dialog modal-dialog-centered mw-1000px"
        show={isModalVisible}
        onHide={handleCancel}
        backdrop={true}
      >
        <div className="modal-header">
          <h2 style={{ fontFamily: "Manrope" }}>Edit School Details:</h2>
          <div
            className="btn btn-sm btn-icon btn-active-color-primary"
            onClick={handleCancel}
          >
            <i className="fas fa-times"></i>
          </div>
        </div>
        <div className="modal-body py-lg-10 px-lg-10">
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
                      name='name'
                      placeholder='Update school name'
                      // value={formData.name || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
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
                      type='text'
                      name='email'
                      placeholder='Upadte school email'
                      // value={formData.email || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className='mb-3 custom-input' controlId='formPhone'>
                  <Form.Label>School Phone *</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className='fas fa-phone'></i>
                    </InputGroup.Text>
                    <Form.Control
                      type='text'
                      name='phone'
                      placeholder='Upadte school phone'
                      // value={formData.phone || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className='mb-3 custom-input' controlId='formAddress'>
                  <Form.Label>School Address *</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className='fas fa-map-marker-alt'></i>
                    </InputGroup.Text>
                    <Form.Control
                      type='text'
                      name='address'
                      placeholder='Upadte school address'
                      // value={formData.address || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className='mb-3 custom-input' controlId='formState'>
                  <Form.Label>School State *</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className='fas fa-map'></i>
                    </InputGroup.Text>
                    <Form.Control
                      type='text'
                      name='state'
                      placeholder='Upadte school state'
                      // value={formData.state || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className='mb-3 custom-input' controlId='formCountry'>
                  <Form.Label>School Country *</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className='fas fa-globe'></i>
                    </InputGroup.Text>
                    <Form.Control
                      type='text'
                      name='country'
                      placeholder='Upadte school country'
                      // value={formData.country || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className='mb-3 custom-input' controlId='formBankAccountNo'>
                  <Form.Label>Bank Account Number *</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className='fas fa-university'></i>
                    </InputGroup.Text>
                    <Form.Control
                      type='text'
                      name='bank_account_no'
                      placeholder='Upadte bank account number'
                      // value={formData.bank_account_no || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className='mb-3 custom-input' controlId='formBankName'>
                  <Form.Label>Bank Name *</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className='fas fa-university'></i>
                    </InputGroup.Text>
                    <Form.Control
                      type='text'
                      name='bank_name'
                      placeholder='Upadte bank name'
                      // value={formData.bank_name || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className='mb-3 custom-input' controlId='formIfscCode'>
                  <Form.Label>IFSC Code *</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className='fas fa-shield-halved'></i>
                    </InputGroup.Text>
                    <Form.Control
                      type='text'
                      name='ifsc_code'
                      placeholder='Upadte IFSC Code'
                      // value={formData.ifsc_code || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className='mb-3 custom-input' controlId='formYearFounded'>
                  <Form.Label>Year Founded *</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className='fas fa-calendar-alt'></i>
                    </InputGroup.Text>
                    <Form.Control
                      type='text'
                      name='year_founded'
                      placeholder='Upadte Year Founded'
                      // value={formData.year_founded || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className='mb-3 custom-input' controlId='formTypeOfSchool'>
                  <Form.Label>Type Of School*</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className='fas fa-graduation-cap'></i>
                    </InputGroup.Text>
                    <Form.Control
                      type='text'
                      name='type_of_school'
                      placeholder='Upadte Type Of School'
                      // value={formData.type_of_school || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className='mb-3 custom-input' controlId='formWebsite'>
                  <Form.Label>Website *</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className='fas fa-globe'></i>
                    </InputGroup.Text>
                    <Form.Control
                      type='text'
                      name='website'
                      placeholder='Update Website'
                      // value={formData.website || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className='mb-3 custom-input' controlId='formTagline'>
                  <Form.Label>Tagline *</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className='fas fa-tag'></i>
                    </InputGroup.Text>
                    <Form.Control
                      type='text'
                      name='tagline'
                      placeholder='Update Tagline'
                      // value={formData.tagline || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className='mb-3 custom-input' controlId='formTtimezone'>
                  <Form.Label>Timezone *</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className='fas fa-tag'></i>
                    </InputGroup.Text>
                    <Form.Control
                      type='text'
                      name='timezone'
                      placeholder='Update Timezone'
                      // value={formData.timezone || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className='mb-3 custom-input' controlId='formDateFormat'>
                  <Form.Label>DateFormat *</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className='fas fa-calendar'></i>
                    </InputGroup.Text>
                    <Form.Control
                      type='text'
                      name='dateformat'
                      placeholder='Update DateFormat'
                      // value={formData.date_format || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className='mb-3 custom-input' controlId='formCurrency'>
                  <Form.Label>Currency *</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className='fas fa-money-bill-wave'></i>
                    </InputGroup.Text>
                    <Form.Control
                      type='text'
                      name='currency'
                      placeholder='Update Currency'
                      // value={formData.currency || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className='mb-3 custom-input' controlId='formCurrencySymbol'>
                  <Form.Label>Currency Symbol *</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className='fas fa-rupee-sign'></i>
                    </InputGroup.Text>
                    <Form.Control
                      type='text'
                      name='currency_symbol'
                      placeholder='Update Currency Symbol'
                      // value={formData.currency_symbol || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className='mb-3 custom-input' controlId='formEducationalBoard'>
                  <Form.Label>Educational Board *</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className='fas fa-rupee-sign'></i>
                    </InputGroup.Text>
                    <Form.Control
                      type='text'
                      name='educational_board'
                      placeholder='Update Educational Board'
                      // value={formData.educational_board || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className='mb-3 custom-input' controlId='formIsActive'>
                  <Form.Label>Is Active *</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className='fas fa-rupee-sign'></i>
                    </InputGroup.Text>
                    <Form.Control
                      type='text'
                      name='is_active'
                      placeholder='Update Is Active'
                      // value={formData.is_active || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className='mb-3 custom-input' controlId='formLogo'>
                  <Form.Label>Upload Logo</Form.Label>
                  <Form.Control
                    type='file'
                    name='logo'
                    onChange={(e) => handleFileChange(e, 'logo')}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className='mb-3 custom-input' controlId='formImage'>
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control
                    type='file'
                    name='image'
                    onChange={(e) => handleFileChange(e, 'image')}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className='mb-3 custom-input' controlId='formSmallLogo'>
                  <Form.Label>Upload Small Logo</Form.Label>
                  <Form.Control
                    type='file'
                    name='smallLogo'
                    onChange={(e) => handleFileChange(e, 'smallLogo')}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="modal-footer border-0">
          <button
            type="button"
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
            onClick={handleSave}
          >
            <span
              style={{
                color: "#FFF",
                fontFamily: "Manrope",
                fontSize: "12px",
                fontWeight: "500",
              }}
            >
              Save
            </span>
          </button>
        </div>
      </Modal>
    </div>
  );
};

export { CardsWidget5 };
