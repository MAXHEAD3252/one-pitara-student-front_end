// import { React, useState, useEffect } from "react";
import { useAuth } from "../../../../app/modules/auth/core/Auth";
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
type Props = {
  className: string;
  school_id?: number;
};

const TablesWidget28: React.FC<Props> = () => {
  const { currentUser } = useAuth();

  //   const school_id=currentUser?.id

  const [schoolRoles, setSchoolRoles] = useState([]);
  
  const [roleId ,setRoleId]=useState(null);
const Navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/staff/get-roles`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSchoolRoles(data);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching school details:", error);
      }
    };

    fetchData();
  }, []);

  

  const handleClick = (roleId) => {
    setRoleId(roleId);
    Navigate("/user-roles/permission",{state:{roleId}});
    
  };

  return (
    <div className={`card`}>
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">School Role</span>
        </h3>
      </div>
      <div className="card-body py-3">
        <div className="table-responsive">
          <table className="table align-middle gs-0 gy-2">
            <thead>
              <tr style={{ display: "flex", justifyContent: "space-between" }}>
                <th className="p-0">Role</th>
                <th className="p-0"> Action</th>
              </tr>
            </thead>
            <tbody>
              {schoolRoles &&
                schoolRoles.map((role) => (
                  <tr
                    key={role.id}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <td>{role.name}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={()=>{handleClick(role.id)}}
                      >
                        view
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export { TablesWidget28 };
