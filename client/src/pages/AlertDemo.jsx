import { Container, Button, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import Alert from '../components/Alert';

function AlertDemo() {
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  return (
    <Container className="mt-5">
      <h1>Alert Notification Demo</h1>
      <p className="text-muted">
        Click the buttons below to test the alert notifications
      </p>

      {/* Success Alert */}
      <Alert
        message="Agent created successfully!"
        variant="success"
        show={successAlert}
        onClose={() => setSuccessAlert(false)}
        autoCloseDelay={5000}
      />

      {/* Error Alert */}
      <Alert
        message="Failed to create agent. Please try again."
        variant="danger"
        show={errorAlert}
        onClose={() => setErrorAlert(false)}
        autoCloseDelay={5000}
      />

      <Row className="g-3">
        <Col md={6}>
          <Button 
            variant="success" 
            size="lg" 
            className="w-100"
            onClick={() => setSuccessAlert(true)}
          >
            Show Success Alert
          </Button>
        </Col>
        <Col md={6}>
          <Button 
            variant="danger" 
            size="lg" 
            className="w-100"
            onClick={() => setErrorAlert(true)}
          >
            Show Error Alert
          </Button>
        </Col>
      </Row>

      <div className="mt-5 p-4 bg-light rounded">
        <h3>How It Works:</h3>
        <ul>
          <li>Alerts appear in the top-right corner</li>
          <li>They auto-dismiss after 5 seconds</li>
          <li>You can manually close them with the X button</li>
          <li>Green = Success, Red = Error</li>
        </ul>
      </div>
    </Container>
  );
}

export default AlertDemo;