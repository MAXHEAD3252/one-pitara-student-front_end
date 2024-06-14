import { FC } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useIntl } from "react-intl";


const ClassTimetablePage: FC = () => {
  return <div>ClassTimetable</div>;
};

const ClassTimetable: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.ClassTimetable" })}
      </PageTitle>
      <ClassTimetablePage />
    </>
  );
};


export { ClassTimetable };
