
import { FC } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useIntl } from "react-intl";


const ApplicationReviewPage: FC = () => {
  return <div>ApplicationReview</div>;
};

const ApplicationReview: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.ApplicationReview" })}
      </PageTitle>
      <ApplicationReviewPage />
    </>
  );
};


export { ApplicationReview };
