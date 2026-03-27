import { motion } from "motion/react";
import React, { memo } from "react";
import Footer from "./shared/Footer";
import { Zap, Settings, ShieldCheck, Activity, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instalaciones",
    description: "Instalaciones residenciales, industriales y comerciales.",
    stat: "Integral",
    label: "Cobertura"
  },
  {
    icon: Settings,
    title: "Mantenimiento",
    description: "Mantenimiento a instalaciones eléctricas de todo tipo.",
    stat: "24/7",
    label: "Disponibilidad"
  },
  {
    icon: ShieldCheck,
    title: "Fugas Eléctricas",
    description: "Detección y reparación de fugas eléctricas.",
    stat: "Eficaz",
    label: "Seguridad"
  },
  {
    icon: Activity,
    title: "Preventivo",
    description: "Mantenimiento preventivo para evitar futuras averías.",
    stat: "Óptimo",
    label: "Protección"
  }
];

function SpecializedSection() {
  return (
    <section id="specialized" className="relative min-h-[100dvh] w-full bg-white flex flex-col pt-24 md:pt-32 pb-16 md:pb-24">
      
      {/* Subtle Warm Gradient instead of grey surface */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-white pointer-events-none" />

      <div className="flex-grow flex flex-col items-center justify-center px-6 md:px-16 relative z-10 w-full">
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
              <span className="text-primary tracking-[0.4em] font-black block mb-4 uppercase text-[10px]">Especialidades</span>
              <h2 className="font-display text-ink leading-[0.9] text-[clamp(2rem,5vw,4rem)] uppercase tracking-tighter">
                Nuestros <br /> <span className="text-primary italic">Servicios</span>
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-ink text-base md:text-lg font-medium leading-relaxed mb-6">
                Brindamos soluciones integrales que garantizan seguridad y eficiencia para su hogar, comercio o industria, adaptándonos a cualquier escala de proyecto.
              </p>
              {/* <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.dispatchEvent(new CustomEvent('openGlobalModal', {
                  detail: {
                    title: "Servicios Integrales",
                    subtitle: "Cobertura Total",
                    description: "Nuestro equipo se encarga de que su infraestructura eléctrica funcione a la perfección, desde instalaciones residenciales y comerciales hasta mantenimientos preventivos y detección de fugas.",
                    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800",
                    stats: [
                      { label: "Áreas", value: "Industrial" },
                      { label: "Soporte", value: "Residencial" },
                      { label: "Alcance", value: "Comercial" }
                    ]
                  }
                }))}
                className="flex items-center gap-4 text-ink font-black uppercase tracking-[0.2em] text-[10px] hover:text-primary transition-colors group"
              >
                Explorar Capacidades
                <span className="w-8 h-8 rounded-full border border-primary/30 flex items-center justify-center bg-primary/5 group-hover:bg-primary group-hover:text-white transition-colors">
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button> */}
            </div>
          </motion.div>

          {/* Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full auto-rows-[200px] sm:auto-rows-[250px] md:auto-rows-[300px]">
            
            {/* Image Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1 }}
              className="md:col-span-8 relative overflow-hidden bg-white/50 group rounded-sm shadow-xl"
            >
              <img 
                src="img/services/4.png"
                alt="Nuestra experiencia y proyectos"
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute bottom-8 left-8 text-white transition-opacity duration-700 translate-y-4 group-hover:translate-y-0">
                <span className="font-display text-4xl uppercase tracking-tighter shadow-sm drop-shadow-md">Soluciones Integrales</span>
                <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-primary mt-2 drop-shadow-md">Garantía y Seguridad</span>
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
                  onClick={() => window.dispatchEvent(new CustomEvent('navJump', { detail: { index: 3 } }))}
                  className="md:col-span-4 cursor-pointer bg-primary text-white p-8 flex flex-col justify-between group hover:shadow-2xl transition-all duration-500 rounded-sm"
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
            {features.slice(1).map((feature, idx) => {
              const modalDetails = [
                {
                  desc: "Garantizamos el óptimo funcionamiento de su infraestructura eléctrica mediante servicios de mantenimiento correctivo y periódico. Atendemos emergencias y mantenemos sus sistemas operacionales las 24 horas del día.",
                  img: "img/services/1.png",
                  stats: [{label: "Disponibilidad", value: "24/7"}, {label: "Tiempos", value: "Inmediatos"}, {label: "Personal", value: "Certificado"}]
                },
                {
                  desc: "Identificamos y solucionamos problemas de fugas eléctricas que encarecen su recibo y ponen en riesgo su propiedad. Utilizamos equipo de medición especializado para un diagnóstico exacto y una reparación definitiva.",
                  img: "img/services/2.png",
                  stats: [{label: "Ahorro", value: "Garantizado"}, {label: "Diagnóstico", value: "Preciso"}, {label: "Seguridad", value: "Total"}]
                },
                {
                  desc: "Prevenir es más rentable que corregir. Nuestro servicio de mantenimiento preventivo evalúa la salud técnica de sus paneles, cableado y maquinarias para extender su vida útil y evitar paros inesperados.",
                  img: "img/services/3.jpg",
                  stats: [{label: "Planificación", value: "Estratégica"}, {label: "Riesgos", value: "Mitigados"}, {label: "Vida Útil", value: "Extendida"}]
                }
              ];
              const detail = modalDetails[idx];

              return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 + (idx * 0.1) }}
                onClick={() => {
                  if (feature.title === "Mantenimiento") {
                    window.dispatchEvent(new CustomEvent('navJump', { detail: { index: 4 } }));
                  } else {
                    window.dispatchEvent(new CustomEvent('openGlobalModal', {
                      detail: {
                        title: feature.title,
                        subtitle: feature.label,
                        description: detail.desc,
                        image: detail.img,
                        stats: detail.stats
                      }
                    }));
                  }
                }}
                className="md:col-span-4 cursor-pointer bg-white border border-primary/10 p-8 flex flex-col justify-between group hover:shadow-xl transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 rounded-sm"
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
            )})}

          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}

export default memo(SpecializedSection);

