import React, { useCallback,useState,useEffect } from 'react'
import { Input, Button,Form,Rate} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {  ADD_POST_REQUEST } from '../reducer'
import BookSearchFormModal from './BookSearchFormModal'
import BookImageSelect from './BookImageSelect'
import { useNavigate } from "react-router-dom";
import {Modal} from 'antd'



const PostForm = () => {
    const navigate = useNavigate();
    const {post,user}=useSelector((state)=>state)
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


     

    const submitText=useCallback(()=>{

        console.log(searchedBook,title,text,rate)
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
          content: '게시글등록완료',
          onOk() {navigate(`/booksearch`)},
        });
      };

  return (
    <div>
        <Form onFinish={submitText}>
            {/* <label  >제목</label> */}
            <BookImageSelect searchedBook={searchedBook} showModal={showModal}></BookImageSelect>

        <Input style={{  width:400}}   value={title} onChange={onChangeTitle}  placeholder='제목'></Input>
        <Input.TextArea style={{marginTop:20, width:400,height:150}} value={text} placeholder='책내용' onChange={onChangeText}></Input.TextArea>
       <div style={{display:'flex',flexDirection:'column'}}>
       <label style={{fontSize:15,marginTop:10,marginRight:370}}>평점</label>
        <Rate onChange={onChangeRate} style={{marginTop:5,marginRight:270}} value={rate} ></Rate>
       </div>

     

     <div style={{display:'flex', marginTop:30,marginLeft:100}}>



     
   




     </div>
    
     <Button style={{borderRadius:100}} size='large' type="primary" htmlType='submit'>등록하기</Button>

      
     
        </Form>
        <BookSearchFormModal setModal={setModal} modal={modal} setSearchedBook={setSearchedBook}></BookSearchFormModal>
    </div>
  )
}

export default PostForm