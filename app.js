/**
 * AABHA - Handcrafted Candles & Wax Art
 * Main Application Logic
 */

// Catalog Data with Real Processed Assets
const PRODUCTS = [
  {
    id: 'bloom-grandeur',
    name: 'The Bloom Grandeur',
    tagline: 'Handcrafted Multi-Flower Candle Bouquet',
    category: 'bouquets',
    categoryName: 'Botanical Bouquets',
    price: 599,
    originalPrice: 999,
    badge: 'Bestseller',
    image: 'assets/processed/the_bloom_grandeur.webp',
    description: 'An exquisite hand-tied bouquet featuring individually sculpted soy wax blooms—daisies, fresh tulips, roses, and sunflowers—intertwined with natural dried baby’s breath and wrapped in designer black-and-gold presentation paper with satin ribbon.',
    wax: '100% Natural Soy & Botanical Wax',
    burnTime: '25-30 Hours Total',
    scentNotes: {
      top: 'Sweet Jasmine & Citrus Peel',
      heart: 'Blooming Damask Rose & Tulip',
      base: 'Warm Sandalwood & Amber'
    },
    customizable: true,
    customPrompt: 'Include a custom gift message for the handwritten card?'
  },
  {
    id: 'nirvana-lotus-bowl',
    name: 'Nirvana Lotus Pond Bowl',
    tagline: 'Personalized Floating Floral Crystal Bowl',
    category: 'floating',
    categoryName: 'Personalized & Floating',
    price: 349,
    originalPrice: 549,
    badge: 'Customizable Name',
    image: 'assets/processed/nirvana_lotus_bowl.webp',
    description: 'A serene dual-wick glass bowl recreating a tranquil lotus pond. Sculpted red and white water lilies, detailed lily pads, and rosebuds float in crystal-clear tinted gel wax. Customizable with bead lettering (e.g., "Pyari Behna", "Mom", initials, or special words).',
    wax: 'High-clarity Mineral Gel & Soy Flower Sculptures',
    burnTime: '35+ Hours',
    scentNotes: {
      top: 'Morning Dew & Aquatic Lotus',
      heart: 'White Lily & Night Jasmine',
      base: 'Soft White Musk & Cedar'
    },
    customizable: true,
    customPrompt: 'Enter custom name/text for floating beads (up to 12 letters):'
  },
  {
    id: 'blush-blossom-cone',
    name: 'Blush Blossom Cone',
    tagline: 'Single-Stem Botanical Cone Bouquet',
    category: 'bouquets',
    categoryName: 'Botanical Bouquets',
    price: 49,
    originalPrice: 99,
    badge: 'Party Favor Favorite',
    image: 'assets/processed/blush_blossom_cone.webp',
    description: 'A delicate sculpted peach daisy candle presented in a chic matte black & gold cone wrapper, accented with baby’s breath, ivory ribbon, and the signature AABHA wax seal. The perfect personal keepsake or luxury event giveaway.',
    wax: 'Pure Soy Wax & Organic Cotton Wick',
    burnTime: '6-8 Hours',
    scentNotes: {
      top: 'White Peach & Mandarin',
      heart: 'Daisy Petals & Magnolia',
      base: 'Creamy Vanilla Pod'
    },
    customizable: true,
    customPrompt: 'Custom ribbon color or gift tag note?'
  },
  {
    id: 'oceanic-whisper-gel',
    name: 'Oceanic Whisper',
    tagline: 'Seashell & Pearl Infused Marine Gel Candle',
    category: 'gels',
    categoryName: 'Marine & Ambient Gels',
    price: 249,
    originalPrice: 399,
    badge: 'Trending',
    image: 'assets/processed/oceanic_whisper_gel.webp',
    description: 'Immerse your space in oceanic tranquility. Layers of deep translucent marine-blue gel capture real hand-picked sea shells, lustrous pearls, and trapped effervescent bubbles that glow mesmerizingly when lit.',
    wax: 'High-purity Crystal Gel Wax',
    burnTime: '30+ Hours',
    scentNotes: {
      top: 'Sea Breeze & Mineral Driftwood',
      heart: 'Aqua Marine & Blue Agave',
      base: 'Crisp Linen & Amber'
    },
    customizable: true,
    customPrompt: 'Custom seashell selection or personalized gift tag?'
  },
  {
    id: 'amour-petals-jar',
    name: 'Amour & Petals Jar',
    tagline: 'Trio Heart & Rosebud Romance Candle',
    category: 'floating',
    categoryName: 'Personalized & Floating',
    price: 99,
    originalPrice: 149,
    badge: 'Love Collection',
    image: 'assets/processed/amour_petals_jar.webp',
    description: 'A romantic glass jar candle featuring a trio of scarlet hearts, a hand-carved rosebud, forest leaves, and shimmering pearls nestled over a layered velvet base. Made for romantic evenings and heartfelt confessions.',
    wax: 'Natural Soy Wax with Cotton Wick',
    burnTime: '28 Hours',
    scentNotes: {
      top: 'Pink Peony & Strawberry Nectar',
      heart: 'Velvet Rose & Tonka Bean',
      base: 'Warm Cashmere & Vanilla'
    },
    customizable: true,
    customPrompt: 'Special anniversary or name note to include?'
  },
  {
    id: 'soleil-sunflower',
    name: 'Soleil Sunflower Sculpt',
    tagline: 'Botanical Wax Art Candle',
    category: 'sculptures',
    categoryName: 'Artisan Sculptures',
    price: 249,
    originalPrice: 299,
    badge: 'New',
    image: 'assets/processed/soleil_sunflower.webp',
    description: 'A burst of sunshine for your mantle. Intricately molded with layered sunny yellow petals and textured cocoa-colored florets, bringing warm radiant energy to any room.',
    wax: '100% Pillar Soy Wax Blend',
    burnTime: '8-10 Hours',
    scentNotes: {
      top: 'Wild Honey & Bergamot',
      heart: 'Sunflower Petals & Mimosa',
      base: 'Golden Amber & Woods'
    },
    customizable: true,
    customPrompt: 'Custom wax color tone (Yellow, Orange, Ivory) or gift card note:'
  },
  {
    id: 'truffle-elegance',
    name: 'Truffle Elegance',
    tagline: 'Gourmand Chocolate Gift Box Candle',
    category: 'gourmand',
    categoryName: 'Gourmand Specials',
    price: 219,
    originalPrice: 299,
    badge: 'Sweet Aroma',
    image: 'assets/processed/truffle_elegance.webp',
    description: 'Indulgent artisanal chocolate gift-box candles topped with translucent frosted wax bows and a sprinkle of festive copper glitter. Smells like a luxury European confectionary.',
    wax: 'Soy Wax with Premium Dessert Fragrance Oils',
    burnTime: '24 Hours',
    scentNotes: {
      top: 'Dark Belgian Chocolate',
      heart: 'Roasted Hazelnut & Caramel Cream',
      base: 'Madagascar Vanilla Bean'
    },
    customizable: true,
    customPrompt: 'Custom aroma or gift box ribbon color:'
  },
  {
    id: 'twilight-radiance-glow',
    name: 'Twilight Radiance',
    tagline: 'Cocktail Ambient Gel Glass',
    category: 'gels',
    categoryName: 'Marine & Ambient Gels',
    price: 479,
    originalPrice: 549,
    badge: 'Evening Glow',
    image: 'assets/processed/twilight_radiance_glow.webp',
    description: 'Layered violet-magenta gel candle in crystal drinkware adorned with the official AABHA logo medallion. Illuminates with a hypnotic warm glow that casts gentle shadows across your room.',
    wax: 'Gel Wax & High-grade Scent Infusion',
    burnTime: '28+ Hours',
    scentNotes: {
      top: 'Black Cherry & Plum',
      heart: 'Night Orchid & Violet',
      base: 'Smoky Oak & Patchouli'
    },
    customizable: true,
    customPrompt: 'Custom color tone or personalized gift tag note:'
  },
  {
    id: 'aabha-signature-hamper',
    name: 'AABHA Signature Gifting Curation',
    tagline: 'Handcrafted Packaging with Satin & Tulle',
    category: 'hampers',
    categoryName: 'Gift Curation & Hampers',
    price: 1899,
    originalPrice: 2299,
    badge: 'Ready to Gift',
    image: 'assets/processed/aabha_signature_hamper.webp',
    description: 'A curated bespoke gifting hamper enveloped in bridal net tulle, tied with a vibrant magenta satin bow, personalized kraft tag ("Handcrafted with Love"), and the AABHA wax seal. Includes your choice of 1 large bowl or 3 assorted botanical candles.',
    wax: 'Custom Selection',
    burnTime: '40+ Hours Combined',
    scentNotes: {
      top: 'Curated Seasonal Florals',
      heart: 'Warm Spiced Amber',
      base: 'Velvet Vanilla & Sandalwood'
    },
    customizable: true,
    customPrompt: 'Name to write on the handwritten kraft tag:'
  },
  {
    id: 'birthday-sunflower-gift',
    name: 'Birthday Blossom Keepsake',
    tagline: 'Sunflower Candle with Handwritten Note',
    category: 'sculptures',
    categoryName: 'Artisan Sculptures',
    price: 29,
    originalPrice: 49,
    badge: 'Personalized Card',
    image: 'assets/processed/birthday_sunflower_gift.webp',
    description: 'A golden sunflower candle packed with a floral backing card and a handwritten personalized message card tied with festive ribbons.',
    wax: 'Soy Wax Blend',
    burnTime: '10 Hours',
    scentNotes: {
      top: 'Sun-drenched Citrus',
      heart: 'Wild Flowers & Chamomile',
      base: 'Warm Honeyed Woods'
    },
    customizable: true,
    customPrompt: 'Whose birthday is it? Enter their name:'
  },
  {
    id: 'bestie-secret-message',
    name: 'Secret "Bestie" Marine Jar',
    tagline: 'Revealing Letter Bead Keepsake',
    category: 'floating',
    categoryName: 'Personalized & Floating',
    price: 299,
    originalPrice: 399,
    badge: 'Friendship Special',
    image: 'assets/processed/bestie_secret_message.webp',
    description: 'A clear marine glass candle with circular beads spelling "BESTIE" nested beneath shimmering translucent blue wax, with a white satin bow and round AABHA seal tag.',
    wax: 'Crystal Clear Gel & Soy Blend',
    burnTime: '22 Hours',
    scentNotes: {
      top: 'Fresh Ozone & Cucumber Melon',
      heart: 'Blue Freesia & Lotus',
      base: 'Clean Cotton Musk'
    },
    customizable: true,
    customPrompt: 'Change "BESTIE" to another word? (Optional)'
  }
];

