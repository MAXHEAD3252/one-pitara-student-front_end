
import { FC } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useIntl } from "react-intl";


const ExamMarksReportPage: FC = () => {
  return <div>ExamMarksReport</div>;
};

const ExamMarksReport: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.ExamMarksReport" })}
      </PageTitle>
      <ExamMarksReportPage />
    </>
  );
};


export { ExamMarksReport };
