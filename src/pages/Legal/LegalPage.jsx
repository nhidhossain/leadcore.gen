import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, FileText, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import './LegalPage.css';

const LegalPage = () => {
    const location = useLocation();
    const isPrivacy = location.pathname === '/privacy-policy';

    return (
        <div className="legal-page">
            {/* 1. HERO SECTION */}
            <section className="legal-hero-section container">
                <motion.div
                    className="legal-hero"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="eyebrow">Legal Information</span>
                    <h1 className="display-h1">{isPrivacy ? "Privacy Policy" : "Terms & Conditions"}</h1>
                    <p className="body-l hero-subtext">
                        Learn how we protect your data and the rules governing the use of our services.
                    </p>
                    <div className="hero-actions">
                        <Link to="/free-consultation">
                            <Button variant="primary" className="pill-btn large">Book Free Consultation</Button>
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* 2. CONTENT SECTION */}
            <section className="legal-content-section container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <Card className="legal-card">
                        {isPrivacy ? (
                            <div className="legal-content-blocks">
                                <div className="content-block">
                                    <h2><ShieldCheck size={28} className="text-brand mr-12" /> Data Collection</h2>
                                    <p>We value your privacy and are committed to protecting your personal information. This policy explains what data we collect, how we use it, and your rights.</p>
                                    <p>We may collect information such as name, email address, and usage data to improve our services and communication.</p>
                                </div>
                                <div className="content-block">
                                    <h2><ShieldCheck size={28} className="text-brand mr-12" /> How We Use Your Data</h2>
                                    <p>Your data will never be sold to third parties and is used strictly for service purposes, such as managing inquiries and improving site performance.</p>
                                    <p>We implement industry-standard security measures to ensure your data remains protected from unauthorized access.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="legal-content-blocks">
                                <div className="content-block">
                                    <h2><FileText size={28} className="text-brand mr-12" /> General Terms</h2>
                                    <p>These terms govern your use of our website and services. By using our site, you agree to these terms in full.</p>
                                    <p>Users must comply with all applicable laws and provide accurate information when filling out forms on our site.</p>
                                </div>
                                <div className="content-block">
                                    <h2><FileText size={28} className="text-brand mr-12" /> Liability & Usage</h2>
                                    <p>LeadCore is not liable for indirect damages resulting from site use. We reserve the right to update these terms at any time without prior notice.</p>
                                    <p>Unauthorized use of our content or trademarks is strictly prohibited and may result in legal action.</p>
                                </div>
                            </div>
                        )}

                        <div className="legal-nav-strip">
                            <span>Need to read the other document?</span>
                            <Link to={isPrivacy ? "/terms-conditions" : "/privacy-policy"} className="legal-link-btn">
                                View {isPrivacy ? "Terms & Conditions" : "Privacy Policy"} <ArrowRight size={16} />
                            </Link>
                        </div>
                    </Card>
                </motion.div>
            </section>

            {/* 3. FINAL CTA */}
            <section className="legal-final-cta-section container">
                <div className="final-cta-container dark-premium">
                    <h2 className="display-h2 white">Have Questions About Legal Info?</h2>
                    <p className="body-l text-muted-white">Contact us or book a free consultation to clarify any concerns or questions you may have.</p>
                    <Link to="/contact">
                        <Button variant="primary" className="pill-btn large max-emphasis">Book Free Consultation</Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default LegalPage;
