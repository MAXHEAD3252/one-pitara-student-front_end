import { FC } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useIntl } from "react-intl";


const StudentProfilesPage: FC = () => {
  return <div>StudentProfiles</div>;
};

const StudentProfiles: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.StudentProfiles" })}
      </PageTitle>
      <StudentProfilesPage />
    </>
  );
};


export { StudentProfiles };
