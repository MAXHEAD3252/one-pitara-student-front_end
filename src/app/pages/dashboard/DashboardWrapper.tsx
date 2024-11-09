/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { PageTitle } from "../../../_metronic/layout/core";
import { EngageWidget10 } from "../../../_metronic/partials/widgets";
import { Content } from "../../../_metronic/layout/components/content";
import { useAuth } from "../../modules/auth/core/Auth";
import { TablesWidget52 } from "../../../_metronic/partials/widgets/tables/TablesWidget52";
import { Dashboardheader } from "../../../_metronic/partials/components/student/DashboardHeader";
import { ListsWidget10 } from "../../../_metronic/partials/widgets/lists/ListsWidget10";
import { ListsWidget11 } from "../../../_metronic/partials/widgets/lists/ListsWidget11";
import { DOMAIN,
  get_school_count,
  get_users_count,
  get_subscription_count,
  get_module_count,
  get_school_details, } from "../../routing/ApiEndpoints";
import ChartsWidget19 from "../../../_metronic/partials/widgets/charts/ChartsWidget19";
import SchoolEventsCalendar from "../../../_metronic/partials/widgets/_new/cards/SchoolEventsCalendar";


interface school {
  id:number;
  name:string;
  email:string;
  phone:number;
  sub_name:string;
  sub_date:string;
}

