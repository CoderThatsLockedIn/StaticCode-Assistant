import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const { data } = await axios.get('/api/auth/verify', { withCredentials: true });
        setUser(data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false); // Only set loading to false AFTER check completes
      }
    };

    verifySession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
