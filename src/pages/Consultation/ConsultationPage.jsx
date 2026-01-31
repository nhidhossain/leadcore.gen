import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, Calendar, ArrowRight, TrendingUp, Users, Target, Zap } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Dropdown from '../../components/common/Dropdown';
import DatePicker from '../../components/common/DatePicker';
import './ConsultationPage.css';

const ConsultationPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        company: '',
        role: '',
        leadsCount: '',
        goal: '',
        selectedDate: null // Added for custom picker
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setTimeout(() => {
            navigate('/thank-you');
        }, 800);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const metrics = [
        { label: 'Leads Generated', value: '700K+' },
        { label: 'Revenue Influenced', value: '$5M+' },
        { label: 'B2B Clients Served', value: '50+' },
        { label: 'Avg. Response Rate', value: '12%+' }
    ];

    return (
        <div className="consultation-page">
            {/* 1. SPLIT-HERO SECTION */}
            <section className="consultation-hero-section container">
                <motion.div
                    className="split-hero"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="hero-text">
                        <span className="eyebrow">Book Your Free Consultation</span>
                        <h1 className="display-xl">Personalized Lead Generation <br /> <span className="text-brand">Strategies for Your Business</span></h1>
                        <p className="body-l hero-subtext">
                            Speak with a strategist to see how we can create predictable growth tailored to your goals.
                        </p>
                        <div className="hero-actions">
                            <a href="#consultation-form">
                                <Button variant="primary" className="pill-btn large">Schedule My Free Consultation</Button>
                            </a>
                            <Link to="/case-studies">
                                <Button variant="secondary" className="pill-btn large">View Case Studies</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="hero-visual">
                        <div className="abstract-illustration subtle-float">
                            <div className="blob-1"></div>
                            <div className="blob-2"></div>
                            <div className="visual-card">
                                <TrendingUp size={32} className="text-brand" />
                                <span>+120% Lead Growth</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* 2. MODULAR FORM */}
            <section id="consultation-form" className="form-section container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <Card className="modular-form-card">
                        <h2 className="section-title">Consultation Details</h2>
                        <form onSubmit={handleSubmit} className="modular-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input type="text" name="fullName" required placeholder="John Doe" onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" name="email" required placeholder="john@company.com" onChange={handleChange} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Company Name</label>
                                    <input type="text" name="company" required placeholder="Acme Inc" onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <Dropdown
                                        label="Role / Position"
                                        value={formData.role}
                                        onChange={(value) => setFormData({ ...formData, role: value })}
                                        options={[
                                            { value: 'Founder', label: 'Founder' },
                                            { value: 'Marketing Lead', label: 'Marketing Lead' },
                                            { value: 'Sales Lead', label: 'Sales Lead' },
                                            { value: 'Agency', label: 'Agency' },
                                            { value: 'Other', label: 'Other' }
                                        ]}
                                        placeholder="Select Role"
                                        fullWidth
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <Dropdown
                                    label="Current Monthly Leads (Optional)"
                                    value={formData.leadsCount}
                                    onChange={(value) => setFormData({ ...formData, leadsCount: value })}
                                    options={[
                                        { value: '0–50', label: '0 – 50' },
                                        { value: '50–100', label: '50 – 100' },
                                        { value: '100–500', label: '100 – 500' },
                                        { value: '500+', label: '500+' }
                                    ]}
                                    placeholder="Select Range"
                                    fullWidth
                                />
                            </div>

                            <div className="form-group">
                                <label>Goals / Challenges</label>
                                <textarea
                                    name="goal"
                                    required
                                    rows="4"
                                    placeholder="Briefly describe your current lead generation challenges or goals"
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            {/* Calendar Integration Placeholder */}
                            <div className="calendar-placeholder-section">
                                <label className="calendar-label">Select a Date & Time</label>
                                <div className="calendar-picker-container">
                                    <div className="date-picker-wrapper">
                                        <label className="sub-label">Date</label>
                                        <DatePicker
                                            selectedDate={formData.selectedDate}
                                            onChange={(date) => setFormData({ ...formData, selectedDate: date })}
                                        />
                                    </div>
                                    <div className="time-picker-wrapper">
                                        <label className="sub-label">Available Time Slots</label>
                                        <div className="time-slots-grid">
                                            {['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM'].map((time) => (
                                                <button
                                                    key={time}
                                                    type="button"
                                                    className="time-slot-btn"
                                                    onClick={(e) => {
                                                        e.target.classList.toggle('selected');
                                                        // In a real app, set state here
                                                    }}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="availability-indicator">
                                    <div className="status-dot online"></div>
                                    <span>Live Availability: Strategists are available</span>
                                </div>
                            </div>

                            <Button type="submit" variant="primary" className="pill-btn w-100 submit-btn">
                                Schedule Consultation
                            </Button>
                        </form>
                    </Card>
                </motion.div>
            </section>



            {/* 4. EXPECTATIONS */}
            <section className="expectations-section container">
                <h2 className="section-title centered-text">What to Expect</h2>
                <div className="expectations-grid">
                    <Card className="info-card">
                        <h4 className="info-title">Personalized Strategy</h4>
                        <p>A personalized strategy tailored to your business goals and market stage.</p>
                    </Card>
                    <Card className="info-card">
                        <h4 className="info-title">Measurable Outcomes</h4>
                        <p>Clear next steps and measurable outcomes for your lead generation efforts.</p>
                    </Card>
                    <Card className="info-card">
                        <h4 className="info-title">Honest Assessment</h4>
                        <p>An honest assessment of which services fit your goals and where we can help.</p>
                    </Card>
                </div>
            </section>

            {/* 5. TRUST METRICS */}
            <section className="trust-metrics-section container">
                <div className="trust-strip">
                    {metrics.map((metric, idx) => (
                        <div key={idx} className="trust-card-mini">
                            <span className="trust-value">{metric.value}</span>
                            <span className="trust-label">{metric.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* 6. FINAL CTA */}
            <section className="consultation-final-cta-ref container">
                <div className="final-cta-container dark-premium">
                    <h2 className="display-h2 white">Ready to See Predictable Growth <br /> for Your Business?</h2>
                    <p className="body-l">Book your free strategy session today and get actionable recommendations.</p>
                    <a href="#consultation-form">
                        <Button variant="primary" className="pill-btn large max-emphasis">Schedule My Free Consultation</Button>
                    </a>
                </div>
            </section>
        </div>
    );
};

export default ConsultationPage;
