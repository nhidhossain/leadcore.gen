import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Database, Linkedin, Mail, Search, Check, Zap } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import './ServicesOverview.css';

const ServicesOverview = () => {
    const guidanceCards = [
        { title: 'Not Getting Enough Leads?', description: 'We help you reach the right people, not just more people.' },
        { title: 'Leads Not Converting?', description: 'Our outreach systems focus on intent, timing, and relevance.' },
        { title: 'No Predictable Pipeline?', description: 'We replace randomness with repeatable growth systems.' }
    ];

    const services = [
        {
            name: 'B2B Lead List Building',
            tag: 'Foundation',
            description: 'Clean, verified, and highly targeted B2B contact data built around your ideal customer profile.',
            outcomes: ['Better targeting', 'Higher response rates', 'Faster outreach'],
            icon: <Database size={24} />,
            link: '/services/b2b-lead-list',
            cta: 'Learn More'
        },
        {
            name: 'LinkedIn Lead Generation',
            tag: 'Most Popular',
            highlight: true,
            description: 'Turn LinkedIn into a reliable acquisition channel through personalized messaging, automation, and positioning.',
            outcomes: ['Booked meetings', 'Authority building', 'Consistent deal flow'],
            icon: <Linkedin size={24} />,
            link: '/services/linkedin-lead-generation',
            cta: 'Learn More'
        },
        {
            name: 'Cold Email Marketing',
            tag: 'Scalable',
            description: 'High-deliverability cold email campaigns designed to spark real conversations, not spam folders.',
            outcomes: ['More replies', 'Better inbox placement', 'Scalable outreach'],
            icon: <Mail size={24} />,
            link: '/services/cold-email',
            cta: 'Learn More'
        },
        {
            name: 'SEO Services',
            tag: 'Long-Term Growth',
            description: 'Build inbound momentum with conversion-focused SEO that compounds over time.',
            outcomes: ['Organic visibility', 'Qualified inbound leads', 'Sustainable traffic'],
            icon: <Search size={24} />,
            link: '/services/seo',
            cta: 'Learn More'
        }
    ];

    const metrics = [
        { label: 'Leads Generated', value: '700K+' },
        { label: 'Revenue Influenced', value: '$5M+' },
        { label: 'B2B Clients Served', value: '50+' },
        { label: 'Avg. Response Rate', value: '12%+' }
    ];

    return (
        <div className="services-page">
            {/* Hero Section */}
            <section className="services-hero-container container">
                <motion.div
                    className="services-hero"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="hero-text">
                        <span className="eyebrow">Our Services</span>
                        <h1 className="display-xl">Designed to Build Predictable, <br /> <span className="text-brand">Scalable Revenue</span></h1>
                        <p className="body-l">
                            Every service is engineered to attract the right prospects, start meaningful conversations, and convert attention into revenue.
                        </p>
                        <div className="hero-actions">
                            <Button variant="primary">Book Free Consultation</Button>
                            <Button variant="secondary">View Case Studies</Button>
                        </div>
                    </div>
                    <div className="hero-visual">
                        <div className="services-visual-orb subtle-float">
                            <div className="visual-circle-large"></div>
                            <Zap size={80} className="text-brand opacity-20" />
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Value Guidance Section */}
            <section className="value-guidance-section container">
                <div className="guidance-grid">
                    {guidanceCards.map((card, index) => (
                        <div key={index} className="guidance-card">
                            <h4 className="guidance-title">{card.title}</h4>
                            <p className="guidance-desc">{card.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services Grid (Showcase) */}
            <section className="services-grid-section container">
                <div className="services-grid">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className={`service-overview-card ${service.highlight ? 'highlighted-glow' : ''}`}>
                                <div className="card-top">
                                    <span className="service-tag">{service.tag}</span>
                                    <div className="service-icon">
                                        {service.icon}
                                    </div>
                                </div>
                                <h3 className="service-name">{service.name}</h3>
                                <p className="service-description">{service.description}</p>

                                <ul className="outcome-list">
                                    {service.outcomes.map((outcome, idx) => (
                                        <li key={idx} className="outcome-item">
                                            <Check size={16} className="check-icon" />
                                            <span>{outcome}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="service-cta-wrapper">
                                    <Link to={service.link}>
                                        <Button variant="secondary" className="w-100">
                                            {service.cta}
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Comparison Nudge (Reassurance) */}
            <section className="comparison-nudge-section container">
                <div className="comparison-nudge">
                    <div className="nudge-content">
                        <h3>Not Sure Which Service Fits Your Business?</h3>
                        <p>Talk to a strategist and get a clear recommendation based on your goals, market, and growth stage.</p>
                    </div>
                    <Button variant="secondary" className="radius-14">Get Expert Guidance</Button>
                </div>
            </section>

            {/* Trust Metrics (Credibility) */}
            <section className="trust-metrics-section container">
                <div className="trust-metrics-grid">
                    {metrics.map((metric, index) => (
                        <div key={index} className="trust-metric-card">
                            <span className="trust-metric-value">{metric.value}</span>
                            <span className="trust-metric-label">{metric.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Final CTA (Conversion) */}
            <section className="final-cta-section container">
                <div className="final-cta-container dark-premium">
                    <div className="cta-content">
                        <h2 className="display-h2">Ready to Turn Outreach Into Revenue?</h2>
                        <p className="body-l">Book a free strategy call and see how we can build a predictable growth system for your business.</p>
                        <Button variant="primary" className="cta-btn-large radius-18">Book Free Strategy Call</Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServicesOverview;
