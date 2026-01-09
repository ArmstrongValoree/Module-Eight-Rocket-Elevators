import { Alert as BootstrapAlert } from 'react-bootstrap';
import { useEffect } from 'react';

function Alert({ message, variant, show, onClose, autoCloseDelay = 5000 }) {
  useEffect(() => {
    if (show && autoCloseDelay > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      // Cleanup function to clear timeout if component unmounts
      return () => clearTimeout(timer);
    }
  }, [show, autoCloseDelay, onClose]);

  if (!show) return null;

  return (
    <BootstrapAlert 
      variant={variant} 
      onClose={onClose} 
      dismissible
      className="position-fixed top-0 end-0 m-3"
      style={{ zIndex: 9999, minWidth: '300px' }}
    >
      <strong>{variant === 'success' ? '✓ Success!' : '✗ Error!'}</strong>
      <div>{message}</div>
    </BootstrapAlert>
  );
}

export default Alert;