import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { caseStudyService, generateSlug, isSlugUnique } from '../../services/mock-cms.service';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import './CaseStudyEditor.css';

const CaseStudyEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        clientName: '',
        industry: '',
        service: '',
        subtitle: '',
        heroImage: '',
        problem: '',
        solution: '',
        results: '',
        metrics: [{ label: '', value: '' }],
        servicesProvided: [''],
        galleryImages: [],
        seoTitle: '',
        seoDescription: '',
        status: 'draft',
        order: 0
    });

    const [loading, setLoading] = useState(isEditMode);
    const [saving, setSaving] = useState(false);
    const [slugEdited, setSlugEdited] = useState(false);

    useEffect(() => {
        if (isEditMode) {
            loadCaseStudy();
        }
    }, [id]);

    const loadCaseStudy = async () => {
        try {
            const cs = await caseStudyService.getCaseStudyById(id);
            if (cs) {
                setFormData(cs);
                setSlugEdited(true);
            }
        } catch (error) {
            console.error('Error loading case study:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleTitleChange = (title) => {
        setFormData(prev => ({ ...prev, title }));
        if (!slugEdited) {
            setFormData(prev => ({ ...prev, slug: generateSlug(title) }));
        }
    };

    const handleSlugChange = (slug) => {
        setSlugEdited(true);
        setFormData(prev => ({ ...prev, slug }));
    };

    const handleAddMetric = () => {
        setFormData(prev => ({
            ...prev,
            metrics: [...prev.metrics, { label: '', value: '' }]
        }));
    };

    const handleRemoveMetric = (index) => {
        setFormData(prev => ({
            ...prev,
            metrics: prev.metrics.filter((_, i) => i !== index)
        }));
    };

    const handleMetricChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            metrics: prev.metrics.map((m, i) => i === index ? { ...m, [field]: value } : m)
        }));
    };

    const handleAddService = () => {
        setFormData(prev => ({
            ...prev,
            servicesProvided: [...prev.servicesProvided, '']
        }));
    };

    const handleRemoveService = (index) => {
        setFormData(prev => ({
            ...prev,
            servicesProvided: prev.servicesProvided.filter((_, i) => i !== index)
        }));
    };

    const handleServiceChange = (index, value) => {
        setFormData(prev => ({
            ...prev,
            servicesProvided: prev.servicesProvided.map((s, i) => i === index ? value : s)
        }));
    };

    const handleSave = async (status = 'draft') => {
        if (!formData.title.trim()) {
            alert('Please enter a title');
            return;
        }

        if (!formData.slug.trim()) {
            alert('Please enter a slug');
            return;
        }

        const unique = await isSlugUnique('caseStudies', formData.slug, id);
        if (!unique) {
            alert('This slug is already in use.');
            return;
        }

        setSaving(true);

        try {
            const caseStudyData = {
                ...formData,
                status,
                servicesProvided: formData.servicesProvided.filter(s => s.trim()),
                metrics: formData.metrics.filter(m => m.label || m.value)
            };

            if (isEditMode) {
                await caseStudyService.updateCaseStudy(id, caseStudyData);
            } else {
                await caseStudyService.createCaseStudy(caseStudyData);
            }

            alert(`Case study ${status === 'published' ? 'published' : 'saved'} successfully!`);
            navigate('/admin/case-studies');
        } catch (error) {
            console.error('Error saving case study:', error);
            alert('Failed to save case study');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="loading-container">Loading case study...</div>;
    }

    return (
        <div className="case-study-editor">
            <div className="editor-header">
                <button className="back-btn" onClick={() => navigate('/admin/case-studies')}>
                    <ArrowLeft size={20} />
                    Back to Case Studies
                </button>
                <div className="header-actions">
                    <Button variant="secondary" onClick={() => handleSave('draft')} disabled={saving}>
                        <Save size={18} />
                        Save Draft
                    </Button>
                    <Button variant="primary" onClick={() => handleSave('published')} disabled={saving}>
                        <Eye size={18} />
                        Publish
                    </Button>
                </div>
            </div>

            <div className="editor-content">
                <Card className="editor-card">
                    <h2>{isEditMode ? 'Edit Case Study' : 'Create New Case Study'}</h2>

                    <div className="form-group">
                        <label>Title *</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => handleTitleChange(e.target.value)}
                            placeholder="Enter case study title"
                            className="input-large"
                        />
                    </div>

                    <div className="form-group">
                        <label>Slug *</label>
                        <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) => handleSlugChange(e.target.value)}
                            placeholder="case-study-slug"
                        />
                        <small>URL: /case-studies/{formData.slug}</small>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Client Name</label>
                            <input
                                type="text"
                                value={formData.clientName}
                                onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                                placeholder="Client name"
                            />
                        </div>

                        <div className="form-group">
                            <label>Industry</label>
                            <input
                                type="text"
                                value={formData.industry}
                                onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                                placeholder="e.g., SaaS"
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Service</label>
                            <input
                                type="text"
                                value={formData.service}
                                onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
                                placeholder="e.g., LinkedIn Lead Generation"
                            />
                        </div>

                        <div className="form-group">
                            <label>Order</label>
                            <input
                                type="number"
                                value={formData.order}
                                onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Subtitle</label>
                        <input
                            type="text"
                            value={formData.subtitle}
                            onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                            placeholder="Brief description"
                        />
                    </div>

                    <div className="form-group">
                        <label>Problem / Challenge</label>
                        <textarea
                            value={formData.problem}
                            onChange={(e) => setFormData(prev => ({ ...prev, problem: e.target.value }))}
                            placeholder="Describe the client's problem..."
                            rows={6}
                        />
                    </div>

                    <div className="form-group">
                        <label>Solution</label>
                        <textarea
                            value={formData.solution}
                            onChange={(e) => setFormData(prev => ({ ...prev, solution: e.target.value }))}
                            placeholder="Describe your solution..."
                            rows={6}
                        />
                    </div>

                    <div className="form-group">
                        <label>Results</label>
                        <textarea
                            value={formData.results}
                            onChange={(e) => setFormData(prev => ({ ...prev, results: e.target.value }))}
                            placeholder="Describe the results achieved..."
                            rows={6}
                        />
                    </div>

                    <div className="form-group">
                        <label>Metrics</label>
                        {formData.metrics.map((metric, index) => (
                            <div key={index} className="metric-row">
                                <input
                                    type="text"
                                    value={metric.value}
                                    onChange={(e) => handleMetricChange(index, 'value', e.target.value)}
                                    placeholder="Value (e.g., +180%)"
                                />
                                <input
                                    type="text"
                                    value={metric.label}
                                    onChange={(e) => handleMetricChange(index, 'label', e.target.value)}
                                    placeholder="Label (e.g., Pipeline Growth)"
                                />
                                <button type="button" onClick={() => handleRemoveMetric(index)} className="remove-btn">×</button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddMetric} className="add-btn">+ Add Metric</button>
                    </div>

                    <div className="form-group">
                        <label>Services Provided</label>
                        {formData.servicesProvided.map((service, index) => (
                            <div key={index} className="service-row">
                                <input
                                    type="text"
                                    value={service}
                                    onChange={(e) => handleServiceChange(index, e.target.value)}
                                    placeholder="Service name"
                                />
                                <button type="button" onClick={() => handleRemoveService(index)} className="remove-btn">×</button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddService} className="add-btn">+ Add Service</button>
                    </div>

                    <div className="seo-section">
                        <h3>SEO Settings</h3>
                        <div className="form-group">
                            <label>SEO Title</label>
                            <input
                                type="text"
                                value={formData.seoTitle}
                                onChange={(e) => setFormData(prev => ({ ...prev, seoTitle: e.target.value }))}
                                placeholder="SEO optimized title"
                            />
                        </div>

                        <div className="form-group">
                            <label>SEO Description</label>
                            <textarea
                                value={formData.seoDescription}
                                onChange={(e) => setFormData(prev => ({ ...prev, seoDescription: e.target.value }))}
                                placeholder="SEO meta description"
                                rows={2}
                            />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default CaseStudyEditor;
