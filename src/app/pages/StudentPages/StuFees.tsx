import { FC, useEffect } from "react";
import { useIntl } from "react-intl";
import { PageTitle } from "../../../_metronic/layout/core";
import { Content } from "../../../_metronic/layout/components/content";
import { TablesWidget17 } from "../../../_metronic/partials/widgets/tables/TablesWidget17";
import { useLocation } from "react-router-dom";

const StudentFeesPage: FC = () => {
  
  const location = useLocation();
  const groupDetails = location.state?.groupDetails;

  if (!groupDetails) {
    return <div>No group details available</div>;
  }

  return (
    <div
    style={{
      width: "90%",
      borderRadius: "16px",
      backgroundColor: "rgb(242, 246, 255)",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      padding: "20px",
      marginRight: "10vh",
      marginLeft: "5vh",
      marginTop:'5vh',
    }}
  >
      <Content>
        <div className="row gy-5 gx-xl-8">
          <div className="col-xl-12 p-6">
            <TablesWidget17
              groupDetails={groupDetails}
              className="card-xxl-stretch mb-5 mb-xl-8"
            />
          </div>
        </div>
      </Content>
    </div>
  );
};

const StuFees: FC = () => {
  const intl = useIntl();

  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.FEEDETAILS" })}
      </PageTitle>
      <StudentFeesPage/>
    </>
  );
};

export { StuFees };
