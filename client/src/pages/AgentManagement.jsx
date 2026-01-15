import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Spinner,
  Badge,
  Button,
  Form,
  InputGroup,
  Modal,
} from "react-bootstrap";
import Alert from "../components/Alert";
import ConfirmationModal from "../components/ConfirmationModal";

function AgentManagement() {
  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Create modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    region: "North",
    rating: 0,
    fee: 0,
  });

  // Sort state
  const [sortField, setSortField] = useState("last_name");
  const [sortDirection, setSortDirection] = useState("asc");

  // Edit modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAgent, setEditingAgent] = useState(null);
  const [editForm, setEditForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    region: "",
    rating: "",
    fee: "",
  });

  // Delete confirmation state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingAgent, setDeletingAgent] = useState(null);

  // Alert state
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");

  useEffect(() => {
    fetchAgents();
  }, []);

  useEffect(() => {
    filterAndSortAgents();
  }, [agents, searchTerm, sortField, sortDirection]);

  const fetchAgents = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/agents`);
      const data = await response.json();

      if (data.status === "ok") {
        setAgents(data.data);
      }
    } catch (error) {
      console.error("Error fetching agents:", error);
      setAlertMessage("Failed to load agents");
      setAlertVariant("danger");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortAgents = () => {
    let result = [...agents];

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (agent) =>
          agent._id.toLowerCase().includes(term) ||
          agent.first_name.toLowerCase().includes(term) ||
          agent.last_name.toLowerCase().includes(term) ||
          agent.email.toLowerCase().includes(term)
      );
    }

    // Sort
    result.sort((a, b) => {
      let aValue, bValue;

      switch (sortField) {
        case "first_name":
          aValue = a.first_name.toLowerCase();
          bValue = b.first_name.toLowerCase();
          break;
        case "last_name":
          aValue = a.last_name.toLowerCase();
          bValue = b.last_name.toLowerCase();
          break;
        case "region":
          aValue = a.region;
          bValue = b.region;
          break;
        case "rating":
          aValue = a.rating;
          bValue = b.rating;
          break;
        case "fee":
          aValue = a.fee;
          bValue = b.fee;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredAgents(result);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return " ↕";
    return sortDirection === "asc" ? " ↑" : " ↓";
  };

  const handleEditClick = (agent) => {
    setEditingAgent(agent);
    setEditForm({
      first_name: agent.first_name,
      last_name: agent.last_name,
      email: agent.email,
      region: agent.region,
      rating: agent.rating,
      fee: agent.fee,
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/agents/${editingAgent._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editForm),
        }
      );

      const data = await response.json();

      if (data.status === "ok") {
        setAlertMessage("Agent updated successfully!");
        setAlertVariant("success");
        setShowAlert(true);
        setShowEditModal(false);
        fetchAgents();
      } else {
        setAlertMessage(data.message || "Failed to update agent");
        setAlertVariant("danger");
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error updating agent:", error);
      setAlertMessage("Network error. Please try again.");
      setAlertVariant("danger");
      setShowAlert(true);
    }
  };

  const handleCreateClick = () => {
    setCreateForm({
      first_name: "",
      last_name: "",
      email: "",
      region: "North",
      rating: 0,
      fee: 0,
    });
    setShowCreateModal(true);
  };
  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/agents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createForm),
      });

      const data = await response.json();

      if (data.status === "ok") {
        setAlertMessage("Agent created successfully!");
        setAlertVariant("success");
        setShowAlert(true);
        setShowCreateModal(false);
        fetchAgents();
      } else {
        setAlertMessage(data.message || "Failed to create agent");
        setAlertVariant("danger");
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error creating agent:", error);
      setAlertMessage("Network error. Please try again.");
      setAlertVariant("danger");
      setShowAlert(true);
    }
  };

  const handleDeleteClick = (agent) => {
    setDeletingAgent(agent);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setShowDeleteModal(false);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/agents/${deletingAgent._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.status === "ok") {
        setAlertMessage("Agent deleted successfully!");
        setAlertVariant("success");
        setShowAlert(true);
        fetchAgents();
      } else {
        setAlertMessage(data.message || "Failed to delete agent");
        setAlertVariant("danger");
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error deleting agent:", error);
      setAlertMessage("Network error. Please try again.");
      setAlertVariant("danger");
      setShowAlert(true);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getRegionColor = (region) => {
    const colors = {
      North: "primary",
      South: "success",
      East: "warning",
      West: "danger",
    };
    return colors[region] || "secondary";
  };

  const getRatingColor = (rating) => {
    if (rating >= 90) return "success";
    if (rating >= 75) return "warning";
    return "danger";
  };

  return (
    <>
      {showAlert && (
        <Alert
          message={alertMessage}
          variant={alertVariant}
          onClose={() => setShowAlert(false)}
        />
      )}

      <Container fluid className="px-4 py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">Agent Management</h1>
          <Button variant="primary" onClick={handleCreateClick}>
            + Create New Agent
          </Button>
        </div>

        {/* Search and Controls */}
        <Card className="mb-4">
          <Card.Body>
            <Row>
              <Col md={6}>
                <InputGroup>
                  <InputGroup.Text>🔍</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search by ID, name, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <Button
                      variant="outline-secondary"
                      onClick={() => setSearchTerm("")}
                    >
                      Clear
                    </Button>
                  )}
                </InputGroup>
              </Col>
              <Col md={6} className="text-end">
                <span className="text-muted">
                  Showing {filteredAgents.length} of {agents.length} agents
                </span>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Agents Table */}
        <Card>
          <Card.Body>
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" />
                <p className="mt-2">Loading agents...</p>
              </div>
            ) : filteredAgents.length === 0 ? (
              <p className="text-muted text-center py-5">
                {searchTerm
                  ? "No agents match your search."
                  : "No agents found."}
              </p>
            ) : (
              <div className="table-responsive">
                <Table striped bordered hover>
                  <thead>
                    <tr className="text-center">
                      <th>ID</th>
                      <th
                        onClick={() => handleSort("first_name")}
                        style={{ cursor: "pointer", userSelect: "none" }}
                      >
                        First Name{getSortIcon("first_name")}
                      </th>
                      <th
                        onClick={() => handleSort("last_name")}
                        style={{ cursor: "pointer", userSelect: "none" }}
                      >
                        Last Name{getSortIcon("last_name")}
                      </th>
                      <th>Email</th>
                      <th
                        onClick={() => handleSort("region")}
                        style={{ cursor: "pointer", userSelect: "none" }}
                      >
                        Region{getSortIcon("region")}
                      </th>
                      <th
                        onClick={() => handleSort("rating")}
                        style={{ cursor: "pointer", userSelect: "none" }}
                      >
                        Rating{getSortIcon("rating")}
                      </th>
                      <th
                        onClick={() => handleSort("fee")}
                        style={{ cursor: "pointer", userSelect: "none" }}
                      >
                        Fee{getSortIcon("fee")}
                      </th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAgents.map((agent) => (
                      <tr key={agent._id} className="text-center">
                        <td>
                          <small className="text-muted font-monospace">
                            {agent._id}
                          </small>
                        </td>
                        <td>{agent.first_name}</td>
                        <td>{agent.last_name}</td>
                        <td>{agent.email}</td>
                        <td>{agent.region}</td>
                        <td>
                          <span
                            className={`text-${getRatingColor(agent.rating)}`}
                          >
                            {agent.rating}%
                          </span>
                        </td>
                        <td>{formatCurrency(agent.fee)}</td>
                        <td>
                          <div className="d-flex gap-1 justify-content-center">
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => handleEditClick(agent)}
                              style={{ minWidth: "60px" }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => handleDeleteClick(agent)}
                              style={{ minWidth: "60px" }}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </Card.Body>
        </Card>

        {/* Statistics Cards */}
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
                  {agents.filter((a) => a.rating >= 90).length}
                </h3>
                <p className="text-muted mb-0">High Rated (90+)</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center">
              <Card.Body>
                <h3 className="text-warning">
                  {formatCurrency(
                    agents.reduce((sum, a) => sum + a.fee, 0) / agents.length ||
                      0
                  )}
                </h3>
                <p className="text-muted mb-0">Average Fee</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center">
              <Card.Body>
                <h3 className="text-info">
                  {new Set(agents.map((a) => a.region)).size}
                </h3>
                <p className="text-muted mb-0">Regions Covered</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Create Agent Modal */}
      <Modal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create New Agent</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={createForm.first_name}
                    onChange={(e) =>
                      setCreateForm({
                        ...createForm,
                        first_name: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={createForm.last_name}
                    onChange={(e) =>
                      setCreateForm({
                        ...createForm,
                        last_name: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={createForm.email}
                onChange={(e) =>
                  setCreateForm({ ...createForm, email: e.target.value })
                }
                required
              />
            </Form.Group>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Region</Form.Label>
                  <Form.Select
                    value={createForm.region}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, region: e.target.value })
                    }
                    required
                  >
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="East">East</option>
                    <option value="West">West</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Rating (%)</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    max="100"
                    value={createForm.rating}
                    onChange={(e) =>
                      setCreateForm({
                        ...createForm,
                        rating: parseInt(e.target.value),
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Fee ($)</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    step="1"
                    value={createForm.fee}
                    onChange={(e) =>
                      setCreateForm({
                        ...createForm,
                        fee: parseInt(e.target.value),
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="secondary"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Create Agent
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Agent</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={editForm.first_name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, first_name: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={editForm.last_name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, last_name: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={editForm.email}
                onChange={(e) =>
                  setEditForm({ ...editForm, email: e.target.value })
                }
                required
              />
            </Form.Group>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Region</Form.Label>
                  <Form.Select
                    value={editForm.region}
                    onChange={(e) =>
                      setEditForm({ ...editForm, region: e.target.value })
                    }
                    required
                  >
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="East">East</option>
                    <option value="West">West</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Rating (%)</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    max="100"
                    value={editForm.rating}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        rating: parseInt(e.target.value),
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Fee ($)</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    step="1"
                    value={editForm.fee}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        fee: parseInt(e.target.value),
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="secondary"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        show={showDeleteModal}
        title="Delete Agent"
        message={
          <>
            <p>Are you sure you want to delete this agent?</p>
            {deletingAgent && (
              <div className="bg-light p-3 rounded">
                <p className="mb-1">
                  <strong>Name:</strong> {deletingAgent.first_name}{" "}
                  {deletingAgent.last_name}
                </p>
                <p className="mb-0">
                  <strong>Email:</strong> {deletingAgent.email}
                </p>
              </div>
            )}
            <p className="text-danger mt-2 mb-0">
              <strong>Warning:</strong> This action cannot be undone.
            </p>
          </>
        }
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  );
}

export default AgentManagement;
