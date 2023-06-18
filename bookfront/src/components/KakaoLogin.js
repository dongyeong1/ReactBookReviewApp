import axios from 'axios';
import React,{useCallback, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { NAVER_LOGIN_REQUEST } from '../reducer';

const KakaoLogin = () => {
  

    let redirect_uri='http://localhost:3000/KakaoOauth'
    let client_id = process.env.REACT_APP_KAKAO_REST_API;

    let kakao_api_url='https://kauth.kakao.com/oauth/authorize?client_id='+client_id+'&redirect_uri='+redirect_uri+'&response_type=code'

    


   

  return (
      <a href={kakao_api_url}>카카오로그인</a>
//    <div  onClick={login}><img  height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></div>
    


)
}

export default KakaoLogin