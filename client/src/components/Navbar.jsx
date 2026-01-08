import { Link } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Container } from 'react-bootstrap';

function Navbar() {
  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">
          <img
            src="/rocket-logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
            alt="Rocket Elevators"
          />
          Rocket Elevators Admin
        </BootstrapNavbar.Brand>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;