import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Clock, MapPin, Globe, Menu as MenuIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Header: React.FC = () => {
  const { language, setLanguage, cart, setCartOpen, isRestaurantOpen, timeLeftToClose, activePage, setActivePage } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { target: '#menu', uk: 'Меню', en: 'Menu' },
    { target: '#why-us', uk: 'Чому ми', en: 'Why Us' },
    { target: '#location', uk: 'Локація', en: 'Location' }
  ];

  const handleNavigation = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (target === '#menu') {
      setActivePage('menu');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (activePage !== 'home') {
        setActivePage('home');
        setTimeout(() => {
          const el = document.querySelector(target);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      } else {
        const el = document.querySelector(target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <>
      <header id="header-bar" className="sticky top-0 z-50 w-full bg-black/85 backdrop-blur-md border-b border-white/5 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-4">
            <button 
              onClick={(e) => {
                e.preventDefault();
                setActivePage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex flex-col select-none text-left cursor-pointer"
            >
              <span className="text-2xl font-black tracking-wider text-white">
                наша <span className="text-red-500 font-extrabold">FOOD</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-amber-500 font-bold">
                {language === 'uk' ? 'Коломия • Преміум Стріт-Фуд' : 'Kolomyia • Premium Street Food'}
              </span>
            </button>

            {/* Live Operational Status Indicator */}
            <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs">
              <span className={`h-2.5 w-2.5 rounded-full ${isRestaurantOpen ? 'bg-emerald-500 animate-pulse' : 'bg-red-500 animate-pulse'}`} />
              <span className="font-semibold text-white/95">
                {isRestaurantOpen ? (language === 'uk' ? 'ВІДЧИНЕНО' : 'OPEN') : (language === 'uk' ? 'ЗАЧИНЕНО' : 'CLOSED')}
              </span>
              <span className="text-white/40">|</span>
              <span className="text-white/70 text-xs font-mono">{timeLeftToClose}</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.target}
                href={link.target}
                onClick={(e) => handleNavigation(e, link.target)}
                className={`transition-colors text-sm font-medium relative group ${
                  link.target === '#menu' && activePage === 'menu' ? 'text-amber-500' : 'text-white/80 hover:text-white'
                }`}
              >
                {language === 'uk' ? link.uk : link.en}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-red-500 transition-all duration-300 ${
                  link.target === '#menu' && activePage === 'menu' ? 'w-full bg-amber-500' : 'w-0 group-hover:w-full'
                }`} />
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            
            {/* Separate highlighted Menu Button */}
            <button
              id="header-menu-page-btn"
              onClick={() => {
                setActivePage(activePage === 'menu' ? 'home' : 'menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 font-black text-xs py-2 px-3.5 rounded-md transition-all uppercase tracking-wider shadow cursor-pointer ${
                activePage === 'menu'
                  ? 'bg-amber-500 text-black hover:bg-amber-400 font-bold'
                  : 'bg-zinc-900 text-white hover:text-amber-500 border border-amber-500/25 hover:border-amber-500 hover:scale-[1.02]'
              }`}
            >
              <span>📖</span>
              <span>
                {language === 'uk' 
                  ? (activePage === 'menu' ? 'Додому' : 'Меню') 
                  : (activePage === 'menu' ? 'Home' : 'Menu')}
              </span>
            </button>

            {/* Language Switcher */}
            <button
              id="lang-toggle-btn"
              onClick={() => setLanguage(language === 'uk' ? 'en' : 'uk')}
              className="flex items-center gap-1 text-white/70 hover:text-white bg-white/5 border border-white/10 hover:border-white/25 transition-all text-xs font-bold py-1.5 px-3 rounded-md cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'uk' ? 'EN' : 'УКР'}</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              id="cart-trigger-btn"
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 transition-all font-bold text-xs py-2 px-4 rounded-md shadow-lg shadow-red-600/20 group hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              <span className="hidden sm:inline">
                {language === 'uk' ? 'Кошик' : 'Cart'}
              </span>
              
              <AnimatePresence>
                {cartItemsCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-1.5 bg-amber-500 text-black text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-black border border-black shadow"
                  >
                    {cartItemsCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Menu Icon */}
            <button
              id="mobile-drawer-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex lg:hidden text-white/80 hover:text-white p-1 hover:bg-white/5 rounded transition-all cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </header>

      {/* Mini live banner for mobile viewports */}
      <div className="md:hidden w-full bg-white/5 border-b border-white/10 py-1.5 px-4 flex items-center justify-center gap-2 text-xs">
        <span className={`h-2 w-2 rounded-full ${isRestaurantOpen ? 'bg-emerald-500 animate-pulse' : 'bg-red-500 animate-pulse'}`} />
        <span className="font-extrabold text-white">
          {isRestaurantOpen ? (language === 'uk' ? 'ВІДЧИНЕНО' : 'OPEN') : (language === 'uk' ? 'ЗАЧИНЕНО' : 'CLOSED')}
        </span>
        <span className="text-white/30">•</span>
        <span className="text-white/85 text-[11px] font-mono">{timeLeftToClose}</span>
      </div>

      {/* Mobile Menu Backdrop & Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed right-0 top-0 bottom-0 w-[270px] bg-neutral-950 border-l border-white/10 pt-20 pb-8 px-6 z-40 flex flex-col justify-between lg:hidden shadow-2xl"
            >
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.target}
                    href={link.target}
                    onClick={(e) => handleNavigation(e, link.target)}
                    className={`text-base font-bold py-2 border-b border-white/5 block ${
                      link.target === '#menu' && activePage === 'menu' ? 'text-amber-500' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {language === 'uk' ? link.uk : link.en}
                  </a>
                ))}
              </div>

              <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  <span>вул. Івана Франка, 12, Коломия</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>09:00 - 23:00 ({language === 'uk' ? 'Щодня' : 'Daily'})</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
