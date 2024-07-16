import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { PageTitle } from "../../../../../_metronic/layout/core";
import { Content } from "../../../../../_metronic/layout/components/content";
import { TablesWidget28 } from "../../../../../_metronic/partials/widgets/tables/TablesWidget28";
import { HeaderWrapper } from "../../../../../_metronic/layout/components/header_staff";
import { DOMAIN } from "../../../../routing/ApiEndpoints";
import { useAuth } from "../../../../modules/auth/core/Auth";
import { useNavigate } from "react-router-dom";
import { TablesWidget35 } from "../../../../../_metronic/partials/widgets/tables/TablesWidget35";
import { SelectClass } from "../SelectClass";



const CourseContentManagementPage: FC = () => {
  return (
    <div className="">
      <HeaderWrapper toggleView={() => {}} />

      <Content>
        <SelectClass />
      </Content>
    </div>
  );
};

const CourseContentManagement: FC = () => {
  const intl = useIntl();

  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.HOMEWORK" })}
      </PageTitle>

      <CourseContentManagementPage />
    </>
  );
};

export { CourseContentManagement };
