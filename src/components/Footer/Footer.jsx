import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-grid">
                <div className="footer-brand">
                    <Link to="/" className="logo">
                        <span className="logo-dot"></span>
                        <span className="logo-text">LeadCore</span>
                    </Link>
                    <p className="footer-tagline">
                        Building predictable B2B growth engines through strategic outreach.
                    </p>
                </div>

                <div className="footer-links">
                    <h4 className="footer-heading">Services</h4>
                    <ul>
                        <li><Link to="/services">B2B Lead List</Link></li>
                        <li><Link to="/services">LinkedIn Lead Gen</Link></li>
                        <li><Link to="/services">Cold Email Marketing</Link></li>
                        <li><Link to="/services">SEO Services</Link></li>
                    </ul>
                </div>

                <div className="footer-links">
                    <ul className="footer-list">
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/case-studies">Case Studies</Link></li>
                        <li><Link to="/pricing">Pricing</Link></li>
                        <li><Link to="/blog">Blog</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div className="footer-links">
                    <h4 className="footer-heading">Contact</h4>
                    <ul>
                        <li><a href="mailto:hello@leadcore.agency">hello@leadcore.agency</a></li>
                        <li><Link to="/free-consultation">Book a Call</Link></li>
                        <li><span className="text-muted">Dubai / London</span></li>
                    </ul>
                </div>

                <div className="footer-links newsletter-column">
                    <h4 className="footer-heading">Newsletter</h4>
                    <p className="footer-text">Weekly B2B growth tips.</p>
                    <div className="newsletter-form">
                        <input type="email" placeholder="Enter your email..." className="newsletter-input" />
                        <Button variant="primary" className="newsletter-btn">→</Button>
                    </div>
                </div>
            </div>

            <div className="container footer-bottom">
                <p>&copy; {new Date().getFullYear()} LeadCore Agency. All rights reserved.</p>
                <div className="footer-bottom-links">
                    <Link to="/privacy-policy">Privacy Policy</Link>
                    <Link to="/terms-conditions">Terms & Conditions</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
