import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Target, Lightbulb, TrendingUp, Users } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import './AboutPage.css';

const AboutPage = () => {
    const teamMembers = [
        { name: 'Nahid', role: 'Product Manager | UI/UX Designer', photo: 'rgba(0, 164, 147, 0.1)' },
        { name: 'Arosh', role: 'Web Designer & Developer', photo: 'rgba(15, 23, 42, 0.05)' },
        { name: 'Shamim', role: 'Marketing Lead', photo: 'rgba(0, 164, 147, 0.08)' },
        { name: 'Rimuuu', role: 'Client Success & Support', photo: 'rgba(15, 23, 42, 0.03)' }
    ];

    const values = [
        { title: 'Integrity & Transparency', icon: <Heart size={24} />, desc: 'Honest partnerships with clear data-backed reporting.' },
        { title: 'Client Success First', icon: <Target size={24} />, desc: 'Your growth is our primary North Star metric.' },
        { title: 'Data-Driven Decisions', icon: <TrendingUp size={24} />, desc: 'Strategy backed by research, not just intuition.' },
        { title: 'Strategic Thinking', icon: <Lightbulb size={24} />, desc: 'Creative approaches to solving B2B outreach challenges.' }
    ];

    return (
        <div className="about-page">
            {/* 1. HERO SECTION */}
            <section className="about-hero-section container">
                <motion.div
                    className="split-hero"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="hero-text">
                        <span className="eyebrow">About Us</span>
                        <h1 className="display-xl">We’re More Than Just <br /> <span className="text-brand">Lead Generation Experts</span></h1>
                        <p className="body-l hero-subtext">
                            At LeadCore, we combine strategy, technology, and creativity to deliver predictable growth for B2B businesses.
                        </p>
                        <div className="hero-actions">
                            <Link to="/free-consultation">
                                <Button variant="primary" className="pill-btn large">Book Free Consultation</Button>
                            </Link>
                            <Link to="/case-studies">
                                <Button variant="secondary" className="pill-btn large">Explore Case Studies</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="hero-visual">
                        <div className="team-preview-visual subtle-float">
                            <div className="visual-circle"></div>
                            {/* Placeholder for team/culture visual */}
                            <Users size={80} className="text-brand opacity-20" />
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* 2. STORY SECTION */}
            <section className="story-section container">
                <div className="story-grid">
                    <Card className="story-card">
                        <h2 className="section-title">Our Journey</h2>
                        <p className="body-l">
                            Founded by a team of passionate strategists, designers, and technologists, LeadCore has helped B2B businesses achieve measurable growth.
                        </p>
                        <p className="body-m mt-24">
                            We believe in building relationships, not just pipelines. Our work is driven by strategy, data, and creativity to ensure every conversation matters.
                        </p>
                    </Card>
                    <div className="story-visual-placeholder">
                        <div className="abstract-line"></div>
                        <div className="abstract-dots"></div>
                    </div>
                </div>
            </section>

            {/* 3. TEAM GRID */}
            <section className="team-section container">
                <div className="section-header centered">
                    <h2 className="section-title">Meet the Experts</h2>
                    <p className="body-l">The dedicated team behind your predictable growth.</p>
                </div>
                <div className="team-grid">
                    {teamMembers.map((member, idx) => (
                        <motion.div
                            key={idx}
                            className="team-card-wrapper"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Card className="team-card">
                                <div className="team-photo" style={{ backgroundColor: member.photo }}></div>
                                <h4 className="member-name">{member.name}</h4>
                                <p className="member-role">{member.role}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 4. VALUES SECTION */}
            <section className="values-section container">
                <h2 className="section-title centered">Our Core Values</h2>
                <div className="values-grid">
                    {values.map((v, idx) => (
                        <Card key={idx} className="value-card">
                            <div className="value-icon-box">{v.icon}</div>
                            <h4 className="value-title">{v.title}</h4>
                            <p className="value-desc">{v.desc}</p>
                        </Card>
                    ))}
                </div>
            </section>

            {/* 5. FINAL CTA */}
            <section className="about-final-cta-section container">
                <div className="final-cta-container dark-premium">
                    <h2 className="display-h2 white">Ready to Partner with Us?</h2>
                    <p className="body-l text-muted-white">Book a free consultation and discover how we can help your business grow.</p>
                    <Link to="/free-consultation">
                        <Button variant="primary" className="pill-btn large max-emphasis">Book Free Consultation</Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
