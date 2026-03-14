/* =============================================
   ROOHH FRAGRANCES — MAIN SCRIPT
   ============================================= */

// ============================================
// PRODUCT DATA
// ============================================
const PRODUCTS = [
  {
    id: 1,
    name: "Oud Mystique",
    category: "oriental",
    price: 2499,
    image: "images/product_oud_mystique.png",
    badge: "Bestseller",
    rating: 4.9,
    reviews: 312,
    desc: "A deep, smoky journey through the heart of the Arabian oud forests. Rich, complex and profoundly sensual — this is the signature scent of luxury.",
    top: "Black Pepper, Saffron, Bergamot",
    heart: "Oud, Rose, Amber",
    base: "Sandalwood, Musk, Vetiver",
    bestseller: true,
    size: "50ml"
  },
  {
    id: 2,
    name: "Midnight Rose",
    category: "floral",
    price: 1999,
    image: "images/product_midnight_rose.png",
    badge: "Bestseller",
    rating: 4.8,
    reviews: 241,
    desc: "The timeless elegance of Bulgarian rose kissed by the mystery of the night. An irresistible floral bouquet wrapped in velvety darkness.",
    top: "Pomegranate, Pink Pepper, Lemon",
    heart: "Rose de Mai, Iris, Violet",
    base: "Patchouli, Musk, Amber",
    bestseller: true,
    size: "50ml"
  },
  {
    id: 3,
    name: "Amber Velvet",
    category: "oriental",
    price: 1799,
    image: "images/product_amber_velvet.png",
    badge: "Bestseller",
    rating: 4.7,
    reviews: 189,
    desc: "Warm and enveloping like a cashmere wrap on a cold evening. A rich amber heart surrounded by vanilla and precious woods.",
    top: "Cardamom, Cinnamon, Orange Peel",
    heart: "Amber, Benzoin, Rose",
    base: "Vanilla, Sandalwood, Tonka Bean",
    bestseller: true,
    size: "50ml"
  },
  {
    id: 4,
    name: "White Bloom",
    category: "floral",
    price: 1599,
    image: "images/product_white_bloom.png",
    badge: null,
    rating: 4.6,
    reviews: 158,
    desc: "Clean, luminous and ethereal. White Bloom is the first breath of spring captured in a bottle — delicate jasmine over a powdery soft skin.",
    top: "Bergamot, Lemon, Aldehydes",
    heart: "Jasmine, Peony, Lily of the Valley",
    base: "Musk, Cedarwood, Amberwood",
    bestseller: false,
    size: "30ml"
  },
  {
    id: 5,
    name: "Saffron Dreams",
    category: "oriental",
    price: 2799,
    image: "images/product_saffron_dreams.png",
    badge: "New",
    rating: 4.9,
    reviews: 87,
    desc: "The rarest spice in the world meets the warmth of precious resins. Saffron Dreams is opulence personified — bold, golden, unforgettable.",
    top: "Saffron, Bergamot, Marigold",
    heart: "Rose, Oud, Fenugreek",
    base: "Leather, Myrrh, Amber",
    bestseller: false,
    size: "50ml"
  },
  {
    id: 6,
    name: "Cedar Noir",
    category: "woody",
    price: 1899,
    image: "images/product_cedar_noir.png",
    badge: "New",
    rating: 4.8,
    reviews: 104,
    desc: "A bold, confident fragrance for the modern man. Cedar Noir blends the ruggedness of raw Cedar with the sophistication of dark spices.",
    top: "Black Pepper, Grapefruit, Elemi",
    heart: "Cedarwood, Vetiver, Papyrus",
    base: "Amberwood, Moss, Musk",
    bestseller: false,
    size: "50ml"
  },
  {
    id: 7,
    name: "Floral Elixir",
    category: "floral",
    price: 1699,
    image: "images/product_floral_elixir.png",
    badge: null,
    rating: 4.7,
    reviews: 178,
    desc: "A romantic cascade of pink petals — peony, freesia and a hint of lychee. Floral Elixir is femininity in its most beautiful form.",
    top: "Lychee, Freesia, Green Leaf",
    heart: "Peony, Rose, Magnolia",
    base: "Musk, Cedarwood, Amber",
    bestseller: false,
    size: "50ml"
  }
];

