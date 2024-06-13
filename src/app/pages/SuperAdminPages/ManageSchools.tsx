import React from "react";
// import { FC } from "react";
import { useIntl } from "react-intl";
import { PageTitle } from "../../../_metronic/layout/core";
import { Content } from "../../../_metronic/layout/components/content";
import { HeaderWrapper } from "../../../_metronic/layout/components/header_staff";
import { useEffect, useState } from "react";
import { CreateSchoolDetailModal  } from "../../../_metronic/partials/";
import{CreateSchoolModal} from '../../../_metronic/partials/modals/create-app-stepper/CreateSchoolModal'

export const ManageSchoolsPage = () => {
  const [schools, setSchools] = useState([]);
  const [totalSchools, setTotalSchools] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showCreateAppModal, setShowCreateAppModal] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(0);
  const [refreshData, setRefreshData] = useState(false);
  

  useEffect(() => {
    // Fetch schools data from API
    const fetchSchools = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/superadmin/get_schools`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch schools");
        }
        const data = await response.json();
        // console.log(data);

        setSchools(data);
        setTotalSchools(data.length);
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };

    fetchSchools();
  }, [refreshData]);

  // const editDetails = (id) => {
  //   // Navigate to a page/modal to edit details of the school with the given ID
  // };

  // const deleteSchool = (id) => {
  //   // Implement logic to delete the school with the given ID
  // };


  const handlePrimaryButtonClick = () => {
    setShowCreateAppModal(true);
    
  };
  

  const handleModalClose = () => {
    setShowCreateAppModal(false);
  };

  
const handleCloseModal=()=>
{
  setShowModal(false);
  
}
const handleViewSchool=(school)=>
  {
    setSelectedSchool(school);
    setShowModal(true);
  }
 
  return (
    <div className="bg-white">
      <HeaderWrapper toggleView={() => {} }  />

      {/* <ToolbarDashBoard /> */}
      <Content>
        <div className="container mt-5">
          <h1 className="mb-4" style={{fontFamily:'Manrope', fontSize:'18px' ,fontWeight:'700'}}>School Details</h1>
          <div className="row d-flex justify-content-between align-items-center">
            <div className="col-md-6">
              <h2 style={{fontFamily:'Manrope', fontSize:'16px' ,fontWeight:'600'}}>Total Schools: {totalSchools}</h2>
            </div>
            <div className="col-md-6 d-flex justify-content-end">
              <button
                className="btn btn-primary"
                onClick={handlePrimaryButtonClick}
                style={{fontFamily:'Manrope', fontSize:'14px' ,fontWeight:'500'}}
              >
                Add New School
              </button>
                      <CreateSchoolModal 
                     show={showCreateAppModal}
                     handleClose={handleModalClose}
                     refresh={setRefreshData}
                       />

            </div>
          </div>
    
          <div className="row mt-3">
            <div className="col-md-12">
              <table className="table">
                <thead>
                  <tr style={{borderBottom:'1px solid black'}}>
                    <th style={{fontFamily:'Manrope', fontSize:'16px' ,fontWeight:'600'}}>ID</th>
                    <th style={{fontFamily:'Manrope', fontSize:'16px' ,fontWeight:'600'}}>Name</th>
                    <th style={{fontFamily:'Manrope', fontSize:'16px' ,fontWeight:'600'}}>Location</th>
                    <th style={{fontFamily:'Manrope', fontSize:'16px' ,fontWeight:'600'}}>Email</th>
                    <th style={{fontFamily:'Manrope', fontSize:'16px' ,fontWeight:'600'}}>Actions</th> {/* New column for actions */}
                  </tr>
                </thead>
                <tbody>
                  {schools.map((school) => (
                    <tr key={school.id}>
                      <td style={{fontFamily:'Manrope', fontSize:'13px' ,fontWeight:'500'}}>{school.id}</td>
                      <td style={{fontFamily:'Manrope', fontSize:'13px' ,fontWeight:'500'}}>{school.name}</td>
                      <td style={{fontFamily:'Manrope', fontSize:'13px' ,fontWeight:'500'}}>{school.address}</td>
                      <td style={{fontFamily:'Manrope', fontSize:'13px' ,fontWeight:'500'}}> {school.email}</td>
                      <td>
                        {/* Action buttons */}
                        <div
                          className="btn-group"
                          role="group"
                          aria-label="School Actions"
                        >
                          <button
                            type="button"
                            className="btn btn-primary"
                            //  onClick={() => viewDetails(school)}
                             onClick={() => handleViewSchool(school)}
                             style={{fontFamily:'Manrope', fontSize:'13px' ,fontWeight:'500'}}
                          >
                            View
                          </button>
                          <CreateSchoolDetailModal
                            show={showModal}
                            onHide={handleCloseModal}
                            school={selectedSchool}
                          />
                          {/* <button
                            type="button"
                            className="btn btn-warning"
                            // onClick={() => editDetails(school.id)}
                          >
                            Edit
                          </button> */}
                          <button
                            type="button"
                            className="btn btn-danger"
                            style={{fontFamily:'Manrope', fontSize:'13px' ,fontWeight:'500'}}
                            // onClick={() => deleteSchool(school.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Content>
    </div>
  );
};

const ManageSchools = () => {
  const intl = useIntl();

  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.HOMEWORK" })}
      </PageTitle>

      <HeaderWrapper toggleView={() => {}} />
      <ManageSchoolsPage />
    </>
  );
};

export { ManageSchools };
