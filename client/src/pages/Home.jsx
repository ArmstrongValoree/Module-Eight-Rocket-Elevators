import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <Container className="py-4">
      <h1 className="mb-4">Welcome, {user?.firstName}!</h1>
      <p className="lead mb-4">Select a management option below:</p>

      <Row>
        {/* Agent Management Card */}
        <Col md={4} className="mb-4">
          <Card
            className="h-100 shadow-sm hover-card"
            onClick={() => navigate("/agents")}
            style={{ cursor: "pointer" }}
          >
            <Card.Body className="d-flex flex-column align-items-center justify-content-center text-center p-4">
              <div className="display-1 mb-3">👥</div>
              <Card.Title className="mb-2">Agent Management</Card.Title>
              <Card.Text className="text-muted">
                View, edit, search, and manage agents
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Transaction Management Card */}
        <Col md={4} className="mb-4">
          <Card
            className="h-100 shadow-sm hover-card"
            onClick={() => navigate("/transactions")}
            style={{ cursor: "pointer" }}
          >
            <Card.Body className="d-flex flex-column align-items-center justify-content-center text-center p-4">
              <div className="display-1 mb-3">💰</div>
              <Card.Title className="mb-2">Transaction Management</Card.Title>
              <Card.Text className="text-muted">
                Create and view transactions
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
