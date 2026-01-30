import React from 'react';
import { motion } from 'framer-motion';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import './CaseStudies.css';

const CaseStudies = () => {
    const cases = [
        {
            company: 'TechFlow SaaS',
            result: '+120%',
            metric: 'Revenue Growth',
            description: 'Scaled cold email outreach for a Series A SaaS company, booking 15+ qualified meetings per month.',
            tags: ['SaaS', 'Cold Email']
        },
        {
            company: 'BlockScale Web3',
            result: '45%',
            metric: 'Open Rate',
            description: 'Optimized LinkedIn outreach for a Web3 infrastructure provider, reaching 500+ institutional investors.',
            tags: ['Web3', 'LinkedIn']
        }
    ];

    return (
        <section id="case-studies" className="cases-section container">
            <div className="section-header">
                <h2 className="section-title">Case Studies</h2>
                <p className="section-subtext">Real results from our latest outreach campaigns.</p>
            </div>

            <div className="cases-grid">
                {cases.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                        <Card className="case-card">
                            <div className="case-tags">
                                {item.tags.map(tag => <span key={tag} className="case-tag">{tag}</span>)}
                            </div>
                            <h3 className="case-company">{item.company}</h3>
                            <div className="case-result-display">
                                <span className="case-result-value">{item.result}</span>
                                <span className="case-result-metric">{item.metric}</span>
                            </div>
                            <p className="case-desc">{item.description}</p>
                            <Button variant="secondary" style={{ marginTop: 'auto' }}>Read Case Study</Button>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default CaseStudies;
