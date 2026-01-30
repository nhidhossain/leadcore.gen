import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Clock, Send, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import './ContactPage.css';

const ContactPage = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const alternativeContacts = [
        { title: 'Email Us', val: 'contact@advazon.com', icon: <Mail size={24} />, link: 'mailto:contact@advazon.com' },
        { title: 'Call Us', val: '+1 234 567 890', icon: <Phone size={24} />, link: 'tel:+1234567890' },
        { title: 'LinkedIn', val: 'Advazon Official', icon: <Linkedin size={24} />, link: 'https://linkedin.com/company/advazon' },
        { title: 'Office Hours', val: 'Mon-Fri, 9am–6pm', icon: <Clock size={24} /> }
    ];

    if (submitted) {
        return (
            <div className="contact-page thank-you-state">
                <section className="container-narrow">
                    <motion.div
                        className="confirmation-card"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div className="success-icon-box">
                            <Send size={48} className="text-brand" />
                        </div>
                        <h1 className="display-h1">Message Sent!</h1>
                        <p className="body-l">
                            Thank you for reaching out. A member of our team will get back to you within 24 hours.
                        </p>
                        <Link to="/">
                            <Button variant="primary" className="pill-btn large">Back to Home</Button>
                        </Link>
                    </motion.div>
                </section>
            </div>
        );
    }

    return (
        <div className="contact-page">
            {/* 1. HERO SECTION */}
            <section className="contact-hero-section container">
                <motion.div
                    className="contact-hero"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="hero-text">
                        <span className="eyebrow text-brand">Get in Touch</span>
                        <h1 className="display-xl">Let’s Talk About Your <br /> <span className="text-brand">Lead Generation Goals</span></h1>
                        <p className="body-l hero-subtext">
                            Not ready for a consultation yet? Drop us a message or reach out directly to see how we can help.
                        </p>
                        <div className="hero-actions">
                            <Link to="/free-consultation">
                                <Button variant="primary" className="pill-btn large">Book Free Consultation</Button>
                            </Link>
                            <a href="mailto:contact@advazon.com">
                                <Button variant="secondary" className="pill-btn large">Email / Call</Button>
                            </a>
                        </div>
                    </div>
                    <div className="hero-visual">
                        <div className="contact-visual-orb subtle-float">
                            <div className="visual-circle-large"></div>
                            <Send size={80} className="text-brand opacity-20" />
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* 2. MODULAR CONTACT FORM */}
            <section className="form-section container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <Card className="contact-form-card">
                        <h2 className="section-title">Send a Message</h2>
                        <form onSubmit={handleSubmit} className="modular-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input type="text" required placeholder="John Doe" />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" required placeholder="john@company.com" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Subject</label>
                                <input type="text" required placeholder="General Inquiry" />
                            </div>

                            <div className="form-group">
                                <label>Message</label>
                                <textarea
                                    required
                                    rows="5"
                                    placeholder="Your message or inquiry..."
                                ></textarea>
                            </div>

                            <Button type="submit" variant="primary" className="pill-btn w-100 submit-btn">
                                Send Message <Send size={18} className="ml-8" />
                            </Button>
                        </form>
                    </Card>
                </motion.div>
            </section>

            {/* 3. ALTERNATIVE CONTACTS */}
            <section className="alternatives-section container">
                <h2 className="section-title centered-text">Alternative Ways to Reach Us</h2>
                <div className="alternatives-grid">
                    {alternativeContacts.map((contact, idx) => (
                        <Card key={idx} className="alt-contact-card">
                            <div className="alt-icon-box">{contact.icon}</div>
                            <div className="alt-info">
                                <h4 className="alt-title">{contact.title}</h4>
                                {contact.link ? (
                                    <a href={contact.link} className="alt-val">{contact.val}</a>
                                ) : (
                                    <span className="alt-val">{contact.val}</span>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* 4. FINAL CTA */}
            <section className="contact-final-cta-section container">
                <div className="final-cta-container dark-premium">
                    <h2 className="display-h2 white">Ready to Take the Next Step?</h2>
                    <p className="body-l text-muted-white">Whether it’s a consultation or a direct inquiry, we’re here to help you grow.</p>
                    <Link to="/free-consultation">
                        <Button variant="primary" className="pill-btn large max-emphasis">Book Free Consultation</Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
