import { Button, Form, Input ,Space,Spin,Modal} from 'antd'
import React, { useState ,useCallback,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BOOK_POSTS_REQUEST, LOAD_MY_INFO_REQUEST, SEARCH_BOOK_REQUEST } from '../reducer'
import { Link,useNavigate } from 'react-router-dom'


const BookSearch = () => {

  const dispatch=useDispatch();
  const navigate = useNavigate();

const [bookName,setBookName]=useState('')



// const [bookList,setBookList]=useState('')


const {books,posts}=useSelector((state)=>state)



const onChangeBook=useCallback((e)=>{
  setBookName(e.target.value)
  console.log(e.target.value)
},[bookName])

// const successModals = () => {
// //   Modal.success({
// //     content: '책보기',
// //     onOk() {navigate(`/book/${posts[0].isbn}`)},
// //   });
// // };


const bookSearch=useCallback(()=>{
    dispatch({
        type:SEARCH_BOOK_REQUEST,
        data:bookName
    })
   
   console.log('asd')

},[bookName,books])




useEffect(()=>{
  dispatch({
      type:LOAD_MY_INFO_REQUEST
  })
},[])


  return (
    <div>
      <Form onFinish={bookSearch}>
      <Input placeholder='책을검색하세요'onChange={onChangeBook}></Input>
      <Button type='primary' htmlType='submit'>검색하기</Button>
      </Form>
      <div>
      {books?books.map((v)=>(
        <div>
        <div>{v.title}</div>
        <Link to={`/book/${v.isbn}`}>
        <img src={v.image} style={{width:100}}></img>

        </Link>
        </div>
        )):null}
          
   
    

       </div>

    </div>
  )
      }

export default BookSearch