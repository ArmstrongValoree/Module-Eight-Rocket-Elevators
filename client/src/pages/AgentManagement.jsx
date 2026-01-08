import { Container } from 'react-bootstrap';

function AgentManagement() {
  return (
    <Container className="mt-5">
      <h1>Agent Management</h1>
      <p className="text-muted">
        This page will display the list of agents with create, edit, and delete functionality.
      </p>
      <div className="alert alert-info mt-4">
        <strong>Coming Soon:</strong> Agent CRUD operations will be implemented here.
      </div>
    </Container>
  );
}

export default AgentManagement;
