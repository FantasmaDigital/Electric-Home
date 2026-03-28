import { motion } from "motion/react";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import React, { memo } from "react";

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

function Footer() {
  return (
    <footer className="relative z-10 w-full bg-white pt-20 pb-10 px-6 md:px-16 border-t border-ink/5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          
          {/* Brand and Tagline */}
          <div className="space-y-6 max-w-sm">
            <div className="flex items-center gap-3">
              <img src="logo.png" alt="Electric Home" className="w-auto h-24 md:h-24" loading="lazy" />
            </div>
            <p className="text-secondary text-sm font-medium leading-relaxed">
              Líderes en ingeniería eléctrica industrial y residencial. Soluciones de alta fidelidad.
            </p>
          </div>

          {/* Contact Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-20">
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Contacto</span>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-ink hover:text-primary transition-colors cursor-pointer group">
                  <Mail className="w-4 h-4 text-secondary group-hover:text-primary transition-colors" />
                  <a className="text-xs font-bold uppercase tracking-widest" href={`mailto:${import.meta.env.VITE_EMAIL}`}>{import.meta.env.VITE_EMAIL}</a>
                </li>
                <li className="flex items-center gap-3 text-ink hover:text-primary transition-colors cursor-pointer group">
                  <Phone className="w-4 h-4 text-secondary group-hover:text-primary transition-colors" />
                  <a className="text-xs font-bold uppercase tracking-widest" href={`https://wa.me/503${import.meta.env.VITE_PHONE_NUMBER.split('-').join('')}`} target="_blank" rel="noopener noreferrer">{import.meta.env.VITE_PHONE_NUMBER}</a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Redes Sociales</span>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-ink text-white rounded-full flex items-center justify-center hover:bg-primary transition-all shadow-lg"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-ink/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] font-black text-secondary/60 uppercase tracking-[0.4em]">
            © {new Date().getFullYear()} ELECTRIC HOME. TODOS LOS DERECHOS RESERVADOS.
          </p>
          <div className="flex items-center gap-8">
            <span className="text-[9px] font-black text-ink hover:text-primary transition-colors cursor-pointer uppercase tracking-[0.4em]">Términos de Servicio</span>
            <span className="text-[9px] font-black text-ink hover:text-primary transition-colors cursor-pointer uppercase tracking-[0.4em]">Privacidad</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
