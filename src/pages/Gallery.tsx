import { useState, useEffect } from 'react';
import PageTransition from '@/components/layouts/PageTransition';
import SectionHeading from '@/components/ui/SectionHeading';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useLocation } from 'react-router';
import SEO from '@/components/ui/SEO';

interface GalleryImage {
  src: string;
  title: string;
  category: string;
}

// Real images from Church folder (served from /gallery/church/)
const churchImages: GalleryImage[] = [
  { src: '/gallery/church/church-1.webp', title: 'Alangara Anni Church – Completed Project', category: 'Completed' },
  { src: '/gallery/church/church-2.jpeg', title: 'Church Construction – Structural Work', category: 'Completed' },
  { src: '/gallery/church/church-3.jpeg', title: 'Church Project – Exterior View', category: 'Completed' },
  { src: '/gallery/church/church-4.jpeg', title: 'Church Project – Construction Progress', category: 'Completed' },
];

// Real images from Openings folder (served from /gallery/openings/)
const openingImages: GalleryImage[] = [
  { src: '/gallery/openings/opening-1.jpeg', title: 'Building Opening Ceremony', category: 'Openings' },
  { src: '/gallery/openings/opening-2.jpeg', title: 'Inauguration Event – Completed Project', category: 'Openings' },
  { src: '/gallery/openings/opening-3.jpeg', title: 'Ribbon Cutting Ceremony', category: 'Openings' },
  { src: '/gallery/openings/opening-4.jpeg', title: 'Opening Celebration – Guests & Team', category: 'Openings' },
];

const allImages: GalleryImage[] = [...churchImages, ...openingImages];

const CATEGORIES = ['All', 'Completed', 'Openings'] as const;
type Category = typeof CATEGORIES[number];

export default function Gallery() {
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const hashCategory = location.hash.substring(1).toLowerCase();
      if (hashCategory === 'completed') {
        setActiveCategory('Completed');
      } else if (hashCategory === 'openings') {
        setActiveCategory('Openings');
      }
    }
  }, [location.hash]);

  const filteredImages =
    activeCategory === 'All'
      ? allImages
      : allImages.filter((img) => img.category === activeCategory);

  // Keyboard navigation for image lightbox
  useEffect(() => {
    if (!activeImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = filteredImages.findIndex((img) => img.src === activeImage.src);
      if (currentIndex === -1) return;

      if (e.key === 'ArrowRight') {
        const nextIndex = (currentIndex + 1) % filteredImages.length;
        setActiveImage(filteredImages[nextIndex]);
      } else if (e.key === 'ArrowLeft') {
        const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
        setActiveImage(filteredImages[prevIndex]);
      } else if (e.key === 'Escape') {
        setActiveImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImage, filteredImages]);

  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Project Gallery | Merina Builders",
    "description": "View our completed construction projects, church buildings, commercial spaces, and inauguration ceremonies.",
    "url": "https://merinabuilders.in/gallery"
  };

  return (
    <PageTransition>
      <SEO
        title="Project Gallery | Merina Builders"
        description="View our completed construction projects, church buildings, commercial spaces, and inauguration ceremonies."
        keywords="Project Gallery Thanjavur, Merina Builders Gallery, Church Construction Photos, Inauguration Photos"
        schema={gallerySchema}
      />
      <main className="w-full relative pt-20">
        {/* Banner Section */}
        <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-navy">
          <img
            src="/gallery/church/church-1.webp"
            alt="Merina Builders Construction Media Gallery"
            title="Merina Builders Construction Media Gallery"
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
            loading="eager"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
          <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold font-display text-ivory">
              Media <span className="text-gradient-gold italic">Gallery</span>
            </h1>
            <p className="text-sm uppercase tracking-widest text-ivory/60 font-semibold mt-4">
              Visualizing Our Architectural Craftsmanship
            </p>
          </div>
        </section>

        {/* Category Filter + Grid Gallery */}
        <section className="section-padding bg-navy-light border-t border-gold/10">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              badge="Grid Showcase"
              title="Project Photo Stream"
              subtitle="A curated collection of completed church projects and building opening ceremonies by Merina Builders."
            />

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2 justify-center mb-12">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-gold text-navy border-gold font-bold shadow-md shadow-gold/20'
                      : 'bg-navy-light/40 text-ivory/70 border-gold/10 hover:border-gold/30 hover:text-ivory'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Masonry-style Grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {filteredImages.map((img, i) => (
                <div
                  key={`${img.category}-${i}`}
                  onClick={() => setActiveImage(img)}
                  className="group relative cursor-pointer rounded-xl overflow-hidden break-inside-avoid border border-gold/10 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all duration-500"
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    title={img.title}
                    loading="lazy"
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    width={500}
                    height={350}
                  />
                  <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-4">
                    <span className="px-3 py-1 rounded bg-gold/20 text-gold text-[10px] font-bold uppercase tracking-widest mb-2 border border-gold/20">
                      {img.category}
                    </span>
                    <h3 className="text-lg font-bold font-display text-ivory tracking-wide">
                      {img.title}
                    </h3>
                    <span className="text-xs text-gold/80 mt-2 font-semibold">🔍 Expand Photo</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Lightbox Dialog */}
            <Dialog open={!!activeImage} onOpenChange={(open) => !open && setActiveImage(null)}>
              <DialogContent className="max-w-4xl bg-transparent border-none p-0 flex items-center justify-center">
                {activeImage && (
                  <div className="relative rounded-xl overflow-hidden max-h-[85vh]">
                    <img
                      src={activeImage.src}
                      alt={activeImage.title}
                      title={activeImage.title}
                      className="w-full h-auto max-h-[85vh] object-contain rounded-xl border border-gold/20"
                      loading="lazy"
                      width={1200}
                      height={800}
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-navy/90 to-transparent px-6 py-4 rounded-b-xl">
                      <span className="px-3 py-1 rounded bg-gold/20 text-gold text-[10px] font-bold uppercase tracking-widest border border-gold/20 mr-2">
                        {activeImage.category}
                      </span>
                      <span className="text-sm font-semibold text-ivory font-display">
                        {activeImage.title}
                      </span>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
