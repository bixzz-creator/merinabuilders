import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import {
  X,
  Send,
  Building,
  Calculator,
  Calendar,
  Sparkles,
  Phone,
  Mail,
  Minus,
  Maximize2,
  HelpCircle,
  MapPin,
  ArrowRight,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { getAssistantChatResponse } from '@/services/ai/chatAssistant';
import type { ChatMessage, ChatAssistantState } from '@/services/ai/chatAssistant';
import { estimateBudgetWithAI } from '@/services/ai/budgetEstimator';
import type { BudgetEstimateResponse } from '@/services/ai/budgetEstimator';
import { COMPANY_PHONE, COMPANY_EMAIL } from '@/constants/navigation';

// ── Fire & Smoke Particle System for Micky ──────────────────────────────────
function FireParticles({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-12 pointer-events-none overflow-hidden z-0">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-4 left-1/2 rounded-full bg-gradient-to-t from-red-600 via-orange-500 to-amber-300"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            x: (Math.random() - 0.5) * 14,
          }}
          animate={{
            y: [0, -40],
            opacity: [0.85, 0],
            scale: [1.2, 0.15],
          }}
          transition={{
            duration: Math.random() * 0.5 + 0.35,
            repeat: Infinity,
            delay: i * 0.08,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

// ── Micky Mascot Animated SVG component ─────────────────────────────────────
interface MickyMascotProps {
  state: 'idle' | 'sending' | 'thinking' | 'launched';
  size?: 'sm' | 'md' | 'lg';
}

function MickyMascot({ state, size = 'md' }: MickyMascotProps) {
  const getRocketAnimation = () => {
    switch (state) {
      case 'sending':
        return {
          y: [0, 6, -18, 0],
          rotate: [0, -15, 12, 0],
          scale: [1, 0.9, 1.1, 1],
        };
      case 'launched':
        return {
          y: [0, -220, 120, 0],
          opacity: [1, 0, 0, 1],
          scale: [1, 1.15, 0.8, 1],
        };
      case 'thinking':
        return {
          y: [0, -3, 3, -1.5, 1.5, 0],
          rotate: [0, -0.8, 0.8, 0],
        };
      case 'idle':
      default:
        return {
          y: [-2.5, 2.5],
          rotate: [-1.2, 1.2],
        };
    }
  };

  const getRocketTransition = (): any => {
    switch (state) {
      case 'sending':
        return {
          duration: 0.8,
          ease: 'easeInOut',
        };
      case 'launched':
        return {
          duration: 1.1,
          times: [0, 0.3, 0.65, 1],
          ease: 'easeInOut',
        };
      case 'thinking':
        return {
          y: { repeat: Infinity, duration: 0.7, repeatType: 'reverse', ease: 'easeInOut' },
          rotate: { repeat: Infinity, duration: 1.1, repeatType: 'reverse', ease: 'easeInOut' },
        };
      case 'idle':
      default:
        return {
          y: { repeat: Infinity, duration: 2.8, repeatType: 'reverse', ease: 'easeInOut' },
          rotate: { repeat: Infinity, duration: 3.5, repeatType: 'reverse', ease: 'easeInOut' },
        };
    }
  };

  const dims = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  }[size];

  const isRobot = state === 'idle' || state === 'thinking';

  return (
    <div className={`${dims} relative flex items-center justify-center overflow-visible`}>
      {/* Soft Gold Glow */}
      <div className="absolute inset-0 rounded-full bg-gold/15 blur-xs opacity-60 pointer-events-none" />

      {/* Flame trail behind/under the logo */}
      <AnimatePresence>
        {(state === 'thinking' || state === 'sending' || state === 'launched') && (
          <motion.div
            className="absolute bottom-[-35%] left-1/2 -translate-x-1/2 w-3/5 h-4/5 z-0 origin-top"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{
              opacity: [0.8, 1, 0.8],
              scaleY: state === 'thinking' ? [1.1, 1.4, 0.95, 1.25, 1.1] : 1.6,
              scaleX: [1, 1.1, 0.95, 1.05, 1],
            }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{
              scaleY: { repeat: Infinity, duration: 0.12, ease: 'easeInOut' },
              scaleX: { repeat: Infinity, duration: 0.18, ease: 'easeInOut' },
              opacity: { duration: 0.2 },
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="micky-fire-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FF9F1C" />
                  <stop offset="50%" stopColor="#FF4A1C" />
                  <stop offset="100%" stopColor="#FF1C1C" stopOpacity="0" />
                </linearGradient>
                <filter id="micky-flame-glow-filter" x="-25%" y="-25%" width="150%" height="150%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <path
                d="M 30 0 L 70 0 L 50 100 Z"
                fill="url(#micky-fire-grad)"
                filter="url(#micky-flame-glow-filter)"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pure Vector Mascot Logo */}
      <motion.div
        animate={getRocketAnimation()}
        transition={getRocketTransition()}
        className="w-full h-full relative z-10 origin-center cursor-pointer"
        whileHover={{ rotate: 8, scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
      >
        {isRobot ? (
          <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="robo-bg-grad" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="70%" stopColor="#F8F6F0" />
                <stop offset="100%" stopColor="#EADFD0" />
              </radialGradient>
              <linearGradient id="rocket-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F5D061" />
                <stop offset="30%" stopColor="#E5BE72" />
                <stop offset="70%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#AA7C11" />
              </linearGradient>
              <linearGradient id="rocket-body-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#F3F4F6" />
                <stop offset="100%" stopColor="#E5E7EB" />
              </linearGradient>
              <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Circular luxury emblem background */}
            <circle cx="50" cy="50" r="46" fill="url(#robo-bg-grad)" stroke="#D4AF37" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="41" fill="none" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="3, 3" opacity="0.4" />

            {/* Robot character group */}
            <g>
              {/* Antenna */}
              <path d="M 50 28 L 50 16" stroke="url(#rocket-gold-grad)" strokeWidth="2.5" strokeLinecap="round" />
              {state === 'thinking' ? (
                <motion.circle
                  cx="50"
                  cy="14"
                  r="3.5"
                  fill="#D4AF37"
                  animate={{ scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                  filter="url(#soft-glow)"
                />
              ) : (
                <circle cx="50" cy="14" r="3" fill="#D4AF37" />
              )}

              {/* Ears */}
              <rect x="29" y="32" width="5" height="8" rx="2" fill="url(#rocket-gold-grad)" />
              <rect x="66" y="32" width="5" height="8" rx="2" fill="url(#rocket-gold-grad)" />

              {/* Head */}
              <rect x="33" y="22" width="34" height="24" rx="7" fill="url(#rocket-body-grad)" stroke="url(#rocket-gold-grad)" strokeWidth="2" />
              {/* Screen */}
              <rect x="37" y="26" width="26" height="14" rx="4" fill="#18181B" />
              
              {/* Glowing Curved Eyes */}
              {state === 'thinking' ? (
                <g>
                  <motion.path
                    d="M 41 33 Q 44 30 47 33"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="2"
                    strokeLinecap="round"
                    animate={{ y: [0, -1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.4 }}
                  />
                  <motion.path
                    d="M 53 33 Q 56 30 59 33"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="2"
                    strokeLinecap="round"
                    animate={{ y: [0, -1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.4 }}
                  />
                </g>
              ) : (
                <g>
                  <path d="M 41 33 Q 44 31 47 33" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 53 33 Q 56 31 59 33" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
                </g>
              )}

              {/* Neck */}
              <rect x="46" y="45" width="8" height="4" rx="1" fill="url(#rocket-gold-grad)" />

              {/* Torso */}
              <rect x="28" y="48" width="44" height="30" rx="9" fill="url(#rocket-body-grad)" stroke="url(#rocket-gold-grad)" strokeWidth="2" />
              
              {/* Logo 'M' on Chest */}
              <path d="M 43 65 L 46 59 L 50 62 L 54 59 L 57 65" fill="none" stroke="url(#rocket-gold-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

              {/* Shoulders & Arms */}
              <circle cx="25" cy="56" r="3.5" fill="url(#rocket-gold-grad)" />
              <circle cx="75" cy="56" r="3.5" fill="url(#rocket-gold-grad)" />
              <path d="M 25 56 C 20 64 29 70 29 70" fill="none" stroke="url(#rocket-gold-grad)" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 75 56 C 80 64 71 70 71 70" fill="none" stroke="url(#rocket-gold-grad)" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          </svg>
        ) : (
          <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="rocket-bg-grad" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#1E293B" />
                <stop offset="70%" stopColor="#0B1320" />
                <stop offset="100%" stopColor="#030712" />
              </radialGradient>
              
              <linearGradient id="rocket-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F5D061" />
                <stop offset="30%" stopColor="#E5BE72" />
                <stop offset="70%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#AA7C11" />
              </linearGradient>

              <linearGradient id="rocket-body-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#F3F4F6" />
                <stop offset="100%" stopColor="#E5E7EB" />
              </linearGradient>

              <linearGradient id="flame-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFD000" />
                <stop offset="40%" stopColor="#FF6A00" />
                <stop offset="100%" stopColor="#FF0000" stopOpacity="0" />
              </linearGradient>

              <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Circular glass background */}
            <circle cx="50" cy="50" r="46" fill="url(#rocket-bg-grad)" stroke="#D4AF37" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="41" fill="none" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="3, 3" opacity="0.3" />

            {/* Stars/Ember Glow Particles in the background */}
            <circle cx="25" cy="30" r="0.75" fill="#D4AF37" opacity="0.5" />
            <circle cx="72" cy="24" r="1.2" fill="#D4AF37" opacity="0.7" filter="url(#soft-glow)" />
            <circle cx="76" cy="64" r="0.8" fill="#D4AF37" opacity="0.4" />
            <circle cx="28" cy="74" r="1" fill="#D4AF37" opacity="0.6" />

            {/* Rocket Body Group - Tilted slightly upwards-right */}
            <g transform="translate(50, 50) rotate(40) translate(-50, -50)">
              {/* Thruster Flame */}
              {((state as string) === 'thinking' || state === 'sending' || state === 'launched') ? (
                <motion.g
                  animate={{
                    scaleY: [1, 1.35, 0.9, 1.25, 1],
                    scaleX: [1, 1.1, 0.95, 1.05, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.14,
                    ease: 'easeInOut',
                  }}
                  style={{ originX: '50px', originY: '70px' }}
                >
                  <path d="M 45 70 Q 50 92 50 100 Q 50 92 55 70 Z" fill="url(#flame-grad)" opacity="0.95" />
                  <path d="M 47 70 Q 50 82 50 86 Q 50 82 53 70 Z" fill="#FFE066" />
                </motion.g>
              ) : (
                <motion.g
                  animate={{
                    scaleY: [0.95, 1.05, 0.95],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.75,
                    ease: 'easeInOut',
                  }}
                  style={{ originX: '50px', originY: '70px' }}
                >
                  <path d="M 47 70 Q 50 78 50 82 Q 50 78 53 70 Z" fill="url(#flame-grad)" opacity="0.6" />
                </motion.g>
              )}

              {/* Left Fin */}
              <path d="M 39 52 L 30 70 L 40 66 Z" fill="url(#rocket-gold-grad)" />

              {/* Right Fin */}
              <path d="M 61 52 L 70 70 L 60 66 Z" fill="url(#rocket-gold-grad)" />

              {/* Center Thruster Nozzle */}
              <path d="M 45 66 L 55 66 L 52 71 L 48 71 Z" fill="#374151" />

              {/* Rocket Body */}
              <path d="M 40 38 C 40 26 50 10 50 10 C 50 10 60 26 60 38 L 60 66 L 40 66 Z" fill="url(#rocket-body-grad)" />

              {/* Nose Cone */}
              <path d="M 42.5 30 C 43.5 22 50 10 50 10 C 50 10 56.5 22 57.5 30 Z" fill="url(#rocket-gold-grad)" filter="url(#soft-glow)" />

              {/* Integrated Letter 'M' on the Body */}
              <path d="M 44.5 52 L 46.5 42 L 50 47 L 53.5 42 L 55.5 52 L 53.5 52 L 52.5 46 L 50 49.5 L 47.5 46 L 46.5 52 Z" fill="url(#rocket-gold-grad)" />

              {/* Circular Porthole Window */}
              <circle cx="50" cy="35" r="4.5" fill="#38BDF8" stroke="url(#rocket-gold-grad)" strokeWidth="1.5" />
              <circle cx="48.5" cy="33.5" r="1.5" fill="#FFFFFF" opacity="0.75" />
            </g>
          </svg>
        )}
      </motion.div>

      {/* Floating fire particles */}
      <FireParticles active={state === 'thinking' || state === 'sending' || state === 'launched'} />
    </div>
  );
}

export default function AIChatAssistant() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [mickyState, setMickyState] = useState<'idle' | 'sending' | 'thinking' | 'launched'>('idle');

  const [chatState, setChatState] = useState<ChatAssistantState>({
    messages: [
      {
        id: 'welcome',
        sender: 'assistant',
        text: `Hello! 👋\n\nI'm Micky, your Construction Companion at Merina Builders.\n\nI'm here to help you with:\n• Construction planning\n• Budget estimation\n• Project guidance\n• Company services\n• Site visit requests\n• General construction questions\n\nHow can I assist you today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ],
    estimationState: {
      isCollecting: false,
      data: {},
    },
  });

  const chatEndRef = useRef<HTMLDivElement>(null);
  const widgetTriggerRef = useRef<HTMLButtonElement>(null);

  // Lazy load after page is fully interactive (3s delay) to preserve Lighthouse performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // GSAP entrance animation for floating trigger
  useEffect(() => {
    if (mounted && widgetTriggerRef.current) {
      gsap.fromTo(
        widgetTriggerRef.current,
        { scale: 0, rotation: -45, y: 50 },
        { scale: 1, rotation: 0, y: 0, duration: 0.6, ease: 'back.out(1.7)' }
      );
    }
  }, [mounted]);

  // Auto-scroll to the bottom of the chat when messages or states update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatState.messages, isThinking, isAnalyzing]);

  if (!mounted) return null;

  const sendMessage = async (text: string, isQuickAction = false) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isQuickAction,
    };

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMsg],
    }));
    setInputValue('');
    
    // Trigger launch ignitions
    setMickyState('sending');
    const thinkingTimer = setTimeout(() => {
      setMickyState('thinking');
    }, 800);
    setIsThinking(true);

    try {
      const response = await getAssistantChatResponse(text, {
        messages: [...chatState.messages, userMsg],
        estimationState: chatState.estimationState,
      });

      // Handle transition to Gemini Budget estimation API call (analyzing)
      if (response.isAnalyzing) {
        setIsThinking(false);
        setIsAnalyzing(true);
        setMickyState('thinking');

        try {
          const res = await estimateBudgetWithAI(response.updatedState.estimationState.data);
          
          const dashboardMsg: ChatMessage = {
            id: Math.random().toString(),
            sender: 'assistant',
            text: `### 🏗️ Estimation Complete!\nHere is the preliminary construction budget estimation report prepared for your project:`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            estimate: res,
          };

          setChatState(response.updatedState);
          setChatState((prev) => ({
            ...prev,
            messages: [...prev.messages, dashboardMsg],
          }));

          setMickyState('launched');
          setTimeout(() => setMickyState('idle'), 1200);
        } catch (err) {
          const errorMsg: ChatMessage = {
            id: Math.random().toString(),
            sender: 'assistant',
            text: 'Micky is currently unavailable. Please try again in a few moments.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          setChatState(response.updatedState);
          setChatState((prev) => ({
            ...prev,
            messages: [...prev.messages, errorMsg],
          }));

          setMickyState('launched');
          setTimeout(() => setMickyState('idle'), 1200);
        } finally {
          setIsAnalyzing(false);
        }
      } else {
        const assistantMsg: ChatMessage = {
          id: Math.random().toString(),
          sender: 'assistant',
          text: response.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setChatState(response.updatedState);
        setChatState((prev) => ({
          ...prev,
          messages: [...prev.messages, assistantMsg],
        }));

        setMickyState('launched');
        setTimeout(() => setMickyState('idle'), 1200);
      }
    } catch (e) {
      console.error(e);
      setMickyState('idle');
    } finally {
      setIsThinking(false);
      clearTimeout(thinkingTimer);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage(inputValue);
    }
  };

  const handleQuickAction = (action: string) => {
    sendMessage(action, true);
  };

  const quickActions = [
    { label: '🏗 Estimate Budget', text: 'Estimate Construction Budget' },
    { label: '📞 Request Quote', text: 'Request a Quote' },
    { label: '📅 Book Site Visit', text: 'Book Site Visit' },
    { label: '🏢 Our Services', text: 'Our Services' },
    { label: '📂 View Projects', text: 'View Projects' },
    { label: '❓ FAQ', text: 'Frequently Questions' },
    { label: '📍 Contact Us', text: 'Contact Us' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans print:hidden">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={
              isMinimized
                ? { opacity: 1, scale: 0.85, y: 150, height: '60px' }
                : { opacity: 1, scale: 1, y: 0, height: '580px' }
            }
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={`w-[390px] max-w-[calc(100vw-2rem)] bg-[#FDFBF7] border border-gold/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
              isMinimized ? 'pointer-events-none opacity-40' : ''
            }`}
          >
            {/* Header */}
            <div className="bg-[#F8F6F0] border-b border-gold/20 px-4 py-3 flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-gold/20 bg-white backdrop-blur-xs flex items-center justify-center p-1.5 shrink-0 overflow-visible relative">
                  <MickyMascot state={isOpen ? mickyState : 'idle'} size="sm" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gradient-gold leading-tight font-display">Micky</h4>
                  <p className="text-[10px] text-[#18181B]/60">Construction Companion | Merina Builders</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 rounded-lg hover:bg-black/5 text-[#18181B]/60 hover:text-[#18181B] transition-colors cursor-pointer"
                  title={isMinimized ? 'Maximize' : 'Minimize'}
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsMinimized(false);
                  }}
                  className="p-1.5 rounded-lg hover:bg-black/5 text-[#18181B]/60 hover:text-[#18181B] transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FDFBF7] min-h-0 pointer-events-auto">
                  {chatState.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.sender === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div
                        className={`max-w-[88%] rounded-2xl px-4 py-3 text-xs leading-relaxed whitespace-pre-line shadow-md transition-all ${
                          msg.sender === 'user'
                            ? 'bg-gradient-to-br from-gold to-gold-dark text-[#0A0E14] font-bold rounded-tr-none hover:shadow-gold/15 border border-gold/10'
                            : 'bg-[#F8F6F0] text-[#18181B] border border-gold/15 rounded-tl-none backdrop-blur-xs'
                        }`}
                      >
                        {msg.text}

                        {/* Rendering structured estimate dashboard inside the bubble if present */}
                        {msg.estimate && (
                          <div className="mt-4 pt-4 border-t border-gold/15 space-y-3 text-left">
                            <div className="grid grid-cols-2 gap-2 text-[11px]">
                              <div className="bg-[#FDFBF7] p-2 rounded border border-gold/15">
                                <span className="text-[9px] text-[#18181B]/50 uppercase block font-semibold">Estimated Budget</span>
                                <span className="font-bold text-gold-dark">{msg.estimate.estimatedBudget}</span>
                              </div>
                              <div className="bg-[#FDFBF7] p-2 rounded border border-gold/15">
                                <span className="text-[9px] text-[#18181B]/50 uppercase block font-semibold">Timeline</span>
                                <span className="font-bold text-[#18181B]">{msg.estimate.estimatedTimeline}</span>
                              </div>
                              <div className="bg-[#FDFBF7] p-2 rounded border border-gold/15 col-span-2 flex justify-between items-center">
                                <span className="text-[9px] text-[#18181B]/50 uppercase font-semibold">Estimation Confidence</span>
                                <span className="font-bold text-emerald-600 bg-emerald-500/15 px-1.5 py-0.5 rounded border border-emerald-500/30 text-[10px]">
                                  {msg.estimate.confidence}%
                                </span>
                              </div>
                            </div>

                            <div className="border-t border-gold/15 pt-2">
                              <span className="text-[9px] text-gold-dark uppercase block font-semibold tracking-wider mb-1.5">Cost Breakdown</span>
                              <div className="space-y-1 text-[10px] text-[#18181B]/80">
                                <div className="flex justify-between">
                                  <span>Material Cost:</span>
                                  <span className="font-semibold text-[#18181B]">{msg.estimate.materialCost}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Labour Cost:</span>
                                  <span className="font-semibold text-[#18181B]">{msg.estimate.labourCost}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Electrical Cost:</span>
                                  <span className="font-semibold text-[#18181B]">{msg.estimate.electricalCost}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Plumbing Cost:</span>
                                  <span className="font-semibold text-[#18181B]">{msg.estimate.plumbingCost}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Interior Cost:</span>
                                  <span className="font-semibold text-[#18181B]">{msg.estimate.interiorCost}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Contingency Cost:</span>
                                  <span className="font-semibold text-[#18181B]">{msg.estimate.contingencyCost}</span>
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-gold/15 pt-2">
                              <span className="text-[9px] text-gold-dark uppercase block font-semibold tracking-wider mb-1">AI Recommendation</span>
                              <p className="text-[10px] text-[#18181B]/80 leading-normal">{msg.estimate.recommendations?.[0]}</p>
                            </div>

                            <div className="border-t border-gold/15 pt-2 bg-gold/10 p-2 rounded border border-gold/20">
                              <p className="text-[9px] text-[#18181B]/80 leading-normal font-medium">{msg.estimate.importantNotes}</p>
                            </div>
                            
                            <p className="text-[9px] text-[#18181B]/50 italic mt-2.5 text-center font-normal leading-normal border-t border-gold/10 pt-2">
                              *Disclaimer: Budget estimates are AI-assisted and intended for planning purposes only. Final costs depend on site conditions, material prices, and project requirements.
                            </p>
                          </div>
                        )}
                      </div>
                      <span className="text-[9px] text-[#18181B]/40 mt-1 px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  ))}

                  {/* Thinking Indicator */}
                  {isThinking && (
                    <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#F8F6F0] border border-gold/15 shadow-md max-w-[85%] rounded-tl-none backdrop-blur-xs">
                      {/* Mini animated mascot */}
                      <div className="w-8 h-10 relative overflow-visible flex-shrink-0">
                        <MickyMascot state="thinking" size="sm" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-gradient-gold">Micky is preparing your response...</span>
                        <span className="text-[9px] text-[#18181B]/60 mt-0.5">Calculating building metrics</span>
                      </div>
                    </div>
                  )}

                  {/* Analyzing Indicator with Animated Progress */}
                  {isAnalyzing && (
                    <div className="glass p-4 rounded-xl border border-gold/15 space-y-3 bg-[#F8F6F0] w-[85%] max-w-[300px] rounded-tl-none backdrop-blur-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-10 relative overflow-visible flex-shrink-0">
                          <MickyMascot state="thinking" size="sm" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[11px] font-bold text-gradient-gold">Micky is analyzing your project...</span>
                          <span className="text-[9px] text-[#18181B]/60">Compiling material & labor timelines</span>
                        </div>
                      </div>
                      <div className="w-full h-1 bg-navy rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 3.5, ease: 'easeInOut' }}
                          className="h-full bg-gold"
                        />
                      </div>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>

                {/* Quick Action Suggestion Pills */}
                <div className="px-4 py-2 bg-[#F8F6F0] border-t border-gold/15 pointer-events-auto overflow-x-auto flex gap-1.5 scrollbar-none shrink-0">
                  {quickActions.map((act) => (
                    <button
                      key={act.label}
                      onClick={() => handleQuickAction(act.text)}
                      className="px-3 py-1 rounded-full bg-white border border-gold/25 text-[#18181B]/80 hover:text-gold hover:bg-gold/5 text-[10px] whitespace-nowrap cursor-pointer transition-all duration-200"
                    >
                      {act.label}
                    </button>
                  ))}
                </div>

                {/* Chat Footer Input */}
                <div className="p-3 bg-[#F8F6F0] border-t border-gold/25 flex items-center gap-2 pointer-events-auto shrink-0">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="flex-1 bg-white border border-gold/25 hover:border-gold/40 focus:border-gold/60 rounded-full px-4 py-2 text-xs text-[#18181B] outline-none transition-colors placeholder-[#18181B]/45"
                  />
                  <button
                    onClick={() => sendMessage(inputValue)}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-gold to-gold-light text-[#0A0E14] flex items-center justify-center shrink-0 cursor-pointer shadow-md shadow-gold/20 transition-transform duration-200 hover:scale-105 active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button Trigger */}
      {(!isOpen || isMinimized) && (
        <div className="relative group pointer-events-auto">
          {/* Hover Tooltip */}
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.92 }}
            whileHover={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute bottom-[calc(100%+10px)] right-0 w-52 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <div className="bg-[#FDFBF7] border border-gold/30 rounded-2xl rounded-br-sm shadow-xl shadow-gold/10 px-4 py-3 relative">
              {/* Small arrow pointing down-right */}
              <div className="absolute -bottom-2 right-5 w-4 h-4 bg-[#FDFBF7] border-r border-b border-gold/30 rotate-45 rounded-sm" />
              <p className="text-[11px] font-semibold text-[#18181B] leading-snug">
                👋 Hey! I'm <span className="text-gradient-gold">Micky</span>, your AI assistant.
              </p>
              <p className="text-[10px] text-[#18181B]/60 mt-1 leading-relaxed">
                Ask me anything about construction, costs, or your project!
              </p>
              {/* Animated dot row */}
              <div className="flex gap-1 mt-2">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-gold"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <button
            ref={widgetTriggerRef}
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="w-16 h-16 rounded-full border border-gold/30 bg-[#FDFBF7] backdrop-blur-md flex items-center justify-center shadow-2xl hover:shadow-gold/30 hover:scale-105 active:scale-95 cursor-pointer transition-all duration-300 overflow-visible relative"
            aria-label="Open AI Assistant"
          >
            {/* Circular logo container */}
            <div className="w-full h-full p-2.5 relative overflow-visible flex items-center justify-center">
              <MickyMascot state="idle" size="lg" />
            </div>
            {/* Notification pulse */}
            <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#FDFBF7] animate-pulse shadow-md shadow-emerald-500/50" />
          </button>
        </div>
      )}
    </div>
  );
}
