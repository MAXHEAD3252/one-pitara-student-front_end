
import { FC } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useIntl } from "react-intl";


const PhoneCallLogPage: FC = () => {
  return <div>PhoneCallLog</div>;
};

const PhoneCallLog: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.PhoneCallLog" })}
      </PageTitle>
      <PhoneCallLogPage />
    </>
  );
};


export { PhoneCallLog };