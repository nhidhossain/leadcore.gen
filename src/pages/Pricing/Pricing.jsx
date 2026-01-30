import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, CheckCircle2 } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import './Pricing.css';

const Pricing = () => {
    const [activeFaq, setActiveFaq] = useState(null);

    const tiers = [
        {
            name: 'Starter',
            price: '$1,500/mo',
            description: 'Perfect for small teams looking to test B2B lead generation systems.',
            features: ['ICP-based Lead Lists', 'Basic LinkedIn Outreach', 'Weekly Reporting'],
            cta: 'Book Consultation',
            link: '/free-consultation?plan=starter'
        },
        {
            name: 'Growth',
            price: '$3,500/mo',
            description: 'Full service outreach for growing teams aiming for predictable pipelines.',
            features: ['Advanced LinkedIn Campaigns', 'Cold Email Marketing', 'Lead List Verification', 'Weekly Optimization'],
            cta: 'Book Consultation',
            link: '/free-consultation?plan=growth',
            highlight: true
        },
        {
            name: 'Enterprise',
            price: 'Custom',
            description: 'Tailored strategies for large teams, agencies, and scalable campaigns.',
            features: ['Dedicated Strategist', 'Full Multi-channel Outreach', 'Analytics & Reporting', 'Custom Integrations'],
            cta: 'Contact Us',
            link: '/contact'
        }
    ];

    const comparison = {
        features: [
            { name: 'ICP Research', starter: true, growth: true, enterprise: true },
            { name: 'LinkedIn Outreach', starter: 'Basic', growth: 'Advanced', enterprise: 'Full Custom' },
            { name: 'Cold Email Campaigns', starter: false, growth: true, enterprise: true },
            { name: 'Weekly Reporting', starter: true, growth: true, enterprise: true },
            { name: 'Optimization', starter: false, growth: 'Weekly', enterprise: 'Daily' },
            { name: 'Dedicated Strategist', starter: false, growth: false, enterprise: true }
        ],
        tiers: ['Starter', 'Growth', 'Enterprise']
    };

    const faqs = [
        { q: 'How long does it take to see results?', a: 'Usually 4–6 weeks depending on industry and ICP complexity.' },
        { q: 'Can this be scaled safely?', a: 'Yes, all outreach is compliant and account-safe.' },
        { q: 'What if the plan isn’t suitable for my business?', a: 'We recommend a free consultation and custom strategy.' },
        { q: 'Are there hidden fees?', a: 'No — all pricing is transparent upfront.' }
    ];

    return (
        <div className="pricing-page">
            {/* Hero Section */}
            <section className="pricing-hero container">
                <motion.div
                    className="pricing-hero-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="hero-text">
                        <span className="eyebrow">Pricing Plans</span>
                        <h1 className="display-xl">Transparent Plans Designed <br /> <span className="text-brand">for Serious Growth</span></h1>
                        <p className="body-l">
                            Choose the plan that fits your business goals. No hidden fees — just predictable outcomes.
                        </p>
                        <div className="hero-actions">
                            <Button variant="primary" className="pill-btn" to="/free-consultation">Book Free Consultation</Button>
                            <Button variant="secondary" className="pill-btn" to="/contact">Contact Us</Button>
                        </div>
                    </div>
                    <div className="hero-visual">
                        <div className="pricing-visual-orb subtle-float">
                            <div className="visual-circle-large"></div>
                            <CheckCircle2 size={80} className="text-brand opacity-20" />
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Pricing Tiers */}
            <section className="pricing-tiers-section container">
                <div className="pricing-grid">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className={`pricing-card ${tier.highlight ? 'highlight-glow' : ''}`}>
                                <div className="tier-header">
                                    <h3 className="tier-name">{tier.name}</h3>
                                    <div className="tier-price">{tier.price}</div>
                                    <p className="tier-description">{tier.description}</p>
                                </div>
                                <ul className="tier-features">
                                    {tier.features.map((feature, i) => (
                                        <li key={i}><CheckCircle2 size={18} className="icon-brand" /> {feature}</li>
                                    ))}
                                </ul>
                                <div className="tier-cta">
                                    <Button variant={tier.highlight ? 'primary' : 'secondary'} className="w-100 pill-btn">
                                        {tier.cta}
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Plan Comparison */}
            <section className="comparison-section container">
                <div className="section-header">
                    <h2 className="section-title">Compare Plans</h2>
                </div>
                <div className="comparison-table-wrapper">
                    <table className="comparison-table">
                        <thead>
                            <tr>
                                <th>Features</th>
                                {comparison.tiers.map(t => <th key={t}>{t}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {comparison.features.map((f, i) => (
                                <tr key={i}>
                                    <td className="feature-name">{f.name}</td>
                                    <td className="tier-val">{typeof f.starter === 'boolean' ? (f.starter ? <Check size={20} className="icon-brand" /> : <span className="dash">—</span>) : f.starter}</td>
                                    <td className="tier-val">{typeof f.growth === 'boolean' ? (f.growth ? <Check size={20} className="icon-brand" /> : <span className="dash">—</span>) : f.growth}</td>
                                    <td className="tier-val">{typeof f.enterprise === 'boolean' ? (f.enterprise ? <Check size={20} className="icon-brand" /> : <span className="dash">—</span>) : f.enterprise}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* FAQs */}
            <section className="pricing-faq-section container">
                <div className="section-header">
                    <h2 className="section-title">Frequently Asked Questions</h2>
                </div>
                <div className="faq-list">
                    <div className="faq-grid" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        {faqs.map((item, index) => (
                            <div key={index} className="faq-item" style={{ marginBottom: '16px', borderBottom: '1px solid var(--neutral-light-gray)' }}>
                                <button
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '24px',
                                        background: 'none',
                                        border: 'none',
                                        fontSize: '18px',
                                        fontWeight: '600',
                                        color: 'var(--neutral-black)',
                                        cursor: 'pointer',
                                        textAlign: 'left'
                                    }}
                                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                                >
                                    {item.q}
                                    <ChevronDown
                                        size={20}
                                        style={{
                                            transform: activeFaq === index ? 'rotate(180deg)' : 'rotate(0deg)',
                                            transition: 'transform 0.3s ease',
                                            color: 'var(--primary)'
                                        }}
                                    />
                                </button>
                                <AnimatePresence>
                                    {activeFaq === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            style={{ overflow: 'hidden' }}
                                        >
                                            <p style={{ paddingBottom: '24px', color: 'var(--neutral-gray)', lineHeight: '1.6' }}>
                                                {item.a}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div> {/* Added missing closing div for faq-list */}
            </section>

            {/* Final CTA */}
            <section className="pricing-final-cta container">
                <div className="final-cta-container dark-premium">
                    <div className="cta-content">
                        <h2 className="display-h2">Ready to Take Your Lead Generation <br /> to the Next Level?</h2>
                        <p className="body-l">Book a free consultation and find the right plan for your business.</p>
                        <Button variant="primary" className="cta-btn-large radius-18">Book Free Consultation</Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Pricing;
