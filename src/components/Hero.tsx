import React from 'react';
import { useApp } from '../context/AppContext';
import { Star, ShieldCheck, CornerDownRight, Flame } from 'lucide-react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  const { language, setActivePage } = useApp();

  const handleOrderNowClick = (e: React.MouseEvent<any>) => {
    e.preventDefault();
    setActivePage('menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const reviewsTeasers = [
    { uk: '“Найкраща шаурма в Коломиї 🤯”', en: '“Best shawarma in Kolomyia 🤯”', author: 'Артем' },
    { uk: '“Часниковий соус просто божественний”', en: '“Garlic sauce is pure heaven”', author: 'Ірина' },
    { uk: '“Дуже смачно і мега-швидко!”', en: '“Super flavorful and mega fast!”', author: 'Олена' }
  ];

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center bg-black text-white overflow-hidden py-16 px-4 sm:px-8">
      
      {/* Cinematic Background Image with rich linear masks */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/nasha_food_hero_1779737953067.png"
          alt="Cinematic gourmet shawarma preparation"
          className="w-full h-full object-cover object-center opacity-40 md:opacity-50 scale-105 select-none pointer-events-none"
          referrerPolicy="no-referrer"
        />
        {/* Multilayer linear/radial gradients to guarantee text legibility under any viewing conditions */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/75 to-black/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-transparent to-zinc-950/50" />
        <div className="absolute -bottom-1 left-0 right-0 h-24 bg-gradient-to-t from-zinc-950 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Brand Statement & CTA */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          
          {/* Location / Quality Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/10 to-amber-500/10 border border-red-500/30 px-3 py-1.5 rounded-full text-xs font-bold text-amber-400 mb-6 max-w-max"
          >
            <Flame className="w-4.5 h-4.5 text-red-500 animate-pulse" />
            <span className="tracking-wide">
              {language === 'uk' ? 'Стріт-фуд енергія з преміум смаком' : 'Street-food energy with premium taste'}
            </span>
          </motion.div>

          {/* Core Captivating Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6"
          >
            {language === 'uk' ? (
              <>
                Шаурма, яку ти <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-500 to-orange-400 drop-shadow">
                  запам’ятаєш
                </span> <br />
                з першого укусу
              </>
            ) : (
              <>
                The Shawarma <br />
                You’ll{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-500 to-orange-400">
                  Remember
                </span><br />
                From First Bite
              </>
            )}
          </motion.h1>

          {/* Explanatory Subheadline focused heavily on Garlic sauce craving */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/70 text-lg md:text-xl font-normal leading-relaxed mb-8 max-w-xl"
          >
            {language === 'uk'
              ? 'наша FOOD — найсмачніша шаурма в Коломиї з легендарним часниковим соусом. Забирай хрусткий шедевр смаку з пилу й жару на вул. Франка, 12 (Тільки самовивіз).'
              : 'наша FOOD — Kolomyia’s ultimate rotisserie grilled wraps carrying our cult-famous signature garlic recipe. Sizzling hot takeaway at 12 Franko Str.'}
          </motion.p>

          {/* High-converting CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10"
          >
            <button
              id="hero-menu-cta"
              onClick={() => {
                setActivePage('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold text-base tracking-wide px-8 py-4 rounded-lg shadow-xl shadow-red-600/30 transition-all hover:scale-[1.03] active:scale-[0.98] text-center cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{language === 'uk' ? 'Переглянути меню' : 'Browse Menu'}</span>
              <CornerDownRight className="w-4.5 h-4.5 text-white/80 transition-transform group-hover:translate-x-1" />
            </button>
            
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("вулиця Івана Франка, 12, Коломия, Івано-Франківська область, 78200")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white border border-white/10 hover:border-white/40 hover:bg-white/5 font-extrabold text-base px-8 py-4 rounded-lg transition-all text-center flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>📍 {language === 'uk' ? 'Побудувати маршрут' : 'Get Directions'}</span>
            </a>
          </motion.div>

          {/* Dynamic Social Proof and rating display */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 border-t border-white/10 pt-8"
          >
            {/* Reviews numbers */}
            <div className="flex items-center gap-4">
              <div className="flex flex-col bg-white/5 border border-white/10 px-4 py-3 rounded-lg text-center shadow-lg">
                <div className="flex items-center gap-1.5 justify-center">
                  <span className="text-2xl font-black text-amber-500 font-mono">4.7</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 fill-amber-500 text-amber-500 ${i === 4 ? 'opacity-70' : ''}`} />
                    ))}
                  </div>
                </div>
                <span className="text-[10px] text-white/50 tracking-wider uppercase mt-1">
                  {language === 'uk' ? '13+ реальних оцінок' : '13+ Google Reviews'}
                </span>
              </div>
              
              <div className="text-white/80 text-sm">
                <span className="block font-bold">{language === 'uk' ? 'Легендарний статус' : 'Local Favorite'}</span>
                <span className="block text-xs text-white/50 font-mono">{language === 'uk' ? 'Коломия • вул. Франка, 12' : 'Kolomyia • Franka, 12'}</span>
              </div>
            </div>

            {/* Scrolling feedback teasers */}
            <div className="hidden sm:block border-l border-white/10 pl-6 h-12 overflow-hidden relative w-full">
              <div className="relative h-full flex items-center">
                <motion.div
                  animate={{ y: [0, -48, -96, 0] }}
                  transition={{ repeat: Infinity, duration: 9, cubicBezier: [0.4, 0, 0.2, 1] }}
                  className="absolute"
                >
                  {reviewsTeasers.map((teaser, idx) => (
                    <div key={idx} className="h-12 flex flex-col justify-center text-xs">
                      <p className="text-zinc-300 italic font-medium">
                        {language === 'uk' ? teaser.uk : teaser.en}
                      </p>
                      <span className="text-[10px] text-amber-500 font-bold tracking-wider mt-0.5 uppercase">
                        — {teaser.author} • {language === 'uk' ? 'Перевірений клієнт' : 'Verified Google Reviewer'}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

          </motion.div>

        </div>

        {/* Right Column: Premium High-contrast floating hero graphic card */}
        <div className="lg:col-span-5 flex justify-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: 'spring', Stiffness: 80, delay: 0.2 }}
            className="relative w-full max-w-[360px] md:max-w-[400px] aspect-[4/5] bg-zinc-900/40 backdrop-blur-md rounded-2xl border border-white/10 p-4 shadow-2xl flex flex-col justify-between overflow-hidden group hover:border-red-500/30 transition-colors"
          >
            {/* Ambient hot red glow */}
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-32 h-32 bg-red-600 rounded-full blur-3xl opacity-30 group-hover:opacity-40 transition-opacity" />

            <div className="relative overflow-hidden rounded-xl aspect-[1/1]">
              <img
                src="/src/assets/images/shawarma_premium_1779737971612.png"
                alt="Perfect grilled shawarma"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 right-2 bg-gradient-to-r from-red-600 to-amber-600 text-white font-extrabold text-[10px] tracking-wider py-1 px-2.5 rounded shadow">
                {language === 'uk' ? 'ЛЕГЕНДАРНИЙ ЧАСНИКОВИЙ' : 'CRITICAL FLAVOR TARGET'}
              </div>
            </div>

            <div className="mt-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-black text-white">
                  {language === 'uk' ? 'Шаурма "наша FOOD"' : 'The core "nasha FOOD"'}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed mt-1">
                  {language === 'uk'
                    ? 'Максимум відбірного м’яса гриль та наш культовий часниковий соус. Відчуй любов Коломиї.'
                    : 'Overflowing with rotisserie juicy chicken and our signature garlic cream. The town’s finest.'}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-3">
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-white/40">{language === 'uk' ? 'ЛИШЕ ЗА' : 'ONLY'}</span>
                  <span className="text-xl font-black text-amber-500 font-mono">185 ₴</span>
                </div>
                
                <button
                  onClick={handleOrderNowClick}
                  className="bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-black px-4 py-2.5 rounded tracking-wide transition-all shadow-md active:scale-95"
                >
                  {language === 'uk' ? 'СКУШТУВАТИ' : 'CRAVE IT NOW'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
