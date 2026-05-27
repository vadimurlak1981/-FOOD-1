/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Menu } from './components/Menu';
import { WhyUs } from './components/WhyUs';
import { LocationHours } from './components/LocationHours';
import { CartDrawer } from './components/CartDrawer';
import { FooterCity } from './components/FooterCity';
import { ShoppingBag, Flame, Sliders } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function MainAppContent() {
  const { language, cart, setCartOpen, activePage, setActivePage } = useApp();
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleMobileScrollTrigger = () => {
    if (cartItemsCount > 0) {
      setCartOpen(true);
    } else {
      setActivePage('menu');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white font-sans antialiased select-none selection:bg-red-500 selection:text-white scroll-smooth pb-16 md:pb-0">
      
      {/* Sticky top navigational rail */}
      <Header />

      <AnimatePresence mode="wait">
        {activePage === 'home' ? (
          <motion.main
            key="home"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* Core Sections */}
            <Hero />
            
            <WhyUs />
            
            <LocationHours />
            
            {/* Final CTA and legal lines footer */}
            <FooterCity />
          </motion.main>
        ) : (
          <motion.main
            key="menu"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="pt-6"
          >
            {/* Separate beautiful Menu Page Header Block */}
            <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-6 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-8">
              <div>
                <button
                  id="menu-back-btn"
                  onClick={() => {
                    setActivePage('home');
                    window.scrollTo({ top: 0 });
                  }}
                  className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 px-3 py-1.5 rounded-lg transition-all mb-4 font-semibold group cursor-pointer"
                >
                  <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
                  <span>{language === 'uk' ? 'Повернутися на головну' : 'Back to Home'}</span>
                </button>
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
                  {language === 'uk' ? 'Свіже Меню' : 'Our Fresh Menu'}
                </h1>
                <p className="text-xs text-zinc-400 mt-1 max-w-xl">
                  {language === 'uk' 
                    ? 'Кожен шедевр готується з любов’ю за секретними рецептами з найсвіжіших інгредієнтів прямо перед вами у Коломиї.' 
                    : 'Each culinary masterpiece is freshly prepared in Kolomyia with love, utilizing signature premium ingredients.'}
                </p>
              </div>
              
              <div className="bg-zinc-900 border border-amber-500/20 px-4 py-3 rounded-xl flex items-center gap-3 self-start sm:self-center font-mono text-[11px] text-amber-500 shadow-md">
                <span className="text-xl">🎒</span>
                <div>
                  <span className="font-extrabold uppercase block text-[9px] tracking-wider">{language === 'uk' ? 'Тільки самовивіз' : 'Takeaway only'}</span>
                  <span className="text-white/60 text-[10px]">{language === 'uk' ? 'вул. Франка, 12, Коломия' : '12 Franko Str, Kolomyia'}</span>
                </div>
              </div>
            </div>

            {/* Menu main component renders on this isolated screen perfectly */}
            <Menu />

            {/* Simple subtle visual layout delimiter */}
            <FooterCity />
          </motion.main>
        )}
      </AnimatePresence>

      {/* Floating cart drawer overlays inside the body */}
      <CartDrawer />

      {/* FLOATING ACTION BOTTOM CTA RAIL FOR STREET-LEVEL MOBILE CONVERSION */}
      <AnimatePresence>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
          className="fixed bottom-4 left-4 right-4 z-40 md:hidden"
        >
          <button
            onClick={handleMobileScrollTrigger}
            className="w-full flex items-center justify-between bg-gradient-to-r from-red-600 via-red-600 to-amber-600 border border-white/10 text-white font-black py-3.5 px-6 rounded-xl shadow-2xl active:scale-95 transition-all"
            id="mobile-sticky-footer-cta"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 animate-bounce" />
              <span className="text-xs uppercase tracking-wider font-extrabold text-left">
                {cartItemsCount > 0 
                  ? (language === 'uk' ? 'У тебе є замовлення' : 'Active cart ready') 
                  : (language === 'uk' ? 'Сплести свою Шаурму' : 'Build Your Shawarma')}
              </span>
            </div>

            <div className="flex items-center gap-2 bg-black/40 border border-white/10 py-1 px-3 rounded-lg text-xs font-mono font-bold">
              {cartItemsCount > 0 ? (
                <span>{cartItemsCount} {language === 'uk' ? 'шт.' : 'items'}</span>
              ) : (
                <span className="flex items-center gap-1 uppercase tracking-widest text-[9px] text-amber-500">
                  <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  {language === 'uk' ? 'СТАРТ' : 'START'}
                </span>
              )}
            </div>
          </button>
        </motion.div>
      </AnimatePresence>

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
