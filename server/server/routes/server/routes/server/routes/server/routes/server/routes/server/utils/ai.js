import axios from 'axios'

export async function getAIReply(question) {
  try {
    const res = await axios.post(
      'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions',
      {
        messages: [{ role: 'user', content: question }],
        model: 'ERNIE-Bot'
      },
      {
        params: {
          access_token: process.env.YIYAN_ACCESS_TOKEN
        }
      }
    )
    return res.data.result || '感谢反馈，我们将尽快处理。'
  } catch (err) {
    console.error('[AI ERROR]', err.response?.data || err.message)
    return 'AI暂时无法处理，请稍后再试。'
  }
}
