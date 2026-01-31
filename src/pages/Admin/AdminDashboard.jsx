import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Briefcase, DollarSign, Users, Plus, TrendingUp } from 'lucide-react';
import { blogService, caseStudyService, pricingService, teamService } from '../../services/mock-cms.service';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        blogs: 0,
        publishedBlogs: 0,
        caseStudies: 0,
        pricingPlans: 0,
        teamMembers: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const [blogs, caseStudies, pricing, team] = await Promise.all([
                blogService.getAllBlogs(),
                caseStudyService.getAllCaseStudies(),
                pricingService.getAllPlans(),
                teamService.getAllMembers()
            ]);

            setStats({
                blogs: blogs.length,
                publishedBlogs: blogs.filter(b => b.status === 'published').length,
                caseStudies: caseStudies.length,
                pricingPlans: pricing.length,
                teamMembers: team.length
            });
        } catch (error) {
            console.error('Error loading stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        { title: 'Blog Posts', value: stats.blogs, subtitle: `${stats.publishedBlogs} published`, icon: FileText, color: '#00A493', link: '/admin/blog' },
        { title: 'Case Studies', value: stats.caseStudies, subtitle: 'Total case studies', icon: Briefcase, color: '#6C5CE7', link: '/admin/case-studies' },
        { title: 'Pricing Plans', value: stats.pricingPlans, subtitle: 'Active plans', icon: DollarSign, color: '#FF6B6B', link: '/admin/pricing' },
        { title: 'Team Members', value: stats.teamMembers, subtitle: 'Total members', icon: Users, color: '#4ECDC4', link: '/admin/team' }
    ];

    const quickActions = [
        { title: 'Create Blog Post', icon: FileText, link: '/admin/blog/new', variant: 'primary' },
        { title: 'Add Case Study', icon: Briefcase, link: '/admin/case-studies/new', variant: 'secondary' },
        { title: 'Add Pricing Plan', icon: Plus, link: '/admin/pricing/new', variant: 'secondary' }
    ];

    if (loading) {
        return (
            <div className="loading-container">
                <p>Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <div>
                    <h1>Dashboard</h1>
                    <p>Welcome to your CMS dashboard</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                {statCards.map((stat) => (
                    <Link to={stat.link} key={stat.title} className="stat-card-link">
                        <Card className="stat-card">
                            <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                                <stat.icon size={24} />
                            </div>
                            <div className="stat-content">
                                <h3 className="stat-value">{stat.value}</h3>
                                <p className="stat-title">{stat.title}</p>
                                <p className="stat-subtitle">{stat.subtitle}</p>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="quick-actions-section">
                <h2>Quick Actions</h2>
                <div className="quick-actions-grid">
                    {quickActions.map((action) => (
                        <Link to={action.link} key={action.title}>
                            <Button variant={action.variant} className="quick-action-btn">
                                <action.icon size={20} />
                                {action.title}
                            </Button>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Getting Started */}
            <Card className="info-card">
                <div className="info-header">
                    <TrendingUp size={24} color="var(--primary)" />
                    <h3>Getting Started</h3>
                </div>
                <p>Your CMS is ready to use! Start by creating your first blog post or case study.</p>
                <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    <strong>Current Setup:</strong> Using mock localStorage backend for development.
                    All data is stored locally in your browser.
                </p>
                <p style={{ marginTop: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    When ready for production, we'll migrate to Firebase for cloud storage and real-time sync.
                </p>
            </Card>
        </div>
    );
};

export default AdminDashboard;
