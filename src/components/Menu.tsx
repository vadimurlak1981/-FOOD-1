import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MENU_ITEMS } from '../data';
import { Category, MenuItem } from '../types';
import { ShoppingBag, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Menu: React.FC = () => {
  const { language, addToCart } = useApp();
  const [activeCategory, setActiveCategory] = useState<Category>('shawarma');

  const categoriesList: { id: Category; uk: string; en: string }[] = [
    { id: 'shawarma', uk: '🌯 Пряна Шаурма', en: '🌯 Gourmet Shawarma' },
    { id: 'sides', uk: '🍟 Хрумкі Гарніри', en: '🍟 Premium Sides' },
    { id: 'sauces', uk: '🧄 Фірмові Соуси', en: '🧄 Craft Sauces' },
    { id: 'drinks', uk: '🥤 Прохолодні Напої', en: '🥤 Ice Cold Drinks' }
  ];

  const filteredItems = MENU_ITEMS.filter((item) => item.category === activeCategory);

  const handleOrderClick = (item: MenuItem) => {
    // Direct add to cart
    addToCart(item);
  };

  return (
    <section id="menu" className="relative bg-zinc-950 py-24 px-4 sm:px-8 border-b border-white/5">
      
      {/* Background radial accent glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-red-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title and emotional statement */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-red-500 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full text-center">
            {language === 'uk' ? 'Гурманське меню наша FOOD' : 'EXCLUSIVE MENUS'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mt-4">
            {language === 'uk' ? 'Твій ультимативний гастро-екстаз' : 'Pure Craving, Prepared Fresh'}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-4 leading-relaxed">
            {language === 'uk'
              ? 'Кожна порція створюється гарячою спеціально під твоє замовлення. Ми додаємо тільки свіжі інгредієнти та наш сертифікований часниковий соус.'
              : 'Our master craftsmen build every roll blazing hot to order. Packed with premium meat, crispy garnishes, and our secret garlic recipes.'}
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-12">
          {categoriesList.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`py-3 px-5 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 pointer-events-auto border ${
                  isActive
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white border-red-600 shadow-lg shadow-red-600/15 scale-[1.02]'
                    : 'bg-white/5 border-white/5 hover:border-white/15 text-white/70 hover:text-white'
                }`}
              >
                {language === 'uk' ? cat.uk : cat.en}
              </button>
            );
          })}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col bg-zinc-900/30 border border-white/5 hover:border-white/15 rounded-2xl p-4 transition-all duration-300 hover:shadow-2xl hover:shadow-black hover:-translate-y-1 relative"
              >
                
                {/* Visual badges over item */}
                <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                  {item.badgeUk && (
                    <span className="bg-gradient-to-r from-amber-600 to-yellow-500 text-white text-[10px] tracking-wider uppercase font-extrabold py-1 px-2.5 rounded shadow">
                      {language === 'uk' ? item.badgeUk : item.badgeEn}
                    </span>
                  )}
                  {item.popular && (
                    <span className="bg-red-600 text-white text-[9px] tracking-wider uppercase font-black py-0.5 px-2 rounded-full shadow flex items-center gap-1">
                      <Flame className="w-3 h-3 fill-white" />
                      {language === 'uk' ? 'Популярне' : 'POPULAR'}
                    </span>
                  )}
                </div>

                {/* Media Image Holder */}
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-zinc-950 border border-white/5 relative">
                  <img
                    src={item.image}
                    alt={item.nameUk}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60" />
                </div>

                {/* Body Details */}
                <div className="flex-1 flex flex-col justify-between mt-4">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-lg font-black text-white group-hover:text-red-500 transition-colors">
                        {language === 'uk' ? item.nameUk : item.nameEn}
                      </h3>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed mt-2.5">
                      {language === 'uk' ? item.descriptionUk : item.descriptionEn}
                    </p>
                  </div>

                  {/* Pricing and Action interfaces */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-6">
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-wider text-white/40">{language === 'uk' ? 'ЦІНА' : 'PRICE'}</span>
                      <span className="text-xl font-black text-amber-500 font-mono">{item.price} ₴</span>
                    </div>

                    <button
                      id={`order-btn-${item.id}`}
                      onClick={() => handleOrderClick(item)}
                      className="flex items-center gap-2 bg-white/5 hover:bg-red-600 hover:text-white text-zinc-300 font-extrabold py-2.5 px-4 rounded-lg border border-white/10 hover:border-red-600 transition-all text-xs active:scale-95 shadow-md cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>
                        {language === 'uk' ? 'В кошик' : 'Add to Cart'}
                      </span>
                    </button>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

    </section>
  );
};
