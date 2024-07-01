import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { PageTitle } from "../../../../../_metronic/layout/core";
import { Content } from "../../../../../_metronic/layout/components/content";
import { TablesWidget28 } from "../../../../../_metronic/partials/widgets/tables/TablesWidget28";
import { HeaderWrapper } from "../../../../../_metronic/layout/components/header_staff";
import { DOMAIN } from "../../../../routing/ApiEndpoints";
import { useAuth } from "../../../../modules/auth/core/Auth";
import { useNavigate, useParams } from "react-router-dom";

const SelectSectionsPage: FC = () => {
  const { currentUser } = useAuth();
  const Navigate = useNavigate();
  const {classId} = useParams();
  const school_id = currentUser?.school_id;

  const [getSections, setSections] = useState([]);
  
  console.log(getSections);

useEffect(()=>{
  const fetchSections = async () => {
    try {
      const response = await fetch(
        `${DOMAIN}/api/staff/get-allsections/${school_id}/${classId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSections(data);
    } catch (error) {
      console.log(error);
    }
  };
  fetchSections();
},[])

  const handleClick = (value) => {
    const section_id = value;
    Navigate(`/select-subjects/${classId}/${section_id}`)
    // fetchSections(value);
  };
  return (
    <div className="bg-body-secondary">
      <HeaderWrapper toggleView={() => {}} />

      <Content>
        <div className="container">
        <div className="row">
          {getSections.map((cls) => (
            <div className="col-md-4" key={cls.id}>
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">{cls.section}</h5>
                  <p className="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <button
                    onClick={() => handleClick(cls.id)}
                    className="btn btn-primary"
                  >
                    View More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        </div>
      </Content>
    </div>
  );
};

const SelectSections: FC = () => {
  const intl = useIntl();

  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.HOMEWORK" })}
      </PageTitle>

      <SelectSectionsPage />
    </>
  );
};

export { SelectSections };