// ============================================
// CART UTILITIES
// ============================================
function getCart() {
  return JSON.parse(localStorage.getItem('roohh_cart') || '[]');
}
function saveCart(cart) {
  localStorage.setItem('roohh_cart', JSON.stringify(cart));
  updateCartBadge();
  window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart } }));
}
function addToCart(product, size = '50ml', qty = 1) {
  const cart = getCart();
  const key = `${product.id}_${size}`;
  const existing = cart.find(item => item.key === key);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ key, id: product.id, name: product.name, image: product.image, price: product.price, size, qty });
  }
  saveCart(cart);
  showToast(`"${product.name}" added to cart!`);
}
function updateCartBadge() {
  const cart = getCart();
  const total = cart.reduce((acc, item) => acc + item.qty, 0);
  const badge = document.getElementById('cartBadge');
  if (badge) {
    badge.textContent = total;
    badge.style.display = total > 0 ? 'flex' : 'none';
    if (total > 0) {
      badge.classList.add('bump');
      setTimeout(() => badge.classList.remove('bump'), 400);
    }
  }
}

// ============================================
// TOAST NOTIFICATION
// ============================================
function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast) return;
  toastMsg.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ============================================
// PRELOADER
// ============================================
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 1800);
  });
  document.body.style.overflow = 'hidden';
}

// ============================================
// NAVBAR
// ============================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const searchToggle = document.getElementById('searchToggle');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchClose = document.getElementById('searchClose');
  const searchInput = document.getElementById('searchInput');

  if (!navbar) return;

  // Scroll behavior
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    const btt = document.getElementById('backToTop');
    if (btt) btt.classList.toggle('show', window.scrollY > 400);
    // Active nav link highlight
    highlightActiveNav();
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hamburger
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // Search
  if (searchToggle && searchOverlay) {
    searchToggle.addEventListener('click', () => {
      searchOverlay.classList.toggle('active');
      if (searchOverlay.classList.contains('active') && searchInput) {
        searchInput.focus();
      }
    });
    if (searchClose) {
      searchClose.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
      });
    }
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        filterProductsBySearch(query);
      });
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') searchOverlay.classList.remove('active');
      });
    }
  }
}

function highlightActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  let found = false;
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    const bottom = top + sec.offsetHeight;
    if (window.scrollY >= top && window.scrollY < bottom && !found) {
      found = true;
      links.forEach(l => {
        l.classList.toggle('active-link', l.getAttribute('href') === `#${sec.id}`);
      });
    }
  });
}

function filterProductsBySearch(query) {
  if (!query) {
    document.querySelectorAll('#productsGrid .product-card').forEach(c => c.classList.remove('hidden'));
    return;
  }
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  document.querySelectorAll('#productsGrid .product-card').forEach(card => {
    const name = card.dataset.name?.toLowerCase() || '';
    const cat = card.dataset.category?.toLowerCase() || '';
    card.classList.toggle('hidden', !name.includes(query) && !cat.includes(query));
  });
}

// ============================================
// HERO PARTICLES
// ============================================
function initParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  const count = 25;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.width = Math.random() * 3 + 1 + 'px';
    p.style.height = p.style.width;
    p.style.animationDuration = Math.random() * 10 + 8 + 's';
    p.style.animationDelay = Math.random() * 8 + 's';
    p.style.opacity = Math.random() * 0.5 + 0.2;
    container.appendChild(p);
  }
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );
  document.querySelectorAll('.reveal-up, .reveal-side').forEach(el => observer.observe(el));
}

// ============================================
// RENDER PRODUCT CARDS
// ============================================
function createProductCard(product) {
  const stars = '★'.repeat(Math.floor(product.rating)) + (product.rating % 1 >= 0.5 ? '½' : '');
  const badgeHTML = product.badge
    ? `<span class="product-badge${product.badge === 'New' ? ' badge-new' : ''}">${product.badge}</span>`
    : '';

  const card = document.createElement('div');
  card.className = 'product-card';
  card.dataset.id = product.id;
  card.dataset.name = product.name;
  card.dataset.category = product.category;

  card.innerHTML = `
    <div class="product-card-img">
      ${badgeHTML}
      <img src="${product.image}" alt="${product.name}" loading="lazy" />
      <div class="product-card-overlay">
        <div class="overlay-btn">
          <i class="fa-solid fa-eye"></i> Quick View
        </div>
      </div>
    </div>
    <div class="product-card-body">
      <p class="product-category">${product.category}</p>
      <h3 class="product-name">${product.name}</h3>
      <p class="product-desc-short">${product.desc}</p>
      <div class="product-footer">
        <span class="product-price">₹${product.price.toLocaleString('en-IN')}</span>
        <div class="product-rating">${stars} <span>(${product.reviews})</span></div>
        <button class="product-add-btn" data-id="${product.id}" aria-label="Add to cart">
          <i class="fa-solid fa-bag-shopping"></i>
        </button>
      </div>
    </div>
  `;

  // Click card → open modal
  card.addEventListener('click', (e) => {
    if (e.target.closest('.product-add-btn')) return;
    openModal(product);
  });

  // Quick add button
  card.querySelector('.product-add-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    addToCart(product, product.size, 1);
  });

  return card;
}

