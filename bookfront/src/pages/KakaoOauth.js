import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const KakaoOauth = () => {


    const navigate=useNavigate();


    useEffect(()=>{
      

        let client_id = process.env.REACT_APP_KAKAO_REST_API;
        let redirectURI = encodeURI('http://localhost:3000/KakaoOauth');
        let code=new URL(window.location.href).searchParams.get("code");
        
        let api_uri='/oauth/token?grant_type=authorization_code&client_id='+client_id+'&redirect_uri='+redirectURI+'&code='+code;
        
        axios({
             method:'post',
             url:api_uri,
             headers:{
                "Content-Type" : "application/x-www-form-urlencoded",
            }
        })
        .then((res)=>{

            axios({
                method:'post',
                url:'http://localhost:3065/user/kakaologin',
                data:res.data,
                headers:{
                    "Content-Type" : "application/x-www-form-urlencoded",
                }
            })
            .then((res)=>{
                localStorage.setItem('kakaologin-access-token',res.data.access_token)
                localStorage.setItem('kakaologin-token-type',res.data.token_type)
                navigate('/home')
            })
           })
            
        },[])
  return (
    <div>로딩중</div>
  )
}

export default KakaoOauth