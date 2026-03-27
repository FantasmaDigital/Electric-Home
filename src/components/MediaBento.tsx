import { motion } from "motion/react";
import React, { memo } from "react";
import Footer from "./shared/Footer";
import SocialPromotion from "./shared/SocialPromotion";

const mediaItems = [
  {
    type: "image",
    url: "https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?auto=format&fit=crop&q=80&w=800",
    title: "Panel Industrial",
    size: "md:col-span-2 md:row-span-2",
  },
  {
    type: "video",
    url: "https://assets.mixkit.co/videos/preview/mixkit-working-on-industrial-machine-4434-large.mp4",
    title: "Maquinaria",
    size: "md:col-span-1 md:row-span-1",
  },
  {
    type: "image",
    url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800",
    title: "Instalación AES",
    size: "md:col-span-1 md:row-span-1",
  },
  {
    type: "image",
    url: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=800",
    title: "Dobladora",
    size: "md:col-span-1 md:row-span-2",
  },
  {
    type: "image",
    url: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800",
    title: "Generadores",
    size: "md:col-span-2 md:row-span-1",
  },
];

function MediaBento() {
  return (
    <section id="media" className="relative min-h-screen w-full bg-white flex flex-col">
      
      {/* Subtle Warm Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-primary/5 pointer-events-none" />

      <div className="flex-grow flex flex-col items-center justify-center px-6 md:px-20 relative z-10 w-full py-24 md:py-20 lg:py-32">
        <div className="max-w-full w-full flex flex-col">
          <div className="mb-8 md:mb-12">
            <span className="text-primary tracking-[0.4em] font-black block mb-4 uppercase text-[10px]">Nuestro Trabajo</span>
            <h2 className="font-display text-ink leading-[0.9] text-[clamp(2.5rem,8vw,6rem)] uppercase tracking-tighter">
              La <span className="text-primary italic">Galería</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 min-h-[600px] md:min-h-0">
            {mediaItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`${item.size} relative group overflow-hidden bg-white shadow-xl min-h-[200px] md:min-h-0 rounded-sm`}
              >
                {item.type === "image" ? (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-100"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                ) : (
                  <video
                    src={item.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-100"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <h3 className="text-white font-display text-2xl uppercase tracking-tighter leading-none">{item.title}</h3>
                  <div className="w-8 h-[2px] bg-primary mt-3 group-hover:w-16 transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div className="relative z-10 w-full flex flex-col">
        <SocialPromotion />
        <Footer />
      </div>
    </section>
  );
}

export default memo(MediaBento);
