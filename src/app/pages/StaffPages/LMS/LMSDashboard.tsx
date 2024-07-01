import { FC } from "react";
import { useIntl } from "react-intl";
import { PageTitle } from "../../../../_metronic/layout/core";
import { Content } from "../../../../_metronic/layout/components/content";
import { TablesWidget28 } from "../../../../_metronic/partials/widgets/tables/TablesWidget28";
import { HeaderWrapper } from "../../../../_metronic/layout/components/header_staff";
const LMSDashboardPage: FC = () => {
  return (
    <div className="bg-body-secondary">
      <HeaderWrapper toggleView={() => {}} />

      <Content>
        <div className="card" style={{ width: "18rem;" }}>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="#" className="card-link">
              Card link
            </a>
            <a href="#" className="card-link">
              Another link
            </a>
          </div>
        </div>
      </Content>
    </div>
  );
};

const LMSDashboard: FC = () => {
  const intl = useIntl();

  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.HOMEWORK" })}
      </PageTitle>

      <LMSDashboardPage />
    </>
  );
};

export { LMSDashboard };
