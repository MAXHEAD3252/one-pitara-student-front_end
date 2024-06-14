import { FC } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useIntl } from "react-intl";


const ClassPage: FC = () => {
  return <div>Class</div>;
};

const Class: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.Class" })}
      </PageTitle>
      <ClassPage />
    </>
  );
};


export { Class };
