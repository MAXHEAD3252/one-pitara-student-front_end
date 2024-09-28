

import { FC } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useIntl } from "react-intl";


const DisableStudentPage: FC = () => {
  return <div>Student Disavle</div>;
};

const DisableStudent: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.DisableStudent" })}
      </PageTitle>
      <DisableStudentPage />
    </>
  );
};


export { DisableStudent };
