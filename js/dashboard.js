/**
 * MigrantHub - Dashboard JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    checkUserAuth();
    loadUserData();
    initNavigation();
    updateStats();
});

// Check User Authentication
function checkUserAuth() {
    const storedUser = localStorage.getItem('migranthub_user') || 
                       sessionStorage.getItem('migranthub_user');
    
    if (!storedUser) {
        window.location.href = 'login.html';
        return;
    }
    
    return JSON.parse(storedUser);
}

// Load User Data
function loadUserData() {
    const user = checkUserAuth();
    if (!user) return;
    
    // Update header
    const headerUserName = document.getElementById('header-user-name');
    if (headerUserName) {
        headerUserName.textContent = user.name || 'Пользователь';
    }
    
    // Update profile card
    const profileName = document.getElementById('profile-name');
    const profilePhone = document.getElementById('profile-phone');
    const profileRole = document.getElementById('profile-role');
    
    if (profileName) profileName.textContent = user.name || 'Пользователь';
    if (profilePhone) profilePhone.textContent = user.phone || '+7 (___) ___-__-__';
    if (profileRole) {
        const roleNames = {
            'migrant': 'Мигрант',
            'employer': 'Работодатель',
            'landlord': 'Арендодатель',
            'partner': 'Партнёр'
        };
        profileRole.textContent = roleNames[user.role] || 'Мигрант';
    }
}

// Init Navigation
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const currentPath = window.location.pathname;
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && currentPath.includes(href)) {
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');
        }
    });
    
    // Logout handlers
    const logoutBtns = document.querySelectorAll('#logout-btn, #logout-btn-sidebar');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    });
}

// Logout Function
function logout() {
    localStorage.removeItem('migranthub_user');
    sessionStorage.removeItem('migranthub_user');
    localStorage.removeItem('migranthub_remember');
    window.location.href = 'login.html';
}

// Update Stats (Demo Data)
function updateStats() {
    // In real app, this would fetch from API
    const statValues = document.querySelectorAll('.stat-value, .stat-num');
    
    statValues.forEach(stat => {
        const target = parseInt(stat.textContent) || 0;
        if (target === 0) {
            animateStat(stat, 0, 5, 1000);
        }
    });
}

// Animate Stat Counter
function animateStat(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Promo Button Handler
document.addEventListener('click', function(e) {
    if (e.target.closest('.sidebar-promo .btn')) {
        // Track promo click
        console.log('Premium promo clicked');
    }
});

console.log('✅ Dashboard module initialized');