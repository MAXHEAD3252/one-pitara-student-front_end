import { FC } from "react";
import { useIntl } from "react-intl";
import { PageTitle } from "../../../../_metronic/layout/core";
import { Content } from "../../../../_metronic/layout/components/content";
import { TablesWidget28 } from "../../../../_metronic/partials/widgets/tables/TablesWidget28";
import { HeaderWrapper } from '../../../../_metronic/layout/components/header_staff'
const Roles: FC = () => {


  return (
    <div className="">    
    

      <Content>
        <TablesWidget28 />
      </Content>
    </div>
  );
};

const UserRoles: FC = () => {
    const intl = useIntl();

    return (
      <>
        <PageTitle breadcrumbs={[]}>
          {intl.formatMessage({ id: "MENU.HOMEWORK" })}
        </PageTitle>
  
        <HeaderWrapper toggleView={() => {}} />
        <Roles />
      </>
    );
};

export { UserRoles };
