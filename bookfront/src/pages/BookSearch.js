import { Button, Form, Input } from 'antd'
import React, { useState ,useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LOAD_BOOK, SEARCH_BOOK_REQUEST } from '../reducer'
import { Link } from 'react-router-dom'

const BookSearch = () => {


const [bookName,setBookName]=useState('')


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


const loadBook=useCallback((data)=>()=>{//map안에는 고차함수써주기
  dispatch({
    type:LOAD_BOOK,
    data
  })
  console.log('asß')
},[])


  return (
    <div>
      <Form onFinish={bookSearch}>
      <Input placeholder='책을검색하세요'onChange={onChangeBook}></Input>
      <Button type='primary' htmlType='submit'>검색하기</Button>
      </Form>
      <div>
      {books[0]?books.map((v)=>(
        <div>
        <div>{v.title}</div>
        <Link to={`/book/${v.isbn}`} >
        <img onClick={loadBook(v.isbn)} src={v.image} style={{width:100}}></img></Link>
        </div>
        )):null}
       </div>

    </div>
  )
}

export default BookSearch