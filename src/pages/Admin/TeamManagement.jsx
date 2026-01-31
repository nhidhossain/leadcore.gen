import React, { useState, useEffect } from 'react';
import { Users, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { teamService } from '../../services/mock-cms.service';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import './TeamManagement.css';

const TeamManagement = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingMember, setEditingMember] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        loadMembers();
    }, []);

    const loadMembers = async () => {
        try {
            const data = await teamService.getAllMembers();
            setMembers(data);
        } catch (error) {
            console.error('Error loading team members:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (memberData) => {
        try {
            if (editingMember) {
                await teamService.updateMember(editingMember.id, memberData);
            } else {
                await teamService.createMember(memberData);
            }
            loadMembers();
            setShowForm(false);
            setEditingMember(null);
        } catch (error) {
            console.error('Error saving team member:', error);
            alert('Failed to save team member');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this team member?')) return;

        try {
            await teamService.deleteMember(id);
            setMembers(members.filter(m => m.id !== id));
        } catch (error) {
            console.error('Error deleting member:', error);
            alert('Failed to delete team member');
        }
    };

    const toggleVisibility = async (member) => {
        try {
            await teamService.updateMember(member.id, { ...member, visible: !member.visible });
            loadMembers();
        } catch (error) {
            console.error('Error toggling visibility:', error);
        }
    };

    if (loading) {
        return <div className="loading-container">Loading team members...</div>;
    }

    return (
        <div className="team-management">
            <div className="page-header">
                <div>
                    <h1>Team Members</h1>
                    <p>Manage your team information</p>
                </div>
                <Button variant="primary" onClick={() => { setShowForm(true); setEditingMember(null); }}>
                    <Plus size={20} />
                    Add Team Member
                </Button>
            </div>

            {showForm && (
                <TeamForm
                    member={editingMember}
                    onSave={handleSave}
                    onCancel={() => { setShowForm(false); setEditingMember(null); }}
                />
            )}

            {members.length === 0 ? (
                <Card className="empty-state">
                    <Users size={48} color="var(--text-muted)" />
                    <h3>No team members found</h3>
                    <p>Add your first team member</p>
                    <Button variant="primary" onClick={() => setShowForm(true)}>
                        Add Team Member
                    </Button>
                </Card>
            ) : (
                <div className="team-grid">
                    {members.map((member) => (
                        <Card key={member.id} className="team-card">
                            <div className="member-avatar">
                                {member.photo ? (
                                    <img src={member.photo} alt={member.name} />
                                ) : (
                                    <div className="avatar-placeholder">{member.name?.charAt(0) || '?'}</div>
                                )}
                            </div>

                            <div className="member-info">
                                <h3>{member.name || 'Unnamed'}</h3>
                                <p className="member-role">{member.role || 'No role'}</p>
                                <p className="member-bio">{member.bio || 'No bio'}</p>
                            </div>

                            <div className="member-meta">
                                <span className={`visibility-badge ${member.visible ? 'visible' : 'hidden'}`}>
                                    {member.visible ? 'Visible' : 'Hidden'}
                                </span>
                                <span>Order: {member.order || 0}</span>
                            </div>

                            <div className="member-actions">
                                <button className="action-btn edit" onClick={() => { setEditingMember(member); setShowForm(true); }}>
                                    <Edit size={16} />
                                </button>
                                <button className="action-btn toggle" onClick={() => toggleVisibility(member)}>
                                    {member.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                                </button>
                                <button className="action-btn delete" onClick={() => handleDelete(member.id)}>
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

const TeamForm = ({ member, onSave, onCancel }) => {
    const [formData, setFormData] = useState(member || {
        name: '',
        role: '',
        bio: '',
        photo: '',
        linkedin: '',
        twitter: '',
        email: '',
        order: 0,
        visible: true
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Card className="team-form">
            <h2>{member ? 'Edit' : 'Add'} Team Member</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label>Name *</label>
                        <input
                            required
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Full name"
                        />
                    </div>
                    <div className="form-group">
                        <label>Role *</label>
                        <input
                            required
                            value={formData.role}
                            onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                            placeholder="e.g., CEO & Founder"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Bio</label>
                    <textarea
                        value={formData.bio}
                        onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                        placeholder="Short bio"
                        rows={3}
                    />
                </div>

                <div className="form-group">
                    <label>Photo URL</label>
                    <input
                        value={formData.photo}
                        onChange={(e) => setFormData(prev => ({ ...prev, photo: e.target.value }))}
                        placeholder="https://example.com/photo.jpg"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>LinkedIn</label>
                        <input
                            value={formData.linkedin}
                            onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                            placeholder="linkedin.com/in/username"
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="email@example.com"
                        />
                    </div>
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
                    <Button type="submit" variant="primary">Save Member</Button>
                </div>
            </form>
        </Card>
    );
};

export default TeamManagement;
