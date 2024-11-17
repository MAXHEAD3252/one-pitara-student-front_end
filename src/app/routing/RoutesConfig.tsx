/* eslint-disable @typescript-eslint/no-unused-vars */
// routesConfig.js

import { DashboardWrapper } from "../pages/dashboard/DashboardWrapper";
// import { MenuTestPage } from "../pages/MenuTestPage";
// import { BuilderPageWrapper } from "../pages/layout-builder/BuilderPageWrapper";
// import { FeeDetails } from "../pages/StaffPages/FinancialManagement/FeeDetails";
// import { LeadGeneration } from "../pages/StaffPages/LeadGeneration/LeadGeneration";
// import { ViewFeeMaster } from "../pages/StaffPages/FinancialManagement/ViewFeeMaster";
// import { Income } from "../pages/StaffPages/IncomeExpenseDash/Income";
// import UserAdminPage from "../modules/user-userRoles/UserAdminPage";
// import { StuTimeTable } from "../pages/StudentPages/StuClassSchedule/StuTimeTable";
// import { StuFees } from "../pages/StudentPages/StuFees";
// import { StuHomeWork } from "../pages/StudentPages/StuHomework/StuHomeWork";
// import { StuApplyLeave } from "../pages/StudentPages/StuApplyLeave";
// import { StuNoticeBoard } from "../pages/StudentPages/StuNoticeBoard";
// import StuAttendance from "../pages/StudentPages/StuAttendance";
// import { StuSyllabusStatus } from "../pages/StudentPages/StuSyllabusStatus";
// import StuAssignments from "../pages/StudentPages/StuAssignments";
// import StuBookIssued from "../pages/StudentPages/StuBookIssued";
// import StuBooks from "../pages/StudentPages/StuBooks";
// import StuExamResult from "../pages/StudentPages/StuExamResult";
// import StuHostelRoom from "../pages/StudentPages/StuHostelRoom";
// import StuLessonPlan from "../pageCourseContentManagements/StudentPages/StuLessonPlan";
// import StuOnlineExam from "../pages/StudentPages/StuOnlineExam";
// import StuOtherDownload from "../pages/StudentPages/StuOtherDownload";
// import StuStudyMaterial from "../pages/StudentPages/StuStudyMaterial";
// import StuSyllabus from "../pages/StudentPages/StuSyllabus";
// import StuTransportRoute from "../pages/StudentPages/StuTransportRoute";
// import StuExamSchedule from "../pages/StudentPages/StuExamSchedule";
// import  EnquiryReport  from "../pages/StaffPages/AnalyticsAndReporting/EnquiryReport";
// import { Admissions } from "../pages/StaffPages/Admission/Admissions";
// import { ManageAdmins } from "../pages/SuperAdminPages/ManageAdmins";
// import { ManageSchools } from "../pages/SuperAdminPages/ManageSchools";
// import  ManageModules  from "../pages/SuperAdminPages/ManageSchools";
// import  UserRoles  from "../pages/StaffPages/SystemSettings/UserRoles";
// import  UserRolesPermission  from "../pages/StaffPages/SystemSettings/UserRolesPermission";
// import { Staff } from "../pages/StaffPages/User.tsx/Staff";
// import { Student } from "../pages/StaffPages/User.tsx/Student";
// import { Expense } from "../pages/StaffPages/Expense/Expense";
// import { StudentDetails } from "../pages/StaffPages/Student_Information/StudentDetails";
// import  StudentProfiles  from "../pages/StaffPages/StudentManagement/StudentProfiles";
// import  LMSDashboard  from "../pages/StaffPages/LearningManagementSystem/LMSDashboard";
// import  CourseContentManagement from "../pages/StaffPages/LearningManagementSystem/CourseContentManagement";
// import  SelectSections  from "../pages/StaffPages/LearningManagementSystem/SelectSections";
// import  SelectSubject  from "../pages/StaffPages/LearningManagementSystem/SelectSubject";
// import { SelectLesson } from "../pages/StaffPages/LearningManagementSystem/SelectLesson";
// import ClassWiseMaterial from "../pages/StaffPages/LearningManagementSystem/ClassWiseMaterial";
// import { SelectTopic } from "../pages/StaffPages/LearningManagementSystem/SelectTopic";
// import { AssignmentsManagement } from "../pages/StaffPages/LearningManagementSystem/AssignmentsManagement";
// import CheckAssignments from "../pages/StaffPages/LearningManagementSystem/CheckAssignments";
import { Assignments } from "../pages/StudentPages/Lms/Assignments";
import { CourseContent } from "../pages/StudentPages/Lms/CourseContent";
import { StudenLessons } from "../pages/StudentPages/Lms/StudentLessons";
import { StudenTopics } from "../pages/StudentPages/Lms/StudentTopics";
import { StudenTopicMaterial } from "../pages/StudentPages/Lms/StudentTopicMaterial";
import { Sidebar } from "../../_metronic/layout/components/sidebar";
import path from "path";
import { StuFees } from "../pages/StudentPages/StuFees";
import { StudentFeeCollect } from "../pages/StudentPages/StudentFeeCollect";
// import { Class } from "../pages/StaffPages/AcademicManagement/Class";
// import { Section } from "../pages/StaffPages/AcademicManagement/Section";
// import { Subject } from "../pages/StaffPages/AcademicManagement/Subject";
// import { ClassroomResource } from "../pages/StaffPages/AcademicManagement/ClassroomResource";
// import { ClassTimetable } from "../pages/StaffPages/AcademicManagement/ClassTimetable";
// import { PromoteStudent } from "../pages/StaffPages/AcademicManagement/PromoteStudent";
// import { SchoolProfile  from "../pages/SuperAdminPages/SchoolProfile";
// import { ManageRoles } from "../pages/SuperAdminPages/ManageRoles";
// import { OnboardingRequest } from "../pages/SuperAdminPages/OnboradingRequest";
// import { ClassSchedule } from "../pages/StaffPages/AcademicManagement/ClassSchedule";
// import { TeachersTimetable } from "../pages/StaffPages/AcademicManagement/TeachersTimetable";
// import { AssignTeacher } from "../pages/StaffPages/AcademicManagement/AssignTeacher";
// import { SubjectGroup } from "../pages/StaffPages/AcademicManagement/SubjectGroup";
// import { GradingSystem } from "../pages/StaffPages/AcademicManagement/GradingSystem";
// import { SolpReports } from "../pages/StaffPages/AcademicManagement/SolpReports";
// import  VisitorManagement  from "../pages/StaffPages/FrontOffice/VisitorManagement";
// import  PhoneCallLog  from "../pages/StaffPages/FrontOffice/PhoneCallLog";
// import  MailAndDispatchManagement  from "../pages/StaffPages/FrontOffice/MailAndDispatchManagement";
// import { DisableStudent } from "../pages/StaffPages/StudentManagement/DisableStudent";
// import  EmployeeManagement  from "../pages/StaffPages/HumanResource/EmployeeManagement";
// import  EnquiryManagement  from "../pages/StaffPages/FrontOffice/EnquiryManagement";
// import { AdmissionEnquiry } from "../pages/StaffPages/AdmissionsAndEnrollment/AdmissionEnquiry";
// import { ApplicationReview } from "../pages/StaffPages/AdmissionsAndEnrollment/ApplicationReview";
// import { AdmissionFees } from "../pages/StaffPages/FinancialManagement/Fee Collect/AdmissionFees";
// import { FeeType } from "../pages/StaffPages/FinancialManagement/FeeType";
// import { FeeGroup } from "../pages/StaffPages/FinancialManagement/FeeGroup";
// import { CollectFees } from "../pages/StaffPages/FinancialManagement/Fee Collect/CollectFees";
// import { AssignedStudent } from "../pages/StaffPages/FinancialManagement/Fee Collect/AssignedStudent";
// import ManageSubscriptions from "../pages/SuperAdminPages/ManageSubscriptions";
// import AssignSubscriptions from "../pages/SuperAdminPages/AssignSubscriptions";
// import ManageSchools from "../pages/SuperAdminPages/ManageSchools";
// import {CourseContent} from "../pages/StudentPages/CourseContent";

export const routesConfig = {
  dashboard: [
    { path: "/", component: DashboardWrapper, sidebarName: "Dashboard" },
    // {
    //   path: "/assignments",
    //   component: Assignments,
    //   sidebarName: "Assignments",
    // },
    // {
    //   path: "/course-content",
    //   component: CourseContent,
    //   sidebarName: "Course Content",
    // },
    // {
    //   path: "/course-content/lessons",
    //   component: StudenLessons,
    // },
    // {
    //   path: "/course-content/topics",
    //   component: StudenTopics,
    // },
    // {
    //   path: "/course-content/topicuploads",
    //   component: StudenTopicMaterial,
    // },
  ],
  Fee: [
    {path: '/student-fee-collect', component: StuFees},
    {path: '/student-fee', component: StudentFeeCollect,sidebarName: 'Fee Payments'}
  ]
};
