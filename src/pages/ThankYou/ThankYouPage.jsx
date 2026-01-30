import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, FileText, Layout, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import './ThankYouPage.css';

const ThankYouPage = () => {
    const metrics = [
        { label: 'Leads Generated', value: '700K+' },
        { label: 'Revenue Influenced', value: '$5M+' },
        { label: 'B2B Clients Served', value: '50+' },
        { label: 'Avg. Response Rate', value: '12%+' }
    ];

    const nextSteps = [
        {
            title: 'Check Your Email',
            desc: 'Keep an eye on your inbox for a confirmation and calendar invitation.',
            icon: <CheckCircle className="text-brand" />
        },
        {
            title: 'Add to Calendar',
            desc: 'Ensure you add the strategy session to your primary calendar.',
            icon: <Calendar className="text-brand" />
        },
        {
            title: 'Review Case Studies',
            desc: 'See how we’ve helped businesses similar to yours achieve growth.',
            icon: <FileText className="text-brand" />
        },
        {
            title: 'Prepare Questions',
            desc: 'Think about your specific challenges to get the most out of our call.',
            icon: <Layout className="text-brand" />
        }
    ];

    return (
        <div className="thank-you-page">
            {/* Hero Section */}
            <section className="thank-you-hero-section container">
                <motion.div
                    className="thank-you-hero"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="confirmation-icon-box">
                        <CheckCircle size={64} className="text-brand" />
                    </div>
                    <h1 className="display-h1">Thank You for Booking!</h1>
                    <p className="body-l hero-subtext">
                        Your free consultation has been successfully scheduled. Check your email for confirmation and your calendar invite.
                    </p>
                    <div className="hero-actions">
                        <Button variant="primary" className="pill-btn large">Add to Calendar</Button>
                        <Link to="/case-studies">
                            <Button variant="secondary" className="pill-btn large">Explore Case Studies</Button>
                        </Link>
                        <Link to="/blog">
                            <Button variant="secondary" className="pill-btn large">Visit Blog</Button>
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* Trust Metrics */}
            <section className="thank-you-metrics-section container">
                <div className="trust-strip-horizontal">
                    {metrics.map((metric, idx) => (
                        <div key={idx} className="metric-card-flat">
                            <span className="metric-value-large">{metric.value}</span>
                            <span className="metric-label-small">{metric.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Next Steps */}
            <section className="next-steps-section container">
                <h2 className="section-title centered">Next Steps</h2>
                <div className="next-steps-grid">
                    {nextSteps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Card className="step-card">
                                <div className="step-icon-box">{step.icon}</div>
                                <h4 className="step-title">{step.title}</h4>
                                <p className="step-desc">{step.desc}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section className="thank-you-final-cta container">
                <div className="final-cta-container dark-premium">
                    <h2 className="display-h2 white">Ready to Take Action on <br /> Your Lead Generation?</h2>
                    <p className="body-l text-muted-white">Book another consultation or explore our services to see how we can fuel your growth.</p>
                    <Link to="/free-consultation">
                        <Button variant="primary" className="pill-btn large max-emphasis">Book Free Consultation</Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default ThankYouPage;
