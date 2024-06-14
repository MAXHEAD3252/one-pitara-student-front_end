import { FC } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useIntl } from "react-intl";


const SubjectGroupPage: FC = () => {
  return <div>SubjectGroup</div>;
};

const SubjectGroup: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.SubjectGroup" })}
      </PageTitle>
      <SubjectGroupPage />
    </>
  );
};


export { SubjectGroup };
