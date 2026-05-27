import React from 'react';
import { useApp } from '../context/AppContext';
import { Leaf, Timer, Weight, Heart, Sparkles, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export const WhyUs: React.FC = () => {
  const { language } = useApp();

  const cards = [
    {
      icon: <Leaf className="w-6 h-6 text-emerald-400" />,
      titleUk: 'Свіжість Щоранку 🥬',
      titleEn: 'Fresh Ingredients Daily',
      descUk: 'Ніяких заморозок чи напівфабрикатів. М’ясо маринується за фірмовим рецептом, а овочі нарізаються кілька разів на день для ідеального хрусту.',
      descEn: 'Zero pre-frozen shortcuts. Premium poultry is marinated daily, with crispy garden-vegetables sliced non-stop for organic goodness.',
      size: 'md:col-span-8'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-500" />,
      titleUk: 'Той Самий Часниковий Соус 🧄',
      titleEn: 'Signature Cult Garlic Sauce',
      descUk: 'Секретний рецепт, який завоював серця мешканців Коломиї. Жодного магазинно-хімічного майонезу — тільки натуральні основи та свіжий пряний часничок.',
      descEn: 'The pride of the team. Our proprietary garlic cream recipe bypasses store-bought chemicals in favor of real herbs and organic ingredients.',
      size: 'md:col-span-4'
    },
    {
      icon: <Timer className="w-6 h-6 text-red-400" />,
      titleUk: 'Швидкість без Втрати Якості ⚡',
      titleEn: 'Express Takeaway & Fast Service ⚡',
      descUk: 'Гарячий лаваш потрапляє у твої руки вже за 6–8 хвилин від моменту замовлення. Ми оптимізували кожен крок, щоб зберегти твій час.',
      descEn: 'Blazing hot layers reach your hands within 6-8 mins tops. Optimized grills preserve temperature and speed with zero compromise.',
      size: 'md:col-span-4'
    },
    {
      icon: <Weight className="w-6 h-6 text-yellow-500" />,
      titleUk: 'Чесна Велика Порція ⚖️',
      titleEn: 'Giant Generous Portions',
      descUk: 'Ми закручуємо суттєву, повнотілу шаурму, яка дарує насиченість на довгі години. Жодних порожніх порожнин у лаваші — м’ясо до самого кінця!',
      descEn: 'Hearty wraps packed corner-to-corner. Satiety that powers you for hours, guaranteeing delicious meat in absolutely every single bite.',
      size: 'md:col-span-8'
    }
  ];

  return (
    <section id="why-us" className="relative bg-zinc-950 py-24 px-4 sm:px-8 border-b border-white/5 overflow-hidden">
      
      {/* Visual background lights */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Title Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-amber-500">
              {language === 'uk' ? 'БЕЗКОМПРОМІСНІ СТАНДАРТИ' : 'UNCOMPROMISING REPUTATION'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mt-2">
              {language === 'uk' ? 'Стріт-фуд за стандартами люксу' : 'Street food on premium terms'}
            </h2>
          </div>
          <p className="text-zinc-400 text-sm max-w-sm">
            {language === 'uk'
              ? 'Ми впевнені, що швидка вулична їжа зобов’язана бути корисною, ароматною та естетичною. Переконайся в цьому сам.'
              : 'Speed doesn’t exclude gastronomy. Premium ingredients prepare an elite street-food revolution in Kolomyia.'}
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${card.size} bg-zinc-900/40 border border-white/5 hover:border-red-500/20 p-6 sm:p-8 rounded-2xl flex flex-col justify-between transition-colors shadow-xl`}
            >
              <div>
                <div className="bg-white/5 max-w-max p-3 rounded-xl border border-white/10 mb-6 shadow">
                  {card.icon}
                </div>
                <h3 className="text-xl font-black text-white tracking-tight">
                  {language === 'uk' ? card.titleUk : card.titleEn}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mt-3">
                  {language === 'uk' ? card.descUk : card.descEn}
                </p>
              </div>

              {/* Decorative detail */}
              <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center">
                <span className="text-[10px] uppercase text-white/20 tracking-widest font-mono">
                  наша FOOD • STANDARDS
                </span>
                <Heart className="w-3.5 h-3.5 text-red-600/30 group-hover:text-red-600 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Brand Promise Banner */}
        <div className="mt-12 bg-gradient-to-r from-red-950/20 via-neutral-900 to-red-950/20 border border-red-900/20 rounded-2xl p-6 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-black uppercase text-red-500 tracking-wider">
              {language === 'uk' ? 'СЕРТИФІКОВАНА КУЛІНАРІЯ' : 'HYGIENE & TASTE OATH'}
            </span>
            <p className="text-sm text-zinc-300 mt-1 leading-relaxed">
              {language === 'uk'
                ? 'Ми цінуємо твою довіру. Кожна робоча поверхня стерилізується кожні 2 години, а наші кухарі готують виключно в рукавичках та респіраторних масках для абсолютної безпеки.'
                : 'Your trust is our legacy. Strict sanitization loops trigger every 2 hours, utilizing medical grade hygiene gloves and protective apparel for perfect food safety.'}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
