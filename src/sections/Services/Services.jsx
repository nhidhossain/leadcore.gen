import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail, Search, MessageSquare, BarChart3 } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import './Services.css';

const Services = () => {
    const services = [
        {
            icon: <Linkedin size={24} />,
            title: 'LinkedIn Lead Generation',
            description: 'Strategic LinkedIn outreach that connects you directly with decision-makers and high-value prospects.',
            cta: 'Learn More'
        },
        {
            icon: <Mail size={24} />,
            title: 'Cold Email Outreach',
            description: 'High-volume, highly personalized email campaigns that land in the inbox and prompt a response.',
            cta: 'Learn More'
        },
        {
            icon: <Search size={24} />,
            title: 'B2B List Building',
            description: 'Custom-built lead lists based on your precise Ideal Customer Profile, with 98%+ verification.',
            cta: 'Learn More'
        },
        {
            icon: <MessageSquare size={24} />,
            title: 'Email Marketing',
            description: 'Nurture your leads with automated sequences that build trust and keep your brand top-of-mind.',
            cta: 'Learn More'
        },
        {
            icon: <BarChart3 size={24} />,
            title: 'SEO & Growth',
            description: 'Multi-channel growth strategies to fuel your top-of-funnel and generate inbound qualified leads.',
            cta: 'Learn More'
        },
        {
            icon: <Search size={24} />,
            title: 'Sales Strategy',
            description: 'Optimizing your sales process and scripts to turn booked meetings into closed deals.',
            cta: 'Learn More'
        }
    ];

    return (
        <section id="services" className="services-section container">
            <div className="section-header">
                <h2 className="section-title">End-to-End Growth Engine</h2>
                <p className="section-subtext">Everything you need to fill your pipeline with high-quality B2B leads.</p>
            </div>

            <div className="services-grid">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                        <Card className="service-card">
                            <div className="service-icon-wrapper">
                                {service.icon}
                            </div>
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-desc">{service.description}</p>
                            <div className="service-footer">
                                <Button
                                    className="service-cta"
                                    to="/services"
                                    style={{ border: 'none', background: 'transparent', padding: '0', color: 'var(--primary)', justifyContent: 'flex-start' }}
                                >
                                    {service.cta}
                                    <span className="arrow">→</span>
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Services;
