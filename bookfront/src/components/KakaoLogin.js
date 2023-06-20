import React from 'react'


const KakaoLogin = () => {
  
    let redirect_uri='http://localhost:3000/KakaoOauth'
    let client_id = process.env.REACT_APP_KAKAO_REST_API;
    let kakao_api_url='https://kauth.kakao.com/oauth/authorize?client_id='+client_id+'&redirect_uri='+redirect_uri+'&response_type=code'


  return (
      <a  href={kakao_api_url}><img width='250' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq5y4gLsduJ9rithyOIRC_I25A92MyB-bFXg&usqp=CAU'></img></a>

)
}

export default KakaoLogin