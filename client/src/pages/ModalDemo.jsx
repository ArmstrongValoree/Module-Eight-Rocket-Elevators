import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { useState } from 'react';
import ConfirmationModal from '../components/ConfirmationModal';
import Alert from '../components/Alert';

function ModalDemo() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');
  const [showAlert, setShowAlert] = useState(false);

  const handleDeleteConfirm = () => {
    setShowDeleteModal(false);
    setAlertMessage('Agent deleted successfully!');
    setAlertVariant('success');
    setShowAlert(true);
  };

  const handleCreateConfirm = () => {
    setShowCreateModal(false);
    setAlertMessage('Agent created successfully!');
    setAlertVariant('success');
    setShowAlert(true);
  };

  const handleUpdateConfirm = () => {
    setShowUpdateModal(false);
    setAlertMessage('Agent updated successfully!');
    setAlertVariant('success');
    setShowAlert(true);
  };

  return (
    <Container className="mt-5">
      <h1>Confirmation Modal Demo</h1>
      <p className="text-muted">
        Click the buttons below to test confirmation modals for different actions
      </p>

      <Alert
        message={alertMessage}
        variant={alertVariant}
        show={showAlert}
        onClose={() => setShowAlert(false)}
      />

      <ConfirmationModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Agent"
        message="Are you sure you want to delete this agent? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmVariant="danger"
      />

      <ConfirmationModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onConfirm={handleCreateConfirm}
        title="Create Agent"
        message="Are you sure you want to create this agent?"
        confirmText="Create"
        cancelText="Cancel"
        confirmVariant="success"
      />

      <ConfirmationModal
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onConfirm={handleUpdateConfirm}
        title="Update Agent"
        message="Are you sure you want to update this agent's information?"
        confirmText="Update"
        cancelText="Cancel"
        confirmVariant="primary"
      />

      <Row className="g-4">
        <Col md={4}>
          <Card className="h-100">
            <Card.Body className="d-flex flex-column">
              <h5 className="mb-3">Delete Action</h5>
              <p className="text-muted flex-grow-1">
                Shows a red "Delete" button with a warning message about permanent deletion.
              </p>
              <Button 
                variant="danger" 
                size="lg"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete Agent
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100">
            <Card.Body className="d-flex flex-column">
              <h5 className="mb-3">Create Action</h5>
              <p className="text-muted flex-grow-1">
                Shows a green "Create" button asking for confirmation before creating.
              </p>
              <Button 
                variant="success" 
                size="lg"
                onClick={() => setShowCreateModal(true)}
              >
                Create Agent
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100">
            <Card.Body className="d-flex flex-column">
              <h5 className="mb-3">Update Action</h5>
              <p className="text-muted flex-grow-1">
                Shows a blue "Update" button asking for confirmation before updating.
              </p>
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => setShowUpdateModal(true)}
              >
                Update Agent
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="mt-5 p-4 bg-light rounded">
        <h3>How Modals Work:</h3>
        <ul>
          <li>Click an action button to open a confirmation modal</li>
          <li>The modal appears centered on the screen with a backdrop</li>
          <li>You can cancel by clicking "Cancel", the X button, or clicking outside</li>
          <li>Confirming the action closes the modal and shows a success alert</li>
          <li>Different actions use different colored confirm buttons (red for delete, green for create, blue for update)</li>
        </ul>
      </div>
    </Container>
  );
}

export default ModalDemo;