// WhatsApp Business Number (User configured)
let WHATSAPP_NUMBER = '916290840963'; 

// State Management
let cart = [];
let activeCategory = 'all';
let searchQuery = '';
let currentModalProduct = null;

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  loadCartFromStorage();
  renderProducts();
  setupEventListeners();
  updateCartBadge();
  
  // Sync hero banner price with first product
  const heroPriceElem = document.getElementById('hero-featured-price');
  if (heroPriceElem && PRODUCTS[0]) {
    heroPriceElem.innerText = `₹${PRODUCTS[0].price}`;
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
});

// Render Product Grid
function renderProducts() {
  const container = document.getElementById('product-grid');
  if (!container) return;

  const filtered = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = !searchQuery || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center">
        <div class="w-16 h-16 mx-auto mb-4 text-[#B86B49] opacity-70">
          <i data-lucide="sparkles" class="w-full h-full stroke-1"></i>
        </div>
        <h3 class="text-xl font-serif text-[#23201D] mb-2">No creations found</h3>
        <p class="text-sm text-[#716B64] max-w-sm mx-auto">Try clearing your search query or choosing another category filter.</p>
        <button onclick="resetFilters()" class="mt-4 px-5 py-2 text-xs uppercase tracking-widest bg-[#23201D] text-[#FAF7F2] rounded-full hover:bg-[#B86B49] transition">
          View All Candles
        </button>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  container.innerHTML = filtered.map(p => `
    <div class="product-card group bg-[#FAF7F2] rounded-2xl overflow-hidden border border-[#EAE3DB] flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300">
      <div>
        <!-- Image Container -->
        <div class="card-img-container relative aspect-[4/5] overflow-hidden bg-[#F4EFEA] cursor-pointer" onclick="openQuickView('${p.id}')">
          <img 
            src="${p.image}" 
            alt="${p.name}" 
            class="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <!-- Badge -->
          ${p.badge ? `
            <span class="absolute top-3 left-3 bg-[#FAF7F2]/95 backdrop-blur-md text-[#23201D] border border-[#EAE3DB] text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full shadow-sm">
              ${p.badge}
            </span>
          ` : ''}

          <!-- Customization Available Badge -->
          ${p.customizable ? `
            <span class="absolute top-3 right-3 bg-[#23201D]/90 backdrop-blur-md text-[#E2CA92] border border-[#B86B49]/40 text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
              ✨ Custom
            </span>
          ` : ''}

          <!-- Quick View Pill -->
          <button 
            onclick="event.stopPropagation(); openQuickView('${p.id}')"
            class="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#23201D]/90 backdrop-blur-md text-[#FAF7F2] text-xs py-2 px-4 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#B86B49] flex items-center gap-1.5 shadow-lg whitespace-nowrap"
          >
            <i data-lucide="eye" class="w-3.5 h-3.5"></i>
            <span>Quick View</span>
          </button>
        </div>

        <!-- Content -->
        <div class="p-5">
          <div class="flex items-center justify-between text-xs text-[#B86B49] font-medium tracking-wide uppercase mb-1.5">
            <span>${p.categoryName}</span>
            <span class="text-[#716B64] font-normal lowercase tracking-normal flex items-center gap-1">
              <i data-lucide="flame" class="w-3 h-3 text-[#D97736]"></i> ${p.burnTime}
            </span>
          </div>

          <h3 class="text-xl font-serif text-[#23201D] group-hover:text-[#B86B49] transition cursor-pointer" onclick="openQuickView('${p.id}')">
            ${p.name}
          </h3>
          <p class="text-xs text-[#716B64] line-clamp-2 mt-1 mb-3">
            ${p.description}
          </p>

          <!-- Scent & Customization tags -->
          <div class="flex flex-wrap gap-1.5 mb-4">
            <span class="text-[11px] bg-[#F4EFEA] text-[#716B64] px-2 py-0.5 rounded-md border border-[#EAE3DB]">
              ${p.scentNotes.heart}
            </span>
            ${p.customizable ? `
              <span class="text-[10px] bg-[#B86B49]/10 text-[#B86B49] font-semibold px-2 py-0.5 rounded-md border border-[#B86B49]/30 flex items-center gap-1">
                <i data-lucide="sparkles" class="w-3 h-3 text-[#D97736]"></i>
                Customization Available
              </span>
            ` : ''}
          </div>
        </div>
      </div>

      <!-- Footer & Action -->
      <div class="px-5 pb-5 pt-3 border-t border-[#EAE3DB]/60 flex items-center justify-between">
        <div>
          <span class="text-lg font-serif font-semibold text-[#23201D]">₹${p.price}</span>
          ${p.originalPrice ? `
            <span class="text-xs text-[#716B64] line-through ml-1.5">₹${p.originalPrice}</span>
          ` : ''}
        </div>

        <button 
          onclick="addToBagDirect('${p.id}')"
          class="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#FAF7F2] bg-[#23201D] hover:bg-[#B86B49] px-3.5 py-2 rounded-full transition shadow-sm"
          title="Add to order bag"
        >
          <i data-lucide="shopping-bag" class="w-3.5 h-3.5"></i>
          <span>Add</span>
        </button>
      </div>
    </div>
  `).join('');

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Category Filter Handling
function setCategory(category) {
  activeCategory = category;
  document.querySelectorAll('.filter-tab').forEach(btn => {
    const isCurrent = btn.getAttribute('data-category') === category;
    if (isCurrent) {
      btn.className = 'filter-tab px-4 py-2 text-xs uppercase tracking-widest rounded-full bg-[#23201D] text-[#FAF7F2] font-medium transition shadow-sm';
    } else {
      btn.className = 'filter-tab px-4 py-2 text-xs uppercase tracking-widest rounded-full bg-[#FAF7F2] text-[#716B64] border border-[#EAE3DB] hover:border-[#23201D] transition';
    }
  });
  renderProducts();
}

function resetFilters() {
  activeCategory = 'all';
  searchQuery = '';
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';
  setCategory('all');
}

// Quick View Modal
function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  currentModalProduct = product;

  document.getElementById('modal-img').src = product.image;
  document.getElementById('modal-img').alt = product.name;
  document.getElementById('modal-category').innerText = product.categoryName;
  document.getElementById('modal-title').innerText = product.name;
  document.getElementById('modal-tagline').innerText = product.tagline;
  document.getElementById('modal-price').innerText = `₹${product.price}`;
  document.getElementById('modal-original-price').innerText = product.originalPrice ? `₹${product.originalPrice}` : '';
  document.getElementById('modal-description').innerText = product.description;
  document.getElementById('modal-wax').innerText = product.wax;
  document.getElementById('modal-burn').innerText = product.burnTime;
  
  document.getElementById('modal-scent-top').innerText = product.scentNotes.top;
  document.getElementById('modal-scent-heart').innerText = product.scentNotes.heart;
  document.getElementById('modal-scent-base').innerText = product.scentNotes.base;

  // Customization field
  const customSection = document.getElementById('modal-custom-section');
  const customInput = document.getElementById('modal-custom-input');
  const customLabel = document.getElementById('modal-custom-label');
  
  if (product.customizable) {
    customSection.classList.remove('hidden');
    customLabel.innerText = product.customPrompt || 'Custom personalization note:';
    customInput.value = '';
  } else {
    customSection.classList.add('hidden');
  }

  // Reset quantity
  document.getElementById('modal-qty').innerText = '1';

  // Show modal
  const modal = document.getElementById('quick-view-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';

  if (window.lucide) window.lucide.createIcons();
}

function closeQuickView() {
  const modal = document.getElementById('quick-view-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = '';
  currentModalProduct = null;
}

function changeModalQty(delta) {
  const qtyElem = document.getElementById('modal-qty');
  let qty = parseInt(qtyElem.innerText, 10) || 1;
  qty = Math.max(1, qty + delta);
  qtyElem.innerText = qty;
}

function addModalProductToBag() {
  if (!currentModalProduct) return;
  const qty = parseInt(document.getElementById('modal-qty').innerText, 10) || 1;
  const customInput = document.getElementById('modal-custom-input');
  const note = (currentModalProduct.customizable && customInput) ? customInput.value.trim() : '';

  addToBag(currentModalProduct, qty, note);
  closeQuickView();
}

function orderModalProductDirectWhatsApp() {
  if (!currentModalProduct) return;
  const qty = parseInt(document.getElementById('modal-qty').innerText, 10) || 1;
  const customInput = document.getElementById('modal-custom-input');
  const note = (currentModalProduct.customizable && customInput) ? customInput.value.trim() : '';

  let msg = `Hello AABHA! 🌸 I would like to order:\n\n`;
  msg += `*Item:* ${currentModalProduct.name}\n`;
  msg += `*Quantity:* ${qty}\n`;
  msg += `*Price:* ₹${currentModalProduct.price * qty}\n`;
  if (note) {
    msg += `*Personalization:* "${note}"\n`;
  }
  msg += `\nPlease let me know availability and delivery details. Thank you!`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

// Shopping Bag Management
function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem('aabha_cart');
    if (saved) cart = JSON.parse(saved);
  } catch (e) {
    cart = [];
  }
}

function saveCartToStorage() {
  try {
    localStorage.setItem('aabha_cart', JSON.stringify(cart));
  } catch (e) {}
}

function addToBagDirect(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  addToBag(product, 1, '');
}

function addToBag(product, qty = 1, note = '') {
  // Check if item with same note already in cart
  const existing = cart.find(item => item.id === product.id && item.note === note);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      categoryName: product.categoryName,
      qty: qty,
      note: note
    });
  }

  saveCartToStorage();
  updateCartBadge();
  renderCartDrawer();
  showToast(`Added "${product.name}" to your order bag!`);
}

