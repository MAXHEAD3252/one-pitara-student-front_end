// routesConfig.js

import { DashboardWrapper } from "../pages/dashboard/DashboardWrapper";
import { MenuTestPage } from "../pages/MenuTestPage";
import { BuilderPageWrapper } from "../pages/layout-builder/BuilderPageWrapper";
import { FeeDetails } from "../pages/StaffPages/FeeDetails/FeeDetails";
import { LeadGeneration } from "../pages/StaffPages/LeadGeneration/LeadGeneration";
import { ViewFeeMaster } from "../pages/StaffPages/FeeDetails/ViewFeeMaster";
import { Income } from "../pages/StaffPages/IncomeExpenseDash/Income";
import { DashboardStudent } from "../pages/dashboard/DashboardStudent";
import UserAdminPage from "../modules/user-userRoles/UserAdminPage";
import { StuTimeTable } from "../pages/StudentPages/StuClassSchedule/StuTimeTable";
import { StuFees } from "../pages/StudentPages/StuFees";
import { StuHomeWork } from "../pages/StudentPages/StuHomework/StuHomeWork";
import { StuApplyLeave } from "../pages/StudentPages/StuApplyLeave";
import { StuNoticeBoard } from "../pages/StudentPages/StuNoticeBoard";
import StuAttendance from "../pages/StudentPages/StuAttendance";
import { StuSyllabusStatus } from "../pages/StudentPages/StuSyllabusStatus";
import StuAssignments from "../pages/StudentPages/StuAssignments";
import StuBookIssued from "../pages/StudentPages/StuBookIssued";
import StuBooks from "../pages/StudentPages/StuBooks";
import StuExamResult from "../pages/StudentPages/StuExamResult";
import StuHostelRoom from "../pages/StudentPages/StuHostelRoom";
import StuLessonPlan from "../pages/StudentPages/StuLessonPlan";
import StuOnlineExam from "../pages/StudentPages/StuOnlineExam";
import StuOtherDownload from "../pages/StudentPages/StuOtherDownload";
import StuStudyMaterial from "../pages/StudentPages/StuStudyMaterial";
import StuSyllabus from "../pages/StudentPages/StuSyllabus";
import StuTransportRoute from "../pages/StudentPages/StuTransportRoute";
import StuExamSchedule from "../pages/StudentPages/StuExamSchedule";
import { Enquiry } from "../pages/StaffPages/Enquiry/Enquiry";
import { Admissions } from "../pages/StaffPages/Admission/Admissions";
import { DashboardDexpert } from "../pages/dashboard/DexpertDashboard";
import { ManageAdmins } from "../pages/SuperAdminPages/ManageAdmins";
import { ManageSchools } from "../pages/SuperAdminPages/ManageSchools";
import { ManageModules } from "../pages/SuperAdminPages/ManageModules";
import { UserRoles } from "../pages/StaffPages/UserRoles/UserRoles";
import { UserRolesPermission } from "../pages/StaffPages/UserRoles/UserRolesPermission";
import { Staff } from "../pages/StaffPages/User.tsx/Staff";
import { Student } from "../pages/StaffPages/User.tsx/Student";
import { Expense } from "../pages/StaffPages/Expense/Expense";
import { EnquiryDetails } from "../pages/StaffPages/Enquiry/EnquiryDetails";
import { StudentDetails } from "../pages/StaffPages/Student_Information/StudentDetails";
import { StudentProfiles } from "../pages/StaffPages/Student_Managment/StudentProfiles";
import {LMSDashboard} from "../pages/StaffPages/LMS/LMSDashboard";
import { CourseContentManagement } from "../pages/StaffPages/LMS/CourseContentManagement/CourseContentManagement";
import {SelectSections} from "../pages/StaffPages/LMS/CourseContentManagement/SelectSections";
import {SelectSubject} from "../pages/StaffPages/LMS/CourseContentManagement/SelectSubject";

