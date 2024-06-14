
import { FC } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useIntl } from "react-intl";


const MailAndDispatchManagementPage: FC = () => {
  return <div>MailAndDispatchManagement</div>;
};

const MailAndDispatchManagement: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.MailAndDispatchManagement" })}
      </PageTitle>
      <MailAndDispatchManagementPage />
    </>
  );
};


export { MailAndDispatchManagement };