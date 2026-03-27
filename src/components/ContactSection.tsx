import { motion, AnimatePresence } from "motion/react";
import React, { useState, memo } from "react";
import { Mail, Phone, MapPin, FileText, CheckCircle } from "lucide-react";
import Footer from "./shared/Footer";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
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
              Gestión de Proyectos
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-ink text-[clamp(2rem,5vw,4.5rem)] leading-[1] uppercase tracking-tighter"
            >
              Configura Tu <span className="text-primary italic">Cotización</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-secondary max-w-xl text-sm md:text-base font-medium leading-relaxed"
            >
              Nuestro equipo de ingeniería evaluará su requerimiento para proporcionar una propuesta técnica ajustada a las normativas vigentes.
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
                { label: "Línea de Ingeniería", value: import.meta.env.VITE_PHONE_NUMBER, icon: Phone },
                { label: "Ubicación Regional", value: "San Salvador, El Salvador", icon: MapPin }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <span className="text-[9px] font-black uppercase tracking-widest text-primary/60">{item.label}</span>
                  <span className="text-ink font-medium text-lg border-b border-ink/5 pb-2 hover:border-primary transition-all cursor-default">{item.value}</span>
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

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12">
                  {/* Field Wrapper */}
                  {[
                    { id: "name", label: "Gestor del Proyecto *", placeholder: "Ej. Juan Pérez", type: "text" },
                    { id: "email", label: "Email Corporativo *", placeholder: "juan@ejemplo.com", type: "email" },
                    { id: "company", label: "Empresa", placeholder: "Su organización", type: "text" },
                    { id: "location", label: "Ubicación del Sitio *", placeholder: "Zona o Ciudad", type: "text" }
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
                    <label className="text-[8px] font-black uppercase tracking-widest text-secondary">Tipo de Requerimiento *</label>
                    <select
                      required
                      className="bg-transparent border-b border-ink/10 py-3 focus:outline-none focus:border-primary transition-all text-sm font-medium text-ink appearance-none cursor-pointer"
                      value={formState.serviceType}
                      onChange={(e) => setFormState({ ...formState, serviceType: e.target.value })}
                    >
                      <option value="mantenimiento">Mantenimiento Predictivo</option>
                      <option value="instalacion">Instalación y Montaje</option>
                      <option value="emergencia">Soporte Técnico Especializado</option>
                      <option value="consultoria">Auditoría Energética</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-[8px] font-black uppercase tracking-widest text-secondary">Prioridad</label>
                    <div className="flex gap-4 pt-1">
                      {["Normal", "Alta", "Crítica"].map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setFormState({ ...formState, priority: lvl.toLowerCase() })}
                          className={`flex-1 py-3 text-[9px] font-black uppercase tracking-widest transition-all ${formState.priority === lvl.toLowerCase()
                              ? "bg-ink text-white"
                              : "bg-surface text-secondary hover:bg-ink/5"
                            }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-[8px] font-black uppercase tracking-widest text-secondary">Detalles del Requerimiento *</label>
                    <textarea
                      required
                      rows={3}
                      className="bg-transparent border-b border-ink/10 py-3 focus:outline-none focus:border-primary transition-all text-sm font-medium text-ink resize-none placeholder:text-secondary/30"
                      placeholder="Describa el alcance de su proyecto..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-ink text-white py-6 md:col-span-2 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-primary transition-all shadow-xl flex items-center justify-center gap-4 group"
                  >
                    Solicitar Evaluación Técnica
                    <div className="w-8 h-[1px] bg-white group-hover:w-16 transition-all" />
                  </button>
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
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="text-primary w-10 h-10" />
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-secondary font-black uppercase tracking-[0.4em] text-[10px]">Solicitud Procesada</span>
                  <h3 className="font-display text-ink text-4xl uppercase tracking-tighter leading-none">Evaluación <br /><span className="text-primary">Confirmada</span></h3>
                  <div className="w-12 h-[2px] bg-primary mx-auto" />
                </div>

                <p className="text-secondary text-sm font-medium leading-relaxed">
                  Su requerimiento ha sido asignado a nuestro equipo de ingeniería. En las próximas 24 horas laborables recibirá los detalles para la visita técnica.
                </p>

                <div className="pt-4 border-t border-ink/5">
                  <span className="text-[9px] uppercase font-black text-secondary/40 tracking-widest block mb-1">CÓDIGO DE SEGUIMIENTO</span>
                  <span className="text-[10px] font-mono text-ink font-bold">REQ-{Math.random().toString(36).substring(7).toUpperCase()}</span>
                </div>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full bg-ink text-white py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-primary transition-all active:scale-95 shadow-xl"
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
