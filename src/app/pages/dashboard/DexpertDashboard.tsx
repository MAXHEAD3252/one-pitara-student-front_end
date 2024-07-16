import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { PageTitle } from "../../../_metronic/layout/core";
import { Content } from "../../../_metronic/layout/components/content";
// import {useAuth} from '../../../../core/Auth'
import { HeaderWrapper } from "../../../_metronic/layout/components/header_staff";
// import { DOMAIN } from "../../../app/routing/ApiEndpoints";


const DexpertDashboard: FC = () => {
  const [totalSchools, setTotalSchools] = useState<number | null>(null);

  // useEffect(() => {
  //   // Fetch schools data from API
  //   const fetchSchools = async () => {
  //     try {
  //       const response = await fetch(
  //         `${DOMAIN}/api/superadmin/get_schools_count`
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch schools");
  //       }
  //       const data = await response.json();

  //       setTotalSchools(data.totalSchools);
  //     } catch (error) {
  //       console.error("Error fetching schools:", error);
  //     }
  //   };

  //   fetchSchools();
  // }, []);
  return (
    <div className="bg-white">
      <HeaderWrapper toggleView={() => {}} />
      <Content>
        <div className="card" style={{ width: "20rem" }}>
          <div className="card-body">
            <h5 className="card-title" style={{fontFamily:'Manrope',fontSize:'18px'}}>Number of schools : </h5>
            <p className="card-text" style={{fontFamily:'Manrope',fontSize:'28px', fontWeight:'800'}}>{totalSchools ? totalSchools : "-"}</p>
          </div>
        </div>
      </Content>
    </div>
  );
};

const DashboardDexpert: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.DASHBOARD" })}
      </PageTitle>
      <DexpertDashboard />
    </>
  );
};

export { DashboardDexpert };
