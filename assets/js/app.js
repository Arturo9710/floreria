/**
 * Florería Botánica Aurelia
 * Sistema de Scroll-Driven Pinning (Inspirado en Apple / Nick's):
 * - El hero permanece fijado en pantalla (pinned) mientras el usuario hace scroll
 * - Cambia la flor y la atmósfera de fondo según el progreso del scroll
 * - Una vez completadas las 3 flores, el scroll continúa fluidamente hacia el catálogo
 */

const ALL_PRODUCTS = [
  {
    id: 'ramo-amor-ingles',
    name: 'Amor Eterno & Rosas',
    occasion: 'amor',
    occasionLabel: 'Amor & Pasión',
    price: 1250,
    image: 'assets/images/ramo_amor.jpg',
    isolatedImage: 'assets/images/flotante_amor.jpg',
    tag: 'Edición Pasión • Corte Matutino',
    desc: 'Rosas inglesas en carmesí profundo y peonías ruborizadas. Envueltas en listón de seda hilada a mano.',
    bgColor: '#F7EBE8',
    textColor: '#2B1810',
    haloColor: 'rgba(140, 67, 81, 0.25)'
  },
  {
    id: 'ramo-jardin-primavera',
    name: 'Jardín de Ranúnculos & Sol',
    occasion: 'cumpleanos',
    occasionLabel: 'Cumpleaños',
    price: 980,
    image: 'assets/images/ramo_cumpleanos.jpg',
    isolatedImage: 'assets/images/flotante_cumpleanos.jpg',
    tag: 'Edición Celebración • Luz Radiante',
    desc: 'Un estallido alegre de ranúnculos amarillos, tulipanes rosados y flores silvestres en papel kraft de algodón.',
    bgColor: '#FAF4E6',
    textColor: '#2D2614',
    haloColor: 'rgba(232, 180, 74, 0.25)'
  },
  {
    id: 'ramo-peonias-lavanda',
    name: 'Peonías Francesas & Lavanda',
    occasion: 'aniversario',
    occasionLabel: 'Aniversario',
    price: 1680,
    image: 'assets/images/ramo_aniversario.jpg',
    isolatedImage: 'assets/images/flotante_aniversario.jpg',
    tag: 'Edición Conmemoración • Alta Floristería',
    desc: 'Peonías francesas pomposas con tulipanes lavanda en jarrón artesanal de autor para momentos inolvidables.',
    bgColor: '#EFEBF4',
    textColor: '#1F1A26',
    haloColor: 'rgba(140, 120, 158, 0.25)'
  },
  {
    id: 'ramo-lirios-paz',
    name: 'Lirios Casablanca & Serena Paz',
    occasion: 'condolencias',
    occasionLabel: 'Condolencias',
    price: 1450,
    image: 'assets/images/ramo_condolencias.jpg',
    isolatedImage: 'assets/images/ramo_condolencias.jpg',
    tag: 'Edición Solemnidad • Cerámica Pura',
    desc: 'Lirios Casablanca puros y rosas color marfil con gypsophila fresca en jarrón cerámico minimalista.',
    bgColor: '#F2F2EE',
    textColor: '#1E201E',
    haloColor: 'rgba(90, 100, 92, 0.2)'
  }
];

const HERO_EDITIONS = [ALL_PRODUCTS[0], ALL_PRODUCTS[1], ALL_PRODUCTS[2]];
let heroActiveIdx = 0;
let isHeroAnimating = false;

// Estado del Carrito
let cart = JSON.parse(localStorage.getItem('aurelia_cart') || '[]');
let activeFilter = 'todos';

document.addEventListener('DOMContentLoaded', () => {
  initScrollPinnedHero();
  initCatalog();
  initCartDrawer();
  updateCartUI();
});

/* ==========================================================================
   1. HERO SHOWCASE CON SCROLL-PINNING EXACTO
   ========================================================================== */
