/**
 * MigrantHub - Authentication JavaScript
 * Исправленная версия
 */

// ===== LOGIN FUNCTIONS =====
function initLoginForm() {
    const loginForm = document.getElementById('login-form');
    if (!loginForm) return;
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const phone = document.getElementById('phone')?.value.trim();
        const password = document.getElementById('password')?.value;
        const remember = document.getElementById('remember')?.checked;
        const messageDiv = document.getElementById('login-message');
        
        // Validation
        if (!phone || !password) {
            showMessage(messageDiv, 'Заполните все поля', 'error');
            return;
        }
        
        if (password.length < 6) {
            showMessage(messageDiv, 'Пароль должен быть не менее 6 символов', 'error');
            return;
        }
        
        simulateLogin(phone, password, remember, messageDiv);
    });
}

// Password Toggle
function initPasswordToggle() {
    const toggle = document.getElementById('password-toggle');
    const passwordInput = document.getElementById('password');
    
    if (!toggle || !passwordInput) return;
    
    toggle.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        const icon = toggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        }
    });
}

// Social Login
function initSocialLogin() {
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const provider = this.classList.contains('social-vk') ? 'VK' :
                           this.classList.contains('social-telegram') ? 'Telegram' : 'Google';
            alert(`Вход через ${provider} будет доступен в следующей версии`);
        });
    });
}

// Simulate Login
function simulateLogin(phone, password, remember, messageDiv) {
    const submitBtn = document.querySelector('#login-form button[type="submit"]');
    if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Вход...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            const userData = {
                phone: phone,
                isAuthenticated: true,
                loginTime: new Date().toISOString()
            };
            
            if (remember) {
                localStorage.setItem('migranthub_user', JSON.stringify(userData));
                localStorage.setItem('migranthub_remember', 'true');
            } else {
                sessionStorage.setItem('migranthub_user', JSON.stringify(userData));
            }
            
            showMessage(messageDiv, 'Успешный вход! Перенаправление...', 'success');
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        }, 1500);
    }
}

// ===== REGISTRATION FUNCTIONS =====
function initRegisterForm() {
    const registerForm = document.getElementById('register-form');
    if (!registerForm) return;
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const phone = document.getElementById('reg-phone')?.value.trim();
        const email = document.getElementById('reg-email')?.value.trim();
        const password = document.getElementById('reg-password')?.value;
        const passwordConfirm = document.getElementById('reg-password-confirm')?.value;
        const role = document.querySelector('input[name="role"]:checked')?.value;
        const country = document.getElementById('reg-country')?.value;
        const city = document.getElementById('reg-city')?.value.trim();
        const agreeTerms = document.getElementById('agree-terms')?.checked;
        const messageDiv = document.getElementById('register-message');
        
        // Validation
        if (!phone || !password || !role || !country || !agreeTerms) {
            showMessage(messageDiv, 'Заполните все обязательные поля', 'error');
            return;
        }
        
        if (password.length < 8) {
            showMessage(messageDiv, 'Пароль должен быть не менее 8 символов', 'error');
            return;
        }
        
        if (password !== passwordConfirm) {
            showMessage(messageDiv, 'Пароли не совпадают', 'error');
            return;
        }
        
        simulateRegister(phone, email, password, role, country, city, messageDiv);
    });
}

// Password Strength
function initPasswordStrength() {
    const passwordInput = document.getElementById('reg-password');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    if (!passwordInput || !strengthBar) return;
    
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strength = calculatePasswordStrength(password);
        
        strengthBar.innerHTML = '';
        const fill = document.createElement('div');
        fill.className = 'strength-bar-fill ' + strength.class;
        strengthBar.appendChild(fill);
        
        if (strengthText) {
            strengthText.textContent = strength.text;
            strengthText.style.color = strength.color;
        }
    });
}

function calculatePasswordStrength(password) {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    
    if (score <= 2) return { class: 'weak', text: 'Слабый', color: '#ef4444' };
    else if (score <= 3) return { class: 'fair', text: 'Средний', color: '#f59e0b' };
    else if (score <= 4) return { class: 'good', text: 'Хороший', color: '#10b981' };
    else return { class: 'strong', text: 'Надёжный', color: '#2563eb' };
}

// Password Match
function initPasswordMatch() {
    const passwordInput = document.getElementById('reg-password');
    const confirmInput = document.getElementById('reg-password-confirm');
    const matchHint = document.getElementById('password-match');
    
    if (!passwordInput || !confirmInput || !matchHint) return;
    
    confirmInput.addEventListener('input', function() {
        if (this.value === passwordInput.value && this.value.length > 0) {
            matchHint.textContent = '✓ Пароли совпадают';
            matchHint.style.color = '#10b981';
        } else if (this.value.length > 0) {
            matchHint.textContent = '✗ Пароли не совпадают';
            matchHint.style.color = '#ef4444';
        } else {
            matchHint.textContent = '';
        }
    });
}

// Phone Mask
function initPhoneMask() {
    const phoneInput = document.getElementById('reg-phone');
    if (!phoneInput) return;
    
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.startsWith('7') || value.startsWith('8')) value = value.substring(1);
        if (value.length > 10) value = value.substring(0, 10);
        
        if (value.length >= 10) {
            e.target.value = `+7 (${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6, 8)}-${value.substring(8, 10)}`;
        } else if (value.length >= 6) {
            e.target.value = `+7 (${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6)}`;
        } else if (value.length >= 3) {
            e.target.value = `+7 (${value.substring(0, 3)}) ${value.substring(3)}`;
        } else if (value.length > 0) {
            e.target.value = `+7 (${value}`;
        } else {
            e.target.value = '';
        }
    });
}

// Simulate Registration
function simulateRegister(phone, email, password, role, country, city, messageDiv) {
    const submitBtn = document.querySelector('#register-form button[type="submit"]');
    if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Регистрация...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            const userData = {
                phone, email, role, country, city,
                isAuthenticated: true,
                registerTime: new Date().toISOString()
            };
            
            localStorage.setItem('migranthub_user', JSON.stringify(userData));
            showMessage(messageDiv, 'Регистрация успешна! Перенаправление...', 'success');
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        }, 2000);
    }
}

// ===== UTILITY FUNCTIONS =====
function showMessage(element, message, type) {
    if (!element) return;
    element.textContent = message;
    element.className = 'message ' + type;
    element.style.display = 'block';
    setTimeout(() => { element.style.display = 'none'; }, 5000);
}

function checkAuth() {
    const storedUser = localStorage.getItem('migranthub_user') || sessionStorage.getItem('migranthub_user');
    if (storedUser && window.location.pathname.includes('login.html')) {
        window.location.href = 'dashboard.html';
    }
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', function() {
    // Login
    initLoginForm();
    initPasswordToggle();
    initSocialLogin();
    
    // Registration
    initRegisterForm();
    initPasswordStrength();
    initPasswordMatch();
    initPhoneMask();
    
    // Auth check
    checkAuth();
    
    console.log('✅ Auth module initialized');
});
