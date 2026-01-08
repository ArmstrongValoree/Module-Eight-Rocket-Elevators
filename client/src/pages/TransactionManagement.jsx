import { Container } from 'react-bootstrap';

function TransactionManagement() {
  return (
    <Container className="mt-5">
      <h1>Transaction Management</h1>
      <p className="text-muted">
        This page will display the last 10 transactions and include a form to create new transactions.
      </p>
      <div className="alert alert-info mt-4">
        <strong>Coming Soon:</strong> Transaction list and creation form will be implemented on Day 6.
      </div>
    </Container>
  );
}

export default TransactionManagement;
