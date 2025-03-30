class CursorEffect {
  constructor() {
    this.cursorGlow = document.querySelector('.cursor-glow');
    this.mouseX = 0;
    this.mouseY = 0;
    this.currentX = 0;
    this.currentY = 0;

    this.init();
  }

  init() {
    // 監聽鼠標移動
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));

    // 監聽可交互元素
    this.initInteractiveElements();

    // 開始動畫
    this.animate();
  }

  handleMouseMove(e) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  initInteractiveElements() {
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-card, .timeline-content');

    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        this.cursorGlow.style.opacity = '0.3';
        this.cursorGlow.style.width = '200px';
        this.cursorGlow.style.height = '200px';
      });

      element.addEventListener('mouseleave', () => {
        this.cursorGlow.style.opacity = '0.15';
        this.cursorGlow.style.width = '400px';
        this.cursorGlow.style.height = '400px';
      });
    });
  }

  animate() {
    const dx = this.mouseX - this.currentX;
    const dy = this.mouseY - this.currentY;

    this.currentX += dx * 0.1;
    this.currentY += dy * 0.1;

    // 使用 translate(-50%, -50%) 使光暈以鼠標為圓心
    this.cursorGlow.style.transform = `translate(${this.currentX}px, ${this.currentY}px) translate(-50%, -50%)`;

    requestAnimationFrame(this.animate.bind(this));
  }
}

// 當 DOM 加載完成後初始化
document.addEventListener('DOMContentLoaded', () => {
  new CursorEffect();
}); 