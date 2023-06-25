import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Modal } from 'antd';
import {LoadingOutlined,} from "@ant-design/icons";

const KakaoOauth = () => {


    const navigate=useNavigate();

    const success=()=>{
        Modal.success({
          content: (
            <div>
                <h3>로딩중...</h3>
            </div>
        ),
          centered: true,
          icon: <LoadingOutlined />,
        }); 
      }


    useEffect(()=>{
      
        success()

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
                sessionStorage.setItem('kakaologin-access-token',res.data.access_token)
                sessionStorage.setItem('kakaologin-token-type',res.data.token_type)
                Modal.destroyAll();
                navigate('/home')
            })
           })
            
        },[])
  return (
    <div></div>
  )
}

export default KakaoOauth