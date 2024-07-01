import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { PageTitle } from "../../../../../_metronic/layout/core";
import { Content } from "../../../../../_metronic/layout/components/content";
import { TablesWidget28 } from "../../../../../_metronic/partials/widgets/tables/TablesWidget28";
import { HeaderWrapper } from "../../../../../_metronic/layout/components/header_staff";
import { DOMAIN } from "../../../../routing/ApiEndpoints";
import { useAuth } from "../../../../modules/auth/core/Auth";
import { useNavigate, useParams } from "react-router-dom";

const SelectSubjectPage: FC = () => {
  const { currentUser } = useAuth();
  const Navigate = useNavigate();
  const {classId , section_id} = useParams();
  const school_id = currentUser?.school_id;

  const [getSections, setSections] = useState([]);
  const [getSubjects, setSubjects] = useState([]);
  
  console.log(getSubjects);

useEffect(()=>{
  const fetchSubjects = async () => {
    try {
      const response = await fetch(
        `${DOMAIN}/api/staff/get-allsubjects/${classId}/${section_id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      console.log(error);
    }
  };
  fetchSubjects();
},[classId,section_id])

  const handleClick = (value) => {
    // Navigate(`select-subjects/${school_id}/${classId}`)
    // fetchSections(value);
  };
  return (
    <div className="bg-body-secondary">
      <HeaderWrapper toggleView={() => {}} />

      <Content>
        <div className="container">
        <div className="row">
          {getSubjects.map((cls) => (
            <div className="col-md-12" key={cls.id}>
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">{cls.subject_name}</h5>
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

const SelectSubject: FC = () => {
  const intl = useIntl();

  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.HOMEWORK" })}
      </PageTitle>

      <SelectSubjectPage />
    </>
  );
};

export { SelectSubject };
