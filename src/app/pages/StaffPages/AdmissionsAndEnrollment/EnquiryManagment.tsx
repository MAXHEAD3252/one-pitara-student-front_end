
import { FC } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useIntl } from "react-intl";


const EnquiryManagmentPage: FC = () => {
  return <div>EnquiryManagment</div>;
};

const EnquiryManagment: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.EnquiryManagment" })}
      </PageTitle>
      <EnquiryManagmentPage />
    </>
  );
};


export { EnquiryManagment };
