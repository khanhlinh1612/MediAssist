import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const { setUserInfo} = useContext(UserContext);
    useEffect(() => {
        // Kiểm tra nếu có token trong localStorage và xác thực người dùng
        const token = localStorage.getItem('token');
        if (token) {
            // Gửi token đến API để xác thực và lấy thông tin người dùng
            fetch('http://localhost:4000/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'valid') {
                    setUser(data.Doctor);
                    setUserInfo(data.Doctor);
                }
            })
            .catch(err => {
                console.error('Error fetching profile:', err);
                localStorage.removeItem('token');
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('token', userData.token);
    };

    const logout = () => {
        setUser(null);
        setUserInfo(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ setUser ,user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
