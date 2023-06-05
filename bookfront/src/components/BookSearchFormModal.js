import React, { useCallback, useState } from 'react'
import { Modal ,Input} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { SEARCH_BOOK_REQUEST } from '../reducer'
import styled from 'styled-components'

const ModalWrapper=styled(Modal)`
display:block;
`

const ResultWrapper=styled.div`
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
const BookSearchFormModal = ({setModal,modal}) => {
 
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

  const handleCancel=useCallback(()=>{
    setModal(false)
  },[modal])
  return (
    <div>
        <ModalWrapper title="Basic Modal" open={modal} onCancel={handleCancel}>
          <div>
        <Input.Search onChange={onChangeBook} onSearch={bookSearch}></Input.Search>
        </div>
        <ResultWrapper>

        {books&&books.map((v)=>(
       <Abc>
        <img  src={v.image} style={{width:100}}></img>
        <div>{v.title}</div>
        </Abc>
        ))}
                </ResultWrapper>

      </ModalWrapper>
    </div>
  )
}

export default BookSearchFormModal