/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { PageTitle } from "../../../../_metronic/layout/core";
import { Content } from "../../../../_metronic/layout/components/content";
import { HeaderWrapper } from "../../../../_metronic/layout/components/header_staff";
import { DOMAIN } from "../../../routing/ApiEndpoints";
import { useAuth } from "../../../modules/auth/core/Auth";
import { useLocation, useNavigate } from "react-router-dom";


const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

interface Subject {
  subject_id: string;
  subject_name: string;
  class_section_subject_id: string;
  // add other properties if needed
}


const SelectSubjectPage: FC = () => {
  const isAssignment = window.location.pathname.includes('lms-Assigmnent-management');

  const query = useQuery();
  const class_id = query.get('class_id');
  const sectionId = query.get('section_id');
  const class_section_id = query.get('class_section_id');
  


  const { currentUser } = useAuth();
  const Navigate = useNavigate();
                        /* @ts-ignore */

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const school_id = (currentUser as any)?.school_id;
  const [getSubjects, setSubjects] = useState<Subject[]>([]);
  
useEffect(()=>{
  const fetchSubjects = async () => {
                          /* @ts-ignore */

     const teacher_id = currentUser?.id;
    try {
      let response;
      if (currentUser?.roleName == "Teacher") {
        response = await fetch(
          `${DOMAIN}/api/school/get-allteachersubjects/${school_id}/${teacher_id}/${class_section_id}`
        );
      } else {
        response = await fetch(
          `${DOMAIN}/api/school/get-allsubjects/${class_section_id}/${school_id}`
        );
      }
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
},[class_section_id,school_id])


const handleCheckLessons = ( classId: string | null,sectionId: string | null,subjectId: string | null,class_section_subject_id: string | null) => {
  const queryParams = new URLSearchParams({
    class_id: classId || '',
    section_id: sectionId || '',
    subject_id:subjectId || '',
    css_id:class_section_subject_id || ''
  }).toString();
  if (isAssignment) {
    Navigate(`/lms-Assigmnent-management/select-lessons?${queryParams}`);
  } else {
    Navigate(`/lms-course-management/select-lessons?${queryParams}`);
  }
};  
const handleCheckMaterials = (classId: string | null, sectionId: string | null, subjectId: string | null, lessonId = '', topicId = '') => {
  const queryParams = new URLSearchParams({
    class_id: classId || '',
    section_id: sectionId || '',
    subject_id: subjectId || '',
    lesson_id: lessonId,
    topic_id: topicId ,
  }).toString();
  
  if (isAssignment) {
    Navigate(`/lms-Assigmnent-management/assignment-wise?${queryParams}`);
  } else {
    Navigate(`/lms-course-management/material-wise?${queryParams}`);
  }
 
};

  // const handleClick = (value) => {
  //   const css_id = value;
    
  //   Navigate(`/select-lessons/${css_id}`)
  // };




  return (
    <div className="">
      <HeaderWrapper toggleView={() => {}} />

      <Content>
        <div className="container">
        <div className="row">
          {getSubjects.map((cls) => (
            <div className="col-md-12" key={cls.subject_id
            }>
              <div className="card mb-4">
                <div className="card-body" style={{background:'#F2F4F5'}}>
                  <h5 className="card-title" style={{ fontSize: "26px",
                    fontWeight: "700",
                    lineHeight: "21.86px",
                    color: "#424242",
                    fontFamily:'Manrope',
                    marginBottom:'20px'}}>{cls.subject_name}</h5>
                  
                  <button
                    onClick={() => handleCheckMaterials(class_id,sectionId,cls.subject_id
                    )}
                    className="btn border border-black m-2"
                  >
                    {isAssignment ? "Check Assignments" : "Check Materials"}
                  </button>
                  <button
                    onClick={() => handleCheckLessons(class_id,sectionId,cls.subject_id,cls.class_section_subject_id)}
                    className="btn btn-success"
                  >
                    Go to Lessons
                  </button>
                  {/* <button
                    onClick={() => handleClick(cls.class_section_subject_id)}
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

export default SelectSubject;
