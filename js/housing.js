/**
 * MigrantHub - Housing Page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    initHousingFilters();
    initViewToggle();
    initHousingActions();
    initPagination();
    initFavorites();
});

// Housing Filters
function initHousingFilters() {
    const filterForm = document.getElementById('housing-filters');
    if (!filterForm) return;
    
    filterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get filter values
        const filters = {
            search: this.querySelector('input[type="text"]')?.value || '',
            city: document.getElementById('city-select')?.value || '',
            type: this.querySelectorAll('select')[1]?.value || '',
            priceFrom: document.getElementById('price-from')?.value || '',
            priceTo: document.getElementById('price-to')?.value || '',
            amenities: Array.from(this.querySelectorAll('input[name="amenity"]:checked')).map(cb => cb.value)
        };
        
        console.log('Applying housing filters:', filters);
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Поиск...';
        submitBtn.disabled = true;
        
        // Simulate filter application
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Update housing count
            const housingCount = document.querySelector('.jobs-count strong');
            if (housingCount) {
                housingCount.textContent = Math.floor(Math.random() * 80) + 40;
            }
            
            showMessage('Фильтры применены', 'success');
        }, 1000);
    });
    
    // Reset filters
    filterForm.addEventListener('reset', function() {
        setTimeout(() => {
            const filterTags = document.querySelectorAll('.filter-tag');
            filterTags.forEach(tag => tag.remove());
            showMessage('Фильтры сброшены', 'success');
        }, 100);
    });
}

// View Toggle (Grid/List)
function initViewToggle() {
    const viewBtns = document.querySelectorAll('.view-btn');
    const housingGrid = document.getElementById('housing-container');
    
    if (!viewBtns || !housingGrid) return;
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            if (view === 'list') {
                housingGrid.classList.add('list-view');
            } else {
                housingGrid.classList.remove('list-view');
            }
        });
    });
}

// Housing Actions (Contact, Save)
function initHousingActions() {
    // Contact buttons
    document.querySelectorAll('.housing-actions .btn-primary').forEach(btn => {
        btn.addEventListener('click', function() {
            const housingCard = this.closest('.housing-card');
            const housingTitle = housingCard?.querySelector('.housing-title')?.textContent || 'Объект';
            const landlordName = housingCard?.querySelector('.landlord-name')?.textContent || 'Арендодатель';
            
            // Show contact modal (simulated)
            showMessage(`Запрос отправлен ${landlordName}`, 'success');
            
            // Change button state
            this.innerHTML = '<i class="fas fa-check"></i> Отправлено';
            this.disabled = true;
        });
    });
    
    // Save/Favorite buttons
    document.querySelectorAll('.housing-actions .btn-outline').forEach(btn => {
        if (btn.querySelector('.fa-heart')) {
            btn.addEventListener('click', function() {
                const icon = this.querySelector('i');
                
                if (icon.classList.contains('fa-heart')) {
                    icon.classList.remove('fa-heart');
                    icon.classList.add('fa-heart');
                    icon.style.color = '#ef4444';
                    showMessage('Добавлено в избранное', 'success');
                } else {
                    icon.classList.remove('fa-heart');
                    icon.classList.add('fa-heart');
                    icon.style.color = '';
                    showMessage('Удалено из избранного', 'success');
                }
            });
        }
    });
}

// Pagination
function initPagination() {
    const pageBtns = document.querySelectorAll('.page-btn');
    
    pageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('active')) return;
            
            pageBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
            showMessage('Страница загружена', 'success');
        });
    });
}

// Favorites Management
function initFavorites() {
    const savedFavorites = localStorage.getItem('migranthub_favorites') || '[]';
    const favorites = JSON.parse(savedFavorites);
    
    // Mark saved items
    favorites.forEach(id => {
        const card = document.querySelector(`[data-id="${id}"]`);
        if (card) {
            const heartIcon = card.querySelector('.fa-heart');
            if (heartIcon) {
                heartIcon.style.color = '#ef4444';
            }
        }
    });
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

// Filter tag removal
document.addEventListener('click', function(e) {
    if (e.target.closest('.filter-remove')) {
        const tag = e.target.closest('.filter-tag');
        tag?.remove();
        showMessage('Фильтр удалён', 'success');
    }
});

console.log('✅ Housing module initialized');