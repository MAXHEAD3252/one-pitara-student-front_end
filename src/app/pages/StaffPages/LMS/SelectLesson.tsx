import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { PageTitle } from "../../../../_metronic/layout/core";
import { Content } from "../../../../_metronic/layout/components/content";
import { TablesWidget28 } from "../../../../_metronic/partials/widgets/tables/TablesWidget28";
import { HeaderWrapper } from "../../../../_metronic/layout/components/header_staff";
import { DOMAIN } from "../../../routing/ApiEndpoints";
import { useAuth } from "../../../modules/auth/core/Auth";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

interface Lesson {
  lesson_id: string;
  lesson_name: string;
  class_section_subject_lesson_id: string;
  // add other properties if needed
}

const SelectLessonPage: FC = () => {
  const isAssignment = window.location.pathname.includes('lms-Assigmnent-management');
  const query = useQuery();
  const class_id = query.get("class_id");
  const sectionId = query.get("section_id");
  const subject_id = query.get("subject_id");
  const css_id = query.get("css_id");

  const { currentUser } = useAuth();
  const Navigate = useNavigate();
  const school_id = (currentUser as any)?.school_id;
  const [getLessons, setLessons] = useState<Lesson[]>([]);
  
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/api/staff/get-alllessons/${css_id}/${school_id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setLessons(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLessons();
  }, [css_id, school_id]);


  const handleCheckLessons = (classId : string | null ,sectionId: string | null ,subjectId : string | null ,lessonId : string | null,class_section_subject_lesson_id : string | null) => { 
    const queryParams = new URLSearchParams({
      class_id: classId || '',
      section_id: sectionId || '',
      subject_id:subjectId || '',
      lesson_id:lessonId || '',
      css_id:class_section_subject_lesson_id || ''
    }).toString();
    if (isAssignment) {
      Navigate(`/lms-Assigmnent-management/select-topics?${queryParams}`);
    } else {
      Navigate(`/lms-course-management/select-topics?${queryParams}`);
    }
    
  };
  const handleCheckMaterials = (classId : string | null, sectionId: string | null, subjectId: string | null, lessonId: string | null, topicId = '') => {
    const queryParams = new URLSearchParams({
      class_id: classId || '',
      section_id: sectionId || '',
      subject_id: subjectId || '',
      lesson_id: lessonId || '',
      topic_id: topicId,
    }).toString();  
    if (isAssignment) {
      Navigate(`/lms-Assigmnent-management/assignment-wise?${queryParams}`);
    } else {
      Navigate(`/lms-course-management/material-wise?${queryParams}`);
    }
  };

  // const handleClick = (value) => {
  //   Navigate(`/select-topics/${css_id}`)
  //   // fetchSections(value);
  // };

  return (
    <div className="">
      <HeaderWrapper toggleView={() => {}} />

      <Content>
        <div className="container">
          <div className="row">
            {getLessons.map((cls) => (
              <div className="col-md-12" key={cls.lesson_id}>
                <div className="card mb-4">
                  <div className="card-body" style={{ background: "#F2F4F5" }}>
                    <h5
                      className="card-title"
                      style={{
                        fontSize: "26px",
                        fontWeight: "700",
                        lineHeight: "21.86px",
                        color: "#424242",
                        fontFamily: "Manrope",
                        marginBottom:'20px'
                      }}
                    >
                      {cls.lesson_name}
                    </h5>
                    <button
                      onClick={() => handleCheckMaterials(class_id,sectionId,subject_id,cls.lesson_id)}
                      className="btn border border-black m-2"
                    >
                      {isAssignment ? "Check Assignments" : "Check Materials"}
                    </button>
                    <button
                      onClick={() =>
                        handleCheckLessons(class_id,sectionId,subject_id,cls.lesson_id,cls.class_section_subject_lesson_id)
                      }
                      className="btn btn-success"
                    >
                      Go to Topics
                    </button>
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

const SelectLesson: FC = () => {
  const intl = useIntl();

  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.HOMEWORK" })}
      </PageTitle>

      <SelectLessonPage />
    </>
  );
};

export { SelectLesson };
