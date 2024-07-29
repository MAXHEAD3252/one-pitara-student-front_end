
import { FC } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useIntl } from "react-intl";


const AdmissionReportPage: FC = () => {
  return <div>AdmissionReport</div>;
};

const AdmissionReport: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.AdmissionReport" })}
      </PageTitle>
      <AdmissionReportPage />
    </>
  );
};


export { AdmissionReport };