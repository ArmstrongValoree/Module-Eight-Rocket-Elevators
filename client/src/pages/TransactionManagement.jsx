import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Spinner,
} from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import Alert from "../components/Alert";
import ConfirmationModal from "../components/ConfirmationModal";

function TransactionManagement() {
  const { user } = useAuth();
  const [agents, setAgents] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [amount, setAmount] = useState("");
  const [selectedAgentId, setSelectedAgentId] = useState("");

  // Alert state
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");

  // Modal state
  const [showModal, setShowModal] = useState(false);

  // Fetch agents and transactions on component mount
  useEffect(() => {
    fetchAgents();
    fetchTransactions();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/agents`);
      const data = await response.json();

      if (data.status === "ok") {
        setAgents(data.data);
      }
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/transaction-data`
      );
      const data = await response.json();

      if (data.status === "ok") {
        setTransactions(data.data);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation - check empty fields FIRST
    if (
      !amount ||
      amount.trim() === "" ||
      !selectedAgentId ||
      selectedAgentId === ""
    ) {
      setAlertMessage("Please fill in all fields");
      setAlertVariant("danger");
      setShowAlert(true);
      return;
    }

    const numAmount = parseFloat(amount);

    if (isNaN(numAmount) || numAmount <= 0) {
      setAlertMessage("Amount must be a positive number");
      setAlertVariant("danger");
      setShowAlert(true);
      return;
    }

    // Show confirmation modal
    setShowModal(true);
  };
  const handleConfirmTransaction = async () => {
    setShowModal(false);
    setSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/transaction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: parseFloat(amount),
            agent_id: selectedAgentId,
          }),
        }
      );

      const data = await response.json();

      if (data.status === "ok") {
        setAlertMessage("Transaction created successfully!");
        setAlertVariant("success");
        setShowAlert(true);

        // Clear form
        setAmount("");
        setSelectedAgentId("");

        // Refresh transactions
        fetchTransactions();
      } else {
        setAlertMessage(data.message || "Failed to create transaction");
        setAlertVariant("danger");
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error creating transaction:", error);
      setAlertMessage("Network error. Please try again.");
      setAlertVariant("danger");
      setShowAlert(true);
    } finally {
      setSubmitting(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const selectedAgent = agents.find((agent) => agent._id === selectedAgentId);

  return (
    <Container fluid className="px-4 py-4">
      {showAlert && (
        <Alert
          message={alertMessage}
          variant={alertVariant}
          onClose={() => setShowAlert(false)}
        />
      )}
      <h1 className="mb-4">Transaction Management</h1>

      <Row>
        {/* Transaction Form */}
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Create Transaction</Card.Title>
              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-3">
                  <Form.Label>Amount ($)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    disabled={submitting}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Select Agent</Form.Label>
                  <Form.Select
                    value={selectedAgentId}
                    onChange={(e) => setSelectedAgentId(e.target.value)}
                    disabled={submitting}
                  >
                    <option value="">Choose an agent...</option>
                    {agents.map((agent) => (
                      <option key={agent._id} value={agent._id}>
                        {agent._id} - {agent.first_name} {agent.last_name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        className="me-2"
                      />
                      Creating...
                    </>
                  ) : (
                    "Create Transaction"
                  )}
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
                <div className="text-center py-5">
                  <Spinner animation="border" />
                  <p className="mt-2">Loading transactions...</p>
                </div>
              ) : transactions.length === 0 ? (
                <p className="text-muted text-center py-5">
                  No transactions yet. Create your first transaction!
                </p>
              ) : (
                <div className="table-responsive">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Agent</th>
                        <th>Created By</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction) => (
                        <tr key={transaction._id}>
                          <td>{formatDate(transaction.created_at)}</td>
                          <td className="fw-bold">
                            {formatCurrency(transaction.amount)}
                          </td>
                          <td>
                            {transaction.agent_id ? (
                              <>
                                {transaction.agent_id.first_name}{" "}
                                {transaction.agent_id.last_name}
                                <br />
                                <small className="text-muted">
                                  {transaction.agent_id.email}
                                </small>
                              </>
                            ) : (
                              <span className="text-muted">Deleted Agent</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Confirmation Modal */}
      <ConfirmationModal
        show={showModal}
        title="Confirm Transaction"
        message={
          <>
            <p>Are you sure you want to create this transaction?</p>
            <div className="bg-light p-3 rounded">
              <p className="mb-1">
                <strong>Amount:</strong> {formatCurrency(amount || 0)}
              </p>
              {selectedAgent && (
                <p className="mb-0">
                  <strong>Agent:</strong> {selectedAgent.first_name}{" "}
                  {selectedAgent.last_name} ({selectedAgent.email})
                </p>
              )}
            </div>
          </>
        }
        onConfirm={handleConfirmTransaction}
        onCancel={() => setShowModal(false)}
      />
    </Container>
  );
}

export default TransactionManagement;
