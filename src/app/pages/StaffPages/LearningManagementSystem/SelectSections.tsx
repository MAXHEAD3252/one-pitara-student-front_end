import React, { FC, useEffect, useState } from "react";
import { Content } from "../../../../_metronic/layout/components/content";
import { HeaderWrapper } from "../../../../_metronic/layout/components/header_staff";
import { DOMAIN } from "../../../routing/ApiEndpoints";
import { useAuth } from "../../../modules/auth/core/Auth";
import { useNavigate, useParams } from "react-router-dom";

interface Section {
  id: string;
  section: string;
  class_section_id: string;
  // Add other properties if needed
}

const SelectSections: FC = () => {
  const isAssignment = window.location.pathname.includes('lms-Assigmnent-management');
  const { currentUser } = useAuth();
  const Navigate = useNavigate();
  const { classId } = useParams<{ classId: string }>();
  const school_id = currentUser?.school_id;
  const [getSections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    const fetchSections = async () => {
      if (!school_id || !classId) return;
                            /* @ts-ignore */

      const teacher_id = currentUser?.id;
      
      try {
        let response;
        if (currentUser?.roleName === "Teacher") {
          response = await fetch(
            `${DOMAIN}/api/school/get-allteachersections/${school_id}/${teacher_id}/${classId}`
          );
        } else {
          response = await fetch(
            `${DOMAIN}/api/school/get-allsections/${school_id}/${classId}`
          );
        }
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Section[] = await response.json();
        setSections(data);
      } catch (error) {
        console.log("Error fetching sections:", error);
      }
    };

    fetchSections();
  }, [school_id, classId, currentUser]);

  const handleCheckSubjects = (classId: string, sectionId: string, class_section_id: string) => {
    const queryParams = new URLSearchParams({
      class_section_id: class_section_id || '',
      class_id: classId,
      section_id: sectionId,
    }).toString();
    if (isAssignment) {
      Navigate(`/lms-Assigmnent-management/select-subjects?${queryParams}`);
    } else {
      Navigate(`/lms-course-management/select-subjects?${queryParams}`);
    }
  };

  const handleCheckMaterials = (classId: string, sectionId: string) => {
    const queryParams = new URLSearchParams({
      class_id: classId,
      section_id: sectionId,
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
            {getSections.map((section) => (
              <div className="col-md-4" key={section.id}>
                <div className="card mb-4">
                  <div className="card-body" style={{ background: '#F2F4F5' }}>
                    <h5 className="card-title" style={{ fontSize: "26px", fontWeight: "700", lineHeight: "21.86px", color: "#424242", fontFamily: 'Manrope', marginBottom: '20px' }}>
                      Section {section.section}
                    </h5>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                                            /* @ts-ignore */

                        onClick={() => handleCheckMaterials(classId, section.id)}
                        className="btn border border-black"
                      >
                        {isAssignment ? "Check Assignments" : "Check Materials"}
                      </button>
                      <button
                                            /* @ts-ignore */

                        onClick={() => handleCheckSubjects(classId, section.id, section.class_section_id)}
                        className="btn btn-success"
                      >
                        Go to Subjects
                      </button>
                    </div>
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

export default SelectSections;
