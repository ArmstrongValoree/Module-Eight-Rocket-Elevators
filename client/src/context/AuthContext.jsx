import { createContext, useContext, useState, useEffect } from 'react';
import useCookie from 'react-use-cookie';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Correct usage of react-use-cookie
  const [sessionToken, setSessionToken] = useCookie('session_token', '');

  // Check for existing session on mount
  useEffect(() => {
    const validateSession = async () => {
      if (sessionToken) {
        try {
          // TODO: Replace with real API call on Day 5
          // For now, simulate validation
          console.log('Validating session token:', sessionToken);
          
          // Mock successful validation
          const mockUser = {
            id: '123',
            firstName: 'Demo',
            lastName: 'User',
            email: 'demo@rocketelevators.com'
          };
          
          setUser(mockUser);
        } catch (error) {
          console.error('Session validation failed:', error);
          setSessionToken(''); // Clear invalid token
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
      // TODO: Replace with real API call on Day 5
      console.log('Logging in:', email);
      
      // Mock successful login
      const mockToken = 'mock-session-token-' + Date.now();
      const mockUser = {
        id: '123',
        firstName: 'Demo',
        lastName: 'User',
        email: email
      };

      // Set cookie with token
      setSessionToken(mockToken);
      setUser(mockUser);
      
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = () => {
    setSessionToken(''); // Clear cookie
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