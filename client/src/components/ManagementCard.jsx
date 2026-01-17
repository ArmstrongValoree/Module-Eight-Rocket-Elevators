import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ManagementCard({ title, description, icon, link }) {
  return (
    <Card className="h-100 shadow-sm hover-card" style={{ cursor: 'pointer' }}>
      <Link to={link} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Card.Body className="d-flex flex-column align-items-center text-center p-4">
          <div className="mb-3" style={{ fontSize: '3rem' }}>
            {icon}
          </div>
          <Card.Title className="mb-2">{title}</Card.Title>
          <Card.Text className="text-muted">
            {description}
          </Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
}

export default ManagementCard;