import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux'
import PostForm from '../components/PostForm'
import { LOAD_MY_INFO_REQUEST, NAVER_LOGIN_REQUEST } from '../reducer'
import styled from 'styled-components'
import { Card } from 'antd'

const ReviewWrapper=styled.div`
&>div{
  font-size:30px;
}
width:500px;
margin:50px auto;
`

const Review = () => {
    const dispatch=useDispatch()
   
useEffect(()=>{
  if(sessionStorage.getItem('naverlogin-access-token')){
    dispatch({
      type:NAVER_LOGIN_REQUEST
    })
  }else if(sessionStorage.getItem('kakaologin-access-token')){
    dispatch({
      type:NAVER_LOGIN_REQUEST
    })
  } else{
    dispatch({
            type:LOAD_MY_INFO_REQUEST
        })
  }
  
  
  
 
},[])

  return (
    <ReviewWrapper>
      <Card >
      <div>독후감쓰기</div>
        <PostForm></PostForm>
      </Card>
       
    </ReviewWrapper>
  )
}

export default Review