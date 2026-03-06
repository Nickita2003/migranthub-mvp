/**
 * MigrantHub - Profile Page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    initProfileForm();
    initDocumentUpload();
    initProfileStats();
    loadProfileData();
});

// Profile Form
function initProfileForm() {
    const profileForm = document.getElementById('profile-form');
    const saveBtn = document.getElementById('save-profile-btn');
    
    if (!profileForm || !saveBtn) return;
    
    saveBtn.addEventListener('click', function(e) {
        e.preventDefault();
        saveProfile();
    });
    
    // Auto-save on change (debounced)
    const inputs = profileForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('change', debounce(() => {
            updateProfileCompletion();
        }, 500));
    });
}

// Save Profile
function saveProfile() {
    const saveBtn = document.getElementById('save-profile-btn');
    if (!saveBtn) return;
    
    const originalText = saveBtn.innerHTML;
    saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Сохранение...';
    saveBtn.disabled = true;
    
    // Collect form data
    const profileData = {
        lastName: document.getElementById('last-name')?.value || '',
        firstName: document.getElementById('first-name')?.value || '',
        middleName: document.getElementById('middle-name')?.value || '',
        birthDate: document.getElementById('birth-date')?.value || '',
        citizenship: document.getElementById('citizenship')?.value || '',
        gender: document.getElementById('gender')?.value || '',
        phone: document.getElementById('phone')?.value || '',
        email: document.getElementById('email')?.value || '',
        city: document.getElementById('city')?.value || '',
        bio: document.getElementById('bio')?.value || ''
    };
    
    // Simulate save
    setTimeout(() => {
        localStorage.setItem('migranthub_profile', JSON.stringify(profileData));
        
        showMessage('Профиль успешно сохранён', 'success');
        
        saveBtn.innerHTML = originalText;
        saveBtn.disabled = false;
        
        // Update header name
        const headerName = document.getElementById('header-user-name');
        const profileName = document.getElementById('profile-name');
        const fullName = `${profileData.firstName} ${profileData.lastName}`;
        
        if (headerName) headerName.textContent = fullName || 'Пользователь';
        if (profileName) profileName.textContent = fullName || 'Пользователь';
        
    }, 1000);
}

// Document Upload Modal
function initDocumentUpload() {
    const modal = document.getElementById('document-modal');
    const closeBtn = document.getElementById('modal-close');
    const cancelBtn = document.getElementById('modal-cancel');
    const confirmBtn = document.getElementById('modal-confirm');
    const fileInput = document.getElementById('document-file');
    const fileInfo = document.getElementById('file-info');
    
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
    
    // File input change
    if (fileInput && fileInfo) {
        fileInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                fileInfo.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-file" style="color: var(--primary);"></i>
                        <div>
                            <div style="font-weight: 600;">${file.name}</div>
                            <div style="font-size: 0.75rem; color: var(--gray-500);">${(file.size / 1024 / 1024).toFixed(2)} МБ</div>
                        </div>
                    </div>
                `;
                fileInfo.classList.add('active');
            }
        });
    }
    
    // Confirm upload
    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => uploadDocument());
    }
    
    // Document upload buttons
    document.querySelectorAll('.document-card .btn-primary').forEach(btn => {
        btn.addEventListener('click', function() {
            const documentCard = this.closest('.document-card');
            const documentType = documentCard?.querySelector('h4')?.textContent || 'document';
            
            const documentTypeSelect = document.getElementById('document-type');
            if (documentTypeSelect) {
                // Set appropriate document type
                const typeMap = {
                    'Паспорт': 'passport',
                    'Миграционная карта': 'migration',
                    'Патент на работу': 'patent',
                    'Регистрация': 'registration',
                    'Сертификат о знании языка': 'certificate',
                    'Медицинская справка': 'medical'
                };
                documentTypeSelect.value = typeMap[documentType] || 'passport';
            }
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
}

// Close Document Modal
function closeModal() {
    const modal = document.getElementById('document-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Upload Document
function uploadDocument() {
    const confirmBtn = document.getElementById('modal-confirm');
    const fileInput = document.getElementById('document-file');
    
    if (!confirmBtn || !fileInput) return;
    
    if (!fileInput.files[0]) {
        showMessage('Выберите файл для загрузки', 'error');
        return;
    }
    
    const originalText = confirmBtn.innerHTML;
    confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Загрузка...';
    confirmBtn.disabled = true;
    
    // Simulate upload
    setTimeout(() => {
        showMessage('Документ успешно загружен на проверку', 'success');
        closeModal();
        
        confirmBtn.innerHTML = originalText;
        confirmBtn.disabled = false;
        
        // Reset file input
        fileInput.value = '';
        const fileInfo = document.getElementById('file-info');
        if (fileInfo) {
            fileInfo.classList.remove('active');
        }
        
    }, 2000);
}

// Profile Stats
function initProfileStats() {
    // Load from localStorage
    const savedStats = localStorage.getItem('migranthub_profile_stats') || '{"views": 0, "applications": 0, "housing": 0, "rating": 0}';
    const stats = JSON.parse(savedStats);
    
    const statValues = document.querySelectorAll('.profile-stats-grid .stat-value');
    if (statValues[0]) statValues[0].textContent = stats.views;
    if (statValues[1]) statValues[1].textContent = stats.applications;
    if (statValues[2]) statValues[2].textContent = stats.housing;
    if (statValues[3]) statValues[3].textContent = stats.rating.toFixed(1);
}

// Load Profile Data
function loadProfileData() {
    const savedProfile = localStorage.getItem('migranthub_profile');
    if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        
        if (document.getElementById('last-name')) document.getElementById('last-name').value = profile.lastName || '';
        if (document.getElementById('first-name')) document.getElementById('first-name').value = profile.firstName || '';
        if (document.getElementById('middle-name')) document.getElementById('middle-name').value = profile.middleName || '';
        if (document.getElementById('birth-date')) document.getElementById('birth-date').value = profile.birthDate || '';
        if (document.getElementById('citizenship')) document.getElementById('citizenship').value = profile.citizenship || '';
        if (document.getElementById('gender')) document.getElementById('gender').value = profile.gender || '';
        if (document.getElementById('phone')) document.getElementById('phone').value = profile.phone || '';
        if (document.getElementById('email')) document.getElementById('email').value = profile.email || '';
        if (document.getElementById('city')) document.getElementById('city').value = profile.city || '';
        if (document.getElementById('bio')) document.getElementById('bio').value = profile.bio || '';
    }
    
    updateProfileCompletion();
}

// Update Profile Completion
function updateProfileCompletion() {
    const fields = [
        'last-name',
        'first-name',
        'birth-date',
        'citizenship',
        'gender',
        'phone',
        'city'
    ];
    
    let filled = 0;
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && field.value.trim() !== '') {
            filled++;
        }
    });
    
    const percentage = Math.round((filled / fields.length) * 100);
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }
    
    if (progressText) {
        progressText.textContent = `${percentage}% — ${percentage >= 100 ? 'Профиль полностью заполнен' : 'Заполните все поля для верификации'}`;
    }
}

// Utility: Debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

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

console.log('✅ Profile module initialized');