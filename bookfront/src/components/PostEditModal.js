import React,{useCallback,useEffect,useState} from 'react'
import { Modal ,Input, Button,Form,Rate} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { POST_EDIT_REQUEST } from '../reducer';
const PostEditModal = ({editModal,setEditModal,post,postTitle}) => {
    const dispatch=useDispatch();
    const [title,setTitle]=useState('')
    const [content,setContent]=useState('')
    const [rate,setRate]=useState('')
    const {posts,user}=useSelector((state)=>state)
    // const post=user.Posts.find((v)=>v.id===postId)

    // useEffect(()=>{
    //     console.log('postt',post)
    // },[post])

    const onChangeTitle=useCallback((e)=>{
        setTitle(e.target.value)
    },[title])

    const onChangeContent=useCallback((e)=>{
        setContent(e.target.value)
    },[content])

    const onChangeRate=useCallback((e)=>{
        setRate(e)
    },[rate])

    

    const handleCancel=useCallback(()=>{
        setEditModal(false)
      },[])


    const EditPostSubmit=useCallback(()=>{
        dispatch({
            type:POST_EDIT_REQUEST,
            data:{
                postId:post.id,
                title,
                content,
                rate
                }
                    })
    },[title,content,rate,post])
  return (
      <div>
    <Modal open={editModal} onCancel={handleCancel}>
        <Form onFinish={EditPostSubmit}>
            <div>asd{postTitle}</div>
            제목<Input placeholder={post.title} value={title} onChange={onChangeTitle}></Input>
            내용<Input placeholder={post.content} value={content}  onChange={onChangeContent}></Input>
            비율<Rate placeholder={post.rate} value={rate}  onChange={onChangeRate}></Rate>
            <Button type='primary' htmlType='submit'>수정하기</Button>
        </Form>
    </Modal>
    </div>
  )
}

export default PostEditModal