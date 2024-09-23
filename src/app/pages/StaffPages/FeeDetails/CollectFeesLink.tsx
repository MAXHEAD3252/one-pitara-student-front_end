import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CryptoJS from "crypto-js";
import axios from "axios";
import "./CollectFeesLink.css"; // Optional: Add custom CSS
import { DOMAIN } from "../../../routing/ApiEndpoints";

// Define an interface for payment details
interface PaymentDetails {
  studentName: string;
  course: string;
  enrollmentId?: string;
  total_amount: number;
  dueDate: string;
  school_id: string;
  student_id: string;
  transaction_ids: Array[];
}

// Define an interface for school details
interface SchoolDetails {
  name: string;
  address: string;
  email: string;
  tagline: string;
  phone: string;
}

interface StudentDetails {
  admission_no: string;
  current_address: string;
  email: string;
  image: string | null; // or `null` if no image is provided
  mobileno: string;
  student_name: string;
}

const CollectFeesLink: React.FC = () => {
  const location = useLocation();
  const secretKey = "V3rY$eCur3!Key#2024!@G7P8$9ZQw"; // Use the same secret key used for encryption
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(
    null
  );
  console.log(paymentDetails);

  const [studentDetails, setStudentDetails] =
    React.useState<StudentDetails | null>(null);
  const [schoolDetails, setSchoolDetails] =
    React.useState<SchoolDetails | null>(null);

  const [feesDetails, setFeesDetails] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Extract the 'data' parameter from the query string
    const queryParams = new URLSearchParams(location.search);
    const encryptedData = queryParams.get("data");

    if (encryptedData) {
      try {
        // Decrypt the 'data' parameter
        const bytes = CryptoJS.AES.decrypt(
          decodeURIComponent(encryptedData),
          secretKey
        );
        const decryptedData = JSON.parse(
          bytes.toString(CryptoJS.enc.Utf8)
        ) as PaymentDetails;

        // Store the decrypted data (payment and student details) in the state
        setPaymentDetails(decryptedData);
      } catch (error) {
        console.error("Error decrypting data:", error);
      }
    }
  }, [location.search]);

  useEffect(() => {
    if (paymentDetails) {
      const fetchSchoolsDetails = async () => {
        const school_id = paymentDetails.school_id;
        try {
          setLoading(true); // Set loading to true while fetching data
          const response = await axios.get<SchoolDetails>(
            `${DOMAIN}/get-schooldetails/${school_id}`
          );

          // Check if the response status and statusText are as expected
          if (response.status === 200 && response.statusText === "OK") {
            setSchoolDetails(response.data);
          } else {
            // Handle unexpected status
            throw new Error(
              `Unexpected response status: ${response.status} ${response.statusText}`
            );
          }
        } catch (error) {
          setError(error as Error);
          console.error("Error fetching school details:", error);
        } finally {
          setLoading(false); // Set loading to false once the request is complete
        }
      };

      fetchSchoolsDetails();

      const fetchStudentDetails = async () => {
        const student_id = paymentDetails.student_id; // Ensure paymentDetails is defined and accessible
        try {
          setLoading(true); // Set loading to true while fetching data
          const response = await axios.get<StudentDetails>(
            `${DOMAIN}/get-studentdetails/${student_id}`
          );

          // Check if the response status and statusText are as expected
          if (response.status === 200 && response.statusText === "OK") {
            setStudentDetails(response.data);
          } else {
            // Handle unexpected status
            throw new Error(
              `Unexpected response status: ${response.status} ${response.statusText}`
            );
          }
        } catch (error) {
          setError(error as Error);
          console.error("Error fetching student details:", error);
        } finally {
          setLoading(false); // Set loading to false once the request is complete
        }
      };

      // Call the function (ensure this is called within a useEffect or similar lifecycle method in a React component)
      fetchStudentDetails();

      const fetchPaymentDetails = async () => {
        const school_id = paymentDetails.school_id;
        const transaction_ids = paymentDetails.transaction_ids.join(","); // Convert array to comma-separated string

        try {
          setLoading(true); // Set loading to true while fetching data
          const response = await axios.get(
            `${DOMAIN}/get-feestransactions/${school_id}/${transaction_ids}`
          );
          setFeesDetails(response.data); // Set the fetched fee details to state
        } catch (error) {
          setError(error); // Set the error state if an error occurs
          console.error("Error fetching payment details:", error);
        } finally {
          setLoading(false); // Set loading to false once the request is complete
        }
      };

      fetchPaymentDetails();
    }
  }, [paymentDetails]);

  if (loading) {
    return (
      <div className="message-container">
        <div className="message-box">
          <h4>Loading...</h4>
          <p>Please wait while we fetch your payment details.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="message-container">
        <div className="message-box">
          <h4>Error</h4>
          <p>
            There was an error fetching payment details. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  // If paymentDetails is not available yet, render an empty state
  if (!paymentDetails) {
    return (
      <div className="message-container">
        <div className="message-box">
          <h4>No Details</h4>
          <p>No payment details are available at this time.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page min-vh-100 d-flex flex-column justify-content-center align-items-center">
      {/* Header with school logo and details */}
      <header className="text-center mb-4">
        <img
          src="/path-to-school-logo.png"
          alt="School Logo"
          style={{ width: "100px" }}
        />
        <h2 className="mt-3">{schoolDetails ? schoolDetails.name : ""}</h2>
        <p className="text-muted">
          {schoolDetails ? schoolDetails.tagline : ""}
        </p>

        {/* Address */}
        {schoolDetails && schoolDetails.address && (
          <p className="mt-2">
            <strong>Address:</strong> {schoolDetails.address}
          </p>
        )}

        {/* Email */}
        {schoolDetails && schoolDetails.email && (
          <p className="mt-1">
            <strong>Email:</strong>{" "}
            <a href={`mailto:${schoolDetails.email}`}>{schoolDetails.email}</a>
          </p>
        )}
      </header>

      {/* Checkout card */}
      <div className="card shadow p-4" style={{ width: "600px" }}>
        <h4 className="card-title text-center mt-6 mb-4">
          Checkout - Payment Details
        </h4>
        <div className="card-body">
          {/* Student and Course Details */}
          <div className="mb-3">
            <h5 className="mb-3">Student Information</h5>
            <p className="d-flex justify-content-between">
              <strong>Admission No.:</strong> {studentDetails?.admission_no}
            </p>
            <p className="d-flex justify-content-between">
              <strong>Name:</strong> {studentDetails?.student_name}
            </p>
            <p className="d-flex justify-content-between">
              <strong>Email:</strong> {studentDetails?.email}
            </p>
            <p className="d-flex justify-content-between">
              <strong>Number:</strong> {studentDetails?.mobileno}
            </p>
          </div>

          {/* Custom Divider */}
          <div
            className="divider my-4"
            style={{ borderBottom: "1px solid #ddd" }}
          ></div>

          {/* Payment Details Breakdown */}
          <div className="mb-3">
            <h5 className="mb-3">Payment Summary</h5>
            <div className="d-flex justify-content-between">
              <p>Fee Types Included:</p>
              <p className="fw-bold text-end">
                [
                {feesDetails && feesDetails.length > 0
                  ? feesDetails.map((detail) => `"${detail.type}"`).join(", ")
                  : "No fee types available"}
                ]
              </p>
            </div>

            <div className="d-flex justify-content-between">
              <p>Total Adjustment : </p>
              <p>₹{paymentDetails.total_adjustment}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p>
                <strong>Total Amount</strong>
              </p>
              <p>
                <strong>₹{paymentDetails.total_amount}</strong>
              </p>
            </div>
          </div>

          {/* Button to proceed with payment */}
          <button className="btn btn-primary w-100 mt-3">
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollectFeesLink;
