import React, {useState,useEffect}from "react";
// import { FC } from "react";
import { useIntl } from "react-intl";
import { PageTitle } from "../../../_metronic/layout/core";
import { Content } from "../../../_metronic/layout/components/content";
import { HeaderWrapper } from "../../../_metronic/layout/components/header_staff"
import { TablesWidget27 } from "../../../_metronic/partials/widgets"; 

export const ManageModulesPage = () => {
  const [schools, setSchools] = useState([]);
  const [schoolId, setSchoolId] = useState(0);
  const [selectedSchool, setSelectedSchool] = useState(null);
  
  

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


  return (
    <div className="bg-white">
      <HeaderWrapper toggleView={() => {}} />
      <Content>
        <div className="dropdown" style={{ width: "60%" }}>
          <button
            className="btn btn-secondary w-50"
            style={{ textAlign: "left",fontFamily:'Manrope', fontSize:'14px' ,fontWeight:'500' }}
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="true"
          >
            {selectedSchool ? selectedSchool.name : "Select School"}
          </button>
          <ul className="dropdown-menu w-50">
            {schools.map((school) => (
              <li key={school.id}>
                <span style={{fontFamily:'Manrope', fontSize:'14px' ,fontWeight:'400'}}
                  className="dropdown-item"
                  onClick={() => handleSelect(school)}
                >
                  {school.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="row gy-5 gx-xl-8">
          <div className="col-xl-12 p-6">
            <TablesWidget27
              className="card-xxl-stretch mb-5 mb-xl-8"
              school_id={schoolId}
            />
            {/* school_id={schoolId} */}
          </div>
        </div>
      </Content>
    </div>
  );
};

const ManageModules = () => {
  const intl = useIntl();

  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.HOMEWORK" })}
      </PageTitle>

      <HeaderWrapper toggleView={() => {}} />
      <ManageModulesPage />
    </>
  );
};

export { ManageModules };
