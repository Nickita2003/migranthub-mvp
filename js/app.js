/**
 * MigrantHub - Main JavaScript
 */

// Translations
const translations = {
    ru: {
        'hero-badge': 'Проверенная платформа',
        'hero-title': 'Единая экосистема для <span class="highlight">легальной адаптации</span> мигрантов в РФ',
        'hero-subtitle': 'Поиск работы, жилья и юридическая защита в одном приложении на родном языке.',
        'btn-start': 'Начать сейчас',
        'btn-learn': 'Узнать больше',
        'stat-users': 'Пользователей',
        'stat-languages': 'Языков',
        'stat-success': 'Успех'
    },
    uz: {
        'hero-badge': 'Tekshirilgan platforma',
        'hero-title': 'RF da muhojirlar uchun <span class="highlight">yagona adaptatsiya tizimi</span>',
        'hero-subtitle': 'Ish, uy va yuridik himoya bir ilovada ona tilida.',
        'btn-start': 'Hozir boshlash',
        'btn-learn': 'Batafsil',
        'stat-users': 'Foydalanuvchilar',
        'stat-languages': 'Tillar',
        'stat-success': 'Muvaffaqiyat'
    },
    tg: {
        'hero-badge': 'Платформаи тафтишшуда',
        'hero-title': 'Як системаи ягона барои <span class="highlight">мутобиқшавии муҳоҷирон</span> дар РФ',
        'hero-subtitle': 'Ҷустуҷӯи кор, манзил ва ҳимояи ҳуқуқӣ дар як барнома.',
        'btn-start': 'Ҳозир оғоз кунед',
        'btn-learn': 'Маълумоти бештар',
        'stat-users': 'Истифодабарандагон',
        'stat-languages': 'Забонҳо',
        'stat-success': 'Муваффақият'
    },
    en: {
        'hero-badge': 'Verified platform',
        'hero-title': 'Unified ecosystem for <span class="highlight">legal adaptation</span> of migrants in Russia',
        'hero-subtitle': 'Job search, housing and legal protection in one app in your native language.',
        'btn-start': 'Start now',
        'btn-learn': 'Learn more',
        'stat-users': 'Users',
        'stat-languages': 'Languages',
        'stat-success': 'Success'
    },
    kg: {
        'hero-badge': 'Текшерилген платформа',
        'hero-title': 'РФда мигранттар үчүн <span class="highlight">бирдиктүү адаптация системасы</span>',
        'hero-subtitle': 'Жумуш, турак жай жана юридикалык коргоо бир тиркемеде.',
        'btn-start': 'Азыр баштоо',
        'btn-learn': 'Көбүрөөк билүү',
        'stat-users': 'Колдонуучулар',
        'stat-languages': 'Тилдер',
        'stat-success': 'Ийгилик'
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initHeader();
    initMobileMenu();
    initLanguageSwitcher();
    initSmoothScroll();
});

// Header Scroll Effect
function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Mobile Menu
function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('nav-menu');
    
    if (!toggle || !menu) return;
    
    toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        const icon = toggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// Language Switcher
function initLanguageSwitcher() {
    const selector = document.getElementById('language-selector');
    if (!selector) return;
    
    const savedLang = localStorage.getItem('migranthub_lang') || 'ru';
    selector.value = savedLang;
    setLanguage(savedLang);
    
    selector.addEventListener('change', (e) => {
        const lang = e.target.value;
        setLanguage(lang);
        localStorage.setItem('migranthub_lang', lang);
    });
}

function setLanguage(lang) {
    const t = translations[lang] || translations.ru;
    
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (t[key]) {
            el.innerHTML = t[key];
        }
    });
    
    document.documentElement.lang = lang;
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = document.getElementById('header')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

console.log('✅ MigrantHub initialized');
