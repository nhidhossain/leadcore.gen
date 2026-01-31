import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowRight, Zap, TrendingUp, Users, Target } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Dropdown from '../../components/common/Dropdown';
import { caseStudyService } from '../../services/mock-cms.service';
import './CaseStudiesPage.css';

const CaseStudiesPage = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [selectedService, setSelectedService] = useState('All');
    const [selectedIndustry, setSelectedIndustry] = useState('All');
    const [selectedResult, setSelectedResult] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [caseStudies, setCaseStudies] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load case studies from CMS
    useEffect(() => {
        loadCaseStudies();
    }, []);

    const loadCaseStudies = async () => {
        try {
            const data = await caseStudyService.getPublishedCaseStudies();
            setCaseStudies(data);
        } catch (error) {
            console.error('Error loading case studies:', error);
        } finally {
            setLoading(false);
        }
    };

    // Extract unique values for filters from loaded data
    const services = ['All', ...new Set(caseStudies.map(cs => cs.service).filter(Boolean))];
    const industries = ['All', ...new Set(caseStudies.map(cs => cs.industry).filter(Boolean))];

    const filteredCases = caseStudies.filter(item => {
        const matchService = selectedService === 'All' || item.service === selectedService;
        const matchIndustry = selectedIndustry === 'All' || item.industry === selectedIndustry;

        const searchLower = searchQuery.toLowerCase();
        const matchSearch = (item.title || '').toLowerCase().includes(searchLower) ||
            ((item.subtitle || '').toLowerCase().includes(searchLower) ||
                (item.clientName || '').toLowerCase().includes(searchLower));

        return matchService && matchIndustry && matchSearch;
    });

    const relatedServices = [
        { name: 'B2B Lead List', icon: <Target size={24} /> },
        { name: 'LinkedIn Lead Generation', icon: <Users size={24} /> },
        { name: 'Cold Email Campaigns', icon: <Zap size={24} /> },
        { name: 'SEO & Content', icon: <TrendingUp size={24} /> }
    ];

    if (loading) {
        return (
            <div className="case-studies-page">
                <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
                    <p>Loading case studies...</p>
                </div>
            </div>
        );
    }

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
                    <Dropdown
                        label="Service Type"
                        value={selectedService}
                        onChange={setSelectedService}
                        options={services.map(s => ({ value: s, label: s }))}
                        placeholder="All Services"
                    />
                    <Dropdown
                        label="Industry"
                        value={selectedIndustry}
                        onChange={setSelectedIndustry}
                        options={industries.map(i => ({ value: i, label: i }))}
                        placeholder="All Industries"
                    />
                    <Dropdown
                        label="Results"
                        value={selectedResult}
                        onChange={setSelectedResult}
                        options={[
                            { value: 'All', label: 'All Results' },
                            { value: 'High ROI', label: 'High ROI' },
                            { value: 'Lead Volume', label: 'Lead Volume' },
                            { value: 'Pipeline Growth', label: 'Pipeline Growth' },
                            { value: 'Enterprise Impact', label: 'Enterprise Impact' }
                        ]}
                        placeholder="All Results"
                    />
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
                {filteredCases.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <h3>No case studies found</h3>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>
                            {caseStudies.length === 0
                                ? 'Case studies will appear here once they are published.'
                                : 'Try adjusting your filters or search query.'}
                        </p>
                    </div>
                ) : (
                    <div className="case-grid">
                        {filteredCases.map((item, index) => (
                            <motion.div
                                key={item.id || index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="case-study-card">
                                    <div className="case-thumbnail" style={{ backgroundColor: item.heroImage || 'rgba(0, 164, 147, 0.1)' }}>
                                        <span className="service-badge">{item.service || 'Service'}</span>
                                    </div>
                                    <div className="case-content">
                                        {item.metrics && item.metrics.length > 0 && (
                                            <div className="case-metrics">
                                                <span className="metric-value">{item.metrics[0].value}</span>
                                                <span className="metric-label">{item.metrics[0].label}</span>
                                            </div>
                                        )}
                                        <h3 className="case-title">{item.title}</h3>
                                        <p className="case-excerpt">{item.subtitle || item.excerpt || 'Case study details'}</p>
                                        <Button variant="secondary" className="pill-btn w-100 mt-auto" to={`/case-studies/${item.slug}`}>
                                            View Case Study <ArrowRight size={16} />
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
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
                        <Button variant="primary" className="cta-btn-large radius-18" to="/free-consultation">Book Free Consultation</Button>
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
