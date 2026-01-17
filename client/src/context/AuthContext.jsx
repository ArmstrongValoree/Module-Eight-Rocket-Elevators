import { createContext, useContext, useState, useEffect } from 'react';
import useCookie from 'react-use-cookie';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionToken, setSessionToken] = useCookie('session_token', '');

  // Check for existing session on mount
  useEffect(() => {
    const validateSession = async () => {
      if (sessionToken) {
        try {
          // Call real API to validate token
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/session/validate_token?token=${sessionToken}`,
            {
              method: 'GET',
              credentials: 'include'
            }
          );

          const data = await response.json();

          if (data.status === 'ok' && data.data.valid) {
            setUser(data.data.user);
          } else {
            // Invalid or expired session
            setSessionToken('');
            setUser(null);
          }
        } catch (error) {
          console.error('Session validation failed:', error);
          setSessionToken('');
          setUser(null);
        }
      }
      setLoading(false);
    };

    validateSession();
  }, [sessionToken, setSessionToken]);

  // Login function
  const login = async (email, password) => {
    try {
      // Call real API to create session
      const response = await fetch(`${import.meta.env.VITE_API_URL}/session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.status === 'ok') {
        // Save token to cookie
        setSessionToken(data.data.token);
        setUser(data.data.user);
        
        return { success: true };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  // Logout function
  const logout = () => {
    setSessionToken('');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}