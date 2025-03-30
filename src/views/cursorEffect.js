class CursorEffectView {
  constructor() {
    this.cursorGlow = null;
    this.mouseX = 0;
    this.mouseY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.isInitialized = false;
    this.animationFrameId = null;
  }

  initialize() {
    if (this.isInitialized) return;

    // 確保 DOM 中有 cursor-glow 元素
    this.cursorGlow = document.querySelector('.cursor-glow');
    if (!this.cursorGlow) {
      this.createCursorElement();
    }

    // 監聽鼠標移動
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));

    // 監聽可交互元素
    this.initInteractiveElements();

    // 開始動畫
    this.animate();

    this.isInitialized = true;
    this.show();
  }

  createCursorElement() {
    this.cursorGlow = document.createElement('div');
    this.cursorGlow.className = 'cursor-glow';
    document.body.appendChild(this.cursorGlow);
  }

  handleMouseMove(e) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  initInteractiveElements() {
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-card, .timeline-content');

    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        this.updateCursorStyle(true);
      });

      element.addEventListener('mouseleave', () => {
        this.updateCursorStyle(false);
      });
    });
  }

  updateCursorStyle(isHovering) {
    if (!this.cursorGlow) return;

    this.cursorGlow.style.opacity = isHovering ? '0.3' : '0.15';
    this.cursorGlow.style.width = isHovering ? '200px' : '400px';
    this.cursorGlow.style.height = isHovering ? '200px' : '400px';
  }

  animate() {
    if (!this.cursorGlow) return;

    const dx = this.mouseX - this.currentX;
    const dy = this.mouseY - this.currentY;

    this.currentX += dx * 0.1;
    this.currentY += dy * 0.1;

    this.cursorGlow.style.transform = `translate(${this.currentX}px, ${this.currentY}px) translate(-50%, -50%)`;

    this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
  }

  show() {
    if (this.cursorGlow) {
      this.cursorGlow.style.display = 'block';
      if (!this.isInitialized) {
        this.initialize();
      }
    }
  }

  hide() {
    if (this.cursorGlow) {
      this.cursorGlow.style.display = 'none';
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
    }
  }
}

export default CursorEffectView; 