import React, { useEffect, useState } from "react";
import "../../../../app/pages/StaffPages/FinancialManagement/style.css";
import { useAuth } from "../../../../app/modules/auth/core/Auth";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";
import { useNavigate } from "react-router-dom";
import {DeleteConfirmationModal} from "../../modals/create-app-stepper/DeleteConfirmationModal";

interface CurrentUser {
  school_id: string;
}
interface DataItem {
  id: number;
  name: string;
}

const TablesWidget64 = () => {
  const [data, setData] = useState<DataItem[]>([]);
  
  const { currentUser } = useAuth();
  const Navigate = useNavigate();
  const schoolId = (currentUser as unknown as CurrentUser)?.school_id;

  const [formData, setFormData] = useState({
    id: "",
    name: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<DataItem | null>(null);

  const handleShowDeleteModal = (subscription: DataItem) => {
    setSelectedSubscription(subscription);
    setShowModal(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedSubscription(null);
    setShowModal(false);
  };

  const handleModules = (selectedItem:number) => () => {
    Navigate(`/superadmin/subscriptions/modules?subscriptionId=${selectedItem}`);
  };


  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await fetch(
          `${DOMAIN}/api/superadmin/get-allsubscriptions`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    setRefresh(false);
    fetchEnquiries();
  }, [schoolId,refresh]);


  const handleSave = (e) => {
    e.preventDefault();
    if (isEditMode) {
      // Call the update subscription API
      updateSubscription(formData);
    } else {
      // Call the create subscription API
      createSubscription(formData);
    }
    resetForm();
  };


  const createSubscription = async (data) => {
    try {
      // Replace with your backend API call
      const response = await fetch(`${DOMAIN}/api/superadmin/create-subscription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Subscription created successfully");
setRefresh(true);
        // Refresh the data list or update UI accordingly
      } else {
        console.error("Failed to create subscription");
      }
    } catch (error) {
      console.error("Error creating subscription:", error);
    }
  };
  
  const updateSubscription = async (data) => {
    try {
      // Replace with your backend API call
      const response = await fetch(`${DOMAIN}/api/superadmin/update-subscription/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Subscription updated successfully");
        setRefresh(true);
        // Refresh the data list or update UI accordingly
      } else {
        console.error("Failed to update subscription");
      }
    } catch (error) {
      console.error("Error updating subscription:", error);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleModalEdit = (subscriptionId) => {
  const selectedSubscription = data.find(
    (item) => item.id === subscriptionId
  );

  if (selectedSubscription) {
    setFormData({
      id: selectedSubscription.id.toString(),
      name: selectedSubscription.name,
    });
    setIsEditMode(true); // Set to edit mode
  } else {
    console.error("Subscription not found");
  }
};

const resetForm = () => {
  setFormData({
    id: "",
    name: "",
  });
  setIsEditMode(false); // Reset to create mode
};



const handleDelete = async () => {
  if (!selectedSubscription) return;

  try {
    const response = await fetch(`${DOMAIN}/api/superadmin/delete-subscription/${selectedSubscription.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      console.log("Subscription deleted successfully");
      setRefresh(true);
      handleCloseDeleteModal();
    } else {
      console.error("Failed to delete subscription");
    }
  } catch (error) {
    console.error("Error deleting subscription:", error);
  }
};





  return (
    <div className="d-flex" style={{ gap: "10px" }}>
      <div
        className="col-xxl-8"
        style={{
          borderRadius: "16px",
          border: "1px solid #5D637A",
          overflowX: "hidden",
          minHeight: "100%",
          marginBottom: "20px",
          height: "770px",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Manrope",
          maxWidth: "100%",
          overflow: "hidden",
        }}
      >
        <div style={{ width: "auto", height: "100%", overflow: "hidden" }}>
          <table
            style={{
              top: "223px",
              height: "612px",
              maxHeight: "100%",
              borderCollapse: "collapse",
              overflowX: "hidden",
              overflowY: "auto",
              whiteSpace: "nowrap",
              width: "100%",
            }}
          >
            <thead
              style={{
                height: "123px",
                maxHeight: "100%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#1C335C",
                justifyContent: "space-between",
                zIndex: 999,
              }}
              className="col-xxl-12 col-lg-6"
            >
              <div>
                <caption
                  style={{
                    backgroundColor: "#1C335C",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    // tableLayout: "fixed",
                    // borderCollapse: "collapse",

                    // border:'1px solid'
                    width: "100%",
                  }}
                >
                  <div>
                    <span
                      style={{
                        color: "#FFF",
                        fontSize: "16px",
                        fontWeight: "700",
                        fontFamily: "Manrope",
                      }}
                    >
                      Subscriptions List
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                      className="input-group flex-nowrap"
                      style={{
                        width: "300px",
                        height: "36px",
                        borderRadius: "8px",
                        border: "1px solid #D9D9D9",
                      }}
                    >
                      <span
                        className="input-group-text border-0 pe-1 pr-0"
                        style={{ backgroundColor: "transparent" }}
                        id="addon-wrapping"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 17 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_582_4295)">
                            <circle
                              cx="8.50002"
                              cy="7.66665"
                              r="6.33333"
                              stroke="white"
                              stroke-width="1.5"
                            />
                            <path
                              d="M14.1667 13.3333L15.5 14.6666"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_582_4295">
                              <rect
                                width="16"
                                height="16"
                                fill="white"
                                transform="translate(0.833374)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                      <input
                        type="text"
                        style={{
                          backgroundColor: "transparent",
                          color: "#FFFFFF",
                        }}
                        className="form-control border-0"
                        placeholder="Search ...."
                        aria-label="Search"
                        aria-describedby="addon-wrapping"
                      />
                    </div>
                  </div>
                </caption>
              </div>

              <tr
                style={{
                  height: "61px",
                  display: "flex",
                  paddingLeft: "30px",
                  justifyContent: "space-between",
                  width: "95%",
                  overflowY: "auto",
                  overflowX: "hidden",
                  backgroundColor: "#1C335C",
                }}
              >
                <th>
                  <div style={{ width: "0px" }}>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "600",
                        lineHeight: "18px",
                        color: "#FFFFFF",
                      }}
                    >
                      Fee Type
                    </span>
                  </div>
                </th>
                <th>
                  <div style={{ width: "200px" }}>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "600",
                        lineHeight: "18px",
                        color: "#FFFFFF",
                      }}
                    >
                      Fee Code
                    </span>
                  </div>
                </th>
                <th>
                  <div
                    style={{
                      width: "60px",
                      // textAlign:'left'
                      // border:'1px solid',
                      display: "flex",
                      justifyContent: "end",
                      fontFamily: "Manrope",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "600",
                        lineHeight: "18px",
                        color: "#FFFFFF",
                      }}
                    >
                      Action
                    </span>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody
              className="col-xxl-12 col-lg-6"
              style={{
                height: "105%",
                display: "flex",
                flexDirection: "column",
                minHeight: "calc(100vh - 550px)",
                overflowY: "auto",
                backgroundColor: "#F5F5F5",
              }}
            >
              {data.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    height: "80px",
                    paddingLeft: "30px",
                    paddingTop: "25px",
                    marginBottom: "5px",
                    justifyContent: "space-between",
                    width: "90%",
                    display: "flex",
                    // borderBottom:'1px solid grey'
                  }}
                >
                  <td>
                    <div
                      style={{
                        width: "55px",
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          lineHeight: "18px",
                          color: "#1F1F1F",
                          fontFamily: "Manrope",
                        }}
                      >
                        {item.name}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div
                      style={{
                        width: "55px",
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          lineHeight: "18px",
                          color: "#1F1F1F",
                          fontFamily: "Manrope",
                        }}
                      >
                        {item.is_active}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div
                      style={{
                        width: "160px",
                        display: "flex",
                        justifyContent: "space-around",
                        flexDirection: "row",
                        gap: "6px",
                        marginTop: "-8px",
                      }}
                    >
                      <button
                        type="button"
                        className="btn"
                        style={{
                          backgroundColor: "#1F3259",
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#FFF",
                        }}
                        onClick={handleModules(item.id)}
                      >
                        Modules
                      </button>
                      <button
                        type="button"
                        className="btn"
                        style={{
                          backgroundColor: "#1F3259",
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#FFF",
                        }}
                        onClick={() => handleModalEdit(item.id)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn"
                        style={{
                          border: "1px solid #1F3259",
                          fontFamily: "Manrope",
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#1F3259",
                        }}
                        onClick={() => handleShowDeleteModal(item)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      <DeleteConfirmationModal
        show={showModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={handleDelete}
        title="Confirm Deletion"
        description={`Are you sure you want to delete the subscription "${selectedSubscription?.name}"? This will also delete all entries assigned to this subscription. This action cannot be undone.`}
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
      />



      <div
        className="col-xxl-4"
        style={{
          borderRadius: "16px",
          border: "1px solid #5D637A",
          overflowX: "hidden",
          minHeight: "100%",
          marginBottom: "20px",
          height: "280px",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Manrope",
          maxWidth: "100%",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "20px",
            backgroundColor: "#1C335C",
            height: "80px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            className=""
            id="staticBackdropLabel"
            style={{
              fontSize: "18px",
              fontWeight: "600",
              fontFamily: "Manrope",
              color: "white",
            }}
          >
            Add Subscription:
          </span>
        </div>
        <div>
          <form
            onSubmit={handleSave}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "20px",
              flexDirection: "column",
              marginTop: "10px",
            }}
          >
            <div style={{ marginBottom: "23px", width: "100%" }}>
              <label
                htmlFor="name"
                className="form-label"
                style={{
                  fontSize: "12px",
                  color: "#434343",
                  fontWeight: "500",
                }}
              >
                Name
              </label>

              <div id="name">
                <input
                  className=""
                  style={{
                    height: "46px",
                    width: "100%",
                    paddingLeft: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "transparent",
                    border: "1px solid #ECEDF1",
                    borderRadius: "8px",
                  }}
                  onChange={handleInputChange}
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="Enter Name"
                  aria-expanded="false"
                  required
                />
              </div>
            </div>
            <div
              style={{
                width: "100%",
                justifyContent: "right",
                display: "flex",
              }}
            >
              {isEditMode && (
      <button
        type="button"
        onClick={resetForm}
        className="btn btn-secondary"
        style={{
          width: "118px",
          height: "36px",
          padding: "8px 10px",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          flexShrink: "0",
          backgroundColor: "#ECEDF1",
          color: "#000",
        }}
      >
        <span
          style={{
            fontFamily: "Manrope",
            fontSize: "12px",
            fontWeight: "500",
          }}
        >
          Cancel
        </span>
      </button>
    )}
              <button
                type="submit"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                style={{
                  width: "118px",
                  height: "36px",
                  padding: "8px 10px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  flexShrink: "0",
                  backgroundColor: "rgba(39, 59, 99, 0.76)",
                }}
              >
                <span
                  style={{
                    color: "#FFF",
                    fontFamily: "Manrope",
                    fontSize: "12px",
                    fontWeight: "500",
                  }}
                >
                   {isEditMode ? "Update" : "Save"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { TablesWidget64 };
