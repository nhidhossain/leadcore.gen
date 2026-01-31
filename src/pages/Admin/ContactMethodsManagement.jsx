import React, { useState, useEffect } from 'react';
import { Phone, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { contactMethodService } from '../../services/mock-cms.service';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import './ContactMethodsManagement.css';

const ContactMethodsManagement = () => {
    const [methods, setMethods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingMethod, setEditingMethod] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        loadMethods();
    }, []);

    const loadMethods = async () => {
        try {
            const data = await contactMethodService.getAllMethods();
            setMethods(data);
        } catch (error) {
            console.error('Error loading contact methods:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (methodData) => {
        try {
            if (editingMethod) {
                await contactMethodService.updateMethod(editingMethod.id, methodData);
            } else {
                await contactMethodService.createMethod(methodData);
            }
            loadMethods();
            setShowForm(false);
            setEditingMethod(null);
        } catch (error) {
            console.error('Error saving contact method:', error);
            alert('Failed to save contact method');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this contact method?')) return;

        try {
            await contactMethodService.deleteMethod(id);
            setMethods(methods.filter(m => m.id !== id));
        } catch (error) {
            console.error('Error deleting method:', error);
            alert('Failed to delete contact method');
        }
    };

    const toggleVisibility = async (method) => {
        try {
            await contactMethodService.updateMethod(method.id, { ...method, visible: !method.visible });
            loadMethods();
        } catch (error) {
            console.error('Error toggling visibility:', error);
        }
    };

    if (loading) {
        return <div className="loading-container">Loading contact methods...</div>;
    }

    return (
        <div className="contact-methods-management">
            <div className="page-header">
                <div>
                    <h1>Contact Methods</h1>
                    <p>Manage your contact information</p>
                </div>
                <Button variant="primary" onClick={() => { setShowForm(true); setEditingMethod(null); }}>
                    <Plus size={20} />
                    Add Contact Method
                </Button>
            </div>

            {showForm && (
                <ContactMethodForm
                    method={editingMethod}
                    onSave={handleSave}
                    onCancel={() => { setShowForm(false); setEditingMethod(null); }}
                />
            )}

            {methods.length === 0 ? (
                <Card className="empty-state">
                    <Phone size={48} color="var(--text-muted)" />
                    <h3>No contact methods found</h3>
                    <p>Add your first contact method</p>
                    <Button variant="primary" onClick={() => setShowForm(true)}>
                        Add Contact Method
                    </Button>
                </Card>
            ) : (
                <div className="methods-grid">
                    {methods.map((method) => (
                        <Card key={method.id} className="method-card">
                            <div className="method-icon">
                                {method.icon || '📞'}
                            </div>

                            <div className="method-info">
                                <h3>{method.type || 'Unnamed'}</h3>
                                <p className="method-value">{method.value || 'No value'}</p>
                                {method.description && <p className="method-desc">{method.description}</p>}
                            </div>

                            <div className="method-meta">
                                <span className={`visibility-badge ${method.visible ? 'visible' : 'hidden'}`}>
                                    {method.visible ? 'Visible' : 'Hidden'}
                                </span>
                                <span>Order: {method.order || 0}</span>
                            </div>

                            <div className="method-actions">
                                <button className="action-btn edit" onClick={() => { setEditingMethod(method); setShowForm(true); }}>
                                    <Edit size={16} />
                                </button>
                                <button className="action-btn toggle" onClick={() => toggleVisibility(method)}>
                                    {method.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                                </button>
                                <button className="action-btn delete" onClick={() => handleDelete(method.id)}>
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

const ContactMethodForm = ({ method, onSave, onCancel }) => {
    const [formData, setFormData] = useState(method || {
        type: '',
        value: '',
        description: '',
        icon: '📞',
        link: '',
        order: 0,
        visible: true
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Card className="contact-method-form">
            <h2>{method ? 'Edit' : 'Add'} Contact Method</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label>Type *</label>
                        <select
                            required
                            value={formData.type}
                            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                        >
                            <option value="">Select type</option>
                            <option value="Phone">Phone</option>
                            <option value="Email">Email</option>
                            <option value="Address">Address</option>
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="Twitter">Twitter</option>
                            <option value="WhatsApp">WhatsApp</option>
                            <option value="Calendly">Calendly</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Icon (Emoji)</label>
                        <input
                            value={formData.icon}
                            onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                            placeholder="📞"
                            maxLength={2}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Value *</label>
                    <input
                        required
                        value={formData.value}
                        onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
                        placeholder="e.g., +1 (555) 123-4567"
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <input
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="e.g., Call us Mon-Fri 9AM-5PM"
                    />
                </div>

                <div className="form-group">
                    <label>Link (optional)</label>
                    <input
                        value={formData.link}
                        onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                        placeholder="e.g., tel:+15551234567 or mailto:email@example.com"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Order</label>
                        <input
                            type="number"
                            value={formData.order}
                            onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                        />
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
                </div>

                <div className="form-actions">
                    <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
                    <Button type="submit" variant="primary">Save Method</Button>
                </div>
            </form>
        </Card>
    );
};

export default ContactMethodsManagement;
