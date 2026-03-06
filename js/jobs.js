/**
 * MigrantHub - Jobs Page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    initJobFilters();
    initViewToggle();
    initJobActions();
    initPagination();
});

// Job Filters
function initJobFilters() {
    const filterForm = document.getElementById('job-filters');
    if (!filterForm) return;
    
    filterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get filter values
        const filters = {
            search: this.querySelector('input[type="text"]')?.value || '',
            location: this.querySelector('select')?.value || '',
            salary: this.querySelectorAll('select')[1]?.value || '',
            industries: Array.from(this.querySelectorAll('input[name="industry"]:checked')).map(cb => cb.value),
            housing: Array.from(this.querySelectorAll('input[name="housing"]:checked')).map(cb => cb.value)
        };
        
        console.log('Applying filters:', filters);
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Поиск...';
        submitBtn.disabled = true;
        
        // Simulate filter application
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Update jobs count
            const jobsCount = document.querySelector('.jobs-count strong');
            if (jobsCount) {
                jobsCount.textContent = Math.floor(Math.random() * 100) + 50;
            }
            
            // Show success message
            showMessage('Фильтры применены', 'success');
        }, 1000);
    });
    
    // Reset filters
    filterForm.addEventListener('reset', function() {
        setTimeout(() => {
            // Remove active filter tags
            const filterTags = document.querySelectorAll('.filter-tag');
            filterTags.forEach(tag => tag.remove());
            
            showMessage('Фильтры сброшены', 'success');
        }, 100);
    });
}

// View Toggle (Grid/List)
function initViewToggle() {
    const viewBtns = document.querySelectorAll('.view-btn');
    const jobsGrid = document.getElementById('jobs-container');
    
    if (!viewBtns || !jobsGrid) return;
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            if (view === 'list') {
                jobsGrid.classList.add('list-view');
            } else {
                jobsGrid.classList.remove('list-view');
            }
        });
    });
}

// Job Actions (Apply, Save)
function initJobActions() {
    // Apply buttons
    document.querySelectorAll('.job-actions .btn-primary').forEach(btn => {
        btn.addEventListener('click', function() {
            const jobCard = this.closest('.job-card');
            const jobTitle = jobCard?.querySelector('.job-title')?.textContent || 'Вакансия';
            
            // Change button state
            this.innerHTML = '<i class="fas fa-check"></i> Отправлено';
            this.disabled = true;
            
            // Update stats
            const appliedCount = document.querySelector('.stat-value');
            if (appliedCount) {
                const current = parseInt(appliedCount.textContent) || 0;
                appliedCount.textContent = current + 1;
            }
            
            showMessage(`Отклик на "${jobTitle}" отправлен!`, 'success');
        });
    });
    
    // Save buttons
    document.querySelectorAll('.job-actions .btn-outline').forEach(btn => {
        if (btn.querySelector('.fa-bookmark')) {
            btn.addEventListener('click', function() {
                const icon = this.querySelector('i');
                
                if (icon.classList.contains('fa-bookmark')) {
                    icon.classList.remove('fa-bookmark');
                    icon.classList.add('fa-bookmark');
                    icon.style.color = '#f59e0b';
                    showMessage('Вакансия сохранена', 'success');
                } else {
                    icon.classList.remove('fa-bookmark');
                    icon.classList.add('fa-bookmark');
                    icon.style.color = '';
                    showMessage('Вакансия удалена из сохранённых', 'success');
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
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            showMessage('Страница загружена', 'success');
        });
    });
}

// Show Message
function showMessage(message, type = 'success') {
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `toast-message toast-${type}`;
    messageEl.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
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
    
    // Remove after 3 seconds
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

console.log('✅ Jobs module initialized');