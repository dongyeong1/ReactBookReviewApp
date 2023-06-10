import React, { useCallback,useState,useEffect } from 'react'
import { Input, Button,Form,Rate} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_POST, ADD_POST_REQUEST } from '../reducer'
import BookSearchFormModal from './BookSearchFormModal'
import ImageCard from './ImageCard'
import BookImageSelect from './BookImageSelect'
import { useNavigate } from "react-router-dom";
import {Modal} from 'antd'
import {LoadingOutlined} from '@ant-design/icons'



const PostForm = () => {
    const navigate = useNavigate();
    const {post}=useSelector((state)=>state)
    const [searchedBook,setSearchedBook]=useState(null)
    const [title,setTitle]=useState('')
    const [text,setText]=useState('')
    const [rate,setRate]=useState(0)


    useEffect(() => {
        if (post) {

           successModals()
        
        }
      }, [post]);
     
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


    const showModal=useCallback(()=>{
        setModal(true)
    },[modal])

    // const ss=()=>{
    //     // 
    //     console.log('as')
    // }

     

    const submitText=useCallback(()=>{

        console.log(searchedBook,title,text,rate)
        dispatch({
            type:ADD_POST_REQUEST,
            data:{
                title,
                text,
                rate,
                isbn:searchedBook.isbn,
                image:searchedBook.image,
                bookname:searchedBook.title
            }
        })
        // dispatch({
        //     type:ADD_POST,
        //     data:{
        //         isbn:id,
        //         text
        //     }
        // })
        // success()

    },[text,searchedBook,title,rate])

    const successModals = () => {
        Modal.success({
          content: '게시글등록완료',
          onOk() {navigate(`/post/${post.id}`)},
        });
      };

  return (
    <div>
        <Form onFinish={submitText}>
        <Input value={title} onChange={onChangeTitle}  placeholder='제목'></Input>
        {/* <Input disabled placeholder='책이름' value={searchedBook.title} ></Input> */}
        <BookImageSelect searchedBook={searchedBook} showModal={showModal}></BookImageSelect>
        {/* <Button onClick={showModal}>책 검색하기</Button> */}
        <BookSearchFormModal setModal={setModal} modal={modal} setSearchedBook={setSearchedBook}></BookSearchFormModal>
        <Rate onChange={onChangeRate} value={rate} ></Rate>
        <Input.TextArea value={text} placeholder='책내용' onChange={onChangeText}></Input.TextArea>

        <Button type="primary" htmlType='submit'>입력</Button>
       
        </Form>
    </div>
  )
}

export default PostForm