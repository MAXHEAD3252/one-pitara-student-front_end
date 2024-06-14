import { FC } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useIntl } from "react-intl";


const TeachersTimetablePage: FC = () => {
  return <div>TeachersTimetable</div>;
};

const TeachersTimetable: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.TeachersTimetable" })}
      </PageTitle>
      <TeachersTimetablePage />
    </>
  );
};


export { TeachersTimetable };
