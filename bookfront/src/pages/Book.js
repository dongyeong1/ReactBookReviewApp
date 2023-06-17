import { Button,Modal } from 'antd'
// import Card from 'antd/lib/card/Card'
import { Card } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate, useParams } from 'react-router-dom'
import PostCard from '../components/PostCard'
import { BOOK_LOAD_REQUEST, BOOK_POSTS_REQUEST, LOAD_MY_INFO_REQUEST, NAVER_LOGIN_REQUEST, } from '../reducer'

const Book = () => {
  const navigate=useNavigate()
    const {id}=useParams();
    const {posts,book}=useSelector((state)=>state)

    // var book=books.find((v)=>v.isbn===id)

    const dispatch=useDispatch()
    useEffect(()=>{
      if(localStorage.getItem('login-access-token')){
        dispatch({
          type:NAVER_LOGIN_REQUEST
        })
      }else{
        dispatch({
                type:LOAD_MY_INFO_REQUEST
            })
      }
      
    },[])
  
  useEffect(()=>{
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


  return (
    <div>
      <Card
      
      style={{width:500,height:110,marginBottom:20,borderRadius:20,margin:'20px auto',backgroundColor:'lightgray'}}>
      {/* {book&&<img src={book.image} style={{width:200}}></img>} */}
      <Card.Meta
          avatar={<img src={book.image} style={{width:50}}></img>}
          // title={book.title}
        //   description={post.text}
        description={book.title}
        
        />
      </Card>
              {/* 

        <div>{book&&book.title}</div> */}
        {posts?posts.map((v)=>(
          <div>
        <PostCard bookpost={v}></PostCard>
      
        </div>
            )):<div>등록된게시물이없습니다</div>}
    </div>
  )
}

export default Book

// XML
// https://openapi.naver.com/v1/search/book.json