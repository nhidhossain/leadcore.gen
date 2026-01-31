import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, Eye, Briefcase } from 'lucide-react';
import { caseStudyService } from '../../services/mock-cms.service';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import './CaseStudyManagement.css';

const CaseStudyManagement = () => {
    const [caseStudies, setCaseStudies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        loadCaseStudies();
    }, []);

    const loadCaseStudies = async () => {
        try {
            const data = await caseStudyService.getAllCaseStudies();
            setCaseStudies(data);
        } catch (error) {
            console.error('Error loading case studies:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this case study?')) return;

        try {
            await caseStudyService.deleteCaseStudy(id);
            setCaseStudies(caseStudies.filter(cs => cs.id !== id));
        } catch (error) {
            console.error('Error deleting case study:', error);
            alert('Failed to delete case study');
        }
    };

    const filteredCaseStudies = caseStudies.filter(cs => {
        const matchesSearch = cs.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cs.clientName?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || cs.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return <div className="loading-container">Loading case studies...</div>;
    }

    return (
        <div className="case-study-management">
            <div className="page-header">
                <div>
                    <h1>Case Studies</h1>
                    <p>Manage your case study portfolio</p>
                </div>
                <Link to="/admin/case-studies/new">
                    <Button variant="primary">
                        <Plus size={20} />
                        Create Case Study
                    </Button>
                </Link>
            </div>

            <Card className="filters-card">
                <div className="filters-row">
                    <div className="search-box">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Search case studies..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filter-buttons">
                        <button
                            className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
                            onClick={() => setFilterStatus('all')}
                        >
                            All ({caseStudies.length})
                        </button>
                        <button
                            className={`filter-btn ${filterStatus === 'published' ? 'active' : ''}`}
                            onClick={() => setFilterStatus('published')}
                        >
                            Published ({caseStudies.filter(cs => cs.status === 'published').length})
                        </button>
                        <button
                            className={`filter-btn ${filterStatus === 'draft' ? 'active' : ''}`}
                            onClick={() => setFilterStatus('draft')}
                        >
                            Drafts ({caseStudies.filter(cs => cs.status === 'draft').length})
                        </button>
                    </div>
                </div>
            </Card>

            {filteredCaseStudies.length === 0 ? (
                <Card className="empty-state">
                    <Briefcase size={48} color="var(--text-muted)" />
                    <h3>No case studies found</h3>
                    <p>Create your first case study to showcase your work</p>
                    <Link to="/admin/case-studies/new">
                        <Button variant="primary">Create Case Study</Button>
                    </Link>
                </Card>
            ) : (
                <div className="case-studies-grid">
                    {filteredCaseStudies.map((cs) => (
                        <Card key={cs.id} className="case-study-item">
                            <div className="case-study-header">
                                <div>
                                    <h3>{cs.title || 'Untitled'}</h3>
                                    <p className="client-name">{cs.clientName || 'No client'}</p>
                                    <p className="excerpt">{cs.subtitle || 'No description'}</p>
                                </div>
                                <span className={`status-badge ${cs.status}`}>
                                    {cs.status === 'published' ? 'Published' : 'Draft'}
                                </span>
                            </div>

                            <div className="case-study-meta">
                                <span>{cs.service || 'No service'}</span>
                                <span>•</span>
                                <span>{cs.industry || 'No industry'}</span>
                                {cs.order !== undefined && (
                                    <>
                                        <span>•</span>
                                        <span>Order: {cs.order}</span>
                                    </>
                                )}
                            </div>

                            <div className="case-study-actions">
                                <Link to={`/admin/case-studies/edit/${cs.id}`}>
                                    <button className="action-btn edit">
                                        <Edit size={16} />
                                        Edit
                                    </button>
                                </Link>
                                <Link to={`/case-studies/${cs.slug}`} target="_blank">
                                    <button className="action-btn view">
                                        <Eye size={16} />
                                        View
                                    </button>
                                </Link>
                                <button
                                    className="action-btn delete"
                                    onClick={() => handleDelete(cs.id)}
                                >
                                    <Trash2 size={16} />
                                    Delete
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CaseStudyManagement;
