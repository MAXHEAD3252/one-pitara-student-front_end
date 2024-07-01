import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { PageTitle } from "../../../../../_metronic/layout/core";
import { Content } from "../../../../../_metronic/layout/components/content";
import { TablesWidget28 } from "../../../../../_metronic/partials/widgets/tables/TablesWidget28";
import { HeaderWrapper } from "../../../../../_metronic/layout/components/header_staff";
import { DOMAIN } from "../../../../routing/ApiEndpoints";
import { useAuth } from "../../../../modules/auth/core/Auth";
import { useNavigate } from "react-router-dom";
import { TablesWidget35 } from "../../../../../_metronic/partials/widgets/tables/TablesWidget35";

const CourseContentManagementPage: FC = () => {
  // const { currentUser } = useAuth();
  // const Navigate = useNavigate();
  // const school_id = currentUser?.school_id;
  // const [getClasses, setClasses] = useState([]);

  // const [classId, setClassId] = useState(0);

  // useEffect(() => {
  //   const fetchClasses = async () => {
  //     try {
  //       const response = await fetch(
  //         `${DOMAIN}/api/staff/get-allclasses/${school_id}`
  //       );
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       setClasses(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchClasses();
  // }, []);

 
  // const handleClick = (value) => {
  //   const classId = value;
  //   Navigate(`/select-sections/${classId}`)
  //   // fetchSections(value);
  // };
  return (
    <div className="bg-body-secondary">
      <HeaderWrapper toggleView={() => {}} />

      <Content>
      <TablesWidget35 />
        {/* <div className="row">
          {getClasses.map((cls) => (
            <div className="col-md-3" key={cls.id}>
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">{cls.class}</h5>
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
        </div> */}
      </Content>
    </div>
  );
};

const CourseContentManagement: FC = () => {
  const intl = useIntl();

  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.HOMEWORK" })}
      </PageTitle>

      <CourseContentManagementPage />
    </>
  );
};

export { CourseContentManagement };
