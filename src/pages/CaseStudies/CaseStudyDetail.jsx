import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { caseStudyService } from '../../services/mock-cms.service';
import './CaseStudyDetail.css';

const CaseStudyDetail = () => {
    const { slug } = useParams();
    const [caseStudy, setCaseStudy] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCaseStudy();
    }, [slug]);

    const loadCaseStudy = async () => {
        try {
            const data = await caseStudyService.getCaseStudyBySlug(slug);
            setCaseStudy(data);
        } catch (error) {
            console.error('Error loading case study:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading case study...</div>;
    }

    if (!caseStudy) {
        return (
            <div className="not-found">
                <h1>Case Study Not Found</h1>
                <p>The case study you're looking for doesn't exist.</p>
                <Link to="/case-studies">← Back to Case Studies</Link>
            </div>
        );
    }

    return (
        <div className="case-study-detail-page">
            {/* Hero Section */}
            <section className="case-study-hero">
                <div className="container">
                    <Link to="/case-studies" className="back-link">
                        <ArrowLeft size={20} />
                        Back to Case Studies
                    </Link>

                    <div className="hero-content">
                        <span className="service-badge">{caseStudy.service}</span>
                        <h1>{caseStudy.title}</h1>
                        <p className="subtitle">{caseStudy.subtitle}</p>

                        {caseStudy.metrics && caseStudy.metrics.length > 0 && (
                            <div className="metrics-highlight">
                                {caseStudy.metrics.map((metric, index) => (
                                    <div key={index} className="metric-item">
                                        <span className="metric-value">{metric.value}</span>
                                        <span className="metric-label">{metric.label}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Content Sections */}
            <section className="case-study-content">
                <div className="container">
                    {/* Problem */}
                    {caseStudy.problem && (
                        <div className="content-block">
                            <h2>The Challenge</h2>
                            <div dangerouslySetInnerHTML={{ __html: caseStudy.problem }} />
                        </div>
                    )}

                    {/* Solution */}
                    {caseStudy.solution && (
                        <div className="content-block">
                            <h2>Our Solution</h2>
                            <div dangerouslySetInnerHTML={{ __html: caseStudy.solution }} />
                        </div>
                    )}

                    {/* Results */}
                    {caseStudy.results && (
                        <div className="content-block results-block">
                            <h2>Results & Impact</h2>
                            <div dangerouslySetInnerHTML={{ __html: caseStudy.results }} />
                        </div>
                    )}

                    {/* Services Provided */}
                    {caseStudy.servicesProvided && caseStudy.servicesProvided.length > 0 && (
                        <div className="content-block">
                            <h2>Services Provided</h2>
                            <ul className="services-list">
                                {caseStudy.servicesProvided.map((service, index) => (
                                    <li key={index}>
                                        <CheckCircle size={20} />
                                        <span>{service}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="case-study-cta">
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready for Similar Results?</h2>
                        <p>Let's discuss how we can help grow your business</p>
                        <div className="cta-actions">
                            <Link to="/free-consultation" className="btn btn-primary">
                                Book Free Consultation
                            </Link>
                            <Link to="/case-studies" className="btn btn-secondary">
                                View More Case Studies
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CaseStudyDetail;
