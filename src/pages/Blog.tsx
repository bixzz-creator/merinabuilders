import PageTransition from '@/components/layouts/PageTransition';
import SectionHeading from '@/components/ui/SectionHeading';
import { blogPosts } from '@/data/blog';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, ArrowRight } from 'lucide-react';
import blogHeroImg from '@/assets/images/hero-construction.png';

export default function Blog() {
  return (
    <PageTransition>
      <main className="w-full relative pt-20">
        {/* Banner Section */}
        <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-navy">
          <img
            src={blogHeroImg}
            alt="Construction Industry Insights Blog"
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
          <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold font-display text-gradient-gold">
              Knowledge Center
            </h1>
            <p className="text-sm uppercase tracking-widest text-ivory/60 font-semibold mt-4">
              Construction updates, structural guides, and design trends
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="section-padding bg-navy">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              badge="Insights"
              title="Latest Articles"
              subtitle="Get expert advice on structural planning, interior material selection, and modern Vastu layout guidelines."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="glass flex flex-col justify-between rounded-xl overflow-hidden border border-gold/10 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all duration-500 group"
                >
                  <div>
                    {/* Image container */}
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103 animate-none"
                      />
                      <div className="absolute top-4 left-4 z-10">
                        <Badge className="bg-gold text-navy font-bold uppercase tracking-wider border-none">
                          {post.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Text Details */}
                    <div className="p-6">
                      {/* Meta */}
                      <div className="flex gap-4 text-xs text-muted-foreground mb-3 font-semibold">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="w-3.5 h-3.5 text-gold" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-gold" />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold font-display text-ivory tracking-wide mb-3 leading-snug group-hover:text-gold transition-colors duration-300">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Read More button */}
                  <div className="px-6 pb-6 pt-2">
                    <button className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold hover:text-gold-light group-hover:gap-2.5 transition-all duration-300 cursor-pointer">
                      <span>Read Full Article</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
