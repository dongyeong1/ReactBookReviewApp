import axios from 'axios';
import React,{useCallback, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { NAVER_LOGIN_REQUEST } from '../reducer';

const NaverLogin = () => {

    useEffect(()=>{
        console.log('asdasdas',process.env.REACT_APP_NAVER_LOGIN_CLIENT_ID)
    },[])
    let client_id = process.env.REACT_APP_NAVER_LOGIN_CLIENT_ID;


    let naver_api_url = 
    'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id='+client_id+'&redirect_uri=' + encodeURI('http://localhost:3000/Oauth') + '&state=' + Math.random().toString(36).substr(3, 14);

const dispatch=useDispatch()

    const login=useCallback(()=>{
      window.location.href=naver_api_url
    })

  return (
      <a href={naver_api_url}><img  height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>
//    <div  onClick={login}><img  height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></div>
    


)
}


export default NaverLogin