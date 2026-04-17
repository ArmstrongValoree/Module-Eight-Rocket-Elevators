import { Alert as BootstrapAlert } from 'react-bootstrap';
import { useEffect } from 'react';

function Alert({ message, variant = 'success', show = false, onClose, duration = 5000 }) {
  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

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