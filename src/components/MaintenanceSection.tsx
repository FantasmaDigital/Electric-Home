import { motion, AnimatePresence, MotionValue, useMotionValue, useTransform, useSpring } from "motion/react";
import { Zap, Activity, BarChart3, ShieldCheck, Settings } from "lucide-react";
import React, { useState, useRef, memo } from "react";
import Footer from "./shared/Footer";

interface MaintenanceSectionProps {
  x: MotionValue<number>;
}

const features = [
  {
    icon: <Activity className="w-8 h-8 text-primary" />,
    title: "Motores",
    desc: "Bobinado, balanceo y mantenimiento preventivo de motores de corriente alterna y continua."
  },
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "Generadores",
    desc: "Servicio especializado para plantas de emergencia y sistemas de respaldo crítico."
  },
  {
    icon: <Settings className="w-8 h-8 text-primary" />,
    title: "Tableros",
    desc: "Limpieza técnica, reapriete de conexiones y termografía infrarroja para detección de fallas."
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "Protecciones",
    desc: "Instalación de supresores de transientes y sistemas de regulación de voltaje industrial."
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-primary" />,
    title: "Auditorías",
    desc: "Análisis de calidad de energía y eficiencia para optimización del consumo eléctrico."
  }
];

function FeatureCard({ f, i, hoveredIndex, setHoveredIndex }: any) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });
  const iconX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });
  const iconY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    mouseX.set((e.clientX - rect.left) / width - 0.5);
    mouseY.set((e.clientY - rect.top) / height - 0.5);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHoveredIndex(i)}
      onMouseLeave={handleMouseLeave}
      animate={{
        borderColor: hoveredIndex === i ? "var(--color-primary)" : "rgba(0, 0, 0, 0.05)"
      }}
      style={{ perspective: 1000, rotateX, rotateY }}
      className="p-6 md:p-10 bg-white border transition-all cursor-default relative overflow-visible shadow-sm hover:shadow-xl"
    >
      <motion.div
        animate={{ opacity: hoveredIndex === i ? 0.03 : 0 }}
        className="absolute inset-0 bg-primary pointer-events-none"
      />
      <div className="relative z-10">
        <motion.div style={{ x: iconX, y: iconY, scale: hoveredIndex === i ? 1.1 : 1 }} className="mb-4 md:mb-6 flex justify-center">
          {f.icon}
        </motion.div>
        <h3 className="font-display text-ink uppercase text-xl md:text-2xl mb-2 md:mb-3 tracking-tighter leading-none">{f.title}</h3>
        <p className="text-secondary text-[10px] md:text-xs font-medium leading-relaxed">{f.desc}</p>
      </div>
    </motion.div>
  );
}

const FeatureCardMemo = memo(FeatureCard);

function MaintenanceSection({ x }: MaintenanceSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="maintenance" className="min-h-screen w-full bg-surface relative overflow-y-auto flex flex-col pt-24 md:pt-32 pb-16 md:pb-24">
      <div className="flex-grow flex items-center">
        <div className="max-w-full mx-auto px-6 md:px-16 text-center w-full">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary tracking-[0.4em] font-black block mb-6 md:mb-8 uppercase text-[10px] md:text-xs"
          >
            Continuidad Operativa
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[clamp(2rem,6vw,5rem)] font-display text-ink uppercase leading-[0.82] tracking-tighter mb-12 md:mb-20"
          >
            Mantenimiento <br /> <span className="text-primary italic">Correctivo & Preventivo</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 mb-16 md:mb-24">
            {features.map((f, i) => (
              <FeatureCardMemo
                key={f.title}
                f={f}
                i={i}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
              />
            ))}
          </div>

          <div className="flex flex-col items-center gap-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.dispatchEvent(new CustomEvent('openGlobalModal', {
                detail: {
                  title: "Planes de Mantenimiento",
                  subtitle: "Soporte Técnico 24/7",
                  description: "Ofrecemos contratos de mantenimiento personalizados diseñados para minimizar el tiempo de inactividad. Incluimos visitas mensuales, informes técnicos de condición, atención de emergencias prioritarias y asesoría en la gestión de repuestos críticos para su planta de producción.",
                  image: "https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?auto=format&fit=crop&q=80&w=1200",
                  stats: [
                    { label: "Tiempo de Respuesta", value: "< 4 Horas" },
                    { label: "Técnicos Certificados", value: "100%" },
                    { label: "Planes", value: "Desde $199/mes" }
                  ]
                }
              }))}
              className="w-full sm:w-auto bg-primary text-white px-12 md:px-20 py-5 md:py-6 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] transition-all shadow-2xl shadow-primary/30 mb-20"
            >
              Ver Planes de Servicio
            </motion.button>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default memo(MaintenanceSection);
