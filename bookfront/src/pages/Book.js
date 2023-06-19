import { Button,Modal } from 'antd'
// import Card from 'antd/lib/card/Card'
import { Card } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate, useParams } from 'react-router-dom'
import PostCard from '../components/PostCard'
import { BOOK_LOAD_REQUEST, BOOK_POSTS_REQUEST, LOAD_MY_INFO_REQUEST, NAVER_LOGIN_REQUEST, RATE_BOOK_POSTS_REQUEST, } from '../reducer'
import ReactPaginate from 'react-paginate'
import { UserOutlined,SearchOutlined,CaretRightOutlined,CaretLeftOutlined  } from '@ant-design/icons';
import styled from 'styled-components'

const Pagination=styled.div`

margin-top:30px;
margin-bottom:10px;
.paginationBttns{
  width:80%;
  height:30px;
  list-style:none;
  display:flex;
  justify-content:center;
}

.paginationBttns a{
  padding:10px;
  margin:8px;
  border-radius:5px;
  border: 1px solid #1890ff;
  color: #1890ff;
  cursor: pointer
}
.paginationBttns a:hover{
  color:white;
  background-color:#1890ff;
}
.paginationActive a{
  color:white;
  background-color:#1890ff;
}

`
const Book = () => {
  const navigate=useNavigate()
    const {id}=useParams();
    const {posts,book}=useSelector((state)=>state)

    // var book=books.find((v)=>v.isbn===id)

    const dispatch=useDispatch()
  
useEffect(()=>{
  if(localStorage.getItem('naverlogin-access-token')){
    dispatch({
      type:NAVER_LOGIN_REQUEST
    })
  }else if(localStorage.getItem('kakaologin-access-token')){
    dispatch({
      type:NAVER_LOGIN_REQUEST
    })
  } else{
    dispatch({
            type:LOAD_MY_INFO_REQUEST
        })
  }
  
  
  
 
},[])

  
  useEffect(()=>{
    console.log('1asdasdasdasd')
    dispatch({
      type:BOOK_LOAD_REQUEST,
      data:id
    })
  },[])


  useEffect(()=>{
    // console.log('asdsa',book)

      dispatch({
        type:BOOK_POSTS_REQUEST,
        data:id
      })
  },[])

  const dateSort=useCallback(()=>{
    dispatch({
      type:BOOK_POSTS_REQUEST,
      data:id
    })
  },[])

  const rateSort=useCallback(()=>{
    dispatch({
      type:RATE_BOOK_POSTS_REQUEST,
      data:id
    })
  },[])



const [pageNumber,setPageNumber]=useState(0)

const PerPage=5
const pagesVisited=pageNumber*PerPage



const pageCount=Math.ceil(posts&&posts.length/PerPage)

const changePage=({selected})=>{
  setPageNumber(selected)
}
  return (
    <div>
      <Card
      
      style={{width:500,height:110,marginBottom:20,borderRadius:20,margin:'20px auto',backgroundColor:'lightgray'}}>
      {/* {book&&<img src={book.image} style={{width:200}}></img>} */}
      <Card.Meta
          avatar={<img src={book&&book.image} style={{width:50}}></img>}
          // title={book.title}
        //   description={post.text}
        description={book&&book.title}
        
        
        />
      </Card>
      <div style={{marginLeft:320}}>
        <Button size='large' onClick={dateSort} style={{borderRadius:20, marginRight:20}}>최신순</Button>
        <Button size='large' onClick={rateSort} style={{borderRadius:20}}>평점순</Button>
        </div>
        {posts?posts.slice(pagesVisited,pagesVisited+PerPage).map((v)=>(
          <div>
        <PostCard bookpost={v}></PostCard>
      
        </div>
            )):<div>등록된게시물이없습니다</div>}

<Pagination style={{marginLeft:200}}>
        {posts&&
       <ReactPaginate
       previousLabel={<CaretLeftOutlined />}
       nextLabel={<CaretRightOutlined />}
       pageCount={pageCount}
       onPageChange={changePage}
       containerClassName={'paginationBttns'}
      
      //  activeClassName={'paginationActive'}
></ReactPaginate>}

       </Pagination>

    </div>
  )
}

export default Book

// XML
// https://openapi.naver.com/v1/search/book.json