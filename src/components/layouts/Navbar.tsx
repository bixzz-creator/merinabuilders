import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu, X, Phone, ChevronDown,
  Building2, Hammer, ClipboardCheck,
  Users, GitBranch, Award, HelpCircle,
  Mail, FolderOpen, Calculator,
  Ribbon, Home,
} from 'lucide-react';
import { COMPANY_NAME, COMPANY_PHONE } from '@/constants/navigation';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

// ── Dropdown menu data ─────────────────────────────────────────────────────────
interface MenuItem {
  label: string;
  href: string;
  icon: React.ElementType;
  description: string;
}

interface NavGroup {
  label: string;
  items: MenuItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Company',
    items: [
      { label: 'About Us',      href: '/about#about-us', icon: Home,          description: 'Our story, mission & values' },
      { label: 'Leadership',    href: '/about#leadership', icon: Users,         description: 'Meet the founder & team' },
      { label: 'Our Process',   href: '/our-process', icon: GitBranch,     description: 'How we plan & deliver' },
      { label: 'Why Choose Us', href: '/#why-choose-us', icon: Award,         description: 'Our quality commitment' },
    ],
  },
  {
    label: 'Services',
    items: [
      { label: 'Commercial Construction', href: '/services#commercial', icon: Building2,      description: 'Offices, retail & commercial builds' },
      { label: 'Renovation & Remodeling', href: '/services#renovation', icon: Hammer,         description: 'Heritage & modern makeovers' },
      { label: 'Project Management',      href: '/services#project-management', icon: ClipboardCheck, description: 'End-to-end delivery control' },
    ],
  },
  {
    label: 'Projects',
    items: [
      { label: 'Completed',  href: '/gallery#completed',  icon: FolderOpen, description: 'Completed construction projects' },
      { label: 'Openings',   href: '/gallery#openings',   icon: Ribbon,     description: 'Building inauguration events' },
    ],
  },
  {
    label: 'Resources',
    items: [
      { label: 'Budget Estimator', href: '/estimator', icon: Calculator, description: 'Calculate approximate build costs' },
      { label: 'FAQ',              href: '/faq',       icon: HelpCircle,  description: 'Common questions answered' },
      { label: 'Contact',          href: '/contact',   icon: Mail,        description: 'Get in touch with us' },
    ],
  },
];

