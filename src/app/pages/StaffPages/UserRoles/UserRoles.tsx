import { FC } from "react";
import { useIntl } from "react-intl";
import { PageTitle } from "../../../../_metronic/layout/core";
import { Content } from "../../../../_metronic/layout/components/content";
import { TablesWidget28 } from "../../../../_metronic/partials/widgets/tables/TablesWidget28";
import { HeaderWrapper } from '../../../../_metronic/layout/components/header_staff'
const Roles: FC = () => {


  return (
    <div className="bg-body-secondary">    
    

      <Content>
        <div className="row g-5 g-xl-10 mb-6 mb-xl-5">
            <div 
            style={{
             
            }}>
                <label
                >Add Role: </label>
                <input type="text" name="role" placeholder="Add a role..."/>
            <button
            className="btn btn-primary"
            style={{
                display:"flex",
                margin:'10px'
            }}>save</button>
            </div>
          <TablesWidget28 className={" "} /> 
        </div>
       
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
