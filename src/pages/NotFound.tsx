import PageTransition from '@/components/layouts/PageTransition';
import { Button } from '@/components/ui/button';
import { Hammer, Home, PhoneCall, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router';
import SEO from '@/components/ui/SEO';

export default function NotFound() {
  return (
    <PageTransition>
      <SEO
        title="404 Page Not Found | Merina Builders"
        description="The page you are looking for does not exist. Back to Merina Builders Construction."
      />
      <main className="w-full min-h-[80vh] flex items-center justify-center pt-28 pb-16 bg-navy text-ivory relative px-4 overflow-hidden">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(200,167,80,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(200,167,80,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        
        {/* Soft Radial Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 text-center max-w-lg w-full flex flex-col items-center">
          {/* Construction Illustration / Icon Container */}
          <div className="relative mb-8 group">
            {/* Outer golden halo */}
            <div className="absolute inset-0 rounded-full bg-gold/10 blur-xl group-hover:scale-110 transition-transform duration-500" />
            <div className="w-24 h-24 rounded-full border border-gold/30 bg-navy-light flex items-center justify-center relative p-5">
              <Hammer className="w-10 h-10 text-gold animate-bounce" />
              <AlertTriangle className="w-5 h-5 text-red-500 absolute top-2 right-2 animate-pulse" />
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-gold/10 text-gold text-xs uppercase font-bold tracking-widest border border-gold/30 mb-4 block">
            Error Code 404
          </span>

          <h1 className="text-3xl sm:text-5xl font-bold font-display text-ivory leading-tight mb-4">
            Under <span className="text-gradient-gold italic">Construction</span>
          </h1>

          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mb-10">
            The page you are looking for has been moved, demolished, or is currently under reconstruction. Let's get you back on track!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link to="/" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-gold to-gold-light text-navy font-bold px-8 py-6 rounded-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-gold/20 transition-all cursor-pointer text-xs uppercase tracking-widest">
                <Home className="w-4 h-4" /> Go Home
              </Button>
            </Link>
            <Link to="/contact" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-transparent border border-gold/30 text-gold hover:bg-gold/10 font-bold px-8 py-6 rounded-lg flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-widest">
                <PhoneCall className="w-4 h-4" /> Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
