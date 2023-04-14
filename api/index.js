import axios from 'axios'
const instance = axios.create({
  baseURL: process.env.baseURL,
})
const kakaoInstance = axios.create({
  baseURL: process.env.KAKAO_REST_API_KEY,
})

function fetchStores({ query, x, y, radius, categoryGroupCode }) {
  return kakaoInstance.get('/v2/local/search/keyword', {
    params: {
      query, x, y, radius,
      categoryGroupCode
    },
    headers: {
      Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`
    }
  })
}

function fetchNearCoords(mapInfo) {
  return instance.get('/api/maps', {
    params: {
      nex: mapInfo.ne[0].toString(),
      ney: mapInfo.ne[1].toString(),
      swx: mapInfo.sw[0].toString(),
      swy: mapInfo.sw[1].toString()
    }
  })
}

function fetchChatgpt(content) {
  return axios.post('/v1/chat/completions',
    {
      model: "gpt-3.5-turbo",
      messages: [{
        "role": `user`,
        "content": `${content} 에 대해 답변주세요. 만약 자유마을 가입이나, 아이디, 비번 질문인 경우 콜센터로 문의 바랍니다라고 답변 주세요.`
      }]
    }
    , {
      headers: {
        'Authorization': `Bearer ${process.env.CHATGPT_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
}

function fetchContactsReview(district_id, category = '') {
  return instance.get(`/api/reviews/`, { params: { district_id }, category })
}

function reviewCheck(district_id) {
  return instance.get('/api/reviews/check/', { params: { district_id } })
}

export {
  fetchStores,
  fetchNearCoords,
  fetchChatgpt,
  fetchContactsReview,
  reviewCheck
}