// Telegram WebApp інтеграція
const tg = window.Telegram?.WebApp;
if (tg) {
  tg.expand();
  tg.setHeaderColor('#2e3192');
  tg.setBackgroundColor('#1b1464');
}

const cardModal    = document.getElementById('card-modal');
const cardModalImg = document.getElementById('card-modal-img');

// === Повна мапа карт (та сама, що в основному вебапі) ===
const CARD_MAP = {
  "The Fool": { ua: "🤹‍♂️ Блазень", img: "images/cards/the_fool_upright.jpg" },
  "The Magician": { ua: "🪄 Маг", img: "images/cards/the_magician_upright.jpg" },
  "The High Priestess": { ua: "🌙 Жриця", img: "images/cards/the_high_priestess_upright.jpg" },
  "The Empress": { ua: "🌸 Імператриця", img: "images/cards/the_empress_upright.jpg" },
  "The Emperor": { ua: "👑 Імператор", img: "images/cards/the_emperor_upright.jpg" },
  "The Hierophant": { ua: "📜 Ієрофант", img: "images/cards/the_hierophant_upright.jpg" },
  "The Lovers": { ua: "💞 Закохані", img: "images/cards/the_lovers_upright.jpg" },
  "The Chariot": { ua: "🚗 Колісниця", img: "images/cards/the_chariot_upright.jpg" },
  "Strength": { ua: "🦁 Сила", img: "images/cards/strength_upright.jpg" },
  "The Hermit": { ua: "🕯 Відлюдник", img: "images/cards/the_hermit_upright.jpg" },
  "Wheel of Fortune": { ua: "🎡 Колесо Фортуни", img: "images/cards/wheel_of_fortune_upright.jpg" },
  "Justice": { ua: "⚖️ Справедливість", img: "images/cards/justice_upright.jpg" },
  "The Hanged Man": { ua: "🪶 Повішений", img: "images/cards/the_hanged_man_upright.jpg" },
  "Death": { ua: "💀 Смерть", img: "images/cards/death_upright.jpg" },
  "Temperance": { ua: "🌈 Помірність", img: "images/cards/temperance_upright.jpg" },
  "The Devil": { ua: "😈 Диявол", img: "images/cards/the_devil_upright.jpg" },
  "The Tower": { ua: "🏰 Вежа", img: "images/cards/the_tower_upright.jpg" },
  "The Star": { ua: "⭐ Зірка", img: "images/cards/the_star_upright.jpg" },
  "The Moon": { ua: "🌕 Місяць", img: "images/cards/the_moon_upright.jpg" },
  "The Sun": { ua: "🌞 Сонце", img: "images/cards/the_sun_upright.jpg" },
  "Judgement": { ua: "🎺 Суд", img: "images/cards/judgement_upright.jpg" },
  "The World": { ua: "🌍 Світ", img: "images/cards/the_world_upright.jpg" },

  // WANDS
  "Ace of Wands": { ua: "🔥 Туз Жезлів", img: "images/cards/wands_ace.jpg" },
  "Two of Wands": { ua: "🔥 Двійка Жезлів", img: "images/cards/wands_2.jpg" },
  "Three of Wands": { ua: "🔥 Трійка Жезлів", img: "images/cards/wands_3.jpg" },
  "Four of Wands": { ua: "🔥 Четвірка Жезлів", img: "images/cards/wands_4.jpg" },
  "Five of Wands": { ua: "🔥 П’ятірка Жезлів", img: "images/cards/wands_5.jpg" },
  "Six of Wands": { ua: "🔥 Шістка Жезлів", img: "images/cards/wands_6.jpg" },
  "Seven of Wands": { ua: "🔥 Сімка Жезлів", img: "images/cards/wands_7.jpg" },
  "Eight of Wands": { ua: "🔥 Вісімка Жезлів", img: "images/cards/wands_8.jpg" },
  "Nine of Wands": { ua: "🔥 Дев’ятка Жезлів", img: "images/cards/wands_9.jpg" },
  "Ten of Wands": { ua: "🔥 Десятка Жезлів", img: "images/cards/wands_10.jpg" },
  "Page of Wands": { ua: "🔥 Паж Жезлів", img: "images/cards/wands_page.jpg" },
  "Knight of Wands": { ua: "🔥 Лицар Жезлів", img: "images/cards/wands_knight.jpg" },
  "Queen of Wands": { ua: "🔥 Королева Жезлів", img: "images/cards/wands_queen.jpg" },
  "King of Wands": { ua: "🔥 Король Жезлів", img: "images/cards/wands_king.jpg" },

  // PENTACLES
  "Ace of Pentacles": { ua: "⭐ Туз Пентаклів", img: "images/cards/pentacles_ace.jpg" },
  "Two of Pentacles": { ua: "⭐ Двійка Пентаклів", img: "images/cards/pentacles_2.jpg" },
  "Three of Pentacles": { ua: "⭐ Трійка Пентаклів", img: "images/cards/pentacles_3.jpg" },
  "Four of Pentacles": { ua: "⭐ Четвірка Пентаклів", img: "images/cards/pentacles_4.jpg" },
  "Five of Pentacles": { ua: "⭐ П’ятірка Пентаклів", img: "images/cards/pentacles_5.jpg" },
  "Six of Pentacles": { ua: "⭐ Шістка Пентаклів", img: "images/cards/pentacles_6.jpg" },
  "Seven of Pentacles": { ua: "⭐ Сімка Пентаклів", img: "images/cards/pentacles_7.jpg" },
  "Eight of Pentacles": { ua: "⭐ Вісімка Пентаклів", img: "images/cards/pentacles_8.jpg" },
  "Nine of Pentacles": { ua: "⭐ Дев’ятка Пентаклів", img: "images/cards/pentacles_9.jpg" },
  "Ten of Pentacles": { ua: "⭐ Десятка Пентаклів", img: "images/cards/pentacles_10.jpg" },
  "Page of Pentacles": { ua: "⭐ Паж Пентаклів", img: "images/cards/pentacles_page.jpg" },
  "Knight of Pentacles": { ua: "⭐ Лицар Пентаклів", img: "images/cards/pentacles_knight.jpg" },
  "Queen of Pentacles": { ua: "⭐ Королева Пентаклів", img: "images/cards/pentacles_queen.jpg" },
  "King of Pentacles": { ua: "⭐ Король Пентаклів", img: "images/cards/pentacles_king.jpg" },

  // SWORDS
  "Ace of Swords": { ua: "⚔️ Туз Мечів", img: "images/cards/swords_ace.jpg" },
  "Two of Swords": { ua: "⚔️ Двійка Мечів", img: "images/cards/swords_2.jpg" },
  "Three of Swords": { ua: "⚔️ Трійка Мечів", img: "images/cards/swords_3.jpg" },
  "Four of Swords": { ua: "⚔️ Четвірка Мечів", img: "images/cards/swords_4.jpg" },
  "Five of Swords": { ua: "⚔️ П’ятірка Мечів", img: "images/cards/swords_5.jpg" },
  "Six of Swords": { ua: "⚔️ Шістка Мечів", img: "images/cards/swords_6.jpg" },
  "Seven of Swords": { ua: "⚔️ Сімка Мечів", img: "images/cards/swords_7.jpg" },
  "Eight of Swords": { ua: "⚔️ Вісімка Мечів", img: "images/cards/swords_8.jpg" },
  "Nine of Swords": { ua: "⚔️ Дев’ятка Мечів", img: "images/cards/swords_9.jpg" },
  "Ten of Swords": { ua: "⚔️ Десятка Мечів", img: "images/cards/swords_10.jpg" },
  "Page of Swords": { ua: "⚔️ Паж Мечів", img: "images/cards/swords_page.jpg" },
  "Knight of Swords": { ua: "⚔️ Лицар Мечів", img: "images/cards/swords_knight.jpg" },
  "Queen of Swords": { ua: "⚔️ Королева Мечів", img: "images/cards/swords_queen.jpg" },
  "King of Swords": { ua: "⚔️ Король Мечів", img: "images/cards/swords_king.jpg" },

  // CUPS
  "Ace of Cups": { ua: "💧 Туз Кубків", img: "images/cards/cups_ace.jpg" },
  "Two of Cups": { ua: "💧 Двійка Кубків", img: "images/cards/cups_2.jpg" },
  "Three of Cups": { ua: "💧 Трійка Кубків", img: "images/cards/cups_3.jpg" },
  "Four of Cups": { ua: "💧 Четвірка Кубків", img: "images/cards/cups_4.jpg" },
  "Five of Cups": { ua: "💧 П’ятірка Кубків", img: "images/cards/cups_5.jpg" },
  "Six of Cups": { ua: "💧 Шістка Кубків", img: "images/cards/cups_6.jpg" },
  "Seven of Cups": { ua: "💧 Сімка Кубків", img: "images/cards/cups_7.jpg" },
  "Eight of Cups": { ua: "💧 Вісімка Кубків", img: "images/cards/cups_8.jpg" },
  "Nine of Cups": { ua: "💧 Дев’ятка Кубків", img: "images/cards/cups_9.jpg" },
  "Ten of Cups": { ua: "💧 Десятка Кубків", img: "images/cards/cups_10.jpg" },
  "Page of Cups": { ua: "💧 Паж Кубків", img: "images/cards/cups_page.jpg" },
  "Knight of Cups": { ua: "💧 Лицар Кубків", img: "images/cards/cups_knight.jpg" },
  "Queen of Cups": { ua: "💧 Королева Кубків", img: "images/cards/cups_queen.jpg" },
  "King of Cups": { ua: "💧 Король Кубків", img: "images/cards/cups_king.jpg" }
};

