import { Input ,Space, Empty, List} from 'antd'
import React, { useState ,useCallback,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  LOAD_MY_INFO_REQUEST, NAVER_LOGIN_REQUEST, SEARCH_BOOK_REQUEST } from '../reducer'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { SearchOutlined,CaretRightOutlined,CaretLeftOutlined  } from '@ant-design/icons';
import ReactPaginate from 'react-paginate'

const ListWrapper=styled(List)`
  width:700px;
  margin:30px auto;
`

const Pagination=styled.div`
width:700px;
margin:20px auto;
margin-top:30px;
.paginationBttns{
  width:700px;
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

const SearchWrapper=styled(Input)`
margin:30px auto 0 auto;
border-radius:20px;
height:50px;
width:500px;
font-size:25px;
`


const BookSearch = () => {



  const dispatch=useDispatch();

const [bookName,setBookName]=useState('')


const [showComponent,setShowComponent]=useState(false)



const {books}=useSelector((state)=>state)



const onChangeBook=useCallback((e)=>{
  setBookName(e.target.value)
  console.log(e.target.value)

},[bookName])


useEffect(()=>{

  if(books){

  }
},[books])


const bookSearch=useCallback(()=>{



  dispatch({
        type:SEARCH_BOOK_REQUEST,
        data:bookName
    })
    setTimeout(()=>{
      setShowComponent(true)

    },100)
   
},[bookName,books,showComponent])


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






const [pageNumber,setPageNumber]=useState(0)

const PerPage=5
const pagesVisited=pageNumber*PerPage
const pageCount=Math.ceil(books&&books.length/PerPage)

const changePage=({selected})=>{
  setPageNumber(selected)
}






  return (
    <div>
   
     
          <SearchWrapper
            onChange={onChangeBook}
            prefix={<SearchOutlined />}
            placeholder='책을 입력해주세요'
            size="large"
            onPressEnter={bookSearch}
          />      


      <div>

      {books?<ListWrapper
              itemLayout="horizontal"
              dataSource={books.slice(pagesVisited,pagesVisited+PerPage)}
              renderItem={(item)=>(
                <List.Item>
                  <List.Item.Meta
                  style={{height:80}}
                  avatar={ <Link to={`/book/${item.isbn}`}>
                  <img src={item.image} style={{width:60}}></img>
                  </Link>}
                  title={item.title}
                  description={item.author}
                  ></List.Item.Meta>
                </List.Item>
              )}
          ></ListWrapper>:(showComponent?<div style={{marginTop:100}}><Empty description="검색결과없음" /></div>:null)}

      <Pagination >
        {books&&<ReactPaginate
          previousLabel={<CaretLeftOutlined />}
          nextLabel={<CaretRightOutlined />}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={'paginationBttns'}
      
        ></ReactPaginate>}

       </Pagination>

       </div>
      
       
    </div>
  )
      }

export default BookSearch