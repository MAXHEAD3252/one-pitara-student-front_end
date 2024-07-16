import { React, useState, useEffect } from "react";
import { useAuth } from "../../../../app/modules/auth/core/Auth";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";

const TablesWidget30: React.FC = ({ refresh, csvData }) => {
  const { currentUser } = useAuth();
  const [schoolModules, setSchoolModules] = useState([]);
  const school_id = currentUser?.school_id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/api/staff/get-staff/${school_id}`
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
  }, [school_id, refresh]);

  useEffect(()=>{
    if(schoolModules.length > 0){
      csvData(schoolModules);
    }
  },[schoolModules])
  

  return (
    <div className={`card`}>
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">School Module</span>
        </h3>
      </div>
      <div className="card-body py-3">
        <div className="table-responsive">
          <table className="table align-middle gs-0 gy-5">
            <thead>
              <tr>
                <th className="p-0 w-150px" style={{ fontWeight: "bold" }}>
                  Staff Id
                </th>
                <th className="p-0 min-w-100px" style={{ fontWeight: "bold" }}>
                  Staff Name
                </th>
                <th className="p-0 min-w-50px" style={{ fontWeight: "bold" }}>
                  Role
                </th>
                <th className="p-0 min-w-50px" style={{ fontWeight: "bold" }}>
                  Email
                </th>
                <th className="p-0 min-w-50px" style={{ fontWeight: "bold" }}>
                  Phone
                </th>
                <th className="p-0 min-w-50px" style={{ fontWeight: "bold" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {schoolModules.map((staff) => (
                <tr key={staff.id}>
                  <td className="p-0 w-150px">{staff.employee_id}</td>
                  <td className="p-0 w-150px">
                    {staff.name} {staff.surname}
                  </td>
                  <td className="p-0 w-150px">{staff.role_name}</td>
                  <td className="p-0 w-150px">{staff.email}</td>
                  <td className="p-0 w-150px">{staff.contact_no}</td>
                  <td className="p-0 w-150px">Action button</td>{" "}
                  {/* You can replace this with your action button */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export { TablesWidget30 };