function updateCartItemQty(index, delta) {
  if (!cart[index]) return;
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  saveCartToStorage();
  updateCartBadge();
  renderCartDrawer();
}

function removeCartItem(index) {
  if (!cart[index]) return;
  cart.splice(index, 1);
  saveCartToStorage();
  updateCartBadge();
  renderCartDrawer();
}

function updateCartBadge() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById('cart-badge');
  if (badge) {
    badge.innerText = count;
    badge.classList.toggle('hidden', count === 0);
  }
}

function toggleCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cart-backdrop');
  const panel = document.getElementById('cart-panel');

  if (drawer.classList.contains('hidden')) {
    renderCartDrawer();
    drawer.classList.remove('hidden');
    setTimeout(() => {
      backdrop.classList.remove('opacity-0');
      panel.classList.remove('translate-x-full');
    }, 10);
    document.body.style.overflow = 'hidden';
  } else {
    backdrop.classList.add('opacity-0');
    panel.classList.add('translate-x-full');
    setTimeout(() => {
      drawer.classList.add('hidden');
      document.body.style.overflow = '';
    }, 300);
  }
}

function renderCartDrawer() {
  const container = document.getElementById('cart-items-container');
  const totalElem = document.getElementById('cart-total-price');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="py-16 text-center">
        <div class="w-16 h-16 mx-auto mb-4 text-[#D5CABE] flex items-center justify-center rounded-full bg-[#FAF7F2]">
          <i data-lucide="shopping-bag" class="w-8 h-8 stroke-1 text-[#716B64]"></i>
        </div>
        <h4 class="font-serif text-lg text-[#23201D] mb-1">Your bag is empty</h4>
        <p class="text-xs text-[#716B64] max-w-xs mx-auto mb-6">Explore our handcrafted collection and add your favorite candles to order directly via WhatsApp.</p>
        <button onclick="toggleCartDrawer()" class="px-5 py-2 text-xs uppercase tracking-widest bg-[#23201D] text-[#FAF7F2] rounded-full hover:bg-[#B86B49] transition">
          Discover Candles
        </button>
      </div>
    `;
    if (totalElem) totalElem.innerText = '₹0';
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  let total = 0;
  container.innerHTML = cart.map((item, index) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;
    return `
      <div class="flex gap-4 p-3 bg-[#FAF7F2] rounded-xl border border-[#EAE3DB]">
        <img src="${item.image}" alt="${item.name}" class="w-16 h-20 object-cover rounded-lg bg-[#F4EFEA] flex-shrink-0" />
        <div class="flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-start justify-between">
              <h4 class="font-serif text-sm font-semibold text-[#23201D] leading-tight">${item.name}</h4>
              <button onclick="removeCartItem(${index})" class="text-[#716B64] hover:text-red-600 transition p-1">
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
              </button>
            </div>
            <p class="text-[11px] text-[#B86B49]">${item.categoryName}</p>
            ${item.note ? `<p class="text-[10px] text-[#716B64] italic bg-white/70 px-2 py-0.5 rounded border border-[#EAE3DB] mt-1">"${item.note}"</p>` : ''}
          </div>

          <div class="flex items-center justify-between mt-2">
            <div class="flex items-center border border-[#D5CABE] rounded-full bg-white">
              <button onclick="updateCartItemQty(${index}, -1)" class="w-6 h-6 flex items-center justify-center text-[#23201D] hover:text-[#B86B49] text-xs font-bold">-</button>
              <span class="w-6 text-center text-xs font-semibold">${item.qty}</span>
              <button onclick="updateCartItemQty(${index}, 1)" class="w-6 h-6 flex items-center justify-center text-[#23201D] hover:text-[#B86B49] text-xs font-bold">+</button>
            </div>
            <span class="text-sm font-serif font-semibold text-[#23201D]">₹${itemTotal}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (totalElem) totalElem.innerText = `₹${total}`;
  if (window.lucide) window.lucide.createIcons();
}

