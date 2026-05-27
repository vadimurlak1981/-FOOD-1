import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Minus, Plus, Trash2, ShoppingBag, Truck, Gift, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const {
    language,
    cart,
    cartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    isRestaurantOpen
  } = useApp();

  const deliveryMode = 'takeaway';
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [cookingStep, setCookingStep] = useState(0);
  const [progressValue, setProgressValue] = useState(25);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const grandTotal = subtotal;

  // Cooking progress timer simulation for the "Craving Confirmation" popup
  useEffect(() => {
    if (orderSubmitted) {
      const interval = setInterval(() => {
        setCookingStep((prev) => {
          if (prev >= 3) {
            clearInterval(interval);
            return 3;
          }
          setProgressValue((curr) => curr + 25);
          return prev + 1;
        });
      }, 4000);
      return () => clearInterval(interval);
    } else {
      setCookingStep(0);
      setProgressValue(25);
    }
  }, [orderSubmitted]);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userPhone.trim()) return;

    setOrderSubmitted(true);
  };

  const handleResetCookingFlow = () => {
    setOrderSubmitted(false);
    clearCart();
    setCartOpen(false);
  };

  const cookingSteps = [
    { uk: 'Ріжемо найсвіжіші томати й зелень 🥬', en: 'Chopping fresh crisp veggies and greens 🥬' },
    { uk: 'Накладаємо соковите засмажене м’ясо гриль 🍗', en: 'Double-stacking sizzling rotisserie meat 🍗' },
    { uk: 'Заливаємо легендарним часниковим соусом! 🧄', en: 'Overflowing with secret cult garlic cream! 🧄' },
    { uk: 'Запікаємо лаваш до золотого хрумкого стану ⭐', en: 'Toasting pita wrap to perfect golden crunch ⭐' }
  ];

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
      
      {/* Dark blur overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        exit={{ opacity: 0 }}
        onClick={() => !orderSubmitted && setCartOpen(false)}
        className="fixed inset-0 bg-black backdrop-blur-sm"
      />

      {/* Cart Slider Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="relative w-full max-w-lg bg-neutral-950 border-l border-white/10 shadow-2xl h-full flex flex-col justify-between z-10 overflow-hidden"
      >
        
        {/* HEADER RAIL */}
        <div className="py-4 px-6 bg-zinc-950 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-red-500 animate-pulse" />
            <h2 className="text-lg font-black text-white uppercase tracking-wider">
              {language === 'uk' ? 'Твій Ситний Кошик' : 'Your Satiety Basket'}
            </h2>
          </div>
          <button
            onClick={() => !orderSubmitted && setCartOpen(false)}
            className="text-white/40 hover:text-white hover:bg-white/5 p-1 rounded-full transition-all"
          >
            <X className="w-5.5 h-5.5" />
          </button>
        </div>

        {/* PRIMARY SCROLLABLE CARD BODY */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {cart.length === 0 ? (
            
            // Empty State
            <div className="h-full flex flex-col items-center justify-center text-center py-20">
              <span className="text-5xl mb-4 text-center select-none">🌯</span>
              <h3 className="text-base font-black text-white">
                {language === 'uk' ? 'Тут кулінарна пустка...' : 'Your basket is cold'}
              </h3>
              <p className="text-xs text-zinc-500 mt-2 max-w-xs leading-relaxed">
                {language === 'uk'
                  ? 'Додай нашу запашну шаурму чи хрумку картопельку з часниковим соусом, щоб вгамувати звірячий апетит!'
                  : 'Add our custom gritted wraps or gold crispy fries to spark off the ultimate flavor ride!'}
              </p>
              
              <button
                onClick={() => setCartOpen(false)}
                className="mt-6 bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs py-2.5 px-6 rounded transition-all uppercase tracking-wider"
              >
                {language === 'uk' ? 'Перейти до вибору' : 'Choose food now'}
              </button>
            </div>

          ) : (
            
            // Active Items List
            <div className="space-y-4">
              {cart.map((cartItem) => {
                // Customized features breakdown label
                const custom = cartItem.customization;
                return (
                  <div
                    key={cartItem.id}
                    className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900/40 border border-white/5 shadow-md relative group hover:border-white/10 transition-colors"
                  >
                    
                    {/* Tiny delete trigger */}
                    <button
                      onClick={() => removeFromCart(cartItem.id)}
                      className="absolute top-3 right-3 text-white/30 hover:text-red-500 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <img
                      src={cartItem.image}
                      alt={cartItem.nameUk}
                      className="w-14 h-14 object-cover rounded-lg border border-white/10 shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 pr-6">
                      <h4 className="text-sm font-black text-white leading-tight">
                        {language === 'uk' ? cartItem.nameUk : cartItem.nameEn}
                      </h4>
                      
                      {/* Detailed list of configurations chosen by the user in customizer */}
                      {custom && (
                        <div className="mt-1 text-[10px] text-amber-500 space-y-0.5 font-medium leading-relaxed bg-black/40 border border-amber-500/10 rounded p-1.5">
                          <div>
                            <span className="text-white/40 uppercase tracking-widest text-[8px] mr-1">{language === 'uk' ? 'Розмір:' : 'Size:'}</span>
                            <span className="font-bold uppercase text-[9px]">{custom.size === 'standard' ? (language === 'uk' ? 'Стандарт' : 'Standard') : custom.size === 'double' ? (language === 'uk' ? 'Дабл Макс' : 'Double') : (language === 'uk' ? 'Королівська' : 'King')}</span>
                          </div>
                          <div>
                            <span className="text-white/40 uppercase tracking-widest text-[8px] mr-1">{language === 'uk' ? 'М’ясо:' : 'Filling:'}</span>
                            <span>{custom.meatType === 'chicken' ? (language === 'uk' ? 'Курка' : 'Chicken') : custom.meatType === 'beef' ? (language === 'uk' ? 'Яловичина' : 'Beef') : (language === 'uk' ? 'Мікс' : 'Mixed')}</span>
                          </div>
                          <div>
                            <span className="text-white/40 uppercase tracking-widest text-[8px] mr-1">{language === 'uk' ? 'Часник:' : 'Garlic:'}</span>
                            <span className="underline font-black text-white">{custom.sauceIntensity === 'custom' ? (language === 'uk' ? 'Легкий' : 'Mild') : custom.sauceIntensity === 'normal' ? (language === 'uk' ? 'Середній' : 'Classic') : custom.sauceIntensity === 'legendary_garlic' ? (language === 'uk' ? 'Легенда Коломиї' : 'Kolomyia Cult') : (language === 'uk' ? 'Винищувач Вампірів 🧛‍♂️' : 'Vampire Slayer')}</span>
                          </div>
                          {custom.extras.length > 0 && (
                            <div>
                              <span className="text-white/40 uppercase tracking-widest text-[8px] mr-1">{language === 'uk' ? 'Додатки:' : 'Extras:'}</span>
                              <span className="text-white/80">
                                {custom.extras.map(eId => {
                                  if (eId === 'ext_cheddar') return language === 'uk' ? '+Чеддер 🧀' : '+Cheddar';
                                  if (eId === 'ext_jalapeno') return language === 'uk' ? '+Халапеньйо 🌶️' : '+Jalapeno';
                                  if (eId === 'ext_meat') return language === 'uk' ? '+М’ясо' : '+Extra Meat';
                                  if (eId === 'ext_bacon') return language === 'uk' ? '+Бекон 🥓' : '+Bacon';
                                  if (eId === 'ext_sauce') return language === 'uk' ? '+Часниковий буст' : '+Garlic Boost';
                                  return '';
                                }).filter(Boolean).join(', ')}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Math prices and selectors */}
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-sm font-extrabold text-amber-500 font-mono">
                          {cartItem.price * cartItem.quantity} ₴
                        </span>

                        <div className="flex items-center gap-2.5 border border-white/5 rounded px-2 py-1 bg-black/40 text-xs">
                          <button
                            onClick={() => updateQuantity(cartItem.id, -1)}
                            className="text-white/50 hover:text-white p-0.5"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-bold font-mono text-white text-xs">{cartItem.quantity}</span>
                          <button
                            onClick={() => updateQuantity(cartItem.id, 1)}
                            className="text-white/50 hover:text-white p-0.5"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* FOOTER FORM AND TOTALS (IF NOT SUBMITTED) */}
        {cart.length > 0 && !orderSubmitted && (
          <div className="bg-zinc-950 border-t border-white/10 p-6 space-y-4">
            
            {/* Takeaway Info Block */}
            <div className="bg-zinc-900/60 border border-amber-500/20 p-3.5 rounded-xl text-center space-y-1">
              <span className="font-extrabold text-amber-500 uppercase tracking-widest block text-[10px]">
                🎒 {language === 'uk' ? 'САМОВИВІЗ З ЗАКЛАДУ • БЕЗКОШТОВНО' : 'STORE TAKEAWAY • FREE'}
              </span>
              <span className="text-white font-extrabold text-xs block">
                {language === 'uk' ? 'Коломия • вул. Івана Франка, 12' : 'Kolomyia • 12 Ivan Franko Str.'}
              </span>
              <span className="text-zinc-400 text-[10px] block leading-normal font-mono">
                {language === 'uk' ? 'Гаряча їжа буде надійно запакована та готова!' : 'Sizzling hot wraps securely packed and ready!'}
              </span>
            </div>

            {/* Quick checkout forms */}
            <form onSubmit={handleCheckoutSubmit} className="space-y-3">
              <div>
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder={language === 'uk' ? 'Твоє ім’я' : 'Your name'}
                  className="w-full bg-black/50 border border-white/10 rounded-lg py-2.5 px-4 text-xs text-white placeholder-white/30 focus:border-red-500 focus:outline-none transition-all"
                />
              </div>

              <div>
                <input
                  type="tel"
                  required
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  placeholder={language === 'uk' ? 'Телефон (+380...)' : 'Phone number (+380...)'}
                  className="w-full bg-black/50 border border-white/10 rounded-lg py-2.5 px-4 text-xs text-white placeholder-white/30 focus:border-red-500 focus:outline-none transition-all"
                />
              </div>

              {/* Price Calculations */}
              <div className="border-t border-white/5 pt-3 mt-4 space-y-1.5 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>{language === 'uk' ? 'Сума меню:' : 'Subtotal:'}</span>
                  <span className="font-mono text-white/80">{subtotal} ₴</span>
                </div>
                <div className="flex justify-between border-t border-white/5 pt-2 text-sm justify-between">
                  <span className="font-black text-white">{language === 'uk' ? 'ЗАГАЛЬНА СУМА:' : 'TOTAL ACCRUED:'}</span>
                  <span className="font-black font-mono text-amber-500 text-base">{grandTotal} ₴</span>
                </div>
              </div>

              {/* Checkout confirmation CTA */}
              <button
                type="submit"
                className="w-full mt-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold text-xs py-3.5 rounded-lg uppercase tracking-wider transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-red-600/10"
              >
                {language === 'uk' ? 'Підтвердити замовлення' : 'Confirm Order / Cook Now'}
              </button>
            </form>

            <div className="text-[10px] text-zinc-500 text-center leading-relaxed">
              {language === 'uk' 
                ? 'Надсилаючи, ви погоджуєтеся на моментальний дзвінок нашого чарівного оператора для уточнення.' 
                : 'By sending, you authorize instant manager callbacks to lock and wrap up your hunger.'}
            </div>

          </div>
        )}

        {/* INTERACTIVE TRACKING OVERLAY (ONCE ORDER IS PLACED) */}
        <AnimatePresence>
          {orderSubmitted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-neutral-950 z-20 flex flex-col justify-between p-8 text-center"
            >
              {/* Top empty bar for margin */}
              <div />

              {/* Core visual layout */}
              <div className="space-y-6">
                
                {/* Visual success logo */}
                <div className="relative mx-auto w-20 h-20 rounded-full bg-red-600/10 border border-red-500/30 flex items-center justify-center text-4xl shadow-xl">
                  {cookingStep === 3 ? '🏆' : '🔥'}
                  <span className="absolute inset-0 rounded-full border border-red-500 border-dashed animate-spin duration-1000 origin-center" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">
                    {language === 'uk' ? 'Голод? Ми вже готуємо твою шаурму!' : 'Hungry? Your wrap is on the grill!'}
                  </h3>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                    {language === 'uk'
                      ? `Твоє замовлення успішно створено. Наш кухар у Коломиї робить усе можливе, щоб задовільнити твої найсміливіші очікування.`
                      : `We locked your details. Our master chefs in Kolomyia are stacking layers onto the flatbread right under our strict quality codes.`}
                  </p>
                </div>

                {/* Simulated dynamic progress bar with stats */}
                <div className="bg-zinc-900 border border-white/5 rounded-2xl p-5 max-w-sm mx-auto space-y-4 shadow-lg text-left">
                  
                  {/* Progress Line */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] uppercase text-zinc-500 font-mono tracking-wider">
                      <span>{language === 'uk' ? 'ПРОГРЕС КУХНІ' : 'KITCHEN METRICS'}</span>
                      <span className="text-white font-bold">{progressValue}%</span>
                    </div>
                    <div className="bg-white/5 h-2 w-full rounded-full overflow-hidden border border-white/10">
                      <motion.div 
                        initial={{ width: '0%' }}
                        animate={{ width: `${progressValue}%` }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-r from-red-600 to-amber-500 h-full rounded-full"
                      />
                    </div>
                  </div>

                  {/* Active Step Ticker */}
                  <div className="space-y-3">
                    {cookingSteps.map((step, idx) => {
                      const isActive = idx === cookingStep;
                      const isDone = idx < cookingStep;
                      return (
                        <div key={idx} className="flex items-center gap-3 text-xs transition-all">
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${
                            isActive ? 'border-amber-500 bg-amber-500/10 text-amber-500 animate-pulse font-extrabold' : isDone ? 'border-emerald-500 bg-emerald-500 text-black font-bold' : 'border-white/10 text-white/30'
                          }`}>
                            {isDone ? '✓' : idx + 1}
                          </div>
                          <span className={`${isActive ? 'text-white font-black' : isDone ? 'text-white/60 line-through' : 'text-white/30'}`}>
                            {language === 'uk' ? step.uk : step.en}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                </div>

              </div>

              {/* Interactive Reset/Dismiss CTA at bottom */}
              <div className="space-y-4">
                <div className="bg-amber-500/10 border border-amber-500/20 rounded p-3 text-xs text-amber-500 max-w-sm mx-auto font-mono text-left space-y-1">
                  <div className="font-extrabold">{language === 'uk' ? 'ДЕТАЛІ ОДЕРЖУВАЧА:' : 'DESTINATION LOG:'}</div>
                  <div className="text-white/80">{language === 'uk' ? 'Клієнт:' : 'Client:'} {userName} ({userPhone})</div>
                  <div className="text-white/80">{language === 'uk' ? 'Самовивіз:' : 'Pickup:'} {language === 'uk' ? 'вул. Івана Франка, 12, Коломія' : '12 Ivan Franko Str., Kolomyia'}</div>
                  <div className="text-white font-black text-right border-t border-white/5 pt-1.5 mt-1.5 text-xs">{language === 'uk' ? 'БЮДЖЕТ ДО СПЛАТИ:' : 'CASH BUDGET TO PAY:'} {grandTotal} ₴</div>
                </div>

                <button
                  id="checkout-success-dismiss"
                  onClick={handleResetCookingFlow}
                  className="w-full max-w-sm mx-auto bg-gradient-to-r from-zinc-800 to-zinc-900 hover:from-zinc-700 hover:to-zinc-800 border border-white/10 text-white font-bold text-xs py-3.5 rounded-lg uppercase tracking-wider transition-all"
                >
                  {language === 'uk' ? 'Скласти нове замовлення' : 'Add another fresh meal'}
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
};