// ── Mobile accordion section ───────────────────────────────────────────────────
function MobileSection({
  group,
  onClose,
  activePathname,
}: {
  group: NavGroup;
  onClose: () => void;
  activePathname: string;
}) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="border-b border-gold/10">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-6 py-4 text-sm font-semibold uppercase tracking-widest text-ivory/60 hover:text-gold transition-colors"
      >
        <span>{group.label}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-2">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activePathname === item.href;
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={(e) => {
                      onClose();
                      if (item.href.includes('#')) {
                        const [path, hash] = item.href.split('#');
                        if (location.pathname === path || (path === '/' && location.pathname === '')) {
                          const element = document.getElementById(hash);
                          if (element) {
                            e.preventDefault();
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }
                      }
                    }}
                    className="flex items-center gap-3 px-6 py-3 text-sm transition-all duration-200 text-ivory/70 hover:text-ivory hover:bg-white/5"
                  >
                    <Icon className="w-4 h-4 shrink-0 text-gold/60" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Desktop dropdown ───────────────────────────────────────────────────────────
function DesktopDropdown({
  group,
  activePathname,
  scrolled,
}: {
  group: NavGroup;
  activePathname: string;
  scrolled: boolean;
}) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  
  const isGroupActive = group.items.some((i) => {
    const pathOnly = i.href.split('#')[0];
    return pathOnly === activePathname;
  });

  const show = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const hide = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {/* Trigger */}
      <button
        className={`relative flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 group cursor-pointer ${
          isGroupActive
            ? 'text-gold'
            : scrolled
            ? 'text-[#18181B]/70 hover:text-[#18181B]'
            : 'text-[#FDFBF7]/70 hover:text-[#FDFBF7]'
        }`}
        aria-expanded={open}
      >
        <span>{group.label}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <ChevronDown className="w-3.5 h-3.5 opacity-60" />
        </motion.div>

        {/* Active underline */}
        {isGroupActive && (
          <motion.span
            layoutId="nav-active"
            className="absolute bottom-0 left-3 right-3 h-px bg-gold"
          />
        )}
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={show}
            onMouseLeave={hide}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 min-w-[260px] rounded-xl border border-gold/15 bg-navy-light/95 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden z-50"
          >
            {/* Gold top accent */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

            <div className="p-2">
              {group.items.map((item, i) => {
                const Icon = item.icon;
                const isActive = activePathname === item.href;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <Link
                      to={item.href}
                      onMouseEnter={() => {
                        const path = item.href.split('#')[0];
                        if (path === '/about') import('@/pages/About');
                        else if (path === '/services') import('@/pages/Services');
                        else if (path === '/gallery') import('@/pages/Gallery');
                        else if (path === '/estimator') import('@/pages/Estimator');
                        else if (path === '/contact') import('@/pages/Contact');
                        else if (path === '/faq') import('@/pages/FAQ');
                      }}
                      onClick={(e) => {
                        setOpen(false);
                        if (item.href.includes('#')) {
                          const [path, hash] = item.href.split('#');
                          if (location.pathname === path || (path === '/' && location.pathname === '')) {
                            const element = document.getElementById(hash);
                            if (element) {
                              e.preventDefault();
                              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }
                        }
                      }}
                      className="flex items-start gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-white/5 text-ivory/70 hover:text-ivory border border-transparent"
                    >
                      <Icon className="w-4 h-4 shrink-0 text-gold mt-0.5" />
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold">{item.label}</span>
                        <span className="text-[10px] text-muted-foreground mt-0.5 leading-normal">
                          {item.description}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main Navbar ────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();

  const isHome = location.pathname === '/';
  const showSolidNavbar = scrolled || !isHome;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Scrolled color state trigger
      setScrolled(currentScrollY > 50);

      // Hide on scroll down, show on scroll up
      if (currentScrollY < 80) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down: hide
        setVisible(false);
      } else {
        // Scrolling up: show
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: visible ? 0 : -100, 
        opacity: visible ? 1 : 0 
      }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showSolidNavbar
          ? 'bg-navy/80 backdrop-blur-xl border-b border-gold/10 shadow-xl shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      {/* Subtle gold line at top when scrolled */}
      <AnimatePresence>
        {showSolidNavbar && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent origin-left"
          />
        )}
      </AnimatePresence>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-20 lg:h-24">

          {/* ── Logo ─────────────────────────────────────────────────────────── */}
          <Link
            to="/"
            className="flex items-center group shrink-0"
            aria-label={`${COMPANY_NAME} – Home`}
          >
            <img
              src="/logo.png"
              alt={COMPANY_NAME}
              className="h-20 lg:h-24 w-auto object-contain py-1 transition-transform duration-300 group-hover:scale-[1.04]"
            />
          </Link>

          {/* ── Desktop dropdown nav ──────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_GROUPS.map((group) => (
              <DesktopDropdown
                key={group.label}
                group={group}
                activePathname={location.pathname}
                scrolled={showSolidNavbar}
              />
            ))}
          </div>

          {/* ── Desktop CTAs ──────────────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Call Now button */}
            <a
              href={`tel:${COMPANY_PHONE}`}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 text-sm font-medium transition-all duration-300 group cursor-pointer ${
                showSolidNavbar ? 'text-[#18181B]/80 hover:text-gold' : 'text-[#FDFBF7]/80 hover:text-gold'
              }`}
              aria-label={`Call ${COMPANY_PHONE}`}
            >
              <Phone className="w-3.5 h-3.5 text-gold group-hover:animate-pulse" />
              <span>Call Now</span>
            </a>

            {/* Free Quote button */}
            <Link to="/contact">
              <Button className="bg-gradient-to-r from-gold to-gold-light text-[#18181B] font-semibold hover:shadow-lg hover:shadow-gold/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 rounded-full px-6 text-sm cursor-pointer">
                Request Free Quote
              </Button>
            </Link>
          </div>

          {/* ── Mobile hamburger ──────────────────────────────────────────────── */}
          <div className="lg:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger render={
                <button
                  className={`p-2 rounded-lg transition-all cursor-pointer ${
                    showSolidNavbar ? 'text-[#18181B]/80 hover:text-gold' : 'text-[#FDFBF7]/80 hover:text-gold'
                  }`}
                  aria-label="Open navigation menu"
                />
              }>
                <Menu className="w-6 h-6" />
              </SheetTrigger>

              <SheetContent showCloseButton={false} side="right" className="w-[320px] bg-navy border-l border-gold/10 p-0 flex flex-col">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

                {/* Mobile header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gold/10">
                  <div className="flex items-center">
                    <img
                      src="/logo.png"
                      alt={COMPANY_NAME}
                      className="h-20 w-auto object-contain"
                    />
                  </div>
                  <SheetClose render={
                    <button className="p-1.5 rounded-lg text-ivory/60 hover:text-ivory hover:bg-white/5 transition-all" aria-label="Close navigation menu" />
                  }>
                    <X className="w-5 h-5" />
                  </SheetClose>
                </div>

                {/* Mobile accordion groups */}
                <div className="flex-1 overflow-y-auto">
                  {NAV_GROUPS.map((group, i) => (
                    <motion.div
                      key={group.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.3 }}
                    >
                      <MobileSection
                        group={group}
                        onClose={() => setMobileOpen(false)}
                        activePathname={location.pathname}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Mobile footer CTAs */}
                <div className="p-6 border-t border-gold/10 space-y-3">
                  <Link to="/contact" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-gold to-gold-light text-navy font-semibold rounded-full py-5">
                      Request Free Quote
                    </Button>
                  </Link>
                  <a
                    href={`tel:${COMPANY_PHONE}`}
                    className="flex items-center justify-center gap-2 py-3 rounded-full border border-gold/20 text-sm text-ivory/70 hover:text-gold hover:border-gold/40 transition-all duration-300"
                  >
                    <Phone className="w-4 h-4 text-gold" />
                    <span>Call Now – {COMPANY_PHONE}</span>
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </nav>
    </motion.header>
  );
}