export const routesConfig = {
  principal: [
    {
      path: "/school-overview",
      component: DashboardWrapper,
      sidebarName: "School Overview",
    },
    {
      path: "/staff-attendance",
      component: DashboardWrapper,
      sidebarName: "Staff Attendance",
    },
    {
      path: "/student-attendance",
      component: DashboardWrapper,
      sidebarName: "Student Attendance",
    },
    {
      path: "/announcements",
      component: DashboardWrapper,
      sidebarName: "Announcements",
    },
    { path: "/reports", component: DashboardWrapper, sidebarName: "Reports" },
    { path: "/events", component: DashboardWrapper, sidebarName: "Events" },
  ],
  vicePrincipal: [
    {
      path: "/disciplinary-records",
      component: DashboardWrapper,
      sidebarName: "Disciplinary Records",
    },
    {
      path: "/staff-performance",
      component: DashboardWrapper,
      sidebarName: "Staff Performance",
    },
    {
      path: "/substitute-management",
      component: DashboardWrapper,
      sidebarName: "Substitute Management",
    },
    {
      path: "/student-analytics",
      component: DashboardWrapper,
      sidebarName: "Student Analytics",
    },
    { path: "/events", component: DashboardWrapper, sidebarName: "Events" },
  ],
  schoolBoardMember: [
    {
      path: "/school-performance",
      component: DashboardWrapper,
      sidebarName: "School Performance",
    },
    {
      path: "/board-meetings",
      component: DashboardWrapper,
      sidebarName: "Board Meetings",
    },
    {
      path: "/strategic-reports",
      component: DashboardWrapper,
      sidebarName: "Strategic Reports",
    },
    {
      path: "/discussions",
      component: DashboardWrapper,
      sidebarName: "Discussions",
    },
  ],
  administrativeStaff: [
    {
      path: "/school-records",
      component: DashboardWrapper,
      sidebarName: "School Records",
    },
    {
      path: "/data-entry",
      component: DashboardWrapper,
      sidebarName: "Data Entry",
    },
    {
      path: "/schedules",
      component: DashboardWrapper,
      sidebarName: "Schedules",
    },
    {
      path: "/communication-tools",
      component: DashboardWrapper,
      sidebarName: "Communication Tools",
    },
  ],
  teacher: [
    {
      path: "/gradebook",
      component: DashboardWrapper,
      sidebarName: "Gradebook",
    },
    {
      path: "/attendance-management",
      component: DashboardWrapper,
      sidebarName: "Attendance Management",
    },
    {
      path: "/lesson-planning",
      component: DashboardWrapper,
      sidebarName: "Lesson Planning",
    },
    {
      path: "/resource-sharing",
      component: DashboardWrapper,
      sidebarName: "Resource Sharing",
    },
    {
      path: "/student-analytics",
      component: DashboardWrapper,
      sidebarName: "Student Analytics",
    },
    {
      path: "/communication-tools",
      component: DashboardWrapper,
      sidebarName: "Communication Tools",
    },
  ],
  student: [
    {
      path: "/student/dashboard",
      component: DashboardStudent,
      sidebarName: "Dashboard",
    },
    {
      path: "/student/apply-leave",
      component: StuApplyLeave,
      sidebarName: "Apply Leave",
    },
    {
      path: "/student/assignments",
      component: StuAssignments,
      sidebarName: "Assignments",
    },
  ],
  staff: [
    { path: "/", component: DashboardWrapper, sidebarName: "Dashboard" },
    {
      path: "/dashboard",
      component: DashboardWrapper,
      sidebarName: "Dashboard",
    },
    {
      path: "/enquiry-details",
      component: EnquiryDetails,
      sidebarName: "Inquiry Management",
    },
  ],

  //     Principal
  // Vice Principal
  // School Board Member
  // Administrative Staff
  // Teacher
  // Department Head
  // Librarian
  // Academic Coordinator
  // Counselor
  // Nurse
  // Teaching Assistant
  // IT Support Staff
  // Office Staff
  // Registrar
  //    
  // Accountant
  // Maintenance Worker
  // Security Personnel
  // Student
  // Parent/Guardian
  // Extracurricular Coordinator
  // Alumni
  // Vendor/Service Provider

  admin: [
    {
      path: "/",
      component: DashboardWrapper,
      sidebarName: "Dashboard",
    },
    {
      path: "/dashboard",
      component: DashboardWrapper,
      sidebarName: "Dashboard",
    },
    {
      path: "/enquiry-details",
      component: EnquiryDetails,
      sidebarName: "Inquiry Management",
    },
    {
      path: "/student-profile",
      component: StudentProfiles,
      sidebarName: "Student Profiles",
    },
    {
      path: "/lms-dashboard",
      component: LMSDashboard,
      sidebarName: "LMS Dashboard",
    },
    {
      path: "/lms-course-management",
      component: CourseContentManagement,
      sidebarName: "Course Content Management",
    },
    {
      path: "/select-sections/:classId",
      component: SelectSections,
    },
    {
      path: "/select-subjects/:classId/:section_id",
      component: SelectSubject,
    },
    {
      path: "/select-Topics",
      // component: SelectSections,
    },
    {
      path: "/upload-center",
      // component: SelectSections,
    },
    {
      path: "/view-topics",
      component: CourseContentManagement,
    },
    {
      path: "/user-roles",
      component: UserRoles,
      sidebarName: "User Roles",
    },
    {
      path: "/users-staff",
      component: Staff,
      sidebarName: "Staff",
    },
    {
      path: "/users-student",
      component: Student,
      sidebarName: "Student",
    },
    {
      path: "/user-roles/permission",
      component: UserRolesPermission,
      sidebarName: "User Roles Permission",
    },
    {
      path: "/fee-&-payments",
      component: FeeDetails,
      sidebarName: "Fees Master",
    },
    {
      path: "/lead-generation",
      component: LeadGeneration,
      sidebarName: "Lead Generation",
    },
    {
      path: "/fee-&-payments/view-fee-master",
      component: ViewFeeMaster,
      sidebarName: "View Fee Master",
    },
    {
      path: "/income",
      component: Income,
      sidebarName: "Income",
    },
    {
      path: "/enquiry",
      component: Enquiry,
      sidebarName: "Admission Enquiry",
    },
    {
      path: "/admissions",
      component: Admissions,
      sidebarName: "Admission Report",
    },
    {
      path: "/expense",
      component: Expense,
      sidebarName: "Expense",
    },
  ],
  superadmin: [
    { path: "/", component: DashboardDexpert, sidebarName: "Dashboard" },
    {
      path: "/dashboard",
      component: DashboardDexpert,
      sidebarName: "Dashboard",
    },
    {
      path: "/superadmin/manage/admins",
      component: ManageAdmins,
      sidebarName: "Schools Admins",
    },
    {
      path: "/superadmin/manage/schools",
      component: ManageSchools,
      sidebarName: "Schools",
    },
    {
      path: "/superadmin/manage/modules",
      component: ManageModules,
      sidebarName: "Schools Modules",
    },
  ],

  DepartmentHead: [
    { path: "/", component: DashboardWrapper, sidebarName: "Dashboard" },
    {
      path: "/dashboard",
      component: DashboardWrapper,
      sidebarName: "Dashboard",
    },
  ],

  Librarian: [
    { path: "/", component: DashboardWrapper, sidebarName: "Dashboard" },
    {
      path: "/dashboard",
      component: DashboardWrapper,
      sidebarName: "Dashboard",
    },
  ],

  AcademicCoordinator: [
    { path: "/", component: DashboardWrapper, sidebarName: "Dashboard" },
    {
      path: "/dashboard",
      component: DashboardWrapper,
      sidebarName: "Dashboard",
    },
  ],
  Counselor: [
    { path: "/", component: DashboardWrapper, sidebarName: "Dashboard" },
    {
      path: "/dashboard",
      component: DashboardWrapper,
      sidebarName: "Dashboard",
    },
  ],
  Nurse: [
    { path: "/", component: DashboardWrapper, sidebarName: "Dashboard" },
    {
      path: "/dashboard",
      component: DashboardWrapper,
      sidebarName: "Dashboard",
    },
  ],

  TeachingAssistant: [
    { path: "/", component: DashboardWrapper, sidebarName: "Dashboard" },
    {
      path: "/dashboard",
      component: DashboardWrapper,
      sidebarName: "Dashboard",
    },
  ],
  ITSupportStafft: [
    { path: "/", component: DashboardWrapper, sidebarName: "Dashboard" },
    {
      path: "/dashboard",
      component: DashboardWrapper,
      sidebarName: "Dashboard",
    },
  ],
  OfficeStaff: [
    { path: "/", component: DashboardWrapper, sidebarName: "Dashboard" },
    {
      path: "/dashboard",
      component: DashboardWrapper,
      sidebarName: "Dashboard",
    },
  ],
  Registrar: [
    { path: "/", component: DashboardWrapper, sidebarName: "Dashboard" },
    {
      path: "/dashboard",
      component: DashboardWrapper,
      sidebarName: "Dashboard",
    },
  ],
  AdmissionsOfficer: [
    { path: "/", component: DashboardWrapper, sidebarName: "Dashboard" },
    {
      path: "/dashboard",
      component: DashboardWrapper,
      sidebarName: "Dashboard",
    },
  ],
  Accountant: [
    { path: "/", component: DashboardWrapper, sidebarName: "Dashboard" },
    {
      path: "/dashboard",
      component: DashboardWrapper,
      sidebarName: "Dashboard",
    },
  ],
  MaintenanceWorker: [
    { path: "/", component: DashboardWrapper, sidebarName: "Dashboard" },
    {
      path: "/dashboard",
      component: DashboardWrapper,
      sidebarName: "Dashboard",
    },
  ],
  SecurityPersonnel: [
    { path: "/", component: DashboardWrapper, sidebarName: "Dashboard" },
    {
      path: "/dashboard",
      component: DashboardWrapper,
      sidebarName: "Dashboard",
    },
  ],
  Parent: [
    { path: "/", component: DashboardWrapper, sidebarName: "Dashboard" },
    {
      path: "/dashboard",
      component: DashboardWrapper,
      sidebarName: "Dashboard",
    },
  ],
  ExtracurricularCoordinator: [
    { path: "/", component: DashboardWrapper, sidebarName: "Dashboard" },
    {
      path: "/dashboard",
      component: DashboardWrapper,
      sidebarName: "Dashboard",
    },
  ],
  Alumni: [
    { path: "/", component: DashboardWrapper, sidebarName: "Dashboard" },
    {
      path: "/dashboard",
      component: DashboardWrapper,
      sidebarName: "Dashboard",
    },
  ],
  Vendor: [
    { path: "/", component: DashboardWrapper, sidebarName: "Dashboard" },
    {
      path: "/dashboard",
      component: DashboardWrapper,
      sidebarName: "Dashboard",
    },
  ],
};
