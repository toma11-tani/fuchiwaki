// トップページ用のJavaScript
document.addEventListener('DOMContentLoaded', () => {
  const greetingButton = document.getElementById('heroGreeting');
  
  if (!greetingButton) return;
  
  // いらっしゃいメッセージの配列
  const messages = [
    'いらっしゃいませ！',
    'ようこそ、ふちわきやへ！',
    'ボクと一緒に元気になろう！',
    'にんにくパワーで元気もりもり！',
    '今日もいい日になるよ！'
  ];
  
  greetingButton.addEventListener('click', () => {
    // ランダムにメッセージを選択
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // メッセージを表示
    showMessage(randomMessage);
    
    // ボタンをアニメーション
    greetingButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
      greetingButton.style.transform = 'scale(1)';
    }, 100);
  });
  
  function showMessage(text) {
    // 既存のメッセージがあれば削除
    const existingMessage = document.querySelector('.greeting-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // メッセージ要素を作成
    const messageDiv = document.createElement('div');
    messageDiv.className = 'greeting-message';
    messageDiv.textContent = text;
    
    // bodyに追加
    document.body.appendChild(messageDiv);
    
    // アニメーション開始
    setTimeout(() => {
      messageDiv.classList.add('show');
    }, 10);
    
    // 2.5秒後に非表示
    setTimeout(() => {
      messageDiv.classList.remove('show');
      setTimeout(() => {
        messageDiv.remove();
      }, 300);
    }, 2500);
  }
});



