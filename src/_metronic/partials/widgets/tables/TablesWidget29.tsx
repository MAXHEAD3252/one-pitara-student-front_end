import { React, useState, useEffect } from "react";
import { useAuth } from "../../../../app/modules/auth/core/Auth";
type Props = {
  className: string;
  role_id?: number;

};

const TablesWidget29: React.FC<Props> = ({ className, role_id }) => {
  const { currentUser } = useAuth();
  const [schoolModules, setSchoolModules] = useState([]);
  // const [selectedIds, setSelectedIds] = useState([ ]);
  const [selectedModules, setSelectedModules] = useState({});
  const school_id = currentUser?.school_id;
  

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/superadmin/get-parent-module/${school_id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSchoolModules(data);
      } catch (error) {
        console.error("Error fetching school details:", error);
      }
    };

    fetchData();
  }, [school_id]);

  const handleCheckbox = (moduleName: string, headerLabel: string) => {
    const updatedSelectedModules = { ...selectedModules };

    if (!updatedSelectedModules[moduleName]) {
      updatedSelectedModules[moduleName] = [];
    }

    const index = updatedSelectedModules[moduleName].indexOf(headerLabel);
    if (index !== -1) {
      updatedSelectedModules[moduleName].splice(index, 1);
    } else {
      updatedSelectedModules[moduleName].push(headerLabel);
    }

    setSelectedModules(updatedSelectedModules);
    
  };


  const handleSubmit = async () => {
    try {
    
      
      const response = await fetch(`http://localhost:5000/api/superadmin/save-module-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ school_id, role_id, selectedModules }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Data submitted successfully:', data);
      // Handle success, if needed
    } catch (error) {
      console.error('Error submitting data:', error);
      // Handle error, if needed
    }
  };
  
  

  return (
    <div className={`card ${className}`}>
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">School Module</span>
        </h3>
      </div>
      <div className="card-body py-3">
        <div className="table-responsive">
          <table className="table align-middle gs-0 gy-5">
            <thead>
              <tr style={{ border: "1px solid black" }}>
                <th className="p-0 w-100px">Module Name</th>
                <th className="p-0 min-w-100px">Module Feature</th>
                <th className="p-0 min-w-50px">View</th>
                <th className="p-0 min-w-50px">Edit</th>
                <th className="p-0 min-w-50px">Delete</th>
                <th className="p-0 min-w-50px">Add</th>
              </tr>
            </thead>
            <tbody style={{ width: "100%" }}>
              {Object.keys(schoolModules).length > 0 &&
                Object.keys(schoolModules).map((key, index) => {
                  const modules = schoolModules[key];

                  const headerLabels = ["View", "Edit", "Delete", "Add"];

                  return (
                    <tr key={index}>
                      <td>
                        <div
                          style={{ paddingLeft: "15px", paddingBottom: "15px" }}
                        >
                          <span
                            className="menu-section"
                            style={{
                              color: "#000",
                              fontFamily: "Manrope",
                              fontSize: "16px",
                              fontWeight: "600",
                            }}
                          >
                            {key}
                          </span>
                        </div>
                      </td>
                      <td>
                        {modules.map((moduleInfo, index) => (
                          <div key={index}>{moduleInfo[1]}</div>
                        ))}
                      </td>

                      {[...Array(headerLabels.length)].map((_, i) => (
                        <td key={i} className="py-2 px-4">
                          {modules.map((moduleName, index) => {
                            const checkboxId = `${moduleName}:${headerLabels[i]}`;

                            return (
                              <div style={{ display: "flex" }} key={index}>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`flexSwitchCheck-${index}`}
                                    onClick={() =>
                                      handleCheckbox(
                                        moduleName[0],
                                        headerLabels[i]
                                      )
                                    }
                                    checked={selectedModules[checkboxId]}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={`flexSwitchCheck-${index}`}
                                  ></label>
                                </div>
                              </div>
                            );
                          })}
                        </td>
                      ))}
                    </tr>
                  );
                })}
            </tbody>
          </table>

          <div
            className="d-flex justify-content-end"
            style={{
              paddingRight: "30px",
            }}
          >
            <button
              className="btn btn-primary "
              style={{
                display: "flex",
                justifyContent: "end",
              }}
              onClick={handleSubmit}
              // disabled={school_id===0 ||!school_id}

              // disabled={!modulesWithAccess.length || !itemsWithAccess.length}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { TablesWidget29 };
