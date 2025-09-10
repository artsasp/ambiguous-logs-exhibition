export default function handler(req, res) {
  const html = \`<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>어중간한 사람들의 로그</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');
    
    body {
      margin: 0;
      background-color: #000;
      font-family: 'DotGothic16', 'MS Gothic', 'Courier New', monospace;
      overflow: hidden;
      position: relative;
      width: 100vw;
      height: 100vh;
    }

    .log {
      position: absolute;
      color: rgba(255, 255, 255, 0.8);
      font-size: 1rem;
      white-space: nowrap;
      animation: floatText 20s linear infinite;
      opacity: 0;
      pointer-events: none;
      z-index: 1;
    }

    @keyframes floatText {
      0% { opacity: 0; transform: translateY(0); }
      10% { opacity: 1; }
      90% { opacity: 1; transform: translateY(-50vh); }
      100% { opacity: 0; transform: translateY(-60vh); }
    }

    .title {
      position: fixed;
      top: 20px;
      left: 20px;
      color: rgba(255, 255, 255, 0.6);
      font-size: 14px;
      z-index: 100;
      line-height: 1.4;
    }

    .input-link {
      position: fixed;
      bottom: 20px;
      right: 20px;
      color: rgba(255, 255, 255, 0.6);
      text-decoration: none;
      font-size: 14px;
      padding: 10px 20px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 4px;
      transition: all 0.3s ease;
      z-index: 100;
    }

    .input-link:hover {
      color: rgba(255, 255, 255, 0.9);
      border-color: rgba(255, 255, 255, 0.6);
      background-color: rgba(255, 255, 255, 0.1);
    }
  </style>
</head>
<body>
  <div class="title">
    어중간한 사람들의 로그<br>
    <span style="font-size: 11px; opacity: 0.7;">실시간 익명 경험 공유</span>
  </div>

  <a href="/api/input" class="input-link">경험 입력하기</a>

  <script>
    const phrases = [
      "좋아하지만 사랑한다고 확신할 수는 없다.",
      "친구들과 만나지만 진짜 속마음은 털어놓지 않는다.",
      "외롭지만 누군가와 깊이 있는 관계 맺기는 피곤하다.",
      "관심 있는 사람이 있지만 고백할 용기는 없다.",
      "썸을 타고 있는 건지 친구인 건지 애매하다.",
      "연락하고 싶지만 먼저 하기는 어색하다.",
      "모임에 가고 싶기도 하고 집에 있고 싶기도 하다.",
      "여러 가지를 좋아하지만 진짜 취향이 뭔지 모르겠다.",
      "성격이 내향적인 것 같다가도 외향적인 것 같기도 하다.",
      "완벽주의자도 아니고 대충주의자도 아니다.",
      "모든 걸 조금씩 할 줄 알지만 전문가는 아니다.",
      "커피를 매일 마시지만 특별히 좋아하는 건 아니다.",
      "옷을 많이 가지고 있지만 입을 게 없다고 느낀다.",
      "주말을 알차게 보내려고 하지만 결국 집에만 있다.",
      "메시지를 보고도 답장을 며칠 뒤에 하게 된다.",
      "좋아요를 누를지 말지 한참 고민한다.",
      "화장을 하고 싶기도 하고 귀찮기도 하다.",
      "쇼핑을 하러 갔다가 아무것도 사지 않고 나온다.",
      "배는 고픈데 먹고 싶은 게 딱히 없다.",
      "뭔가 하고 싶은데 구체적으로 뭘 할지 모르겠다.",
      "변화가 필요하다고 느끼지만 현상 유지가 편하다."
    ];

    function createFloatingText(text) {
      const logElement = document.createElement('div');
      logElement.className = 'log';
      logElement.textContent = text;

      const startX = Math.random() * (window.innerWidth - 400);
      const startY = window.innerHeight + 50;

      logElement.style.left = startX + 'px';
      logElement.style.top = startY + 'px';

      document.body.appendChild(logElement);

      setTimeout(() => {
        if (logElement.parentNode) {
          logElement.parentNode.removeChild(logElement);
        }
      }, 20000);
    }

    function showRandomPhrase() {
      const phrase = phrases[Math.floor(Math.random() * phrases.length)];
      createFloatingText(phrase);
    }

    setInterval(showRandomPhrase, 2500);
    setTimeout(showRandomPhrase, 500);
    setTimeout(showRandomPhrase, 1500);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'f' || e.key === 'F') {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          document.documentElement.requestFullscreen();
        }
      }
    });
  </script>
</body>
</html>\`;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}