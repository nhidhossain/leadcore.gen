import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import ServicesOverview from './pages/ServicesOverview/ServicesOverview'
import ServiceDetail from './pages/ServiceDetail/ServiceDetail'
import Pricing from './pages/Pricing/Pricing'
import CaseStudiesPage from './pages/CaseStudies/CaseStudiesPage'
import CaseStudyDetail from './pages/CaseStudies/CaseStudyDetail'
import ConsultationPage from './pages/Consultation/ConsultationPage'
import ThankYouPage from './pages/ThankYou/ThankYouPage'
import AboutPage from './pages/About/AboutPage'
import BlogPage from './pages/Blog/BlogPage'
import ContactPage from './pages/Contact/ContactPage'
import LegalPage from './pages/Legal/LegalPage'
// Admin Pages
import AdminLogin from './pages/Admin/AdminLogin'
import AdminLayout from './pages/Admin/AdminLayout'
import AdminDashboard from './pages/Admin/AdminDashboard'
import BlogManagement from './pages/Admin/BlogManagement'
import BlogEditor from './pages/Admin/BlogEditor'
import CaseStudyManagement from './pages/Admin/CaseStudyManagement'
import CaseStudyEditor from './pages/Admin/CaseStudyEditor'
import PricingManagement from './pages/Admin/PricingManagement'
import TeamManagement from './pages/Admin/TeamManagement'
import ContactMethodsManagement from './pages/Admin/ContactMethodsManagement'
import Settings from './pages/Admin/Settings'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            {/* Public Routes with Header/Footer */}
            <Route path="/" element={<><Header /><Home /><Footer /></>} />
            <Route path="/services" element={<><Header /><ServicesOverview /><Footer /></>} />
            <Route path="/services/:slug" element={<><Header /><ServiceDetail /><Footer /></>} />
            <Route path="/pricing" element={<><Header /><Pricing /><Footer /></>} />
            <Route path="/case-studies" element={<><Header /><CaseStudiesPage /><Footer /></>} />
            <Route path="/case-studies/:slug" element={<><Header /><CaseStudyDetail /><Footer /></>} />
            <Route path="/free-consultation" element={<><Header /><ConsultationPage /><Footer /></>} />
            <Route path="/thank-you" element={<><Header /><ThankYouPage /><Footer /></>} />
            <Route path="/about" element={<><Header /><AboutPage /><Footer /></>} />
            <Route path="/blog" element={<><Header /><BlogPage /><Footer /></>} />
            <Route path="/contact" element={<><Header /><ContactPage /><Footer /></>} />
            <Route path="/privacy-policy" element={<><Header /><LegalPage /><Footer /></>} />
            <Route path="/terms-conditions" element={<><Header /><LegalPage /><Footer /></>} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={
              <ProtectedRoute>
                <AdminLayout>
                  <Routes>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="blog" element={<BlogManagement />} />
                    <Route path="blog/new" element={<BlogEditor />} />
                    <Route path="blog/edit/:id" element={<BlogEditor />} />
                    <Route path="case-studies" element={<CaseStudyManagement />} />
                    <Route path="case-studies/new" element={<CaseStudyEditor />} />
                    <Route path="case-studies/edit/:id" element={<CaseStudyEditor />} />
                    <Route path="pricing" element={<PricingManagement />} />
                    <Route path="team" element={<TeamManagement />} />
                    <Route path="contact-methods" element={<ContactMethodsManagement />} />
                    <Route path="settings" element={<Settings />} />
                  </Routes>
                </AdminLayout>
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
