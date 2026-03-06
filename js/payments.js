/**
 * MigrantHub - Payments Page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    initPaymentModal();
    initPaymentMethods();
    initPaymentHistory();
    loadPaymentData();
});

// Payment Modal
function initPaymentModal() {
    const modal = document.getElementById('payment-modal');
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
    
    // Confirm payment
    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => processPayment());
    }
}

// Open Payment Modal
function selectPlan(planId, amount) {
    const modal = document.getElementById('payment-modal');
    const serviceName = document.getElementById('modal-service-name');
    const serviceAmount = document.getElementById('modal-service-amount');
    
    if (!modal) return;
    
    const planNames = {
        'quick_start': 'Пакет «Быстрый старт»',
        'settle_city': 'Пакет «Закрепиться в городе»',
        'premium_monthly': 'Premium Подписка'
    };
    
    if (serviceName) serviceName.textContent = planNames[planId] || planId;
    if (serviceAmount) serviceAmount.textContent = amount.toLocaleString('ru-RU') + ' ₽';
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Select Additional Service
function selectService(serviceId, amount) {
    const modal = document.getElementById('payment-modal');
    const serviceName = document.getElementById('modal-service-name');
    const serviceAmount = document.getElementById('modal-service-amount');
    
    if (!modal) return;
    
    const serviceNames = {
        'patent': 'Оформление патента',
        'course_a1': 'Курс русского A1',
        'lawyer_consult': 'Консультация юриста',
        'video_consult': 'Видеоконсультация'
    };
    
    if (serviceName) serviceName.textContent = serviceNames[serviceId] || serviceId;
    if (serviceAmount) {
        serviceAmount.textContent = amount === 0 ? 'Бесплатно' : amount.toLocaleString('ru-RU') + ' ₽';
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('payment-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Process Payment (Simulated)
function processPayment() {
    const confirmBtn = document.getElementById('modal-confirm');
    if (!confirmBtn) return;
    
    const originalText = confirmBtn.innerHTML;
    confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Обработка...';
    confirmBtn.disabled = true;
    
    // Simulate payment processing
    setTimeout(() => {
        // Show success
        showMessage('Оплата прошла успешно!', 'success');
        
        // Update stats
        updatePaymentStats();
        
        // Close modal
        closeModal();
        
        // Reset button
        confirmBtn.innerHTML = originalText;
        confirmBtn.disabled = false;
        
        // Add to history (simulated)
        addToPaymentHistory();
    }, 2000);
}

// Payment Methods Selection
function initPaymentMethods() {
    const paymentOptions = document.querySelectorAll('.payment-option');
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            paymentOptions.forEach(o => o.querySelector('input').checked = false);
            this.querySelector('input').checked = true;
        });
    });
}

// Payment History
function initPaymentHistory() {
    // Download receipt buttons
    const downloadBtns = document.querySelectorAll('.history-table .fa-download');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            showMessage('Чек скачан', 'success');
        });
    });
}

// Load Payment Data
function loadPaymentData() {
    // Load from localStorage (simulated)
    const savedPayments = localStorage.getItem('migranthub_payments') || '[]';
    const payments = JSON.parse(savedPayments);
    
    // Update stats
    if (payments.length > 0) {
        const totalSpent = payments.reduce((sum, p) => sum + p.amount, 0);
        const purchaseCount = payments.length;
        
        const statNums = document.querySelectorAll('.profile-stat .stat-num');
        if (statNums[0]) statNums[0].textContent = purchaseCount;
        if (statNums[1]) statNums[1].textContent = totalSpent.toLocaleString('ru-RU') + ' ₽';
    }
}

// Update Payment Stats
function updatePaymentStats() {
    const statNums = document.querySelectorAll('.profile-stat .stat-num');
    
    if (statNums[0]) {
        const current = parseInt(statNums[0].textContent) || 0;
        statNums[0].textContent = current + 1;
    }
    
    // In real app, would recalculate total
}

// Add to Payment History
function addToPaymentHistory() {
    const serviceName = document.getElementById('modal-service-name')?.textContent || 'Услуга';
    const serviceAmount = document.getElementById('modal-service-amount')?.textContent || '0 ₽';
    
    const payment = {
        id: Date.now(),
        date: new Date().toLocaleDateString('ru-RU'),
        service: serviceName,
        amount: serviceAmount,
        status: 'success'
    };
    
    const savedPayments = localStorage.getItem('migranthub_payments') || '[]';
    const payments = JSON.parse(savedPayments);
    payments.unshift(payment);
    localStorage.setItem('migranthub_payments', JSON.stringify(payments));
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

console.log('✅ Payments module initialized');