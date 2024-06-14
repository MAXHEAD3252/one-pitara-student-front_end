import { FC } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useIntl } from "react-intl";


const AssignTeacherPage: FC = () => {
  return <div>AssignTeacher</div>;
};

const AssignTeacher: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.AssignTeacher" })}
      </PageTitle>
      <AssignTeacherPage />
    </>
  );
};


export { AssignTeacher };
