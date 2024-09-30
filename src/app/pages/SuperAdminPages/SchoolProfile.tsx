// import React, { useState } from "react";
// import { FC } from "react";
import { useIntl } from "react-intl";
import { PageTitle } from "../../../_metronic/layout/core";
import { Content } from "../../../_metronic/layout/components/content";
import { CardsWidget5, TablesWidget44 } from "../../../_metronic/partials/widgets";
import { useParams } from "react-router-dom";
import { TablesWidget42 } from "../../../_metronic/partials/widgets/tables/TablesWidget42";
import { TablesWidget43 } from "../../../_metronic/partials/widgets/tables/TablesWidget43";
import { useEffect, useState } from "react";
import { DOMAIN } from "../../routing/ApiEndpoints";




export const SchoolProfilePage = () => {
  const { schoolId } = useParams();
  const [subscriptionId, setSubscriptionId] = useState(null);
  const [subscriptionName, setSubscriptionName] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchSubscriptionId = async () => {
        try {
            const response = await fetch(`${DOMAIN}/api/superadmin/get-subscription-id/${schoolId}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            setSubscriptionId(data.result[0]?.subscription_id);
            setSubscriptionName(data.result[0]?.subscription_name);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    if (schoolId) {
        fetchSubscriptionId();
    } else {
        setLoading(false);
    }
}, [schoolId]);

//   useEffect(() => {
   
//   }, []);

  // const editDetails = (id) => {
  //   // Navigate to a page/modal to edit details of the academy with the given ID
  // };

  // const deleteacademy = (id) => {
  //   // Implement logic to delete the academy with the given ID
  // };



 
  return (
    <div className="bg-white">

      <Content>
        <div className="row g-5 g-xl-7 mb-md-5 mb-xl-10">
          <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className="h-md-100">
              <CardsWidget5 schoolId={schoolId} />
            </div>
          </div>
            <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-12">
              <div className="h-md-100">
                <TablesWidget44 schoolId={schoolId} />
              </div>
            </div>
          {/* <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div className="h-md-100">
              <TablesWidget43 schoolId={schoolId} />
            </div>
          </div> */}
          {/* <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div className="h-md-100">
              <TablesWidget42 subscriptionId={subscriptionId} subscriptionName={subscriptionName} />
            </div>
          </div> */}
        </div>
      </Content>
    </div>
  );
};

const SchoolProfile = () => {
  const intl = useIntl();

  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.HOMEWORK" })}
      </PageTitle>

      {/* <HeaderWrapper toggleView={() => {}} /> */}
      <SchoolProfilePage />
    </>
  );
};

export default SchoolProfile;
