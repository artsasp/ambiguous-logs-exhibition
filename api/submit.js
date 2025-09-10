export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text } = req.body;
    
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: '내용을 입력해주세요.' });
    }

    if (text.length > 200) {
      return res.status(400).json({ error: '200자 이내로 작성해주세요.' });
    }

    // 간단한 필터링
    const badWords = ['씨발', '개새끼', '병신', '자살', '죽고싶'];
    const lowerText = text.toLowerCase();
    
    if (badWords.some(word => lowerText.includes(word))) {
      return res.status(400).json({ error: '부적절한 내용이 포함되어 있습니다.' });
    }

    // 성공 응답
    res.status(200).json({ 
      success: true, 
      message: '경험이 성공적으로 공유되었습니다!' 
    });

  } catch (error) {
    console.error('Submit error:', error);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
}