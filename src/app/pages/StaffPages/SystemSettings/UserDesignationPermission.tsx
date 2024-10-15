import { FC } from "react";
import { useIntl } from "react-intl";
import { PageTitle } from "../../../../_metronic/layout/core";
import { Content } from "../../../../_metronic/layout/components/content";
import { TablesWidget29 } from "../../../../_metronic/partials/widgets/tables/TablesWidget29";
import { useLocation } from "react-router-dom";

const Roles: FC = () => {
  const { state } = useLocation();
  /* @ts-ignore */

  const roleId = state && state.roleId;
  const rolIdInt = roleId ? parseInt(roleId, 10) : null;

  return (
    <div className="bg-body-secondary">
      <Content>
        <div className="row g-5 g-xl-10 mb-6 mb-xl-5">
          <TablesWidget29 className={""} role_id={rolIdInt} />
        </div>
      </Content>
    </div>
  );
};

const UserDesignationPermission: FC = () => {
  const intl = useIntl();

  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.HOMEWORK" })}
      </PageTitle>

      <Roles />
    </>
  );
};

export default UserDesignationPermission ;