function initScrollPinnedHero() {
  const track = document.getElementById('hero-track');
  const tagEl = document.getElementById('hero-tag');
  const titleEl = document.getElementById('hero-title');
  const descEl = document.getElementById('hero-desc');
  const priceEl = document.getElementById('hero-price');
  const imgEl = document.getElementById('hero-flower-img');
  const haloEl = document.getElementById('hero-halo');
  const editionBtns = document.querySelectorAll('.edition-btn');
  const heroOrderBtn = document.getElementById('hero-order-btn');

  function renderHeroEdition(index, force = false) {
    if (index === heroActiveIdx && !force) return;
    if (isHeroAnimating && !force) return;
    isHeroAnimating = true;

    const flower = HERO_EDITIONS[index];
    heroActiveIdx = index;

    // Transición de salida suave
    imgEl.classList.remove('idle-float');
    imgEl.style.transform = "scale(0.92) translateY(14px)";
    imgEl.style.opacity = "0";
    titleEl.style.opacity = "0";
    titleEl.style.transform = "translateY(8px)";

    // Cambiar atmósfera cromática suave
    document.documentElement.style.setProperty('--bg-current', flower.bgColor);
    document.documentElement.style.setProperty('--text-current', flower.textColor);
    document.documentElement.style.setProperty('--halo-current', flower.haloColor);

    setTimeout(() => {
      tagEl.textContent = flower.tag;
      titleEl.textContent = flower.name;
      descEl.textContent = flower.desc;
      priceEl.textContent = `$${flower.price.toLocaleString('es-MX')} MXN`;
      imgEl.src = flower.isolatedImage;

      // Entrada suave
      imgEl.style.transform = "scale(1) translateY(0)";
      imgEl.style.opacity = "1";
      titleEl.style.opacity = "1";
      titleEl.style.transform = "translateY(0)";

      setTimeout(() => {
        imgEl.classList.add('idle-float');
        isHeroAnimating = false;
      }, 400);
    }, 280);

    // Actualizar botones inferiores
    editionBtns.forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
    });
  }

  // Clic en botones del hero
  editionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index, 10);
      renderHeroEdition(idx);
    });
  });

  if (heroOrderBtn) {
    heroOrderBtn.addEventListener('click', () => {
      addToCart(HERO_EDITIONS[heroActiveIdx].id);
    });
  }

  // Micro-paralaje con el cursor
  imgEl.addEventListener('mousemove', (e) => {
    const rect = imgEl.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.04;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.04;
    imgEl.style.transform = `translate(${x}px, ${y}px) scale(1.02)`;
  });

  imgEl.addEventListener('mouseleave', () => {
    imgEl.style.transform = "";
  });

  // CONTROL DEL SCROLL-PINNING:
  // Medimos en qué tercio del track se encuentra el scroll natural
  window.addEventListener('scroll', () => {
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const trackHeight = track.offsetHeight - window.innerHeight;

    // Solo intervenimos mientras el hero-track está en pantalla
    if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
      const scrollProgress = Math.abs(rect.top) / trackHeight; // Valor entre 0 y 1

      let targetIndex = 0;
      if (scrollProgress < 0.33) {
        targetIndex = 0;
      } else if (scrollProgress < 0.66) {
        targetIndex = 1;
      } else {
        targetIndex = 2;
      }

      if (targetIndex !== heroActiveIdx) {
        renderHeroEdition(targetIndex);
      }
    }
  }, { passive: true });
}

/* ==========================================================================
   2. CATÁLOGO COMPLETO & FILTROS POR OCASIÓN
   ========================================================================== */
