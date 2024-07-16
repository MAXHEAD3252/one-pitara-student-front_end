import React from "react";
// import { FC } from "react";
import { useIntl } from "react-intl";
import { PageTitle } from "../../../_metronic/layout/core";
import { Content } from "../../../_metronic/layout/components/content";
import { HeaderWrapper } from "../../../_metronic/layout/components/header_staff";
import { useEffect, useState } from "react";
import { TablesWidget26 } from "../../../_metronic/partials/widgets/tables/TablesWidget26";
import { CreateAdminModal } from "../../../_metronic/partials/modals/create-app-stepper/CreateAdminModal";
import { DOMAIN } from "../../routing/ApiEndpoints";

export const ManageAdminPage = () => {
  const [schools, setSchools] = useState([]);
  const [schoolId, setSchoolId] = useState(0);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [showModal, setShowModal]=useState(false);
  

  useEffect(() => {
    // Fetch schools data from API
    const fetchSchools = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/api/superadmin/get_schools`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch schools");
        }
        const data = await response.json();
        // console.log(data);

        setSchools(data);
        // setTotalSchools(data.length);
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };

    fetchSchools();
  }, []);

  const handleSelect = async (school) => {
    setSelectedSchool(school);
    setSchoolId(school.id);
  };

const handleAddSuperAdmin=()=>{
  
setShowModal(true);
};
const handleCloseModal=()=>{
  
  setShowModal(false);
  };

// console.log(schoolId);

  return (
    <div>
      <Content>
        <div style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
          <div className="dropdown" style={{width:'60%'}}>
            <button
              className="btn btn-secondary w-50"
              style={{ textAlign: "left",fontFamily:'Manrope' }}
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="true"
             >
              {selectedSchool ? selectedSchool.name : "Select School"}
            </button>
            <ul className="dropdown-menu w-50">
              {schools.map((school) => (
                <li key={school.id}>
                  <a
                    className="dropdown-item"
                    onClick={() => handleSelect(school)}
                    style={{fontFamily:'Manrope'}}
                  >
                    {school.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <button
              className="btn btn-primary ms-2"
               onClick={handleAddSuperAdmin}
               disabled={schoolId === 0}
               style={{fontFamily:'Manrope'}}
            >
              Add Admin
            </button>
          </div>
          
        </div>

        <div className="row gy-5 gx-xl-8">
          <div className="col-xl-12 p-6">
            <TablesWidget26
              className="card-xxl-stretch mb-5 mb-xl-8"
              school_id={schoolId}
            />
            {/* school_id={schoolId} */}
          </div>
        </div>
        <div>
          <CreateAdminModal 
          show={showModal}
          onHide={handleCloseModal}
          schoolId={schoolId}
          />
        </div>

      </Content>
    </div>
  );
};

const ManageAdmins = () => {
  const intl = useIntl();

  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.HOMEWORK" })}
      </PageTitle>

      <HeaderWrapper toggleView={() => {}} />
      <ManageAdminPage />
    </>
  );
};

export { ManageAdmins };
