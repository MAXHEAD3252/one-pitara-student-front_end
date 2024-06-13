import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Wrong email format").required("Email is required"),
});

const resetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string().min(6, "Password too short").required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export function ForgotPassword({role}) {
  
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<{ message: string; res_code: string } | null>(null);
  const [emailExists, setEmailExists] = useState(false);
  const [showLogin, setshowLogin] = useState(false);
    const [email, setEmail] = useState('');


    const table = role;
    
  
  const formikEmail = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      try {
        
        setLoading(true);
        
        console.log(table);
        const response = await fetch(
          "http://127.0.0.1:5000/api/staff/getemailchecked",  // Update with your actual API endpoint
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: values.email,
              table:table,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setApiResponse(data);
          if (data.res_code === '01') {
            setEmailExists(true);
            setEmail(values.email);
          } else {
            setApiResponse({ message: 'Email not found', res_code: '99' });
          }
        } else {
          setApiResponse({ message: 'Failed to verify email', res_code: '99' });
        }
      } catch (error) {
        console.error('Error verifying email:', error);
        setApiResponse({ message: 'Failed to verify email', res_code: '99' });
      } finally {
        setLoading(false);
      }
    },
  });

  const formikPassword = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        const response = await fetch(
          "http://127.0.0.1:5000/api/staff/updatepassword",  
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              newPassword: values.newPassword,
              table:table
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setApiResponse(data);
          setshowLogin(true);
        } else {
          setApiResponse({ message: 'Failed to reset password', res_code: '99' });
        }
      } catch (error) {
        console.error('Error resetting password:', error);
        setApiResponse({ message: 'Failed to reset password', res_code: '99' });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form
      className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      noValidate
      id="kt_login_password_reset_form"
      onSubmit={emailExists ? formikPassword.handleSubmit : formikEmail.handleSubmit}
    >
      <div className="text-center mb-10">
        <h1 className="text-gray-900 fw-bolder mb-3">Forgot Password?</h1>
        <div className="text-gray-500 fw-semibold fs-6">
          {emailExists ? "Enter your new password." : "Enter your email to reset your password."}
        </div>
      </div>

      {apiResponse && (
        <div className={`mb-10 ${apiResponse.res_code === '01' ? 'bg-light-info' : 'alert alert-danger'} p-8 rounded`}>
          <div className={apiResponse.res_code === '01' ? 'text-info' : 'font-weight-bold text-danger'}>
            {apiResponse.message}
          </div>
        </div>
      )}

      {!emailExists && (
        <div className="fv-row mb-8">
          <label className="form-label fw-bolder text-gray-900 fs-6">Email</label>
          <input
            type="email"
            placeholder=""
            autoComplete="off"
            {...formikEmail.getFieldProps("email")}
            className={`form-control bg-transparent ${
              formikEmail.touched.email && formikEmail.errors.email ? "is-invalid" : ""
            }`}
          />
          {formikEmail.touched.email && formikEmail.errors.email && (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                <span role="alert">{formikEmail.errors.email}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {emailExists && (
        <>
          <div className="fv-row mb-8">
            <label className="form-label fw-bolder text-gray-900 fs-6">New Password</label>
            <input
              type="password"
              placeholder=""
              autoComplete="off"
              {...formikPassword.getFieldProps("newPassword")}
              className={`form-control bg-transparent ${
                formikPassword.touched.newPassword && formikPassword.errors.newPassword ? "is-invalid" : ""
              }`}
            />
            {formikPassword.touched.newPassword && formikPassword.errors.newPassword && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formikPassword.errors.newPassword}</span>
                </div>
              </div>
            )}
          </div>

          <div className="fv-row mb-8">
            <label className="form-label fw-bolder text-gray-900 fs-6">Confirm Password</label>
            <input
              type="password"
              placeholder=""
              autoComplete="off"
              {...formikPassword.getFieldProps("confirmPassword")}
              className={`form-control bg-transparent ${
                formikPassword.touched.confirmPassword && formikPassword.errors.confirmPassword ? "is-invalid" : ""
              }`}
            />
            {formikPassword.touched.confirmPassword && formikPassword.errors.confirmPassword && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formikPassword.errors.confirmPassword}</span>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      <div className="d-flex flex-wrap justify-content-center pb-lg-0">
        <button
          type="submit"
          id="kt_password_reset_submit"
          className="btn btn-primary me-4"
        >
          <span className="indicator-label">Submit</span>
          {loading && (
            <span className="indicator-progress">
              Please wait...  
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </button>
        <div style={{display:'flex',gap:'10px'}} >
        {!emailExists && (
          <Link to="/auth/login">
            <button
              type="button"
              id="kt_login_password_reset_form_cancel_button"
              className="btn btn-outline"
              disabled={formikEmail.isSubmitting || !formikEmail.isValid}
            >
              Cancel
            </button>
          </Link>
        )}
        {/* {!showLogin && ( */}
          <Link to="/auth/login">
            <button
              type="button"
              id="kt_login_password_reset_form_cancel_button"
              className="btn btn-dark"
              disabled={formikEmail.isSubmitting || !formikEmail.isValid}
            >
              Login
            </button>
          </Link>
        {/* // )} */}
        </div>
      </div>
    </form>
  );
}
