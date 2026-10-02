const drinks = [
  {
    name: "Мохито",
    image: "./assets/cocktail-mojito-cropped.png",
    alt: "Коктейль Мохито с лаймом и мятой",
    desktop: "Мята, лайм и белый ром — свежий высокий коктейль для неспешного вечера.",
    mobile: "Лайм, мята и прохлада в высоком бокале. Свайпните, чтобы увидеть следующий коктейль.",
    desktopHeight: 515,
    mobileHeight: 278,
  },
  {
    name: "Негрони",
    image: "./assets/cocktail-negroni-cropped.png",
    alt: "Коктейль Негрони с апельсином",
    desktop: "Горький, яркий и всегда к месту. Три ингредиента в равных долях.",
    mobile: "Джин, вермут и Кампари — насыщенная классика с апельсиновой нотой.",
    desktopHeight: 375,
    mobileHeight: 202,
  },
  {
    name: "Маргарита",
    image: "./assets/cocktail-margarita-cropped.png",
    alt: "Коктейль Маргарита с лаймом",
    desktop: "Текила, свежий лайм и апельсиновый ликёр. Чёткий баланс кислого и крепкого.",
    mobile: "Текила и свежий лайм — звонкий вкус классического коктейля.",
    desktopHeight: 445,
    mobileHeight: 242,
  },
  {
    name: "Виски сауэр",
    image: "./assets/cocktail-whiskey-isolated.png",
    alt: "Коктейль Виски сауэр",
    desktop: "Бурбон, лимон и сироп: мягкий баланс сладости и кислинки.",
    mobile: "Бурбон и лимон под воздушной пеной — мягкий баланс сладкого и кислого.",
    desktopHeight: 375,
    mobileHeight: 202,
  },
];

const hero = document.querySelector(".cocktail-hero");
const glassStage = document.querySelector(".glass-stage");
const glass = document.querySelector(".cocktail-glass");
const desktopTitle = document.querySelector(".desktop-hero-copy [data-cocktail-title]");
const mobileTitle = document.querySelector(".mobile-featured [data-cocktail-title]");
const desktopCopy = document.querySelector(".desktop-hero-copy");
const mobileCopy = document.querySelector(".mobile-featured");
const counters = document.querySelectorAll("[data-counter]");
const desktopDescription = document.querySelector("[data-desktop-description]");
const mobileDescription = document.querySelector("[data-mobile-description]");
const previousButton = document.querySelector(".carousel-arrow--previous");
const nextButton = document.querySelector(".carousel-arrow--next");
let current = 0;
let touchStartX = 0;
let isAnimating = false;

drinks.forEach((drink) => {
  const image = new Image();
  image.src = drink.image;
});

function updateContent(drink) {
    desktopTitle.textContent = drink.name;
    mobileTitle.textContent = drink.name;
    desktopDescription.textContent = drink.desktop;
    mobileDescription.textContent = drink.mobile;
    counters.forEach((counter) => {
      counter.textContent = `${String(current + 1).padStart(2, "0")} / ${String(drinks.length).padStart(2, "0")}`;
    });
}

function step(amount) {
  if (isAnimating) return;
  isAnimating = true;
  hero.setAttribute("aria-busy", "true");
  previousButton.disabled = true;
  nextButton.disabled = true;

  const outgoingGlass = glass.cloneNode(true);
  outgoingGlass.alt = "";
  outgoingGlass.setAttribute("aria-hidden", "true");
  outgoingGlass.classList.add("cocktail-glass--outgoing");
  glassStage.append(outgoingGlass);

  current = (current + amount + drinks.length) % drinks.length;
  const drink = drinks[current];
  const forward = amount > 0;

  glass.src = drink.image;
  glass.alt = drink.alt;
  glass.style.setProperty("--desktop-glass-height", `${drink.desktopHeight}px`);
  glass.style.setProperty("--mobile-glass-height", `${drink.mobileHeight}px`);

  desktopCopy.classList.add("is-copy-leaving");
  mobileCopy.classList.add("is-copy-leaving");

  requestAnimationFrame(() => {
    outgoingGlass.classList.add(forward ? "is-exiting-right" : "is-exiting-left");
    glass.classList.add(forward ? "is-entering-left" : "is-entering-right");
  });

  window.setTimeout(() => {
    updateContent(drink);
    desktopCopy.classList.remove("is-copy-leaving");
    mobileCopy.classList.remove("is-copy-leaving");
    desktopCopy.classList.add("is-copy-entering");
    mobileCopy.classList.add("is-copy-entering");
  }, 360);

  window.setTimeout(() => {
    outgoingGlass.remove();
    glass.classList.remove("is-entering-left", "is-entering-right");
    desktopCopy.classList.remove("is-copy-entering");
    mobileCopy.classList.remove("is-copy-entering");
    previousButton.disabled = false;
    nextButton.disabled = false;
    hero.removeAttribute("aria-busy");
    isAnimating = false;
  }, 1750);
}

previousButton.addEventListener("click", () => step(-1));
nextButton.addEventListener("click", () => step(1));

hero.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].clientX;
}, { passive: true });

hero.addEventListener("touchend", (event) => {
  const delta = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(delta) > 45) step(delta < 0 ? 1 : -1);
}, { passive: true });
