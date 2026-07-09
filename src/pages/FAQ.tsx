import { useState } from 'react';
import PageTransition from '@/components/layouts/PageTransition';
import SectionHeading from '@/components/ui/SectionHeading';
import { faqItems } from '@/data/faq';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import SEO from '@/components/ui/SEO';
import { Link } from 'react-router';

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'General', 'Pricing', 'Timeline', 'Materials', 'Legal'];

  const filteredFAQs = activeCategory === 'All'
    ? faqItems
    : faqItems.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase());

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.slice(0, 10).map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <PageTransition>
      <SEO
        title="Construction FAQs | Merina Builders"
        description="Find answers to common construction, budgeting, project management, and renovation questions."
        keywords="Construction FAQs, Building Costs FAQ Thanjavur, Merina Builders Questions, Construction Advice"
        schema={faqSchema}
      />
      <main className="w-full relative pt-20">
        {/* Banner Section */}
        <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-navy">
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
          <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold font-display text-ivory">
              Frequently Asked <span className="text-gradient-gold italic">Questions</span>
            </h1>
            <p className="text-sm uppercase tracking-widest text-ivory/60 font-semibold mt-4">
              Clear answers regarding construction budgets, specifications, and timelines
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="section-padding bg-navy">
          <div className="max-w-4xl mx-auto">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2 justify-center mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-gold text-navy border-gold font-bold shadow-md shadow-gold/20'
                      : 'bg-navy-light/40 text-ivory/70 border-gold/10 hover:border-gold/30 hover:text-ivory'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Accordion List */}
            <div className="glass p-6 md:p-8 rounded-xl border border-gold/10">
              <Accordion className="w-full space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-b border-gold/10 last:border-b-0 pb-2"
                  >
                    <AccordionTrigger className="text-left text-base md:text-lg font-bold font-display text-ivory hover:text-gold hover:no-underline transition-colors duration-300 py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed pt-2 pb-4 font-sans">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Contact CTA */}
            <div className="mt-12 text-center">
              <p className="text-muted-foreground text-sm mb-4">
                Still have questions about construction or pricing?
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-gold to-gold-light text-navy font-bold text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-gold/20 transition-all cursor-pointer"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
