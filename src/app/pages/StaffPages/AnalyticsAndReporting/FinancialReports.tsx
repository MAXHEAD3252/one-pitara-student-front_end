
import { FC } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useIntl } from "react-intl";


const FinancialReportsPage: FC = () => {
  return <div>FinancialReports</div>;
};

const FinancialReports: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.FinancialReports" })}
      </PageTitle>
      <FinancialReportsPage />
    </>
  );
};


export { FinancialReports };
