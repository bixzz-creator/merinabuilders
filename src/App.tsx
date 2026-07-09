import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router';
import { AnimatePresence } from 'motion/react';
import LenisProvider from '@/components/providers/LenisProvider';
import Navbar from '@/components/layouts/Navbar';
import Footer from '@/components/layouts/Footer';
import ScrollToTop from '@/components/layouts/ScrollToTop';
import WhatsAppCTA from '@/components/ui/WhatsAppCTA';

const AIChatAssistant = lazy(() => import('@/components/ui/AIChatAssistant'));

// Lazy loading all 12 page routes to achieve Lighthouse Performance 98+
const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Services = lazy(() => import('@/pages/Services'));
const Projects = lazy(() => import('@/pages/Projects'));
const Gallery = lazy(() => import('@/pages/Gallery'));
const Testimonials = lazy(() => import('@/pages/Testimonials'));
const OurProcess = lazy(() => import('@/pages/OurProcess'));
const Contact = lazy(() => import('@/pages/Contact'));
const FAQ = lazy(() => import('@/pages/FAQ'));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'));
const Terms = lazy(() => import('@/pages/Terms'));
const Estimator = lazy(() => import('@/pages/Estimator'));
const NotFound = lazy(() => import('@/pages/NotFound'));

export default function App() {
  const location = useLocation();

  return (
    <LenisProvider>

      <div className="flex flex-col min-h-screen bg-navy text-ivory selection:bg-gold selection:text-navy">
        {/* Sticky navbar */}
        <Navbar />

        {/* Route pages with smooth height transition container */}
        <div className="flex-grow">
          <Suspense fallback={
            <div className="w-full h-screen flex items-center justify-center bg-navy">
              <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
            </div>
          }>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/our-process" element={<OurProcess />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/blog" element={<Navigate to="/" replace />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/estimator" element={<Estimator />} />
                <Route path="/index.html" element={<Navigate to="/" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </div>

        {/* Footer */}
        <Footer />

        {/* Global Floating Elements */}
        <WhatsAppCTA />
        <ScrollToTop />
        <Suspense fallback={null}>
          <AIChatAssistant />
        </Suspense>
      </div>
    </LenisProvider>
  );
}
