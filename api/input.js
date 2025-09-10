export default function handler(req, res) {
  const html = \`<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>어중간한 경험 공유</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');
    
    * { box-sizing: border-box; }

    body {
      margin: 0;
      padding: 20px;
      background-color: #000;
      color: #fff;
      font-family: 'DotGothic16', 'MS Gothic', 'Courier New', monospace;
      line-height: 1.6;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .container {
      max-width: 500px;
      width: 100%;
      padding: 20px;
      text-align: center;
    }

    h1 {
      font-size: 1.5rem;
      margin-bottom: 10px;
      color: rgba(255, 255, 255, 0.9);
      font-weight: normal;
    }

    .subtitle {
      font-size: 1rem;
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 30px;
      line-height: 1.4;
    }

    .form-group {
      margin-bottom: 20px;
      text-align: left;
    }

    textarea {
      width: 100%;
      min-height: 120px;
      padding: 15px;
      background-color: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: #fff;
      font-family: 'DotGothic16', 'MS Gothic', 'Courier New', monospace;
      font-size: 14px;
      resize: vertical;
      border-radius: 4px;
      outline: none;
      transition: border-color 0.3s ease;
    }

    textarea:focus {
      border-color: rgba(255, 255, 255, 0.6);
    }

    textarea::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }

    .submit-btn {
      width: 100%;
      padding: 15px;
      background-color: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: #fff;
      font-family: 'DotGothic16', 'MS Gothic', 'Courier New', monospace;
      font-size: 1rem;
      cursor: pointer;
      border-radius: 4px;
      transition: all 0.3s ease;
    }

    .submit-btn:hover {
      background-color: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.6);
    }

    .submit-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .char-counter {
      text-align: right;
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.5);
      margin-top: 5px;
    }

    .result-message {
      margin-top: 20px;
      padding: 15px;
      border-radius: 4px;
      font-size: 0.9rem;
    }

    .result-message.success {
      background-color: rgba(100, 255, 100, 0.1);
      border: 1px solid rgba(100, 255, 100, 0.3);
      color: rgba(100, 255, 100, 0.9);
    }

    .result-message.error {
      background-color: rgba(255, 100, 100, 0.1);
      border: 1px solid rgba(255, 100, 100, 0.3);
      color: rgba(255, 100, 100, 0.9);
    }

    .back-link {
      position: fixed;
      top: 20px;
      left: 20px;
      color: rgba(255, 255, 255, 0.6);
      text-decoration: none;
      font-size: 0.9rem;
    }

    .back-link:hover {
      color: rgba(255, 255, 255, 0.9);
    }
  </style>
</head>
<body>
  <a href="/api" class="back-link">← 메인 화면으로</a>

  <div class="container">
    <h1>당신의 어중간했던 경험을<br>익명으로 공유해주세요</h1>
    <div class="subtitle">
      완벽하지도, 부족하지도 않은<br>그런 어중간한 순간들을 나눠주세요.
    </div>

    <form id="experience-form">
      <div class="form-group">
        <textarea 
          id="experience-text" 
          placeholder="여기에 당신의 어중간한 경험을 적어주세요... (최대 200자)"
          maxlength="200"
        ></textarea>
        <div class="char-counter" id="char-counter">0 / 200자</div>
      </div>

      <button type="submit" class="submit-btn" id="submit-btn">익명으로 공유하기</button>
    </form>

    <div id="result-message"></div>
  </div>

  <script>
    const form = document.getElementById('experience-form');
    const textarea = document.getElementById('experience-text');
    const charCounter = document.getElementById('char-counter');
    const submitBtn = document.getElementById('submit-btn');
    const resultMessage = document.getElementById('result-message');

    textarea.addEventListener('input', () => {
      const length = textarea.value.length;
      charCounter.textContent = \`\${length} / 200자\`;
      submitBtn.disabled = length === 0 || length > 200;
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const text = textarea.value.trim();
      if (!text) {
        showMessage('내용을 입력해주세요.', 'error');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = '전송 중...';

      try {
        const response = await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        });

        const data = await response.json();

        if (response.ok) {
          showMessage('경험이 공유되었습니다! 메인 화면에서 확인해보세요.', 'success');
          textarea.value = '';
          charCounter.textContent = '0 / 200자';
        } else {
          showMessage(data.error || '오류가 발생했습니다.', 'error');
        }
      } catch (error) {
        showMessage('전송에 실패했습니다.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = '익명으로 공유하기';
      }
    });

    function showMessage(message, type) {
      resultMessage.textContent = message;
      resultMessage.className = \`result-message \${type}\`;
    }

    textarea.focus();
  </script>
</body>
</html>\`;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}