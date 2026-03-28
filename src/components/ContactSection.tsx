import { motion, AnimatePresence } from "motion/react";
import React, { useState, useEffect, useRef, memo } from "react";
import { Mail, Phone, MapPin, FileText, CheckCircle, AlertCircle, Clock, ChevronDown } from "lucide-react";
import Footer from "./shared/Footer";

const serviceOptions = [
  { id: "mantenimiento", label: "Mantenimiento Preventivo", category: "Mantenimiento" },
  { id: "emergencia", label: "Mantenimiento Correctivo", category: "Mantenimiento" },
  { id: "instalacion", label: "Nuevas Instalaciones", category: "Instalaciones" },
  { id: "residencial", label: "Residencias y Hogares", category: "Zonas de Atención" },
  { id: "industrial", label: "Industrias y Fábricas", category: "Zonas de Atención" },
  { id: "comercial", label: "Oficinas y Comercios", category: "Zonas de Atención" },
  { id: "motores", label: "Motores y Maquinaria", category: "Especialidades" },
  { id: "plantas", label: "Plantas Eléctricas", category: "Especialidades" },
  { id: "consultoria", label: "Ahorro de Energía", category: "Especialidades" },
  { id: "emergencia_expres", label: "Atención Inmediata (SOS)", category: "Urgente", urgent: true }
];

