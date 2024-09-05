import React, { useEffect, useState } from "react";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";
import { Modal } from "react-bootstrap";
import { useAuth } from "../../../../app/modules/auth/core/Auth";

interface AssignFeesMasterProps {
  show: boolean;
  handleClose: () => void;
  sub_id: number | undefined;
  setRefresh: (refresh: boolean) => void;
}

const CreateViewSchool: React.FC<AssignFeesMasterProps> = ({
  show,
  handleClose,
  sub_id,
  setRefresh,
}) => {
  const { currentUser } = useAuth();
  const userId = currentUser?.id;
  const [data, setData] = useState([]);
  const [subscriptionStatus, setSubscriptionStatus] = useState({});
  const [activationStatus, setActivationStatus] = useState({});

  // Fetch schools data and initialize toggle states
  const fetchSchools = async () => {
    try {
      const response = await fetch(
        `${DOMAIN}/api/superadmin/get-subscriptionwise-school`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const responseData = await response.json();
      console.log(responseData);
      setData(responseData);

      const initialSubscriptionStatus = {};
      const initialActivationStatus = {};
      responseData.forEach((school) => {
        initialSubscriptionStatus[school.school_id] =
          school.subscription_id === sub_id;
        initialActivationStatus[school.school_id] = school.Is_active === 1;
      });
      setSubscriptionStatus(initialSubscriptionStatus);
      setActivationStatus(initialActivationStatus);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, [sub_id]);

  const handleSubscriptionToggle = (school_id) => {
    setSubscriptionStatus((prevStatus) => ({
      ...prevStatus,
      [school_id]: !prevStatus[school_id],
    }));
  };

  const handleActivationToggle = (school_id) => {
    setActivationStatus((prevStatus) => ({
      ...prevStatus,
      [school_id]: !prevStatus[school_id],
    }));
  };

  const handleSubmit = async () => {
    const updatedData = data
      .filter((school) => {
        const initialSubscriptionStatus =
          school.subscription_id === sub_id ? 1 : 0;
        const initialActivationStatus = school.Is_active === 1 ? 1 : 0;

        const currentSubscriptionStatus = subscriptionStatus[school.school_id]
          ? 1
          : 0;
        const currentActivationStatus = activationStatus[school.school_id]
          ? 1
          : 0;

        return (
          initialSubscriptionStatus !== currentSubscriptionStatus ||
          initialActivationStatus !== currentActivationStatus
        );
      })
      .map((school) => ({
        school_id: school.school_id,
        subscription_status: subscriptionStatus[school.school_id] ? 1 : 0,
        activation_status: activationStatus[school.school_id] ? 1 : 0,
      }));

    if (updatedData.length === 0) {
      console.log("No changes detected, nothing to update.");
      return;
    }

    console.log(updatedData);
    try {
      const response = await fetch(
        `${DOMAIN}/api/superadmin/update-schools-subscription`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update schools");
      }
      console.log("Schools updated successfully");

      // Refresh data after successful update
      fetchSchools();
      handleClose();
      setRefresh(true);
    } catch (error) {
      console.error("Error updating schools:", error);
    }
  };

  return (
    <Modal
      id="kt_modal_create_app"
      tabIndex={-1}
      aria-hidden="true"
      dialogClassName="modal-dialog modal-dialog-centered mw-1000px"
      show={show}
      handleClose={handleClose}
      backdrop="static"
    >
      <div
        className="modal-content"
        style={{ padding: "23px 5px", borderRadius: "17px" }}
      >
        <div
          className="modal-header border-0"
          style={{ width: "100%", height: "17px" }}
        >
          <span
            className=""
            id="staticBackdropLabel"
            style={{
              fontSize: "24px",
              fontWeight: "600",
              fontFamily: "Manrope",
            }}
          >
            View Schools and Subscriptions
          </span>
          <span
            data-bs-dismiss="modal"
            onClick={handleClose}
            aria-label="Close"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="16" cy="16" r="16" fill="#ECECEC" />
              <path
                d="M22.8572 9.14294L9.14288 22.8572M9.14288 9.14294L22.8572 22.8572"
                stroke="#464646"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        <div className="modal-body" style={{ overflow: "auto" }}>
          <div
            style={{
              backgroundColor: "#F2F6FF",
              borderRadius: "16px",
              padding: "24px",
            }}
          >
            <div className="table-responsive" style={{ maxHeight: "600px" }}>
              <table className="table align-middle gs-3 gy-5">
                <thead>
                  <tr style={{ borderBottom: "2px solid lightgray" }}>
                    <th
                      className="p-0 w-180px"
                      style={{
                        fontFamily: "Manrope",
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                    >
                      School Name
                    </th>
                    <th
                      className="p-0 min-w-200px"
                      style={{
                        fontFamily: "Manrope",
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                    >
                      Subscription
                    </th>
                    <th
                      className="p-0 min-w-50px "
                      style={{
                        fontFamily: "Manrope",
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                    >
                      Subscribe
                    </th>
                    <th
                      className="p-0 min-w-50px "
                      style={{
                        fontFamily: "Manrope",
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                    >
                      Activate
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((school) => (
                    <tr key={school.school_id}>
                      <td>{school.name}</td>
                      <td>
                        {school.subscription_id === sub_id
                          ? `Subscribed`
                          : `Not Subscribed`}
                      </td>
                      <td>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`toggle-${school.school_id}`}
                            checked={subscriptionStatus[school.school_id]}
                            onChange={() =>
                              handleSubscriptionToggle(school.school_id)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`subscription-toggle-${school.school_id}`}
                          ></label>
                        </div>
                      </td>
                      <td>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`toggle-${school.school_id}`}
                            checked={activationStatus[school.school_id]}
                            onChange={() =>
                              handleActivationToggle(school.school_id)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`activation-toggle-${school.school_id}`}
                          ></label>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div
                className="d-flex justify-content-end"
                style={{
                  paddingRight: "30px",
                }}
              >
                <button
                  className="btn btn-primary"
                  style={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                  onClick={handleSubmit}
                  //   disabled={school_id === 0 || !school_id}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export { CreateViewSchool };
