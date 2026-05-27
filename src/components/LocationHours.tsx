import React from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Clock, Phone, Navigation, Landmark, BadgeAlert, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const LocationHours: React.FC = () => {
  const { language, isRestaurantOpen, timeLeftToClose } = useApp();

  return (
    <section id="location" className="relative bg-zinc-950 py-24 px-4 sm:px-8 border-b border-white/5 overflow-hidden">
      
      {/* Background ambient gold light glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left column: Location info & Hours */}
        <div className="lg:col-span-5 space-y-8">
          
          <div>
            <span className="text-xs font-black uppercase tracking-[0.25em] text-amber-500">
              {language === 'uk' ? 'ГЕОГРАФІЯ СМАКУ' : 'MAIN LOCATION'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-2">
              {language === 'uk' ? 'Де нас знайти в Коломиї' : 'Find Us in Kolomyia'}
            </h2>
            <p className="text-zinc-400 text-sm mt-4 leading-relaxed">
              {language === 'uk'
                ? 'Ми знаходимося в самому серці Коломиї. Завітай за соковитим стріт-фудом або замовляй швидкий самовивіз до свого авто.'
                : 'Pulsing right in the center of Kolomyia. Drop by for sizzling takeaway wraps, or schedule quick parking pickups directly to your car window.'}
            </p>
          </div>

          {/* Quick contact / directions list */}
          <div className="space-y-4">
            
            {/* Address bar */}
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("вулиця Івана Франка, 12, Коломия, Івано-Франківська область, 78200")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-4 items-start p-4 bg-zinc-900/30 border border-white/5 hover:border-red-500/30 rounded-2xl transition-all hover:bg-zinc-900/50 cursor-pointer group"
            >
              <div className="p-2.5 bg-red-600/10 border border-red-500/20 text-red-500 group-hover:bg-red-600 group-hover:text-white rounded-lg shrink-0 transition-all">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">{language === 'uk' ? 'НАША АДРЕСА' : 'STORE ADDRESS'}</span>
                  <span className="text-[10px] text-red-500 font-extrabold group-hover:underline uppercase tracking-wide">🗺️ {language === 'uk' ? 'МАРШРУТ' : 'GET ROUTE'}</span>
                </div>
                <span className="text-sm font-black text-white block mt-0.5">вул. Івана Франка, 12, Коломия</span>
                <span className="text-xs text-zinc-400 block mt-0.5">{language === 'uk' ? 'Івано-Франківська обл. • Центр міста' : 'Iv.-Frankivsk region • City center'}</span>
              </div>
            </a>

            {/* Operating hours with confidence message */}
            <div className="flex gap-4 items-start p-4 bg-zinc-900/30 border border-white/10 rounded-2xl">
              <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-lg shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">{language === 'uk' ? 'ГОДИНИ РОБОТИ' : 'OPERATIONAL LOG'}</span>
                  <div className="flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${isRestaurantOpen ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                    <span className="text-[10px] text-white font-black uppercase font-mono">{timeLeftToClose}</span>
                  </div>
                </div>
                <span className="text-sm font-black text-white block mt-0.5">09:00 – 23:00 ({language === 'uk' ? 'Щодня без вихідних' : 'Daily, no holidays'})</span>
                
                {/* Confidence Trust Box */}
                <div className="bg-amber-500/5 border border-amber-500/15 rounded-lg p-3 mt-3 flex gap-2 items-start">
                  <BadgeAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-amber-400 leading-relaxed font-medium">
                    {language === 'uk'
                      ? 'Увага: Ми прагнемо абсолютної прозорості. Графік роботи фіксований і наші години оновлюються на картах у реальному часі, аби твій візит ніколи не зіпсувався!'
                      : 'Trust Oath: No schedule inconsistencies! Hours are verified, updated live on Google Maps automatically to protect your plans.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Hot line call phone */}
            <div className="flex gap-4 items-start p-4 bg-zinc-900/30 border border-white/5 rounded-2xl">
              <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">{language === 'uk' ? 'ТЕЛЕФОН ГАРЯЧОЇ ЛІНІЇ' : 'ORDER TELEPHONY'}</span>
                <a href="tel:+380678021421" className="text-sm font-black text-white hover:text-red-500 transition-colors block mt-0.5">+380 (67) 802 14 21</a>
                <span className="text-xs text-zinc-500 block mt-0.5">{language === 'uk' ? 'Приймаємо передзамовлення на самовивіз' : 'Call directly for swift pick-up schedule'}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Right column: High-fidelity luxurious Dark Theme Map mockup */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-2xl border border-white/10 overflow-hidden bg-zinc-900/50 aspect-[16/10] shadow-2xl flex flex-col justify-between"
          >
            {/* Absolute overlay elements representing UI of an elite navigation app */}
            <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur border border-white/10 p-3 rounded-lg text-xs shadow-lg max-w-xs space-y-1">
              <div className="flex items-center gap-1.5">
                <Landmark className="w-3.5 h-3.5 text-red-500" />
                <span className="font-extrabold text-white">наша FOOD • Коломия</span>
              </div>
              <p className="text-white/60 text-[10px]">Коломийський Національний Музей Гуцульщини у пішій доступності (2 хв).</p>
            </div>

            {/* Simulated map graphic showing roads in dark luxury style */}
            <div className="absolute inset-0 z-0 opacity-40 select-none bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] flex items-center justify-center">
              
              {/* Simulated streets lines */}
              <div className="absolute w-[200%] h-[2px] bg-white/5 rotate-12" />
              <div className="absolute w-[200%] h-[2px] bg-white/5 -rotate-45" />
              <div className="absolute w-[200%] h-[2px] bg-white/5 rotate-90" />
              <div className="absolute w-28 h-28 border border-white/5 rounded-full" />
              <div className="absolute w-64 h-64 border border-white/5 rounded-full" />

              {/* Central glowing custom pointer radar */}
              <div className="relative flex items-center justify-center">
                <span className="absolute w-12 h-12 rounded-full border border-red-500/40 bg-red-600/10 animate-ping" />
                <span className="absolute w-6 h-6 rounded-full bg-red-600 border border-white/20 shadow-xl" />
                <MapPin className="w-3.5 h-3.5 text-white relative z-10" />
              </div>
            </div>

            {/* Bottom actions utility rail */}
            <div className="relative z-10 w-full mt-auto bg-black/90 backdrop-blur border-t border-white/10 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <span className="text-[10px] text-zinc-500 block font-mono">MAP INTERCEPT COORDS</span>
                <span className="text-[11px] font-bold text-white block">48.5284° N, 25.0392° E</span>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("вулиця Івана Франка, 12, Коломия, Івано-Франківська область, 78200")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs px-4 py-2.5 rounded transition-all shadow-md hover:scale-102 cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{language === 'uk' ? 'Маршрут у Картах' : 'Check Directions'}</span>
                </a>
                
                <a
                  href="tel:+380678021421"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-white/5 border border-white/15 hover:border-white/30 text-white font-bold text-xs px-4 py-2.5 rounded transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                  <span>{language === 'uk' ? 'Зателефонувати' : 'Call Now'}</span>
                </a>
              </div>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
};
