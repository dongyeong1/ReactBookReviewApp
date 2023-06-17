import { Button, Form, Input ,Space,Spin,Modal, Empty,Card, List} from 'antd'
import React, { useState ,useCallback,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BOOK_POSTS_REQUEST, LOAD_MY_INFO_REQUEST, NAVER_LOGIN_REQUEST, SEARCH_BOOK_REQUEST } from '../reducer'
import { Link,useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { UserOutlined,SearchOutlined,CaretRightOutlined,CaretLeftOutlined  } from '@ant-design/icons';
import ReactPaginate from 'react-paginate'

const Pagination=styled.div`

margin-top:30px;
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

const SearchWrapper=styled(Input.Search)`
margin-top:30px;
width:800px;
`
const SearchedWrapper=styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center ;

`
const BookWrapper=styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center ;

margin-right:auto;
margin-left:100px;
margin-top:50px;
`

const BookSearch = () => {

  

  






  const dispatch=useDispatch();
  const navigate = useNavigate();

const [bookName,setBookName]=useState('')

const [showComponent,setShowComponent]=useState(false)

// const [bookList,setBookList]=useState('')


const {books,posts}=useSelector((state)=>state)
const { Search } = Input;



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
   setShowComponent(true)
},[bookName,books])

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





// useEffect(()=>{
//   dispatch({
//       type:LOAD_MY_INFO_REQUEST
//   })
// },[])


//paginate

const [pageNumber,setPageNumber]=useState(0)

const PerPage=5
const pagesVisited=pageNumber*PerPage



const pageCount=Math.ceil(books&&books.length/PerPage)

const changePage=({selected})=>{
  setPageNumber(selected)
}

  return (
    <div>
   
        <Space direction="vertical">
       
        <SearchWrapper
        onChange={onChangeBook}
         prefix={<SearchOutlined />}
         placeholder='책을검색하세요'
      enterButton="Search"
      size="large"
      onSearch={bookSearch}
    />      

        </Space>
      
      



      <div>

      {books?


          <List
            style={{width:700,margin:'30px auto'}}
              itemLayout="horizontal"
              dataSource={books.slice(pagesVisited,pagesVisited+PerPage)}
              renderItem={(item,index)=>(
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
          ></List>




        :<Empty style={{marginTop:100}} description="검색결과 없음"/>}
          
   
          <Pagination style={{marginLeft:200}}>
        {books&&
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
       {/* {displayUsers} */}
      
       
    </div>
  )
      }

export default BookSearch