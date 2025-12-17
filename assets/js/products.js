(function () {
  'use strict';

  // スライダーの初期化（商品ページとforestページ両対応）
  const sliders = document.querySelectorAll('.product__slider, .forest__slider');
  if (!sliders.length) return;

  sliders.forEach(slider => {
    // スライダーのタイプを判定（product または forest）
    const sliderType = slider.classList.contains('product__slider') ? 'product' : 'forest';
    const prefix = sliderType === 'product' ? '.product__slider' : '.forest__slider';

    const images = slider.querySelectorAll(`${prefix}-image`);
    const dots = slider.querySelectorAll(`${prefix}-dot`);
    const prevBtn = slider.querySelector(`${prefix}-btn--prev`);
    const nextBtn = slider.querySelector(`${prefix}-btn--next`);
    let currentIndex = 0;

    // 画像が1枚のみの場合、ナビゲーションを非表示
    if (images.length <= 1) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      const dotsContainer = slider.querySelector(`${prefix}-dots`);
      if (dotsContainer) dotsContainer.style.display = 'none';
      return;
    }

    // 指定したインデックスの画像を表示
    function showImage(index) {
      images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
      currentIndex = index;
    }

    // 次の画像へ
    function nextImage() {
      const nextIndex = (currentIndex + 1) % images.length;
      showImage(nextIndex);
    }

    // 前の画像へ
    function prevImage() {
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(prevIndex);
    }

    // イベントリスナー
    if (prevBtn) {
      prevBtn.addEventListener('click', prevImage);
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', nextImage);
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showImage(index);
      });
    });

    // キーボード操作
    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    });
  });
})();
