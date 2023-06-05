import React, { useCallback,useState } from 'react'
import { Input, Button,Form,Rate} from 'antd'
import { useDispatch } from 'react-redux'
import { ADD_POST } from '../reducer'
import BookSearchFormModal from './BookSearchFormModal'


const PostForm = ({id}) => {


    const [modal,setModal]=useState(false)
    const dispatch=useDispatch()
    const [text,setText]=useState('')
    const onChangeText=useCallback((e)=>{
        setText(e.target.value)
    },[text])

    const submitText=useCallback(()=>{
        dispatch({
            type:ADD_POST,
            data:{
                isbn:id,
                text
            }
        })
    },[text])

    const showModal=useCallback(()=>{
        setModal(true)
    },[modal])

  return (
    <div>
        <Form onFinish={submitText}>
        <Input placeholder='제목'></Input>
        <Input placeholder='책이름'></Input><Button onClick={showModal}>책 검색하기</Button>
        <BookSearchFormModal setModal={setModal} modal={modal} ></BookSearchFormModal>
        <Rate defaultValue={2.5}></Rate>
        <Input.TextArea value={text} placeholder='책내용' onChange={onChangeText}></Input.TextArea>

        <Button type="primary" htmlType='submit'>입력</Button>

        </Form>
    </div>
  )
}

export default PostForm