import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, MessageSquareHeart, ShieldCheck, Compass } from 'lucide-react';
import { motion } from 'motion/react';

export const FooterCity: React.FC = () => {
  const { language, setActivePage } = useApp();

  const handleMenuRedirect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setActivePage('menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-zinc-950 text-white border-t border-white/5 pt-20 pb-8 px-4 sm:px-8 overflow-hidden">
      
      {/* Background radial hot glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[550px] h-[250px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* BIG BOLD CTA TRIGGER SECTION (CONVERSION OATH) */}
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/30 px-3.5 py-1.5 rounded-full text-xs font-extrabold text-red-500 tracking-wider uppercase"
          >
            <Sparkles className="w-3.5 h-3.5 fill-red-500" />
            <span>{language === 'uk' ? 'ВТАМУЙ СВІЙ АПЕТИТ ПРЯМО ЗАРАЗ' : 'KILL YOUR HUNGER IMMEDIATELY'}</span>
          </motion.div>

          {/* Epic Statement */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white">
            {language === 'uk' ? 'Голод? Ми вже готуємо твою шаурму.' : 'Hungry? We are already preparing your wrap.'}
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {language === 'uk'
              ? 'Навіщо чекати? Обирай улюблений смак нашої шаурми та забирай легендарний гарячий шедевр у Коломиї вже за кілька хвилин (Тільки самовивіз)!'
              : 'Why starve? Select your favorite gourmet wrap and grab your sizzling hot master-crusted meal in Kolomyia!'}
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              id="footer-final-menu-cta"
              onClick={handleMenuRedirect}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-500 hover:scale-[1.03] active:scale-[0.98] text-white text-base font-extrabold tracking-wide px-10 py-4 rounded-xl shadow-2xl shadow-red-600/20 transition-all uppercase cursor-pointer"
            >
              {language === 'uk' ? 'Переглянути меню' : 'Browse Menu'}
            </button>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent("вулиця Івана Франка, 12, Коломия, Івано-Франківська область, 78200")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-white border border-white/10 hover:border-white/30 hover:bg-white/5 font-extrabold text-base px-10 py-4 rounded-xl transition-all uppercase text-center cursor-pointer"
            >
              📍 {language === 'uk' ? 'Побудувати маршрут' : 'Get Directions'}
            </a>
          </div>

        </div>

        {/* SECONDARY LEGAL & STRUCTURE INDEXING RAIL */}
        <div className="border-t border-white/5 pt-12 grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Column 1: Brand details */}
          <div className="md:col-span-5 space-y-4">
            <a href="#" className="flex flex-col select-none max-w-max">
              <span className="text-2xl font-black tracking-wider text-white">
                наша <span className="text-red-500 font-extrabold">FOOD</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-amber-500 font-bold">
                {language === 'uk' ? 'Коломия • Преміум Стріт-Фуд' : 'Kolomyia • Premium Street Food'}
              </span>
            </a>
            
            <p className="text-zinc-500 text-xs leading-relaxed max-w-sm">
              {language === 'uk'
                ? 'Перший преміум стріт-фуд проект у Коломиї, який ставиться до шаурми як до твору високого мистецтва. Наш таємний часниковий соус — твоя нова залежність.'
                : 'The premier culinary street food startup in Kolomyia. We treat grilled wraps like high art, pairing rotisserie chicken with legendary home-crafted sauce drops.'}
            </p>

            <div className="flex gap-3 text-zinc-400">
              <a href="https://telegram.org" target="_blank" rel="noreferrer" className="hover:text-amber-500 p-2 bg-white/5 rounded-full border border-white/10 hover:border-amber-500/20 transition-all" title="Telegram">
                <Compass className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-4 text-xs">
            <h4 className="font-extrabold text-white uppercase tracking-widest">{language === 'uk' ? 'Навігація' : 'Navigation'}</h4>
            <div className="flex flex-col gap-2.5 text-zinc-400">
              <a href="#menu" className="hover:text-white transition-colors">{language === 'uk' ? 'Гурман Меню' : 'Gourmet Menu'}</a>
              <a href="#why-us" className="hover:text-white transition-colors">{language === 'uk' ? 'Наші Стандарти' : 'Our Quality Code'}</a>
              <a href="#reviews" className="hover:text-white transition-colors">{language === 'uk' ? 'Відгуки Людей' : 'User Testimonials'}</a>
              <a href="#location" className="hover:text-white transition-colors">{language === 'uk' ? 'Адреса та Години' : 'Map & Coordinates'}</a>
            </div>
          </div>

          {/* Column 3: Contacts */}
          <div className="md:col-span-4 space-y-4 text-xs text-zinc-400">
            <h4 className="font-extrabold text-white uppercase tracking-widest">{language === 'uk' ? 'Допомога та замовлення' : 'Help & Bookings'}</h4>
            <p className="leading-relaxed">
              {language === 'uk' ? 'Маєш пропозиції чи велике замовлення для вечірки?' : 'Need catering or hosting a private corporate party?'} <br />
              {language === 'uk' ? 'Дзвони швидше менеджеру:' : 'Ring our dispatcher directly:'}
            </p>
            <div className="text-white font-black text-sm">
              <a href="tel:+380678021421" className="hover:text-red-500 transition-colors">+380 (67) 802 14 21</a>
            </div>
            <div className="text-[10px] text-zinc-500 font-mono">
              UA 78200 • вул. Івана Франка, 12, Коломія, Україна
            </div>
          </div>

        </div>

        {/* BOTTOM LEGAL STATEMENT */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-zinc-500">
          <div>
            © {new Date().getFullYear()} наша FOOD. {language === 'uk' ? 'Всі права застережено.' : 'All rights reserved.'}
          </div>
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>{language === 'uk' ? 'Розроблено за найвищими кулінарними стандартами безпеки їжі' : 'Programmed under elite food hygiene codes'}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
