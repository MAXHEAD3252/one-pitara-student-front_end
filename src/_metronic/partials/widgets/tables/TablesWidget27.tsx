import { React, useState, useEffect } from "react";
import { useAuth } from "../../../../app/modules/auth/core/Auth";
type Props = {
  className: string;
  school_id?: number;
};

const TablesWidget27: React.FC<Props> = ({ className, school_id }) => {
  
  const { auth } = useAuth();
  const [schoolModules, setSchoolModules] = useState([]);
  const [selectedIds ,setSelectedIds]=useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/superadmin/permission-modules`
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


  const handleSubmit = async () => {
    try {
      const response = {
        school_id: school_id,
        super_admin_id: auth?.id,
        permissions: permissions
      };
      console.log(response);
  
      const sendData = await fetch('http://127.0.0.1:5000/api/superadmin/store-permission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Specify content type as JSON
        },
        body: JSON.stringify(response) // Convert response object to JSON string
      });
  
      if (!sendData.ok) {
        console.log('Error occurred while sending data.');
        // Handle error scenario
      } else {
        console.log('Data sent successfully.');
        // Handle success scenario
      }
  
    } catch (err) {
      console.log(err);
      // Handle error
    }
  };
  


 
  const handleCheckboxClick = (module_id, parentId) => {
    const pairId = `${parentId}:${module_id}`;
  
    setSelectedIds(prevIds => {
      if (prevIds[pairId]) {
        const updatedIds = { ...prevIds };
        delete updatedIds[pairId];
        return updatedIds;
      } else {
        return {
          ...prevIds,
          [pairId]: true
        };
      }
    });
  };
  const permissions = Object.entries(selectedIds).map(([pairId]) => {
    const [parentId, moduleId] = pairId.split(':').map(Number);
    return [ parentId,moduleId,];
  });

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
    <tr style={{borderBottom:'1px solid black'}}>
      <th className="p-0 w-100px" style={{fontFamily:'Manrope', fontSize:'16px' ,fontWeight:'500'}}>Module Name</th>
      <th className="p-0 min-w-100px" style={{fontFamily:'Manrope', fontSize:'16px' ,fontWeight:'500'}}>Module Feature</th>
      <th className="p-0 min-w-50px " style={{fontFamily:'Manrope', fontSize:'16px' ,fontWeight:'500'}}>Module Action</th>
    </tr>
  </thead>
  <tbody style={{ width: "100%", }}>
    {schoolModules && schoolModules.length > 0 && (
      <>
        {schoolModules.map((item, index) => {
          return item.modules.map((module, moduleIndex) => (
            <tr
              key={module.id}
              style={{ width: '100%'}}
            >
              {/* Module Name */}
              {moduleIndex === 0 && (
                <td
                  rowSpan={item.modules.length}
                  className="py-2 px-4  w-100px" style={{borderBottom:'1px solid black', textAlign:'start', justifyContent:'flex-start'}}
                  
                >
                  <span style={{fontFamily:'Manrope', fontSize:'14px' ,fontWeight:'500'}}
                  >
                    { item.name} {/* Only render once */}
                  </span>
                </td>
              )}
              <td className="p-3 m-6  min-w-100px" style={{ paddingLeft: "0px" }}>
               <span style={{fontFamily:'Manrope', fontSize:'12px' ,fontWeight:'500'}}> {module.module_name}</span>
              </td>
              {/* Action */}
              <td className="py-2 px-4">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id={`flexSwitchCheck-${module.id}`}
                    onClick={() =>
                      module.module_id && handleCheckboxClick(module.module_id, item.id)
                    }
                    disabled={school_id===0 || !school_id}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`flexSwitchCheck-${module.id}`}
                  ></label>
                </div>
              </td>
              <br/>
            </tr>

          ));
          
        })}
      </>
    )}
  </tbody>
</table>
<div className="d-flex justify-content-end"
  style={{
    paddingRight:'30px'
  }}
  >
<button

className="btn btn-primary "
style={{
  display:'flex',
  justifyContent:'end',
}}
onClick={handleSubmit}
disabled={school_id===0 ||!school_id}

// disabled={!modulesWithAccess.length || !itemsWithAccess.length}
>Submit</button>
</div>

        </div>
      </div>
    </div>
  );
};

export { TablesWidget27 };
