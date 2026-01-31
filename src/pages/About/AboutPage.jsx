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
                            <Button variant="primary" className="pill-btn large" to="/free-consultation">Book Free Consultation</Button>
                            <Button variant="secondary" className="pill-btn large" to="/case-studies">Explore Case Studies</Button>
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

            {/* 2. OUR JOURNEY TIMELINE */}
            <section className="journey-section container">
                <div className="section-header centered">
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Our Journey
                    </motion.h2>
                    <motion.p
                        className="body-l"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Founded by a team of passionate strategists, designers, and technologists, LeadCore has helped B2B businesses achieve measurable growth.
                    </motion.p>
                    <motion.p
                        className="body-m mt-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        We believe in building relationships, not just pipelines. Our work is driven by strategy, data, and creativity to ensure every conversation matters.
                    </motion.p>
                </div>

                <div className="timeline-container">
                    {/* Timeline Line */}
                    <motion.div
                        className="timeline-line"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    />

                    {/* Timeline Items */}
                    <div className="timeline-items">
                        {/* 2019 - Foundation */}
                        <motion.div
                            className="timeline-item timeline-item-left"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Card className="timeline-card">
                                <div className="timeline-year">2019</div>
                                <h4 className="timeline-title">The Beginning</h4>
                                <p className="timeline-desc">
                                    LeadCore was founded with a mission to revolutionize B2B lead generation through data-driven strategies and personalized outreach.
                                </p>
                            </Card>
                            <div className="timeline-dot" />
                        </motion.div>

                        {/* 2020 - First Clients */}
                        <motion.div
                            className="timeline-item timeline-item-right"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <div className="timeline-dot" />
                            <Card className="timeline-card">
                                <div className="timeline-year">2020</div>
                                <h4 className="timeline-title">First Success Stories</h4>
                                <p className="timeline-desc">
                                    Helped our first 10 clients generate over 50,000 qualified leads, establishing our proven methodology for B2B growth.
                                </p>
                            </Card>
                        </motion.div>

                        {/* 2021 - Expansion */}
                        <motion.div
                            className="timeline-item timeline-item-left"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <Card className="timeline-card">
                                <div className="timeline-year">2021</div>
                                <h4 className="timeline-title">Scaling Up</h4>
                                <p className="timeline-desc">
                                    Expanded our services to include LinkedIn automation, cold email campaigns, and comprehensive SEO strategies.
                                </p>
                            </Card>
                            <div className="timeline-dot" />
                        </motion.div>

                        {/* 2022 - Innovation */}
                        <motion.div
                            className="timeline-item timeline-item-right"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <div className="timeline-dot" />
                            <Card className="timeline-card">
                                <div className="timeline-year">2022</div>
                                <h4 className="timeline-title">AI-Powered Innovation</h4>
                                <p className="timeline-desc">
                                    Integrated AI and machine learning to optimize targeting, personalization, and conversion rates across all campaigns.
                                </p>
                            </Card>
                        </motion.div>

                        {/* 2023 - Milestones */}
                        <motion.div
                            className="timeline-item timeline-item-left"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <Card className="timeline-card">
                                <div className="timeline-year">2023</div>
                                <h4 className="timeline-title">Major Milestones</h4>
                                <p className="timeline-desc">
                                    Generated 500K+ leads for 50+ B2B clients, influencing over $5M in revenue and achieving industry-leading response rates.
                                </p>
                            </Card>
                            <div className="timeline-dot" />
                        </motion.div>

                        {/* 2024 - Present */}
                        <motion.div
                            className="timeline-item timeline-item-right"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                        >
                            <div className="timeline-dot timeline-dot-active" />
                            <Card className="timeline-card timeline-card-active">
                                <div className="timeline-year">2024 - Present</div>
                                <h4 className="timeline-title">Building the Future</h4>
                                <p className="timeline-desc">
                                    Continuing to innovate with cutting-edge strategies, expanding our team, and helping more businesses achieve predictable, sustainable growth.
                                </p>
                            </Card>
                        </motion.div>
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
                    <Button variant="primary" className="pill-btn large max-emphasis" to="/free-consultation">Book Free Consultation</Button>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