function renderBestsellers() {
  const grid = document.getElementById('bestsellerGrid');
  if (!grid) return;
  const bestsellers = PRODUCTS.filter(p => p.bestseller);
  bestsellers.forEach(p => grid.appendChild(createProductCard(p)));
}

function renderAllProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  PRODUCTS.forEach(p => grid.appendChild(createProductCard(p)));
}

// ============================================
// PRODUCT FILTER
// ============================================
function initProductFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('#productsGrid .product-card').forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
      });
    });
  });

  // Category cards also filter
  document.querySelectorAll('.category-card').forEach(cat => {
    cat.addEventListener('click', () => {
      const filter = cat.dataset.filter;
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        filterBtns.forEach(b => {
          b.classList.toggle('active', b.dataset.filter === filter);
        });
        document.querySelectorAll('#productsGrid .product-card').forEach(card => {
          card.classList.toggle('hidden', card.dataset.category !== filter);
        });
      }, 400);
    });
  });
}

// ============================================
// PRODUCT MODAL
// ============================================
let currentModalProduct = null;
let currentQty = 1;
let currentSize = '50ml';

function openModal(product) {
  currentModalProduct = product;
  currentQty = 1;
  currentSize = product.size || '50ml';

  document.getElementById('modalImg').src = product.image;
  document.getElementById('modalImg').alt = product.name;
  document.getElementById('modalCategory').textContent = product.category;
  document.getElementById('modalName').textContent = product.name;
  document.getElementById('modalReviews').textContent = `${product.reviews} reviews`;
  document.getElementById('modalPrice').textContent = `₹${product.price.toLocaleString('en-IN')}`;
  document.getElementById('modalDesc').textContent = product.desc;
  document.getElementById('modalTop').textContent = product.top;
  document.getElementById('modalHeart').textContent = product.heart;
  document.getElementById('modalBase').textContent = product.base;
  document.getElementById('qtyVal').textContent = 1;

  // Size selection
  document.querySelectorAll('.size-option').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.size === currentSize);
  });

  document.getElementById('productModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('productModal').classList.remove('open');
  document.body.style.overflow = '';
}

function initModal() {
  const modal = document.getElementById('productModal');
  const closeBtn = document.getElementById('modalClose');
  if (!modal) return;

  closeBtn?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Qty
  document.getElementById('qtyMinus')?.addEventListener('click', () => {
    if (currentQty > 1) {
      currentQty--;
      document.getElementById('qtyVal').textContent = currentQty;
    }
  });
  document.getElementById('qtyPlus')?.addEventListener('click', () => {
    currentQty++;
    document.getElementById('qtyVal').textContent = currentQty;
  });

  // Size
  document.querySelectorAll('.size-option').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.size-option').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSize = btn.dataset.size;
    });
  });

  // Add to cart from modal
  document.getElementById('modalAddCart')?.addEventListener('click', () => {
    if (!currentModalProduct) return;
    addToCart(currentModalProduct, currentSize, currentQty);
    closeModal();
  });
}

// ============================================
// TESTIMONIAL SLIDER
// ============================================
function initTestimonialSlider() {
  const track = document.getElementById('testimonialTrack');
  const dotsContainer = document.getElementById('tDots');
  if (!track) return;

  const cards = track.querySelectorAll('.testimonial-card');
  const total = cards.length;
  let current = 0;

  // Figure out how many visible at once (responsive)
  function getVisible() {
    if (window.innerWidth >= 992) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  function getMax() {
    return Math.max(0, total - getVisible());
  }

  // Create dots
  function createDots() {
    dotsContainer.innerHTML = '';
    const max = getMax() + 1;
    for (let i = 0; i < max; i++) {
      const dot = document.createElement('div');
      dot.className = `t-dot${i === 0 ? ' active' : ''}`;
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function goTo(index) {
    const max = getMax();
    current = Math.max(0, Math.min(index, max));
    const card = cards[0];
    const cardWidth = card.offsetWidth + 24; // gap
    track.style.transform = `translateX(-${current * cardWidth}px)`;
    document.querySelectorAll('.t-dot').forEach((d, i) => d.classList.toggle('active', i === current));
  }

  document.getElementById('tPrev')?.addEventListener('click', () => goTo(current - 1));
  document.getElementById('tNext')?.addEventListener('click', () => goTo(current + 1));

  createDots();
  window.addEventListener('resize', () => { createDots(); goTo(0); });

  // Auto slide
  let autoSlide = setInterval(() => goTo(current + 1 > getMax() ? 0 : current + 1), 4000);
  track.parentElement.addEventListener('mouseenter', () => clearInterval(autoSlide));
  track.parentElement.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => goTo(current + 1 > getMax() ? 0 : current + 1), 4000);
  });
}

