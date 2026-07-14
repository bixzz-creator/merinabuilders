import React, { useState } from 'react';
import PageTransition from '@/components/layouts/PageTransition';
import SectionHeading from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SEO from '@/components/ui/SEO';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import {
  COMPANY_PHONE,
  COMPANY_EMAIL,
  COMPANY_ADDRESS,
  COMPANY_HOURS,
  COMPANY_WHATSAPP
} from '@/constants/navigation';
import { Phone, Mail, MapPin, Clock, CalendarRange, Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import contactHeroImg from '@/assets/images/hero-construction.png';

export default function Contact() {
  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Booking site visit state
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('');
  const [visitSubmitted, setVisitSubmitted] = useState(false);
  const [visitOpen, setVisitOpen] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Invalid phone number (must be 10 digits)';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setErrors({});
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: 'c24377ad-2bc1-4965-be7c-5a9d5826b8fd',
            from_name: 'Merina Builders Website',
            subject: `New Website Inquiry from ${formData.name}`,
            title: 'Merina Builders - New Web Inquiry',
            'Company Name': 'Merina Builders',
            'Company Address': '5/286, Ponnagar 2nd Street, Pasupathikovil, Thanjavur',
            'Client Name': formData.name,
            'Client Email': formData.email,
            'Client Phone': formData.phone,
            'Inquiry Subject': formData.subject || 'General Inquiry',
            'Message Details': formData.message,
          }),
        });

        const result = await response.json();
        if (result.success) {
          setSubmitted(true);
          setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
          setTimeout(() => setSubmitted(false), 8000);
        } else {
          setErrors({ submit: result.message || 'Something went wrong. Please try again.' });
        }
      } catch (error) {
        setErrors({ submit: 'Network error. Please check your connection and try again.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (visitDate && visitTime) {
      setVisitSubmitted(true);
      setTimeout(() => {
        setVisitSubmitted(false);
        setVisitOpen(false);
        setVisitDate('');
        setVisitTime('');
      }, 3000);
    }
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Merina Builders",
    "description": "Contact Merina Builders for commercial construction, project management, renovation, and construction estimates in Thanjavur and Kumbakonam.",
    "url": "https://merinabuilders.com/contact"
  };

  return (
    <PageTransition>
      <SEO
        title="Contact Merina Builders"
        description="Contact Merina Builders for commercial construction, project management, renovation, and construction estimates in Thanjavur and Kumbakonam."
        keywords="Contact Merina Builders, Construction Company Address Thanjavur, Phone Number Builders Thanjavur, Site Visit Reservation"
        schema={contactSchema}
      />
      <main className="w-full relative pt-20">
        {/* Banner Section */}
        <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-navy">
          <img
            src={contactHeroImg}
            alt="Contact Merina Builders"
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
          <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold font-display text-ivory">
              Contact <span className="text-gradient-gold italic">Us</span>
            </h1>
            <p className="text-sm uppercase tracking-widest text-ivory/60 font-semibold mt-4">
              Book consultations, visits, and request quotes
            </p>
          </div>
        </section>

        {/* 4 Contact Action Cards */}
        <section className="py-12 bg-navy px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Call Now */}
            <a
              href={`tel:${COMPANY_PHONE}`}
              className="glass p-6 rounded-xl text-center flex flex-col items-center justify-center border border-gold/10 hover:border-gold/30 hover:scale-[1.03] transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold border border-gold/25 mb-4 group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold font-display text-ivory mb-1">Call Now</h3>
              <p className="text-xs text-muted-foreground mb-3">Direct support & inquiries</p>
              <span className="text-sm font-bold text-gold">{COMPANY_PHONE}</span>
            </a>

            {/* WhatsApp */}
            <a
              href={COMPANY_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-6 rounded-xl text-center flex flex-col items-center justify-center border border-gold/10 hover:border-gold/30 hover:scale-[1.03] transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center border border-gold/25 mb-4 group-hover:scale-110 transition-transform overflow-hidden p-2.5">
                <img src="/Whatsapp.avif" alt="WhatsApp" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-base font-bold font-display text-ivory mb-1">WhatsApp Chat</h3>
              <p className="text-xs text-muted-foreground mb-3">Instant chat connection</p>
              <span className="text-sm font-bold text-gold">Start Chat</span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${COMPANY_EMAIL}`}
              className="glass p-6 rounded-xl text-center flex flex-col items-center justify-center border border-gold/10 hover:border-gold/30 hover:scale-[1.03] transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold border border-gold/25 mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold font-display text-ivory mb-1">Email Us</h3>
              <p className="text-xs text-muted-foreground mb-3">Send project specifications</p>
              <span className="text-sm font-bold text-gold">{COMPANY_EMAIL}</span>
            </a>

            {/* Book Site Visit */}
            <Dialog open={visitOpen} onOpenChange={setVisitOpen}>
              <DialogTrigger render={
                <button type="button" className="glass p-6 rounded-xl text-center flex flex-col items-center justify-center border border-gold/10 hover:border-gold/30 hover:scale-[1.03] transition-all duration-300 group cursor-pointer w-full" />
              }>
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold border border-gold/25 mb-4 group-hover:scale-110 transition-transform">
                  <CalendarRange className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold font-display text-ivory mb-1">Book Site Visit</h3>
                <p className="text-xs text-muted-foreground mb-3">Schedule on-site evaluation</p>
                <span className="text-sm font-bold text-gold">Book Now</span>
              </DialogTrigger>

              <DialogContent className="bg-navy border border-gold/20 text-ivory rounded-xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold font-display text-gradient-gold">
                    Book a Site Visit
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground text-sm">
                    Select your preferred date and time slot. Our project engineer will call to confirm.
                  </DialogDescription>
                </DialogHeader>

                <AnimatePresence mode="wait">
                  {!visitSubmitted ? (
                    <form onSubmit={handleVisitSubmit} className="space-y-4 mt-4">
                      <div>
                        <label className="text-xs uppercase font-bold tracking-widest text-muted-foreground mb-1.5 block">Select Date</label>
                        <Input
                          type="date"
                          required
                          value={visitDate}
                          onChange={(e) => setVisitDate(e.target.value)}
                          className="bg-navy-light border-gold/15 text-ivory focus-visible:ring-gold"
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase font-bold tracking-widest text-muted-foreground mb-1.5 block">Preferred Time</label>
                        <Input
                          type="time"
                          required
                          value={visitTime}
                          onChange={(e) => setVisitTime(e.target.value)}
                          className="bg-navy-light border-gold/15 text-ivory focus-visible:ring-gold"
                        />
                      </div>
                      <Button type="submit" className="w-full bg-gradient-to-r from-gold to-gold-light text-navy font-bold rounded-lg mt-4">
                        Schedule Visit
                      </Button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-8 flex flex-col items-center justify-center"
                    >
                      <CheckCircle2 className="w-16 h-16 text-[#25D366] mb-4" />
                      <h4 className="text-lg font-bold font-display text-ivory">Visit Request Received!</h4>
                      <p className="text-sm text-muted-foreground mt-2 max-w-xs">
                        Our division lead will call you shortly to confirm the scheduled visit.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        {/* Contact Form and Details */}
        <section className="section-padding bg-navy-light border-t border-gold/10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Form Column */}
              <div className="lg:col-span-7">
                <div className="glass p-8 md:p-10 rounded-xl border border-gold/10 relative">
                  <h3 className="text-2xl font-bold font-display text-gradient-gold mb-2">Send an Inquiry</h3>
                  <p className="text-sm text-muted-foreground mb-6">Fill out the form below and our consulting engineers will get back to you within 24 hours.</p>

                  <AnimatePresence mode="wait">
                    {!submitted ? (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Input
                              placeholder="Your Name *"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className={`bg-navy/80 border-gold/20 text-ivory py-5 h-11 focus-visible:ring-gold focus-visible:border-gold/60 ${errors.name ? 'border-destructive' : ''}`}
                            />
                            {errors.name && <span className="text-xs text-destructive mt-1 block">{errors.name}</span>}
                          </div>
                          <div>
                            <Input
                              placeholder="Your Phone *"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className={`bg-navy/80 border-gold/20 text-ivory py-5 h-11 focus-visible:ring-gold focus-visible:border-gold/60 ${errors.phone ? 'border-destructive' : ''}`}
                            />
                            {errors.phone && <span className="text-xs text-destructive mt-1 block">{errors.phone}</span>}
                          </div>
                        </div>

                        <div>
                          <Input
                            placeholder="Email Address *"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={`bg-navy/80 border-gold/20 text-ivory py-5 h-11 focus-visible:ring-gold focus-visible:border-gold/60 ${errors.email ? 'border-destructive' : ''}`}
                          />
                          {errors.email && <span className="text-xs text-destructive mt-1 block">{errors.email}</span>}
                        </div>

                        <div>
                          <Input
                            placeholder="Subject"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="bg-navy/80 border-gold/20 text-ivory py-5 h-11 focus-visible:ring-gold focus-visible:border-gold/60"
                          />
                        </div>

                        <div>
                          <Textarea
                            placeholder="Your Message *"
                            rows={5}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className={`bg-navy/80 border-gold/20 text-ivory p-3 focus-visible:ring-gold focus-visible:border-gold/60 ${errors.message ? 'border-destructive' : ''}`}
                          />
                          {errors.message && <span className="text-xs text-destructive mt-1 block">{errors.message}</span>}
                        </div>

                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-gold to-gold-light text-navy font-bold rounded-lg py-5 h-11 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-navy border-t-transparent rounded-full animate-spin" />
                              <span>Submitting...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              <span>Submit Inquiry</span>
                            </>
                          )}
                        </Button>
                        {errors.submit && (
                          <span className="text-xs text-destructive mt-2 block text-center font-semibold">
                            {errors.submit}
                          </span>
                        )}
                      </form>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-16 flex flex-col items-center justify-center"
                      >
                        <CheckCircle2 className="w-16 h-16 text-[#25D366] mb-4" />
                        <h4 className="text-xl font-bold font-display text-ivory">Inquiry Submitted Successfully!</h4>
                        <p className="text-sm text-muted-foreground mt-2 max-w-sm">
                          Thank you for contacting Merina Builders. A copy of your inquiry has been logged, and our team will connect with you shortly.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Details and Google Map */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {/* Office Info Card */}
                <div className="glass p-6 rounded-xl border border-gold/10 space-y-4">
                  <h4 className="text-lg font-bold font-display text-ivory">Head Office</h4>
                  
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-gold" />
                    <span>{COMPANY_ADDRESS}</span>
                  </div>

                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mt-0.5 shrink-0 text-gold" />
                    <span>{COMPANY_HOURS}</span>
                  </div>
                </div>

                {/* Interactive Google Map Iframe */}
                <div className="relative rounded-xl overflow-hidden flex-grow min-h-[300px] border border-gold/10">
                  <iframe
                    title="Merina Builders Office Location Map"
                    src="https://maps.google.com/maps?q=10.889114462661624,79.18036312111883&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '300px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}

