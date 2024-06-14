import { FC } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useIntl } from "react-intl";


const SectionPage: FC = () => {
  return <div>Section</div>;
};

const Section: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.Section" })}
      </PageTitle>
      <SectionPage />
    </>
  );
};


export { Section };