function initCatalog() {
  const grid = document.getElementById('catalog-grid');
  const tabs = document.querySelectorAll('.catalog-tab');

  function renderGrid() {
    grid.innerHTML = '';
    const filtered = activeFilter === 'todos' 
      ? ALL_PRODUCTS 
      : ALL_PRODUCTS.filter(p => p.occasion === activeFilter);

    filtered.forEach((item, i) => {
      const card = document.createElement('article');
      card.className = 'flower-card';
      card.innerHTML = `
        <span class="card-num">№ 0${i + 1} / ${item.occasionLabel.toUpperCase()}</span>
        <div class="card-img-container">
          <img class="card-img" src="${item.image}" alt="${item.name}" loading="lazy">
        </div>
        <div class="card-headline">
          <h3 class="card-title">${item.name}</h3>
          <span class="card-price">$${item.price.toLocaleString('es-MX')}</span>
        </div>
        <p class="card-desc">${item.desc}</p>
        <div class="card-actions">
          <span class="card-occasion-badge">${item.occasionLabel}</span>
          <button class="btn-card-add" data-id="${item.id}">Añadir al Pedido</button>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeFilter = tab.dataset.filter;
      renderGrid();
    });
  });

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-card-add');
    if (btn) {
      addToCart(btn.dataset.id);
    }
  });

  renderGrid();
}

/* ==========================================================================
   3. CARRITO LATERAL & CHECKOUT WHATSAPP
   ========================================================================== */
function initCartDrawer() {
  const openBtn = document.getElementById('open-cart-btn');
  const closeBtn = document.getElementById('close-cart-btn');
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const waBtn = document.getElementById('checkout-whatsapp-btn');

  function open() {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (openBtn) openBtn.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);
  if (backdrop) backdrop.addEventListener('click', close);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  if (waBtn) {
    waBtn.addEventListener('click', sendOrderViaWhatsApp);
  }
}

function addToCart(productId) {
  const flower = ALL_PRODUCTS.find(p => p.id === productId);
  if (!flower) return;

  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: flower.id,
      name: flower.name,
      price: flower.price,
      image: flower.image,
      quantity: 1
    });
  }

  localStorage.setItem('aurelia_cart', JSON.stringify(cart));
  updateCartUI();
  showToastNotification(`"${flower.name}" añadido al pedido`);

  const badge = document.getElementById('cart-count');
  if (badge) {
    badge.classList.remove('bump');
    void badge.offsetWidth;
    badge.classList.add('bump');
  }
}

function updateQuantity(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== productId);
  }

  localStorage.setItem('aurelia_cart', JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  const badge = document.getElementById('cart-count');
  const container = document.getElementById('cart-items-list');
  const totalEl = document.getElementById('cart-total-amount');
  const waBtn = document.getElementById('checkout-whatsapp-btn');

  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (badge) badge.textContent = count;
  if (totalEl) totalEl.textContent = `$${total.toLocaleString('es-MX')} MXN`;

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart-view">
        <p>Tu carrito floral está vacío.</p>
        <p style="font-size: 0.8rem; margin-top: 6px;">Selecciona flores del catálogo o de las ediciones destacadas.</p>
      </div>
    `;
    if (waBtn) {
      waBtn.style.opacity = '0.5';
      waBtn.style.pointerEvents = 'none';
    }
  } else {
    if (waBtn) {
      waBtn.style.opacity = '1';
      waBtn.style.pointerEvents = 'auto';
    }

    container.innerHTML = '';
    cart.forEach(item => {
      const row = document.createElement('div');
      row.className = 'cart-row';
      row.innerHTML = `
        <img class="cart-row-thumb" src="${item.image}" alt="${item.name}">
        <div class="cart-row-details">
          <h4 class="cart-row-name">${item.name}</h4>
          <span class="cart-row-price">$${(item.price * item.quantity).toLocaleString('es-MX')} MXN</span>
          <div class="cart-row-controls">
            <button class="btn-qty" onclick="updateQuantity('${item.id}', -1)">-</button>
            <span style="font-size: 0.85rem; font-weight: 600; min-width: 16px; text-align: center;">${item.quantity}</span>
            <button class="btn-qty" onclick="updateQuantity('${item.id}', 1)">+</button>
          </div>
        </div>
      `;
      container.appendChild(row);
    });
  }
}

function showToastNotification(text) {
  const toast = document.getElementById('toast-notice');
  if (!toast) return;
  toast.textContent = text;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}

function sendOrderViaWhatsApp() {
  if (cart.length === 0) return;
  const phone = "5215500000000";
  let msg = "¡Hola Aurelia Atelier! Quisiera ordenar el siguiente pedido floral:\n\n";
  let total = 0;
  cart.forEach(item => {
    const sub = item.price * item.quantity;
    total += sub;
    msg += `• ${item.quantity}x ${item.name} ($${sub.toLocaleString('es-MX')} MXN)\n`;
  });
  msg += `\n*Total a pagar: $${total.toLocaleString('es-MX')} MXN*`;
  msg += `\n¿Tienen disponibilidad para entrega hoy?`;

  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
}
