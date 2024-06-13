import { React, useState, useEffect } from "react";

type Props = {
  className: string;
  school_id?: number;
};

const TablesWidget26: React.FC<Props> = ({ className, school_id }) => {
  // console.log(school_id);
  
  const [schoolDetails, setSchoolDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/superadmin/get_admin/${school_id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSchoolDetails(data);
        // console.log(data);
        
      } catch (error) {
        console.error("Error fetching school details:", error);
      }
    };

    fetchData();
  }, [school_id]);

  // console.log("schools details", schoolDetails);

  return (
    <div className={`card ${className}`}>
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">School Admin</span>
        </h3>
      </div>
      <div className="card-body py-3">
        <div className="table-responsive">
          <table className="table align-middle gs-0 gy-5">
            <thead>
              <tr style={{borderBottom:'1px solid black'}}>
                <th className="p-0 w-50px" style={{fontFamily:'Manrope', fontSize:'16px' ,fontWeight:'600'}}>Id</th>
                <th className="p-0 min-w-100px" style={{fontFamily:'Manrope', fontSize:'16px' ,fontWeight:'600'}}>Name</th>
                <th className="p-0 min-w-100px" style={{fontFamily:'Manrope', fontSize:'16px' ,fontWeight:'600'}}>Email</th>
                <th className="p-0 min-w-100px" style={{fontFamily:'Manrope', fontSize:'16px' ,fontWeight:'600'}}>Contact No.</th>
                <th className="p-0 min-w-40px" style={{fontFamily:'Manrope', fontSize:'16px' ,fontWeight:'600'}}>Passowrd</th>
              </tr>
            </thead>
            <tbody>
              {school_id ? (
                schoolDetails && schoolDetails.length > 0 ? (
                  schoolDetails.map((schoolDetail, index) => (
                    <tr key={index}>
                      <td>
                        <a
                          href="#"
                          className="text-black-900 fw-bold text-hover-primary mb-1 fs-6"
                        >
                       {index+1}
                        </a>
                      </td>
                      <td>
                        <div className="d-flex flex-column w-100 me-2">
                          <div className="d-flex flex-stack mb-2">
                           <span style={{fontFamily:'Manrope', fontSize:'14px' ,fontWeight:'500'}}>{schoolDetail.name}</span> 
                          </div>
                        </div>
                      </td>
                      <td>
                        <a
                          href="#"
                          className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
                        >
                          <span style={{fontFamily:'Manrope', fontSize:'14px' ,fontWeight:'500'}}> {schoolDetail.email}</span>
                        </a>
                      </td>
                      <td>
                        <span
                          className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary" style={{fontFamily:'Manrope', fontSize:'14px' ,fontWeight:'500'}}
                        >
                         {schoolDetail.contact_no
                            ? schoolDetail.contact_no
                            : "-"} 
                        </span>
                      </td>
                      <td>
                        <span
                         style={{fontFamily:'Manrope', fontSize:'14px' ,fontWeight:'500'}}
                          className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
                        >
                          {schoolDetail.password}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">
                      <div className="alert alert-warning" role="alert">
                        No schools found.
                        {/* <button
                          className="btn btn-primary ms-2"
                          // onClick={handleAddSuperAdmin}
                        >
                          Add Super Admin
                        </button> */}
                      </div>
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan="5">no schools selected</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export { TablesWidget26 };
