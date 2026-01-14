import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Spinner, Badge } from 'react-bootstrap';

function AgentManagement() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/agents`);
      const data = await response.json();

      if (data.status === 'ok') {
        setAgents(data.data);
      }
    } catch (error) {
      console.error('Error fetching agents:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getRegionColor = (region) => {
    const colors = {
      'North': 'primary',
      'South': 'success',
      'East': 'warning',
      'West': 'danger'
    };
    return colors[region] || 'secondary';
  };

  const getRatingColor = (rating) => {
    if (rating >= 90) return 'success';
    if (rating >= 75) return 'warning';
    return 'danger';
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Agent Management</h1>

      <Card>
        <Card.Body>
          <Card.Title>
            All Agents ({agents.length})
          </Card.Title>

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" />
              <p className="mt-2">Loading agents...</p>
            </div>
          ) : agents.length === 0 ? (
            <p className="text-muted text-center py-5">No agents found.</p>
          ) : (
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Region</th>
                    <th>Rating</th>
                    <th>Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {agents.map(agent => (
                    <tr key={agent._id}>
                      <td>
                        <small className="text-muted font-monospace">
                          {agent._id.substring(0, 8)}...
                        </small>
                      </td>
                      <td className="fw-bold">
                        {agent.first_name} {agent.last_name}
                      </td>
                      <td>{agent.email}</td>
                      <td>
                        <Badge bg={getRegionColor(agent.region)}>
                          {agent.region}
                        </Badge>
                      </td>
                      <td>
                        <Badge bg={getRatingColor(agent.rating)}>
                          {agent.rating}%
                        </Badge>
                      </td>
                      <td className="text-end">
                        {formatCurrency(agent.fee)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>

      <Row className="mt-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-primary">{agents.length}</h3>
              <p className="text-muted mb-0">Total Agents</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-success">
                {agents.filter(a => a.rating >= 90).length}
              </h3>
              <p className="text-muted mb-0">High Rated (90+)</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-warning">
                {formatCurrency(agents.reduce((sum, a) => sum + a.fee, 0) / agents.length || 0)}
              </h3>
              <p className="text-muted mb-0">Average Fee</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3 className="text-info">
                {new Set(agents.map(a => a.region)).size}
              </h3>
              <p className="text-muted mb-0">Regions Covered</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AgentManagement;
