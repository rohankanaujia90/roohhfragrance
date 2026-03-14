/* =============================================
   ROOHH FRAGRANCES — ADMIN SCRIPT
   ============================================= */

// Configuration
const ADMIN_EMAIL = "rohankanaujia90@gmail.com";
const ADMIN_PASS = "roh@n789";

// State
let products = [];
let currentEditId = null;

// Selectors
const loginSection = document.getElementById('loginSection');
const dashboardSection = document.getElementById('dashboardSection');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const productsTableBody = document.getElementById('productsTableBody');
const logoutBtn = document.getElementById('logoutBtn');
const addProductBtn = document.getElementById('addProductBtn');
const productModal = document.getElementById('productModal');
const productForm = document.getElementById('productForm');
const modalTitle = document.getElementById('modalTitle');
const closeModalBtns = document.querySelectorAll('.close-modal');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadProducts();
});

// --- Authentication ---
function checkAuth() {
    const isAuth = sessionStorage.getItem('roohh_admin_auth');
    if (isAuth === 'true') {
        showDashboard();
    } else {
        showLogin();
    }
}

function showLogin() {
    loginSection.classList.remove('hidden');
    dashboardSection.classList.add('hidden');
}

function showDashboard() {
    loginSection.classList.add('hidden');
    dashboardSection.classList.remove('hidden');
    renderProducts();
}

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
        sessionStorage.setItem('roohh_admin_auth', 'true');
        loginError.classList.add('hidden');
        showDashboard();
        showToast("Logged in successfully!");
    } else {
        loginError.classList.remove('hidden');
    }
});

logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('roohh_admin_auth');
    showLogin();
    showToast("Logged out.");
});

// --- Product Management ---
function loadProducts() {
    // We use the same key as script.js logic would
    const stored = localStorage.getItem('roohh_products');
    if (stored) {
        products = JSON.parse(stored);
    } else {
        // Fallback to defaults from script.js if not in localStorage yet
        // In a real app we'd fetch these from a central source
        products = [
            { id: 1, name: "Oud Mystique", category: "oriental", price: 2499, image: "images/product_oud_mystique.png", rating: 4.9 },
            { id: 2, name: "Midnight Rose", category: "floral", price: 1999, image: "images/product_midnight_rose.png", rating: 4.8 },
            { id: 3, name: "Amber Velvet", category: "oriental", price: 1799, image: "images/product_amber_velvet.png", rating: 4.7 },
            { id: 4, name: "White Bloom", category: "floral", price: 1599, image: "images/product_white_bloom.png", rating: 4.6 },
            { id: 5, name: "Saffron Dreams", category: "oriental", price: 2799, image: "images/product_saffron_dreams.png", rating: 4.9 },
            { id: 6, name: "Cedar Noir", category: "woody", price: 1899, image: "images/product_cedar_noir.png", rating: 4.8 },
            { id: 7, name: "Floral Elixir", category: "floral", price: 1699, image: "images/product_floral_elixir.png", rating: 4.7 }
        ];
        saveToLocalStorage();
    }
}

function saveToLocalStorage() {
    localStorage.setItem('roohh_products', JSON.stringify(products));
}

function renderProducts() {
    productsTableBody.innerHTML = '';
    products.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <div class="table-product-info">
                    <img src="${p.image}" alt="${p.name}" class="table-p-img">
                    <div>
                        <span class="p-name-cell">${p.name}</span>
                        <span class="p-id-cell">ID: #${p.id}</span>
                    </div>
                </div>
            </td>
            <td><span class="admin-tag">${p.category}</span></td>
            <td>₹${p.price.toLocaleString('en-IN')}</td>
            <td><i class="fa-solid fa-star" style="color:#c8a97e"></i> ${p.rating || 4.5}</td>
            <td>
                <div class="action-btns">
                    <button class="icon-btn edit" onclick="openEditModal(${p.id})"><i class="fa-solid fa-pen"></i></button>
                    <button class="icon-btn delete" onclick="deleteProduct(${p.id})"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        `;
        productsTableBody.appendChild(tr);
    });
}

// --- Modal Logic ---
addProductBtn.addEventListener('click', () => {
    currentEditId = null;
    modalTitle.textContent = "Add New Product";
    productForm.reset();
    document.getElementById('productId').value = '';
    productModal.classList.remove('hidden');
});

function openEditModal(id) {
    const p = products.find(product => product.id === id);
    if (!p) return;

    currentEditId = id;
    modalTitle.textContent = "Edit Product";
    
    document.getElementById('productId').value = p.id;
    document.getElementById('pName').value = p.name;
    document.getElementById('pCategory').value = p.category || 'oriental';
    document.getElementById('pPrice').value = p.price;
    document.getElementById('pSize').value = p.size || '50ml';
    document.getElementById('pImage').value = p.image;
    document.getElementById('pDesc').value = p.desc || '';
    document.getElementById('pTop').value = p.top || '';
    document.getElementById('pHeart').value = p.heart || '';
    document.getElementById('pBase').value = p.base || '';
    document.getElementById('pBestseller').checked = p.bestseller || false;

    productModal.classList.remove('hidden');
}

closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        productModal.classList.add('hidden');
    });
});

productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const id = document.getElementById('productId').value;
    const pData = {
        id: id ? parseInt(id) : Date.now(),
        name: document.getElementById('pName').value,
        category: document.getElementById('pCategory').value,
        price: parseInt(document.getElementById('pPrice').value),
        size: document.getElementById('pSize').value,
        image: document.getElementById('pImage').value,
        desc: document.getElementById('pDesc').value,
        top: document.getElementById('pTop').value,
        heart: document.getElementById('pHeart').value,
        base: document.getElementById('pBase').value,
        bestseller: document.getElementById('pBestseller').checked,
        rating: id ? products.find(x => x.id === parseInt(id)).rating : 4.5,
        reviews: id ? products.find(x => x.id === parseInt(id)).reviews : 0
    };

    if (id) {
        // Edit
        const index = products.findIndex(p => p.id === parseInt(id));
        products[index] = pData;
        showToast("Product updated!");
    } else {
        // Add
        products.push(pData);
        showToast("Product added successfully!");
    }

    saveToLocalStorage();
    renderProducts();
    productModal.classList.add('hidden');
});

function deleteProduct(id) {
    if (confirm("Are you sure you want to delete this product?")) {
        products = products.filter(p => p.id !== id);
        saveToLocalStorage();
        renderProducts();
        showToast("Product deleted.");
    }
}

// --- Utilities ---
function showToast(msg) {
    const toast = document.getElementById('adminToast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
