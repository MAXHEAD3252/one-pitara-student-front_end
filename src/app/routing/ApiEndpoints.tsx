// Define your base domain
// const DOMAIN = 'http://onepitaraapi.payplatter.in/';
const DOMAIN = 'http://localhost:5000';

//enquiries page endpoints
const getTotalNumberofEnquiries = 'api/staff/gettotalnumbers';
const getClassWiseEnquiryThisYear = 'api/staff/getclasswisetableenquirythisyear';
const getEnquiriesBySources = 'api/staff/getallenquriesbysources';
const getWinRatePercentage = 'api/staff/getwinratepercentage';
const getMonthWiseEnquiries = 'api/staff/getmonthwiseenquiries';
const getEnquiriesStatus = 'api/staff/getdetailedenquirystatus';
const getStaffRoles = 'api/school/get-roles';
// const getEnquiries = 'api/staff/get-enquires';
// const getEnquiriesByID = 'api/staff/get-enquires/1';

// admissions page endpoints
const getAllAdmissions = 'api/staff/getalladmissions';
const getStudentAdmissionDetails = 'api/staff/getstudentadmissiondetials';

//superAdmin
// const CreateAdmin = 'api/superadmin/create_admin';
const get_schoolbyid = 'api/superadmin/get_schoolbyid';
// const getAdmin = 'api/superadmin/get_admin';
const getParentModule = 'api/superadmin/get-parent-module';
const storeModuleRequest = 'api/superadmin/save-module-request';
const getUsersBySchoolId = 'api/superadmin/school-users';
const getAssignedRoles = 'api/superadmin/school-roles';
const getSchoolWiseDesignations = 'api/superadmin/get-designations';
const getSchoolModuleById = 'api/superadmin/get_schoolmodulesbyid';
const getDesignationModule = 'api/superadmin/get_designationmodule';
// const getOnboardingAcademiesRequestById = 'api/superadmin/get_onboarding-academies-request-byid';
// const storeAcademyRegistration = 'complete-academy-registration';
// const storeAdmissionRegistration = 'complete-admission-registration';

//student apis 
const getTimetableStudentWise = 'api/student/time-table'
// const getNoticeBoardLastestMonth = 'api/student/notice-board/latest-month-data'

// eslint-disable-next-line react-refresh/only-export-components
// eslint-disable-next-line react-refresh/only-export-components
export { DOMAIN, getSchoolWiseDesignations,getTimetableStudentWise, getTotalNumberofEnquiries,storeModuleRequest,getParentModule,getSchoolModuleById,getDesignationModule,getStaffRoles, getClassWiseEnquiryThisYear, getEnquiriesBySources, getWinRatePercentage, getMonthWiseEnquiries, getEnquiriesStatus, getAllAdmissions, getStudentAdmissionDetails, get_schoolbyid, getAssignedRoles ,getUsersBySchoolId};