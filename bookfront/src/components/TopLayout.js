import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import App from '../App'
import {Row,Col, Input,Button} from 'antd'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_BOOK, SEARCH_BOOK_REQUEST } from '../reducer'
import { UserOutlined,LogoutOutlined} from '@ant-design/icons';
import { Link, Router, useNavigate } from 'react-router-dom'


const AppWrapper=styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center ;

background-color:lightgray;
height:80px;

span{
    &:last-child{
        margin-right:50px;
    }
    &:first-child{
        margin-left:100px;
    }
}

`

const IconWrapper=styled.div`

margin-right:100px;

&>span{
   
}
`


const InputSearch=styled(Input.Search)`
width:500px;
height:50px;
margin-right:100px;

`

const TopLayout = ({children}) => {



const {user}=useSelector((state)=>state)
const navigate=useNavigate()
const dispatch=useDispatch();

const logOut=useCallback(()=>{
    if(localStorage.getItem('naverlogin-access-token')){
        localStorage.removeItem("naverlogin-access-token");
        localStorage.removeItem("naverlogin-token-type");
    
    }else if(localStorage.getItem('kakaologin-access-token')){
        localStorage.removeItem("kakaologin-access-token");
        localStorage.removeItem("kakaologin-token-type");
    }
    

    navigate('/booksearch')
},[])




  return (
    <div>
        <AppWrapper>
        <Link to='/'><span>홈</span></Link>
        {/* <Link to='/signup'><span>회원가입</span></Link> */}
        <Link to='/review'><span>독후감쓰기</span></Link>
        <Link to="/booksearch"><span>책검색</span></Link>
        {localStorage.getItem('naverlogin-access-token')||localStorage.getItem('kakaologin-access-token')?
        <span onClick={logOut} style={{width:100}}>로그아웃</span>:
        <Link to='/login'><span style={{width:100}}>로그인</span></Link>

        }

         
               
            <IconWrapper>
            {user&&<Link to="/mypage"><p><UserOutlined style={{fontSize:25}}/></p></Link>}
                {/* <p><LogoutOutlined /></p> */}
            </IconWrapper>
 
        </AppWrapper>
      
    </div>
  )
}

export default TopLayout