function checkoutViaWhatsApp() {
  if (cart.length === 0) return;

  const cityInput = document.getElementById('checkout-city-input');
  const city = cityInput ? cityInput.value.trim() : '';
  const noteInput = document.getElementById('checkout-note-input');
  const globalNote = noteInput ? noteInput.value.trim() : '';

  let total = 0;
  let msg = `🌸 *New Order Request - AABHA Handcrafted Studio*\n\n`;
  msg += `Hello! I would like to place an order for the following creations:\n\n`;

  cart.forEach((item, i) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;
    msg += `${i + 1}. *${item.name}* (x${item.qty})\n`;
    msg += `   Price: ₹${itemTotal} (₹${item.price} each)\n`;
    if (item.note) {
      msg += `   Customization: "${item.note}"\n`;
    }
  });

  msg += `\n*Estimated Total:* ₹${total}\n`;
  if (city) msg += `*Delivery Location:* ${city}\n`;
  if (globalNote) msg += `*Special Instructions:* ${globalNote}\n`;
  msg += `\nPlease confirm availability, delivery charges, and payment details. Thank you!`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

// Toast Notification
function showToast(text) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'flex items-center gap-2 bg-[#23201D] text-[#FAF7F2] text-xs px-4 py-3 rounded-full shadow-lg border border-[#B86B49]/40 transform transition-all duration-300 translate-y-4 opacity-0';
  toast.innerHTML = `
    <i data-lucide="check" class="w-3.5 h-3.5 text-[#D97736]"></i>
    <span>${text}</span>
  `;

  container.appendChild(toast);
  if (window.lucide) window.lucide.createIcons();

  setTimeout(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  }, 10);

  setTimeout(() => {
    toast.classList.add('translate-y-4', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Event Listeners Setup
function setupEventListeners() {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderProducts();
    });
  }

  // Close modals on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeQuickView();
      const drawer = document.getElementById('cart-drawer');
      if (drawer && !drawer.classList.contains('hidden')) {
        toggleCartDrawer();
      }
    }
  });
}
