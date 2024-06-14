
import { FC } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useIntl } from "react-intl";


const SessionSettingPage: FC = () => {
  return <div>SessionSetting</div>;
};

const SessionSetting: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.SessionSetting" })}
      </PageTitle>
      <SessionSettingPage />
    </>
  );
};


export { SessionSetting };
