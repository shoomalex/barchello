(() => {
  const pages = {
    'm-home': { id: 'bi8Au', title: 'Каталог', device: 'mobile' },
    'm-search': { id: 'Ii6Hp', title: 'Поиск', device: 'mobile' },
    'm-pantry': { id: 'K0rg5', title: 'Мой бар', device: 'mobile' },
    'm-matches': { id: 'VgEtC', title: 'Подходящие коктейли', device: 'mobile' },
    'm-recipe': { id: 'Pyhit', title: 'Рецепт', device: 'mobile' },
    'm-empty': { id: 'J05THc', title: 'Избранное', device: 'mobile' },
    'm-login': { id: 'tILdl', title: 'Вход', device: 'mobile' },
    'm-saved': { id: 'E5rcB', title: 'Мои коктейли', device: 'mobile' },
    'm-stories': { id: 'kCb0p', title: 'Истории', device: 'mobile' },
    'd-home': { id: 'EbeQr', title: 'Каталог', device: 'desktop' },
    'd-search': { id: 'mXiX4', title: 'Поиск', device: 'desktop' },
    'd-pantry': { id: 'qGKck', title: 'Мой бар', device: 'desktop' },
    'd-matches': { id: 'Yp3ZQ', title: 'Подходящие коктейли', device: 'desktop' },
    'd-recipe': { id: 'EpE63', title: 'Рецепт', device: 'desktop' },
    'd-empty': { id: 'j2yOtz', title: 'Избранное', device: 'desktop' },
    'd-login': { id: 'zVQBj', title: 'Вход', device: 'desktop' },
    'd-saved': { id: 'k99YV8', title: 'Мои коктейли', device: 'desktop' },
    'd-stories': { id: 'x9wqHe', title: 'Истории', device: 'desktop' },
  };
  const $id = id => document.querySelector(`[data-pencil-id="${id}"]`);
  const frames = Object.fromEntries(Object.entries(pages).map(([key, page]) => [key, $id(page.id)]));
  const stage = frames['m-home'].parentElement;
  const find = (scope, name) => { if (!scope) throw new Error(`Missing prototype scope for ${name}`); return Array.from(scope.querySelectorAll('[data-pencil-name]')).find(node => node.dataset.pencilName === name); };
  const setText = (scope, name, value) => { const node = find(scope, name); if (node) node.textContent = value; };
  const photo = (scope, name) => find(scope, name)?.style.backgroundImage || '';
  const pictures = {
    mojito: "url('./barcello-assets/bar-counter-mojito.png')",
    negroni: photo(frames['m-saved'], 'Негрони saved photo'),
    margarita: photo(frames['m-recipe'], 'Margarita hero photo'),
    whiskey: photo(frames['m-matches'], 'Whiskey Sour photo'),
  };
  const carouselBackdrop = "url('./barcello-assets/bar-counter-empty.png')";
  const carouselGlasses = {
    mojito: './barcello-assets/cocktail-mojito-cropped.png',
    negroni: './barcello-assets/cocktail-negroni-cropped.png',
    margarita: './barcello-assets/cocktail-margarita-cropped.png',
  };
  const carouselGlassSizes = {
    mobile: { mojito: 278, negroni: 202, margarita: 242 },
    desktop: { mojito: 515, negroni: 375, margarita: 445 },
  };
  function createCarouselGlass(frame, name, device) {
    const scene = find(frame, name);
    find(scene, 'Бокал Мохито · центр между стрелками')?.remove();
    const previous = find(frame, device === 'mobile' ? 'Previous cocktail' : 'Previous desktop cocktail');
    const next = find(frame, device === 'mobile' ? 'Next cocktail' : 'Next desktop cocktail');
    const centerBetweenArrows = (previous.offsetLeft + previous.offsetWidth / 2 + next.offsetLeft + next.offsetWidth / 2) / 2;
    scene.style.backgroundImage = carouselBackdrop;
    scene.style.backgroundPosition = 'center';
    scene.style.backgroundSize = 'cover';
    const glass = document.createElement('img');
    glass.alt = '';
    glass.setAttribute('aria-hidden', 'true');
    glass.style.cssText = 'position:absolute;left:50%;bottom:3%;transform:translateX(-50%);width:auto;object-fit:contain;pointer-events:none;z-index:0;filter:drop-shadow(8px 10px 8px rgba(0,0,0,.38));';
    glass.style.left = `${centerBetweenArrows}px`;
    scene.insertBefore(glass, scene.firstChild);
    return glass;
  }
  const carouselGlassNodes = {
    mobile: createCarouselGlass(frames['m-home'], 'Swipeable bar counter', 'mobile'),
    desktop: createCarouselGlass(frames['d-home'], 'Desktop bar carousel', 'desktop'),
  };
  const drinks = {
    mojito: {
      title: 'Мохито', category: 'КЛАССИКА · РОМ', lead: 'Мята, лайм и белый ром — свежий высокий коктейль для неспешного вечера.',
      items: [['Белый кубинский ром', '45 мл'], ['Свежий сок лайма', '20 мл'], ['Мята · сахар · содовая', '6 веточек · 2 ч. л. · долить']],
      steps: ['Смешайте мяту с сахаром и соком лайма. Добавьте немного содовой и наполните бокал льдом.', 'Влейте ром, долейте содовую и осторожно перемешайте. Украсьте мятой и лаймом.'],
      glass: 'Хайбол', method: 'Билд', garnish: 'Мята и долька лайма', source: 'https://iba-world.com/iba-cocktail/mojito/', image: pictures.mojito,
    },
    margarita: {
      title: 'Маргарита', category: 'КЛАССИКА · ТЕКИЛА', lead: 'Свежий лайм, текила и апельсиновый ликёр — чёткий баланс кислого и крепкого.',
      items: [['Текила 100% агавы', '50 мл'], ['Трипл-сек', '20 мл'], ['Свежий сок лайма', '15 мл']],
      steps: ['Налейте все ингредиенты в шейкер со льдом.', 'Хорошо встряхните и процедите в охлаждённый коктейльный бокал.'],
      glass: 'Коктейльный', method: 'Шейк', garnish: 'Соляная кромка по желанию', source: 'https://iba-world.com/iba-cocktail/margarita/', image: pictures.margarita,
    },
    negroni: {
      title: 'Негрони', category: 'КЛАССИКА · ДЖИН', lead: 'Горький, яркий и всегда к месту. Три ингредиента в равных долях.',
      items: [['Джин', '30 мл'], ['Кампари', '30 мл'], ['Красный сладкий вермут', '30 мл']],
      steps: ['Налейте ингредиенты в охлаждённый бокал олд фэшн со льдом.', 'Осторожно перемешайте и украсьте половинкой ломтика апельсина.'],
      glass: 'Олд фэшн', method: 'Стир', garnish: 'Половинка ломтика апельсина', source: 'https://iba-world.com/iba-cocktail/negroni/', image: pictures.negroni,
    },
    whiskey: {
      title: 'Виски сауэр', category: 'КЛАССИКА · ВИСКИ', lead: 'Бурбон, лимон и сироп: мягкий баланс сладости и кислинки.',
      items: [['Бурбон', '45 мл'], ['Свежий сок лимона', '25 мл'], ['Сахарный сироп', '20 мл']],
      steps: ['Налейте ингредиенты в шейкер со льдом. Белок можно добавить по желанию.', 'Хорошо встряхните и процедите в бокал. Украсьте апельсином и вишней.'],
      glass: 'Кобблер', method: 'Шейк', garnish: 'Апельсин и вишня; белок по желанию', source: 'https://iba-world.com/iba-cocktail/whiskey-sour/', image: pictures.whiskey,
    },
  };
  const slides = ['mojito', 'negroni', 'margarita'];
  const stories = {
    margarita: {
      category: 'ТЕКИЛА · ИСТОРИЯ КОКТЕЙЛЯ', title: 'Маргарита: история без единственного автора',
      lead: 'За смесью текилы, лайма и апельсинового ликёра стоит сразу несколько версий происхождения.',
      first: 'В 1936 году в печати уже упоминали Tequila Daisy. «Margarita» по-испански — «маргаритка», и одна из версий связывает её с семейством коктейлей Daisy.',
      second: 'Позднее бары по обе стороны границы рассказывали свои истории создания напитка. Единственного автора так и не удалось установить. Зато баланс кислого, сладкого и крепкого стал классикой.',
      teaser: 'Несколько версий происхождения любимой классики.', image: './barcello-assets/generated-1.png', cutout: './barcello-assets/cocktail-margarita-cropped.png',
      source: 'https://www.diffordsguide.com/g/1138/margarita-cocktail/origins-and-history',
    },
    mojito: {
      category: 'РОМ · ИСТОРИЯ КОКТЕЙЛЯ', title: 'Мохито: кубинские корни мяты и рома',
      lead: 'Точное происхождение Мохито неизвестно, но у него есть узнаваемые кубинские предшественники.',
      first: 'Одним из них считают Draque — сочетание тростникового дистиллята, лайма, сахара и мяты. Связь с напитком времён Фрэнсиса Дрейка остаётся версией, а не установленным фактом.',
      second: 'К концу 1920-х близкие рецепты уже появлялись в кубинских книгах. Позже белый ром и содовая закрепили лёгкий, освежающий стиль, который сегодня узнают по всему миру.',
      teaser: 'Мята, лайм и долгий путь к знакомому рецепту.', image: './barcello-assets/bar-counter-mojito.png', cutout: './barcello-assets/cocktail-mojito-cropped.png',
      source: 'https://www.diffordsguide.com/g/1228/mojito-cocktail/mojito-cocktail-history',
    },
    negroni: {
      category: 'ДЖИН · ИСТОРИЯ КОКТЕЙЛЯ', title: 'Негрони: другая версия Americano',
      lead: 'В популярной версии истории всё началось с просьбы сделать итальянский аперитив крепче.',
      first: 'Историю связывают с Флоренцией и графом Камилло Негрони: вместо содовой в Americano он якобы попросил добавить джин. Подтвердить все детали этой истории непросто, и исследователи обсуждают альтернативные версии.',
      second: 'Но родство напитков видно в самом бокале: Campari и сладкий вермут остались, а джин придал композиции характерную крепость. Три равные доли сделали рецепт легко запоминаемым.',
      teaser: 'Как в итальянском аперитиве появился джин.', image: './barcello-assets/cocktail-negroni.png', cutout: './barcello-assets/cocktail-negroni-isolated.png',
      source: 'https://www.diffordsguide.com/g/1078/negroni-cocktail/history',
    },
    whiskey: {
      category: 'ВИСКИ · ИСТОРИЯ КОКТЕЙЛЯ', title: 'Виски сауэр: формула баланса',
      lead: 'Крепкий алкоголь, цитрус и сахар — простая формула, пережившая более полутора веков.',
      first: 'Самое раннее известное письменное упоминание Whiskey Sour относится к 1870 году. К тому времени семейство Sour уже прочно вошло в барную культуру.',
      second: 'Позже появились варианты с яичным белком и красным вином. Но основой остался баланс виски, лимонного сока и сладости: именно он позволяет бармену показать мастерство без лишних ингредиентов.',
      teaser: 'Почему три ингредиента пережили полтора века.', image: './barcello-assets/generated.png', cutout: './barcello-assets/cocktail-whiskey-isolated.png',
      source: 'https://www.diffordsguide.com/g/1133/sour-cocktails/whiskey-sour',
    },
  };
  let slideIndex = 0;
  let signedIn = sessionStorage.getItem('barchello-signed-in') === 'yes';
  let currentRoute = '';
  let currentDrink = 'margarita';
  let loginReturnRoute = 'm-recipe';
  let toastTimer;

  const css = document.createElement('style');
  css.textContent = `
    html, body { margin:0; width:100%; min-height:100%; background:#0b0d09; color:#F6EBDD; font-family:Inter,system-ui,sans-serif; }
    body { padding:0; overflow-x:hidden; }
    #barchello-prototype-toolbar { display:none !important; }
    #barchello-prototype-toolbar strong { color:#A8DE42; letter-spacing:.04em; }
    #barchello-prototype-toolbar .controls { display:flex; gap:8px; }
    #barchello-prototype-toolbar button { border:1px solid #658a30; border-radius:16px; color:#F6EBDD; background:transparent; padding:5px 11px; cursor:pointer; font:inherit; }
    #barchello-prototype-toolbar button.active { background:#A8DE42; border-color:#A8DE42; color:#14110F; }
    #barchello-prototype-stage { position:relative; margin:0; overflow:hidden; box-shadow:none; }
    [data-prototype-link] { cursor:pointer !important; }
    [data-prototype-link]:focus-visible { outline:2px solid #A8DE42; outline-offset:3px; }
    [data-pencil-name="Desktop header"] { display:grid !important; grid-template-columns:1fr auto 1fr !important; padding-left:5vw !important; padding-right:5vw !important; }
    [data-pencil-name="Desktop brand"] { justify-self:start !important; }
    [data-pencil-name="Desktop navigation"] { justify-self:center !important; }
    [data-pencil-name="Desktop account entry"] { justify-self:end !important; justify-content:center !important; width:auto !important; min-width:164px !important; }
    [data-pencil-id="V4Au8Q"] svg { width:58px !important; height:58px !important; }
    #barchello-prototype-toast { position:fixed; z-index:1001; left:50%; bottom:24px; transform:translateX(-50%); background:#213518; color:#F6EBDD; border:1px solid #A8DE42; border-radius:12px; padding:12px 18px; box-shadow:0 8px 25px #0008; display:none; font-size:13px; max-width:min(90vw,420px); text-align:center; }
    .prototype-input { width:100%; background:transparent; border:0; outline:0; color:#F6EBDD; font:inherit; }
    .prototype-input::placeholder { color:#B7A99B; }
    .prototype-menu-item { display:block; width:100%; padding:13px 14px; border:0; border-radius:10px; background:transparent; color:#F6EBDD; text-align:left; cursor:pointer; font:600 14px Inter,system-ui,sans-serif; }
    .prototype-menu-item:hover, .prototype-menu-item:focus-visible { background:#354326; outline:none; }
  `;
  document.head.append(css);
  stage.id = 'barchello-prototype-stage';
  stage.removeAttribute('style');
  const toolbar = document.createElement('div');
  toolbar.id = 'barchello-prototype-toolbar';
  toolbar.innerHTML = '<strong>BARCHELLO · КЛИКАБЕЛЬНЫЙ ПРОТОТИП</strong><span id="barchello-page-name"></span><span class="controls"><button id="barchello-mobile">Телефон</button><button id="barchello-desktop">Десктоп</button></span>';
  document.body.insertBefore(toolbar, stage);
  const toast = document.createElement('div');
  toast.id = 'barchello-prototype-toast';
  toast.setAttribute('role', 'status');
  document.body.append(toast);

  function notice(message) {
    toast.textContent = message;
    toast.style.display = 'block';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.style.display = 'none'; }, 2800);
  }
  function parseLocation() {
    const raw = location.hash.replace(/^#\/?/, '');
    const [route, query = ''] = raw.split('?');
    const params = new URLSearchParams(query);
    const direct = new URLSearchParams(location.search);
    const chosenRoute = pages[route] ? route : direct.get('route');
    return { route: pages[chosenRoute] ? chosenRoute : (innerWidth < 700 ? 'm-home' : 'd-home'), drink: params.get('drink') || direct.get('drink') || 'margarita' };
  }
  function go(route, drink) {
    if (route === 'm-home' || route === 'd-home') {
      location.href = './';
      return;
    }
    const extra = drink ? `?drink=${encodeURIComponent(drink)}` : '';
    history.pushState({}, '', `#/${route}${extra}`);
    render(route, drink);
  }
  function scaleActive() {
    if (!currentRoute) return;
    const frame = frames[currentRoute];
    frame.style.transform = '';
    const isDesktop = pages[currentRoute].device === 'desktop';
    const width = isDesktop ? 1440 : 390;
    const fluidWidth = isDesktop && innerWidth > width ? innerWidth : width;
    frame.style.width = `${fluidWidth}px`;
    const height = frame.offsetHeight;
    const scale = Math.min(1, innerWidth / width);
    stage.style.width = `${Math.ceil(fluidWidth * scale)}px`;
    stage.style.height = `${Math.ceil(height * scale)}px`;
    frame.style.transformOrigin = 'top left';
    frame.style.transform = `scale(${scale})`;
  }
  function render(route, drink = currentDrink) {
    currentRoute = route;
    currentDrink = drink;
    for (const frame of Object.values(frames)) frame.style.display = 'none';
    const frame = frames[route];
    frame.style.display = 'flex';
    frame.style.position = 'absolute';
    frame.style.left = '0px';
    frame.style.top = '0px';
    if (route.endsWith('recipe')) showRecipe(route, drink);
    if (route.endsWith('stories')) showStory(route, drink);
    document.getElementById('barchello-page-name').textContent = pages[route].title;
    document.getElementById('barchello-mobile').classList.toggle('active', pages[route].device === 'mobile');
    document.getElementById('barchello-desktop').classList.toggle('active', pages[route].device === 'desktop');
    window.scrollTo(0, 0);
    requestAnimationFrame(scaleActive);
  }
  function link(scope, name, action) {
    const node = find(scope, name);
    if (!node) return;
    node.dataset.prototypeLink = 'true';
    node.tabIndex = 0;
    node.setAttribute('role', 'link');
    node.addEventListener('click', event => { event.preventDefault(); event.stopPropagation(); action(); });
    node.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); action(); } });
  }
  function showStory(route, key) {
    if (!stories[key]) key = 'margarita';
    currentDrink = key;
    const frame = frames[route];
    const story = stories[key];
    for (const [name, value] of [['Story category', story.category], ['Story title', story.title], ['Story lead', story.lead], ['Story paragraph one', story.first], ['Story paragraph two', story.second]]) setText(frame, name, value);
    const featuredImage = find(frame, 'Featured story image');
    featuredImage.style.backgroundImage = 'url("./barcello-assets/bar-counter-empty.png")';
    featuredImage.style.backgroundPosition = 'center';
    featuredImage.style.backgroundSize = 'cover';
    featuredImage.style.position = 'relative';
    let featuredGlass = featuredImage.querySelector('[data-story-glass]');
    if (!featuredGlass) {
      featuredGlass = document.createElement('img');
      featuredGlass.dataset.storyGlass = 'true';
      featuredGlass.alt = '';
      featuredGlass.setAttribute('aria-hidden', 'true');
      featuredGlass.style.cssText = 'position:absolute;left:50%;bottom:4%;transform:translateX(-50%);height:82%;max-width:85%;width:auto;object-fit:contain;pointer-events:none;filter:drop-shadow(6px 8px 8px #0009)';
      featuredImage.append(featuredGlass);
    }
    featuredGlass.src = story.cutout;
    const remaining = Object.keys(stories).filter(drink => drink !== key);
    for (const [index, slotName] of ['Mojito', 'Negroni', 'Whiskey'].entries()) {
      const slot = find(frame, `${slotName} story ${route.startsWith('m-') ? 'row' : 'card'}`);
      const nextKey = remaining[index];
      slot.dataset.drink = nextKey;
      setText(slot, `${slotName} story title`, stories[nextKey].title);
      setText(slot, `${slotName} story teaser`, stories[nextKey].teaser);
      find(slot, `${slotName} story thumbnail`).style.backgroundImage = `url("${stories[nextKey].cutout}")`;
    }
  }
  function setSlide(index) {
    slideIndex = (index + slides.length) % slides.length;
    const key = slides[slideIndex];
    const drink = drinks[key];
    const mobile = frames['m-home'];
    const desktop = frames['d-home'];
    for (const device of ['mobile', 'desktop']) {
      const glass = carouselGlassNodes[device];
      glass.src = carouselGlasses[key];
      glass.style.height = `${carouselGlassSizes[device][key]}px`;
    }
    setText(mobile, 'Negroni title', drink.title);
    setText(mobile, 'Negroni description', drink.lead);
    setText(mobile, 'Carousel index text', `${String(slideIndex + 1).padStart(2, '0')} / 03`);
    setText(desktop, 'Current cocktail name', drink.title);
    setText(desktop, 'Current cocktail text', drink.lead);
    setText(desktop, 'Carousel pagination', `${String(slideIndex + 1).padStart(2, '0')}   /   03`);
  }
  function showRecipe(route, key) {
    const recipe = drinks[key] || drinks.margarita;
    const frame = frames[route];
    const mobile = route.startsWith('m-');
    if (mobile) {
      setText(frame, 'Recipe category', recipe.category);
      setText(frame, 'Recipe title', recipe.title);
      setText(frame, 'Recipe lead', recipe.lead);
      setText(frame, 'БОКАЛ value', recipe.glass);
      setText(frame, 'МЕТОД value', recipe.method);
      setText(frame, 'Garnish text', `Гарнир: ${recipe.garnish}`);
      recipe.items.forEach(([name, amount], index) => {
        const rows = Array.from(frame.querySelectorAll('[data-pencil-name$=" ingredient"]')).filter(node => node.children.length >= 2);
        const row = rows[index];
        if (!row) return;
        row.children[0].textContent = name;
        row.children[1].textContent = amount;
      });
      setText(frame, 'Step text 01', recipe.steps[0]);
      setText(frame, 'Step text 02', recipe.steps[1]);
      find(frame, 'Margarita hero photo').style.backgroundImage = recipe.image;
    } else {
      setText(frame, 'Recipe breadcrumb', `КАТАЛОГ  /  ${recipe.category.replace('КЛАССИКА · ', '')}  /  ${recipe.title.toUpperCase()}`);
      setText(frame, 'Recipe desktop title', recipe.title);
      setText(frame, 'Recipe desktop intro', recipe.lead);
      setText(frame, 'БОКАЛ value', recipe.glass);
      setText(frame, 'МЕТОД value', recipe.method);
      setText(frame, 'Glass and garnish', `Бокал: ${recipe.glass}\nГарнир: ${recipe.garnish}`);
      const rows = Array.from(find(frame, 'Desktop ingredients').children).filter(node => node.dataset.pencilName?.endsWith(' row'));
      recipe.items.forEach(([name, amount], index) => { if (rows[index]) { rows[index].children[0].textContent = name; rows[index].children[1].textContent = amount; } });
      setText(frame, 'Step text 01', recipe.steps[0]);
      setText(frame, 'Step text 02', recipe.steps[1]);
      find(frame, 'Margarita desktop photo').style.backgroundImage = recipe.image;
    }
    const source = find(frame, mobile ? 'IBA link' : 'IBA source link');
    source.onclick = event => { event.stopPropagation(); window.open(recipe.source, '_blank', 'noopener'); };
    source.dataset.prototypeLink = 'true';
    source.tabIndex = 0;
    source.setAttribute('role', 'link');
    source.onkeydown = event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); window.open(recipe.source, '_blank', 'noopener'); } };
    requestAnimationFrame(scaleActive);
  }
  function changeDevice(device) {
    const concept = currentRoute.slice(2);
    const route = `${device === 'desktop' ? 'd' : 'm'}-${concept}`;
    go(pages[route] ? route : (device === 'desktop' ? 'd-home' : 'm-home'), currentDrink);
  }
  document.getElementById('barchello-mobile').onclick = () => changeDevice('mobile');
  document.getElementById('barchello-desktop').onclick = () => changeDevice('desktop');
  addEventListener('resize', scaleActive);
  addEventListener('popstate', () => { const value = parseLocation(); render(value.route, value.drink); });

  for (const [route, frame] of Object.entries(frames)) {
    if (route.startsWith('m-')) {
      link(frame, 'Brand header', () => go('m-home'));
      link(frame, 'Каталог', () => go('m-home'));
      link(frame, 'Мой бар', () => go('m-pantry'));
      link(frame, 'Избранное', () => go(signedIn ? 'm-saved' : 'm-empty'));
    } else {
      link(frame, 'Desktop brand', () => go('d-home'));
      link(frame, 'КОКТЕЙЛИ', () => go('d-search'));
      link(frame, 'МОЙ БАР', () => go('d-pantry'));
      link(frame, 'ИЗБРАННОЕ', () => go(signedIn ? 'd-saved' : 'd-empty'));
      link(frame, 'ИСТОРИИ', () => go('d-stories', 'margarita'));
      link(frame, 'Desktop account entry', () => go(signedIn ? 'd-saved' : 'd-login'));
    }
  }
  const menuButton = find(frames['m-home'], 'Mobile menu button');
  const menuIcon = menuButton.querySelector('path');
  const menuBackdrop = document.createElement('div');
  menuBackdrop.style.cssText = 'position:absolute;inset:128px 0 0;background:#0009;z-index:20;display:none;';
  const mobileMenu = document.createElement('nav');
  mobileMenu.id = 'barchello-mobile-menu';
  mobileMenu.setAttribute('aria-label', 'Мобильное меню');
  mobileMenu.style.cssText = 'position:absolute;top:130px;left:20px;width:350px;z-index:21;background:#201B18;border:1px solid #463B34;border-radius:16px;box-shadow:0 16px 40px #0009;padding:8px;display:none;';
  mobileMenu.innerHTML = '<div style="color:#A8DE42;font:700 11px Inter,system-ui,sans-serif;letter-spacing:.08em;padding:12px 14px 8px">МЕНЮ</div>' + [['Каталог','m-home'],['Поиск коктейля','m-search'],['Мой бар','m-pantry'],['Избранное','m-favorites'],['Истории','m-stories'],['Личный кабинет','m-account']].map(([label, route]) => `<button type="button" class="prototype-menu-item" data-menu-route="${route}">${label}</button>`).join('');
  frames['m-home'].append(menuBackdrop, mobileMenu);
  menuButton.dataset.prototypeLink = 'true';
  menuButton.setAttribute('role', 'button');
  menuButton.setAttribute('aria-controls', mobileMenu.id);
  menuButton.setAttribute('aria-label', 'Открыть меню');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.tabIndex = 0;
  function setMobileMenu(open) {
    menuBackdrop.style.display = open ? 'block' : 'none';
    mobileMenu.style.display = open ? 'block' : 'none';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    menuIcon.setAttribute('d', open ? 'M5 5l14 14M19 5L5 19' : 'M4 7h16M4 12h16M4 17h16');
  }
  menuButton.addEventListener('click', event => { event.stopPropagation(); setMobileMenu(mobileMenu.style.display === 'none'); });
  menuButton.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.stopPropagation(); setMobileMenu(mobileMenu.style.display === 'none'); } });
  menuBackdrop.addEventListener('click', () => setMobileMenu(false));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') setMobileMenu(false); });
  mobileMenu.addEventListener('click', event => {
    const item = event.target.closest('[data-menu-route]');
    if (!item) return;
    const route = item.dataset.menuRoute;
    setMobileMenu(false);
    if (route === 'm-favorites') go(signedIn ? 'm-saved' : 'm-empty');
    else if (route === 'm-stories') go('m-stories', 'margarita');
    else if (route === 'm-account') { loginReturnRoute = 'm-home'; go(signedIn ? 'm-saved' : 'm-login'); }
    else go(route);
  });
  link(frames['m-home'], 'Search field', () => go('m-search'));
  link(frames['m-home'], 'Mobile account entry', () => { loginReturnRoute = 'm-home'; go(signedIn ? 'm-saved' : 'm-login'); });
  link(frames['m-home'], 'Recipe button mobile', () => go('m-recipe', slides[slideIndex]));
  link(frames['m-home'], 'Previous cocktail', () => setSlide(slideIndex - 1));
  link(frames['m-home'], 'Next cocktail', () => setSlide(slideIndex + 1));
  link(frames['d-home'], 'Previous desktop cocktail', () => setSlide(slideIndex - 1));
  link(frames['d-home'], 'Next desktop cocktail', () => setSlide(slideIndex + 1));
  link(frames['d-home'], 'Recipe button', () => go('d-recipe', slides[slideIndex]));
  link(frames['d-home'], 'Найти рецепт', () => go('d-search'));
  link(frames['d-home'], 'Из моего бара', () => go('d-pantry'));
  for (const route of ['m-home', 'd-home']) {
    const carousel = find(frames[route], route === 'm-home' ? 'Swipeable bar counter' : 'Desktop bar carousel');
    let startX = null;
    carousel.addEventListener('pointerdown', event => { startX = event.clientX; });
    carousel.addEventListener('pointerup', event => { if (startX != null && Math.abs(event.clientX - startX) > 45) setSlide(slideIndex + (event.clientX < startX ? 1 : -1)); startX = null; });
  }
  link(frames['m-search'], 'Маргарита result', () => go('m-recipe', 'margarita'));
  link(frames['d-search'], 'Маргарита card', () => go('d-recipe', 'margarita'));
  for (const name of ['Томми’с Маргарита result', 'Пряная Маргарита result']) link(frames['m-search'], name, () => notice('Полная карточка этого варианта появится в каталоге позже.'));
  for (const name of ['Томми’с Маргарита card', 'Пряная Маргарита card']) link(frames['d-search'], name, () => notice('Полная карточка этого варианта появится в каталоге позже.'));
  link(frames['m-pantry'], 'Find cocktails button', () => go('m-matches'));
  link(frames['m-matches'], 'Back to pantry', () => go('m-pantry'));
  link(frames['m-matches'], 'Whiskey Sour match', () => go('m-recipe', 'whiskey'));
  for (const name of ['Олд фэшн row', 'Джин-тоник с лаймом row']) link(frames['m-matches'], name, () => notice('Добавьте недостающий ингредиент, чтобы открыть рецепт.'));
  link(frames['d-pantry'], 'Show matches button', () => go('d-matches'));
  link(frames['d-pantry'], 'Whiskey Sour desktop result', () => go('d-recipe', 'whiskey'));
  link(frames['d-matches'], 'Open Whiskey Sour recipe', () => go('d-recipe', 'whiskey'));
  link(frames['d-matches'], 'Change ingredients action', () => go('d-pantry'));
  for (const name of ['Олд фэшн result row', 'Джин-тоник с лаймом result row']) link(frames['d-matches'], name, () => notice('Добавьте недостающий ингредиент, чтобы открыть рецепт.'));
  link(frames['m-recipe'], 'Back label', () => go('m-search'));
  link(frames['m-recipe'], 'Save', () => { loginReturnRoute = 'm-recipe'; go(signedIn ? 'm-saved' : 'm-login'); });
  link(frames['d-recipe'], 'Save recipe', () => go(signedIn ? 'd-saved' : 'd-login'));
  link(frames['m-recipe'], 'View cocktail story', () => go('m-stories', currentDrink));
  link(frames['d-recipe'], 'View cocktail story', () => go('d-stories', currentDrink));
  link(frames['m-stories'], 'Back to catalog', () => go('m-home'));
  for (const route of ['m-stories', 'd-stories']) {
    const frame = frames[route];
    link(frame, 'Story recipe action', () => go(route.startsWith('m-') ? 'm-recipe' : 'd-recipe', currentDrink));
    link(frame, 'Story source', () => window.open(stories[currentDrink].source, '_blank', 'noopener'));
    for (const name of ['Mojito', 'Negroni', 'Whiskey']) {
      const slotName = `${name} story ${route.startsWith('m-') ? 'row' : 'card'}`;
      link(frame, slotName, () => go(route, find(frame, slotName).dataset.drink));
    }
  }
  async function share() {
    const url = new URL(location.href); url.hash = `/${currentRoute}?drink=${currentDrink}`;
    if (navigator.share) { try { await navigator.share({ title: drinks[currentDrink]?.title || 'Barchello', url: url.href }); return; } catch (_) {} }
    try { await navigator.clipboard.writeText(url.href); notice('Ссылка на рецепт скопирована.'); }
    catch (_) { prompt('Скопируйте ссылку на рецепт:', url.href); }
  }
  link(frames['m-recipe'], 'Share', share);
  link(frames['d-recipe'], 'Share recipe', share);
  function downloadRecipePoster() {
    const key = drinks[currentDrink] ? currentDrink : 'margarita';
    const posters = {
      margarita: './barcello-assets/margarita-recipe-poster.jpg',
      mojito: './barcello-assets/mojito-deco-recipe-poster.jpg',
      negroni: './barcello-assets/negroni-deco-recipe-poster.jpg',
      whiskey: './barcello-assets/whiskey-deco-recipe-poster.jpg',
    };
    const anchor = document.createElement('a');
    anchor.href = posters[key];
    anchor.download = `barchello-${key}-recipe.jpg`;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
  }
  link(frames['m-recipe'], 'Download recipe poster', downloadRecipePoster);
  link(frames['d-recipe'], 'Download recipe poster', downloadRecipePoster);
  link(frames['m-empty'], 'Explore button', () => go('m-search'));
  link(frames['d-empty'], 'Explore cocktails button', () => go('d-search'));
  link(frames['m-saved'], 'Маргарита saved card', () => go('m-recipe', 'margarita'));
  link(frames['m-saved'], 'Негрони saved card', () => go('m-recipe', 'negroni'));
  link(frames['d-saved'], 'Маргарита saved desktop card', () => go('d-recipe', 'margarita'));
  link(frames['d-saved'], 'Негрони saved desktop card', () => go('d-recipe', 'negroni'));
  link(frames['d-saved'], 'Explore more recipes', () => go('d-search'));
  link(frames['m-login'], 'Login back', () => go(loginReturnRoute, currentDrink));
  for (const [route, button, destination] of [['m-login', 'Login button', 'm-saved'], ['d-login', 'Desktop login button', 'd-saved']]) {
    link(frames[route], button, () => { signedIn = true; sessionStorage.setItem('barchello-signed-in', 'yes'); go(destination); });
  }
  for (const [route, name] of [['m-login', 'Register link'], ['d-login', 'Register prompt']]) {
    link(frames[route], name, () => notice('Для прототипа вход и регистрация ведут в одну сохранённую коллекцию.'));
  }
  for (const route of ['m-login', 'd-login']) {
    for (const name of ['Почта field', 'Пароль field', 'Почта input', 'Пароль input']) {
      const field = find(frames[route], name);
      if (!field) continue;
      const original = field.querySelector('[data-pencil-name$=" placeholder"]');
      if (original) original.style.display = 'none';
      const input = document.createElement('input');
      input.className = 'prototype-input';
      input.type = name.startsWith('Пароль') ? 'password' : 'email';
      input.placeholder = name.startsWith('Пароль') ? 'Не менее 8 символов' : 'you@example.com';
      input.setAttribute('aria-label', name.startsWith('Пароль') ? 'Пароль' : 'Почта');
      field.append(input);
    }
  }
  const initial = parseLocation();
  const previewSlide = new URLSearchParams(location.search).get('slide');
  setSlide(Math.max(0, slides.indexOf(previewSlide)));
  render(initial.route, initial.drink);
})();
