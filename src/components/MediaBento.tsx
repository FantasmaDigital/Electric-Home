import { motion } from "motion/react";
import React, { memo } from "react";
import Footer from "./shared/Footer";
import SocialPromotion from "./shared/SocialPromotion";

const mediaItems = [
  {
    type: "image",
    url: "img/services/1.png",
    title: "Instalación de supresores y reguladores de voltaje",
    size: "md:col-span-2 md:row-span-2",
  },
  {
    type: "image",
    url: "img/services/2.png",
    title: "Fabricación de hosing",
    size: "md:col-span-1 md:row-span-1",
  },
  {
    type: "image",
    url: "img/services/4.png",
    title: "Instalación de contadores eléctricos",
    size: "md:col-span-1 md:row-span-1",
  },
  {
    type: "image",
    url: "img/services/5.png",
    title: "Instalación de dobladora industrial, sistema eléctrico y programación",
    size: "md:col-span-1 md:row-span-2",
  },
  {
    type: "image",
    url: "img/services/3.jpg",
    title: "Mantenimiento de motores industriales",
    size: "md:col-span-2 md:row-span-1",
  },
];

function MediaBento() {
  return (
    <section id="media" className="relative min-h-screen w-full bg-white flex flex-col pt-24 md:pt-32 pb-16 md:pb-24">

      {/* Subtle Warm Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-primary/5 pointer-events-none" />

      <div className="flex-grow flex flex-col items-center justify-center px-6 md:px-20 relative z-10 w-full">
        <div className="max-w-full w-full flex flex-col">
          <div className="mb-8 md:mb-12">
            <span className="text-primary tracking-[0.4em] font-black block mb-4 uppercase text-[10px]">Nuestro Trabajo</span>
            <h2 className="font-display text-ink leading-[0.9] text-[clamp(2rem,6vw,4.5rem)] uppercase tracking-tighter">
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
