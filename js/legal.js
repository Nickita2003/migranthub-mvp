/**
 * MigrantHub - Legal Page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    initBookingModal();
    initFAQ();
    initLawyerSelection();
});

// Booking Modal
function initBookingModal() {
    const modal = document.getElementById('booking-modal');
    const closeBtn = document.getElementById('modal-close');
    const cancelBtn = document.getElementById('modal-cancel');
    const confirmBtn = document.getElementById('modal-confirm');
    
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
    
    // Confirm booking
    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => processBooking());
    }
}

// Book Service
function bookService(serviceType, price) {
    const modal = document.getElementById('booking-modal');
    const serviceName = document.getElementById('modal-service-name');
    const serviceAmount = document.getElementById('modal-service-amount');
    
    if (!modal) return;
    
    const serviceNames = {
        'chat': 'Онлайн-консультация (чат)',
        'video': 'Видеоконсультация',
        'documents': 'Оформление документов',
        'representation': 'Представительство в госорганах'
    };
    
    if (serviceName) serviceName.textContent = serviceNames[serviceType] || serviceType;
    if (serviceAmount) serviceAmount.textContent = price.toLocaleString('ru-RU') + ' ₽';
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Select Lawyer
function selectLawyer(lawyerId) {
    const modal = document.getElementById('booking-modal');
    const serviceName = document.getElementById('modal-service-name');
    
    if (!modal) return;
    
    const lawyerNames = {
        'ivanov': 'Иванов Петр (Миграционное право)',
        'smirnova': 'Смирнова Анна (Трудовое право)',
        'aliev': 'Алиев Рустам (Документы и патенты)',
        'kozlova': 'Козлова Елена (Гражданство и ВНЖ)'
    };
    
    if (serviceName) {
        serviceName.textContent = 'Консультация с юристом: ' + (lawyerNames[lawyerId] || lawyerId);
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('booking-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Process Booking
function processBooking() {
    const confirmBtn = document.getElementById('modal-confirm');
    const nameInput = document.getElementById('booking-name');
    const phoneInput = document.getElementById('booking-phone');
    const datetimeInput = document.getElementById('booking-datetime');
    
    if (!confirmBtn) return;
    
    // Validation
    if (!nameInput?.value || !phoneInput?.value || !datetimeInput?.value) {
        showMessage('Заполните все обязательные поля', 'error');
        return;
    }
    
    const originalText = confirmBtn.innerHTML;
    confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Обработка...';
    confirmBtn.disabled = true;
    
    // Simulate booking
    setTimeout(() => {
        showMessage('Запись успешно оформлена! Мы свяжемся с вами.', 'success');
        closeModal();
        
        confirmBtn.innerHTML = originalText;
        confirmBtn.disabled = false;
        
        // Reset form
        if (nameInput) nameInput.value = '';
        if (phoneInput) phoneInput.value = '';
        if (datetimeInput) datetimeInput.value = '';
        const descInput = document.getElementById('booking-description');
        if (descInput) descInput.value = '';
        
    }, 2000);
}

// FAQ Accordion
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Close all
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('active');
            });
            
            // Open clicked if not active
            if (!isActive) {
                this.classList.add('active');
                answer.classList.add('active');
            }
        });
    });
}

// Lawyer Selection
function initLawyerSelection() {
    // Track selected lawyer in localStorage
    const savedLawyer = localStorage.getItem('migranthub_selected_lawyer');
    if (savedLawyer) {
        console.log('Selected lawyer:', savedLawyer);
    }
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

console.log('✅ Legal module initialized');