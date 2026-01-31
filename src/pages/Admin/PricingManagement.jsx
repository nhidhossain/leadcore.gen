import React, { useState, useEffect } from 'react';
import { DollarSign, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { pricingService } from '../../services/mock-cms.service';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import './PricingManagement.css';

const PricingManagement = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingPlan, setEditingPlan] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        loadPlans();
    }, []);

    const loadPlans = async () => {
        try {
            const data = await pricingService.getAllPlans();
            setPlans(data);
        } catch (error) {
            console.error('Error loading pricing plans:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (planData) => {
        try {
            if (editingPlan) {
                await pricingService.updatePlan(editingPlan.id, planData);
            } else {
                await pricingService.createPlan(planData);
            }
            loadPlans();
            setShowForm(false);
            setEditingPlan(null);
        } catch (error) {
            console.error('Error saving plan:', error);
            alert('Failed to save pricing plan');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this pricing plan?')) return;

        try {
            await pricingService.deletePlan(id);
            setPlans(plans.filter(p => p.id !== id));
        } catch (error) {
            console.error('Error deleting plan:', error);
            alert('Failed to delete pricing plan');
        }
    };

    const toggleVisibility = async (plan) => {
        try {
            await pricingService.updatePlan(plan.id, { ...plan, visible: !plan.visible });
            loadPlans();
        } catch (error) {
            console.error('Error toggling visibility:', error);
        }
    };

    if (loading) {
        return <div className="loading-container">Loading pricing plans...</div>;
    }

    return (
        <div className="pricing-management">
            <div className="page-header">
                <div>
                    <h1>Pricing Plans</h1>
                    <p>Manage your pricing tiers</p>
                </div>
                <Button variant="primary" onClick={() => { setShowForm(true); setEditingPlan(null); }}>
                    <Plus size={20} />
                    Create Pricing Plan
                </Button>
            </div>

            {showForm ? (
                <PricingForm
                    plan={editingPlan}
                    onSave={handleSave}
                    onCancel={() => { setShowForm(false); setEditingPlan(null); }}
                />
            ) : null}

            {plans.length === 0 ? (
                <Card className="empty-state">
                    <DollarSign size={48} color="var(--text-muted)" />
                    <h3>No pricing plans found</h3>
                    <p>Create your first pricing plan</p>
                    <Button variant="primary" onClick={() => setShowForm(true)}>
                        Create Pricing Plan
                    </Button>
                </Card>
            ) : (
                <div className="pricing-grid">
                    {plans.map((plan) => (
                        <Card key={plan.id} className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`}>
                            <div className="plan-header">
                                <h3>{plan.name}</h3>
                                <div className="plan-price">{plan.price}</div>
                                <div className="plan-billing">{plan.billingType}</div>
                            </div>

                            <div className="plan-features">
                                {plan.features && plan.features.map((feature, i) => (
                                    <div key={i} className="feature-item">✓ {feature}</div>
                                ))}
                            </div>

                            <div className="plan-meta">
                                <span className={`visibility-badge ${plan.visible ? 'visible' : 'hidden'}`}>
                                    {plan.visible ? 'Visible' : 'Hidden'}
                                </span>
                                {plan.highlighted && <span className="highlighted-badge">Highlighted</span>}
                                <span>Order: {plan.order}</span>
                            </div>

                            <div className="plan-actions">
                                <button className="action-btn edit" onClick={() => { setEditingPlan(plan); setShowForm(true); }}>
                                    <Edit size={16} />
                                </button>
                                <button className="action-btn toggle" onClick={() => toggleVisibility(plan)}>
                                    {plan.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                                </button>
                                <button className="action-btn delete" onClick={() => handleDelete(plan.id)}>
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

const PricingForm = ({ plan, onSave, onCancel }) => {
    const [formData, setFormData] = useState(plan || {
        name: '',
        price: '',
        billingType: 'monthly',
        features: [''],
        highlighted: false,
        ctaText: 'Get Started',
        ctaLink: '/free-consultation',
        order: 0,
        visible: true
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...formData,
            features: formData.features.filter(f => f.trim())
        });
    };

    const addFeature = () => {
        setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
    };

    const removeFeature = (index) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }));
    };

    const updateFeature = (index, value) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.map((f, i) => i === index ? value : f)
        }));
    };

    return (
        <Card className="pricing-form">
            <h2>{plan ? 'Edit' : 'Create'} Pricing Plan</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label>Plan Name *</label>
                        <input
                            required
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="e.g., Starter Plan"
                        />
                    </div>
                    <div className="form-group">
                        <label>Price *</label>
                        <input
                            required
                            value={formData.price}
                            onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                            placeholder="e.g., $997"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Billing Type</label>
                        <select
                            value={formData.billingType}
                            onChange={(e) => setFormData(prev => ({ ...prev, billingType: e.target.value }))}
                        >
                            <option value="monthly">Monthly</option>
                            <option value="one-time">One-time</option>
                            <option value="custom">Custom</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Order</label>
                        <input
                            type="number"
                            value={formData.order}
                            onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Features</label>
                    {formData.features.map((feature, index) => (
                        <div key={index} className="feature-input-row">
                            <input
                                value={feature}
                                onChange={(e) => updateFeature(index, e.target.value)}
                                placeholder="Feature description"
                            />
                            <button type="button" onClick={() => removeFeature(index)} className="remove-btn">×</button>
                        </div>
                    ))}
                    <button type="button" onClick={addFeature} className="add-btn">+ Add Feature</button>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>CTA Text</label>
                        <input
                            value={formData.ctaText}
                            onChange={(e) => setFormData(prev => ({ ...prev, ctaText: e.target.value }))}
                            placeholder="Get Started"
                        />
                    </div>
                    <div className="form-group">
                        <label>CTA Link</label>
                        <input
                            value={formData.ctaLink}
                            onChange={(e) => setFormData(prev => ({ ...prev, ctaLink: e.target.value }))}
                            placeholder="/free-consultation"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={formData.highlighted}
                            onChange={(e) => setFormData(prev => ({ ...prev, highlighted: e.target.checked }))}
                        />
                        Highlight this plan (recommended)
                    </label>
                </div>

                <div className="form-group">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={formData.visible}
                            onChange={(e) => setFormData(prev => ({ ...prev, visible: e.target.checked }))}
                        />
                        Visible on website
                    </label>
                </div>

                <div className="form-actions">
                    <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
                    <Button type="submit" variant="primary">Save Plan</Button>
                </div>
            </form>
        </Card>
    );
};

export default PricingManagement;
