const products = [
    { id: 1, name: "Galaxy Coat v1", price: 1250, category: "men", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600" },
    { id: 4, name: "Infinite Knit", price: 420, category: "men", image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?q=80&w=600" },
    { id: 8, name: "Nova Linen Shirt", price: 299, category: "men", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600" },
    { id: 9, name: "Onyx Bomber Jacket", price: 780, category: "men", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600" },
    { id: 2, name: "Stellar Silk Dress", price: 2100, category: "women", image: "https://images.unsplash.com/photo-1539008835279-434676527cc3?q=80&w=600" },
    { id: 5, name: "Nebula Skirt", price: 380, category: "women", image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=600" },
    { id: 7, name: "Logic Denim", price: 540, category: "women", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600" },
    { id: 10, name: "Mini Star Hoodie", price: 180, category: "kids", image: "https://images.unsplash.com/photo-1519702331535-612668971f4b?q=80&w=600" },
    { id: 11, name: "Cosmic Cargo Kids", price: 240, category: "kids", image: "https://images.unsplash.com/photo-1533512930330-4ac257c86793?q=80&w=600" },
    { id: 12, name: "Solar Yellow Raincoat", price: 320, category: "kids", image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=600" },
    { id: 13, name: "Lunar Sparkle Set", price: 210, category: "kids", image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=600" },
    { id: 3, name: "Cyber Leather Bag", price: 850, category: "accessories", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600" },
    { id: 6, name: "Ultra Vision Shades", price: 990, category: "accessories", image: "https://images.unsplash.com/photo-1511499767350-a1590fdb2863?q=80&w=600" }
[cite_start]]; [cite: 42, 43, 44, 45]

[cite_start]let cart = []; [cite: 46]
[cite_start]let filteredProducts = [...products]; [cite: 46]
[cite_start]let currentCategory = 'all'; [cite: 46]

function renderProducts() {
    [cite_start]const grid = document.getElementById('product-grid'); [cite: 47]
    grid.innerHTML = filteredProducts.map((p, i) => `
        <div class="product-card" style="transition-delay: ${i * 80}ms">
            <div class="img-container aspect-[4/5] bg-gray-50">
                <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-6">
                    <button onclick="addToCart(${p.id})" class="action-btn w-full py-4 rounded-2xl text-white font-bold text-sm">
                        הוספה מהירה +
                    </button>
                </div>
            </div>
            <div class="mt-6 flex justify-between items-center">
                <div>
                    <h3 class="text-lg font-bold text-gray-900">${p.name}</h3>
                    <p class="text-sm font-medium text-blue-500 mt-1">₪${p.price.toLocaleString()}</p>
                </div>
                <div class="px-2 py-1 rounded-full border border-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                    ${p.category}
                </div>
            </div>
        </div>
    [cite_start]`).join(''); [cite: 48, 49, 50, 51, 52, 53]

    const obs = new IntersectionObserver((es) => {
        es.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
    [cite_start]}, { threshold: 0.1 }); [cite: 54]
    [cite_start]document.querySelectorAll('.product-card').forEach(c => obs.observe(c)); [cite: 55]
}

function filterCategory(cat) {
    [cite_start]currentCategory = cat; [cite: 55]
    filteredProducts = cat === 'all' ? [cite_start][...products] : products.filter(p => p.category === cat); [cite: 56]
    
    const titles = {
        'all': 'הנבחרים שלנו',
        'men': 'קולקציית גברים',
        'women': 'קולקציית נשים',
        'kids': 'קולקציית ילדים',
        'accessories': 'אביזרים ומשלימים'
    [cite_start]}; [cite: 57, 58]
    [cite_start]document.getElementById('collection-title').innerText = titles[cat] || titles['all']; [cite: 59]
    
    [cite_start]renderProducts(); [cite: 59]
    [cite_start]window.scrollTo({ top: document.querySelector('main').offsetTop - 100, behavior: 'smooth' }); [cite: 59]
}

function sortProducts() {
    [cite_start]const v = document.getElementById('sort-select').value; [cite: 60]
    [cite_start]if (v === 'low-high') filteredProducts.sort((a,b) => a.price - b.price); [cite: 61]
    [cite_start]if (v === 'high-low') filteredProducts.sort((a,b) => b.price - a.price); [cite: 61]
    [cite_start]renderProducts(); [cite: 61]
}

function addToCart(id) {
    [cite_start]const p = products.find(x => x.id === id); [cite: 62]
    [cite_start]const item = cart.find(x => x.id === id); [cite: 63]
    [cite_start]if(item) item.qty++; else cart.push({...p, qty: 1}); [cite: 63]
    [cite_start]updateUI(); [cite: 63]
    [cite_start]showToast(); [cite: 63]
}

function updateUI() {
    [cite_start]const count = cart.reduce((s, i) => s + i.qty, 0); [cite: 64]
    [cite_start]const total = cart.reduce((s, i) => s + (i.price * i.qty), 0); [cite: 65]
    [cite_start]document.getElementById('cart-count').innerText = count; [cite: 65]
    [cite_start]document.getElementById('cart-total').innerText = `₪${total.toLocaleString()}`; [cite: 65]
    
    [cite_start]const container = document.getElementById('cart-items'); [cite: 66]
    if (cart.length === 0) {
        [cite_start]container.innerHTML = `<div class="text-center py-20 opacity-20"><p>הסל ריק</p></div>`; [cite: 67]
    } else {
        container.innerHTML = cart.map(i => `
            <div class="flex gap-6 items-center">
                <img src="${i.image}" class="w-24 h-24 object-cover rounded-[20px] shadow-sm">
                <div class="flex-1">
                    <h4 class="font-bold">${i.name}</h4>
                    <p class="text-sm text-gray-400">כמות: ${i.qty}</p>
                    <p class="text-blue-600 font-bold mt-1">₪${(i.price * i.qty).toLocaleString()}</p>
                </div>
                <button onclick="removeFromCart(${i.id})" class="text-gray-300 hover:text-red-500 transition">מחק</button>
            </div>
        [cite_start]`).join(''); [cite: 68, 69, 70, 71]
    }
}

function removeFromCart(id) {
    [cite_start]cart = cart.filter(i => i.id !== id); [cite: 71]
    [cite_start]updateUI(); [cite: 72]
}

function toggleCart() {
    [cite_start]const d = document.getElementById('cart-drawer'); [cite: 72]
    [cite_start]const o = document.getElementById('cart-overlay'); [cite: 73]
    if (d.style.transform === 'translateX(0px)') {
        [cite_start]d.style.transform = 'translateX(100%)'; [cite: 73]
        [cite_start]o.style.opacity = '0'; [cite: 74]
        [cite_start]setTimeout(() => o.classList.add('hidden'), 500); [cite: 74]
    } else {
        [cite_start]o.classList.remove('hidden'); [cite: 74]
        [cite_start]setTimeout(() => o.style.opacity = '1', 10); [cite: 75]
        [cite_start]d.style.transform = 'translateX(0px)'; [cite: 75]
    }
}

function showToast() {
    [cite_start]const t = document.getElementById('toast'); [cite: 75]
    [cite_start]t.style.opacity = '1'; [cite: 76]
    [cite_start]t.style.transform = 'translate(-50%, 0)'; [cite: 76]
    setTimeout(() => {
        [cite_start]t.style.opacity = '0'; [cite: 76]
        [cite_start]t.style.transform = 'translate(-50%, -100px)'; [cite: 76]
    [cite_start]}, 2500); [cite: 77]
}

function checkout() {
    [cite_start]if (cart.length === 0) return; [cite: 77]
    [cite_start]alert("הזמנת ה-Galaxy Fashion שלך בדרך!"); [cite: 78]
    [cite_start]cart = []; [cite: 78]
    [cite_start]updateUI(); [cite: 78]
    [cite_start]toggleCart(); [cite: 78]
}

// Initialization
[cite_start]document.getElementById('cart-btn').onclick = toggleCart; [cite: 79]
[cite_start]document.getElementById('close-cart').onclick = toggleCart; [cite: 80]
[cite_start]document.getElementById('cart-overlay').onclick = toggleCart; [cite: 80]
[cite_start]renderProducts(); [cite: 80]
