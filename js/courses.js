/**
 * MigrantHub - Courses Page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    initEnrollmentModal();
    initLevelFilter();
    loadCourseProgress();
});

// Enrollment Modal
function initEnrollmentModal() {
    const modal = document.getElementById('enrollment-modal');
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
    
    // Confirm enrollment
    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => processEnrollment());
    }
}

// Open Enrollment Modal for Course
function enrollCourse(level, price) {
    const modal = document.getElementById('enrollment-modal');
    const courseName = document.getElementById('modal-course-name');
    const courseLevel = document.getElementById('modal-course-level');
    const courseAmount = document.getElementById('modal-course-amount');
    
    if (!modal) return;
    
    const levelNames = {
        'a1': 'Начальный уровень',
        'a2': 'Элементарный уровень',
        'b1': 'Средний уровень',
        'b2': 'Продвинутый уровень'
    };
    
    if (courseName) courseName.textContent = 'Курс русского языка';
    if (courseLevel) courseLevel.textContent = levelNames[level] || level;
    if (courseAmount) {
        courseAmount.textContent = price === 0 ? 'Бесплатно' : price.toLocaleString('ru-RU') + ' ₽';
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Open Enrollment Modal for Exam
function enrollExam(examType, price) {
    const modal = document.getElementById('enrollment-modal');
    const courseName = document.getElementById('modal-course-name');
    const courseLevel = document.getElementById('modal-course-level');
    const courseAmount = document.getElementById('modal-course-amount');
    
    if (!modal) return;
    
    const examNames = {
        'patent': 'Экзамен на патент',
        'rvp': 'Экзамен на РВП',
        'vnzh': 'Экзамен на ВНЖ'
    };
    
    if (courseName) courseName.textContent = examNames[examType] || examType;
    if (courseLevel) courseLevel.textContent = 'Подготовка к экзамену';
    if (courseAmount) courseAmount.textContent = price.toLocaleString('ru-RU') + ' ₽';
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('enrollment-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Process Enrollment (Simulated)
function processEnrollment() {
    const confirmBtn = document.getElementById('modal-confirm');
    if (!confirmBtn) return;
    
    const originalText = confirmBtn.innerHTML;
    confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Обработка...';
    confirmBtn.disabled = true;
    
    // Simulate enrollment processing
    setTimeout(() => {
        // Show success
        showMessage('Запись успешно оформлена!', 'success');
        
        // Update progress
        updateCourseProgress();
        
        // Close modal
        closeModal();
        
        // Reset button
        confirmBtn.innerHTML = originalText;
        confirmBtn.disabled = false;
        
        // Add to enrolled courses
        addToEnrolledCourses();
    }, 2000);
}

// Level Filter
function initLevelFilter() {
    const levelFilter = document.getElementById('level-filter');
    if (!levelFilter) return;
    
    levelFilter.addEventListener('change', function() {
        const level = this.value;
        filterCourses(level);
    });
}

// Filter Courses by Level
function filterCourses(level) {
    const courseCards = document.querySelectorAll('.level-card');
    
    courseCards.forEach(card => {
        const cardId = card.id.replace('course-', '');
        
        if (level === 'all' || cardId === level) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    showMessage(`Показаны курсы уровня ${level === 'all' ? 'все' : level.toUpperCase()}`, 'success');
}

// Load Course Progress
function loadCourseProgress() {
    const savedCourses = localStorage.getItem('migranthub_courses') || '[]';
    const courses = JSON.parse(savedCourses);
    
    if (courses.length > 0) {
        const progressCards = document.querySelectorAll('.progress-card');
        if (progressCards[0]) {
            progressCards[0].querySelector('p').textContent = `${courses.length} активных курсов`;
        }
        
        // Calculate average progress
        const totalProgress = courses.reduce((sum, c) => sum + (c.progress || 0), 0);
        const avgProgress = Math.round(totalProgress / courses.length);
        
        if (progressCards[1]) {
            progressCards[1].querySelector('p').textContent = `${courses.length} сертификатов`;
        }
        
        if (progressCards[2]) {
            const totalHours = courses.reduce((sum, c) => sum + (c.hours || 0), 0);
            progressCards[2].querySelector('p').textContent = `${totalHours} часов пройдено`;
        }
        
        // Update sidebar stats
        const statNums = document.querySelectorAll('.profile-stat .stat-num');
        if (statNums[0]) statNums[0].textContent = courses.length;
        if (statNums[1]) statNums[1].textContent = avgProgress + '%';
    }
}

// Update Course Progress
function updateCourseProgress() {
    const statNums = document.querySelectorAll('.profile-stat .stat-num');
    if (statNums[0]) {
        const current = parseInt(statNums[0].textContent) || 0;
        statNums[0].textContent = current + 1;
    }
}

// Add to Enrolled Courses
function addToEnrolledCourses() {
    const courseName = document.getElementById('modal-course-name')?.textContent || 'Курс';
    const courseLevel = document.getElementById('modal-course-level')?.textContent || 'A1';
    
    const course = {
        id: Date.now(),
        name: courseName,
        level: courseLevel,
        progress: 0,
        hours: 0,
        enrolledDate: new Date().toISOString()
    };
    
    const savedCourses = localStorage.getItem('migranthub_courses') || '[]';
    const courses = JSON.parse(savedCourses);
    courses.push(course);
    localStorage.setItem('migranthub_courses', JSON.stringify(courses));
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

console.log('✅ Courses module initialized');