// import { lazy, FC, Suspense } from "react";
// import { Route, Routes, Navigate } from "react-router-dom";
// import { MasterLayout } from "../../_metronic/layout/MasterLayout";
// import TopBarProgress from "react-topbar-progress-indicator";
// import { DashboardWrapper } from "../pages/dashboard/DashboardWrapper";
// import { MenuTestPage } from "../pages/MenuTestPage";
// import { getCSSVariableValue } from "../../_metronic/assets/ts/_utils";
// import { WithChildren } from "../../_metronic/helpers";
// import BuilderPageWrapper from "../pages/layout-builder/BuilderPageWrapper";
// import { FeeDetails } from "../pages/StaffPages/FeeDetails/FeeDetails";
// import { LeadGeneration } from "../pages/StaffPages/LeadGeneration/LeadGeneration";
// import { ViewFeeMaster } from "../pages/StaffPages/FeeDetails/ViewFeeMaster";
// import { Income } from "../pages/StaffPages/IncomeExpenseDash/Income";
// import { DashboardStudent } from "../pages/dashboard/DashboardStudent";
// import { useAuth } from "../../app/modules/auth/core/Auth";
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
// import StuLessonPlan from "../pages/StudentPages/StuLessonPlan";
// import StuOnlineExam from "../pages/StudentPages/StuOnlineExam";
// import StuOtherDownload from "../pages/StudentPages/StuOtherDownload";
// import StuStudyMaterial from "../pages/StudentPages/StuStudyMaterial";
// import StuSyllabus from "../pages/StudentPages/StuSyllabus";
// import StuTransportRoute from "../pages/StudentPages/StuTransportRoute";
// import StuExamSchedule from "../pages/StudentPages/StuExamSchedule";
// import { Enquiry } from "../pages/StaffPages/Enquiry/Enquiry";
// import { Admissions } from "../pages/StaffPages/Admission/Admissions";
// import { DashboardDexpert } from "../pages/dashboard/DexpertDashboard";
// import {ManageAdmins}  from "../pages/SuperAdminPages/ManageAdmins.tsx";
// import {ManageSchools}  from "../pages/SuperAdminPages/ManageSchools.tsx";
// import { ManageModules } from "../pages/SuperAdminPages/ManageModules.tsx";
// import { UserRoles } from "../pages/StaffPages/UserRoles/UserRoles.tsx";
// import { UserRolesPermission } from "../pages/StaffPages/UserRoles/UserRolesPermission.tsx";
// import { Staff } from "../pages/StaffPages/User.tsx/Staff.tsx";
// import { Student } from "../pages/StaffPages/User.tsx/Student.tsx";
// import {Expense} from "../pages/StaffPages/Expense/Expense.tsx";
// import { EnquiryDetails } from "../pages/StaffPages/Enquiry/EnquiryDetails.tsx";
// import { StudentDetails } from "../pages/StaffPages/Student_Information/StudentDetails.tsx";

// const PrivateRoutes = () => {
//   const ProfilePage = lazy(() => import("../modules/profile/ProfilePage"));
//   const WizardsPage = lazy(() => import("../modules/wizards/WizardsPage"));
//   const AccountPage = lazy(() => import("../modules/accounts/AccountPage"));
//   const WidgetsPage = lazy(() => import("../modules/widgets/WidgetsPage"));
//   const ChatPage = lazy(() => import("../modules/apps/chat/ChatPage"));
//   const UsersPage = lazy(
//     () => import("../modules/apps/user-management/UsersPage")
//   );
//   const { auth } = useAuth();
//   const userRole = auth?.role;
//   // console.log(auth);

//   const AuthRedirect = () => {

//     let redirectToDashboard;

//     switch (userRole) {
//       case "student":
//         redirectToDashboard = "/student/dashboard";
//         break;
//       case "staff":
//         redirectToDashboard = "/dashboard";
//         break;
//       case "admin":
//         redirectToDashboard = "/dashboard";
//         break;
//       case "superadmin":
//         redirectToDashboard = "/superadmin/dashboard";
//         break;
//       default:
//         redirectToDashboard = "/login"; // Default redirect if role is unknown or not provided
//         break;
//     }

//     return <Navigate to={redirectToDashboard} />;
//   };

//   return (
//     <Routes>
//       <Route element={<MasterLayout />}>
//         {/* Redirect to Dashboard after success login/registartion */}
//         <Route path="auth/*" element={<AuthRedirect />} />
//         {/* Pages */}
//         <Route path="builder" element={<BuilderPageWrapper />} />
//         <Route path="menu-test" element={<MenuTestPage />} />
//         {/*Students Routes */}
//         {userRole === "student" && (
//           <>
//             <Route path="student/dashboard" element={<DashboardStudent />} />
//             <Route path="student/apply-leave" element={<StuApplyLeave />} />
//             <Route path="student/assignments" element={<StuAssignments />} />
//             <Route path="student/attendance" element={<StuAttendance />} />
//             <Route path="student/book-issued" element={<StuBookIssued />} />
//             <Route path="student/books" element={<StuBooks />} />
//             <Route path="student/exam-result" element={<StuExamResult />} />
//             <Route path="student/exam-schedule" element={<StuExamSchedule />} />
//             <Route path="student/fees" element={<StuFees />} />
//             <Route path="student/home-work" element={<StuHomeWork />} />
//             <Route path="student/hostel-room" element={<StuHostelRoom />} />
//             <Route path="student/lesson-plan" element={<StuLessonPlan />} />
//             <Route path="student/notice-board" element={<StuNoticeBoard />} />
//             <Route path="student/online-exam" element={<StuOnlineExam />} />
//             <Route
//               path="student/other-downloads"
//               element={<StuOtherDownload />}
//             />
//             <Route
//               path="student/study-material"
//               element={<StuStudyMaterial />}
//             />
//             <Route path="student/syllabus" element={<StuSyllabus />} />
//             <Route
//               path="student/syllabus-status"
//               element={<StuSyllabusStatus />}
//             />
//             <Route path="student/class-time-table" element={<StuTimeTable />} />
//             <Route
//               path="student/transport-route"
//               element={<StuTransportRoute />}
//             />
//             {/* <Route path="student/teacher-review" element={<StuTransportRoute />} /> */}
//           </>
//         )}
//         {/* Staff Routes */}
//         {userRole === "staff" && (
//           <>
//             <Route path="/" element={<DashboardWrapper />} />
//             <Route path="/dashboard" element={<DashboardWrapper />} />
//             <Route path="/enquiry-details" element={<EnquiryDetails />}></Route>
//             <Route path="/admissions" element={<Admissions />} />
//             <Route path="/student-details" element={<StudentDetails />}></Route>

