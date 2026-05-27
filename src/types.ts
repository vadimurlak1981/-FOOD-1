export type Category = 'shawarma' | 'sides' | 'sauces' | 'drinks';

export interface MenuItem {
  id: string;
  nameUk: string;
  nameEn: string;
  descriptionUk: string;
  descriptionEn: string;
  price: number;
  image: string;
  category: Category;
  badgeUk?: string;
  badgeEn?: string;
  popular?: boolean;
}

export type ShawarmaSize = 'standard' | 'double' | 'king';
export type ShawarmaSauceIntensity = 'custom' | 'normal' | 'legendary_garlic' | 'xtra_vampire_slayer';

export interface CustomizedShawarma {
  size: ShawarmaSize;
  sauceIntensity: ShawarmaSauceIntensity;
  meatType: 'chicken' | 'beef' | 'mix';
  extras: string[]; // IDs of extra toppings chosen
}

export interface CartItem {
  id: string; // unique item id including custom configurations
  menuItemId: string;
  nameUk: string;
  nameEn: string;
  price: number;
  quantity: number;
  customization?: CustomizedShawarma;
  image: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  textUk: string;
  textEn: string;
  date: string;
  source: string;
}
