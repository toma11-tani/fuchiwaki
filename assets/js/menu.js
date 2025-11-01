// ハンバーガーメニューの制御
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  const overlay = document.querySelector('.nav-overlay');
  const body = document.body;

  // ハンバーガーボタンがない場合は処理を終了
  if (!hamburger) return;

  // メニューの開閉
  function toggleMenu() {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // スクロールを制御
    if (nav.classList.contains('active')) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
  }

  // ハンバーガーボタンのクリック
  hamburger.addEventListener('click', toggleMenu);

  // オーバーレイのクリック
  overlay.addEventListener('click', toggleMenu);

  // メニューリンクのクリック（ページ遷移時にメニューを閉じる）
  const navLinks = document.querySelectorAll('.nav__link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // ウィンドウのリサイズ時にメニューを閉じる（タブレット以上）
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth >= 720 && nav.classList.contains('active')) {
        toggleMenu();
      }
    }, 250);
  });

  // Escキーでメニューを閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
      toggleMenu();
    }
  });
});






