import React, { useCallback,useState } from 'react'
import { Input, Button,Form,Rate} from 'antd'
import { useDispatch } from 'react-redux'
import { ADD_POST } from '../reducer'
import BookSearchFormModal from './BookSearchFormModal'


const PostForm = ({id}) => {

    const [searchedBook,setSearchedBook]=useState({})
    const [title,setTitle]=useState('')
    const [text,setText]=useState('')
    const [rate,setRate]=useState(0)

    const [modal,setModal]=useState(false)
    const dispatch=useDispatch()
    const onChangeText=useCallback((e)=>{
        setText(e.target.value)
    },[text])

    const onChangeTitle=useCallback((e)=>{
        setTitle(e.target.value)
    },[title])

    const onChangeRate=useCallback((e)=>{
        setRate(e)
    },[rate])

    const submitText=useCallback(()=>{

        console.log(searchedBook,title,text,rate)
        // dispatch({
        //     type:ADD_POST,
        //     data:{
        //         isbn:id,
        //         text
        //     }
        // })
    },[text,searchedBook,title,rate])

    const showModal=useCallback(()=>{
        setModal(true)
    },[modal])

  return (
    <div>
        <Form onFinish={submitText}>
        <Input value={title} onChange={onChangeTitle}  placeholder='제목'></Input>
        <Input disabled placeholder='책이름' value={searchedBook.title} ></Input><Button onClick={showModal}>책 검색하기</Button>
        <BookSearchFormModal setModal={setModal} modal={modal} setSearchedBook={setSearchedBook}></BookSearchFormModal>
        <Rate onChange={onChangeRate} value={rate} ></Rate>
        <Input.TextArea value={text} placeholder='책내용' onChange={onChangeText}></Input.TextArea>

        <Button type="primary" htmlType='submit'>입력</Button>

        </Form>
    </div>
  )
}

export default PostForm