import React, { createContext, useState, useEffect} from 'react';
export const AuthContext = createContext({
  user: null,
  setUser: () => {},
  login: () => {},
  logout: () => {}
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const checkUserAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://localhost:4000/profile', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await response.json();
          if (data.status === 'valid') {
            setUser(data.Doctor);
          } else {
            throw new Error('Invalid token');
          }
        } catch (err) {
          console.error('Error fetching profile:', err);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
    };

    checkUserAuth();
  }, []);

  const login = async (data) => {
    setUser(data.userInfo);
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
