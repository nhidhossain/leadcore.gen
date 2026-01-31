import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { blogService, generateSlug, isSlugUnique } from '../../services/mock-cms.service';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import './BlogEditor.css';

const BlogEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        author: '',
        category: '',
        tags: [],
        featuredImage: '',
        seoTitle: '',
        seoDescription: '',
        status: 'draft'
    });

    const [loading, setLoading] = useState(isEditMode);
    const [saving, setSaving] = useState(false);
    const [slugEdited, setSlugEdited] = useState(false);

    const loadBlog = React.useCallback(async () => {
        try {
            const blog = await blogService.getBlogById(id);
            if (blog) {
                setFormData(blog);
                setSlugEdited(true);
            }
        } catch (error) {
            console.error('Error loading blog:', error);
            alert('Failed to load blog post');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        if (isEditMode) {
            loadBlog();
        }
    }, [isEditMode, loadBlog]);


    const handleTitleChange = (title) => {
        setFormData(prev => ({ ...prev, title }));

        // Auto-generate slug if not manually edited
        if (!slugEdited) {
            setFormData(prev => ({ ...prev, slug: generateSlug(title) }));
        }
    };

    const handleSlugChange = (slug) => {
        setSlugEdited(true);
        setFormData(prev => ({ ...prev, slug }));
    };

    const handleSave = async (status = 'draft') => {
        // Validation
        if (!formData.title.trim()) {
            alert('Please enter a title');
            return;
        }

        if (!formData.slug.trim()) {
            alert('Please enter a slug');
            return;
        }

        // Check slug uniqueness
        const unique = await isSlugUnique('blogs', formData.slug, id);
        if (!unique) {
            alert('This slug is already in use. Please choose a different one.');
            return;
        }

        setSaving(true);

        try {
            const blogData = {
                ...formData,
                status,
                tags: typeof formData.tags === 'string'
                    ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
                    : formData.tags
            };

            if (isEditMode) {
                await blogService.updateBlog(id, blogData);
            } else {
                await blogService.createBlog(blogData);
            }

            alert(`Blog post ${status === 'published' ? 'published' : 'saved'} successfully!`);
            navigate('/admin/blog');
        } catch (error) {
            console.error('Error saving blog:', error);
            alert('Failed to save blog post');
        } finally {
            setSaving(false);
        }
    };



    if (loading) {
        return <div className="loading-container">Loading blog post...</div>;
    }

    return (
        <div className="blog-editor">
            <div className="editor-header">
                <button className="back-btn" onClick={() => navigate('/admin/blog')}>
                    <ArrowLeft size={20} />
                    Back to Blogs
                </button>
                <div className="header-actions">
                    <Button
                        variant="secondary"
                        onClick={() => handleSave('draft')}
                        disabled={saving}
                    >
                        <Save size={18} />
                        Save Draft
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => handleSave('published')}
                        disabled={saving}
                    >
                        <Eye size={18} />
                        Publish
                    </Button>
                </div>
            </div>

            <div className="editor-content">
                <Card className="editor-card">
                    <h2>{isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>

                    {/* Title */}
                    <div className="form-group">
                        <label>Title *</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => handleTitleChange(e.target.value)}
                            placeholder="Enter blog title"
                            className="input-large"
                        />
                    </div>

                    {/* Slug */}
                    <div className="form-group">
                        <label>Slug *</label>
                        <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) => handleSlugChange(e.target.value)}
                            placeholder="blog-post-slug"
                            className="input-large"
                        />
                        <small>URL: /blog/{formData.slug}</small>
                    </div>

                    {/* Excerpt */}
                    <div className="form-group">
                        <label>Excerpt</label>
                        <textarea
                            value={formData.excerpt}
                            onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                            placeholder="Brief description of the blog post"
                            rows={3}
                        />
                    </div>

                    {/* Content */}
                    <div className="form-group">
                        <label>Content *</label>
                        <textarea
                            value={formData.content}
                            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                            placeholder="Write your blog content here... (Markdown supported)"
                            rows={15}
                            style={{ fontFamily: 'monospace', fontSize: '14px' }}
                        />
                        <small>You can use Markdown formatting</small>
                    </div>

                    {/* Meta Information */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Author</label>
                            <input
                                type="text"
                                value={formData.author}
                                onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                                placeholder="Author name"
                            />
                        </div>

                        <div className="form-group">
                            <label>Category</label>
                            <input
                                type="text"
                                value={formData.category}
                                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                placeholder="e.g., Lead Generation"
                            />
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="form-group">
                        <label>Tags</label>
                        <input
                            type="text"
                            value={Array.isArray(formData.tags) ? formData.tags.join(', ') : formData.tags}
                            onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                            placeholder="Separate tags with commas"
                        />
                    </div>

                    {/* Featured Image */}
                    <div className="form-group">
                        <label>Featured Image URL</label>
                        <input
                            type="text"
                            value={formData.featuredImage}
                            onChange={(e) => setFormData(prev => ({ ...prev, featuredImage: e.target.value }))}
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    {/* SEO Fields */}
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

export default BlogEditor;
