import { useParams, Link, Navigate } from 'react-router';
import { motion } from 'motion/react';
import PageTransition from '@/components/layouts/PageTransition';
import SEO from '@/components/ui/SEO';
import RevealOnScroll from '@/components/animations/RevealOnScroll';
import { blogPosts } from '@/data/blog';
import { Calendar, Clock, ArrowLeft, ArrowRight, User } from 'lucide-react';

export default function BlogPost() {
  const { blogId } = useParams();

  const post = blogPosts.find((p) => p.id === blogId?.toLowerCase());
  
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Get recent posts excluding active post
  const recentPosts = blogPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 3);

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://merinabuilders.com/blog/${post.id}#blogposting`,
    "headline": post.title,
    "description": post.excerpt,
    "image": `https://merinabuilders.com${post.image}`,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": "Mr. Antony Louis P",
      "jobTitle": "Managing Director",
      "worksFor": {
        "@type": "Organization",
        "name": "Merina Builders Construction"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Merina Builders Construction",
      "logo": {
        "@type": "ImageObject",
        "url": "https://merinabuilders.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://merinabuilders.com/blog/${post.id}`
    }
  };

  return (
    <PageTransition>
      <SEO
        title={`${post.title} | Merina Builders Blog`}
        description={post.excerpt}
        keywords={`${post.category}, Construction Guides, Thanjavur Builders`}
        schema={blogPostingSchema}
      />

      <main className="w-full relative pt-20 bg-navy text-ivory">
        
        {/* Banner Section */}
        <section className="relative min-h-[45vh] py-16 flex items-center justify-center bg-navy-light/40 border-b border-gold/10">
          <div className="absolute inset-0 z-0">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover opacity-15 pointer-events-none"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy-light/10" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold text-gold hover:text-gold-light uppercase tracking-wider transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Insights
            </Link>
            
            <span className="inline-block px-3 py-1 bg-gold/10 border border-gold/30 rounded-md text-gold text-[10px] uppercase font-bold tracking-widest">
              {post.category}
            </span>

            <h1 className="text-3xl sm:text-5xl font-bold font-display text-ivory leading-tight max-w-3xl mx-auto">
              {post.title}
            </h1>

            {/* Meta values */}
            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground pt-2">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-gold" />
                <span>By Antony Louis P</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gold" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-gold" />
                <span>{post.readTime} Read</span>
              </div>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <section className="section-padding bg-navy">
          <div className="max-w-3xl mx-auto px-4">
            <RevealOnScroll direction="up">
              <article 
                className="prose prose-invert max-w-none text-ivory/85 text-sm sm:text-base leading-relaxed tracking-wide space-y-6 text-justify"
                dangerouslySetInnerHTML={{ __html: post.content || '' }}
              />
            </RevealOnScroll>
          </div>
        </section>

        {/* Recent Articles / Interlinking */}
        {recentPosts.length > 0 && (
          <section className="section-padding bg-navy-light border-t border-gold/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
                <div>
                  <span className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.25em] text-gold">
                    Keep Reading
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-ivory mt-2">
                    Recent Insights & Guides
                  </h2>
                </div>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-xs font-bold text-gold hover:text-gold-light uppercase tracking-widest transition-colors cursor-pointer"
                >
                  View All Articles
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentPosts.map((rPost, idx) => (
                  <RevealOnScroll
                    key={rPost.id}
                    direction="up"
                    delay={idx * 0.1}
                    className="h-full"
                  >
                    <Link
                      to={`/blog/${rPost.id}`}
                      className="flex flex-col h-full rounded-xl overflow-hidden glass border border-gold/10 hover:border-gold/30 hover:-translate-y-1 transition-all duration-300 group"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={rPost.image}
                          alt={rPost.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <span className="text-[9px] font-bold text-gold uppercase tracking-wider mb-2">
                          {rPost.category}
                        </span>
                        <h4 className="text-base font-bold font-display text-ivory leading-snug group-hover:text-gold transition-colors flex-1 mb-4">
                          {rPost.title}
                        </h4>
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-auto">
                          <Clock className="w-3 h-3 text-gold" />
                          <span>{rPost.readTime} read</span>
                        </div>
                      </div>
                    </Link>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </PageTransition>
  );
}

