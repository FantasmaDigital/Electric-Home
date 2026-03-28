import { motion, AnimatePresence } from "motion/react";
import { Shield, Target, Award, ChevronRight } from "lucide-react";
import React, { useState, memo } from "react";
import Footer from "./shared/Footer";

const values = [
  {
    icon: <Shield className="w-8 h-8 text-primary" />,
    title: "Cuidamos su Seguridad",
    desc: "Cuidamos la vida de las personas y la seguridad de sus equipos en cada trabajo que realizamos."
  },
  {
    icon: <Target className="w-8 h-8 text-primary" />,
    title: "Su Socio Estratégico",
    desc: "Impulsamos la eficiencia de su hogar o empresa con soluciones eléctricas modernas y confiables."
  },
  {
    icon: <Award className="w-8 h-8 text-primary" />,
    title: "Experiencia que Cuenta",
    desc: "Nuestros más de 20 años de experiencia aseguran que su proyecto esté en las mejores manos."
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
                  Con más de 20 años de experiencia, <span className="text-ink font-bold border-b-2 border-primary/20">Electric Home</span> se ha consolidado como el aliado estratégico para hogares e industrias en El Salvador.
                </p>
                <p className="text-secondary text-base md:text-lg font-medium leading-relaxed">
                  Nuestra misión va más allá de instalar cables; se trata de crear entornos seguros y eficientes que protejan lo que más importa. Nos enfocamos en proyectos donde la seguridad y la tecnología son clave para que su energía nunca le falle.
                </p>
              </div>

              {/* Vision Statement Block (Simplified to User Reference) */}
              <div className="relative pt-6 pb-2">
                <div className="relative bg-ink/5 p-8 md:p-12 group overflow-visible">
                  {/* Decorative Industrial Corners from Image */}
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-ink rounded-tl-xl rounded-br-sm" />
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-ink rounded-br-xl rounded-tl-sm" />
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary block mb-6">Nuestra Visión</span>
                    <p className="text-ink text-lg md:text-2xl font-bold leading-tight tracking-tighter uppercase font-display italic">
                      "Ser líderes en soluciones energéticas inteligentes en la región, reconocidos por nuestra excelencia técnica, innovación constante y compromiso con la seguridad y la sostenibilidad."
                    </p>
                  </motion.div>
                </div>
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
                  <div className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] whitespace-nowrap opacity-60">Años de Experiencia</div>
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
