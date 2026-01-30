import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import ServicesOverview from './pages/ServicesOverview/ServicesOverview'
import ServiceDetail from './pages/ServiceDetail/ServiceDetail'
import Pricing from './pages/Pricing/Pricing'
import CaseStudiesPage from './pages/CaseStudies/CaseStudiesPage'
import ConsultationPage from './pages/Consultation/ConsultationPage'
import ThankYouPage from './pages/ThankYou/ThankYouPage'
import AboutPage from './pages/About/AboutPage'
import BlogPage from './pages/Blog/BlogPage'
import ContactPage from './pages/Contact/ContactPage'
import LegalPage from './pages/Legal/LegalPage'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesOverview />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/free-consultation" element={<ConsultationPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<LegalPage />} />
          <Route path="/terms-conditions" element={<LegalPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
