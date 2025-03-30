import CursorEffectView from '../views/cursorEffect.js';
import { View } from '../views/view.js';

const Controller = {
  cursorEffect: null,  // 添加 cursorEffect 屬性

  // 初始化應用
  init() {
    // 等待 DOM 加載完成
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeApp());
    } else {
      this.initializeApp();
    }
  },

  // 實際的初始化邏輯
  initializeApp() {
    this.bindEvents();
    this.renderAll();
    this.loadTheme();
    this.initializeCursorEffect();
    // 延遲初始化時間軸動畫，確保 DOM 已經渲染完成
    setTimeout(() => {
      this.initializeTimelineAnimation();
    }, 100);
  },

  // 綁定事件處理器
  bindEvents() {
    // 導覽選單切換
    const navToggle = document.querySelector('.nav-toggle');
    navToggle.addEventListener('click', () => {
      const navMenu = document.querySelector('.nav-menu');
      const isActive = navMenu.classList.contains('active');
      View.toggleNavMenu(!isActive);
    });

    // 作品集卡片點擊
    document.querySelector('.portfolio-grid').addEventListener('click', (e) => {
      const portfolioCard = e.target.closest('.portfolio-card');
      if (portfolioCard) {
        const projectId = portfolioCard.dataset.projectId;
        View.renderProjectModal(projectId);
        View.toggleModal(true);
      }
    });

    // 關閉模態框
    const closeModal = document.querySelector('.close-modal');
    closeModal.addEventListener('click', () => {
      View.toggleModal(false);
    });

    // 點擊模態框外部關閉
    window.addEventListener('click', (e) => {
      const modal = document.getElementById('project-modal');
      if (e.target === modal) {
        View.toggleModal(false);
      }
    });

    // 深色模式切換
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
      const isDark = document.body.getAttribute('data-theme') === 'dark';
      View.updateTheme(!isDark);
      this.saveTheme(!isDark);
    });

    // 平滑滾動
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  },

  // 渲染所有內容
  renderAll() {
    View.renderPortfolio();
    View.renderExperience();
  },

  // 載入主題設定
  loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    // 如果沒有保存的主題設置，預設使用深色模式
    if (!savedTheme) {
      View.updateTheme(true);  // true 表示深色模式
      this.saveTheme(true);
    } else {
      View.updateTheme(savedTheme === 'dark');
    }
  },

  // 儲存主題設定
  saveTheme(isDark) {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  },

  // 初始化光標效果
  initializeCursorEffect() {
    // 檢查是否為移動設備
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // 創建 CursorEffectView 實例
    this.cursorEffect = new CursorEffectView();

    if (!isMobile) {
      this.cursorEffect.initialize();
    }

    // 監聽視窗大小變化
    window.addEventListener('resize', () => {
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      if (isMobile) {
        this.cursorEffect?.hide();  // 使用可選鏈操作符
      } else {
        this.cursorEffect?.show();  // 使用可選鏈操作符
        this.cursorEffect?.initialize();
      }
    });
  },

  // 初始化時間軸動畫
  initializeTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineProgress = document.querySelector('.timeline-progress');

    // 如果沒有找到進度條元素，直接返回
    if (!timelineProgress) {
      console.warn('Timeline progress element not found');
      return;
    }

    // 創建 Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.2
    });

    // 觀察每個時間軸項目
    timelineItems.forEach(item => {
      observer.observe(item);
    });

    // 更新進度條
    const updateProgress = () => {
      const timeline = document.querySelector('.timeline-items');
      if (!timeline) return;

      const timelineRect = timeline.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // 計算時間軸在視窗中的位置
      const timelineTop = timelineRect.top + scrollTop;
      const timelineBottom = timelineTop + timelineRect.height;

      // 計算進度
      let progress = 0;
      if (scrollTop + windowHeight > timelineTop) {
        progress = Math.min(
          (scrollTop + windowHeight - timelineTop) / (timelineBottom - timelineTop),
          1
        );
      }

      // 更新進度條
      timelineProgress.style.transform = `translateX(-50%) scaleY(${progress})`;
    };

    // 監聽滾動事件
    window.addEventListener('scroll', updateProgress);
    // 初始化進度條
    updateProgress();
  }
};

export { Controller }; 