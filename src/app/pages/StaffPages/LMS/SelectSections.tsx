import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { PageTitle } from "../../../../_metronic/layout/core";
import { Content } from "../../../../_metronic/layout/components/content";
import { TablesWidget28 } from "../../../../_metronic/partials/widgets/tables/TablesWidget28";
import { HeaderWrapper } from "../../../../_metronic/layout/components/header_staff";
import { DOMAIN } from "../../../routing/ApiEndpoints";
import { useAuth } from "../../../modules/auth/core/Auth";
import { useNavigate, useParams } from "react-router-dom";



interface Section {
  id: string;
  section: string;
  class_section_id: string;
  // add other properties if needed
}


const SelectSectionsPage: FC = () => {
  const isAssignment = window.location.pathname.includes('lms-Assigmnent-management');

  const { currentUser } = useAuth();
  const Navigate = useNavigate();
  const { classId } = useParams<{ classId: string }>();
  const school_id = (currentUser as any)?.school_id;
  const [getSections, setSections] = useState<Section[]>([]);
  console.log(getSections);
  
  
  
  

  useEffect(() => {
    const fetchSections = async () => {
      if (!school_id || !classId) return;
      const teacher_id = currentUser?.id;
      
      try {
        let response;
        if (currentUser?.roleName == "Teacher") {
          response = await fetch(
            `${DOMAIN}/api/staff/get-allteachersections/${school_id}/${teacher_id}/${classId}`
          );
        } else {
          response = await fetch(
            `${DOMAIN}/api/staff/get-allsections/${school_id}/${classId}`
          );
        }
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Section[] = await response.json();
        setSections(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSections();
  }, [school_id, classId]);


  const handleCheckSubjects = (classId: string | undefined, sectionId: string | null, class_section_id: string | null) => {
    const queryParams = new URLSearchParams({
      class_section_id: class_section_id || '',
      class_id: classId || '',
      section_id: sectionId || '',
    }).toString();
    if (isAssignment) {
      Navigate(`/lms-Assigmnent-management/select-subjects?${queryParams}`);
    } else {
      Navigate(`/lms-course-management/select-subjects?${queryParams}`);
    }
   
  };

  const handleCheckMaterials = (classId: string | null, sectionId: string | null, subjectId = '', lessonId = '', topicId = '') => {
    const queryParams = new URLSearchParams({
      class_id: classId || '',
      section_id: sectionId || '',
      subject_id: subjectId,
      lesson_id: lessonId,
      topic_id: topicId,
    }).toString();
    if (isAssignment) {
      Navigate(`/lms-Assigmnent-management/assignment-wise?${queryParams}`);
    } else {
      Navigate(`/lms-course-management/material-wise?${queryParams}`);
    }
  };


  return (
    <div className="">
      <HeaderWrapper toggleView={() => {}} />

      <Content>
        <div className="container">
        <div className="row">
          {getSections.map((cls) => (
            <div className="col-md-4" key={cls.id}>
              <div className="card mb-4">
                <div className="card-body" style={{background:'#F2F4F5'}}>
                  <h5 className="card-title" style={{ fontSize: "26px",
                    fontWeight: "700",
                    lineHeight: "21.86px",
                    color: "#424242",
                    fontFamily:'Manrope',
                    marginBottom:'20px'}}>Section {cls.section}</h5>
                  
                  <div style={{display:'flex',gap:'10px'}}>
                  <button
                    onClick={() => handleCheckMaterials(classId, cls.id)}
                    className="btn border border-black"
                  >
                      {isAssignment ? "Check Assignments" : "Check Materials"}
                  </button>
                  <button
                    onClick={() => handleCheckSubjects(classId,cls.id,cls.class_section_id,)}
                    className="btn btn-success"
                  >
                    Go to Subjects
                  </button>
                  </div>
                  {/* <button
                    onClick={() => handleClick(cls.id)}
                    className="btn btn-primary"
                  >
                    View More
                  </button> */}
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
