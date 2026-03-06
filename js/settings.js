/**
 * MigrantHub - Settings Page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    initAccountSettings();
    initNotificationSettings();
    initLanguageSettings();
    initPrivacySettings();
    initDeleteAccountModal();
    loadSettingsData();
});

// Account Settings
function initAccountSettings() {
    const form = document.getElementById('account-settings-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        changePassword();
    });
}

// Change Password
function changePassword() {
    const currentPassword = document.getElementById('current-password')?.value;
    const newPassword = document.getElementById('new-password')?.value;
    const confirmPassword = document.getElementById('confirm-password')?.value;
    
    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
        showMessage('Заполните все поля', 'error');
        return;
    }
    
    if (newPassword.length < 8) {
        showMessage('Пароль должен быть не менее 8 символов', 'error');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showMessage('Пароли не совпадают', 'error');
        return;
    }
    
    // Simulate password change
    const saveBtn = document.getElementById('save-settings-btn');
    const originalText = saveBtn ? saveBtn.innerHTML : '';
    
    if (saveBtn) {
        saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Сохранение...';
        saveBtn.disabled = true;
    }
    
    setTimeout(() => {
        showMessage('Пароль успешно изменён', 'success');
        
        if (saveBtn) {
            saveBtn.innerHTML = originalText;
            saveBtn.disabled = false;
        }
        
        // Reset form
        if (document.getElementById('current-password')) document.getElementById('current-password').value = '';
        if (document.getElementById('new-password')) document.getElementById('new-password').value = '';
        if (document.getElementById('confirm-password')) document.getElementById('confirm-password').value = '';
        
    }, 1500);
}

// Notification Settings
function initNotificationSettings() {
    const toggles = document.querySelectorAll('.notification-settings .toggle-switch input');
    
    toggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            saveNotificationSettings();
        });
    });
}

// Save Notification Settings
function saveNotificationSettings() {
    const settings = {
        email: document.getElementById('email-notifications')?.checked || false,
        sms: document.getElementById('sms-notifications')?.checked || false,
        push: document.getElementById('push-notifications')?.checked || false,
        job: document.getElementById('job-notifications')?.checked || false,
        housing: document.getElementById('housing-notifications')?.checked || false,
        newsletter: document.getElementById('newsletter-notifications')?.checked || false
    };
    
    localStorage.setItem('migranthub_notification_settings', JSON.stringify(settings));
    showMessage('Настройки уведомлений сохранены', 'success');
}

// Language Settings
function initLanguageSettings() {
    const form = document.getElementById('language-settings-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        saveLanguageSettings();
    });
}

// Save Language Settings
function saveLanguageSettings() {
    const language = document.getElementById('interface-language')?.value || 'ru';
    const timezone = document.getElementById('timezone')?.value || 'Europe/Moscow';
    const dateFormat = document.getElementById('date-format')?.value || 'DD.MM.YYYY';
    
    const settings = {
        language,
        timezone,
        dateFormat
    };
    
    localStorage.setItem('migranthub_language_settings', JSON.stringify(settings));
    
    // Update app language
    if (window.MigrantHub && window.MigrantHub.setLanguage) {
        window.MigrantHub.setLanguage(language);
    }
    
    showMessage('Настройки языка сохранены', 'success');
}

// Privacy Settings
function initPrivacySettings() {
    const toggles = document.querySelectorAll('.privacy-settings .toggle-switch input');
    
    toggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            // Auto-save on change
        });
    });
}

// Save Privacy Settings
function savePrivacySettings() {
    const settings = {
        profileVisible: document.getElementById('profile-visible')?.checked || false,
        phoneVisible: document.getElementById('phone-visible')?.checked || false,
        activityVisible: document.getElementById('activity-visible')?.checked || false,
        onlineStatus: document.getElementById('online-status')?.checked || false
    };
    
    localStorage.setItem('migranthub_privacy_settings', JSON.stringify(settings));
    showMessage('Настройки конфиденциальности сохранены', 'success');
}

// Delete Account Modal
function initDeleteAccountModal() {
    const modal = document.getElementById('delete-account-modal');
    const closeBtn = document.getElementById('modal-close');
    const cancelBtn = document.getElementById('modal-cancel');
    const confirmBtn = document.getElementById('modal-confirm-delete');
    
    if (!modal) return;
    
    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', () => closeModal());
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => closeModal());
    }
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Confirm delete
    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => deleteAccount());
    }
}

// Confirm Delete Account
function confirmDeleteAccount() {
    const modal = document.getElementById('delete-account-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('delete-account-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset confirm text
        const confirmText = document.getElementById('delete-confirm-text');
        if (confirmText) confirmText.value = '';
    }
}

// Delete Account
function deleteAccount() {
    const confirmText = document.getElementById('delete-confirm-text');
    const confirmBtn = document.getElementById('modal-confirm-delete');
    
    if (!confirmText || !confirmBtn) return;
    
    if (confirmText.value !== 'УДАЛИТЬ') {
        showMessage('Введите "УДАЛИТЬ" для подтверждения', 'error');
        return;
    }
    
    const originalText = confirmBtn.innerHTML;
    confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Удаление...';
    confirmBtn.disabled = true;
    
    // Simulate account deletion
    setTimeout(() => {
        // Clear all data
        localStorage.clear();
        sessionStorage.clear();
        
        showMessage('Аккаунт удалён', 'success');
        
        // Redirect to login
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
        
    }, 2000);
}

// Logout All Devices
function logoutAllDevices() {
    if (!confirm('Вы уверены, что хотите выйти со всех устройств?')) return;
    
    // Clear all sessions
    localStorage.removeItem('migranthub_user');
    sessionStorage.removeItem('migranthub_user');
    
    showMessage('Все сессии завершены', 'success');
    
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1500);
}

// Clear Cache
function clearCache() {
    if (!confirm('Очистить кэш приложения?')) return;
    
    // Clear cache-related data
    const keysToRemove = [
        'migranthub_cache',
        'migranthub_temp_data'
    ];
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
    
    showMessage('Кэш очищен', 'success');
}

// Download Data
function downloadData() {
    showMessage('Подготовка данных для скачивания...', 'success');
    
    // Simulate data export
    setTimeout(() => {
        showMessage('Данные готовы к скачиванию', 'success');
        
        // In real app, would trigger download
        // const data = { /* user data */ };
        // downloadJSON(data, 'migranthub-data.json');
        
    }, 2000);
}

