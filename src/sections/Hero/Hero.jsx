import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/common/Button';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero-section">
            <motion.div
                className="hero-container container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="hero-content">
                    <motion.h1
                        className="display-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        Predictable B2B Lead Generation <br />
                        <span className="text-brand">That Fuels Revenue Growth</span>
                    </motion.h1>
                    <motion.p
                        className="body-l hero-subtext"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        We design, build, and manage high-converting LinkedIn and cold email systems — so your sales team only talks to qualified prospects.
                    </motion.p>
                    <motion.div
                        className="hero-actions"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        <Button variant="primary" to="/free-consultation">Free Consultation</Button>
                        <Button variant="secondary" to="/case-studies">View Case Studies</Button>
                    </motion.div>

                    <motion.div
                        className="hero-trust"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                    >
                        <div className="trust-badge">
                            <span className="dot"></span>
                            <span className="label">Validated results in SaaS & Web3</span>
                        </div>
                    </motion.div>
                </div>

                <div className="hero-visual">
                    <div className="visual-card-main">
                        <div className="stats-row">
                            <div className="stat-item">
                                <span className="stat-value">120+</span>
                                <span className="stat-label">Meetings Booked</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <span className="stat-value">85%</span>
                                <span className="stat-label">Open Rate</span>
                            </div>
                        </div>
                        <div className="lead-chart">
                            {/* Visual representation of a chart or activity */}
                            <div className="bar" style={{ height: '40%' }}></div>
                            <div className="bar active" style={{ height: '70%' }}></div>
                            <div className="bar" style={{ height: '50%' }}></div>
                            <div className="bar" style={{ height: '90%' }}></div>
                            <div className="bar" style={{ height: '60%' }}></div>
                        </div>
                    </div>
                    <div className="visual-card-sub floating">
                        <div className="chip">New Lead Identified</div>
                        <p>CTO at TechGlobal</p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
