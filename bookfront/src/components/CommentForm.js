import React, { useCallback,useEffect,useState ,} from 'react'
import { Form,Input,Button} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_COMMENT_REQUEST, LOAD_MY_INFO_REQUEST, NAVER_LOGIN_REQUEST } from '../reducer';

const CommentForm = ({bookpostId}) => {
    const dispatch=useDispatch();
    const {user,post} =useSelector((state)=>state)

    const [comment,setComment]=useState('')
    const onChangeComment=useCallback((e)=>{
        setComment(e.target.value)
    },[comment])

    // useEffect(()=>{
    //     console.log('poistid',postId)
    //     if(localStorage.getItem('login-access-token')){
    //       dispatch({
    //         type:NAVER_LOGIN_REQUEST
    //       })
    //     }else{
    //       dispatch({
    //               type:LOAD_MY_INFO_REQUEST
    //           })
    //     }
        
    //   },[])
      const onSubmit=()=>{
           dispatch({
            type:ADD_COMMENT_REQUEST,
            data:{
                comment,userId:user.id,postId:bookpostId}
        })
      }
    // const onSubmit=useCallback(()=>{
    //     dispatch({
    //         type:ADD_COMMENT_REQUEST,
    //         data:{
    //             comment,userId:user.id,postId:post.id}
    //     })
    // },[comment,user,post])
  return (
    <Form onFinish={onSubmit} >
        <Input.TextArea value={comment} onChange={onChangeComment}></Input.TextArea>
        <Button type='primary' style={{borderRadius:30,marginTop:10}} htmlType='submit'>댓글작성</Button>
    </Form>
  )
}

export default CommentForm