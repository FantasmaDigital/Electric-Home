"use client";

import { motion } from "motion/react";
import React, { memo } from "react";
import Footer from "./shared/Footer";
import { ShieldCheck, Zap, Building2, Home, AlertCircle } from "lucide-react";

const installations = [
  { 
    id: "01",
    label: "Residencial", 
    value: "Instalaciones eléctricas seguras y modernas para su hogar.", 
    icon: <Home className="w-5 h-5" />,
    size: "lg:col-span-3 lg:row-span-1"
  },
  { 
    id: "02",
    label: "Industrial", 
    value: "Sistemas de fuerza y alta tensión para fábricas y procesos continuos.", 
    icon: <Zap className="w-5 h-5" />,
    size: "lg:col-span-3 lg:row-span-1"
  },
  { 
    id: "03",
    label: "Comercial", 
    value: "Energía estable y eficiente para oficinas y locales comerciales.", 
    icon: <Building2 className="w-5 h-5" />,
    size: "lg:col-span-3 lg:row-span-1"
  },
  { 
    id: "04",
    label: "Emergencias", 
    value: "Atención inmediata para fallas críticas las 24 horas del día.", 
    icon: <AlertCircle className="w-5 h-5" />,
    size: "lg:col-span-3 lg:row-span-1"
  }
];

function InstallationsSection() {
  return (
    <section id="installations" className="min-h-screen w-full bg-white flex flex-col pt-24 md:pt-32">
      
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="w-full lg:w-[80%] mx-auto px-6 md:px-16 pb-20">
          
          {/* Header Title Layer */}
          <div className="mb-12">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-primary tracking-[0.4em] font-black block mb-4 uppercase text-[10px]"
            >
              Nuestra Especialidad
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-ink leading-[1] text-[clamp(2.5rem,7vw,4.5rem)] uppercase tracking-tighter"
            >
              Ingeniería en <span className="text-primary italic">Instalaciones</span>
            </motion.h2>
          </div>

          {/* Bento Grid Structure */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 auto-rows-[200px] md:auto-rows-[240px] gap-4 md:gap-6">
            
            {/* 1. Large Hero Visual Cell */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-8 lg:row-span-2 relative group overflow-hidden bg-surface rounded-sm shadow-xl"
            >
              <img
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1600"
                alt="Instalaciones eléctricas industriales"
                className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-8 left-8">
                <div className="bg-primary px-6 py-3 shadow-2xl">
                    <span className="block text-white font-display text-2xl uppercase italic">Excelencia Técnica</span>
                    <span className="block text-ink font-black text-[8px] uppercase tracking-widest mt-1">Soporte Certificado 24/7</span>
                </div>
              </div>
            </motion.div>

            {/* 2. Intro Description Cell */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-4 lg:row-span-1 bg-surface p-8 md:p-10 flex flex-col justify-center rounded-sm border border-ink/5"
            >
              <h3 className="text-ink font-display text-2xl uppercase tracking-tighter leading-tight mb-4">
                Seguridad que <br /><span className="text-primary">Perdura</span>
              </h3>
              <p className="text-secondary text-xs md:text-sm font-medium leading-relaxed">
                Cada conexión es vital. Aplicamos estándares de ingeniería de alto nivel para asegurar que su energía nunca se detenga.
              </p>
            </motion.div>

            {/* 3. Small Info/Badge Cell */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-4 lg:row-span-1 bg-ink p-8 md:p-10 flex flex-col justify-center rounded-sm text-white"
            >
              <ShieldCheck className="w-10 h-10 text-primary mb-4" />
              <span className="text-primary font-black uppercase text-[10px] tracking-widest block mb-2">Certificación</span>
              <p className="text-xs font-bold opacity-80 uppercase leading-snug">
                Más de 20 años cumpliendo normas de seguridad eléctrica.
              </p>
            </motion.div>

            {/* 4. Service Category Cells (01-04) */}
            {installations.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                className={`${item.size} bg-white border border-ink/5 p-8 flex flex-col justify-between hover:border-primary transition-all duration-500 group rounded-sm shadow-sm hover:shadow-2xl overflow-hidden`}
              >
                <div className="flex justify-between items-start">
                  <span className="font-display text-4xl text-secondary/10 group-hover:text-primary/20 transition-colors">
                    {item.id}
                  </span>
                  <div className="text-secondary group-hover:text-primary transition-colors">
                    {item.icon}
                  </div>
                </div>
                <div>
                  <h4 className="text-ink font-display text-xl uppercase tracking-tight group-hover:text-primary transition-colors mb-2">
                    {item.label}
                  </h4>
                  <p className="text-secondary text-[11px] font-medium leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">
                    {item.value}
                  </p>
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

export default memo(InstallationsSection);