//           </>
//         )}
//         {userRole === "admin" && <>
//         <Route path="/" element={<DashboardWrapper />} />
//             <Route path="/dashboard" element={<DashboardWrapper />} />
//             <Route path="/user-roles" element={<UserRoles />} />
//             <Route path="/users-staff" element={<Staff />} />
//             <Route path="/users-student" element={<Student />} />
//             <Route path="/user-roles/permission" element={<UserRolesPermission />} />
//             <Route path="/fee-&-payments" element={<FeeDetails />} />
//             <Route path="/lead-generation" element={<LeadGeneration />} />
//             <Route
//               path="/fee-&-payments/view-fee-master"
//               element={<ViewFeeMaster />}
//             />
//             <Route path="/income" element={<Income />} />
//             <Route path="/enquiry" element={<Enquiry />} />
//             <Route path="/admissions" element={<Admissions />} />
//         <Route path="/expense" element={<Expense />} />
//         </>}

//         {userRole === "superadmin" && <>
//         <Route path="superadmin/dashboard" element={<DashboardDexpert />} />
//           <Route path="superadmin/manage/admins" element={<ManageAdmins />} />
//           <Route path="/superadmin/manage/schools" element={<ManageSchools />} />
//           <Route path="/superadmin/manage/modules" element={<ManageModules />} />
//         </>}


//         {/* Lazy Modules */}
//         <Route
//           path="crafted/pages/profile/*"
//           element={
//             <SuspensedView>
//               <ProfilePage />
//             </SuspensedView>
//           }
//         />
//         <Route
//           path="crafted/pages/wizards/*"
//           element={
//             <SuspensedView>
//               <WizardsPage />
//             </SuspensedView>
//           }
//         />
//         <Route
//           path="admin/user-admin/*"
//           element={
//             <SuspensedView>
//               <UserAdminPage />
//             </SuspensedView>
//           }
//         />
//         <Route
//           path="crafted/widgets/*"
//           element={
//             <SuspensedView>
//               <WidgetsPage />
//             </SuspensedView>
//           }
//         />
//         <Route
//           path="crafted/account/*"
//           element={
//             <SuspensedView>
//               <AccountPage />
//             </SuspensedView>
//           }
//         />
//         <Route
//           path="apps/chat/*"
//           element={
//             <SuspensedView>
//               <ChatPage />
//             </SuspensedView>
//           }
//         />
//         <Route
//           path="apps/user-management/*"
//           element={
//             <SuspensedView>
//               <UsersPage />
//             </SuspensedView>
//           }
//         />
//         {/* Page Not Found */}
//         <Route path="*" element={<Navigate to="/error/404" />} />
//       </Route>
//     </Routes>
//   );
// };

// const SuspensedView: FC<WithChildren> = ({ children }) => {
//   const baseColor = getCSSVariableValue("--bs-primary");
//   TopBarProgress.config({
//     barColors: {
//       "0": baseColor,
//     },
//     barThickness: 1,
//     shadowBlur: 5,
//   });
//   return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
// };

// export { PrivateRoutes };
import { Route, Routes, Navigate } from "react-router-dom";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
import { useAuth } from "../../app/modules/auth/core/Auth";
import { useEffect, useState } from "react";
import { routesConfig } from "./RoutesConfig";

interface RouteConfig {
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
}

interface RoutesConfig {
  [key: string]: RouteConfig[];
}

const PrivateRoutes = () => {
  const { currentUser } = useAuth();
  const [userRole, setUserRole] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchUserRole = async () => {
     
  //       setUserRole(currentUser?.role);
  //   };

  //   fetchUserRole();
  // }, [currentUser]);

  
  // const roleRoutes = routesConfig[userRole] || [];
  
  useEffect(() => {
    const fetchUserRole = async () => {
      if (currentUser) {
        if (currentUser.roleName === "Teacher") {
          setUserRole(currentUser.roleName);
        } else {
          setUserRole(currentUser.role || null);
        }
      }
    };

    fetchUserRole();
  }, [currentUser]);

  const roleRoutes = userRole ? (routesConfig as RoutesConfig)[userRole] || [] : [];

  if (!userRole) {
    // If user role is not yet fetched, render nothing
    return null;
  }

  const AuthRedirect = () => <Navigate to="/" />;

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path="auth/*" element={<AuthRedirect />} />
        {roleRoutes.map(({ path, component: Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Route>
    </Routes>
  );
};

export default PrivateRoutes;



