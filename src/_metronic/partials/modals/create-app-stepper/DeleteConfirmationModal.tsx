import React from "react";
import { Modal, Button } from "react-bootstrap";

interface DeleteConfirmationModalProps {
  show: boolean; // Whether the modal is visible or not
  handleClose: () => void; // Function to close the modal
  handleDelete: () => void; // Function to handle deletion
  title?: string; // Title of the modal
  description?: string; // Description in the modal body
  confirmButtonText?: string; // Text for the confirm button
  cancelButtonText?: string; // Text for the cancel button
  confirmButtonVariant?: string; // Bootstrap variant for the confirm button
  cancelButtonVariant?: string; // Bootstrap variant for the cancel button
  icon?: React.ReactNode; // Optional icon to display in the modal
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  show,
  handleClose,
  handleDelete,
  title = "Confirm Deletion",
  description = "Are you sure you want to perform this action? This action cannot be undone.",
  confirmButtonText = "Delete",
  cancelButtonText = "Cancel",
  confirmButtonVariant = "danger",
  cancelButtonVariant = "secondary",
  icon,
}) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex align-items-center">
          {icon && <div className="me-3">{icon}</div>} {/* Display icon if provided */}
          <p>{description}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={cancelButtonVariant} onClick={handleClose}>
          {cancelButtonText}
        </Button>
        <Button variant={confirmButtonVariant} onClick={handleDelete}>
          {confirmButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export {DeleteConfirmationModal};