const DashboardPage: FC = () => {
  const { currentUser } = useAuth();
  const currency = currentUser?.currency_symbol;

  const [totalSchools, setTotalSchools] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [subscription, setSubscription] = useState(0);
  const [modules, setModules] = useState(0);
  const [schoolDetails, setSchoolDetails] = useState<school[]>([]);

  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Define an async function to fetch the school count
    const fetchSchoolCount = async () => {
      try {
        // Fetch data from the server
        const response = await fetch(`${DOMAIN}/${get_school_count}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTotalSchools(data.totalSchools); 
      } catch (error) {
        // Set error in the state
        console.error(error);
      }
    };

    // Call the fetch function
    fetchSchoolCount();

    // Define an async function to fetch the school count
    const fetchUsersCount = async () => {
      try {
        // Fetch data from the server
        const response = await fetch(`${DOMAIN}/${get_users_count}`); // Update the URL to match your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Set the school count in the state
        setActiveUsers(data.totalActiveUsers);
      } catch (error) {
        // Set error in the state
        console.error(error);
      }
    };

    // Call the fetch function
    fetchUsersCount();
    // Define an async function to fetch the school count
    const fetchSubscriptionsCount = async () => {
      try {
        // Fetch data from the server
        const response = await fetch(
          `${DOMAIN}/${get_subscription_count}`
        ); // Update the URL to match your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Set the school count in the state
        setSubscription(data.totalSubscriptions);
      } catch (error) {
        // Set error in the state
        console.error(error);
      }
    };

    // Call the fetch function
    fetchSubscriptionsCount();
    // Define an async function to fetch the school count
    const fetchModulesCount = async () => {
      try {
        // Fetch data from the server
        const response = await fetch(`${DOMAIN}/${get_module_count}`); // Update the URL to match your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Set the school count in the state
        setModules(data.totalModules);
      } catch (error) {
        // Set error in the state
        console.error(error);
      }
    };

    // Call the fetch function
    fetchModulesCount();
    const fetchSchoolDetails = async () => {
      try {
        // Fetch data from the server
        const response = await fetch(`${DOMAIN}/${get_school_details}`); // Update the URL to match your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Set the school count in the state
        setSchoolDetails(data);
      } catch (error) {
        // Set error in the state
        console.error(error);
      }
    };

    // Call the fetch function
    fetchSchoolDetails();
  }, []);

  useEffect(() => {
    const prefetchUserRole = async () => {
      if (currentUser?.role_name) {
        const role = currentUser.role_name;

        // If role_name is "School Staff", set the designation
        if (role === "School Staff" && currentUser.designation) {
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
      {userRole === "School Admin" && (
        <Content>
          <div className="row g-5 g-xl-5" style={{ maxHeight: "160px" }}>
            <div className="col-xxl-3">
              <EngageWidget10
                title={"No. of Students"}
                number={850}
                image={"students"}
                backgroundColor={"#1F3259"}
                titlecolor={"#fff"}
                textcolor={"#fff"}
                />
            </div>

            <div className="col-xxl-3">
              <EngageWidget10
                title={"No. of Teacher"}
                number={150}
                image={"teachers"}
                backgroundColor={"#DFFFB6"}
                titlecolor={"#1F3259"}
                textcolor={"#29B837"}
                />
            </div>
            <div className="col-xxl-3">
              <EngageWidget10
                title={"Monthly Fees Collection"}
                number={ currency +" "+"24,30,800"}
                image={"fees"}
                backgroundColor={"#FFE7E1"}
                titlecolor={"#1F3259"}
                textcolor={"#FF5B5B"}
                />
            </div>

            <div className="col-xxl-3">
              <EngageWidget10
                title={"Monthly Expense"}
                number={currency +" "+ "5,32,200"}
                image={"expense"}
                backgroundColor={"#F2F6FF"}
                titlecolor={"#1F3259"}
                textcolor={"#1F3259"}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-xxl-8 mb-xl-10">
              <SchoolEventsCalendar />
            </div>
            <div className="col-xxl-4 mb-5 mb-xl-10">
              <TablesWidget52 />
            </div>
          </div>
          <div className="row">
            <div className="col-xxl-12 mb-5 mb-xl-10">
              <ChartsWidget19 />
            </div>
          </div>
        </Content>
      )}
      {userRole === "Teacher" && (
        <Content>
        <div className="row g-5 g-xl-5" style={{ maxHeight: "160px" }}>
          <div className="col-xxl-3">
            <EngageWidget10
              title={"No. of Students"}
              number={850}
              image={"students"}
              backgroundColor={"#1F3259"}
              titlecolor={"#fff"}
              textcolor={"#fff"}
              />
          </div>

          <div className="col-xxl-3">
            <EngageWidget10
              title={"No. of Teacher"}
              number={150}
              image={"teachers"}
              backgroundColor={"#DFFFB6"}
              titlecolor={"#1F3259"}
              textcolor={"#29B837"}
              />
          </div>
          <div className="col-xxl-3">
            <EngageWidget10
              title={"Monthly Fees Collection"}
              number={"₹24,30,800"}
              image={"fees"}
              backgroundColor={"#FFE7E1"}
              titlecolor={"#1F3259"}
              textcolor={"#FF5B5B"}
              />
          </div>

          <div className="col-xxl-3">
            <EngageWidget10
              title={"Monthly Expense"}
              number={"₹5,32,200"}
              image={"expense"}
              backgroundColor={"#F2F6FF"}
              titlecolor={"#1F3259"}
              textcolor={"#1F3259"}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-xxl-8 mb-xl-10">
            <SchoolEventsCalendar />
          </div>
          <div className="col-xxl-4 mb-5 mb-xl-10">
            <TablesWidget52 />
          </div>
        </div>
        <div className="row">
          <div className="col-xxl-12 mb-5 mb-xl-10">
            <ChartsWidget19 />
          </div>
        </div>
      </Content>
      )}
      {userRole === "Super Admin" && (
        <Content>
          <div
            className="container-fluid mt-4"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "25px",
              fontFamily: "Manrope",
            }}
          >
            <div className="row">
              {/* Number of Schools Card */}
              <div className="col-md-3 mb-4">
                <div
                  className="card"
                  style={{
                    width: "100%",
                    backgroundColor: "#1F3259",
                    color: "#fff",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="card-body">
                    <h5
                      className="card-title"
                      style={{
                        fontFamily: "Manrope",
                        fontSize: "18px",
                        color: "#fff",
                      }}
                    >
                      Number of Schools
                    </h5>
                    <p
                      className="card-text"
                      style={{
                        fontFamily: "Manrope",
                        fontSize: "28px",
                        fontWeight: "800",
                      }}
                    >
                      {totalSchools ? totalSchools : "-"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Active Users Card */}
              <div className="col-md-3 mb-4">
                <div
                  className="card"
                  style={{
                    width: "100%",
                    backgroundColor: "#DFFFB6",
                    color: "#29B837",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="card-body">
                    <h5
                      className="card-title"
                      style={{
                        fontFamily: "Manrope",
                        fontSize: "18px",
                        color: "#1F3259",
                      }}
                    >
                      Active Users
                    </h5>
                    <p
                      className="card-text"
                      style={{
                        fontFamily: "Manrope",
                        fontSize: "28px",
                        fontWeight: "800",
                      }}
                    >
                      {activeUsers ? activeUsers : "-"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Subscription Expiring Soon Card */}
              <div className="col-md-3 mb-4">
                <div
                  className="card"
                  style={{
                    width: "100%",
                    backgroundColor: "#FFE7E1",
                    color: "#FF5B5B",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="card-body">
                    <h5
                      className="card-title"
                      style={{
                        fontFamily: "Manrope",
                        fontSize: "18px",
                        color: "#1F3259",
                      }}
                    >
                      Total Subscriptions
                    </h5>
                    <p
                      className="card-text"
                      style={{
                        fontFamily: "Manrope",
                        fontSize: "28px",
                        fontWeight: "800",
                      }}
                    >
                      {subscription ? subscription : "-"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Pending Support Tickets Card */}
              <div className="col-md-3 mb-4">
                <div
                  className="card"
                  style={{
                    width: "100%",
                    backgroundColor: "#F2F6FF",
                    color: "#1F3259",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="card-body">
                    <h5
                      className="card-title"
                      style={{ fontFamily: "Manrope", fontSize: "18px" }}
                    >
                      Total Modules
                    </h5>
                    <p
                      className="card-text"
                      style={{
                        fontFamily: "Manrope",
                        fontSize: "28px",
                        fontWeight: "800",
                      }}
                    >
                      {modules ? modules : "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tenant Management Section */}
            <div className="row">
              <div className="col-md-12" style={{ height: "500px" }}>
                <div
                  className="card-style"
                  style={{
                    width: "100%",
                    borderRadius: "16px",
                    backgroundColor: "rgb(242, 246, 255)",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    overflow: "hidden",
                    marginTop: "20px",
                    padding: "20px",
                  }}
                >
                  <div
                    className="card-header"
                    style={{
                      backgroundColor: "rgb(242, 246, 255)",
                      padding: "16px 20px",
                      borderBottom: "1px solid #E0E4F0",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "15px",
                        fontWeight: "400",
                        color: "#1C335C",
                        fontFamily: "Manrope",
                      }}
                    >
                      <h5
                        className="card-title"
                        style={{ fontFamily: "Manrope", fontSize: "18px" }}
                      >
                        Schools Management
                      </h5>
                      <p>View all the school tenants details in brief here.</p>
                    </span>
                  </div>
                  <div
                    style={{
                      height: "auto", // Fixed height for the table container
                      overflowY: "auto", // Enable vertical scrolling
                      padding: "16px 0", // Optional: adds some padding around the table
                    }}
                  >
                    <table
                      className="table"
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginTop: "10px",
                        backgroundColor: "#FFFFFF", // White background for the table
                        borderRadius: "12px", // Round corners for the table
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)", // Light shadow for the table
                      }}
                    >
                      <thead>
                        <tr
                          style={{
                            backgroundColor: "rgb(242, 246, 255)", // Header background color
                            borderBottom: "1px solid #E0E4F0",
                            fontFamily: "Manrope",
                            fontWeight: "600",
                            color: "#1C335C",
                            fontSize: "14px",
                          }}
                        >
                          <th
                            style={{
                              padding: "12px 20px",
                              textAlign: "left",
                            }}
                          >
                            #
                          </th>
                          <th
                            style={{
                              padding: "12px 20px",
                              textAlign: "left",
                            }}
                          >
                            School Name
                          </th>
                          <th
                            style={{
                              padding: "12px 20px",
                              textAlign: "left",
                            }}
                          >
                            Email
                          </th>
                          <th
                            style={{
                              padding: "12px 20px",
                              textAlign: "left",
                            }}
                          >
                            Phone
                          </th>
                          <th
                            style={{
                              padding: "12px 20px",
                              textAlign: "left",
                            }}
                          >
                            Subscription
                          </th>
                          <th
                            style={{
                              padding: "12px 20px",
                              textAlign: "left",
                            }}
                          >
                            Assigned At
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {schoolDetails.length > 0 ? (
                          schoolDetails.map((tenant, index) => (
                            <tr
                              key={tenant.id}
                              style={{
                                backgroundColor:
                                  index % 2 === 0
                                    ? "rgb(242, 246, 255)"
                                    : "#FFFFFF",
                                borderBottom: "1px solid #E0E4F0",
                                fontFamily: "Manrope",
                                fontSize: "14px",
                                color: "#1C335C",
                              }}
                            >
                              <td
                                style={{
                                  padding: "12px 20px",
                                }}
                              >
                                {index + 1}
                              </td>
                              <td
                                style={{
                                  padding: "12px 20px",
                                }}
                              >
                                {tenant.name}
                              </td>
                              <td
                                style={{
                                  padding: "12px 20px",
                                }}
                              >
                                {tenant.email}
                              </td>
                              <td
                                style={{
                                  padding: "12px 20px",
                                }}
                              >
                                {tenant.phone}
                              </td>
                              <td
                                style={{
                                  padding: "12px 20px",
                                }}
                              >
                                {tenant.sub_name}
                              </td>
                              <td
                                style={{
                                  padding: "12px 20px",
                                }}
                              >
                                {new Date(tenant.sub_date).toLocaleString()}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="text-center">
                              No tenants available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Content>
      )}
      {userRole === "student" && (
        <Content>
          {/* <HeaderWrapper /> */}
          <Dashboardheader />

          <div className="row gy-5 g-xl-8">
            <div className="col-xl-4">
              <ListsWidget11 className="card-xl-stretch mb-xl-8" />
            </div>
            <div className="col-xl-4">
              <ListsWidget10 className="card-xl-stretch mb-xl-8" />
            </div>
            <div className="col-xl-4">
              {/* <ListsWidget4 className='card-xl-stretch mb-5 mb-xl-8' items={5} /> */}
            </div>
          </div>
        </Content>
      )}
    </div>
  );
};

const DashboardWrapper: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.DASHBOARD" })}
      </PageTitle>
      <DashboardPage />
    </>
  );
};

export { DashboardWrapper };
