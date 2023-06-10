import React, { useCallback,useState ,} from 'react'
import { Form,Input,Button} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_COMMENT_REQUEST } from '../reducer';

const CommentForm = () => {
    const dispatch=useDispatch();
    const {user,post} =useSelector((state)=>state)

    const [comment,setComment]=useState('')
    const onChangeComment=useCallback((e)=>{
        setComment(e.target.value)
    },[comment])

    const onSubmit=useCallback(()=>{
        dispatch({
            type:ADD_COMMENT_REQUEST,
            data:{
                comment,userId:user.id,postId:post.id}
        })
    },[comment,user,post])
  return (
    <Form onFinish={onSubmit} >
        <Input.TextArea value={comment} onChange={onChangeComment}></Input.TextArea>
        <Button type='primary' htmlType='submit'>댓글작성</Button>
    </Form>
  )
}

export default CommentForm