import React from 'react';
import { motion } from 'framer-motion';
import './Process.css';

const Process = () => {
    const steps = [
        {
            number: '01',
            title: 'Define Your ICP',
            description: 'We help you pinpoint exactly who your high-value customers are based on industry, size, and intent.'
        },
        {
            number: '02',
            title: 'Build Verified Lead Lists',
            description: 'Our team manually curates and verifies lead lists, ensuring 98%+ delivery for every campaign.'
        },
        {
            number: '03',
            title: 'Launch Campaigns',
            description: 'We deploy multi-channel outreach strategies across LinkedIn and Email with high personalization.'
        },
        {
            number: '04',
            title: 'Book Qualified Meetings',
            description: 'Your sales team receives ready-to-talk prospects directly in their calendars. You just close the deals.'
        }
    ];

    return (
        <section id="process" className="process-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Our Growth Process</h2>
                    <p className="section-subtext">A systematic approach to generating predictable revenue.</p>
                </div>

                <div className="process-grid">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="process-step"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <div className="step-number">{step.number}</div>
                            <div className="step-content">
                                <h3 className="step-title">{step.title}</h3>
                                <p className="step-desc">{step.description}</p>
                            </div>
                            {index < steps.length - 1 && <div className="step-line desktop-only"></div>}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
