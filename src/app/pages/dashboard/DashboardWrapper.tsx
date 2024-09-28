/* eslint-disable @typescript-eslint/no-unused-vars */
import {FC, useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import { EngageWidget10 } from '../../../_metronic/partials/widgets'
import { Content } from '../../../_metronic/layout/components/content'
import {useAuth} from '../../modules/auth/core/Auth'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import {TablesWidget52} from '../../../_metronic/partials/widgets/tables/TablesWidget52'
import { Dashboardheader } from "../../../_metronic/partials/components/student/DashboardHeader";
import { ListsWidget10 } from "../../../_metronic/partials/widgets/lists/ListsWidget10";
import { ListsWidget11 } from "../../../_metronic/partials/widgets/lists/ListsWidget11";
import { DOMAIN } from '../../routing/ApiEndpoints'
// import { HeaderWrapper } from "../../../_metronic/layout/components/header_student";

const localizer = momentLocalizer(moment)
 

const DashboardPage: FC=() => {
  const { currentUser } = useAuth();

  const [totalSchools, setTotalSchools] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [subscription, setSubscription] = useState(0);
  const [modules, setModules] = useState(0);
  const [schoolDetails, setSchoolDetails] = useState(0);

  const [userRole, setUserRole] = useState<string | null>(null);
  const [error, setError] = useState(null);



  useEffect(() => {
    // Define an async function to fetch the school count
    const fetchSchoolCount = async () => {
      try {
        // Fetch data from the server
        const response = await fetch(`${DOMAIN}/api/superadmin/school-count`); // Update the URL to match your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Set the school count in the state
        setTotalSchools(data.totalSchools);
      } catch (err) {
        // Set error in the state
        setError(err.message);
      }
    };

    // Call the fetch function
    fetchSchoolCount();

     // Define an async function to fetch the school count
     const fetchUsersCount = async () => {
      try {
        // Fetch data from the server
        const response = await fetch(`${DOMAIN}/api/superadmin/users-count`); // Update the URL to match your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Set the school count in the state
        setActiveUsers(data.totalActiveUsers);
      } catch (err) {
        // Set error in the state
        setError(err.message);
      }
    };

    // Call the fetch function
    fetchUsersCount();
     // Define an async function to fetch the school count
     const fetchSubscriptionsCount = async () => {
      try {
        // Fetch data from the server
        const response = await fetch(`${DOMAIN}/api/superadmin/subscription-count`); // Update the URL to match your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Set the school count in the state
        setSubscription(data.totalSubscriptions);
      } catch (err) {
        // Set error in the state
        setError(err.message);
      }
    };

    // Call the fetch function
    fetchSubscriptionsCount();
     // Define an async function to fetch the school count
     const fetchModulesCount = async () => {
      try {
        // Fetch data from the server
        const response = await fetch(`${DOMAIN}/api/superadmin/module-count`); // Update the URL to match your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Set the school count in the state
        setModules(data.totalModules);
      } catch (err) {
        // Set error in the state
        setError(err.message);
      }
    };

    // Call the fetch function
    fetchModulesCount();
     const fetchSchoolDetails= async () => {
      try {
        // Fetch data from the server
        const response = await fetch(`${DOMAIN}/api/superadmin/school-details`); // Update the URL to match your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        
        // Set the school count in the state
        setSchoolDetails(data);
      } catch (err) {
        // Set error in the state
        setError(err.message);
      }
    };

    // Call the fetch function
    fetchSchoolDetails();

  }, []);




  const tenants = [
    {
      id: 1,
      name: 'School A',
      contactPerson: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      subscriptionStatus: 'Active',
      licenseExpiry: '2024-09-21'
    },
    {
      id: 2,
      name: 'School B',
      contactPerson: 'Jane Smith',
      email: 'jane@example.com',
      phone: '987-654-3210',
      subscriptionStatus: 'Inactive',
      licenseExpiry: '2024-01-15'
    },
    // More tenants...
  ];

  const licenses = [
    {
      id: 1,
      schoolName: 'School A',
      subscriptionPlan: 'Premium',
      licenseExpiry: '2024-09-21',
      autoRenew: true,
    },
    {
      id: 2,
      schoolName: 'School B',
      subscriptionPlan: 'Basic',
      licenseExpiry: '2024-01-15',
      autoRenew: false,
    },
    // Add more license data...
  ];
  
  useEffect(() => {
    const prefetchUserRole = async () => {
      if (currentUser?.role_name) {
        const role = currentUser.role_name;
  
        // If role_name is "School Staff", set the designation
        if (role === 'School Staff' && currentUser.designation) {
          setUserRole(currentUser.designation);
        } else {
          setUserRole(role);
        }
      }
    };
  
    prefetchUserRole();
  }, [currentUser]);  
  

  
  
 return (

  <div className="bg-white">
    {(userRole === 'School Admin') && (
    <Content>
    <div className='row g-5 g-xl-5 mb-10' style={{maxHeight:'160px'}}>
      <div className='col-xxl-3'>
      <EngageWidget10 title={"No. of Students"} number={850} image={"students"} />
      </div>

      <div className='col-xxl-3'>
      <EngageWidget10 title={"No. of Teacher"} number={150} image={"teachers"} />
      </div>
      <div className='col-xxl-3'>
      <EngageWidget10 title={"Monthly Fees Collection"} number={"₹24,30,800"} image={"fees"} />
      </div>

      <div className='col-xxl-3'>
      <EngageWidget10 title={"Monthly Expense"} number={"₹5,32,200"} image={"expense"} />
      </div>
    </div>

    <div className='row'>
      <div className='col-xxl-8 mb-5 mb-xl-10'>
      <Calendar
      localizer={localizer}
      // events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 620 }}
    />
      </div>

      <div className='col-xxl-4 mb-5 mb-xl-10'>
        <TablesWidget52 />
      </div>
    </div>

    
    </Content>

    )}
    {(userRole === 'Teacher') && (
    <Content>
    <div className='row g-5 g-xl-5 mb-10' style={{maxHeight:'160px'}}>
      <div className='col-xxl-3'>
      <EngageWidget10 title={"No. of Students"} number={850} image={"students"} />
      </div>

      <div className='col-xxl-3'>
      <EngageWidget10 title={"No. of Teacher"} number={150} image={"teachers"} />
      </div>

      <div className='col-xxl-3'>
      <EngageWidget10 title={"Monthly Expense"} number={"₹5,32,200"} image={"expense"} />
      </div>
    </div>

    <div className='row'>
      <div className='col-xxl-8 mb-5 mb-xl-10'>
      <Calendar
      localizer={localizer}
      // events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 620 }}
    />
      </div>

      <div className='col-xxl-4 mb-5 mb-xl-10'>
        <TablesWidget52 />
      </div>
    </div>

    
    </Content>

    )}
    {userRole === 'Super Admin' && (
     <Content>
      <div className="container-fluid mt-4" style={{display:'flex', flexDirection:'column', gap:'25px', fontFamily:'Manrope'}}>
      <div className="row">
        {/* Number of Schools Card */}
        <div className="col-md-3 mb-4">
          <div className="card" style={{ width: "100%",backgroundColor:'#1F3259', color:'#fff',boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", }}>
            <div className="card-body">
              <h5 className="card-title" style={{ fontFamily: 'Manrope', fontSize: '18px', color:'#fff' }}>Number of Schools</h5>
              <p className="card-text" style={{ fontFamily: 'Manrope', fontSize: '28px', fontWeight: '800' }}>
                {totalSchools ? totalSchools : "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Active Users Card */}
        <div className="col-md-3 mb-4">
          <div className="card" style={{ width: "100%",backgroundColor:'#DFFFB6', color:'#29B837',boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", }}>
            <div className="card-body">
              <h5 className="card-title" style={{ fontFamily: 'Manrope', fontSize: '18px', color:'#1F3259' }}>Active Users</h5>
              <p className="card-text" style={{ fontFamily: 'Manrope', fontSize: '28px', fontWeight: '800' }}>
                {activeUsers ? activeUsers : "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Subscription Expiring Soon Card */}
        <div className="col-md-3 mb-4">
          <div className="card" style={{ width: "100%",backgroundColor:'#FFE7E1', color:'#FF5B5B',boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", }}>
            <div className="card-body">
              <h5 className="card-title" style={{ fontFamily: 'Manrope', fontSize: '18px',color:'#1F3259' }}>Total Subscriptions</h5>
              <p className="card-text" style={{ fontFamily: 'Manrope', fontSize: '28px', fontWeight: '800' }}>
                {subscription ? subscription : "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Pending Support Tickets Card */}
        <div className="col-md-3 mb-4">
          <div className="card" style={{ width: "100%",backgroundColor:'#F2F6FF', color:'#1F3259' ,boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", }}>
            <div className="card-body">
              <h5 className="card-title" style={{ fontFamily: 'Manrope', fontSize: '18px' }}>Total Modules</h5>
              <p className="card-text" style={{ fontFamily: 'Manrope', fontSize: '28px', fontWeight: '800' }}>
                {modules ? modules : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tenant Management Section */}
      <div className="row">
  <div className="col-md-12" style={{height:'500px'}}>
    <div className="card table-container" style={{ width: "100%" , height:'100%',boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",fontFamily:'Manrope'}}>
      <div className="card-body">
        <h5 className="card-title" style={{ fontFamily: 'Manrope', fontSize: '18px' }}>Schools Management</h5>
        <p>View all the school tenants details in brief here.</p>

        {/* Tenant Management Table */}
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">School Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Subscription</th>
                <th scope="col">Assigned At</th>
              </tr>
            </thead>
            <tbody>
              {schoolDetails.length > 0 ? (
                schoolDetails.map((tenant, index) => (
                  <tr key={tenant.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{tenant.name}</td>
                    <td>{tenant.email}</td>
                    <td>{tenant.phone}</td>
                    <td>{tenant.sub_name}</td>
                    <td>{new Date(tenant.sub_date).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">No tenants available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>



      {/* License and Subscription Management Section */}
      {/* <div className="row mt-4">
        <div className="col-md-12">
          <div className="card" style={{ width: "100%" }}>
            <div className="card-body">
              <h5 className="card-title" style={{ fontFamily: 'Manrope', fontSize: '18px' }}>License & Subscription Management</h5>
              <p>Manage license renewals and subscription plans here.</p>

              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">School Name</th>
                      <th scope="col">Subscription Plan</th>
                      <th scope="col">License Expiry</th>
                      <th scope="col">Auto-Renew</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {licenses.length > 0 ? (
                      licenses.map((license, index) => (
                        <tr key={license.id}>
                          <th scope="row">{index + 1}</th>
                          <td>{license.schoolName}</td>
                          <td>{license.subscriptionPlan}</td>
                          <td>{license.licenseExpiry}</td>
                          <td>
                            <input
                              type="checkbox"
                              checked={license.autoRenew}
                              onChange={() => handleAutoRenewToggle(license.id)}
                            />
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-primary mr-2"
                              onClick={() => handleRenewLicense(license.id)}
                            >
                              Renew
                            </button>
                            <button
                              className="btn btn-sm btn-secondary"
                              onClick={() => handleChangePlan(license.id)}
                            >
                              Change Plan
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">No licenses available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Additional sections for reports, notifications, etc. can be added similarly */}
    </div>
   </Content>
    )}
    {userRole === 'student' && (
<Content>
      {/* <HeaderWrapper /> */}
      <Dashboardheader />

      <div className='row gy-5 g-xl-8'>
      <div className='col-xl-4'>
        <ListsWidget11 className='card-xl-stretch mb-xl-8' />
      </div>
      <div className='col-xl-4'>
        <ListsWidget10 className='card-xl-stretch mb-xl-8' />
      </div>
      <div className='col-xl-4'>
        {/* <ListsWidget4 className='card-xl-stretch mb-5 mb-xl-8' items={5} /> */}
      </div>
    </div>
    </Content>
     )}
  </div>
)
}

const DashboardWrapper: FC = () => {

  
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage  />
    </>
  )
}

export {DashboardWrapper}
