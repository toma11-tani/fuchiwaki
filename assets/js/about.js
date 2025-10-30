// にんたろうページのインタラクティブ機能

document.addEventListener('DOMContentLoaded', () => {
  // にんたろうの画像クリックで反応
  const nintaroImage = document.getElementById('nintaroImage');
  if (nintaroImage) {
    nintaroImage.addEventListener('click', () => {
      // ランダムなメッセージを表示
      const messages = [
        'やっほー！ 🎉',
        'げんきだしてね！ 💪',
        'いっしょにがんばろう！ ✨',
        'ありがとう！ 😊',
        'だいすきだよ！ ❤️'
      ];
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      showMessage(randomMessage);
      
      // 画像を揺らす
      nintaroImage.style.animation = 'none';
      setTimeout(() => {
        nintaroImage.style.animation = '';
      }, 10);
    });
  }

  // あいさつボタンの機能
  const greetButton = document.getElementById('greetButton');
  if (greetButton) {
    greetButton.addEventListener('click', () => {
      const greetings = [
        'こんにちは！ にんたろうだよ！ 🌟',
        'やあ！ 今日も元気いっぱいだね！ 💪',
        'わーい！ 会えてうれしいな！ 😄',
        'ようこそ！ いっしょに楽しもうね！ 🎈',
        'ハロー！ 素敵な一日にしようね！ ☀️'
      ];
      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
      showMessage(randomGreeting);
      
      // ボタンのアニメーション
      greetButton.style.transform = 'scale(0.95)';
      setTimeout(() => {
        greetButton.style.transform = '';
      }, 200);
    });
  }

  // プロフィールアイテムにホバー効果を追加
  const profileItems = document.querySelectorAll('.profile-item');
  profileItems.forEach((item, index) => {
    // 順番にフェードイン
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, index * 100);

    // クリックで楽しいメッセージ
    item.addEventListener('click', () => {
      const label = item.querySelector('.profile-item__label').textContent;
      const value = item.querySelector('.profile-item__value').textContent;
      showMessage(`${label}は「${value}」だよ！ 😊`);
    });
  });

  // メッセージ表示関数
  function showMessage(text) {
    // 既存のメッセージを削除
    const existingMessage = document.querySelector('.nintaro-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // 新しいメッセージを作成
    const message = document.createElement('div');
    message.className = 'nintaro-message';
    message.textContent = text;
    document.body.appendChild(message);

    // アニメーション
    setTimeout(() => {
      message.classList.add('show');
    }, 10);

    // 3秒後に削除
    setTimeout(() => {
      message.classList.remove('show');
      setTimeout(() => {
        message.remove();
      }, 300);
    }, 3000);
  }

  // ランダムな位置にハートを生成
  function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = '❤️';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 5000);
  }

  // 定期的にハートを生成
  setInterval(createHeart, 3000);

  // スクロールでキラキラエフェクト
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      createSparkle();
    }, 100);
  });

  function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'scroll-sparkle';
    sparkle.textContent = '✨';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = window.scrollY + Math.random() * window.innerHeight + 'px';
    document.body.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 1000);
  }
});
