import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockAuth } from '../services/mock-cms.service';

const AuthContext = createContext({});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check for existing session
        const currentUser = mockAuth.getCurrentUser();
        setUser(currentUser);
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            setError(null);
            const user = await mockAuth.login(email, password);
            setUser(user);
            return user;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await mockAuth.logout();
            setUser(null);
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const resetPassword = async (email) => {
        // Mock password reset
        console.log('Password reset requested for:', email);
        alert('Password reset link sent to ' + email);
    };

    const value = {
        user,
        loading,
        error,
        login,
        logout,
        resetPassword,
        isAuthenticated: !!user
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
