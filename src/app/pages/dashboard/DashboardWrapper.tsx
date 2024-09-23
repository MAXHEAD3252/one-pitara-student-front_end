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
// import { HeaderWrapper } from "../../../_metronic/layout/components/header_student";

const localizer = momentLocalizer(moment)
 

const DashboardPage: FC=() => {
  const { currentUser } = useAuth();
  console.log(currentUser?.role);
  // const [totalSchools, setTotalSchools] = useState<number | null>(null);

  const [totalSchools, setTotalSchools] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [subscriptionExpiringSoon, setSubscriptionExpiringSoon] = useState(0);
  const [pendingTickets, setPendingTickets] = useState(0);

  // Dummy functions for demonstration
  const fetchDashboardData = () => {
    // This would be replaced by API calls to fetch the actual data
    setTotalSchools(50); // Example data
    setActiveUsers(1200); // Example data
    setSubscriptionExpiringSoon(5); // Example data
    setPendingTickets(3); // Example data
  };

  useEffect(() => {
    fetchDashboardData(); // Fetch dashboard data on component mount
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
  

  
  
 return (

  <div className="bg-white">
    {(currentUser?.role === 'admin' &&  'staff') && (
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
    {currentUser?.role === 'superadmin' && (
     <Content>
      <div className="container-fluid mt-4">
      <div className="row">
        {/* Number of Schools Card */}
        <div className="col-md-3 mb-4">
          <div className="card" style={{ width: "100%" }}>
            <div className="card-body">
              <h5 className="card-title" style={{ fontFamily: 'Manrope', fontSize: '18px' }}>Number of Schools</h5>
              <p className="card-text" style={{ fontFamily: 'Manrope', fontSize: '28px', fontWeight: '800' }}>
                {totalSchools ? totalSchools : "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Active Users Card */}
        <div className="col-md-3 mb-4">
          <div className="card" style={{ width: "100%" }}>
            <div className="card-body">
              <h5 className="card-title" style={{ fontFamily: 'Manrope', fontSize: '18px' }}>Active Users</h5>
              <p className="card-text" style={{ fontFamily: 'Manrope', fontSize: '28px', fontWeight: '800' }}>
                {activeUsers ? activeUsers : "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Subscription Expiring Soon Card */}
        <div className="col-md-3 mb-4">
          <div className="card" style={{ width: "100%" }}>
            <div className="card-body">
              <h5 className="card-title" style={{ fontFamily: 'Manrope', fontSize: '18px' }}>Subscriptions Expiring Soon</h5>
              <p className="card-text" style={{ fontFamily: 'Manrope', fontSize: '28px', fontWeight: '800' }}>
                {subscriptionExpiringSoon ? subscriptionExpiringSoon : "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Pending Support Tickets Card */}
        <div className="col-md-3 mb-4">
          <div className="card" style={{ width: "100%" }}>
            <div className="card-body">
              <h5 className="card-title" style={{ fontFamily: 'Manrope', fontSize: '18px' }}>Pending Support Tickets</h5>
              <p className="card-text" style={{ fontFamily: 'Manrope', fontSize: '28px', fontWeight: '800' }}>
                {pendingTickets ? pendingTickets : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tenant Management Section */}
      <div className="row">
        <div className="col-md-12">
          <div className="card" style={{ width: "100%" }}>
            <div className="card-body">
              <h5 className="card-title" style={{ fontFamily: 'Manrope', fontSize: '18px' }}>Tenant Management</h5>
              <p>Manage and configure school tenants here.</p>

              {/* Tenant Management Table */}
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">School Name</th>
                      <th scope="col">Contact Person</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Subscription Status</th>
                      <th scope="col">License Expiry</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tenants.length > 0 ? (
                      tenants.map((tenant, index) => (
                        <tr key={tenant.id}>
                          <th scope="row">{index + 1}</th>
                          <td>{tenant.name}</td>
                          <td>{tenant.contactPerson}</td>
                          <td>{tenant.email}</td>
                          <td>{tenant.phone}</td>
                          <td>
                            <span
                              className={`badge ${
                                tenant.subscriptionStatus === 'Active'
                                  ? 'badge-success'
                                  : 'badge-danger'
                              }`}
                            >
                              {tenant.subscriptionStatus}
                            </span>
                          </td>
                          <td>{tenant.licenseExpiry}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">No tenants available</td>
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
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card" style={{ width: "100%" }}>
            <div className="card-body">
              <h5 className="card-title" style={{ fontFamily: 'Manrope', fontSize: '18px' }}>License & Subscription Management</h5>
              <p>Manage license renewals and subscription plans here.</p>

              {/* License Management Table */}
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
                              // onChange={() => handleAutoRenewToggle(license.id)}
                            />
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-primary mr-2"
                              // onClick={() => handleRenewLicense(license.id)}
                            >
                              Renew
                            </button>
                            <button
                              className="btn btn-sm btn-secondary"
                              // onClick={() => handleChangePlan(license.id)}
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
      </div>

      {/* Additional sections for reports, notifications, etc. can be added similarly */}
    </div>
   </Content>
    )}




{currentUser?.role === 'student' && (
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


{/* <div className='row gy-5 gx-xl-8'>
      <div className='col-xxl-4'>
        <ListsWidget3 className='card-xxl-stretch mb-xl-3' />
      </div>
      <div className='col-xl-8'>
        <TablesWidget10 className='card-xxl-stretch mb-5 mb-xl-8' />
      </div>
    </div> */}

    {/* <div className='row gy-5 g-xl-8'>
      <div className='col-xl-4'>
        <ListsWidget2 className='card-xl-stretch mb-xl-8' />
      </div>
      <div className='col-xl-4'>
        <ListsWidget6 className='card-xl-stretch mb-xl-8' />
      </div>
      <div className='col-xl-4'>
        <ListsWidget4 className='card-xl-stretch mb-5 mb-xl-8' items={5} />
      </div>
    </div> */}

    {/* <div className='row g-5 gx-xxl-8'>
      <div className='col-xxl-4'>
        <MixedWidget8
          className='card-xxl-stretch mb-xl-3'
          chartColor='success'
          chartHeight='150px'
        />
      </div>
      <div className='col-xxl-8'>
        <TablesWidget5 className='card-xxl-stretch mb-5 mb-xxl-8' />
      </div>
    </div> */}

{/*
 <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
      <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10'>
        <CardsWidget20
          className='h-md-50 mb-5 mb-xl-10'
          description='Active Projects'
          color='#F1416C'
          img={toAbsoluteUrl('media/patterns/vector-1.png')}
        />
        <CardsWidget7
          className='h-md-50 mb-5 mb-xl-10'
          description='Professionals'
          icon={false}
          stats={357}
          labelColor='dark'
          textColor='gray-300'
        />
      </div>

      <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10'>
        <CardsWidget17 className='h-md-50 mb-5 mb-xl-10' />
        <ListsWidget26 className='h-lg-50' />
      </div>

      <div className='col-xxl-6'>
        <EngageWidget10 className='h-md-100' />
      </div>
    </div>

    <div className='row gx-5 gx-xl-10'>
      <div className='col-xxl-6 mb-5 mb-xl-10'>
      </div>

      <div className='col-xxl-6 mb-5 mb-xl-10'>
      </div>
    </div>

    <div className='row gy-5 gx-xl-8'>
      <div className='col-xxl-4'>
        <ListsWidget3 className='card-xxl-stretch mb-xl-3' />
      </div>
      <div className='col-xl-8'>
        <TablesWidget10 className='card-xxl-stretch mb-5 mb-xl-8' /> 
        </div>
        </div>
    
        <div className='row gy-5 g-xl-8'>
          <div className='col-xl-4'>
            <ListsWidget2 className='card-xl-stretch mb-xl-8' />
          </div>
          <div className='col-xl-4'>
            <ListsWidget6 className='card-xl-stretch mb-xl-8' />
          </div>
          <div className='col-xl-4'>
            <ListsWidget4 className='card-xl-stretch mb-5 mb-xl-8' items={5} />
          </div>
        </div>
    
        <div className='row g-5 gx-xxl-8'>
          <div className='col-xxl-4'>
            <MixedWidget8
              className='card-xxl-stretch mb-xl-3'
              chartColor='success'
              chartHeight='150px'
            />
          </div>
          <div className='col-xxl-8'>
            <TablesWidget5 className='card-xxl-stretch mb-5 mb-xxl-8' />
          </div>
        </div>
*/}