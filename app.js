(() => {
  const dom = {
    grid: document.getElementById('grid'),
    emptyState: document.getElementById('emptyState'),
    emptySellBtn: document.getElementById('emptySellBtn'),
    searchInput: document.getElementById('searchInput'),
    categorySelect: document.getElementById('categorySelect'),
    conditionSelect: document.getElementById('conditionSelect'),
    minPrice: document.getElementById('minPrice'),
    maxPrice: document.getElementById('maxPrice'),
    sortSelect: document.getElementById('sortSelect'),
    clearFiltersBtn: document.getElementById('clearFiltersBtn'),
    refurbisherToggle: document.getElementById('refurbisherToggle'),
    sellModal: document.getElementById('sellModal'),
    openSellModalBtn: document.getElementById('openSellModalBtn'),
    closeSellModal: document.getElementById('closeSellModal'),
    sellForm: document.getElementById('sellForm'),
    titleInput: document.getElementById('titleInput'),
    sellCategory: document.getElementById('sellCategory'),
    sellCondition: document.getElementById('sellCondition'),
    priceInput: document.getElementById('priceInput'),
    sellerContact: document.getElementById('sellerContact'),
    descInput: document.getElementById('descInput'),
    imageUrlInput: document.getElementById('imageUrlInput'),
    imageFileInput: document.getElementById('imageFileInput'),
    imagePreview: document.getElementById('imagePreview'),
    previewImg: document.getElementById('previewImg'),
    detailModal: document.getElementById('detailModal'),
    closeDetailModal: document.getElementById('closeDetailModal'),
    detailTitle: document.getElementById('detailTitle'),
    detailImage: document.getElementById('detailImage'),
    detailCategory: document.getElementById('detailCategory'),
    detailCondition: document.getElementById('detailCondition'),
    detailStatus: document.getElementById('detailStatus'),
    detailPrice: document.getElementById('detailPrice'),
    detailDesc: document.getElementById('detailDesc'),
    detailContact: document.getElementById('detailContact'),
    requestPurchaseBtn: document.getElementById('requestPurchaseBtn'),
    wishlistBtn: document.getElementById('wishlistBtn'),
    refurbisherActions: document.getElementById('refurbisherActions'),
    markRefurbishBtn: document.getElementById('markRefurbishBtn'),
    markRefurbishedBtn: document.getElementById('markRefurbishedBtn'),
    recycleBtn: document.getElementById('recycleBtn'),
    purchaseModal: document.getElementById('purchaseModal'),
    purchaseForm: document.getElementById('purchaseForm'),
    cancelPurchaseBtn: document.getElementById('cancelPurchaseBtn'),
    closePurchaseModal: document.getElementById('closePurchaseModal'),
  };

  const STORAGE_KEYS = {
    items: 'retool.items.v1',
    wishlist: 'retool.wishlist.v1',
    refurbisher: 'retool.refurbisherMode.v1',
    dataVersion: 'retool.dataVersion',
  };
  const CURRENT_DATA_VERSION = 2;

  const nowIso = () => new Date().toISOString();
  const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

  const Data = {
    readItems() {
      try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.items) || '[]'); } catch { return []; }
    },
    writeItems(items) {
      localStorage.setItem(STORAGE_KEYS.items, JSON.stringify(items));
    },
    seedIfEmpty() {
      const existing = this.readItems();
      const storedVersion = Number(localStorage.getItem(STORAGE_KEYS.dataVersion) || 0);
      if (existing.length && storedVersion >= CURRENT_DATA_VERSION) return existing;
      const seed = [
        { id: uid(), title: 'iPhone XR 64GB', category: 'phone', condition: 'used-good', price: 120, description: 'Battery 83%, small scratches', contact: 'seller1@example.com', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1600&auto=format&fit=crop', status: 'listed', createdAt: nowIso() },
        { id: uid(), title: 'Dell XPS 13 (9360)', category: 'laptop', condition: 'as-is', price: 220, description: 'Keyboard issue, needs service', contact: '555-123-7890', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1600&auto=format&fit=crop', status: 'listed', createdAt: nowIso() },
        { id: uid(), title: 'iPad 7th Gen', category: 'tablet', condition: 'refurbished', price: 180, description: 'Refurbished by ReTool, 90-day warranty', contact: 'shop@example.com', image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35f6?q=80&w=1600&auto=format&fit=crop', status: 'refurbished', createdAt: nowIso() },
        { id: uid(), title: 'Samsung Galaxy S10', category: 'phone', condition: 'used-good', price: 150, description: 'Screen pristine, minor frame wear', contact: 'galaxy_seller@example.com', image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35f6?q=80&w=1600&auto=format&fit=crop', status: 'listed', createdAt: nowIso() },
        { id: uid(), title: 'Google Pixel 5', category: 'phone', condition: 'as-is', price: 95, description: 'Won’t charge reliably. Likely port issue', contact: 'pixelfix@example.com', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1600&auto=format&fit=crop', status: 'listed', createdAt: nowIso() },
        { id: uid(), title: 'OnePlus 7T', category: 'phone', condition: 'refurbished', price: 140, description: 'Replaced battery and screen. 60-day warranty', contact: 'shop@example.com', image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop', status: 'refurbished', createdAt: nowIso() },
        { id: uid(), title: 'HP EliteBook 840 G5', category: 'laptop', condition: 'used-good', price: 260, description: 'i5, 16GB RAM, 256GB SSD, clean install', contact: 'workgear@example.com', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop', status: 'listed', createdAt: nowIso() },
        { id: uid(), title: 'Lenovo ThinkPad X270', category: 'laptop', condition: 'as-is', price: 130, description: 'Battery swollen, needs replacement', contact: 'lenovo_seller@example.com', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1600&auto=format&fit=crop', status: 'refurbish', createdAt: nowIso() },
        { id: uid(), title: 'MacBook Pro 2015 13"', category: 'laptop', condition: 'refurbished', price: 390, description: 'Replaced SSD, fresh thermal paste', contact: 'apple_refurb@example.com', image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop', status: 'refurbished', createdAt: nowIso() },
        { id: uid(), title: 'iPhone 11 128GB', category: 'phone', condition: 'used-good', price: 240, description: 'Battery 86%, includes box', contact: 'seller2@example.com', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1600&auto=format&fit=crop', status: 'listed', createdAt: nowIso() },
        // Added brand variety
        { id: uid(), title: 'Motorola Moto G Power (2021)', category: 'phone', condition: 'used-good', price: 110, description: 'Great battery life, minor scuffs', contact: 'moto@example.com', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1600&auto=format&fit=crop', status: 'listed', createdAt: nowIso() },
        { id: uid(), title: 'Motorola Moto E7', category: 'phone', condition: 'as-is', price: 60, description: 'Power button sticky', contact: 'motofix@example.com', image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35f6?q=80&w=1600&auto=format&fit=crop', status: 'listed', createdAt: nowIso() },
        { id: uid(), title: 'Samsung Galaxy A52', category: 'phone', condition: 'used-good', price: 175, description: 'Camera sharp, includes case', contact: 'samsung_a@example.com', image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35f6?q=80&w=1600&auto=format&fit=crop', status: 'listed', createdAt: nowIso() },
        { id: uid(), title: 'iPhone SE (2020) 64GB', category: 'phone', condition: 'refurbished', price: 160, description: 'New battery installed', contact: 'shop@example.com', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1600&auto=format&fit=crop', status: 'refurbished', createdAt: nowIso() },
        { id: uid(), title: 'OPPO A54', category: 'phone', condition: 'used-good', price: 100, description: 'Dual SIM, good display', contact: 'oppo@example.com', image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop', status: 'listed', createdAt: nowIso() },
        { id: uid(), title: 'OPPO Reno 6', category: 'phone', condition: 'as-is', price: 140, description: 'Back glass cracked', contact: 'opporeno@example.com', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1600&auto=format&fit=crop', status: 'refurbish', createdAt: nowIso() },
        { id: uid(), title: 'Vivo Y20', category: 'phone', condition: 'used-good', price: 90, description: 'Smooth performance, light wear', contact: 'vivo@example.com', image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35f6?q=80&w=1600&auto=format&fit=crop', status: 'listed', createdAt: nowIso() },
        { id: uid(), title: 'Vivo V15', category: 'phone', condition: 'refurbished', price: 130, description: 'Pop-up camera serviced', contact: 'vivorefurb@example.com', image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop', status: 'refurbished', createdAt: nowIso() },
      ];
      // If we have existing items but older version, merge unique ids
      let result = seed;
      if (existing.length) {
        const seen = new Set(existing.map(i => i.id));
        const merged = existing.concat(seed.filter(i => !seen.has(i.id)));
        result = merged;
      }
      this.writeItems(result);
      localStorage.setItem(STORAGE_KEYS.dataVersion, String(CURRENT_DATA_VERSION));
      return result;
    },
    readWishlist() {
      try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.wishlist) || '[]'); } catch { return []; }
    },
    writeWishlist(list) {
      localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(list));
    },
    readRefurbisherMode() {
      return localStorage.getItem(STORAGE_KEYS.refurbisher) === '1';
    },
    writeRefurbisherMode(on) {
      localStorage.setItem(STORAGE_KEYS.refurbisher, on ? '1' : '0');
    }
  };

  let state = {
    items: [],
    refurbisherMode: false,
    activeDetailId: null,
  };

  function load() {
    state.items = Data.seedIfEmpty();
    state.refurbisherMode = Data.readRefurbisherMode();
    dom.refurbisherToggle.checked = state.refurbisherMode;
    render();
  }

  function saveAndRender() {
    Data.writeItems(state.items);
    render();
  }

  function applyFilters(items) {
    const q = dom.searchInput.value.trim().toLowerCase();
    const cat = dom.categorySelect.value;
    const cond = dom.conditionSelect.value;
    const min = Number(dom.minPrice.value || 0);
    const max = Number(dom.maxPrice.value || Infinity);
    const sort = dom.sortSelect.value;

    let result = items.filter(it => {
      if (q && !(it.title.toLowerCase().includes(q) || it.description.toLowerCase().includes(q))) return false;
      if (cat && it.category !== cat) return false;
      if (cond && it.condition !== cond) return false;
      if (it.price < min || it.price > max) return false;
      return true;
    });

    if (sort === 'price-asc') result.sort((a,b)=>a.price-b.price);
    else if (sort === 'price-desc') result.sort((a,b)=>b.price-a.price);
    else result.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));

    return result;
  }

  function render() {
    const filtered = applyFilters(state.items.filter(it => it.status !== 'recycled'));
    dom.grid.innerHTML = '';
    dom.emptyState.hidden = filtered.length !== 0;
    if (!filtered.length) return;

    const frag = document.createDocumentFragment();
    for (const item of filtered) {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <div class="media">
          <img src="${item.image || placeholderImage(item.category)}" alt="${escapeHtml(item.title)}"/>
          <div class="badges">
            <span class="chip">${capitalize(item.category)}</span>
            <span class="chip condition-${item.condition}">${formatCondition(item.condition)}</span>
            <span class="chip status-${item.status}">${formatStatus(item.status)}</span>
          </div>
        </div>
        <div class="body">
          <div class="title">${escapeHtml(item.title)}</div>
          <div class="price">$${item.price}</div>
          <div class="meta">${timeAgo(item.createdAt)}</div>
          <div class="actions">
            <button class="btn primary" data-id="${item.id}" data-action="view">View</button>
            <button class="btn" data-id="${item.id}" data-action="wishlist">${isWishlisted(item.id) ? 'Wishlisted' : 'Wishlist'}</button>
          </div>
        </div>`;
      frag.appendChild(card);
    }
    dom.grid.appendChild(frag);
  }

  function placeholderImage(category) {
    const map = {
      phone: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop',
      laptop: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
      tablet: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35f6?q=80&w=1200&auto=format&fit=crop',
      other: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop'
    };
    return map[category] || map.other;
  }

  function escapeHtml(str) { return str.replace(/[&<>"]/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[s])); }
  function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function formatCondition(c) {
    const map = { 'as-is':'As-Is', 'used-good':'Used (Good)', 'refurbished':'Refurbished' };
    return map[c] || c;
  }
  function formatStatus(s) {
    const map = { 'listed':'Listed', 'refurbish':'For Refurbish', 'refurbished':'Refurbished', 'recycled':'Recycled' };
    return map[s] || s;
  }
  function timeAgo(iso) {
    const diff = (Date.now() - new Date(iso).getTime())/1000;
    if (diff < 60) return 'just now';
    if (diff < 3600) return Math.floor(diff/60) + 'm ago';
    if (diff < 86400) return Math.floor(diff/3600) + 'h ago';
    return Math.floor(diff/86400) + 'd ago';
  }

  function isWishlisted(id) {
    return Data.readWishlist().includes(id);
  }

  // Event handlers
  document.addEventListener('click', (e) => {
    const t = e.target;
    if (t.id === 'resetDataBtn') {
      if (confirm('Reset demo data? This will overwrite current demo items (keeps your wishlist).')) {
        localStorage.removeItem(STORAGE_KEYS.items);
        localStorage.setItem(STORAGE_KEYS.dataVersion, '0');
        state.items = Data.seedIfEmpty();
        render();
      }
    }
    if (t.matches('#openSellModalBtn, #emptySellBtn')) {
      dom.sellModal.showModal();
    }
    if (t === dom.closeSellModal) dom.sellModal.close();

    if (t.matches('.card .actions [data-action="view"]')) {
      const id = t.getAttribute('data-id');
      openDetail(id);
    }
    if (t.matches('.card .actions [data-action="wishlist"]')) {
      const id = t.getAttribute('data-id');
      toggleWishlist(id);
      render();
    }
  });

  dom.searchInput.addEventListener('input', render);
  dom.categorySelect.addEventListener('change', render);
  dom.conditionSelect.addEventListener('change', render);
  dom.minPrice.addEventListener('input', render);
  dom.maxPrice.addEventListener('input', render);
  dom.sortSelect.addEventListener('change', render);
  dom.clearFiltersBtn.addEventListener('click', () => {
    dom.searchInput.value = '';
    dom.categorySelect.value = '';
    dom.conditionSelect.value = '';
    dom.minPrice.value = '';
    dom.maxPrice.value = '';
    dom.sortSelect.value = 'newest';
    render();
  });

  dom.refurbisherToggle.addEventListener('change', () => {
    state.refurbisherMode = dom.refurbisherToggle.checked;
    Data.writeRefurbisherMode(state.refurbisherMode);
    render();
  });

  // Sell form
  dom.imageFileInput.addEventListener('change', async () => {
    const file = dom.imageFileInput.files?.[0];
    if (!file) { dom.imagePreview.hidden = true; return; }
    const url = URL.createObjectURL(file);
    dom.previewImg.src = url;
    dom.imagePreview.hidden = false;
  });
  dom.imageUrlInput.addEventListener('input', () => {
    const url = dom.imageUrlInput.value.trim();
    if (url) { dom.previewImg.src = url; dom.imagePreview.hidden = false; }
    else dom.imagePreview.hidden = true;
  });

  dom.sellForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = dom.titleInput.value.trim();
    const category = dom.sellCategory.value;
    const condition = dom.sellCondition.value;
    const price = Number(dom.priceInput.value);
    const contact = dom.sellerContact.value.trim();
    const description = dom.descInput.value.trim();
    let image = dom.imageUrlInput.value.trim();
    const file = dom.imageFileInput.files?.[0];
    if (!title || !category || !condition || !Number.isFinite(price) || price < 0 || !contact) {
      alert('Please fill all required fields with valid values.');
      return;
    }
    if (!image && file) image = URL.createObjectURL(file);

    const item = { id: uid(), title, category, condition, price, description, contact, image, status: condition === 'refurbished' ? 'refurbished' : 'listed', createdAt: nowIso() };
    state.items.unshift(item);
    saveAndRender();
    dom.sellForm.reset();
    dom.imagePreview.hidden = true;
    dom.sellModal.close();
  });

  // Detail modal
  function openDetail(id) {
    const item = state.items.find(i => i.id === id);
    if (!item) return;
    state.activeDetailId = id;
    dom.detailTitle.textContent = item.title;
    dom.detailImage.src = item.image || placeholderImage(item.category);
    dom.detailCategory.textContent = capitalize(item.category);
    dom.detailCondition.textContent = formatCondition(item.condition);
    dom.detailStatus.textContent = formatStatus(item.status);
    dom.detailCondition.className = `chip condition-${item.condition}`;
    dom.detailStatus.className = `chip status-${item.status}`;
    dom.detailPrice.textContent = '$' + item.price;
    dom.detailDesc.textContent = item.description || 'No description.';
    dom.detailContact.textContent = 'Seller contact: ' + item.contact;
    dom.wishlistBtn.textContent = isWishlisted(id) ? 'Wishlisted' : 'Add to Wishlist';
    dom.refurbisherActions.hidden = !state.refurbisherMode;
    dom.detailModal.showModal();
  }
  dom.closeDetailModal.addEventListener('click', () => dom.detailModal.close());

  dom.wishlistBtn.addEventListener('click', () => {
    if (!state.activeDetailId) return;
    toggleWishlist(state.activeDetailId);
    openDetail(state.activeDetailId);
    render();
  });

  function toggleWishlist(id) {
    const list = Data.readWishlist();
    const idx = list.indexOf(id);
    if (idx >= 0) list.splice(idx,1); else list.push(id);
    Data.writeWishlist(list);
  }

  // Purchase
  dom.requestPurchaseBtn.addEventListener('click', () => {
    if (!state.activeDetailId) return;
    dom.purchaseModal.showModal();
  });
  dom.closePurchaseModal.addEventListener('click', () => dom.purchaseModal.close());
  dom.cancelPurchaseBtn.addEventListener('click', () => dom.purchaseModal.close());
  dom.purchaseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('buyerName').value.trim();
    const contact = document.getElementById('buyerContact').value.trim();
    if (!name || !contact) { alert('Please enter your name and contact.'); return; }
    alert('Your request has been sent to the seller. They will contact you shortly.');
    dom.purchaseModal.close();
  });

  // Refurbisher actions
  dom.markRefurbishBtn.addEventListener('click', () => updateStatus('refurbish'));
  dom.markRefurbishedBtn.addEventListener('click', () => updateStatus('refurbished'));
  dom.recycleBtn.addEventListener('click', () => updateStatus('recycled'));

  function updateStatus(newStatus) {
    if (!state.activeDetailId) return;
    const item = state.items.find(i => i.id === state.activeDetailId);
    if (!item) return;
    item.status = newStatus;
    saveAndRender();
    openDetail(item.id);
  }

  // Initialize
  load();
})();


