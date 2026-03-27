import React, { memo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Facebook, Instagram, Plus, X } from "lucide-react";

const TikTok = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const socialLinks = [
  { icon: Facebook, href: "http://facebook.com/electrichomesv/", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/electrichome4756?igsh=NnBrNDd3dmp0cHg1", label: "Instagram" },
  { icon: TikTok, href: "https://www.tiktok.com/@electric_home2005?_r=1&_t=ZS-952lB9P7ZfY", label: "TikTok" },
];

function SocialSidebar({ isHero = false }: { isHero?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const handleNavToggle = (e: any) => setIsNavOpen(e.detail.isOpen);
    window.addEventListener("mobileMenuToggled", handleNavToggle);
    return () => window.removeEventListener("mobileMenuToggled", handleNavToggle);
  }, []);
  const colorClass = isHero ? "text-white/60 hover:text-white" : "text-ink/40 hover:text-primary";
  const lineColor = isHero ? "bg-white/30" : "bg-primary/30";
  const textColor = isHero ? "text-white/40" : "text-primary/40";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed z-[4000] flex flex-col items-center right-4 bottom-6 xl:right-6 xl:bottom-auto xl:top-1/2 xl:-translate-y-1/2 pointer-events-none"
    >
      {/* Desktop View: Always Visible */}
      <div className="hidden xl:flex flex-col items-center gap-6 pointer-events-auto">
        <div className={`w-[1px] h-20 mb-2 transition-colors duration-500 ${lineColor}`} />
        {socialLinks.map((social, index) => (
          <motion.a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, x: -5 }}
            className={`${colorClass} transition-all duration-500`}
            aria-label={social.label}
          >
            <social.icon className="w-5 h-5" />
          </motion.a>
        ))}
        <div className={`w-[1px] h-20 mt-2 transition-colors duration-500 ${lineColor}`} />
        <span className={`[writing-mode:vertical-lr] text-[8px] font-black uppercase tracking-[0.4em] mt-4 select-none transition-colors duration-500 ${textColor}`}>
          Follow Us
        </span>
      </div>

      {/* Mobile View: Toggleable Menu */}
      <div className="flex flex-col items-center xl:hidden pointer-events-auto">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, y: 20 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: 20 }}
              className="flex flex-col justify-end gap-5 mb-6 overflow-hidden items-center"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ delay: index * 0.05 }}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full backdrop-blur-md shadow-lg border hover:scale-110 active:scale-90 transition-transform ${
                    isNavOpen
                      ? "bg-ink/5 text-ink border-ink/20"
                      : isHero
                        ? "bg-white/10 text-white border-white/20"
                        : "bg-ink/5 text-primary border-ink/10"
                  }`}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-3 rounded-full flex items-center justify-center shadow-[0_10px_30px_-5px_var(--color-primary)] transition-all duration-300 hover:scale-105 active:scale-95 bg-primary text-white border-2 border-white/20 ${isOpen ? 'rotate-45' : 'rotate-0'}`}
          aria-label="Toggle Social Networks"
        >
          <Plus size={24} strokeWidth={2.5} />
        </button>
      </div>
    </motion.div>
  );
}

export default memo(SocialSidebar);