// Load Settings Data
function loadSettingsData() {
    // Load notification settings
    const notificationSettings = JSON.parse(localStorage.getItem('migranthub_notification_settings') || '{}');
    
    if (document.getElementById('email-notifications')) {
        document.getElementById('email-notifications').checked = notificationSettings.email !== false;
    }
    if (document.getElementById('sms-notifications')) {
        document.getElementById('sms-notifications').checked = notificationSettings.sms || false;
    }
    if (document.getElementById('push-notifications')) {
        document.getElementById('push-notifications').checked = notificationSettings.push !== false;
    }
    if (document.getElementById('job-notifications')) {
        document.getElementById('job-notifications').checked = notificationSettings.job !== false;
    }
    if (document.getElementById('housing-notifications')) {
        document.getElementById('housing-notifications').checked = notificationSettings.housing !== false;
    }
    if (document.getElementById('newsletter-notifications')) {
        document.getElementById('newsletter-notifications').checked = notificationSettings.newsletter || false;
    }
    
    // Load language settings
    const languageSettings = JSON.parse(localStorage.getItem('migranthub_language_settings') || '{}');
    
    if (document.getElementById('interface-language') && languageSettings.language) {
        document.getElementById('interface-language').value = languageSettings.language;
    }
    if (document.getElementById('timezone') && languageSettings.timezone) {
        document.getElementById('timezone').value = languageSettings.timezone;
    }
    if (document.getElementById('date-format') && languageSettings.dateFormat) {
        document.getElementById('date-format').value = languageSettings.dateFormat;
    }
    
    // Load privacy settings
    const privacySettings = JSON.parse(localStorage.getItem('migranthub_privacy_settings') || '{}');
    
    if (document.getElementById('profile-visible')) {
        document.getElementById('profile-visible').checked = privacySettings.profileVisible !== false;
    }
    if (document.getElementById('phone-visible')) {
        document.getElementById('phone-visible').checked = privacySettings.phoneVisible !== false;
    }
    if (document.getElementById('activity-visible')) {
        document.getElementById('activity-visible').checked = privacySettings.activityVisible || false;
    }
    if (document.getElementById('online-status')) {
        document.getElementById('online-status').checked = privacySettings.onlineStatus !== false;
    }
}

// Save All Settings Button
document.addEventListener('DOMContentLoaded', function() {
    const saveBtn = document.getElementById('save-settings-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            saveNotificationSettings();
            saveLanguageSettings();
            savePrivacySettings();
            showMessage('Все настройки сохранены', 'success');
        });
    }
});

// Show Message
function showMessage(message, type = 'success') {
    const messageEl = document.createElement('div');
    messageEl.className = `toast-message toast-${type}`;
    messageEl.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    messageEl.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 600;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(messageEl);
    
    setTimeout(() => {
        messageEl.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => messageEl.remove(), 300);
    }, 3000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

console.log('✅ Settings module initialized');