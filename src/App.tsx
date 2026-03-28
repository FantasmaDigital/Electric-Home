/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from "motion/react";
import { Zap, X, ChevronLeft, ChevronRight, MousePointer2, Hand } from "lucide-react";
import Navbar from "./components/shared/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import InstallationsSection from "./components/InstallationsSection";
import SpecializedSection from "./components/SpecializedSection";
import MaintenanceSection from "./components/MaintenanceSection";
import MediaBento from "./components/MediaBento";
import ContactSection from "./components/ContactSection";
import SocialSidebar from "./components/shared/SocialSidebar";

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showWipe, setShowWipe] = useState(false);
  const [direction, setDirection] = useState(1);
  const [modalContent, setModalContent] = useState<{ title: string; subtitle: string; description: string; image: string; stats: { label: string; value: string }[] } | null>(null);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [showHint, setShowHint] = useState(true);
  const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);

  const sectionNames = useMemo(() => ["01 / INICIO", "02 / NOSOTROS", "03 / ESPECIALIZADOS", "04 / INSTALACIONES", "05 / MANTENIMIENTO", "06 / GALERÍA", "07 / CONTACTO"], []);

  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 400, damping: 45, mass: 1.2, restDelta: 0.001 });
  const scaleX = useTransform(x, [0, -(sectionNames.length - 1) * window.innerWidth], [0, 1]);

  const accumulatedDeltaX = useRef(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const lastScrollTime = useRef(0);
  const PAUSE_DURATION = 400;
  const WHEEL_THRESHOLD = 50;
  const SWIPE_THRESHOLD = 40;

  useEffect(() => {
    if (modalContent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [modalContent]);

  const moveToSection = useCallback((index: number) => {
    if (isTransitioning) return;
    const dir = index > currentIndex ? 1 : -1;
    setDirection(dir);
    setIsTransitioning(true);
    setShowWipe(true);

    setTimeout(() => {
      setCurrentIndex(index);
      x.set(-index * window.innerWidth);
      const sections = document.querySelectorAll('.scroll-section');
      if (sections[index]) (sections[index] as HTMLElement).scrollTop = 0;
    }, 250);

    setTimeout(() => setShowWipe(false), 450);
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [currentIndex, isTransitioning, x]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (modalContent || isTransitioning) {
        if (modalContent) return;
        e.preventDefault();
        return;
      }

      const sections = document.querySelectorAll('.scroll-section');
      const activeSection = sections[currentIndex] as HTMLElement;

      if (activeSection) {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
          e.preventDefault();
          const now = Date.now();
          if (now - lastScrollTime.current > 200) accumulatedDeltaX.current = 0;
          accumulatedDeltaX.current += e.deltaX;

          if (Math.abs(accumulatedDeltaX.current) >= WHEEL_THRESHOLD && now - lastScrollTime.current >= PAUSE_DURATION) {
            if (accumulatedDeltaX.current > 0 && currentIndex < sections.length - 1) {
              moveToSection(currentIndex + 1);
            } else if (accumulatedDeltaX.current < 0 && currentIndex > 0) {
              moveToSection(currentIndex - 1);
            }
            accumulatedDeltaX.current = 0;
            lastScrollTime.current = now;
          }
        } else {
          activeSection.scrollBy({ top: e.deltaY, behavior: 'auto' });
          accumulatedDeltaX.current = 0;
          if (Math.abs(e.deltaY) > 0) e.preventDefault();
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (modalContent || isTransitioning) return;

      const touchEndX = e.touches[0].clientX;
      const touchEndY = e.touches[0].clientY;
      const deltaX = touchStartX.current - touchEndX;
      const deltaY = touchStartY.current - touchEndY;
      const now = Date.now();

      const sections = document.querySelectorAll('.scroll-section');
      const activeSection = sections[currentIndex] as HTMLElement;

      if (activeSection) {
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
          if (e.cancelable) e.preventDefault();

          if (Math.abs(deltaX) > SWIPE_THRESHOLD && now - lastScrollTime.current >= PAUSE_DURATION) {
            if (deltaX > 0 && currentIndex < sections.length - 1) {
              moveToSection(currentIndex + 1);
            } else if (deltaX < 0 && currentIndex > 0) {
              moveToSection(currentIndex - 1);
            }
            lastScrollTime.current = now;
          }
        }
      }
    };

    const handleNavJump = (e: any) => moveToSection(e.detail.index);
    const handleOpenGlobalModal = (e: any) => setModalContent(e.detail);

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("navJump", handleNavJump);
    window.addEventListener("openGlobalModal", handleOpenGlobalModal);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("navJump", handleNavJump);
      window.removeEventListener("openGlobalModal", handleOpenGlobalModal);
    };
  }, [currentIndex, isTransitioning, modalContent]);

  const handleManualMove = useCallback((dir: "next" | "prev") => {
    if (dir === "next" && currentIndex < sectionNames.length - 1) {
      moveToSection(currentIndex + 1);
    } else if (dir === "prev" && currentIndex > 0) {
      moveToSection(currentIndex - 1);
    }
  }, [currentIndex, moveToSection, sectionNames.length]);

  return (
    <main className="relative bg-white h-[100dvh] w-screen overflow-hidden font-display cursor-default">
      <SocialSidebar isHero={currentIndex === 0} />
      {/* Left Edge Navigation Zone */}
      <div className="fixed inset-y-0 left-0 w-24 z-50 group cursor-none hidden lg:block"
        onMouseEnter={() => setHoverSide("left")}
        onMouseLeave={() => setHoverSide(null)}
        onClick={() => handleManualMove("prev")}
      >
        <div className={`absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent transition-opacity duration-500 pointer-events-none ${hoverSide === "left" && currentIndex > 0 ? "opacity-100" : "opacity-0"}`} />
        <AnimatePresence>
          {hoverSide === "left" && currentIndex > 0 && (
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="absolute left-8 top-1/2 -translate-y-1/2 text-primary"
            >
              <ChevronLeft size={64} strokeWidth={1} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Instructional Hint */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] bg-ink/90 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-2xl flex items-center gap-4 text-white"
          >
            <div className="flex items-center gap-2">
              <ChevronLeft size={16} className="animate-pulse text-primary hidden md:block" onClick={() => handleManualMove("prev")} />
              <MousePointer2 size={16} className="text-secondary opacity-50 hidden md:block" />
              <ChevronRight size={16} className="animate-pulse text-primary hidden md:block" onClick={() => handleManualMove("next")} />

              <motion.div
                animate={{ x: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="md:hidden"
              >
                <Hand size={18} className="text-primary rotate-90" />
              </motion.div>
            </div>
            <span className="text-[10px] uppercase font-black tracking-[0.3em] whitespace-nowrap hidden md:inline">
              Desliza Lateralmente
            </span>
            <span className="text-[10px] uppercase font-black tracking-[0.3em] whitespace-nowrap md:hidden">
              Desliza
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar */}
      <motion.div
        style={{ scaleX, transformOrigin: "left" }}
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100]"
      />

      {/* Cinematic Slide Transition Overlay */}
      <AnimatePresence>
        {showWipe && (
          <div className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center overflow-hidden">
            <motion.div
              initial={{ x: direction > 0 ? "100%" : "-100%", skewX: -12 }}
              animate={{ x: "0%", skewX: -12 }}
              exit={{ x: direction > 0 ? "-100%" : "100%", skewX: -12 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-x-[-20%] inset-y-0 bg-primary/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: direction > 0 ? "110%" : "-110%", skewX: -12 }}
              animate={{ x: "0%", skewX: -12 }}
              exit={{ x: direction > 0 ? "-110%" : "100%", skewX: -12 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-x-[-20%] inset-y-0 bg-ink shadow-[0_0_100px_rgba(0,0,0,0.5)] flex items-center justify-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 0.2, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="font-display text-white text-[clamp(1.5rem,5vw,4rem)] tracking-[0.2em] md:tracking-[0.5em] flex flex-col items-center text-center"
              >
                <span className="text-secondary text-[10px] md:text-sm font-black mb-2 tracking-[0.8em]">TRANSICIÓN</span>
                {sectionNames[currentIndex]}
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Navbar x={springX} />

      <AnimatePresence>
        {/* --- Global Service Modal --- */}
        {modalContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center"
          >
            {/* Backdrop with extreme blur */}
            <motion.div
              initial={{ backdropFilter: "blur(0px)", opacity: 0 }}
              animate={{ backdropFilter: "blur(24px)", opacity: 1 }}
              exit={{ backdropFilter: "blur(0px)", opacity: 0 }}
              onClick={() => setModalContent(null)}
              className="absolute inset-0 bg-ink/60 cursor-pointer"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="relative w-full max-w-full bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row overflow-hidden rounded-none h-screen border border-white/10"
            >
              <button
                onClick={() => setModalContent(null)}
                className="absolute top-24 md:top-32 right-6 md:right-10 lg:right-16 z-50 p-3 bg-ink/5 backdrop-blur-md text-ink hover:bg-primary hover:text-white transition-all active:scale-90 rounded-full border border-ink/10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left: Image with dramatic overlay */}
              <div className="lg:w-1/2 relative bg-surface overflow-hidden group">
                <img
                  src={modalContent.image}
                  alt={modalContent.title}
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-ink/20 to-transparent" />
                <div className="absolute bottom-10 left-10">
                  <span className="text-white/40 font-black text-6xl md:text-7xl uppercase tracking-tighter opacity-20 select-none">DATA</span>
                </div>
              </div>

              {/* Right: Content */}
              <div className="lg:w-1/2 relative bg-white h-full flex flex-col pt-24 md:pt-32">
                <div className="flex-1 overflow-y-auto px-8 md:px-14 lg:px-20 pb-16 md:pb-24 flex flex-col space-y-8 md:space-y-10 custom-scrollbar">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-[2px] bg-primary" />
                      <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">
                        {modalContent.subtitle}
                      </span>
                    </div>
                    <h2 className="font-display text-ink leading-[0.85] text-[clamp(2rem,4vw,4rem)] uppercase tracking-tight">
                      {modalContent.title.split(' ').map((word: string, i: number) => (
                        <span key={i} className={i === modalContent.title.split(' ').length - 1 ? "text-primary italic" : ""}>
                          {word}{' '}
                        </span>
                      ))}
                    </h2>
                  </div>

                  <p className="text-secondary text-sm md:text-base font-medium leading-relaxed max-w-md">
                    {modalContent.description}
                  </p>

                  <div className="grid grid-cols-2 gap-8 pt-8 border-t border-ink/5">
                    {modalContent.stats.map((stat: any, i: number) => (
                      <div key={i} className="space-y-1">
                        <span className="block font-display text-2xl text-ink uppercase tracking-tighter">{stat.value}</span>
                        <span className="text-[9px] uppercase font-black text-primary tracking-widest leading-none">{stat.label}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setModalContent(null)}
                    className="w-fit bg-ink text-white px-10 py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-primary transition-all active:scale-95 shadow-xl"
                  >
                    Cerrar Detalles
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* --- Initial Project Disclaimer --- */}
        {/* {showDisclaimer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ backdropFilter: "blur(0px)", opacity: 0 }}
              animate={{ backdropFilter: "blur(32px)", opacity: 1 }}
              exit={{ backdropFilter: "blur(0px)", opacity: 0 }}
              className="absolute inset-0 bg-black/80" 
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="relative w-full max-w-xl bg-white p-10 md:p-14 text-center space-y-8 rounded-sm shadow-[0_40px_80px_-20px_rgba(0,0,0,1)]"
            >
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
                  <Zap className="text-primary w-8 h-8 fill-primary" />
                </div>
              </div>

              <div className="space-y-4">
                <span className="text-secondary font-black uppercase tracking-[0.5em] text-[10px]">Aviso Técnico Importante</span>
                <h2 className="font-display text-ink text-4xl uppercase tracking-tighter leading-none">
                  Entorno de <span className="text-primary">Cotización</span>
                </h2>
                <div className="w-12 h-[2px] bg-primary mx-auto" />
              </div>

              <p className="text-secondary text-sm font-medium leading-relaxed">
                Este sitio es un entorno de simulación técnica de alta fidelidad. Todo el diseño y contenido se ajustará a los requerimientos específicos de su corporación tras la validación de activos críticos.
              </p>

              <button 
                onClick={() => setShowDisclaimer(false)}
                className="w-full bg-ink text-white py-6 text-[11px] font-black uppercase tracking-[0.5em] hover:bg-primary transition-all active:scale-95 shadow-2xl"
              >
                Acceder a la Experiencia
              </button>
            </motion.div>
          </motion.div>
        )} */}
      </AnimatePresence>

      <motion.div
        animate={{
          scale: isTransitioning ? 0.94 : 1,
          filter: isTransitioning ? "blur(2px)" : "blur(0px)",
        }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className="horizontal-scroll-wrapper will-change-transform"
      >
        <motion.div style={{ x: springX }} className="horizontal-scroll-content">
          <div className="scroll-section">
            <Hero />
          </div>
          <div className="scroll-section">
            <AboutSection />
          </div>
          <div className="scroll-section">
            <SpecializedSection />
          </div>
          <div className="scroll-section">
            <InstallationsSection />
          </div>
          <div className="scroll-section">
            <MaintenanceSection x={x} />
          </div>
          <div className="scroll-section">
            <MediaBento />
          </div>
          <div className="scroll-section">
            <ContactSection />
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
