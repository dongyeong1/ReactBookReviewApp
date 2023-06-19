import axios from 'axios';
import React,{useCallback, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { NAVER_LOGIN_REQUEST } from '../reducer';

const KakaoLogin = () => {
  

    let redirect_uri='http://localhost:3000/KakaoOauth'
    let client_id = process.env.REACT_APP_KAKAO_REST_API;

    let kakao_api_url='https://kauth.kakao.com/oauth/authorize?client_id='+client_id+'&redirect_uri='+redirect_uri+'&response_type=code'

    


   

  return (
      <a style={{marginTop:20}} href={kakao_api_url}><img width='250' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq5y4gLsduJ9rithyOIRC_I25A92MyB-bFXg&usqp=CAU'></img></a>
//    <div  onClick={login}><img  height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></div>
    


)
}

export default KakaoLogin