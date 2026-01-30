import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Zap, Target, Lock, BarChart3, X, Check, AlertTriangle,
    ChevronDown, ArrowRight, MessageSquare, Database, Layout, Settings
} from 'lucide-react';
import { servicesData } from '../../data/serviceData';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import './ServiceDetail.css';

const IconMap = {
    zap: <Zap size={20} />,
    target: <Target size={20} />,
    lock: <Lock size={20} />,
    'bar-chart': <BarChart3 size={20} />,
    'database': <Database size={20} />,
    'linkedin': <Layout size={20} />,
    'mail': <MessageSquare size={20} />,
    'settings': <Settings size={20} />
};

const ServiceDetail = () => {
    const { slug } = useParams();
    const service = servicesData[slug];
    const [activeFaq, setActiveFaq] = useState(null);

    if (!service) {
        return (
            <div className="container" style={{ padding: '200px 0', textAlign: 'center' }}>
                <h1>Service Not Found</h1>
                <Link to="/services">Back to Services</Link>
            </div>
        );
    }

    return (
        <div className="service-detail-page">
            {/* 1. HERO SECTION */}
            <section className="service-hero-section container">
                <motion.div
                    className="service-hero-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="hero-content">
                        <h1 className="hero-headline">{service.hero.headline}</h1>
                        <p className="hero-subheadline">{service.hero.subheadline}</p>

                        <div className="proof-row">
                            {service.hero.proof.map((item, idx) => (
                                <div key={idx} className="proof-item">
                                    <span className="proof-icon">{IconMap[item.icon]}</span>
                                    <span className="proof-label">{item.label}</span>
                                </div>
                            ))}
                        </div>

                        <div className="hero-actions">
                            <Button variant="primary" className="pill-btn">{service.hero.primaryCTA}</Button>
                            <Button variant="secondary" className="pill-btn">{service.hero.secondaryCTA}</Button>
                        </div>
                    </div>
                    <div className="hero-bg-accent"></div>
                </motion.div>
            </section>

            {/* 2. PROBLEM -> SOLUTION */}
            <section className="problem-solution-section container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="section-title">The Strategy Behind Your Growth</h2>
                </motion.div>
                <div className="ps-grid">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="problem-card">
                            <h3 className="ps-heading text-red">❌ The Problems</h3>
                            <ul className="ps-list">
                                {service.problemSolution.problems.map((p, i) => (
                                    <li key={i}><X size={18} className="icon-x" /> {p}</li>
                                ))}
                            </ul>
                        </Card>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="solution-card">
                            <h3 className="ps-heading text-green">✅ Our Solution</h3>
                            <ul className="ps-list">
                                {service.problemSolution.solutions.map((s, i) => (
                                    <li key={i}><Check size={18} className="icon-check" /> {s}</li>
                                ))}
                            </ul>
                        </Card>
                    </motion.div>
                </div>
                <motion.div
                    className="vision-quote"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <p>“{service.problemSolution.vision}”</p>
                </motion.div>
            </section>

            {/* 3. WHO THIS IS FOR / NOT FOR */}
            <section className="filter-section container">
                <div className="filter-grid">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="for-card">
                            <h3 className="filter-heading">Who This Is For</h3>
                            <ul className="filter-list">
                                {service.filter.for.map((item, i) => (
                                    <li key={i}><Check size={18} className="icon-green" /> {item}</li>
                                ))}
                            </ul>
                        </Card>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <Card className="not-for-card muted">
                            <h3 className="filter-heading">Who This Is Not For</h3>
                            <ul className="filter-list">
                                {service.filter.notFor.map((item, i) => (
                                    <li key={i}><X size={18} className="icon-muted" /> {item}</li>
                                ))}
                            </ul>
                        </Card>
                    </motion.div>
                </div>
                <motion.div
                    className="filter-warning"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <AlertTriangle size={20} className="icon-warning" />
                    <span>{service.filter.warning}</span>
                </motion.div>
            </section>

            {/* 4. OUR PROCESS */}
            <section className="service-process-section container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="section-title">A Clear Path to Results</h2>
                </motion.div>
                <div className="process-timeline">
                    {service.process.map((p, i) => (
                        <motion.div
                            key={i}
                            className="timeline-item"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className="timeline-node">{p.step}</div>
                            <div className="timeline-content">
                                <h4 className="timeline-title">{p.title}</h4>
                                <p className="timeline-desc">{p.desc}</p>
                                <div className="timeline-meta">
                                    <span><strong>Time:</strong> {p.time}</span>
                                    <span><strong>Outcome:</strong> {p.outcome}</span>
                                </div>
                            </div>
                            {i < service.process.length - 1 && <div className="timeline-line"></div>}
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 5. DELIVERABLES */}
            <section className="deliverables-section container">
                <motion.div
                    className="deliverables-container"
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="section-title white">What You Get</h2>
                    <div className="deliverables-grid">
                        {service.deliverables.map((item, i) => (
                            <div key={i} className="deliverable-item">
                                <Check size={20} className="icon-brand" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                    <div className="deliverables-tagline">
                        <p>📌 We don’t sell messages. We sell conversations.</p>
                    </div>
                </motion.div>
            </section>

            {/* 6. TOOLS & STACK */}
            <section className="stack-section container">
                <motion.div
                    className="stack-container"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="section-title">Professional Tooling</h2>
                    <div className="stack-grid">
                        {service.stack.map((tool, i) => (
                            <div key={i} className="stack-item">{tool}</div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* 8. FAQs */}
            <section className="faq-section container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="section-title">Sales Objection Killers</h2>
                </motion.div>
                <div className="faq-list">
                    {service.faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            className={`faq-item ${activeFaq === i ? 'active' : ''}`}
                            onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <div className="faq-question">
                                <span>{faq.q}</span>
                                <ChevronDown size={20} className={`chevron ${activeFaq === i ? 'rotate' : ''}`} />
                            </div>
                            <AnimatePresence>
                                {activeFaq === i && (
                                    <motion.div
                                        className="faq-answer"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <p>{faq.a}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 9. STRONG CTA */}
            <section className="service-final-cta container">
                <motion.div
                    className="final-cta-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2>Let’s see if {service.name} <br /> can work for your business</h2>
                    <div className="cta-buttons">
                        <Button variant="primary" className="pill-btn large">Book Free Strategy Call</Button>
                        <Button variant="outline" className="pill-btn large">Free Audit</Button>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default ServiceDetail;
