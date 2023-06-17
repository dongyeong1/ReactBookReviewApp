import React, { useCallback, useState } from 'react'
import { Modal ,Input,Space} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { BOOKS_REMOVE_REQUEST, SEARCH_BOOK_REMOVE, SEARCH_BOOK_REQUEST } from '../reducer'
import styled from 'styled-components'
import ReactPaginate from 'react-paginate'
import { UserOutlined,SearchOutlined,CaretRightOutlined,CaretLeftOutlined  } from '@ant-design/icons';



const Pagination=styled.div`

margin-top:50px;
.paginationBttns{
  width:90%;
  height:30px;
  list-style:none;
  display:flex;
  justify-content:center;
}

.paginationBttns a{
  padding:7px;
  margin:10px;
  border-radius:5px;
  border: 1px solid blue;
  color: blue;
  cursor: pointer
}
.paginationBttns a:hover{
  color:white;
  background-color:blue;
}
.paginationActive a{
  color:white;
  background-color:blue;
}

`

const ModalWrapper=styled(Modal)`
display:block;
`

const ResultWrapper=styled.div`
margin-top:30px;

display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center ;

height: 200px; 
overflow-y: auto;  
`


const Abc=styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center ;

margin-right:auto;

`

const SearchWrapper=styled(Input.Search)`
margin-top:10px;
width:450px;
`
const BookSearchFormModal = ({setModal,modal,setSearchedBook}) => {
 
//  const [bookId,setBookId]=useState('')
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

const imageClick=useCallback((title,isbn,image)=>()=>{
  setSearchedBook({title,isbn,image})
  // setBookId(isbn)//나중에form보낼때
  dispatch({
    type:SEARCH_BOOK_REMOVE
  })
  setBookName('')
  setModal(false)
  
},[bookName,modal])

  const handleCancel=useCallback(()=>{
    
    setModal(false)
    dispatch({
      type:BOOKS_REMOVE_REQUEST
    })
  },[modal])



//paginate

const [pageNumber,setPageNumber]=useState(0)

const PerPage=5
const pagesVisited=pageNumber*PerPage



const pageCount=Math.ceil(books&&books.length/PerPage)

const changePage=({selected})=>{
  setPageNumber(selected)
}



//modal


  return (
    <div>
        <ModalWrapper open={modal} onOk={false} onCancel={handleCancel}>
         
        <Space direction="vertical">
       
       <SearchWrapper
       value={bookName}
       onChange={onChangeBook}
        prefix={<SearchOutlined />}
        placeholder='책을검색하세요'
     enterButton="Search"
     size="large"
     onSearch={bookSearch}
   />      

       </Space>
        <ResultWrapper>

        {books&&books.slice(pagesVisited,pagesVisited+PerPage).map((v)=>(
       <Abc onClick={imageClick(v.title,v.isbn,v.image)}>
        <img  src={v.image} style={{width:80}}></img>
        <div>{v.title}</div>
        </Abc>
        ))}
                </ResultWrapper>

                <Pagination>
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

      </ModalWrapper>
    
    </div>
  )
}

export default BookSearchFormModal