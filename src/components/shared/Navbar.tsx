import { motion, MotionValue, useMotionValueEvent, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  x: MotionValue<number>;
}

export default function Navbar({ x }: NavbarProps) {
  const navItems = ["Inicio", "Nosotros", "Especializados", "Instalaciones", "Mantenimiento", "Galería", "Contacto"];
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    window.dispatchEvent(new CustomEvent("mobileMenuToggled", { detail: { isOpen: newState } }));
  };

  const scrollToSection = (index: number) => {
    setIsMobileMenuOpen(false);
    window.dispatchEvent(new CustomEvent("mobileMenuToggled", { detail: { isOpen: false } }));
    // Dispatch custom event to App.tsx
    const event = new CustomEvent("navJump", { detail: { index } });
    window.dispatchEvent(event);
  };

  useMotionValueEvent(x, "change", (latest) => {
    const index = Math.round(Math.abs(latest) / window.innerWidth);
    if (index >= 0 && index < navItems.length) {
      setActiveIndex(index);
    }
  });

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 md:top-4 left-2 right-2 md:left-8 md:right-8 z-[3000] w-[calc(100%-16px)] md:w-[calc(100%-64px)] mx-auto bg-white/70 backdrop-blur-xl flex justify-between items-center px-4 md:px-8 py-1 md:py-1 border border-white/20 rounded-full shadow-lg transition-all duration-500"
      >
        <div 
          onClick={() => scrollToSection(0)}
          className="text-lg md:text-xl font-display tracking-tighter text-ink uppercase cursor-pointer flex items-center gap-2 pl-2"
        >
          <img src="logo.png" alt="Electric Home" className="w-auto h-12 md:w-auto md:h-16" />
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden xl:flex gap-8 xl:gap-12 items-center">
          {navItems.map((item, index) => (
            <button
              key={item}
              onClick={() => scrollToSection(index)}
              className={`font-sans tracking-[0.1em] font-black uppercase text-xs transition-all relative cursor-pointer ${
                activeIndex === index ? "text-ink" : "text-secondary hover:text-ink"
              }`}
            >
              {item}
              {activeIndex === index && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 w-full h-[1px] bg-primary"
                />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <button className="hidden sm:block bg-ink text-white px-5 md:px-8 py-2 md:py-3 font-sans tracking-[0.2em] font-black uppercase text-[10px] md:text-xs hover:bg-primary transition-all active:scale-95 shadow-xl rounded" onClick={() => scrollToSection(6)}>
            Solicitar Servicio
          </button>
          
          {/* Mobile Hamburger Toggle */}
          <button 
            className={`xl:hidden p-2 rounded-full transition-all duration-300 ${
              isMobileMenuOpen ? "bg-primary text-white shadow-lg rotate-180" : "bg-ink/5 text-ink hover:text-primary rotate-0"
            }`}
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2900] bg-white/95 backdrop-blur-2xl flex flex-col px-6 pb-8 pt-24 xl:hidden"
          >
            <div className="flex-grow flex flex-col justify-start pt-4 gap-4 overflow-y-auto custom-scrollbar pr-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => scrollToSection(index)}
                  className="group flex items-center text-left w-full relative py-2"
                >
                  <motion.div 
                    layoutId={`mobile-nav-${index}`}
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-primary group-hover:h-full transition-all duration-300" 
                  />
                  <span className="text-primary font-black uppercase tracking-[0.2em] text-[10px] mr-4 opacity-80 w-6 text-right">
                    0{index + 1}
                  </span>
                  <span className="font-display text-2xl uppercase tracking-tight text-ink/70 group-hover:text-ink transition-colors duration-300">
                    {item}
                  </span>
                </motion.button>
              ))}
            </div>

            <div className="flex flex-col gap-6 mt-4 flex-shrink-0">
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="w-full bg-primary text-white py-4 font-sans tracking-[0.2em] font-black uppercase text-xs hover:bg-ink hover:text-white transition-all active:scale-95 shadow-xl rounded-sm" 
                onClick={() => scrollToSection(6)}
              >
                Solicitar Servicio
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
