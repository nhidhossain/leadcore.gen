import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Home, FileText, Briefcase, DollarSign, Users, Mail, Settings, LogOut } from 'lucide-react';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/admin/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const navigation = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: Home },
        { name: 'Blog Posts', path: '/admin/blog', icon: FileText },
        { name: 'Case Studies', path: '/admin/case-studies', icon: Briefcase },
        { name: 'Pricing Plans', path: '/admin/pricing', icon: DollarSign },
        { name: 'Team Members', path: '/admin/team', icon: Users },
        { name: 'Contact Methods', path: '/admin/contact-methods', icon: Mail },
        { name: 'Settings', path: '/admin/settings', icon: Settings }
    ];

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <h2>LeadCore CMS</h2>
                </div>

                <nav className="sidebar-nav">
                    {navigation.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="nav-item"
                        >
                            <item.icon size={20} />
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div className="user-info">
                        <div className="user-avatar">
                            {user?.email?.charAt(0).toUpperCase()}
                        </div>
                        <div className="user-details">
                            <p className="user-email">{user?.email}</p>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="logout-btn">
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                <div className="admin-content">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
