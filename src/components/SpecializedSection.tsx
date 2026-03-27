import { motion } from "motion/react";
import React, { memo } from "react";
import { Cpu, Zap, Settings, ShieldCheck, ArrowRight } from "lucide-react";
import Footer from "./shared/Footer";

const features = [
  {
    icon: Cpu,
    title: "Sistemas PLC",
    description: "Programación e integración avanzada AB/Siemens.",
    stat: "100%",
    label: "Precisión"
  },
  {
    icon: Zap,
    title: "Potencia Crítica",
    description: "Redes de distribución ininterrumpible.",
    stat: "24/7",
    label: "Soporte"
  },
  {
    icon: Settings,
    title: "Automatización",
    description: "Líneas de ensamblaje robotizadas de alta eficiencia.",
    stat: "0.1s",
    label: "Latencia Mínima"
  },
  {
    icon: ShieldCheck,
    title: "Cumplimiento",
    description: "Diseño riguroso bajo normativas internacionales.",
    stat: "UL 508A",
    label: "Certificación"
  }
];

function SpecializedSection() {
  return (
    <section id="specialized" className="relative min-h-screen w-full bg-white flex flex-col pt-24 md:pt-20">
      
      {/* Subtle Warm Gradient instead of grey surface */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-white pointer-events-none" />

      <div className="flex-grow flex flex-col items-center justify-center p-6 md:p-16 relative z-10 w-full">
        <div className="max-w-[1400px] w-full h-full flex flex-col justify-center">
          
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16"
          >
            <div className="max-w-2xl">
              <span className="text-primary tracking-[0.4em] font-black block mb-4 uppercase text-[10px]">Division Técnica Avanzada</span>
              <h2 className="font-display text-ink leading-[0.9] text-[clamp(2.5rem,6vw,5rem)] uppercase tracking-tighter">
                Ingeniería <br /> <span className="text-primary italic">de Precisión</span>
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-ink text-base md:text-lg font-medium leading-relaxed mb-6">
                Desde la instalación de robótica pesada hasta la puesta en marcha de cuartos limpios, implementamos sistemas críticos donde el margen de error es cero.
              </p>
              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.dispatchEvent(new CustomEvent('openGlobalModal', {
                  detail: {
                    title: "Ingeniería Automatizada",
                    subtitle: "Sistemas Críticos",
                    description: "Nuestra especialidad radica en llevar la teoría a la práctica industrial interactuando con procesos altamente sensitivos. Diseñamos con tolerancias ultra bajas asegurando continuidad operativa inquebrantable.",
                    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800",
                    stats: [
                      { label: "Tiempo Aire", value: "99.9%" },
                      { label: "Normativa", value: "NFPA 70E" },
                      { label: "Control", value: "Escada" }
                    ]
                  }
                }))}
                className="flex items-center gap-4 text-ink font-black uppercase tracking-[0.2em] text-[10px] hover:text-primary transition-colors group"
              >
                Explorar Capacidades
                <span className="w-8 h-8 rounded-full border border-primary/30 flex items-center justify-center bg-primary/5 group-hover:bg-primary group-hover:text-white transition-colors">
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            </div>
          </motion.div>

          {/* Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full auto-rows-[250px] md:auto-rows-[300px]">
            
            {/* Image Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1 }}
              className="md:col-span-8 relative overflow-hidden bg-white/50 group rounded-sm shadow-xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=1200"
                alt="Maquinaria industrial especializada"
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute bottom-8 left-8 text-white transition-opacity duration-700 translate-y-4 group-hover:translate-y-0">
                <span className="font-display text-4xl uppercase tracking-tighter shadow-sm drop-shadow-md">Instalación Crítica</span>
                <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-primary mt-2 drop-shadow-md">Tecnología Robótica</span>
              </div>
            </motion.div>

            {/* Feature Box 1 */}
            {(() => {
              const Icon0 = features[0].icon;
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="md:col-span-4 bg-primary text-white p-8 flex flex-col justify-between group hover:shadow-2xl transition-all duration-500 rounded-sm"
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500">
                    <Icon0 strokeWidth={1.5} className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-display text-4xl text-white mb-2 tracking-tighter">{features[0].stat}</span>
                    <h3 className="text-white/90 font-black text-[10px] uppercase tracking-[0.2em] mb-4">{features[0].title}</h3>
                    <p className="text-white/80 text-sm font-medium">{features[0].description}</p>
                  </div>
                </motion.div>
              );
            })()}

            {/* Feature Boxes 2, 3, 4 */}
            {features.slice(1).map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 + (idx * 0.1) }}
                className="md:col-span-4 bg-white border border-primary/10 p-8 flex flex-col justify-between group hover:shadow-xl transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 rounded-sm"
              >
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                    <feature.icon strokeWidth={1.5} className="w-4 h-4" />
                  </div>
                  <div className="text-right">
                    <span className="font-display text-2xl text-ink tracking-tighter">{feature.stat}</span>
                    <span className="block text-[8px] font-black uppercase tracking-[0.2em] text-primary">{feature.label}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-ink font-display text-xl uppercase tracking-tighter mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-ink/70 text-xs font-medium leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}

          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}

export default memo(SpecializedSection);

