(function () {
  'use strict';

  // 商品スライダーの初期化
  const sliders = document.querySelectorAll('.product__slider');
  if (!sliders.length) return;

  sliders.forEach(slider => {
    const images = slider.querySelectorAll('.product__slider-image');
    const dots = slider.querySelectorAll('.product__slider-dot');
    const prevBtn = slider.querySelector('.product__slider-btn--prev');
    const nextBtn = slider.querySelector('.product__slider-btn--next');
    let currentIndex = 0;

    // 画像が1枚のみの場合、ナビゲーションを非表示
    if (images.length <= 1) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      slider.querySelector('.product__slider-dots').style.display = 'none';
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
