import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { PageTitle } from "../../../_metronic/layout/core";

import { Content } from "../../../_metronic/layout/components/content";
import { useAuth } from "../../modules/auth/core/Auth";
import { Link, useLocation } from "react-router-dom";
import { KTIcon, toAbsoluteUrl } from "../../../_metronic/helpers";
import { Dashboardheader } from "../../../_metronic/partials/components/student/DashboardHeader";
import { ListsWidget2, ListsWidget4 } from "../../../_metronic/partials/widgets";
import { ListsWidget10 } from "../../../_metronic/partials/widgets/lists/ListsWidget10";
import { ListsWidget11 } from "../../../_metronic/partials/widgets/lists/ListsWidget11";


const handleToggle = (value: boolean) => {
  console.log(value);
};

const DashboardPage: FC = () => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  const [activeTab, setActiveTab] = useState("overview");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <Content>
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
  );
};

const DashboardStudent: FC = () => {
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

export { DashboardStudent };
