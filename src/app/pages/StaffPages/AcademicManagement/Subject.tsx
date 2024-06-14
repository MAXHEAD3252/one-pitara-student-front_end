import { FC } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useIntl } from "react-intl";


const SubjectPage: FC = () => {
  return <div>Subject</div>;
};

const Subject: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.Subject" })}
      </PageTitle>
      <SubjectPage />
    </>
  );
};


export { Subject };
