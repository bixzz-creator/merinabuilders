import { useState } from 'react';
import PageTransition from '@/components/layouts/PageTransition';
import SectionHeading from '@/components/ui/SectionHeading';
import { projects } from '@/data/projects';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import projectHeroImg from '@/assets/images/hero-construction.png';
import SEO from '@/components/ui/SEO';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProject, setActiveProject] = useState<typeof projects[0] | null>(null);

  const categories = ['All', 'Commercial', 'Renovation'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());

  const projectsSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Completed Construction Projects | Merina Builders",
    "description": "Explore completed commercial, church, and renovation projects delivered by Merina Builders across Thanjavur and nearby districts.",
    "url": "https://merinabuilders.com/projects"
  };

  return (
    <PageTransition>
      <SEO
        title="Completed Construction Projects | Merina Builders"
        description="Explore completed commercial, church, and renovation projects delivered by Merina Builders across Thanjavur and nearby districts."
        keywords="Completed Projects Thanjavur, Merina Builders Portfolio, Commercial Construction Projects Thanjavur"
        schema={projectsSchema}
      />
      <main className="w-full relative pt-20">
        {/* Banner Section */}
        <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-navy">
          <img
            src={projectHeroImg}
            alt="Completed Projects Portfolio"
            title="Completed Projects Portfolio by Merina Builders"
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
            loading="eager"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
          <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold font-display text-ivory">
              Our <span className="text-gradient-gold italic">Projects</span>
            </h1>
            <p className="text-sm uppercase tracking-widest text-ivory/60 font-semibold mt-4">
              Explore our built portfolio of landmarks
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold/10 hover:bg-gold/20 text-gold text-xs uppercase font-bold tracking-widest border border-gold/30 transition-all cursor-pointer animate-fade-in"
              >
                View Inauguration & Media Gallery <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Filter and Grid */}
        <section className="section-padding bg-navy">
          <div className="max-w-7xl mx-auto">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2 justify-center mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-gold text-navy border-gold font-bold shadow-md shadow-gold/20'
                      : 'bg-navy-light/40 text-ivory/70 border-gold/10 hover:border-gold/30 hover:text-ivory'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <Dialog key={project.id}>
                  <DialogTrigger render={
                    <button
                      type="button"
                      onClick={() => setActiveProject(project)}
                      className="group text-left cursor-pointer rounded-xl overflow-hidden glass border border-gold/10 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all duration-500 flex flex-col h-full w-full"
                    />
                  }>
                    {/* Image container */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={project.image}
                          alt={`${project.title} - Merina Builders`}
                          title={`${project.title} build completion details`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                          loading="lazy"
                          width={600}
                          height={375}
                        />
                        <div className="absolute top-4 left-4 z-10">
                          <Badge className="bg-gold text-[#18181B] font-bold uppercase tracking-wider border-none">
                            {project.category}
                          </Badge>
                        </div>
                      </div>

                      {/* Content details */}
                      <div className="p-6 flex flex-col justify-between flex-grow">
                        <div>
                          <h3 className="text-xl font-bold font-display text-ivory tracking-wide mb-2 group-hover:text-gold transition-colors duration-300">
                            {project.title}
                          </h3>
                        </div>

                        {/* Sliding details panel */}
                        <div className="grid grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                          <div className="overflow-hidden">
                            <p className="text-xs md:text-sm text-muted-foreground mt-3 mb-4 leading-relaxed">
                              {project.description}
                            </p>

                            <div className="flex justify-between items-center text-xs text-muted-foreground border-t border-gold/15 pt-4 mb-2">
                              <span>ðŸ“ {project.location}</span>
                              <span>ðŸ—“ï¸ Completed: {project.year}</span>
                            </div>

                            <span className="text-xs text-gold font-bold tracking-widest uppercase flex items-center gap-1.5 pt-2">
                              View Case Study <span className="translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300">&rarr;</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>

                  {/* Project Details Modal */}
                  <DialogContent className="max-w-3xl bg-navy border border-gold/25 p-0 overflow-hidden text-ivory rounded-xl">
                    <DialogHeader className="p-0">
                      <div className="relative h-[250px] md:h-[350px]">
                        <img
                          src={activeProject?.image}
                          alt={activeProject?.title || "Project Details Image"}
                          title={activeProject?.title ? `${activeProject.title} project close up` : "Project Details close up"}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          width={800}
                          height={500}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                          <Badge className="bg-gold text-navy font-bold uppercase tracking-wider mb-2 border-none">
                            {activeProject?.category}
                          </Badge>
                          <DialogTitle className="text-2xl md:text-4xl font-bold font-display text-ivory leading-tight">
                            {activeProject?.title}
                          </DialogTitle>
                        </div>
                      </div>
                    </DialogHeader>
                    
                    <div className="p-6 md:p-8 space-y-6">
                      <DialogDescription className="text-sm text-ivory/80 leading-relaxed font-sans">
                        {activeProject?.description}
                      </DialogDescription>

                      <Separator className="bg-gold/10" />

                      <div className="grid grid-cols-2 gap-6 text-sm">
                        <div>
                          <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Location</span>
                          <p className="font-bold font-display text-ivory mt-1">{activeProject?.location}</p>
                        </div>
                        <div>
                          <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Completion Year</span>
                          <p className="font-bold font-display text-ivory mt-1">{activeProject?.year}</p>
                        </div>
                      </div>

                      {activeProject?.features && (
                        <>
                          <Separator className="bg-gold/10" />
                          <div>
                            <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-3 block">Key Specifications & Features</span>
                            <div className="flex flex-wrap gap-2">
                              {activeProject.features.map((feat, i) => (
                                <Badge key={i} variant="outline" className="text-gold border-gold/30 bg-gold/5 px-3 py-1 rounded">
                                  {feat}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
}

