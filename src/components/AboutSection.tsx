import { motion } from "motion/react";
import { Shield, Target, Award } from "lucide-react";
import React, { memo } from "react";
import Footer from "./shared/Footer";

const values = [
  {
    icon: <Shield className="w-8 h-8 text-primary" />,
    title: "Seguridad Integral",
    desc: "Nuestra prioridad absoluta es la integridad de las personas y los activos industriales en cada proyecto."
  },
  {
    icon: <Target className="w-8 h-8 text-primary" />,
    title: "Misión Técnica",
    desc: "Potenciar el crecimiento industrial a través de ingeniería de precisión y soluciones de vanguardia."
  },
  {
    icon: <Award className="w-8 h-8 text-primary" />,
    title: "Excelencia Certificada",
    desc: "Más de 20 años de trayectoria respaldan nuestra capacidad técnica y compromiso con el cliente."
  }
];

function AboutSection() {
  return (
    <section id="about" className="min-h-[100dvh] w-full bg-white overflow-y-auto flex flex-col pt-24 md:pt-32 pb-16 md:pb-24">
      <div className="flex-grow flex items-center">
        <div className="max-w-full mx-auto px-6 md:px-16 w-full">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 md:gap-20 items-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="w-full lg:col-span-7 space-y-8"
            >
              <div>
                <span className="text-primary tracking-[0.4em] font-black block mb-4 uppercase text-[10px] md:text-xs">Trayectoria y Visión</span>
                <h2 className="font-display text-ink leading-[0.85] text-[clamp(2rem,6vw,5rem)] uppercase tracking-tighter italic">
                  INGENIERÍA QUE <br /> <span className="text-primary not-italic">IMPULSA EL PROGRESO</span>
                </h2>
              </div>
              
              <div className="space-y-6 max-w-2xl">
                <p className="text-secondary text-lg md:text-2xl font-medium leading-relaxed">
                  Con más de 20 años de experiencia, <span className="text-ink font-bold border-b-2 border-primary/20">Electric Home</span> se ha consolidado como el aliado estratégico para la industria salvadoreña.
                </p>
                <p className="text-secondary text-base md:text-lg font-medium leading-relaxed">
                  Nuestra misión trasciende la simple instalación; diseñamos ecosistemas energéticos inteligentes, seguros y escalables. Nos especializamos en infraestructura crítica donde la precisión técnica no es opcional, sino el estándar mínimo.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-ink/5">
                {values.map((v, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    className="space-y-3"
                  >
                    <div className="w-10 h-10 bg-surface flex items-center justify-center rounded-sm">
                      {v.icon}
                    </div>
                    <h3 className="font-display text-base uppercase tracking-tight text-ink">{v.title}</h3>
                    <p className="text-secondary text-[11px] font-medium leading-snug">{v.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="w-full lg:col-span-5 relative group"
            >
              <div className="relative bg-white p-2 md:p-4 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-visible">
                <div className="relative overflow-hidden aspect-[4/5]">
                  <img 
                    src="img/about.jpeg" 
                    alt="Servicios de Electromecánica y Mantenimiento Industrial en El Salvador" 
                    className="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-primary/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                {/* Experience Badge - Responsive Positioning */}
                <div className="absolute -bottom-6 -right-2 md:-bottom-10 md:-right-8 bg-ink p-6 md:p-10 text-white shadow-2xl z-10 border-l-4 border-primary scale-90 sm:scale-100">
                  <div className="text-4xl md:text-6xl font-display leading-[0.8] mb-1 italic">20+</div>
                  <div className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] whitespace-nowrap opacity-60">Años de Peritaje</div>
                  <div className="h-[2px] w-full bg-primary mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                </div>
              </div>

              {/* Decorative background element */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10" />
            </motion.div>

          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default memo(AboutSection);
