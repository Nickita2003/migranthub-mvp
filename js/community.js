/**
 * MigrantHub - Community Page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    initCreateTopicModal();
    initVoteButtons();
    initForumEnter();
    loadCommunityStats();
});

// Create Topic Modal
function initCreateTopicModal() {
    const modal = document.getElementById('create-topic-modal');
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
    
    // Confirm create topic
    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => createTopic());
    }
}

// Open Create Topic Modal
function openCreateTopicModal() {
    const modal = document.getElementById('create-topic-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('create-topic-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Create Topic
function createTopic() {
    const confirmBtn = document.getElementById('modal-confirm');
    const titleInput = document.getElementById('topic-title');
    const categoryInput = document.getElementById('topic-category');
    const contentInput = document.getElementById('topic-content');
    
    if (!confirmBtn) return;
    
    // Validation
    if (!titleInput?.value || !categoryInput?.value || !contentInput?.value) {
        showMessage('Заполните все обязательные поля', 'error');
        return;
    }
    
    const originalText = confirmBtn.innerHTML;
    confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Публикация...';
    confirmBtn.disabled = true;
    
    // Simulate topic creation
    setTimeout(() => {
        showMessage('Тема создана и отправлена на модерацию', 'success');
        closeModal();
        
        confirmBtn.innerHTML = originalText;
        confirmBtn.disabled = false;
        
        // Reset form
        if (titleInput) titleInput.value = '';
        if (categoryInput) categoryInput.value = '';
        if (contentInput) contentInput.value = '';
        const forumInput = document.getElementById('topic-forum');
        if (forumInput) forumInput.value = 'general';
        const tagsInput = document.getElementById('topic-tags');
        if (tagsInput) tagsInput.value = '';
        
        // Add to topics list (simulated)
        addNewTopic(titleInput.value, categoryInput.value);
        
    }, 1500);
}

// Add New Topic to List
function addNewTopic(title, category) {
    const topicsList = document.getElementById('topics-list');
    if (!topicsList) return;
    
    const categoryNames = {
        'documents': 'Документы',
        'work': 'Работа',
        'housing': 'Жильё',
        'education': 'Обучение',
        'legal': 'Право',
        'general': 'Общее'
    };
    
    const newTopic = document.createElement('div');
    newTopic.className = 'topic-item';
    newTopic.innerHTML = `
        <div class="topic-vote">
            <button class="vote-btn vote-up"><i class="fas fa-chevron-up"></i></button>
            <span class="vote-count">0</span>
            <button class="vote-btn vote-down"><i class="fas fa-chevron-down"></i></button>
        </div>
        <div class="topic-content">
            <div class="topic-header">
                <h4 class="topic-title">${title}</h4>
                <div class="topic-tags">
                    <span class="topic-tag tag-blue">${categoryNames[category] || category}</span>
                    <span class="topic-tag tag-green">Новое</span>
                </div>
            </div>
            <p class="topic-preview">Тема только что создана. Будьте первым, кто ответит!</p>
            <div class="topic-meta">
                <div class="topic-author">
                    <div class="author-avatar">👤</div>
                    <div class="author-info">
                        <span class="author-name">Вы</span>
                        <span class="author-country">🇷🇺 Россия</span>
                    </div>
                </div>
                <div class="topic-stats">
                    <span class="topic-stat">
                        <i class="fas fa-comment"></i>
                        0 ответов
                    </span>
                    <span class="topic-stat">
                        <i class="fas fa-eye"></i>
                        1 просмотр
                    </span>
                    <span class="topic-time">Только что</span>
                </div>
            </div>
        </div>
    `;
    
    topicsList.insertBefore(newTopic, topicsList.firstChild);
}

// Vote Buttons
function initVoteButtons() {
    const voteBtns = document.querySelectorAll('.vote-btn');
    
    voteBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const voteCount = this.parentElement.querySelector('.vote-count');
            let count = parseInt(voteCount.textContent) || 0;
            
            if (this.classList.contains('vote-up')) {
                if (this.classList.contains('active')) {
                    this.classList.remove('active');
                    count--;
                } else {
                    const downBtn = this.parentElement.querySelector('.vote-down');
                    if (downBtn.classList.contains('active')) {
                        downBtn.classList.remove('active');
                        count++;
                    }
                    this.classList.add('active');
                    count++;
                }
            } else if (this.classList.contains('vote-down')) {
                if (this.classList.contains('active')) {
                    this.classList.remove('active');
                    count++;
                } else {
                    const upBtn = this.parentElement.querySelector('.vote-up');
                    if (upBtn.classList.contains('active')) {
                        upBtn.classList.remove('active');
                        count--;
                    }
                    this.classList.add('active');
                    count--;
                }
            }
            
            voteCount.textContent = count;
            showMessage('Голос учтён', 'success');
        });
    });
}

// Forum Enter
function initForumEnter() {
    const forumEnterBtns = document.querySelectorAll('.forum-enter');
    
    forumEnterBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const forumCard = this.closest('.forum-card');
            const forumTitle = forumCard?.querySelector('.forum-title')?.textContent || 'Форум';
            
            showMessage(`Переход в форум "${forumTitle}"`, 'success');
            
            // In real app, would navigate to forum page
            // window.location.href = `/forum/${forumCard.dataset.country}`;
        });
    });
}

// Contact Mentor
function contactMentor(mentorId) {
    const mentorNames = {
        'bahrom': 'Бахром Т.',
        'madina': 'Мадина К.',
        'anwar': 'Анвар С.'
    };
    
    showMessage(`Запрос отправлен ${mentorNames[mentorId] || 'наставнику'}`, 'success');
}

// Load Community Stats
function loadCommunityStats() {
    const savedStats = localStorage.getItem('migranthub_community_stats') || '{"messages": 0, "likes": 0, "saves": 0}';
    const stats = JSON.parse(savedStats);
    
    const statItems = document.querySelectorAll('.community-stats .stat-item span:last-child');
    if (statItems[0]) statItems[0].textContent = `${stats.messages} сообщений`;
    if (statItems[1]) statItems[1].textContent = `${stats.likes} лайков`;
    if (statItems[2]) statItems[2].textContent = `${stats.saves} сохранений`;
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

console.log('✅ Community module initialized');