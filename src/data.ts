import { MenuItem, Review } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'sh_classic',
    nameUk: 'Шаурма Класична',
    nameEn: 'Classic Shawarma',
    descriptionUk: 'Соковита курка гриль, свіжа хрумка капуста, огірки, томати та наш легендарний сімейний часниковий соус на кришталево тонкому лаваші.',
    descriptionEn: 'Juicy rotisserie chicken, crisp cabbage, cucumbers, ripe tomatoes, and our family secret garlic sauce rolled in toasted pita bread.',
    price: 135,
    image: '/src/assets/images/shawarma_premium_1779737971612.png',
    category: 'shawarma',
    badgeUk: 'Класика',
    badgeEn: 'Classic Choice',
    popular: false
  },
  {
    id: 'sh_nasha',
    nameUk: 'Шаурма "наша FOOD"',
    nameEn: 'Signature "Nasha FOOD" Shawarma',
    descriptionUk: 'Максимум добірного м’яса, сир моцарела, хрумка карамелізована цибуля, свіжа зелень та екстра-порція фірмового часникового соусу. Шедевр смаку.',
    descriptionEn: 'Double rotisserie meat, melted mozzarella, caramelized onions, fresh herbs, and an extra splash of our legendary garlic sauce. Ultimate craft.',
    price: 185,
    image: '/src/assets/images/nasha_food_hero_1779737953067.png',
    category: 'shawarma',
    badgeUk: 'Бестселер 🔥',
    badgeEn: 'Bestseller',
    popular: true
  },
  {
    id: 'sh_cheese',
    nameUk: 'Шаурма Мегасирна з Часником',
    nameEn: 'Double Cheese & Garlic Shawarma',
    descriptionUk: 'Квартет сирів (моцарела, чеддер, сулугуні, пармезан), поєднаний з фірмовим часниковим соусом та ніжним філе гриль. Сексуально розплавлене задоволення.',
    descriptionEn: 'Melted cheese combo (mozzarella, cheddar, sulguni, parmesan), paired elegantly with rotisserie chicken and signature garlic sauce. Absurdly cheesy.',
    price: 170,
    image: '/src/assets/images/shawarma_premium_1779737971612.png',
    category: 'shawarma',
    badgeUk: 'Сирний Бум 🧀',
    badgeEn: 'Cheesy Delight',
    popular: false
  },
  {
    id: 'sh_spicy',
    nameUk: 'Гостра Часникова Шаурма',
    nameEn: 'Vampire Slayer Spicy Shawarma',
    descriptionUk: 'Коломийський вогонь: соковите м’ясо, гострі перці халапеньйо, хрумкі чіпси цибулі, пікантний кунжутними соус та потрійна доза часникового соусу.',
    descriptionEn: 'Kolomyia fiery style: spicy jalapeños, crispy onion bits, spicy sauce, and active garlic splash. Only for real flavor seekers.',
    price: 160,
    image: '/src/assets/images/shawarma_premium_1779737971612.png',
    category: 'shawarma',
    badgeUk: 'Дуже Гостро 🌶️',
    badgeEn: 'Extremely Spicy',
    popular: true
  },
  {
    id: 'fries_l',
    nameUk: 'Золота Картопля Фрі (L)',
    nameEn: 'Crispy French Fries (L)',
    descriptionUk: 'Гаряча, ідеально хрустка зовні та ніжна всередині картопелька, посипана морською сіллю та дрібкою ароматного чебрецю.',
    descriptionEn: 'Sizzling hot fries, golden crispy outside and fluffy inside, served with a dusting of sea salt and aromatic thyme.',
    price: 75,
    image: '/src/assets/images/french_fries_premium_1779737989563.png',
    category: 'sides',
    badgeUk: 'Хрумка',
    badgeEn: 'Perfect Crunch',
    popular: false
  },
  {
    id: 'sauce_garlic',
    nameUk: 'Легендарний Часниковий Соус (Фірмовий)',
    nameEn: 'The Legendary Secret Garlic Sauce',
    descriptionUk: 'Той самий культовий часниковий соус у фірмовій баночці. Секретний рецепт, який завоював любов Коломиї. Свіжа зелень та насичена ніжність.',
    descriptionEn: 'The core legend. Extra jar of our secret home-crafted garlic paste. Rich, creamy, intense flavor that Kolomyia talks about.',
    price: 30,
    image: '/src/assets/images/garlic_sauce_premium_1779738007320.png',
    category: 'sauces',
    badgeUk: 'Душа бренду 🌟',
    badgeEn: 'The Legend',
    popular: true
  },
  {
    id: 'juice_cola',
    nameUk: 'Coca-Cola Zero (Скляна пляшка)',
    nameEn: 'Coca-Cola Zero (Glass Bottle)',
    descriptionUk: 'Крижана класика без цукру у преміум склі — ідеально відтіняє пікантність гарячої шаурми.',
    descriptionEn: 'Ice-cold premium glass bottle Coca-Cola Zero. The perfect visual and temperature contrast to hot juicy wraps.',
    price: 55,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400',
    category: 'drinks'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev_1',
    author: 'Артем Д.',
    rating: 5,
    textUk: 'Найкраща шаурма в Коломиї 🤯 М’ясо соковите, соусу не шкодують, а часниковий — це просто релігія якась. Тепер тільки сюди!',
    textEn: 'Hands down the best shawarma in Kolomyia. Juicy meat, overflowing with sauce, and that garlic cream is literally a religious experience. Big recommendations!',
    date: '24.05.2026',
    source: 'Google Maps Reviews'
  },
  {
    id: 'rev_2',
    author: 'Ірина К.',
    rating: 5,
    textUk: 'Часниковий соус просто топ! Замовляла шаурму Наша FOOD з моцарелою — вона просто тане в роті. Дуже смачно і швидко приготували, за 6 хвилин.',
    textEn: 'Garlic sauce is pure fire! Ordered the Signature Shawarma with mozzarella — literally melted in my mouth. Super delicious and speedy, ready under 6 minutes!',
    date: '18.05.2026',
    source: 'Google Maps Reviews'
  },
  {
    id: 'rev_3',
    author: 'Максим Коваль',
    rating: 4.8,
    textUk: 'Такої шаурми в нас ще не було. Зручне місце, смак фантастичний, порції великі, реально наїдаєшся. Була затримка в часі роботи минулого тижня, але виправились.',
    textEn: 'We never had shawarma like this in town. Fantastic taste, huge filling, actually keeps you full. Had some minor scheduling issue last week, but fully fixed now.',
    date: '12.05.2026',
    source: 'Google Maps Reviews'
  },
  {
    id: 'rev_4',
    author: 'Олена В.',
    rating: 5,
    textUk: 'Дуже смачно! Рекомендую додавати подвійне м’ясо. Часниковий дип до фрі — це окремий вид задоволення 🍟 Буду замовляти ще.',
    textEn: 'Absolutely delicious! Strongly advise ordering double meat. The garlic dip alongside french fries is a supreme experience on its own.',
    date: '02.05.2026',
    source: 'Google Maps Reviews'
  }
];

export const EXTRAS = [
  { id: 'ext_cheddar', nameUk: 'Розплавлений Чеддер 🧀', nameEn: 'Melted Cheddar', price: 25 },
  { id: 'ext_jalapeno', nameUk: 'Пекельний Халапеньйо 🌶️', nameEn: 'Spicy Jalapeños', price: 15 },
  { id: 'ext_meat', nameUk: 'Подвійне М’ясо 🍗', nameEn: 'Double Chicken/Beef', price: 45 },
  { id: 'ext_bacon', nameUk: 'Хрумкий Бекон 🥓', nameEn: 'Crispy Bacon strips', price: 30 },
  { id: 'ext_sauce', nameUk: 'Екстра Часникова Бомба 🧄', nameEn: 'Legendary Garlic Boost', price: 15 }
];
