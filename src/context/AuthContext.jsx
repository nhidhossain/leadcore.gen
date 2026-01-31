import React, { useState } from 'react';

import { mockAuth } from '../services/mock-cms.service';
import { AuthContext } from './AuthContextObject';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => mockAuth.getCurrentUser());
    const [error, setError] = useState(null);



    // No longer need immediate useEffect for session check as we use lazy initializer


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
        loading: false,
        error,
        login,
        logout,
        resetPassword,
        isAuthenticated: !!user
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

