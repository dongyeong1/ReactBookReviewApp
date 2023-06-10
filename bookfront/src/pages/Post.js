import React, { useState, useCallback,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Rate } from 'antd';
import CommentForm from '../components/CommentForm';
import {  HeartTwoTone, HeartOutlined } from '@ant-design/icons';

import { detailDate } from '../function';
import { LIKE_POST_REQUEST, LOAD_MY_INFO_REQUEST, POST_LOAD_REQUEST, UNLIKE_POST_REQUEST } from '../reducer';

const Post = () => {
    const {id}=useParams();
    const dispatch=useDispatch()
    const [like,setLike]=useState(false)
    const {post,user}=useSelector((state)=>state)




    const onLike=useCallback((postId)=>{

        dispatch({
            type:LIKE_POST_REQUEST,
            data:postId
        })
        setLike((prev)=>!prev)

    },[like])



    const onUnLike=useCallback((postId)=>{

        dispatch({
            type:UNLIKE_POST_REQUEST,
            data:postId
        })
        setLike((prev)=>!prev)

    },[like])


//     useEffect(()=>{
// console.log('asdsa')
//     },[])
    useEffect(()=>{
      console.log('asdsda')
        dispatch({
            type:POST_LOAD_REQUEST,
            data:{
                postId:id
            }
        })

    },[])

    useEffect(()=>{
        dispatch({
            type:LOAD_MY_INFO_REQUEST
        })
    },[])

 
        const liked=post.Likers.find((v)=>v.Like.UserId===user.id)

   

  return (
      <div>
    {post&&<div>
        <div>{post.title}</div>
        <img width={200} src={post.src}></img>
        <div>{post.content}</div>
        <Rate disabled defaultValue={post.rate}></Rate>
        {
            liked?<HeartTwoTone onClick={()=>onUnLike(post.id)}></HeartTwoTone>:<HeartOutlined onClick={()=>onLike(post.id)}></HeartOutlined>
        }
        <div>좋아요{post.Likers.length}개</div>
        <CommentForm></CommentForm>
        {post.Comments.map((v)=>(
            <div>
            <div>{v.content}</div>
            <div>{v.User.nickname}</div>
            <div>{detailDate(new Date(v.createdAt))}</div>
            </div>
        ))}



    </div>}
    </div>
  
  )
}

export default Post