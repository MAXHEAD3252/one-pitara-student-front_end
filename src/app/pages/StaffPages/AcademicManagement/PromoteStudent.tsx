import { FC } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useIntl } from "react-intl";


const PromoteStudentPage: FC = () => {
  return <div>PromoteStudent</div>;
};

const PromoteStudent: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.PromoteStudent" })}
      </PageTitle>
      <PromoteStudentPage />
    </>
  );
};


export { PromoteStudent };
