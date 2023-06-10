import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import App from '../App'
import {Row,Col, Input} from 'antd'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_BOOK, SEARCH_BOOK_REQUEST } from '../reducer'
import { UserOutlined,LogoutOutlined} from '@ant-design/icons';
import { Link, Router } from 'react-router-dom'


const AppWrapper=styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center ;

background-color:lightgray;
height:80px;


`

const IconWrapper=styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center ;


&>p{
    margin-right:30px;
}
`


const InputSearch=styled(Input.Search)`
width:500px;
height:50px;
margin-right:100px;

`

const TopLayout = ({children}) => {


const [bookName,setBookName]=useState('')

const {user}=useSelector((state)=>state)

const onChangeBook=useCallback((e)=>{
    setBookName(e.target.value)
    console.log(e.target.value)
},[bookName])

// const [bookList,setBookList]=useState('')

const dispatch=useDispatch();

const {books}=useSelector((state)=>state)

const bookSearch=useCallback(()=>{
    dispatch({
        type:SEARCH_BOOK_REQUEST,
        data:bookName
    })
   
   console.log('asd')

},[bookName,books])

const Home=useCallback(()=>{
    window.location.replace('/');
},[])

  return (
    <div>
        <AppWrapper>
        {/* <img src="https://media-sparta.s3.ap-northeast-2.amazonaws.com/media/images/patagonia_main_logo.png"/> */}
        <a onClick={Home}>책리뷰</a>
        <Link to='/Home'>책등록</Link>
        <Link to="/booksearch">책검색</Link>
            <InputSearch  placeholder='책을 검색하세요' onChange={onChangeBook} onSearch={bookSearch}></InputSearch>
               
            <IconWrapper>
            {user&&<Link to="/mypage"><p><UserOutlined /></p></Link>}
                {/* <p><LogoutOutlined /></p> */}
            </IconWrapper>
 
        </AppWrapper>
        {/* {books&&books.map((v)=>(
           <div>
           <div>{v.title}</div>
           <img src={v.image} ></img>
           </div>

        ))} */}
        {/* <Row>
            <Col>{children}</Col>
        </Row> */}
    </div>
  )
}

export default TopLayout