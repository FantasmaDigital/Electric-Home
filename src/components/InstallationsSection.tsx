import { motion } from "motion/react";
import React, { memo } from "react";
import Footer from "./shared/Footer";

function InstallationsSection() {
  return (
    <section id="installations" className="min-h-screen w-full bg-surface overflow-y-auto flex flex-col pt-24 md:pt-32 pb-16 md:pb-24">
      <div className="flex-grow flex items-center pb-20">
        <div className="max-w-full mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-6 order-2 md:order-1"
          >
            <span className="text-primary tracking-[0.4em] font-black block mb-4 uppercase text-[10px]">Servicio Completo</span>
            <h2 className="font-display text-ink leading-[0.9] text-[clamp(2rem,6vw,4.5rem)] uppercase tracking-tighter mb-6 md:mb-8">
              Electricista <br /> <span className="text-primary italic">a Domicilio</span>
            </h2>
            <p className="text-secondary text-sm md:text-lg font-medium leading-relaxed max-w-lg mb-8 md:mb-10">
              Brindamos servicios de iluminación, pruebas e inspección, alarmas, cajas de fusibles e instalaciones industriales, residenciales y comerciales garantizando <strong>¡Los más altos estándares!</strong>
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.dispatchEvent(new CustomEvent('openGlobalModal', {
                detail: {
                  title: "Instalaciones de Alta Complejidad",
                  subtitle: "Infraestructura Industrial",
                  description: "Nuestra división de instalaciones se encarga de la planificación y ejecución de redes eléctricas para centros de datos, industrias manufactureras y complejos comerciales. Garantizamos el cumplimiento estricto del NEC y las normativas locales de AES y SIGET, entregando planos as-built y memorias de cálculo en cada etapa.",
                  image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1200",
                  stats: [
                    { label: "Capacidad Técnica", value: "Media Tensión" },
                    { label: "Cumplimiento", value: "NEC / NFPA 70" },
                    { label: "Garantía Obra", value: "12 Meses" }
                  ]
                }
              }))}
              className="w-full sm:w-auto bg-ink text-white px-12 py-5 text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-2xl"
            >
              Detalles Técnicos
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="md:col-span-6 relative order-1 md:order-2"
          >
            <div className="relative bg-white p-2 md:p-3 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1200"
                alt="Instalación eléctrica industrial"
                className="w-full aspect-video object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute -bottom-4 md:-bottom-6 -left-4 md:-left-6 bg-ink px-4 md:px-8 py-2 md:py-4 text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-white shadow-2xl">
                ¡Los más altos estándares!
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default memo(InstallationsSection);

