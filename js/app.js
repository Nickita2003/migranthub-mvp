/**
 * MigrantHub - Main Application JavaScript
 * Полная версия с исправлениями
 */

// ===== TRANSLATIONS =====
const translations = {
    ru: {
        // Header
        'nav-features': 'Возможности',
        'nav-stats': 'Статистика',
        'nav-how': 'Как это работает',
        'nav-about': 'О проекте',
        'btn-login': 'Войти',
        'btn-register': 'Регистрация',
        
        // Hero
        'hero-badge': 'Проверенная платформа',
        'hero-title': 'Единая экосистема для <span class="highlight">легальной адаптации</span> мигрантов в РФ',
        'hero-subtitle': 'Поиск работы, жилья и юридическая защита в одном приложении на родном языке.',
        'btn-start': 'Начать сейчас',
        'btn-learn': 'Узнать больше',
        'stat-users': 'Пользователей',
        'stat-languages': 'Языков',
        'stat-success': 'Успех',
        
        // Features
        'section-features': 'Возможности',
        'section-features-title': 'Всё что нужно для жизни в России',
        'section-features-subtitle': 'Комплексная поддержка на каждом этапе',
        'feature-work-title': 'Работа и жильё',
        'feature-work-desc': 'Проверенные вакансии и жильё с верификацией',
        'feature-work-1': 'Верификация работодателей',
        'feature-work-2': 'Защита от мошенников',
        'feature-work-3': 'Отзывы и рейтинги',
        'feature-learning-title': 'Обучение',
        'feature-learning-desc': 'Курсы русского языка и подготовка к экзаменам',
        'feature-learning-1': 'Курсы A1-B2',
        'feature-learning-2': 'Экзамены на патент',
        'feature-learning-3': 'Сертификаты',
        'feature-legal-title': 'Юридическая поддержка',
        'feature-legal-desc': 'Онлайн-консультации с миграционными юристами',
        'feature-legal-1': 'Консультации 24/7',
        'feature-legal-2': 'Оформление документов',
        'feature-legal-3': 'Видеовстречи',
        'feature-community-title': 'Сообщество',
        'feature-community-desc': 'Форумы и чаты для обмена опытом',
        'feature-community-1': 'Форумы по странам',
        'feature-community-2': 'Чаты поддержки',
        'feature-community-3': 'Наставничество',
        'feature-more': 'Подробнее',
        
        // Stats
        'section-stats': 'Масштаб проблемы',
        'section-stats-title': 'Почему MigrantHub необходим',
        'section-stats-subtitle': 'Данные МВД РФ, 2024-2026',
        'stat-migrants': 'Иностранцев в РФ',
        'stat-deported': 'Выдворено за нарушения',
        'stat-damage': 'Ущерб бюджету',
        'stat-language': 'Не знают русский (A2)',
        
        // How It Works
        'section-how': 'Процесс',
        'section-how-title': 'Как это работает',
        'section-how-subtitle': '3 простых шага к легальной жизни',
        'step-1-title': 'Регистрация',
        'step-1-desc': 'Создайте аккаунт за 2 минуты',
        'step-2-title': 'Поиск',
        'step-2-desc': 'Найдите работу и жильё',
        'step-3-title': 'Легализация',
        'step-3-desc': 'Оформите документы',
        
        // CTA
        'cta-title': 'Готовы начать?',
        'cta-subtitle': 'Присоединяйтесь к тысячам мигрантов',
        'cta-button': 'Зарегистрироваться бесплатно'
    },
    
    uz: {
        'nav-features': 'Imkoniyatlar',
        'nav-stats': 'Statistika',
        'nav-how': 'Qanday ishlaydi',
        'nav-about': 'Loyiha haqida',
        'btn-login': 'Kirish',
        'btn-register': "Ro'yxatdan o'tish",
        'hero-badge': 'Tekshirilgan platforma',
        'hero-title': 'RF da muhojirlar uchun <span class="highlight">yagona adaptatsiya tizimi</span>',
        'hero-subtitle': 'Ish, uy va yuridik himoya bir ilovada ona tilida.',
        'btn-start': 'Hozir boshlash',
        'btn-learn': 'Batafsil',
        'stat-users': 'Foydalanuvchilar',
        'stat-languages': 'Tillar',
        'stat-success': 'Muvaffaqiyat',
        'section-features': 'Imkoniyatlar',
        'section-features-title': 'Rossiyada hayot uchun barcha narsa',
        'section-features-subtitle': 'Adaptatsiyaning har bir bosqichida kompleks qoʻllab-quvvatlash',
        'feature-work-title': 'Ish va uy',
        'feature-work-desc': "Ish beruvchilar va ijarachilarni tekshirish bilan tasdiqlangan vakansiyalar va uy",
        'feature-work-1': 'Ish beruvchilarni tekshirish',
        'feature-work-2': 'Aldovlardan himoya',
        'feature-work-3': 'Sharhlar va reytinglar',
        'feature-learning-title': "O'qitish",
        'feature-learning-desc': "Rus tili kurslari va patent va fuqarolik imtihonlariga tayyorgarlik",
        'feature-learning-1': 'Kurslar A1-B2',
        'feature-learning-2': 'Patent imtihonlari',
        'feature-learning-3': 'Sertifikatlar',
        'feature-legal-title': 'Yuridik yordam',
        'feature-legal-desc': "Muhojirlar yuristlari bilan onlayn maslahatlar va hujjatlar bilan yordam",
        'feature-legal-1': 'Maslahatlar 24/7',
        'feature-legal-2': 'Hujjatlarni rasmiylashtirish',
        'feature-legal-3': 'Video uchrashuvlar',
        'feature-community-title': 'Jamiyat',
        'feature-community-desc': "Boshqa muhojirlar bilan tajriba almashish uchun forumlar va chatlar",
        'feature-community-1': "Mamlakatlar bo'yicha forumlar",
        'feature-community-2': 'Qoʻllab-quvvatlash chatlari',
        'feature-community-3': 'Nastavnichestvo',
        'feature-more': 'Batafsil',
        'section-stats': "Muammoning miqyosi",
        'section-stats-title': "Nima uchun MigrantHub bugun kerak",
        'section-stats-subtitle': "RF IIV, Hisob palatasi, Oliy Iqtisodiyot Maktabi 2024-2026 ma'lumotlari",
        'stat-migrants': "RF da chet elliklar",
        'stat-deported': "Qoidabuzarliklar uchun chiqarildi",
        'stat-damage': "Byudjetga zarar",
        'stat-language': "Rus tilini bilmaydi (A2)",
        'section-how': "Jarayon",
        'section-how-title': 'Qanday ishlaydi',
        'section-how-subtitle': "Rossiyada qonuniy hayot uchun 3 oddiy qadam",
        'step-1-title': "Ro'yxatdan o'tish",
        'step-1-desc': "2 daqiqada ona tilida akkaunt yarating",
        'step-2-title': "Qidiruv",
        'step-2-desc': "Ish, uy va yuridik yordam toping",
        'step-3-title': "Legallashtirish",
        'step-3-desc': "Qo'llab-quvvatlash oling va hujjatlarni rasmiylashtiring",
        'cta-title': "Boshlashga tayyormisiz?",
        'cta-subtitle': "MigrantHub orqali ish va uy topgan minglab muhojirlarga qo'shiling",
        'cta-button': "Bepul ro'yxatdan o'tish"
    },
    
    tg: {
        'nav-features': 'Имкониятҳо',
        'nav-stats': 'Статистика',
        'nav-how': 'Чӣ тавр кор мекунад',
        'nav-about': 'Дар бораи лоиҳа',
        'btn-login': 'Ворид шудан',
        'btn-register': 'Бақайдгирӣ',
        'hero-badge': 'Платформаи тафтишшуда',
        'hero-title': 'Як системаи ягона барои <span class="highlight">мутобиқшавии муҳоҷирон</span> дар РФ',
        'hero-subtitle': 'Ҷустуҷӯи кор, манзил ва ҳимояи ҳуқуқӣ дар як барнома ба забони модарӣ.',
        'btn-start': 'Ҳозир оғоз кунед',
        'btn-learn': 'Маълумоти бештар',
        'stat-users': 'Истифодабарандагон',
        'stat-languages': 'Забонҳо',
        'stat-success': 'Муваффақият',
        'section-features': 'Имкониятҳо',
        'section-features-title': 'Ҳама чиз барои зиндагӣ дар Русия',
        'section-features-subtitle': 'Дастгирии комплексӣ дар ҳар марҳилаи мутобиқшавӣ',
        'feature-work-title': 'Кор ва манзил',
        'feature-work-desc': 'Вакансияҳо ва манзилҳои тафтишшуда бо тафтиши корфармоён ва иҷорадиҳандагон',
        'feature-work-1': 'Тафтиши корфармоён',
        'feature-work-2': 'Ҳимоя аз фиребгарон',
        'feature-work-3': 'Шарҳҳо ва рейтингҳо',
        'feature-learning-title': 'Омӯзиш',
        'feature-learning-desc': 'Курсҳои забони русӣ ва омодагӣ ба имтиҳонҳо барои патент ва шаҳрвандӣ',
        'feature-learning-1': 'Курсҳои A1-B2',
        'feature-learning-2': 'Имтиҳонҳо барои патент',
        'feature-learning-3': 'Сертификатҳо',
        'feature-legal-title': 'Дастгирии ҳуқуқӣ',
        'feature-legal-desc': 'Маслиҳатҳои онлайн бо ҳуқуқшиносони муҳоҷират ва кӯмак бо ҳуҷҷатҳо',
        'feature-legal-1': 'Маслиҳатҳо 24/7',
        'feature-legal-2': 'Расмиёти ҳуҷҷатҳо',
        'feature-legal-3': 'Вохӯриҳои видеоӣ',
        'feature-community-title': 'Ҷомеа',
        'feature-community-desc': 'Форумҳо ва чатҳо барои мубодилаи таҷриба бо дигар муҳоҷирон',
        'feature-community-1': 'Форумҳо аз рӯи кишварҳо',
        'feature-community-2': 'Чатҳои дастгирӣ',
        'feature-community-3': 'Наставничество',
        'feature-more': 'Бештар',
        'section-stats': 'Миқёси мушкилот',
        'section-stats-title': 'Чаро MigrantHub имрӯз зарур аст',
        'section-stats-subtitle': 'Додаҳои ВКД РФ, Палатаи ҳисоб, Донишгоҳи олии иқтисод 2024-2026',
        'stat-migrants': 'Хориҷиён дар РФ',
        'stat-deported': 'Барои вайронкунӣҳо хориҷ карда шуданд',
        'stat-damage': 'Зарар ба буҷет',
        'stat-language': 'Забони русиро намедонанд (A2)',
        'section-how': 'Раванд',
        'section-how-title': 'Чӣ тавр кор мекунад',
        'section-how-subtitle': '3 қадами оддӣ ба зиндагии қонунӣ дар Русия',
        'step-1-title': 'Бақайдгирӣ',
        'step-1-desc': 'Ҳисобро дар 2 дақиқа ба забони модарӣ созед',
        'step-2-title': 'Ҷустуҷӯ',
        'step-2-desc': 'Кор, манзил ва кӯмаки ҳуқуқӣ ёбед',
        'step-3-title': 'Легализатсия',
        'step-3-desc': 'Дастгирӣ гиред ва ҳуҷҷатҳоро расмӣ кунед',
        'cta-title': 'Омода оғоз кардан?',
        'cta-subtitle': 'Ба ҳазорон муҳоҷироне, ки аллакай кор ва манзил ёфтанд, ҳамроҳ шавед',
        'cta-button': 'Бақайдгирии ройгон'
    },
    
    en: {
        'nav-features': 'Features',
        'nav-stats': 'Statistics',
        'nav-how': 'How it works',
        'nav-about': 'About',
        'btn-login': 'Login',
        'btn-register': 'Register',
        'hero-badge': 'Verified platform',
        'hero-title': 'Unified ecosystem for <span class="highlight">legal adaptation</span> of migrants in Russia',
        'hero-subtitle': 'Job search, housing and legal protection in one app in your native language.',
        'btn-start': 'Start now',
        'btn-learn': 'Learn more',
        'stat-users': 'Users',
        'stat-languages': 'Languages',
        'stat-success': 'Success',
        'section-features': 'Features',
        'section-features-title': 'Everything you need for life in Russia',
        'section-features-subtitle': 'Comprehensive support at every stage of adaptation',
        'feature-work-title': 'Jobs & Housing',
        'feature-work-desc': 'Verified vacancies and housing with employer and landlord verification',
        'feature-work-1': 'Employer verification',
        'feature-work-2': 'Fraud protection',
        'feature-work-3': 'Reviews and ratings',
        'feature-learning-title': 'Education',
        'feature-learning-desc': 'Russian language courses and preparation for patent and citizenship exams',
        'feature-learning-1': 'Courses A1-B2',
        'feature-learning-2': 'Patent exams',
        'feature-learning-3': 'Certificates',
        'feature-legal-title': 'Legal support',
        'feature-legal-desc': 'Online consultations with migration lawyers and document assistance',
        'feature-legal-1': '24/7 consultations',
        'feature-legal-2': 'Document processing',
        'feature-legal-3': 'Video meetings',
        'feature-community-title': 'Community',
        'feature-community-desc': 'Forums and chats to share experiences with other migrants',
        'feature-community-1': 'Country forums',
        'feature-community-2': 'Support chats',
        'feature-community-3': 'Mentorship',
        'feature-more': 'Learn more',
        'section-stats': 'Scale of the problem',
        'section-stats-title': 'Why MigrantHub is needed today',
        'section-stats-subtitle': 'Data from MIA RF, Accounts Chamber, HSE 2024-2026',
        'stat-migrants': 'Foreigners in Russia',
        'stat-deported': 'Deported for violations',
        'stat-damage': 'Budget damage',
        'stat-language': "Don't know Russian (A2)",
        'section-how': 'Process',
        'section-how-title': 'How it works',
        'section-how-subtitle': '3 simple steps to legal life in Russia',
        'step-1-title': 'Registration',
        'step-1-desc': 'Create an account in 2 minutes in your native language',
        'step-2-title': 'Search',
        'step-2-desc': 'Find jobs, housing and legal help',
        'step-3-title': 'Legalization',
        'step-3-desc': 'Get support and process documents',
        'cta-title': 'Ready to start?',
        'cta-subtitle': 'Join thousands of migrants who already found jobs and housing through MigrantHub',
        'cta-button': 'Register for free'
    },
    
    kg: {
        'nav-features': 'Мүмкүнчүлүктөр',
        'nav-stats': 'Статистика',
        'nav-how': 'Кантип иштейт',
        'nav-about': 'Долбоор жөнүндө',
        'btn-login': 'Кирүү',
        'btn-register': 'Каттоо',
        'hero-badge': 'Текшерилген платформа',
        'hero-title': 'РФда мигранттар үчүн <span class="highlight">бирдиктүү адаптация системасы</span>',
        'hero-subtitle': 'Жумуш, турак жай жана юридикалык коргоо бир тиркемеде эне тилинде.',
        'btn-start': 'Азыр баштоо',
        'btn-learn': 'Көбүрөөк билүү',
        'stat-users': 'Колдонуучулар',
        'stat-languages': 'Тилдер',
        'stat-success': 'Ийгилик',
        'section-features': 'Мүмкүнчүлүктөр',
        'section-features-title': 'Россияда жашоо үчүн бардыгы',
        'section-features-subtitle': 'Адаптациянын ар бир баскычында комплекстүү колдоо',
        'feature-work-title': 'Жумуш жана турак жай',
        'feature-work-desc': 'Жумуш берүүчүлөрдү жана ижарачыларды текшерүү менен текшерилген вакансиялар жана турак жай',
        'feature-work-1': 'Жумуш берүүчүлөрдү текшерүү',
        'feature-work-2': 'Алдамчылардан коргоо',
        'feature-work-3': 'Пикирлер жана рейтингдер',
        'feature-learning-title': 'Окутуу',
        'feature-learning-desc': 'Орус тили курстары жана патент жана жарандык имтихандарына даярдык',
        'feature-learning-1': 'Курстар A1-B2',
        'feature-learning-2': 'Патент имтихандары',
        'feature-learning-3': 'Сертификаттар',
        'feature-legal-title': 'Юридикалык колдоо',
        'feature-legal-desc': 'Миграциялык юристтер менен онлайн кеңештер жана документтер менен жардам',
        'feature-legal-1': 'Кеңештер 24/7',
        'feature-legal-2': 'Документтерди расмийлөө',
        'feature-legal-3': 'Видео жолугушуулар',
        'feature-community-title': 'Коомчулук',
        'feature-community-desc': 'Башка мигранттар менен тажрыйба алмашуу үчүн форумдар жана чаттар',
        'feature-community-1': 'Өлкөлөр боюнча форумдар',
        'feature-community-2': 'Колдоо чаттары',
        'feature-community-3': 'Наставничество',
        'feature-more': 'Көбүрөөк',
        'section-stats': 'Проблеманын масштабы',
        'section-stats-title': 'Эмне үчүн MigrantHub бүгүн керек',
        'section-stats-subtitle': 'РФ ИИМ, Эсеп палатасы, Жогорку Экономикалык Мектеп 2024-2026',
        'stat-migrants': 'РФда чет элдиктер',
        'stat-deported': 'Бузуулар үчүн чыгарылды',
        'stat-damage': 'Бюджетке зыян',
        'stat-language': 'Орус тилин билбейт (A2)',
        'section-how': 'Процесс',
        'section-how-title': 'Кантип иштейт',
        'section-how-subtitle': 'Россияда мыйзамдуу жашоо үчүн 3 жөнөкөй кадам',
        'step-1-title': 'Каттоо',
        'step-1-desc': '2 мүнөттө эне тилинде аккаунт түзүңүз',
        'step-2-title': 'Издөө',
        'step-2-desc': 'Жумуш, турак жай жана юридикалык жардам табыңыз',
        'step-3-title': 'Легалдаштыруу',
        'step-3-desc': 'Колдоо алыңыз жана документтерди расмийлөө',
        'cta-title': 'Баштоого даярсызбы?',
        'cta-subtitle': 'MigrantHub аркылуу жумуш жана турак жай тапкан миңдеген мигранттарга кошулуңуз',
        'cta-button': 'Акысыз каттоо'
    }
};

// ===== LANGUAGE SWITCHER FUNCTION =====
function setLanguage(lang) {
    const t = translations[lang] || translations.ru;
    
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (t[key]) {
            if (key.includes('title') && t[key].includes('<')) {
                el.innerHTML = t[key];
            } else {
                el.textContent = t[key];
            }
        }
    });
    
    document.documentElement.lang = lang;
    
    if (['ar'].includes(lang)) {
        document.documentElement.dir = 'rtl';
    } else {
        document.documentElement.dir = 'ltr';
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initHeader();
    initMobileMenu();
    initLanguageSwitcher();
    initSmoothScroll();
});

// ===== HEADER SCROLL EFFECT =====
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

// ===== MOBILE MENU =====
function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('nav-menu');
    
    if (!toggle || !menu) return;
    
    toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        const icon = toggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });
    
    menu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            const icon = toggle.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });
}

// ===== LANGUAGE SWITCHER =====
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

// ===== SMOOTH SCROLL =====
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

// ===== EXPORT FOR OTHER MODULES =====
window.MigrantHub = {
    setLanguage,
    translations
};

console.log('✅ MigrantHub initialized successfully');