function CustomDropdown({ value, onChange, urgentMode }: { value: string, onChange: (val: string) => void, urgentMode: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = serviceOptions.find(o => o.id === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full border-b py-3 flex items-center justify-between cursor-pointer transition-all ${urgentMode ? 'border-primary text-primary font-bold' : 'border-ink/10 text-ink focus:border-primary'
          }`}
      >
        <span className="text-sm font-medium">{selectedOption?.label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-[100] left-0 right-0 mt-2 bg-white border border-ink/5 shadow-2xl rounded-sm overflow-hidden"
          >
            <div className="max-h-64 overflow-y-auto custom-scrollbar">
              {Array.from(new Set(serviceOptions.map(o => o.category))).map((category) => (
                <div key={category}>
                  <div className="px-6 py-2 bg-surface text-[8px] font-black uppercase tracking-widest text-primary/60 border-b border-ink/5">
                    {category}
                  </div>
                  {serviceOptions.filter(o => o.category === category).map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => {
                        onChange(opt.id);
                        setIsOpen(false);
                      }}
                      className={`px-6 py-4 text-xs font-medium cursor-pointer transition-colors border-b border-ink/[0.03] last:border-0 ${value === opt.id
                        ? (opt.urgent ? 'bg-primary/5 text-primary font-bold' : 'bg-surface text-ink font-bold')
                        : 'text-secondary hover:bg-surface hover:text-ink'
                        } ${opt.urgent ? 'text-primary' : ''}`}
                    >
                      {opt.label}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    serviceType: "mantenimiento",
    priority: "normal",
    location: "",
    budget: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Listen for automated jumps from the Emergency Module
  useEffect(() => {
    const handleNavJump = (e: any) => {
      if (e.detail.index === 6) { // Contact Section Index
        setFormState(prev => ({
          ...prev,
          priority: e.detail.priority || (e.detail.serviceType === 'emergencia_expres' ? 'crítica' : prev.priority),
          serviceType: e.detail.serviceType || (e.detail.priority === 'critica' ? 'emergencia_expres' : prev.serviceType),
        }));
      }
    };

    window.addEventListener("navJump", handleNavJump);
    return () => window.removeEventListener("navJump", handleNavJump);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (formRef.current && !formRef.current.reportValidity()) {
      return;
    }
    const phone = import.meta.env.VITE_PHONE_NUMBER.replace(/\D/g, '');
    const serviceName = serviceOptions.find(o => o.id === formState.serviceType)?.label || formState.serviceType;
    
    const text = `*Consulta de Servicio - Electric Home*%0A%0A` +
      `*Nombre:* ${formState.name}%0A` +
      `*Empresa/Hogar:* ${formState.company || 'N/A'}%0A` +
      `*Ubicación:* ${formState.location}%0A` +
      `*Servicio:* ${serviceName}%0A` +
      `*Prioridad:* ${formState.priority.toUpperCase()}%0A` +
      `*Mensaje:* ${formState.message}`;

    window.open(`https://wa.me/503${phone}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="relative min-h-screen w-full bg-white flex flex-col overflow-y-auto pt-24 md:pt-32 pb-16 md:pb-24">
      <div className="flex-grow flex flex-col items-center justify-center px-6 md:px-20">

        {/* Subtle Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(#050505 0.5px, transparent 0.5px)", backgroundSize: "32px 32px" }}
        />

        <div className="max-w-[1200px] w-full flex flex-col gap-12 md:gap-20 relative z-10">

          {/* --- Header Section --- */}
          <div className="flex flex-col items-center text-center space-y-4">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-primary font-black uppercase tracking-[0.4em] text-[10px] sm:text-[11px]"
            >
              Estamos para Ayudarle
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-ink text-[clamp(2rem,5vw,4.5rem)] leading-[1] uppercase tracking-tighter"
            >
              Haga su <span className="text-primary italic">Consulta</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-secondary max-w-xl text-sm md:text-base font-medium leading-relaxed"
            >
              Cuéntenos qué necesita y nuestro equipo le enviará una propuesta clara y segura para que su proyecto sea todo un éxito.
            </motion.p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

            {/* --- Left Column: Info --- */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:w-1/3 flex flex-col justify-center space-y-10 order-2 lg:order-1"
            >
              {[
                { label: "Correo Corporativo", value: import.meta.env.VITE_EMAIL, icon: Mail },
                { label: "WhatsApp Corporativo", value: import.meta.env.VITE_PHONE_NUMBER, icon: Phone },
                { label: "Ubicación Regional", value: "San Salvador, El Salvador", icon: MapPin }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <span className="text-[9px] font-black uppercase tracking-widest text-primary/60">{item.label}</span>
                  {item.label === "WhatsApp Corporativo" ? (
                    <a
                      href={`https://wa.me/503${import.meta.env.VITE_PHONE_NUMBER.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink font-medium text-lg border-b border-ink/5 pb-2 hover:border-primary transition-all flex items-center gap-3 group"
                    >
                      {item.value}
                      <span className="text-[8px] bg-green-500 text-white px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">Chat Line</span>
                    </a>
                  ) : (
                    <span className="text-ink font-medium text-lg border-b border-ink/5 pb-2 hover:border-primary transition-all cursor-default">{item.value}</span>
                  )}
                </div>
              ))}

              <div className="bg-surface p-8 border-l-4 border-primary mt-4">
                <h4 className="text-ink font-display text-xl uppercase mb-4">Visita Técnica</h4>
                <ul className="text-secondary text-xs leading-relaxed space-y-3 font-medium">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span> Visitas en zonas de San Salvador
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span> Cotización del servicio a reparar o instalar
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span> Evaluación de riesgos
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span> Mediciones eléctricas
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span> Revisión de documentación
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* --- Right Column: The Form --- */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:w-2/3 order-1 lg:order-2"
            >
              <div className="bg-white p-8 sm:p-12 md:p-16 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] relative border border-surface rounded-sm">

                {formState.serviceType === 'emergencia_expres' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-6 bg-surface border-l-4 border-primary flex items-start gap-4 shadow-sm"
                  >
                    <Clock className="text-primary w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[10px] font-black uppercase tracking-widest text-primary mb-1">Protocolo de Respuesta Inmediata</span>
                      <p className="text-secondary text-xs font-medium leading-snug">
                        Este servicio activa el despacho directo. <span className="font-bold text-ink">Sin inspección técnica previa</span>. Nuestro equipo se desplazará a su ubicación como prioridad máxima.
                      </p>
                    </div>
                  </motion.div>
                )}

                <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12">
                  {/* Field Wrapper */}
                  {[
                    { id: "name", label: "Su Nombre *", placeholder: "Ej. Juan Pérez", type: "text" },
                    { id: "email", label: "Su Correo *", placeholder: "juan@ejemplo.com", type: "email" },
                    { id: "company", label: "Empresa o Hogar", placeholder: "Nombre de su negocio o residencia", type: "text" },
                    { id: "location", label: "Ubicación del Sitio *", placeholder: "¿En qué zona o ciudad se encuentra?", type: "text" }
                  ].map((field) => (
                    <div key={field.id} className="flex flex-col gap-2">
                      <label className="text-[8px] font-black uppercase tracking-widest text-secondary">{field.label}</label>
                      <input
                        required={field.id !== "company"}
                        type={field.type}
                        className="bg-transparent border-b border-ink/10 py-3 focus:outline-none focus:border-primary transition-all text-sm font-medium text-ink placeholder:text-secondary/30"
                        placeholder={field.placeholder}
                        value={formState[field.id as keyof typeof formState]}
                        onChange={(e) => setFormState({ ...formState, [field.id]: e.target.value })}
                      />
                    </div>
                  ))}

                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-[8px] font-black uppercase tracking-widest text-secondary">¿En qué podemos apoyarle? *</label>
                    <CustomDropdown
                      value={formState.serviceType}
                      onChange={(val) => setFormState({ ...formState, serviceType: val, priority: val === 'emergencia_expres' ? 'crítica' : formState.priority })}
                      urgentMode={formState.serviceType === 'emergencia_expres'}
                    />
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-[8px] font-black uppercase tracking-widest text-secondary">Prioridad de su solicitud</label>
                    <div className="flex gap-4 pt-1">
                      {["Normal", "Alta", "Crítica"].map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          disabled={formState.serviceType === 'emergencia_expres'}
                          onClick={() => setFormState({ ...formState, priority: lvl.toLowerCase() })}
                          className={`flex-1 py-3 text-[9px] font-black uppercase tracking-widest transition-all ${formState.priority === lvl.toLowerCase()
                            ? (lvl === "Crítica" ? "bg-primary text-white" : "bg-ink text-white")
                            : "bg-surface text-secondary hover:bg-ink/5"
                            } ${formState.serviceType === 'emergencia_expres' && lvl !== 'Crítica' ? 'opacity-30' : ''}`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-[8px] font-black uppercase tracking-widest text-secondary">Detalles de lo que necesita *</label>
                    <textarea
                      required
                      rows={3}
                      className="bg-transparent border-b border-ink/10 py-3 focus:outline-none focus:border-primary transition-all text-sm font-medium text-ink resize-none placeholder:text-secondary/30"
                      placeholder="Cuéntenos un poco más sobre su requerimiento..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    />
                  </div>

                  <div className="md:col-span-2 flex flex-col gap-4">
                    <button
                      type="submit"
                      className={`py-6 text-[10px] font-black uppercase tracking-[0.4em] transition-all shadow-xl flex items-center justify-center gap-4 group ${formState.serviceType === 'emergencia_expres' ? 'bg-primary hover:bg-primary/90' : 'bg-ink hover:bg-primary'} text-white rounded-sm`}
                    >
                      {formState.serviceType === 'emergencia_expres' ? (
                        <>
                          <Clock className="w-4 h-4 animate-pulse" />
                          ENVIAR AYUDA AHORA
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4" />
                          ENVIAR VIA EMAIL
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="py-6 bg-[#25D366] hover:bg-[#128C7E] text-white text-[10px] font-black uppercase tracking-[0.4em] transition-all shadow-xl flex items-center justify-center gap-4 group rounded-sm"
                    >
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      ENVIAR VIA WHATSAPP
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>

        </div>

        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[3000] flex items-center justify-center p-6"
            >
              <motion.div
                initial={{ backdropFilter: "blur(0px)", opacity: 0 }}
                animate={{ backdropFilter: "blur(32px)", opacity: 1 }}
                exit={{ backdropFilter: "blur(0px)", opacity: 0 }}
                className="absolute inset-0 bg-ink/80"
              />

              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-lg bg-white p-12 text-center space-y-8 rounded-sm shadow-2xl"
              >
                <div className="flex justify-center">
                  <div className={`w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center`}>
                    <CheckCircle className={`text-primary w-10 h-10`} />
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-secondary font-black uppercase tracking-[0.4em] text-[10px]">Solicitud Procesada</span>
                  <h3 className="font-display text-ink text-4xl uppercase tracking-tighter leading-none">
                    {formState.serviceType === 'emergencia_expres' ? (
                      <>Despacho <br /><span className="text-primary italic">Activado</span></>
                    ) : (
                      <>Evaluación <br /><span className="text-primary italic">Confirmada</span></>
                    )}
                  </h3>
                  <div className={`w-12 h-[2px] bg-primary mx-auto`} />
                </div>

                <p className="text-secondary text-sm font-medium leading-relaxed">
                  {formState.serviceType === 'emergencia_expres'
                    ? "Nuestra cuadrilla de respuesta inmediata ha sido notificada. Un técnico se pondrá en contacto en los próximos minutos."
                    : "Su requerimiento ha sido asignado a nuestro equipo de ingeniería. En las próximas 24 horas laborables recibirá los detalles para la visita técnica."
                  }
                </p>

                <div className="pt-4 border-t border-ink/5">
                  <span className="text-[9px] uppercase font-black text-secondary/40 tracking-widest block mb-1">CÓDIGO DE SEGUIMIENTO</span>
                  <span className="text-[10px] font-mono text-ink font-bold">REQ-{Math.random().toString(36).substring(7).toUpperCase()}</span>
                </div>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className={`w-full ${formState.serviceType === 'emergencia_expres' ? 'bg-primary' : 'bg-ink'} text-white py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:opacity-90 transition-all active:scale-95 shadow-xl`}
                >
                  Volver al Sitio
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </section>
  );
}

export default memo(ContactSection);
