import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowRight, Zap, TrendingUp, Users, Target } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import './CaseStudiesPage.css';

const CaseStudiesPage = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [selectedService, setSelectedService] = useState('All');
    const [selectedIndustry, setSelectedIndustry] = useState('All');
    const [selectedResult, setSelectedResult] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filters = [
        { label: 'Service Type', state: selectedService, setState: setSelectedService, options: ['All', 'B2B Lead List', 'LinkedIn Lead Generation', 'Cold Email', 'SEO'] },
        { label: 'Industry', state: selectedIndustry, setState: setSelectedIndustry, options: ['All', 'SaaS', 'Agencies', 'B2B Services', 'E-commerce'] },
        { label: 'Results', state: selectedResult, setState: setSelectedResult, options: ['All', 'High ROI', 'Lead Volume', 'Pipeline Growth', 'Enterprise Impact'] }
    ];

    const caseStudies = [
        {
            slug: 'techflow-outreach',
            title: 'How TechFlow Generated 15+ Monthly Meetings with LinkedIn',
            subtitle: 'SaaS',
            metric: '+120%',
            metricLabel: 'Lead Volume',
            excerpt: 'Strategic LinkedIn outreach that connected TechFlow directly with Tier-1 decision makers.',
            image: 'rgba(0, 164, 147, 0.1)', // Placeholder brand color
            service: 'LinkedIn Lead Generation'
        },
        {
            slug: 'scaleup-email',
            title: 'Cold Email Strategy for ScaleUp: 45% Open Rates',
            subtitle: 'Agencies',
            metric: '45%',
            metricLabel: 'Open Rate',
            excerpt: 'High-deliverability campaigns that spark real conversations with enterprise prospects.',
            image: 'rgba(15, 23, 42, 0.05)',
            service: 'Cold Email'
        },
        {
            slug: 'b2b-growth-seo',
            title: 'B2B Leads via SEO: A 250% ROI Success Story',
            subtitle: 'B2B Services',
            metric: '250%',
            metricLabel: 'Avg. ROI',
            excerpt: 'Building inbound momentum through keyword strategies that convert searchers into leads.',
            image: 'rgba(0, 164, 147, 0.08)',
            service: 'SEO'
        }
    ];

    const filteredCases = caseStudies.filter(item => {
        const matchService = selectedService === 'All' || item.service === selectedService;
        const matchIndustry = selectedIndustry === 'All' || item.subtitle === selectedIndustry;

        // Safe search: check title and subtitle (which acts as industry/company context)
        const searchLower = searchQuery.toLowerCase();
        // Check if title exists, defaulting to empty string if safely needed, though title is required.
        // We removed item.company check because the data structure uses 'subtitle' or doesn't have a dedicated company field shown. 
        // If we want to search 'subtitle' as well:
        const matchSearch = (item.title || '').toLowerCase().includes(searchLower) ||
            ((item.subtitle || '').toLowerCase().includes(searchLower));

        return matchService && matchIndustry && matchSearch;
    });

    return (
        <div className="case-studies-page">
            {/* 1. HERO SECTION */}
            <section className="case-hero-section container">
                <motion.div
                    className="case-hero-card"
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="eyebrow">Success Stories</span>
                    <h1 className="display-xl">Real Results from <br /> <span className="text-brand">Businesses Like Yours</span></h1>
                    <p className="body-l hero-subtext">
                        See how our lead generation systems create measurable revenue and predictable pipelines.
                    </p>
                    <Button variant="primary" className="pill-btn large" to="/free-consultation">Book Free Consultation</Button>
                </motion.div>
            </section>

            {/* 2. FILTER BAR */}
            <section className="filter-bar-section container">
                <div className="filter-bar">
                    {filters.map((filter, idx) => (
                        <div key={idx} className="filter-dropdown">
                            <span className="filter-label">{filter.label}</span>
                            <div className="relative">
                                <select
                                    className="filter-select-input"
                                    value={filter.state}
                                    onChange={(e) => filter.setState(e.target.value)}
                                >
                                    {filter.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                                <ChevronDown size={14} className="filter-chevron" />
                            </div>
                        </div>
                    ))}
                    <div className="filter-search">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Search case studies..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* 3. CASE GRID */}
            <section className="case-grid-section container">
                <div className="case-grid">
                    {filteredCases.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="case-study-card">
                                <div className="case-thumbnail" style={{ backgroundColor: item.image }}>
                                    <span className="service-badge">{item.service}</span>
                                </div>
                                <div className="case-content">
                                    <div className="case-metrics">
                                        <span className="metric-value">{item.metric}</span>
                                        <span className="metric-label">{item.metricLabel}</span>
                                    </div>
                                    <h3 className="case-title">{item.title}</h3>
                                    <p className="case-excerpt">{item.excerpt}</p>
                                    <Button variant="secondary" className="pill-btn w-100 mt-auto">
                                        View Case Study <ArrowRight size={16} />
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 4. RELATED SERVICES (Horizontal Scroll) */}
            <section className="related-services-section container">
                <div className="section-header">
                    <h2 className="section-title">Related Services</h2>
                </div>
                <div className="related-services-scroll">
                    {relatedServices.map((service, idx) => (
                        <Card key={idx} className="related-service-card">
                            <div className="service-icon-box">{service.icon}</div>
                            <h4 className="service-name">{service.name}</h4>
                            <ArrowRight size={20} className="service-arrow" />
                        </Card>
                    ))}
                </div>
            </section>

            {/* 5. FINAL CTA */}
            <section className="case-final-cta-section container">
                <div className="final-cta-container dark-premium">
                    <div className="cta-content">
                        <h2 className="display-h2">Ready to See Similar Results <br /> for Your Business?</h2>
                        <p className="body-l">Book a free consultation and discover how we can deliver measurable growth.</p>
                        <Button variant="primary" className="cta-btn-large radius-18">Book Free Consultation</Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

// Helper for local ChevronDown
const ChevronDown = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m6 9 6 6 6-6" />
    </svg>
);

export default CaseStudiesPage;
