import { Link } from 'react-router';
import { motion } from 'motion/react';
import PageTransition from '@/components/layouts/PageTransition';
import SectionHeading from '@/components/ui/SectionHeading';
import SEO from '@/components/ui/SEO';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import { blogPosts } from '@/data/blog';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import blogHeroImg from '@/assets/images/hero-construction.png';

export default function BlogList() {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://merinabuilders.com/blog#blog",
    "name": "Construction Insights & Guides | Merina Builders",
    "description": "Expert home construction guides, cost budgeting tips, Vastu planning advice, and sustainable engineering articles from Merina Builders Construction.",
    "publisher": {
      "@type": "Organization",
      "name": "Merina Builders Construction",
      "logo": "https://merinabuilders.com/logo.png"
    },
    "blogPost": blogPosts.map((post) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "datePublished": post.date,
      "description": post.excerpt,
      "url": `https://merinabuilders.com/blog/${post.id}`
    }))
  };

  return (
    <PageTransition>
      <SEO
        title="Construction Guides & Insights | Merina Builders Blog"
        description="Explore expert home construction guides, cost budgeting tips, Vastu planning advice, and sustainable engineering articles from Merina Builders Construction."
        keywords="Construction Blog, Home Construction Cost Guide, Vastu Home Design, Rebuild vs Renovation Thanjavur, Building Contractors Tamil Nadu"
        schema={blogSchema}
      />

      <main className="w-full relative pt-20 bg-navy text-ivory">
        {/* Banner Section */}
        <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
          <img
            src={blogHeroImg}
            alt="Merina Builders Construction Guides Blog"
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-bold font-display text-ivory mb-4">
              Insights & <span className="text-gradient-gold italic">Guides</span>
            </h1>
            <div className="w-20 h-0.5 bg-gold mx-auto mb-6" />
            <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-ivory/60 font-semibold max-w-xl mx-auto leading-relaxed">
              Topical civil engineering tips and Vastu design guidelines
            </p>
          </div>
        </section>

        {/* Blog Post Grid Section */}
        <section className="section-padding bg-navy relative">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              badge="Our Knowledge Base"
              title="Recent Articles & Resources"
              subtitle="Get professional building guidelines, cost management checks, and sustainable renovation tips straight from our certified engineering team."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {blogPosts.map((post, index) => (
                <RevealOnScroll
                  key={post.id}
                  direction="up"
                  delay={index * 0.1}
                  className="h-full"
                >
                  <Link
                    to={`/blog/${post.id}`}
                    className="flex flex-col h-full rounded-2xl overflow-hidden glass border border-gold/15 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 hover:-translate-y-1.5 transition-all duration-500 group"
                  >
                    {/* Image Header */}
                    <div className="relative w-full aspect-video overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                      <span className="absolute top-4 left-4 px-3 py-1 bg-gold text-navy text-[10px] font-bold uppercase tracking-wider rounded-md">
                        {post.category}
                      </span>
                    </div>

                    {/* Content Body */}
                    <div className="p-6 sm:p-8 flex flex-col flex-1">
                      {/* Meta parameters */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-gold" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-gold" />
                          <span>{post.readTime} read</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold font-display text-ivory mb-3 leading-snug group-hover:text-gold transition-colors duration-300">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                        {post.excerpt}
                      </p>

                      {/* Read Link */}
                      <div className="inline-flex items-center gap-2 text-xs font-bold text-gold group-hover:text-gold-light uppercase tracking-widest mt-auto">
                        Read Article
                        <ArrowRight className="w-3.5 h-3.5 transform translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}

