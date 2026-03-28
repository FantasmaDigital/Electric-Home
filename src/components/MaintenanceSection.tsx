import { motion, AnimatePresence, MotionValue, useMotionValue, useTransform, useSpring } from "motion/react";
import { Zap, Activity, BarChart3, ShieldCheck, Settings, AlertTriangle, Clock, FastForward } from "lucide-react";
import React, { useState, useRef, memo } from "react";
import Footer from "./shared/Footer";

interface MaintenanceSectionProps {
  x: MotionValue<number>;
}

const features = [
  {
    icon: <Activity className="w-8 h-8 text-primary" />,
    title: "Motores Eléctricos",
    desc: "Cuidamos sus motores con mantenimiento para que siempre funcionen con fuerza y sin ruidos.",
    category: "Cuidado"
  },
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "Plantas Eléctricas",
    desc: "Mantenemos sus plantas listas para que nunca se quede sin luz cuando más la necesita.",
    category: "Cuidado"
  },
  {
    icon: <AlertTriangle className="w-8 h-8 text-amber-700/80" />,
    title: "Reparación Urgente",
    desc: "Reparamos sus equipos cuando fallan para que su trabajo vuelva a la normalidad lo antes posible.",
    category: "Reparación"
  },
  {
    icon: <Settings className="w-8 h-8 text-primary" />,
    title: "Tableros Eléctricos",
    desc: "Limpiamos y revisamos sus tableros para evitar calentamientos y fallas peligrosas.",
    category: "Cuidado"
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "Protección de Equipos",
    desc: "Protegemos su maquinaria contra rayos y variaciones fuertes de voltaje.",
    category: "Cuidado"
  },
  {
    icon: <FastForward className="w-8 h-8 text-primary" />,
    title: "Cambio de Piezas",
    desc: "Cambiamos cables o piezas dañadas para que todo su sistema sea seguro otra vez.",
    category: "Reparación"
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-primary" />,
    title: "Ahorro de Energía",
    desc: "Revisamos su consumo de luz para proponerle formas de ahorrar dinero cada mes.",
    category: "Cuidado"
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
        borderColor: hoveredIndex === i ? (f.category === 'Reparación' ? "rgba(185, 28, 28, 0.3)" : "var(--color-primary)") : "rgba(0, 0, 0, 0.05)",
        backgroundColor: hoveredIndex === i ? (f.category === 'Reparación' ? "rgba(185, 28, 28, 0.01)" : "rgba(var(--primary-rgb), 0.02)") : "white"
      }}
      style={{ perspective: 1000, rotateX, rotateY }}
      className={`p-6 md:p-8 border transition-all cursor-default relative overflow-visible shadow-sm hover:shadow-xl rounded-sm ${f.category === 'Reparación' ? 'border-amber-100/50' : 'bg-white'}`}
    >
      <div className="relative z-10 text-left">
        <div className="flex justify-between items-start mb-4">
          <motion.div style={{ x: iconX, y: iconY, scale: hoveredIndex === i ? 1.1 : 1 }} className="flex justify-center">
            {f.icon}
          </motion.div>
          <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${f.category === 'Reparación' ? 'bg-amber-50 text-amber-700/80' : 'bg-primary/10 text-primary'}`}>
            {f.category}
          </span>
        </div>
        <h3 className="font-display text-ink uppercase text-lg md:text-xl mb-2 tracking-tighter leading-none">{f.title}</h3>
        <p className="text-secondary text-[10px] md:text-xs font-medium leading-relaxed">{f.desc}</p>
      </div>
    </motion.div>
  );
}

const FeatureCardMemo = memo(FeatureCard);

function MaintenanceSection({ x }: MaintenanceSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="maintenance" className="min-h-[100dvh] w-full bg-surface relative overflow-y-auto flex flex-col pt-24 md:pt-32 pb-16 md:pb-24">
      <div className="flex-grow flex items-center">
        <div className="max-w-full mx-auto px-6 md:px-16 text-center w-full">
          
          <div className="max-w-4xl mx-auto mb-16 md:mb-20">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-primary tracking-[0.4em] font-black block mb-6 md:mb-8 uppercase text-[10px] md:text-xs"
            >
              Cuidamos su Energía
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[clamp(2rem,6vw,5rem)] font-display text-ink uppercase leading-[0.82] tracking-tighter mb-8"
            >
              Su Energía <br /> <span className="text-primary italic">No se Detiene</span>
            </motion.h2>
            
            <p className="text-secondary text-sm md:text-base font-medium max-w-2xl mx-auto">
              Cuidamos sus equipos para que duren más y reparamos fallas rápido para que usted no pierda tiempo ni dinero.
            </p>
          </div>

          {/* Emergency / Express Module */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-16 max-w-5xl mx-auto relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-amber-200/20 to-primary/20 rounded-sm blur-sm opacity-50 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative bg-white border border-ink/5 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl overflow-hidden rounded-sm">
              <div className="absolute top-0 right-0 p-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-[8px] font-black uppercase text-primary tracking-widest opacity-60">Apoyo Inmediato</span>
                </div>
              </div>

              <div className="flex-1 text-left space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-ink text-primary flex items-center justify-center rounded-sm">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-2xl md:text-4xl uppercase tracking-tighter leading-none">
                    Atención <span className="text-primary italic">Inmediata</span>
                  </h3>
                </div>
                <p className="text-secondary text-xs md:text-sm font-medium max-w-xl">
                  Estamos listos para salir ya. <span className="text-ink font-bold border-b border-primary/30">Si tiene una falla técnica urgente</span>, enviamos a nuestro equipo de inmediato para ayudarle sin perder tiempo en trámites.
                </p>
              </div>

              <div className="flex flex-col gap-3 w-full md:w-auto">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('navJump', { detail: { index: 6, priority: 'critica' } }))}
                  className="w-full bg-ink text-white px-10 py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary transition-all shadow-xl active:scale-95"
                >
                  Activar Respuesta
                </button>
                <button
                  onClick={() => {
                    const phone = import.meta.env.VITE_PHONE_NUMBER.replace(/\s+/g, '').replace(/-/g, '');
                    const text = "¡Hola Electric Home! Tengo una *EMERGENCIA ELÉCTRICA* que requiere *ATENCIÓN INMEDIATA*. Por favor, contáctenme prioritariamente.";
                    window.open(`https://wa.me/503${phone}?text=${text}`, '_blank');
                  }}
                  className="w-full bg-green-600 text-white px-10 py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-green-700 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp SOS
                </button>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-24">
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
              onClick={() => window.dispatchEvent(new CustomEvent('navJump', { detail: { index: 6 } }))}
              className="w-full sm:w-auto bg-primary text-white px-12 md:px-20 py-5 md:py-6 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] transition-all shadow-2xl shadow-primary/30 mb-20"
            >
              Consultar Plan de Mantenimiento
            </motion.button>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default memo(MaintenanceSection);
