import React, { memo } from "react";
import { motion } from "motion/react";
import { Instagram, Facebook, Linkedin, ArrowUpRight } from "lucide-react";

const platforms = [
  { 
    name: "Instagram", 
    handle: "@electrichome_sv", 
    icon: Instagram, 
    color: "from-[#833ab4] via-[#fd1d1d] to-[#fcb045]",
    description: "Proyectos en tiempo real y nuestro día a día."
  },
  { 
    name: "LinkedIn", 
    handle: "Electric Home Industrial", 
    icon: Linkedin, 
    color: "from-[#0077b5] to-[#00a0dc]",
    description: "Actualizaciones técnicas y red profesional."
  },
  { 
    name: "Facebook", 
    handle: "Electric Home El Salvador", 
    icon: Facebook, 
    color: "from-[#1877f2] to-[#3b5998]",
    description: "Comunidad y soporte directo."
  }
];

function SocialPromotion() {
  return (
    <div className="w-full bg-surface py-24 px-6 md:px-20 border-t border-ink/5">
      <div className="max-w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8">
            <div>
              <span className="text-primary tracking-[0.4em] font-black block mb-4 uppercase text-[10px]">Conectividad</span>
              <h2 className="font-display text-ink leading-[0.9] text-[clamp(2.5rem,8vw,5rem)] uppercase tracking-tighter">
                Únete a nuestra <br />
                <span className="text-primary italic">Comunidad Digital</span>
              </h2>
            </div>
            <p className="text-secondary max-w-md text-sm md:text-base font-medium leading-relaxed">
              Mantente al tanto de las últimas innovaciones en ingeniería eléctrica y descubre cómo transformamos la industria energética en la región.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {platforms.map((platform, idx) => (
              <motion.a
                key={platform.name}
                href="#"
                whileHover={{ x: 10 }}
                className="group relative bg-white p-8 flex items-center justify-between overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-ink/5"
              >
                <div className={`${platform.color} absolute left-0 top-0 w-1 h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center group-hover:bg-ink group-hover:text-white transition-all duration-500">
                    <platform.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-ink font-display text-xl uppercase tracking-tighter">{platform.name}</h3>
                    <p className="text-primary font-bold text-[10px] tracking-widest uppercase">{platform.handle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="hidden md:block text-[8px] font-black uppercase tracking-[0.3em] text-ink/20 group-hover:text-ink transition-colors">Ver Perfil</span>
                  <ArrowUpRight className="w-5 h-5 text-ink/20 group-hover:text-primary transition-colors group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" />
                </div>
              </motion.a>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default memo(SocialPromotion);
