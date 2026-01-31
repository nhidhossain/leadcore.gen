import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, Eye, FileText } from 'lucide-react';
import { blogService } from '../../services/mock-cms.service';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import './BlogManagement.css';

const BlogManagement = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'published', 'draft'

    useEffect(() => {
        loadBlogs();
    }, []);

    const loadBlogs = async () => {
        try {
            const data = await blogService.getAllBlogs();
            setBlogs(data);
        } catch (error) {
            console.error('Error loading blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this blog post?')) return;

        try {
            await blogService.deleteBlog(id);
            setBlogs(blogs.filter(b => b.id !== id));
        } catch (error) {
            console.error('Error deleting blog:', error);
            alert('Failed to delete blog post');
        }
    };

    const handleToggleStatus = async (blog) => {
        try {
            if (blog.status === 'published') {
                await blogService.unpublishBlog(blog.id);
            } else {
                await blogService.publishBlog(blog.id);
            }
            loadBlogs();
        } catch (error) {
            console.error('Error toggling status:', error);
            alert('Failed to update blog status');
        }
    };

    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || blog.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return <div className="loading-container">Loading blogs...</div>;
    }

    return (
        <div className="blog-management">
            <div className="page-header">
                <div>
                    <h1>Blog Posts</h1>
                    <p>Manage your blog content</p>
                </div>
                <Link to="/admin/blog/new">
                    <Button variant="primary">
                        <Plus size={20} />
                        Create Blog Post
                    </Button>
                </Link>
            </div>

            {/* Filters */}
            <Card className="filters-card">
                <div className="filters-row">
                    <div className="search-box">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Search blog posts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filter-buttons">
                        <button
                            className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
                            onClick={() => setFilterStatus('all')}
                        >
                            All ({blogs.length})
                        </button>
                        <button
                            className={`filter-btn ${filterStatus === 'published' ? 'active' : ''}`}
                            onClick={() => setFilterStatus('published')}
                        >
                            Published ({blogs.filter(b => b.status === 'published').length})
                        </button>
                        <button
                            className={`filter-btn ${filterStatus === 'draft' ? 'active' : ''}`}
                            onClick={() => setFilterStatus('draft')}
                        >
                            Drafts ({blogs.filter(b => b.status === 'draft').length})
                        </button>
                    </div>
                </div>
            </Card>

            {/* Blog List */}
            {filteredBlogs.length === 0 ? (
                <Card className="empty-state">
                    <FileText size={48} color="var(--text-muted)" />
                    <h3>No blog posts found</h3>
                    <p>Create your first blog post to get started</p>
                    <Link to="/admin/blog/new">
                        <Button variant="primary">Create Blog Post</Button>
                    </Link>
                </Card>
            ) : (
                <div className="blogs-grid">
                    {filteredBlogs.map((blog) => (
                        <Card key={blog.id} className="blog-item">
                            <div className="blog-item-header">
                                <div>
                                    <h3>{blog.title || 'Untitled'}</h3>
                                    <p className="blog-excerpt">{blog.excerpt || 'No excerpt'}</p>
                                </div>
                                <span className={`status-badge ${blog.status}`}>
                                    {blog.status === 'published' ? 'Published' : 'Draft'}
                                </span>
                            </div>

                            <div className="blog-item-meta">
                                <span>By {blog.author || 'Unknown'}</span>
                                <span>•</span>
                                <span>{blog.category || 'Uncategorized'}</span>
                                {blog.createdAt && (
                                    <>
                                        <span>•</span>
                                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                    </>
                                )}
                            </div>

                            <div className="blog-item-actions">
                                <Link to={`/admin/blog/edit/${blog.id}`}>
                                    <button className="action-btn edit">
                                        <Edit size={16} />
                                        Edit
                                    </button>
                                </Link>
                                <button
                                    className="action-btn toggle"
                                    onClick={() => handleToggleStatus(blog)}
                                >
                                    <Eye size={16} />
                                    {blog.status === 'published' ? 'Unpublish' : 'Publish'}
                                </button>
                                <button
                                    className="action-btn delete"
                                    onClick={() => handleDelete(blog.id)}
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

export default BlogManagement;
