
import { FC } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useIntl } from "react-intl";


const UserRolesPage: FC = () => {
  return <div>UserRoles</div>;
};

const UserRoles: FC = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.UserRoles" })}
      </PageTitle>
      <UserRolesPage />
    </>
  );
};


export { UserRoles };
