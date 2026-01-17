import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Container, Nav, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">
          <img
            src="/rocket-logo.png"
            width="40"
            height="40"
            className="d-inline-block align-top me-2"
            alt="Rocket Elevators Logo"
          />
          Rocket Elevators Admin
        </BootstrapNavbar.Brand>

        {isAuthenticated && (
          <Nav className="ms-auto d-flex align-items-center">
            <span className="text-light me-3">
              Welcome, {user?.firstName} {user?.lastName}
            </span>
            <Button variant="outline-light" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        )}
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;