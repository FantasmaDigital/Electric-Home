import { motion } from "motion/react";
import React, { memo } from "react";
import Footer from "./shared/Footer";
import { Zap, Settings, ShieldCheck, Activity, ArrowRight, Clock, FileText, Briefcase, Home, Factory, Building2 } from "lucide-react";

const features = [
  {
    id: "mantenimiento",
    icon: Activity,
    title: "Mantenimiento Preventivo",
    description: "Cuidamos su red eléctrica con revisiones constantes para evitar fallas y que su propiedad siempre sea segura.",
    stat: "Atención",
    label: "Preventivo"
  },
  {
    id: "emergencia",
    icon: Settings,
    title: "Mantenimiento Correctivo",
    description: "Le ayudamos con las reparaciones más difíciles para que sus equipos vuelvan a funcionar rápido.",
    stat: "Especial",
    label: "Correctivo"
  },
  {
    id: "instalacion",
    icon: Zap,
    title: "Nuevas Instalaciones",
    description: "Diseñamos y montamos la red eléctrica de su proyecto con seguridad y materiales de calidad.",
    stat: "Completo",
    label: "Garantizado"
  },
  {
    id: "residencial",
    icon: Home,
    title: "Residencias y Hogares",
    description: "Instalaciones y reparaciones seguras para que su hogar siempre tenga energía confiable.",
    stat: "Hogar",
    label: "Seguro"
  },
  {
    id: "industrial",
    icon: Factory,
    title: "Industrias y Fábricas",
    description: "Soluciones de alta potencia para maquinaria pesada y continuidad de producción.",
    stat: "Poder",
    label: "Industrial"
  },
  {
    id: "comercial",
    icon: Building2,
    title: "Oficinas y Comercios",
    description: "Iluminación y redes eléctricas eficientes para que su negocio nunca se detenga.",
    stat: "Negocio",
    label: "Continuo"
  },
  {
    id: "motores",
    icon: Settings,
    title: "Motores y Maquinaria",
    description: "Mantenimiento especializado de motores eléctricos y sistemas de automatización.",
    stat: "Fuerza",
    label: "Maquinaria"
  },
  {
    id: "plantas",
    icon: Zap,
    title: "Plantas Eléctricas",
    description: "Instalación y soporte de generadores para que su respaldo siempre esté listo.",
    stat: "Respaldo",
    label: "Energía"
  },
  {
    id: "consultoria",
    icon: FileText,
    title: "Ahorro de Energía",
    description: "Analizamos su consumo de luz para ayudarle a ahorrar dinero y mejorar su eficiencia.",
    stat: "Eficiente",
    label: "Ahorro"
  },
  {
    id: "emergencia_expres",
    icon: Clock,
    title: "Atención Inmediata",
    description: "Llegamos en minutos para solucionar sus emergencias eléctricas más urgentes.",
    stat: "Rápido",
    label: "Prioridad",
    urgent: true
  }
];

function SpecializedSection() {
  const handleJump = (serviceId: string) => {
    window.dispatchEvent(new CustomEvent('navJump', { 
      detail: { 
        index: 6, 
        priority: serviceId === 'emergencia_expres' ? 'critica' : 'normal',
        serviceType: serviceId
      } 
    }));
  };

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
              <span className="text-primary tracking-[0.4em] font-black block mb-4 uppercase text-[10px]">Lo que hacemos</span>
              <h2 className="font-display text-ink leading-[0.9] text-[clamp(2rem,5vw,4rem)] uppercase tracking-tighter">
                Nuestros <br /> <span className="text-primary italic">Servicios para Usted</span>
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-ink text-sm md:text-base font-medium leading-relaxed mb-6">
                Desde mantenimientos preventivos hasta grandes instalaciones industriales, reunimos toda nuestra experiencia técnica para cuidar su energía.
              </p>
            </div>
          </motion.div>

          {/* Grid Section - Now uniform for all services */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
            
            {/* Service Cards */}
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: (idx % 3) * 0.1 }}
                onClick={() => handleJump(feature.id)}
                className={`cursor-pointer p-8 flex flex-col justify-between group transition-all duration-500 rounded-sm overflow-hidden relative min-h-[250px] ${
                  feature.urgent 
                    ? 'bg-ink text-white shadow-2xl border-l-4 border-primary' 
                    : 'bg-white border border-primary/10 hover:shadow-xl hover:border-primary/40'
                }`}
              >
                {feature.urgent && (
                  <div className="absolute -right-4 -top-4 opacity-[0.05] group-hover:opacity-[0.08] transition-opacity">
                    <Icon className="w-32 h-32" />
                  </div>
                )}
                
                <div className="flex justify-between items-start relative z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${
                    feature.urgent ? 'bg-primary text-white' : 'bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white'
                  }`}>
                    <Icon strokeWidth={1.5} className="w-4 h-4" />
                  </div>
                  <div className="text-right">
                    <span className={`font-display text-2xl tracking-tighter ${feature.urgent ? 'text-white' : 'text-ink'}`}>{feature.stat}</span>
                    <span className={`block text-[8px] font-black uppercase tracking-[0.2em] ${feature.urgent ? 'text-primary' : 'text-primary'}`}>{feature.label}</span>
                  </div>
                </div>

                <div className="relative z-10 mt-6">
                  <h3 className={`font-display text-xl uppercase tracking-tighter mb-2 transition-colors ${
                    feature.urgent ? 'text-white' : 'text-ink group-hover:text-primary'
                  }`}>{feature.title}</h3>
                  <p className={`text-xs font-medium leading-relaxed ${
                    feature.urgent ? 'text-white/70' : 'text-ink/70'
                  }`}>{feature.description}</p>
                </div>

                <div className={`mt-4 flex items-center gap-2 text-[8px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all ${
                  feature.urgent ? 'text-primary' : 'text-ink'
                }`}>
                  Solicitar Ahora <ArrowRight className="w-2 h-2" />
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


