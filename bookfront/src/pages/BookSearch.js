import { Button, Form, Input ,Space,Spin,Modal, Empty,Card, List, Select} from 'antd'
import React, { useState ,useCallback,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BOOK_POSTS_REQUEST, LOAD_MY_INFO_REQUEST, NAVER_LOGIN_REQUEST, SEARCH_BOOK_REQUEST } from '../reducer'
import { Link,useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { UserOutlined,SearchOutlined,CaretRightOutlined,CaretLeftOutlined  } from '@ant-design/icons';
import ReactPaginate from 'react-paginate'
import { delay } from 'redux-saga/effects'

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

const SearchWrapper=styled(Input)`
margin:30px auto 0 auto;
border-radius:20px;
height:50px;
width:500px;
font-size:25px;
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

const [bookName,setBookName]=useState('')


const [showComponent,setShowComponent]=useState(false)

// const [bookList,setBookList]=useState('')


const {books,posts}=useSelector((state)=>state)



const onChangeBook=useCallback((e)=>{
  setBookName(e.target.value)
  console.log(e.target.value)
},[bookName])

const [selectValue,setSelectValue]=useState()


const bookSearch=useCallback(()=>{

  if(selectValue==="nickname"){
    console.log('닉네임이다')
  }else if(selectValue==="bookname"){
    console.log('책이름이다')
  }

  dispatch({
        type:SEARCH_BOOK_REQUEST,
        data:bookName
    })
   
   console.log('asd')
   setShowComponent(true)







   
},[bookName,books,showComponent,selectValue])

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






const [pageNumber,setPageNumber]=useState(0)

const PerPage=5
const pagesVisited=pageNumber*PerPage



const pageCount=Math.ceil(books&&books.length/PerPage)

const changePage=({selected})=>{
  setPageNumber(selected)
}

const options=[{
  value:'bookname',
  label:'책이름'
},
{
  value:'nickname',
  label:'닉네임'
}]


useEffect(()=>{
 setSelectValue(selectValue)
 console.log(selectValue)
},[selectValue])



// const onChangeSelect=useCallback((value)=>{
// setSelectValue(value)
// console.log('value',value)
// console.log(selectValue)
// },[selectValue,options])

  return (
    <div>
     {/* <select style={{width:100,marginTop:10,marginRight:10,height:50}} onChange={onChangeSelect}  value={selectValue} >

<option key={1} value="bookname">책이름</option>
<option key={2} value="nickname">닉네임</option>

</select> */}
        <Space direction="horizontal">
     
        <SearchWrapper
        onChange={onChangeBook}
         prefix={<SearchOutlined />}
         placeholder='책을 입력해주세요'
      size="large"
      onPressEnter={bookSearch}
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
          ></List>:(showComponent?<div style={{marginTop:100}}><Empty description="검색결과없음" /></div>:null)




        }
          
   
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