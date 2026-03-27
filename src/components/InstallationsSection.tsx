import { motion } from "motion/react";
import React, { memo } from "react";
import Footer from "./shared/Footer";

function InstallationsSection() {
  return (
    <section id="installations" className="min-h-[100dvh] w-full bg-surface overflow-y-auto flex flex-col pt-24 md:pt-32 pb-16 md:pb-24">
      <div className="flex-grow flex items-center pb-20">
        <div className="max-w-full mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-6 order-2 md:order-1 relative"
          >
            {/* Creative Decorative Element */}
            <div className="absolute -left-12 -top-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
            
            <span className="text-primary tracking-[0.4em] font-black block mb-4 uppercase text-[10px]">Servicio Completo</span>
            <h2 className="font-display text-ink leading-[0.9] text-[clamp(2.5rem,10vw,4.5rem)] uppercase tracking-tighter mb-8">
              Electricista <br /> <span className="text-primary italic">a Domicilio</span>
            </h2>
            
            <p className="text-secondary text-sm md:text-lg font-medium leading-relaxed max-w-lg mb-10">
              Desde la planificación inicial hasta la certificación final, garantizamos que su infraestructura eléctrica cumpla con los estándares internacionales más exigentes.
            </p>
            
            <div className="space-y-8 pt-6 border-t border-primary/10 max-w-lg">
              {[
                { label: "Industrial", value: "Subestaciones, Motores y Automatización", code: "IND-PRJ", tags: ["Media Tensión", "Trifásicos"] },
                { label: "Residencial", value: "Redes, Iluminación y Seguridad Domiciliar", code: "RES-DOM", tags: ["Inteligente", "Certificado"] },
                { label: "Comercial", value: "Centros de Carga y UPS para Oficinas", code: "COM-STR", tags: ["Eficiencia", "Normativo"] },
                { label: "Emergencias", value: "Respuesta Inmediata 24/7 en Averías Críticas", code: "EMR-247", tags: ["Prioritario", "Seguro"] }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-start group relative">
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[7px] font-black uppercase tracking-[0.4em] text-primary bg-primary/5 px-2 py-0.5 rounded-full">{item.code}</span>
                      <div className="h-[1px] w-8 bg-primary/20 group-hover:w-12 transition-all" />
                    </div>
                    <h3 className="text-ink font-display text-xl uppercase tracking-tighter leading-none mb-2 group-hover:text-primary transition-colors">{item.label}</h3>
                    <p className="text-secondary text-[10px] md:text-xs leading-snug max-w-[280px]">{item.value}</p>
                    <div className="flex gap-2 mt-2 opacity-40 group-hover:opacity-100 transition-opacity">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-[7px] border border-ink/20 px-1.5 py-0.5 uppercase tracking-widest">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 pt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary transition-all" />
                    <div className="w-[1px] h-10 bg-gradient-to-b from-primary/20 to-transparent" />
                  </div>
                </div>
              ))}
            </div>

            {/* Floating Background Watermark */}
            <div className="absolute -right-20 -bottom-20 pointer-events-none select-none -z-10">
              <span className="font-display text-[20rem] text-primary/[0.03] leading-none uppercase italic select-none">INST</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="md:col-span-6 relative order-1 md:order-2"
          >
            {/* Technical Grid Background */}
            <div className="absolute -inset-10 opacity-[0.03] pointer-events-none -z-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />
            <div className="absolute inset-0 border border-primary/5 -m-6 pointer-events-none -z-10" />

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

