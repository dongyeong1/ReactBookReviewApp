import React,{useCallback,useState,useEffect} from 'react'
import {  Input ,Space} from 'antd'
import styled from 'styled-components'
import { SearchOutlined } from '@ant-design/icons';
import { LOAD_MY_INFO_REQUEST, NAVER_LOGIN_REQUEST, SEARCH_BOOK_REQUEST } from '../reducer';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const SearchWrapper=styled(Input)`
margin:40px auto;
border-radius:200px;
height:50px;
width:500px;
font-size:25px;
`
const Home = () => {


    const dispatch=useDispatch();
    const navigate = useNavigate();

    const [bookName,setBookName]=useState('')

    const bookSearch=useCallback(()=>{
        dispatch({
              type:SEARCH_BOOK_REQUEST,
              data:bookName
          })

      navigate('/booksearch')
     
    },[bookName])



  const onChangeBook=useCallback((e)=>{
    setBookName(e.target.value)
    },[bookName])



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
    <div>
   
    <Space direction="vertical">
      <div style={{marginTop:90}}>
        <img src="img/logo.png" width='250'></img>
      </div>
   
        <SearchWrapper
          onChange={onChangeBook}
          prefix={<SearchOutlined style={{fontSize:30}}/>}
          placeholder='책을 검색해보세요'
          size="large"
          onPressEnter={bookSearch}
        />      

    </Space>
  </div>
  )
}

export default Home