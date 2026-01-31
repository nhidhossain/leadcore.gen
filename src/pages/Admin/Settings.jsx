import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { Settings as SettingsIcon, User, Database, Lock } from 'lucide-react';
import './Settings.css';

const Settings = () => {
    const { user, logout } = useAuth();

    const handleExportData = () => {
        const data = {
            blogs: JSON.parse(localStorage.getItem('leadcore_cms_blogs') || '[]'),
            caseStudies: JSON.parse(localStorage.getItem('leadcore_cms_caseStudies') || '[]'),
            pricingPlans: JSON.parse(localStorage.getItem('leadcore_cms_pricingPlans') || '[]'),
            teamMembers: JSON.parse(localStorage.getItem('leadcore_cms_teamMembers') || '[]'),
            contactMethods: JSON.parse(localStorage.getItem('leadcore_cms_contactMethods') || '[]')
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `leadcore-cms-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleClearData = () => {
        if (!confirm('Are you sure you want to clear ALL data? This cannot be undone!')) return;
        if (!confirm('This will delete all blogs, case studies, pricing plans, team members, and contact methods. Are you ABSOLUTELY sure?')) return;

        localStorage.removeItem('leadcore_cms_blogs');
        localStorage.removeItem('leadcore_cms_caseStudies');
        localStorage.removeItem('leadcore_cms_pricingPlans');
        localStorage.removeItem('leadcore_cms_teamMembers');
        localStorage.removeItem('leadcore_cms_contactMethods');
        localStorage.removeItem('leadcore_cms_initialized');

        alert('All data has been cleared. The page will reload.');
        window.location.reload();
    };

    return (
        <div className="settings-page">
            <div className="page-header">
                <div>
                    <h1>Settings</h1>
                    <p>Manage your CMS configuration</p>
                </div>
            </div>

            {/* Account Info */}
            <Card className="settings-card">
                <div className="settings-section-header">
                    <User size={20} />
                    <h3>Account Information</h3>
                </div>
                <div className="settings-content">
                    <div className="info-row">
                        <span className="label">Email:</span>
                        <span className="value">{user?.email || 'Not logged in'}</span>
                    </div>
                    <div className="info-row">
                        <span className="label">User ID:</span>
                        <span className="value">{user?.uid || 'N/A'}</span>
                    </div>
                    <Button variant="secondary" onClick={logout}>
                        <Lock size={16} />
                        Logout
                    </Button>
                </div>
            </Card>

            {/* Backend Info */}
            <Card className="settings-card">
                <div className="settings-section-header">
                    <Database size={20} />
                    <h3>Backend Storage</h3>
                </div>
                <div className="settings-content">
                    <div className="info-box info">
                        <p><strong>Current Backend:</strong> localStorage (Development Mode)</p>
                        <p>All data is stored locally in your browser. This is perfect for development and testing.</p>
                    </div>

                    <div className="storage-info">
                        <div className="storage-item">
                            <span>Blogs:</span>
                            <span>{JSON.parse(localStorage.getItem('leadcore_cms_blogs') || '[]').length}</span>
                        </div>
                        <div className="storage-item">
                            <span>Case Studies:</span>
                            <span>{JSON.parse(localStorage.getItem('leadcore_cms_caseStudies') || '[]').length}</span>
                        </div>
                        <div className="storage-item">
                            <span>Pricing Plans:</span>
                            <span>{JSON.parse(localStorage.getItem('leadcore_cms_pricingPlans') || '[]').length}</span>
                        </div>
                        <div className="storage-item">
                            <span>Team Members:</span>
                            <span>{JSON.parse(localStorage.getItem('leadcore_cms_teamMembers') || '[]').length}</span>
                        </div>
                        <div className="storage-item">
                            <span>Contact Methods:</span>
                            <span>{JSON.parse(localStorage.getItem('leadcore_cms_contactMethods') || '[]').length}</span>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Data Actions */}
            <Card className="settings-card">
                <div className="settings-section-header">
                    <SettingsIcon size={20} />
                    <h3>Data Management</h3>
                </div>
                <div className="settings-content">
                    <div className="info-box warning">
                        <p><strong>⚠️ Migrate to Firebase for Production</strong></p>
                        <p>For production use, follow the instructions in <code>FIREBASE_SETUP.md</code> to migrate to Firebase.</p>
                    </div>

                    <div className="action-buttons">
                        <Button variant="secondary" onClick={handleExportData}>
                            Export All Data (JSON)
                        </Button>
                        <Button variant="secondary" onClick={handleClearData} className="danger-btn">
                            Clear All Data
                        </Button>
                    </div>

                    <div className="info-box info" style={{ marginTop: '20px' }}>
                        <p><strong>💡 Tips:</strong></p>
                        <ul>
                            <li>Export your data regularly to create backups</li>
                            <li>Use the exported JSON to migrate to Firebase</li>
                            <li>Clear data only when starting fresh</li>
                        </ul>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Settings;
