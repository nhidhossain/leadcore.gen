import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight, BookOpen, Target, Users, Zap, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom for Link
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import './BlogPage.css';

const BlogPage = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const featuredPosts = [
        {
            title: 'The Elite Guide to LinkedIn Lead Generation in 2024',
            excerpt: 'Master the latest LinkedIn strategies to build a predictable B2B sales pipeline without paid ads or spammy outreach.',
            category: 'LinkedIn',
            readTime: '12 min read',
            slug: 'linkedin-elite-guide',
            image: 'rgba(0, 164, 147, 0.08)'
        },
        {
            title: 'Psychological Triggers for Cold Email Success',
            excerpt: 'Learn exactly what makes a decision-maker click "Reply". We break down the copy that drove $1M in influenced revenue.',
            category: 'Cold Email',
            readTime: '10 min read',
            slug: 'email-psychology',
            image: 'rgba(15, 23, 42, 0.05)'
        }
    ];

    const categories = [
        { title: 'Lead Generation', desc: 'Core strategies for predictable B2B growth.', icon: <Target size={24} /> },
        { title: 'LinkedIn Marketing', desc: 'Optimize profiles and outreach for high conversion.', icon: <Users size={24} /> },
        { title: 'Cold Email', desc: 'Craft sequences that land in the inbox and get replies.', icon: <Zap size={24} /> },
        { title: 'SEO & Content', desc: 'Organic strategies for authority and inbound traffic.', icon: <TrendingUp size={24} /> },
        { title: 'Tools & Tutorials', desc: 'Step-by-step guides for modern outbound stacks.', icon: <BookOpen size={24} /> }
    ];

    const leadMagnets = [
        { title: 'B2B Lead List Template', desc: 'Organize and segment prospects effectively.' },
        { title: 'LinkedIn Outreach Guide', desc: 'Proven methods for high response rates.' },
        { title: 'Cold Email Templates', desc: 'Ready-to-use sequences for outreach.' },
        { title: 'SEO Checklist', desc: 'Ensure your content ranks and converts.' }
    ];

    return (
        <div className="blog-page">
            {/* 1. SPLIT-HERO SECTION */}
            <section className="blog-hero-section container">
                <motion.div
                    className="split-hero"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="hero-text">
                        <span className="eyebrow">Blog & Insights</span>
                        <h1 className="display-xl">Insights, Guides, and <br /> <span className="text-brand">Strategies for B2B Growth</span></h1>
                        <p className="body-l hero-subtext">
                            Learn from our experts how to generate predictable leads, improve conversions, and scale your business.
                        </p>
                        <div className="hero-actions">
                            <Button variant="primary" className="pill-btn large" to="#featured-insights">Browse Articles</Button>
                            <Button variant="secondary" className="pill-btn large" to="/free-consultation">Book Free Consultation</Button>
                        </div>
                    </div>
                    <div className="hero-visual">
                        <div className="abstract-visual-box subtle-float">
                            <div className="visual-orb"></div>
                            {/* Icon representing Insights/Trending */}
                            <TrendingUp size={80} className="text-brand opacity-20" />
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* 2. FEATURED INSIGHTS */}
            <section id="featured-insights" className="featured-section container">
                <div className="section-header-row">
                    <div>
                        <h2 className="section-title">Featured Insights</h2>
                        <p className="body-m text-secondary">Explore our most popular and impactful articles.</p>
                    </div>
                </div>
                <div className="featured-grid">
                    {featuredPosts.map((post, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Card className="featured-card">
                                <div className="featured-thumbnail" style={{ backgroundColor: post.image }}>
                                    <span className="featured-badge">Featured</span>
                                </div>
                                <div className="featured-content">
                                    <span className="post-cat-small">{post.category}</span>
                                    <h3 className="post-title-large">{post.title}</h3>
                                    <p className="post-excerpt-large">{post.excerpt}</p>
                                    <Button variant="secondary" className="pill-btn mt-auto" to={`/blog/${post.slug}`}>Read More</Button>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 3. EXPLORE BY CATEGORY */}
            <section className="categories-section container">
                <h2 className="section-title centered-text">Explore by Category</h2>
                <div className="categories-scroll">
                    {categories.map((cat, idx) => (
                        <Card key={idx} className="category-card-box">
                            <div className="cat-icon-box">{cat.icon}</div>
                            <h4 className="cat-title">{cat.title}</h4>
                            <p className="cat-desc-small">{cat.desc}</p>
                            <ArrowRight size={18} className="cat-arrow" />
                        </Card>
                    ))}
                </div>
            </section>

            {/* 4. LEAD MAGNETS */}
            <section className="magnets-section container">
                <div className="magnets-header">
                    <h2 className="section-title">Downloadable Resources</h2>
                    <p className="body-m">Grab actionable templates, guides, and frameworks to accelerate your lead generation.</p>
                </div>
                <div className="magnets-grid-refined">
                    {leadMagnets.map((item, idx) => (
                        <Card key={idx} className="magnet-card-refined">
                            <div className="magnet-icon-pill">
                                <Download size={20} className="text-brand" />
                            </div>
                            <div className="magnet-text">
                                <h4 className="magnet-title-small">{item.title}</h4>
                                <p className="magnet-desc-tiny">{item.desc}</p>
                            </div>
                            <Button variant="ghost" className="magnet-download-btn"><ArrowRight size={20} /></Button>
                        </Card>
                    ))}
                </div>
            </section>



            {/* 6. FINAL CTA */}
            <section className="blog-final-cta container">
                <div className="final-cta-container dark-premium">
                    <h2 className="display-h2 white">Ready to Accelerate Your <br /> Lead Generation?</h2>
                    <p className="body-l text-muted-white">Book a free consultation and get personalized strategies for your business.</p>
                    <Button variant="primary" className="pill-btn large max-emphasis" to="/free-consultation">Book Free Consultation</Button>
                </div>
            </section>
        </div>
    );
};

export default BlogPage;
