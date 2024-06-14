
import { FC } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useIntl } from "react-intl";


const HealthWellnessReportsPage: FC = () => {
  return <div>HealthWellnessReports</div>;
};

const HealthWellnessReports: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.HealthWellnessReports" })}
      </PageTitle>
      <HealthWellnessReportsPage />
    </>
  );
};


export { HealthWellnessReports };
