import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { NAVER_LOGIN_REQUEST } from '../reducer';

const KakaoOauth = () => {


    const navigate=useNavigate();
    const dispatch=useDispatch();


    useEffect(()=>{
        console.log('123123213123123')

        let client_id = process.env.REACT_APP_KAKAO_REST_API;
        let redirectURI = encodeURI('http://localhost:3000/KakaoOauth');
        let code=new URL(window.location.href).searchParams.get("code");
        
        // let api_url = '/oauth2.0/token?grant_type=authorization_code&client_id='+client_id+'&client_secret='+client_secret+'&redirect_uri='+redirectURI+'&code='+code+'&state='+callback_state;
        console.log('cdddodeeeee',code)

        
        let api_uri='/oauth/token?grant_type=authorization_code&client_id='+client_id+'&redirect_uri='+redirectURI+'&code='+code;
        
        axios({
             method:'post',
             url:api_uri,
             headers:{
                "Content-Type" : "application/x-www-form-urlencoded",
            }
        })
        .then((res)=>{
            console.log('dongss',res)

            axios({
                method:'post',
                url:'http://localhost:3065/user/kakaologin',
                data:res.data,
                headers:{
                    "Content-Type" : "application/x-www-form-urlencoded",
                }
                

            })
            .then((res)=>{
                console.log('userkakaoinformation',res.data)
                localStorage.setItem('kakaologin-access-token',res.data.access_token)
                localStorage.setItem('kakaologin-token-type',res.data.token_type)

                navigate('/booksearch')

            })
           })
            
        },[])

        // if(result){
        //     console.log(result)
        // }


    



  return (
    <div>로딩중</div>
  )
}

export default KakaoOauth