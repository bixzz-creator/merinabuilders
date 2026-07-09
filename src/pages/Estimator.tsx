import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import PageTransition from '@/components/layouts/PageTransition';
import SectionHeading from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { estimateBudgetWithAI } from '@/services/ai/budgetEstimator';
import type { BudgetEstimateResponse, BudgetEstimateData } from '@/services/ai/budgetEstimator';
import SEO from '@/components/ui/SEO';
import { Link } from 'react-router';
import {
  Calculator,
  ArrowRight,
  ArrowLeft,
  Building,
  MapPin,
  Maximize2,
  Layers,
  Sparkles,
  Check,
  Download,
  PhoneCall,
  Mail,
  RefreshCw,
  Info,
  AlertTriangle,
  FileText
} from 'lucide-react';
import {
  COMPANY_NAME,
  COMPANY_PHONE,
  COMPANY_EMAIL,
  COMPANY_ADDRESS
} from '@/constants/navigation';

export default function Estimator() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [inputs, setInputs] = useState<Required<BudgetEstimateData>>({
    projectType: 'Commercial Building',
    location: '',
    plotArea: 1200,
    builtArea: 1200,
    floors: 1,
    quality: 'Standard',
    interior: 'Premium',
    basement: 'No',
    parking: 'Yes',
    specialRequirements: 'None',
  });

  const [result, setResult] = useState<BudgetEstimateResponse | null>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  // Trigger Gemini API call on step 3 (Analyzing)
  useEffect(() => {
    if (step === 3) {
      const runEstimation = async () => {
        setLoading(true);
        setErrorMsg(null);
        try {
          const res = await estimateBudgetWithAI(inputs);
          setResult(res);
          setStep(4);
        } catch (e) {
          console.error(e);
          setErrorMsg('Unable to generate the estimation report at the moment. Please try again.');
          setStep(2);
        } finally {
          setLoading(false);
        }
      };
      runEstimation();
    }
  }, [step, inputs]);

  // GSAP dashboard entry animation
  useEffect(() => {
    if (step === 4 && result && dashboardRef.current) {
      gsap.fromTo(
        dashboardRef.current.querySelectorAll('.animate-on-load'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );
    }
  }, [step, result]);

  const handleInputChange = (key: keyof BudgetEstimateData, value: any) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (step === 1) {
      if (!inputs.location.trim()) {
        alert('Please specify your construction location.');
        return;
      }
      if (inputs.plotArea <= 0 || inputs.builtArea <= 0) {
        alert('Please enter a valid area size.');
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const startCalculation = () => {
    setStep(3);
  };

  const resetEstimator = () => {
    setStep(1);
    setResult(null);
    setErrorMsg(null);
  };

  const printEstimate = () => {
    window.print();
  };

  const estimatorSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Construction Cost Estimator | Merina Builders",
    "description": "Estimate your construction budget instantly using our AI-powered construction cost calculator.",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "url": "https://merinabuilders.in/estimator"
  };

  return (
    <PageTransition>
      <SEO
        title="AI Construction Cost Estimator | Merina Builders"
        description="Estimate your construction budget instantly using our AI-powered construction cost calculator."
        keywords="AI Construction Calculator, Building Cost Estimator Thanjavur, Construction Budget Calculator, Cost Estimation"
        schema={estimatorSchema}
      />
      <main className="w-full relative pt-20 pb-24 bg-navy">
        <h1 className="sr-only">AI Construction Cost Estimator | Merina Builders</h1>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(200,167,80,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(200,167,80,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="print:hidden">
            <SectionHeading
              badge="Services"
              title="Construction Budget Planner"
              subtitle="Plan your structural costs using detailed parameters to prepare for your next project."
            />
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive flex items-center gap-3 text-sm">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="glass p-6 md:p-10 rounded-2xl border border-gold/15 shadow-2xl relative overflow-hidden">
            {/* Step Indicators */}
            {step < 3 && (
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-gold/10">
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    step >= 1 ? 'bg-gold text-navy' : 'bg-white/5 text-ivory/40'
                  }`}>
                    1
                  </span>
                  <span className="text-sm font-semibold tracking-wide hidden sm:inline">Project Details</span>
                </div>
                <div className="h-px bg-gold/25 flex-grow mx-4" />
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    step >= 2 ? 'bg-gold text-navy' : 'bg-white/5 text-ivory/40'
                  }`}>
                    2
                  </span>
                  <span className="text-sm font-semibold tracking-wide hidden sm:inline">Specifications & Extras</span>
                </div>
              </div>
            )}

            <AnimatePresence mode="wait">
              {/* STEP 1 */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold font-display text-gradient-gold flex items-center gap-2">
                    <Building className="w-5 h-5 text-gold" /> Step 1: Project Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-ivory/60 font-semibold mb-2">Project Type</label>
                      <select
                        value={inputs.projectType}
                        onChange={(e) => handleInputChange('projectType', e.target.value)}
                        className="w-full p-3 bg-white/5 border border-gold/15 text-ivory rounded-lg text-sm focus:border-gold outline-none"
                      >
                        {['Commercial Building', 'Renovation', 'Warehouse', 'Church', 'Office', 'Other'].map((t) => (
                          <option key={t} value={t} className="bg-navy text-ivory">{t}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-ivory/60 font-semibold mb-2">Location (City, State, Country)</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/60" />
                        <Input
                          type="text"
                          placeholder="e.g., Thanjavur, Tamil Nadu, India"
                          value={inputs.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          className="pl-10 py-5 bg-white/5 border-gold/15 text-ivory focus:border-gold rounded-lg w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-ivory/60 font-semibold mb-2">Plot Area (Sq.Ft.)</label>
                      <div className="relative">
                        <Maximize2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/60" />
                        <Input
                          type="number"
                          value={inputs.plotArea || ''}
                          onChange={(e) => handleInputChange('plotArea', Number(e.target.value))}
                          className="pl-10 py-5 bg-white/5 border-gold/15 text-ivory focus:border-gold rounded-lg w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-ivory/60 font-semibold mb-2">Built-up Area (Sq.Ft.)</label>
                      <div className="relative">
                        <Maximize2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/60" />
                        <Input
                          type="number"
                          value={inputs.builtArea || ''}
                          onChange={(e) => handleInputChange('builtArea', Number(e.target.value))}
                          className="pl-10 py-5 bg-white/5 border-gold/15 text-ivory focus:border-gold rounded-lg w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-ivory/60 font-semibold mb-2">Number of Floors</label>
                      <div className="relative">
                        <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/60" />
                        <Input
                          type="number"
                          min="1"
                          value={inputs.floors || ''}
                          onChange={(e) => handleInputChange('floors', Number(e.target.value))}
                          className="pl-10 py-5 bg-white/5 border-gold/15 text-ivory focus:border-gold rounded-lg w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button onClick={nextStep} className="bg-gradient-to-r from-gold to-gold-light text-navy font-semibold px-8 py-5 rounded-lg flex items-center gap-2 hover:shadow-lg hover:shadow-gold/20 transition-all cursor-pointer">
                      Next Step <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold font-display text-gradient-gold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-gold" /> Step 2: Quality & Preferences
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-ivory/60 font-semibold mb-2">Construction Quality</label>
                      <select
                        value={inputs.quality}
                        onChange={(e) => handleInputChange('quality', e.target.value)}
                        className="w-full p-3 bg-white/5 border border-gold/15 text-ivory rounded-lg text-sm focus:border-gold outline-none"
                      >
                        {['Standard', 'Premium', 'Luxury'].map((q) => (
                          <option key={q} value={q} className="bg-navy text-ivory">{q}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-ivory/60 font-semibold mb-2">Interior Requirement</label>
                      <select
                        value={inputs.interior}
                        onChange={(e) => handleInputChange('interior', e.target.value)}
                        className="w-full p-3 bg-white/5 border border-gold/15 text-ivory rounded-lg text-sm focus:border-gold outline-none"
                      >
                        {['Basic', 'Premium', 'Luxury'].map((i) => (
                          <option key={i} value={i} className="bg-navy text-ivory">{i}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-ivory/60 font-semibold mb-2">Include Basement?</label>
                      <select
                        value={inputs.basement}
                        onChange={(e) => handleInputChange('basement', e.target.value)}
                        className="w-full p-3 bg-white/5 border border-gold/15 text-ivory rounded-lg text-sm focus:border-gold outline-none"
                      >
                        {['No', 'Yes'].map((b) => (
                          <option key={b} value={b} className="bg-navy text-ivory">{b}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-ivory/60 font-semibold mb-2">Include Parking?</label>
                      <select
                        value={inputs.parking}
                        onChange={(e) => handleInputChange('parking', e.target.value)}
                        className="w-full p-3 bg-white/5 border border-gold/15 text-ivory rounded-lg text-sm focus:border-gold outline-none"
                      >
                        {['Yes', 'No'].map((p) => (
                          <option key={p} value={p} className="bg-navy text-ivory">{p}</option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs uppercase tracking-widest text-ivory/60 font-semibold mb-2">Special Requirements / Notes</label>
                      <Input
                        type="text"
                        placeholder="e.g. smart home automation, high ceiling, vastu layout..."
                        value={inputs.specialRequirements}
                        onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                        className="py-5 bg-white/5 border-gold/15 text-ivory focus:border-gold rounded-lg w-full"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button onClick={prevStep} className="bg-transparent border border-gold/20 text-ivory/80 font-medium px-6 py-5 rounded-lg flex items-center gap-2 hover:bg-white/5 transition-all cursor-pointer">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </Button>
                    <Button onClick={startCalculation} className="bg-gradient-to-r from-gold to-gold-light text-navy font-semibold px-8 py-5 rounded-lg flex items-center gap-2 hover:shadow-lg hover:shadow-gold/20 transition-all cursor-pointer">
                      Generate Budget Report <Calculator className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: LOADING */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-20 text-center space-y-6"
                >
                  <div className="relative w-20 h-20">
                    <div className="absolute inset-0 rounded-full border-4 border-gold/20" />
                    <div className="absolute inset-0 rounded-full border-4 border-gold border-t-transparent animate-spin" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold font-display text-gradient-gold">Preparing your construction estimate...</h4>
                    <p className="text-sm text-muted-foreground mt-2 max-w-sm">
                      Micky is analyzing your project...
                    </p>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: PREMIUM CLIENT REPORT */}
              {step === 4 && result && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  ref={dashboardRef}
                  className="space-y-8 text-left report-print"
                  id="report-print"
                >
                  {/* Actions & Meta bar */}
                  <div className="flex justify-between items-center pb-4 border-b border-gold/10 print:hidden animate-on-load">
                    <span className="text-xs text-muted-foreground">Document ID: MB-EST-{Math.floor(1000 + Math.random() * 9000)}</span>
                    <div className="flex gap-2">
                      <Button onClick={printEstimate} className="bg-white/5 border border-gold/20 text-ivory/80 hover:bg-white/10 hover:text-ivory px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5 transition-all">
                        <Download className="w-3.5 h-3.5" /> Save / Print PDF
                      </Button>
                      <Button onClick={resetEstimator} className="bg-transparent border border-gold/20 text-gold hover:bg-gold/5 px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5 transition-all">
                        <RefreshCw className="w-3.5 h-3.5" /> New Estimation
                      </Button>
                    </div>
                  </div>

                  {/* 🏛️ Official Corporate Header */}
                  <div className="p-6 rounded-xl border border-gold/15 bg-navy-light/95 shadow-xl flex flex-col md:flex-row justify-between gap-6 animate-on-load">
                    {/* Left: Brand logo & name */}
                    <div className="flex items-start gap-4">
                      <img
                        src="/logo.png"
                        alt={COMPANY_NAME}
                        className="h-24 w-auto object-contain shrink-0"
                      />
                      <div>
                        <p className="text-[11px] text-muted-foreground max-w-sm leading-relaxed mt-1">{COMPANY_ADDRESS}</p>
                      </div>
                    </div>

                    {/* Right: Contact details */}
                    <div className="flex flex-col md:items-end justify-center text-xs text-muted-foreground space-y-1 md:text-right">
                      <p className="font-semibold text-ivory">Contact Information</p>
                      <p>Phone: {COMPANY_PHONE}</p>
                      <p>Email: {COMPANY_EMAIL}</p>
                      <p>Website: merinabuilders.com</p>
                    </div>
                  </div>

                  <div className="text-center py-4 animate-on-load">
                    <h1 className="text-2xl md:text-3xl font-bold font-display text-ivory tracking-wide uppercase">
                      Construction Budget Estimation Report
                    </h1>
                    <p className="text-[11px] text-gold/70 mt-1.5 uppercase tracking-wider">
                      Prepared by Micky &bull; Construction Consultant &bull; Merina Builders
                    </p>
                    <div className="h-[2px] w-24 bg-gold mx-auto mt-3" />
                  </div>

                  {/* 📊 Project Summary Column */}
                  <div className="glass p-6 rounded-xl border border-gold/10 bg-navy/40 space-y-4 animate-on-load">
                    <h3 className="text-sm font-bold text-gold uppercase tracking-widest border-b border-gold/10 pb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" /> Project Specification Summary
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 text-xs">
                      <div>
                        <span className="text-muted-foreground block">Project Type</span>
                        <span className="font-semibold text-ivory">{inputs.projectType}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Location</span>
                        <span className="font-semibold text-ivory">{inputs.location}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Plot Area</span>
                        <span className="font-semibold text-ivory">{inputs.plotArea} Sq.Ft.</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Built-up Area per floor</span>
                        <span className="font-semibold text-ivory">{inputs.builtArea} Sq.Ft.</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Number of Floors</span>
                        <span className="font-semibold text-ivory">{inputs.floors}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Construction Quality</span>
                        <span className="font-semibold text-gold">{inputs.quality}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Interior Grade</span>
                        <span className="font-semibold text-ivory">{inputs.interior}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Basement</span>
                        <span className="font-semibold text-ivory">{inputs.basement}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Parking Slab</span>
                        <span className="font-semibold text-ivory">{inputs.parking}</span>
                      </div>
                      <div className="col-span-2 md:col-span-3">
                        <span className="text-muted-foreground block">Special Requirements / Notes</span>
                        <span className="font-semibold text-ivory italic">"{inputs.specialRequirements}"</span>
                      </div>
                    </div>
                  </div>

                  {/* 💰 Financial Estimates Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-on-load">
                    <div className="glass p-5 rounded-xl border border-gold/15 bg-gold/5 flex flex-col justify-between">
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Total Estimated Budget</p>
                        <p className="text-2xl font-bold font-display text-gradient-gold mt-1.5">
                          {result.estimatedBudget}
                        </p>
                      </div>
                      <p className="text-[10px] text-ivory/40 mt-3 border-t border-gold/10 pt-1.5">Preliminary project cost range</p>
                    </div>

                    <div className="glass p-5 rounded-xl border border-gold/10 bg-navy/40 flex flex-col justify-between">
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Estimated Timeline</p>
                        <p className="text-2xl font-bold font-display text-ivory mt-1.5">
                          {result.estimatedTimeline}
                        </p>
                      </div>
                      <p className="text-[10px] text-ivory/40 mt-3 border-t border-gold/10 pt-1.5">Timeline to delivery</p>
                    </div>

                    <div className="glass p-5 rounded-xl border border-gold/10 bg-navy/40 flex flex-col justify-between">
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Recommended Structure</p>
                        <p className="text-sm font-semibold text-ivory mt-2 leading-snug">
                          {result.recommendedConstructionType}
                        </p>
                      </div>
                      <p className="text-[10px] text-ivory/40 mt-3 border-t border-gold/10 pt-1.5">Based on engineering match</p>
                    </div>
                  </div>

                  {/* 📊 Animated Cost Distribution Charts */}
                  <div className="glass p-6 rounded-xl border border-gold/10 bg-navy/40 space-y-4 animate-on-load">
                    <h3 className="text-sm font-bold text-gold uppercase tracking-widest border-b border-gold/10 pb-2">
                      Cost Allocation Breakdown
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4 justify-center flex flex-col">
                        {[
                          { label: 'Material Costs', pct: 50, val: result.materialCost, color: 'bg-gold' },
                          { label: 'Labour & Engineering', pct: 30, val: result.labourCost, color: 'bg-gold-light' },
                          { label: 'Electrical & Plumbing Systems', pct: 12, val: result.electricalCost, color: 'bg-ivory/60' },
                          { label: 'Contingency & Permits', pct: 8, val: result.contingencyCost, color: 'bg-gold/45' },
                        ].map((bar, idx) => (
                          <div key={idx} className="space-y-1.5">
                            <div className="flex justify-between text-xs">
                              <span className="text-ivory/80">{bar.label} ({bar.pct}%)</span>
                              <span className="font-semibold text-gold">{bar.val}</span>
                            </div>
                            <div className="h-2 w-full bg-navy/80 rounded-full overflow-hidden border border-gold/5">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${bar.pct}%` }}
                                transition={{ duration: 1.2, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className={`h-full ${bar.color} rounded-full`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="border border-gold/10 rounded-lg p-4 bg-navy-light/40 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Project Budget Analysis</span>
                          <h4 className="text-lg font-bold font-display text-gradient-gold mt-1">Estimator Insight</h4>
                          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                            Cost allocation shows a standard load structure where raw materials constitute half of the total budget. We recommend milestone-based procurement to lock in steel and concrete prices ahead of key phases.
                          </p>
                        </div>
                        <div className="flex justify-between items-center border-t border-gold/10 pt-3 mt-4 text-[10px] text-ivory/50">
                          <span>Ref: MB-DIST-WEIGHTS</span>
                          <span className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 font-bold">Approved Weights</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 🧾 Structured Cost Breakdown Table */}
                  <div className="glass p-6 rounded-xl border border-gold/10 bg-navy/40 space-y-4 animate-on-load">
                    <h3 className="text-sm font-bold text-gold uppercase tracking-widest border-b border-gold/10 pb-2">
                      Structured Budget Breakdown
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left border-collapse">
                        <thead>
                          <tr className="border-b border-gold/20 text-muted-foreground">
                            <th className="py-2.5 font-semibold">Cost Component</th>
                            <th className="py-2.5 font-semibold text-right">Projected Value Range</th>
                            <th className="py-2.5 font-semibold text-right">Weight (%)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gold/10 text-ivory/90">
                          <tr>
                            <td className="py-3 font-medium">Material Cost (Cement, Steel, Bricks, Sand)</td>
                            <td className="py-3 text-right font-semibold text-ivory">{result.materialCost}</td>
                            <td className="py-3 text-right text-muted-foreground">50%</td>
                          </tr>
                          <tr>
                            <td className="py-3 font-medium">Labour & Engineering Supervision</td>
                            <td className="py-3 text-right font-semibold text-ivory">{result.labourCost}</td>
                            <td className="py-3 text-right text-muted-foreground">30%</td>
                          </tr>
                          <tr>
                            <td className="py-3 font-medium">Electrical Systems & Piping</td>
                            <td className="py-3 text-right font-semibold text-ivory">{result.electricalCost}</td>
                            <td className="py-3 text-right text-muted-foreground">~</td>
                          </tr>
                          <tr>
                            <td className="py-3 font-medium">Plumbing & Water Management Layout</td>
                            <td className="py-3 text-right font-semibold text-ivory">{result.plumbingCost}</td>
                            <td className="py-3 text-right text-muted-foreground">~</td>
                          </tr>
                          <tr>
                            <td className="py-3 font-medium">Interior Finishes, Tiling & Modular Fittings</td>
                            <td className="py-3 text-right font-semibold text-ivory">{result.interiorCost}</td>
                            <td className="py-3 text-right text-muted-foreground">~</td>
                          </tr>
                          <tr className="text-gold/90 font-medium">
                            <td className="py-3 font-medium">Contingency Reserves & Permits</td>
                            <td className="py-3 text-right font-semibold text-gold">{result.contingencyCost}</td>
                            <td className="py-3 text-right text-muted-foreground">~</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Recommendations & Notes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-on-load">
                    <div className="glass p-6 rounded-xl border border-gold/10 bg-navy/40 space-y-3">
                      <h4 className="text-sm font-bold text-gold uppercase tracking-widest border-b border-gold/10 pb-2">
                        Professional Recommendations
                      </h4>
                      <ul className="space-y-2.5">
                        {result.recommendations.map((rec, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                            <Check className="w-3.5 h-3.5 mt-0.5 text-gold shrink-0" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="glass p-6 rounded-xl border border-gold/10 bg-navy/40 space-y-3">
                      <h4 className="text-sm font-bold text-gold uppercase tracking-widest border-b border-gold/10 pb-2">
                        Notes & Assumptions
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{result.importantNotes}</p>
                      <div className="pt-2 border-t border-gold/5 space-y-1">
                        <span className="text-[10px] font-bold text-ivory uppercase tracking-wider block">Assumptions:</span>
                        {result.assumptions.map((asm, idx) => (
                          <p key={idx} className="text-[10px] text-muted-foreground leading-tight">* {asm}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 💼 Next Steps Call-to-action */}
                  <div className="glass p-6 rounded-xl border border-gold/15 bg-gradient-to-r from-gold/5 via-navy-light to-gold/5 flex flex-col md:flex-row justify-between items-center gap-6 animate-on-load">
                    <div>
                      <h4 className="text-base font-bold font-display text-ivory">Next Steps to Lock in Contract Pricing</h4>
                      <p className="text-xs text-muted-foreground mt-1">Connect with our engineering office to finalize specific design blueprints, soil assessments, and detailed billing materials.</p>
                    </div>

                    <div className="flex flex-wrap gap-3 w-full md:w-auto">
                      <Link to="/contact" className="flex-1 md:flex-none">
                        <Button className="w-full bg-transparent border border-gold/30 text-gold hover:bg-gold/10 font-bold px-6 py-5 rounded-lg flex items-center justify-center gap-2 cursor-pointer text-xs">
                          <PhoneCall className="w-4 h-4" /> Book Site Visit
                        </Button>
                      </Link>
                      <a href={`mailto:${COMPANY_EMAIL}`} className="flex-1 md:flex-none">
                        <Button className="w-full bg-gradient-to-r from-gold to-gold-light text-navy font-bold px-6 py-5 rounded-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-gold/20 transition-all cursor-pointer text-xs">
                          <Mail className="w-4 h-4" /> Email Us
                        </Button>
                      </a>
                    </div>
                  </div>

                  {/* 📜 Small AI disclaimer at the end */}
                  <div className="text-center pt-6 border-t border-gold/10 animate-on-load">
                    <div className="inline-flex items-start gap-2.5 px-4 py-3 bg-gold/[0.02] border border-gold/15 rounded-lg max-w-2xl mx-auto text-left">
                      <AlertTriangle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <p className="text-[10px] text-muted-foreground leading-relaxed">
                        <strong className="text-ivory font-bold block mb-0.5">AI Disclaimer:</strong>
                        Budget estimates are AI-assisted and intended for planning purposes only. Final costs depend on site conditions, material prices, and project requirements. Official quotations are provided only after site inspection.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
