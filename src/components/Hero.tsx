import { motion } from "motion/react";
import React, { memo } from "react";

function Hero() {
  return (
    <section id="experience" className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-ink">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          whileHover={{ scale: 1.05, opacity: 0.3 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="w-full h-full cursor-pointer"
        >
          <img
            src="https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=1920"
            alt="Especialistas en Proyectos de Ingeniería y Mantenimiento Eléctrico en El Salvador"
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-transparent to-ink/80" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-full w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-4 md:mb-8"
        >
          <span className="text-primary tracking-[0.6em] md:tracking-[0.8em] font-black uppercase text-[8px] md:text-xs">
            Ingeniería Eléctrica Industrial
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-white tracking-tighter leading-[0.9] uppercase text-[clamp(2.5rem,10vw,5.5rem)]"
        >
          POTENCIA <br />
          <span className="text-primary italic">GARANTIZADA</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-8 md:mt-12 max-w-2xl mx-auto"
        >
          <p className="text-white font-medium tracking-tight text-base md:text-xl leading-relaxed px-4">
            Instalaciones, mantenimiento y automatización eléctrica industrial. Soluciones confiables para empresas y oficinas que exigen el más alto estándar.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-10 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8"
        >
          <button className="group relative bg-primary text-white w-full sm:w-auto px-12 md:px-16 py-5 md:py-6 text-[10px] font-black uppercase tracking-[0.3em] overflow-hidden transition-all hover:scale-105 active:scale-95">
            <span className="relative z-10">Solicitar Servicio</span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>

          <button
            onClick={() => window.dispatchEvent(new CustomEvent('openGlobalModal', {
              detail: {
                title: "Potencia Garantizada",
                subtitle: "Ingeniería Eléctrica Industrial",
                description: "Somos especialistas en instalaciones eléctricas industriales y comerciales. Desde la gestión de nuevas conexiones, hasta la instalación de maquinaria industrial, mantenimiento de motores y generadores, y sistemas de protección de voltaje. Contamos con técnicos certificados y años de experiencia en el sector.",
                image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1920",
                stats: [
                  { label: "Años de experiencia", value: "20+" },
                  { label: "Proyectos completados", value: "500+" },
                  { label: "Tiempo de respuesta", value: "24h" }
                ]
              }
            }))}
            className="flex items-center gap-4 text-white hover:text-primary transition-all text-[10px] font-black uppercase tracking-[0.3em] group"
          >
            <div className="hidden sm:block w-12 h-[1px] bg-white group-hover:bg-primary group-hover:w-16 transition-all" />
            Ver más
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(Hero);
