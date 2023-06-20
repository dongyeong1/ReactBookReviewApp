import React, { useCallback,useState ,} from 'react'
import { Form,Input,Button} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_COMMENT_REQUEST} from '../reducer';

const CommentForm = ({bookpostId}) => {
    const dispatch=useDispatch();
    const {user} =useSelector((state)=>state)

    const [comment,setComment]=useState('')
    const onChangeComment=useCallback((e)=>{
        setComment(e.target.value)
    },[comment])

      const onSubmit=()=>{
           dispatch({
            type:ADD_COMMENT_REQUEST,
            data:{
                comment,userId:user.id,postId:bookpostId}
        })
      }
   
  return (
    <Form onFinish={onSubmit} >
        <Input.TextArea value={comment} onChange={onChangeComment}></Input.TextArea>
        <Button type='primary' style={{borderRadius:30,marginTop:5,marginLeft:420}} htmlType='submit'>댓글작성</Button>
    </Form>
  )
}

export default CommentForm