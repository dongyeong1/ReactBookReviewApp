import React, { useCallback,useState,useEffect } from 'react'
import { Input, Button,Form,Rate} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {  ADD_POST_REQUEST, LOAD_MY_INFO_REQUEST, NAVER_LOGIN_REQUEST } from '../reducer'
import BookSearchFormModal from './BookSearchFormModal'
import BookImageSelect from './BookImageSelect'
import { useNavigate } from "react-router-dom";
import {Modal} from 'antd'
import styled from 'styled-components'

const FormItem=styled(Form.Item)`
label{
    font-size:20px;
}
`

const PostForm = ({}) => {
    const {post,user}=useSelector((state)=>state)
    const [searchedBook,setSearchedBook]=useState(null)
    const [title,setTitle]=useState('')
    const [text,setText]=useState('')
    const [rate,setRate]=useState(0)


    useEffect(() => {
        if (post&&post.id) {

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
      
     

    const submitText=useCallback(()=>{
        dispatch({
            type:ADD_POST_REQUEST,
            data:{
                userId:user.id,
                title,
                text,
                rate,
                isbn:searchedBook.isbn,
                image:searchedBook.image,
                bookname:searchedBook.title
            }
        })

    },[text,searchedBook,title,rate])

    const successModals = () => {
        Modal.success({
          content: '독후감 등록완료',
          onOk() { },
        });
      };

  return (
    <div>
        <Form    layout="vertical" onFinish={submitText}>
            {/* <label  >제목</label> */}

        <div style={{display:'flex'}}>
            <div>
            <BookImageSelect searchedBook={searchedBook} showModal={showModal}></BookImageSelect>
            </div>
           

            <div style={{marginLeft:50,marginTop:70}}>

            <FormItem label='제목'  required>
                <Input style={{ border:0,  width:400}}   value={title} onChange={onChangeTitle}  placeholder='제목을 입력해주세요'></Input>
            </FormItem>
            <FormItem label="평점" required>
                <Rate onChange={onChangeRate} style={{marginTop:5,marginRight:270}} value={rate} ></Rate>
            </FormItem>
            <FormItem label="내용" required>
                <Input.TextArea style={{border:0, marginTop:20, width:400,height:150}} value={text} placeholder='내용을 입력해주세요' onChange={onChangeText}></Input.TextArea>
            </FormItem>
            <Button style={{borderRadius:100,marginLeft:150}} size='large' type="primary" htmlType='submit'>등록하기</Button>
            </div>

        </div>
        </Form>
            <BookSearchFormModal setModal={setModal} modal={modal} setSearchedBook={setSearchedBook}></BookSearchFormModal>
    </div>
  )
}

export default PostForm