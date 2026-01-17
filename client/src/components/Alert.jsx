import { Alert as BootstrapAlert } from 'react-bootstrap';
import { useEffect } from 'react';

function Alert({ message, variant = 'success', onClose, duration = 5000 }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 9999,
      minWidth: '300px',
      maxWidth: '500px'
    }}>
      <BootstrapAlert variant={variant} onClose={onClose} dismissible>
        <strong>{variant === 'success' ? '✓ Success!' : '✗ Error!'}</strong>
        <div>{message}</div>
      </BootstrapAlert>
    </div>
  );
}

export default Alert;