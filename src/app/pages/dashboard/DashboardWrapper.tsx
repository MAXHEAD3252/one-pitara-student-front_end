/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { PageTitle } from "../../../_metronic/layout/core";
import { Content } from "../../../_metronic/layout/components/content";
import { useAuth } from "../../modules/auth/core/Auth";
import { Dashboardheader } from "../../../_metronic/partials/components/student/DashboardHeader";
import { TablesWidget69 } from "../../../_metronic/partials/widgets";
import {
  DOMAIN
} from "../../routing/ApiEndpoints";

const DashboardPage: FC = () => {
  const { currentUser } = useAuth();
  // const currency = currentUser?.currency_symbol;
  // const school_id = currentUser?.school_id;
  // const session_id = currentUser?.session_id;

  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const prefetchUserRole = async () => {
      if (currentUser?.role) {
        const role = currentUser.role;
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
      {userRole === "student" && (
        <>
          <Content>
            {/* <HeaderWrapper /> */}
            <Dashboardheader />
          </Content>
          <TablesWidget69 />
        </>
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
