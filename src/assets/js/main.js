import { Controller } from '../../controllers/appController.js';

// Loading 頁面控制
document.addEventListener('DOMContentLoaded', () => {
  const loadingPage = document.querySelector('.loading-page');
  const loadingBar = document.querySelector('.loading-bar');
  const sections = document.querySelectorAll('.section');
  const navbar = document.querySelector('.navbar');
  let progress = 0;

  // 模擬加載進度
  const interval = setInterval(() => {
    progress += Math.random() * 25;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        // 隱藏 loading 頁面
        loadingPage.style.opacity = '0';
        setTimeout(() => {
          loadingPage.style.display = 'none';

          // 顯示導覽列
          navbar.classList.add('visible');

          // 顯示各個區塊
          sections.forEach((section, index) => {
            setTimeout(() => {
              section.classList.add('visible');
            }, index * 200); // 每個區塊延遲 200ms 顯示
          });
        }, 300); // 縮短過渡時間
      }, 300); // 縮短過渡時間
    }
    loadingBar.style.width = `${progress}%`;
  }, 100);

  // 初始化應用
  Controller.init();

  // 滚动驱动动画
  initTimelineAnimation();
});

// 滚动驱动动画
function initTimelineAnimation() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineSection = document.querySelector('.experience-timeline');
  const timelineItemsContainer = document.querySelector('.timeline-items');

  // 确保 timelineItemsContainer 存在
  if (!timelineItemsContainer) {
    console.warn('Timeline items container not found');
    return;
  }

  // 创建进度条元素
  let timelineProgress = document.querySelector('.timeline-progress');
  if (!timelineProgress) {
    timelineProgress = document.createElement('div');
    timelineProgress.className = 'timeline-progress';
    timelineItemsContainer.appendChild(timelineProgress);
  }

  // 缓存计算结果
  let cachedValues = {
    timelineStart: 0,
    lastCheckpointBottom: 0,
    windowHeight: window.innerHeight
  };

  // 更新缓存值
  const updateCachedValues = () => {
    const timelineRect = timelineSection.getBoundingClientRect();
    const lastItem = timelineItems[timelineItems.length - 1];
    const lastCheckpoint = lastItem.querySelector('.timeline-checkpoint');
    const lastCheckpointRect = lastCheckpoint.getBoundingClientRect();

    cachedValues = {
      timelineStart: timelineRect.top + window.scrollY,
      lastCheckpointBottom: lastCheckpointRect.bottom + window.scrollY,
      windowHeight: window.innerHeight
    };
  };

  // 创建 Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 更新缓存值
        updateCachedValues();

        // 更新进度条和显示状态
        const updateProgress = () => {
          const scrollPosition = window.scrollY;
          const currentPosition = scrollPosition + cachedValues.windowHeight;

          let progress = 0;
          if (currentPosition > cachedValues.timelineStart) {
            progress = Math.min(
              (currentPosition - cachedValues.timelineStart) /
              (cachedValues.lastCheckpointBottom - cachedValues.timelineStart),
              1
            );
          }

          // 更新进度条
          if (timelineProgress) {
            timelineProgress.style.transform = `translateX(-50%) scaleY(${progress})`;
          }

          // 检查每个时间线项目
          timelineItems.forEach((item) => {
            const itemRect = item.getBoundingClientRect();
            const itemTop = itemRect.top + window.scrollY;
            const itemProgress = (itemTop - cachedValues.timelineStart) /
              (cachedValues.lastCheckpointBottom - cachedValues.timelineStart);

            if (progress >= itemProgress) {
              requestAnimationFrame(() => {
                item.classList.add('visible');
              });
            }
          });

          // 如果还在视口内，继续更新
          if (entry.isIntersecting) {
            requestAnimationFrame(updateProgress);
          }
        };

        // 开始更新进度
        requestAnimationFrame(updateProgress);
      } else {
        // 当时间线离开视口时，重置进度条
        if (timelineProgress) {
          timelineProgress.style.transform = 'translateX(-50%) scaleY(0)';
        }
        timelineItems.forEach(item => {
          item.classList.remove('visible');
        });
      }
    });
  }, {
    threshold: 0,
    rootMargin: '0px'
  });

  // 观察时间线部分
  observer.observe(timelineSection);

  // 监听窗口大小变化
  window.addEventListener('resize', updateCachedValues);
} 