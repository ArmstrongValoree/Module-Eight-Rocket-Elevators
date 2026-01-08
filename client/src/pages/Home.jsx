import { Container, Row, Col } from 'react-bootstrap';
import ManagementCard from '../components/ManagementCard';

function Home() {
  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Rocket Elevators Admin</h1>
          <p className="text-center text-muted">
            Select a management area to continue
          </p>
        </Col>
      </Row>
      
      <Row className="g-4">
        <Col md={6}>
          <ManagementCard
            title="Agent Management"
            description="View, create, update, and delete agent information"
            icon="👥"
            link="/agents"
          />
        </Col>
        
        <Col md={6}>
          <ManagementCard
            title="Transaction Management"
            description="View recent transactions and create new transaction records"
            icon="💰"
            link="/transactions"
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;