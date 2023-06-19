import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import App from '../App'
import {Row,Col, Input,Button} from 'antd'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_BOOK, SEARCH_BOOK_REMOVE, SEARCH_BOOK_REQUEST } from '../reducer'
import { UserOutlined,LogoutOutlined} from '@ant-design/icons';
import { Link, Router, useNavigate } from 'react-router-dom'
import ReviewModal from './ReivewModal'
import { List } from 'antd/lib/form/Form'


const AppWrapper=styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center ;

background-color:lightgray;
height:70px;

div{
    &:last-child{
        margin-right:50px;

    }
    &:first-child{
        margin-left:100px;
    }

}

`


const TopLayout = ({children}) => {

const [showModal,setShowModal]=useState(false)

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
    

    navigate('/home')
},[])


const modalHandle=useCallback(()=>{
    setShowModal(true)
},[])

const bookRemove=useCallback(()=>{
    dispatch({
        type:SEARCH_BOOK_REMOVE
    })
},[])


  return (
    <div>
        <ReviewModal modal={showModal} setModal={setShowModal}></ReviewModal>
        <AppWrapper>
        <Link to='/home'><div style={{fontSize:18}}>홈</div></Link>
        <Link  to="/booksearch"><div onClick={bookRemove} style={{marginRight:100,fontSize:18}} className='ser'>책검색</div></Link>

         <div style={{marginRight:400 ,fontSize:18}} onClick={modalHandle}>독후감쓰기</div>
        {user&&<Link to="/mypage"><div  style={{fontSize:18}}>마이페이지</div></Link>}

        {localStorage.getItem('naverlogin-access-token')||localStorage.getItem('kakaologin-access-token')?
       <Link to='/home'><div   onClick={logOut} style={{width:100,fontSize:18}}>로그아웃</div></Link> :
        <Link to='/login'><div  style={{fontSize:18}} style={{width:100}}>로그인</div></Link>

        }

         
               
                {/* <p><LogoutOutlined /></p> */}
 
        </AppWrapper>
      
    </div>
  )
}

export default TopLayout