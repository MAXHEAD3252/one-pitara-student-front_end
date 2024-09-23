import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { DOMAIN } from "../../../../app/routing/ApiEndpoints";

interface Subscription {
  id: number;
  name: string;
}

interface AssignFeesMasterProps {
  show: boolean;
  handleClose: () => void;
  school_id: number | undefined;
  setRefresh: (refresh: boolean) => void;
  previousSubscription: string | undefined; // New prop for previous subscription name
  previousSubscriptionId: number | undefined; // New prop for previous subscription ID
}

const CreateViewSchool: React.FC<AssignFeesMasterProps> = ({
  show,
  handleClose,
  school_id,
  setRefresh,
  previousSubscription,
  previousSubscriptionId,
}) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [selectedSubscription, setSelectedSubscription] = useState<number | undefined>(previousSubscriptionId);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // For confirmation modal

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  useEffect(() => {
    // Set the selected subscription to the previous one when the modal opens
    if (previousSubscriptionId !== undefined) {
      setSelectedSubscription(previousSubscriptionId);
    }
  }, [previousSubscriptionId]);

  const fetchSubscriptions = async () => {
    try {
      // Fetch all available subscriptions
      const response = await fetch(`${DOMAIN}/api/superadmin/get-allsubscriptions`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const responseData = await response.json();
      setSubscriptions(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSave = () => {
    // Open confirmation modal before saving
    setShowConfirmationModal(true);
  };

  const confirmSave = async () => {
    try {
      const response = await fetch(
        `${DOMAIN}/api/superadmin/update-subscription-for-school`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            school_id: school_id,
            subscription_id: selectedSubscription,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update subscription");
      }
      console.log("Subscription updated successfully");
      handleClose();
      setRefresh(true);
      setShowConfirmationModal(false); // Close confirmation modal
    } catch (error) {
      console.error("Error updating subscription:", error);
    }
  };

  return (
    <>
      <Modal centered show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Manage Subscriptions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCurrentSubscription">
              <Form.Label>Current Subscription</Form.Label>
              <Form.Control
                type="text"
                readOnly
                value={previousSubscription || "No Subscription"}
              />
            </Form.Group>
            <Form.Group controlId="formSelectSubscription" className="mt-3">
              <Form.Label>Select New Subscription</Form.Label>
              <Form.Control
                as="select"
                value={selectedSubscription}
                onChange={(e) => setSelectedSubscription(Number(e.target.value))}
              >
                {subscriptions.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={selectedSubscription === previousSubscriptionId} // Disable save if no change
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        centered
        show={showConfirmationModal}
        onHide={() => setShowConfirmationModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Change</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to change the subscription to{" "}
          {subscriptions.find((sub) => sub.id === selectedSubscription)?.name}?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmationModal(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmSave}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export { CreateViewSchool };
