import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import ConfirmationModal from '../components/ConfirmationModal';
import AlertComponent from '../components/Alert';

function TransactionManagement() {
  const { isAuthenticated } = useAuth();
  const [agents, setAgents] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [amount, setAmount] = useState('');
  const [selectedAgentId, setSelectedAgentId] = useState('');
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  
  // Alert state
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');

  // Fetch agents and transactions on mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchAgents();
      fetchTransactions();
    }
  }, [isAuthenticated]);

  // Fetch all agents for dropdown
  const fetchAgents = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/agents`, {
        credentials: 'include'
      });
      const data = await response.json();
      
      if (data.status === 'ok') {
        setAgents(data.data);
      }
    } catch (error) {
      console.error('Error fetching agents:', error);
      showAlertMessage('Failed to load agents', 'danger');
    }
  };

  // Fetch last 10 transactions
  const fetchTransactions = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/transaction-data`, {
        credentials: 'include'
      });
      const data = await response.json();
      
      if (data.status === 'ok') {
        setTransactions(data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      showAlertMessage('Failed to load transactions', 'danger');
      setLoading(false);
    }
  };

  // Show alert helper
  const showAlertMessage = (message, variant = 'success') => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
  };

  // Handle form submit - show confirmation modal
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!amount || !selectedAgentId) {
      showAlertMessage('Please fill in all fields', 'danger');
      return;
    }

    if (parseFloat(amount) <= 0) {
      showAlertMessage('Amount must be a positive number', 'danger');
      return;
    }

    // Show confirmation modal
    setShowModal(true);
  };

  // Create transaction after confirmation
  const handleConfirmTransaction = async () => {
    setShowModal(false);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/transaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          amount: parseFloat(amount),
          agent_id: selectedAgentId
        })
      });

      const data = await response.json();

      if (data.status === 'ok') {
        showAlertMessage('Transaction created successfully!', 'success');
        
        // Reset form
        setAmount('');
        setSelectedAgentId('');
        
        // Refresh transactions list
        fetchTransactions();
      } else {
        showAlertMessage(data.message || 'Failed to create transaction', 'danger');
      }
    } catch (error) {
      console.error('Error creating transaction:', error);
      showAlertMessage('Network error. Please try again.', 'danger');
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Transaction Management</h1>

      {/* Alert */}
      {showAlert && (
        <AlertComponent
          message={alertMessage}
          variant={alertVariant}
          onClose={() => setShowAlert(false)}
        />
      )}

      <Row>
        {/* Transaction Form */}
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Create Transaction</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                  <Form.Text className="text-muted">
                    Enter a positive dollar amount
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Agent</Form.Label>
                  <Form.Select
                    value={selectedAgentId}
                    onChange={(e) => setSelectedAgentId(e.target.value)}
                    required
                  >
                    <option value="">Select an agent...</option>
                    {agents.map((agent) => (
                      <option key={agent._id} value={agent._id}>
                        {agent.first_name} {agent.last_name} - {agent.region}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Create Transaction
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Transactions Table */}
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Recent Transactions (Last 10)</Card.Title>
              
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : transactions.length === 0 ? (
                <p className="text-muted text-center py-4">
                  No transactions yet. Create your first transaction!
                </p>
              ) : (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Agent</th>
                      <th>Region</th>
                      <th>Created By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction._id}>
                        <td>{formatDate(transaction.created_at)}</td>
                        <td className="text-end fw-bold">
                          {formatCurrency(transaction.amount)}
                        </td>
                        <td>
                          {transaction.agent_id?.first_name} {transaction.agent_id?.last_name}
                        </td>
                        <td>
                          <span className="badge bg-secondary">
                            {transaction.agent_id?.region}
                          </span>
                        </td>
                        <td>
                          {transaction.user_id?.firstName} {transaction.user_id?.lastName}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Confirmation Modal */}
      <ConfirmationModal
        show={showModal}
        title="Confirm Transaction"
        message={`Are you sure you want to create a transaction for ${formatCurrency(parseFloat(amount || 0))}?`}
        onConfirm={handleConfirmTransaction}
        onCancel={() => setShowModal(false)}
      />
    </Container>
  );
}

export default TransactionManagement;