// Список старших арканів у правильному порядку
const MAJOR_NAMES = [
  "The Fool",
  "The Magician",
  "The High Priestess",
  "The Empress",
  "The Emperor",
  "The Hierophant",
  "The Lovers",
  "The Chariot",
  "Strength",
  "The Hermit",
  "Wheel of Fortune",
  "Justice",
  "The Hanged Man",
  "Death",
  "Temperance",
  "The Devil",
  "The Tower",
  "The Star",
  "The Moon",
  "The Sun",
  "Judgement",
  "The World"
];

const ALL_NAMES = Object.keys(CARD_MAP);

// Групи по мастях
const groups = {
  major: MAJOR_NAMES.filter(name => CARD_MAP[name]),
  wands: ALL_NAMES.filter(n => n.includes("Wands")),
  pentacles: ALL_NAMES.filter(n => n.includes("Pentacles")),
  swords: ALL_NAMES.filter(n => n.includes("Swords")),
  cups: ALL_NAMES.filter(n => n.includes("Cups"))
};

// Створення однієї картки для галереї
function createGalleryCard(name) {
  const info = CARD_MAP[name];
  if (!info) return null;

  const wrapper = document.createElement("div");
  wrapper.className = "gallery-card";
  wrapper.dataset.name = name;

  const card = document.createElement("div");
  card.className = "card flip";  // flip → показуємо передню сторону

  const inner = document.createElement("div");
  inner.className = "card-inner";

  const back = document.createElement("div");
  back.className = "face back";

  const front = document.createElement("div");
  front.className = "face front";
  front.style.backgroundImage = `url('${info.img}')`;

  inner.append(back, front);
  card.append(inner);

  const caption = document.createElement("div");
  caption.className = "card-caption";
  caption.textContent = info.ua;

  wrapper.append(card, caption);

  wrapper.addEventListener("click", () => openCardModal(name));

  return wrapper;
}

// Заповнення конкретної сітки
function populateGrid(gridId, names) {
  const grid = document.getElementById(gridId);
  if (!grid) return;

  names.forEach(name => {
    const node = createGalleryCard(name);
    if (node) grid.appendChild(node);
  });
}

// Модалка
function openCardModal(name) {
  const info = CARD_MAP[name];
  if (!info || !cardModal || !cardModalImg) return;

  cardModalImg.src = info.img;
  cardModalImg.style.transform = "none";
  cardModal.classList.remove("hidden");
}

function closeCardModal() {
  if (!cardModal) return;
  cardModal.classList.add("hidden");
}

// Закриття по кліку на бекдроп
if (cardModal) {
  cardModal.addEventListener("click", closeCardModal);
}

// Ініціалізація галереї
document.addEventListener("DOMContentLoaded", () => {
  populateGrid("grid-major", groups.major);
  populateGrid("grid-wands", groups.wands);
  populateGrid("grid-pentacles", groups.pentacles);
  populateGrid("grid-swords", groups.swords);
  populateGrid("grid-cups", groups.cups);
});
