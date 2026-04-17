import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import Alert from '../components/Alert';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      setAlertMessage('Please enter both email and password');
      setAlertVariant('danger');
      setShowAlert(true);
      return;
    }

    // Attempt login
    const result = await login(email, password);
    
    if (result.success) {
      setAlertMessage('Login successful! Redirecting...');
      setAlertVariant('success');
      setShowAlert(true);
      
      // Redirect to home after 1 second
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      setAlertMessage('Login failed. Please check your credentials.');
      setAlertVariant('danger');
      setShowAlert(true);
    }
  };

  return (
    <Container className="mt-5">
      <Alert
        message={alertMessage}
        variant={alertVariant}
        show={showAlert}
        onClose={() => setShowAlert(false)}
      />

      <div className="d-flex justify-content-center">
        <Card style={{ maxWidth: '500px', width: '100%' }}>
          <Card.Body className="p-5">
            <div className="text-center mb-4">
              <h2>Rocket Elevators</h2>
              <p className="text-muted">Admin Login</p>
            </div>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-3" size="lg">
                Login
              </Button>
            </Form>

          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export default Login;