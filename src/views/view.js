import { Data } from '../models/data.js';

const View = {
    // 渲染作品集
    renderPortfolio() {
        const portfolioContainer = document.querySelector('.portfolio-grid');
        portfolioContainer.innerHTML = Data.portfolio.map(project => `
            <div class="portfolio-card" data-project-id="${project.id}">
                <img src="${project.image}" alt="${project.title}">
                <div class="portfolio-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="tech-stack">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.github}" target="_blank" class="github-link">GitHub</a>
                        <a href="${project.demo}" target="_blank" class="demo-link">Demo</a>
                    </div>
                </div>
            </div>
        `).join('');
    },

    // 渲染經歷
    renderExperience() {
        const timelineItems = document.querySelector('.timeline-items');

        // 將 startDate 轉換為可比較的數值並排序
        const sortedExperience = Data.experience.reduce((acc, exp) => {
            // 解析 startDate 字符串，轉換為時間戳
            const [year, month] = exp.startDate.split('/');
            const timestamp = new Date(year, month - 1).getTime();

            // 將當前項目添加到累加器中
            acc.push({ ...exp, timestamp });
            return acc;
        }, []).sort((a, b) => a.timestamp - b.timestamp); // 按時間戳升序排序

        timelineItems.innerHTML = sortedExperience.map(exp => `
            <div class="timeline-item">
                <div class="timeline-checkpoint"></div>
                <div class="timeline-content">
                    <div class="timeline-date">${exp.startDate} - ${exp.endDate}</div>
                    <h4>${exp.position}</h4>
                    <h5>${exp.company}</h5>
                    ${exp.description.length > 0 ? `
                        <ul>
                            ${exp.description.map(desc => `<li>${desc}</li>`).join('')}
                        </ul>
                    ` : ''}
                </div>
            </div>
        `).join('') + `
            <div class="timeline-item">
                <div class="timeline-checkpoint"></div>
                <div class="timeline-content">
                    <h4>To be continued...</h4>
                </div>
            </div>
        `;
    },

    // 渲染模態框
    renderProjectModal(projectId) {
        const project = Data.portfolio.find(p => p.id === projectId);
        const modalBody = document.querySelector('.modal-body');

        modalBody.innerHTML = `
            <h2>${project.title}</h2>
            <img src="${project.image}" alt="${project.title}" class="modal-image">
            <div class="modal-content">
                <p>${project.description}</p>
                <h3>技術棧</h3>
                <div class="tech-stack">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <h3>主要功能</h3>
                <ul>
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <div class="project-links">
                    <a href="${project.github}" target="_blank" class="github-link">GitHub</a>
                    <a href="${project.demo}" target="_blank" class="demo-link">Demo</a>
                </div>
            </div>
        `;
    },

    // 更新深色模式
    updateTheme(isDark) {
        document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
        const themeIcon = document.querySelector('.theme-icon');
        themeIcon.textContent = isDark ? '☀️' : '🌙';
    },

    // 顯示/隱藏模態框
    toggleModal(show) {
        const modal = document.getElementById('project-modal');
        modal.style.display = show ? 'block' : 'none';
    },

    // 顯示/隱藏導覽選單
    toggleNavMenu(show) {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.toggle('active', show);
    }
};

export { View }; 