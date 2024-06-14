
import { FC } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useIntl } from "react-intl";


const AdmissionEnquiryPage: FC = () => {
  return <div>AdmissionEnquiry</div>;
};

const AdmissionEnquiry: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.AdmissionEnquiry" })}
      </PageTitle>
      <AdmissionEnquiryPage />
    </>
  );
};


export { AdmissionEnquiry };