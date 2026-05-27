import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, MenuItem, Review, CustomizedShawarma } from '../types';
import { REVIEWS } from '../data';

interface AppContextType {
  language: 'uk' | 'en';
  setLanguage: (lang: 'uk' | 'en') => void;
  cart: CartItem[];
  addToCart: (item: MenuItem, customization?: CustomizedShawarma, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'source'>) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  isRestaurantOpen: boolean;
  timeLeftToClose: string;
  activePage: 'home' | 'menu';
  setActivePage: (page: 'home' | 'menu') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'uk' | 'en'>('uk');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('nasha_food_reviews');
    return saved ? JSON.parse(saved) : REVIEWS;
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [isRestaurantOpen, setIsRestaurantOpen] = useState(true);
  const [timeLeftToClose, setTimeLeftToClose] = useState('');
  const [activePage, setActivePage] = useState<'home' | 'menu'>('home');

  // Persist reviews locally
  useEffect(() => {
    localStorage.setItem('nasha_food_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Kyiv Standard Time Live Working Hours check (09:00 - 23:00)
  useEffect(() => {
    const checkStatus = () => {
      // Get current date in Kyiv timezone
      const kyivDate = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Kiev" }));
      const hours = kyivDate.getHours();
      const minutes = kyivDate.getMinutes();
      
      const currentMinutesSinceMidnight = hours * 60 + minutes;
      const openMinutes = 9 * 60; // 09:00
      const closeMinutes = 23 * 60; // 23:00

      const isOpenNow = currentMinutesSinceMidnight >= openMinutes && currentMinutesSinceMidnight < closeMinutes;
      setIsRestaurantOpen(isOpenNow);

      if (isOpenNow) {
        const remainingMinutes = closeMinutes - currentMinutesSinceMidnight;
        const h = Math.floor(remainingMinutes / 60);
        const m = remainingMinutes % 60;
        setTimeLeftToClose(
          language === 'uk'
            ? `Зачиняється через ${h > 0 ? `${h} год ` : ''}${m} хв`
            : `Closes in ${h > 0 ? `${h}h ` : ''}${m}m`
        );
      } else {
        const nextOpenTime = 9 * 60;
        let waitMinutes = 0;
        if (currentMinutesSinceMidnight < openMinutes) {
          waitMinutes = openMinutes - currentMinutesSinceMidnight;
        } else {
          waitMinutes = (24 * 60 - currentMinutesSinceMidnight) + openMinutes;
        }
        const h = Math.floor(waitMinutes / 60);
        const m = waitMinutes % 60;
        setTimeLeftToClose(
          language === 'uk'
            ? `Відчиняється через ${h > 0 ? `${h} год ` : ''}${m} хв`
            : `Opens in ${h > 0 ? `${h}h ` : ''}${m}m`
        );
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, [language]);

  const addToCart = (item: MenuItem, customization?: CustomizedShawarma, quantity = 1) => {
    setCart((prevCart) => {
      // Core customization matching logic
      const customizationKey = customization
        ? `${customization.size}-${customization.meatType}-${customization.sauceIntensity}-${customization.extras.sort().join(',')}`
        : 'standard';
      
      const cartItemId = `${item.id}-${customizationKey}`;

      // Calculate localized individual price
      let basePrice = item.price;
      if (customization) {
        // Upgrade size price
        if (customization.size === 'double') basePrice += 40;
        if (customization.size === 'king') basePrice += 80;
        
        // Upgrade meat price
        if (customization.meatType === 'beef') basePrice += 20;
        if (customization.meatType === 'mix') basePrice += 30;

        // Extra additions
        // Standard toppings:
        // Cheddar (25), Jalapeno (15), Double Meat (45), Bacon (30), Garlic Boost (15)
        customization.extras.forEach(extraId => {
          if (extraId === 'ext_cheddar') basePrice += 25;
          if (extraId === 'ext_jalapeno') basePrice += 15;
          if (extraId === 'ext_meat') basePrice += 45;
          if (extraId === 'ext_bacon') basePrice += 30;
          if (extraId === 'ext_sauce') basePrice += 15;
        });
      }

      const existingIndex = prevCart.findIndex((ci) => ci.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      const newItem: CartItem = {
        id: cartItemId,
        menuItemId: item.id,
        nameUk: item.nameUk + (customization ? ` (Крафт)` : ''),
        nameEn: item.nameEn + (customization ? ` (Craft)` : ''),
        price: basePrice,
        quantity,
        customization,
        image: item.image,
      };

      return [...prevCart, newItem];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const addReview = (review: Omit<Review, 'id' | 'date' | 'source'>) => {
    const newRev: Review = {
      ...review,
      id: `custom_rev_${Date.now()}`,
      date: new Date().toLocaleDateString('uk-UA'),
      source: 'Verified Customer / Клієнт',
    };
    setReviews((prev) => [newRev, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        reviews,
        addReview,
        cartOpen,
        setCartOpen,
        isRestaurantOpen,
        timeLeftToClose,
        activePage,
        setActivePage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used inside AppProvider');
  return context;
};
