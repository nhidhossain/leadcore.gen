import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../common/Button';
import './Header.css';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Use smooth scroll for hash links on home page, otherwise navigate
    const handleLinkClick = (e, path) => {
        if (location.pathname === '/' && path.startsWith('#')) {
            e.preventDefault();
            const element = document.querySelector(path);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <header className={`header-container ${isScrolled ? 'header-scrolled' : ''}`}>
            <nav className="header-nav">
                <Link to="/" className="logo">
                    <span className="logo-dot"></span>
                    <span className="logo-text">LeadCore</span>
                </Link>

                <div className="nav-links">
                    <Link to="/services" className="nav-link">Services</Link>
                    <Link to="/pricing" className="nav-link">Pricing</Link>
                    <Link to="/case-studies" className="nav-link">Case Studies</Link>
                    <Link to="/about" className="nav-link">About</Link>
                    <Link to="/contact" className="nav-link">Contact</Link>


                    <Link to="/blog" className="nav-link">Blog</Link>
                </div>

                <div className="nav-cta">
                    <Link to="/free-consultation">
                        <Button variant="primary">Free Consultation</Button>
                    </Link>
                </div>

                <button className="mobile-menu-toggle">
                    <span></span>
                    <span></span>
                </button>
            </nav>
        </header>
    );
};

export default Header;
