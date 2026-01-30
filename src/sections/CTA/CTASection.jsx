import React from 'react';
import Button from '../../components/common/Button';
import './CTASection.css';

const CTASection = () => {
    return (
        <section className="cta-section container">
            <div className="cta-container">
                <div className="cta-content">
                    <h2 className="cta-title">Ready to fill your pipeline?</h2>
                    <p className="cta-subtext">
                        Join 50+ B2B companies using LeadCore to scale their outreach and book more meetings.
                    </p>
                    <div className="cta-actions">
                        <Button variant="primary" className="cta-btn-large">
                            Book Your Free Consultation
                        </Button>
                        <p className="cta-note">No commitment required. 30-min strategy session.</p>
                    </div>
                </div>
                <div className="cta-bg-glow"></div>
            </div>
        </section>
    );
};

export default CTASection;
