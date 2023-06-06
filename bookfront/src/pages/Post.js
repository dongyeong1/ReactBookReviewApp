import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Post = () => {
    const {id}=useParams();

    useEffect(()=>{
        //postid로 포스트정보 조회
    },[])

    const {posts}=useSelector((state)=>state)

  return (
    <div>Post</div>
  )
}

export default Post