// ============================================
// NEWSLETTER FORM
// ============================================
function initNewsletter() {
  const form = document.getElementById('nlForm');
  const success = document.getElementById('nlSuccess');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('nlEmail').value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('Please enter a valid email address.');
      return;
    }
    form.style.display = 'none';
    success.classList.add('show');
  });
}

// ============================================
// BACK TO TOP
// ============================================
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================
// SMOOTH SCROLL for anchor links
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = document.getElementById('navbar')?.offsetHeight || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

// ============================================
// CART PAGE
// ============================================
function initCartPage() {
  const cartItemsEl = document.getElementById('cartItemsList');
  const emptyCartEl = document.getElementById('emptyCart');
  const summaryEl = document.getElementById('cartSummary');
  if (!cartItemsEl) return;

  function renderCart() {
    const cart = getCart();
    cartItemsEl.innerHTML = '';
    if (cart.length === 0) {
      emptyCartEl?.classList.remove('hidden');
      summaryEl?.classList.add('hidden');
      return;
    }
    emptyCartEl?.classList.add('hidden');
    summaryEl?.classList.remove('hidden');

    let subtotal = 0;
    cart.forEach(item => {
      const p = PRODUCTS.find(p => p.id === item.id);
      if (!p) return;
      const lineTotal = p.price * item.qty;
      subtotal += lineTotal;

      const el = document.createElement('div');
      el.className = 'cart-item';
      el.innerHTML = `
        <div class="cart-item-img">
          <img src="${p.image}" alt="${p.name}" loading="lazy" />
        </div>
        <div>
          <h4 class="cart-item-name">${p.name}</h4>
          <p class="cart-item-size">Size: ${item.size}</p>
          <div class="cart-item-price">₹${p.price.toLocaleString('en-IN')}</div>
        </div>
        <div class="cart-item-actions">
          <div class="qty-control">
            <button class="qty-btn" data-key="${item.key}" data-action="minus">−</button>
            <span>${item.qty}</span>
            <button class="qty-btn" data-key="${item.key}" data-action="plus">+</button>
          </div>
          <button class="cart-remove" data-key="${item.key}">
            <i class="fa-solid fa-trash-can"></i> Remove
          </button>
        </div>
      `;
      cartItemsEl.appendChild(el);
    });

    // Update totals (discount-aware)
    updateOrderSummary(subtotal);

    // Remove handlers
    cartItemsEl.querySelectorAll('.cart-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        const newCart = getCart().filter(i => i.key !== key);
        saveCart(newCart);
        renderCart();
        showToast('Item removed from cart.');
      });
    });

    // Qty handlers
    cartItemsEl.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        const action = btn.dataset.action;
        const newCart = getCart().map(i => {
          if (i.key === key) {
            i.qty = action === 'plus' ? i.qty + 1 : Math.max(1, i.qty - 1);
          }
          return i;
        });
        saveCart(newCart);
        window.dispatchEvent(new Event('cartUpdated')); // Dispatch event after cart change
        renderCart();
      });
    });
  }

  renderCart();

  // Auto-refresh when cart changes (e.g. added from suggestions below)
  window.addEventListener('cartUpdated', renderCart);

  // ---- PROMO CODE LOGIC ----
  // Declared BEFORE renderCart() so updateOrderSummary() can safely reference them
  const PROMO_CODES = {
    'ROOHH10': { type: 'percent', value: 10,  label: '10% off' },
    'ROOHH20': { type: 'percent', value: 20,  label: '20% off' },
    'FLAT200':  { type: 'flat',    value: 200, label: '₹200 off' },
  };

  let activePromo = null;

  renderCart();

  function updateOrderSummary(subtotal) {
    const discountRow = document.getElementById('discountRow');
    const discountVal  = document.getElementById('discountVal');
    const subtotalEl   = document.getElementById('subtotalVal');
    const shippingEl   = document.getElementById('shippingVal');
    const totalEl      = document.getElementById('totalVal');
    if (!subtotalEl) return;

    let discountAmt = 0;
    if (activePromo && PROMO_CODES[activePromo]) {
      const promo = PROMO_CODES[activePromo];
      discountAmt = promo.type === 'percent'
        ? Math.round(subtotal * promo.value / 100)
        : Math.min(promo.value, subtotal);
    }

    const discounted = subtotal - discountAmt;
    const shipping   = discounted >= 999 ? 0 : 99;
    const total      = discounted + shipping;

    subtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    shippingEl.textContent = shipping === 0 ? 'FREE' : `₹${shipping}`;
    totalEl.textContent    = `₹${total.toLocaleString('en-IN')}`;

    if (discountAmt > 0 && discountRow && discountVal) {
      discountRow.style.display = '';
      discountVal.textContent   = `−₹${discountAmt.toLocaleString('en-IN')}`;
    } else if (discountRow) {
      discountRow.style.display = 'none';
    }
  }

  const applyBtn   = document.getElementById('applyPromoBtn');
  const promoInput = document.getElementById('promoCode');
  const promoMsg   = document.getElementById('promoMsg');

  applyBtn?.addEventListener('click', () => {
    // Remove mode — user clicks 'Remove' to clear the active promo
    if (applyBtn.dataset.mode === 'remove') {
      activePromo = null;
      applyBtn.textContent = 'Apply';
      delete applyBtn.dataset.mode;
      if (promoInput)  { promoInput.disabled = false; promoInput.value = ''; }
      if (promoMsg)    { promoMsg.textContent = ''; }
      const sub = getCart().reduce((acc, item) => {
        const p = PRODUCTS.find(p => p.id === item.id);
        return acc + (p ? p.price * item.qty : 0);
      }, 0);
      updateOrderSummary(sub);
      return;
    }

    const code = promoInput?.value.trim().toUpperCase();
    if (!code) {
      promoMsg.style.color = '#e57373';
      promoMsg.textContent = 'Please enter a promo code.';
      return;
    }
    if (activePromo === code) {
      promoMsg.style.color = '#e57373';
      promoMsg.textContent = 'Code "' + code + '" is already applied.';
      return;
    }
    if (PROMO_CODES[code]) {
      activePromo = code;
      promoMsg.style.color = '#4caf50';
      promoMsg.textContent = '✓ Code "' + code + '" applied — ' + PROMO_CODES[code].label + '!';
      if (promoInput) { promoInput.value = ''; promoInput.disabled = true; }
      applyBtn.textContent = 'Remove';
      applyBtn.dataset.mode = 'remove';
      const sub = getCart().reduce((acc, item) => {
        const p = PRODUCTS.find(p => p.id === item.id);
        return acc + (p ? p.price * item.qty : 0);
      }, 0);
      updateOrderSummary(sub);
    } else {
      promoMsg.style.color = '#e57373';
      promoMsg.textContent = 'Invalid code "' + code + '". Try ROOHH10.';
    }
  });

  // Checkout btn
  document.getElementById('checkoutBtn')?.addEventListener('click', () => {
    showToast('Proceeding to checkout... (Demo mode)');
  });
}

// ============================================
// CART BADGE INIT (for both pages)
// ============================================
function initCartBadge() {
  const badge = document.getElementById('cartBadge');
  if (!badge) return;
  const cart = getCart();
  const total = cart.reduce((acc, i) => acc + i.qty, 0);
  badge.textContent = total;
  badge.style.display = total > 0 ? 'flex' : 'none';
}

// ============================================
// CART BADGE BUMP ANIMATION CSS
// ============================================
(function addBumpStyle() {
  const style = document.createElement('style');
  style.textContent = `
    .cart-badge.bump { animation: bumpScale 0.4s ease; }
    @keyframes bumpScale { 0% { transform: scale(1); } 50% { transform: scale(1.5); } 100% { transform: scale(1); } }
  `;
  document.head.appendChild(style);
})();

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initNavbar();
  initParticles();
  initCartBadge();
  renderBestsellers();
  renderAllProducts();
  initProductFilter();
  initModal();
  initScrollReveal();
  initTestimonialSlider();
  initNewsletter();
  initBackToTop();
  initSmoothScroll();
  initCartPage();
});
