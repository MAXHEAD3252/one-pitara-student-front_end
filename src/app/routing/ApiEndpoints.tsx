// Define your base domain
// const DOMAIN = 'https://onepitaraapi.payplatter.in';
const DOMAIN = 'http://localhost:5000';

//enquiries page endpoints
const getTotalNumberofEnquiries = 'api/staff/gettotalnumbers';
const getClassWiseEnquiryThisYear = 'api/staff/getclasswisetableenquirythisyear';
const getEnquiriesBySources = 'api/staff/getallenquriesbysources';
const getWinRatePercentage = 'api/staff/getwinratepercentage';
const getMonthWiseEnquiries = 'api/staff/getmonthwiseenquiries';
const getEnquiriesStatus = 'api/staff/getdetailedenquirystatus';

// admissions page endpoints
const getAllAdmissions = 'api/staff/getalladmissions';
const getStudentAdmissionDetails = 'api/staff/getstudentadmissiondetials';

//superAdmin

//student apis 
const getTimetableStudentWise = 'api/student/time-table'

// eslint-disable-next-line react-refresh/only-export-components
export  {DOMAIN,getTimetableStudentWise,getTotalNumberofEnquiries,getClassWiseEnquiryThisYear,getEnquiriesBySources,getWinRatePercentage,getMonthWiseEnquiries,getEnquiriesStatus,getAllAdmissions,getStudentAdmissionDetails};