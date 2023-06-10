import { Button,Modal } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'
import { BOOK_POSTS_REQUEST, BOOK_POSTS_SUCCESS, LOAD_BOOK, LOAD_MY_INFO_REQUEST, POST_LOAD_REQUEST } from '../reducer'

const Book = () => {
  const navigate=useNavigate()
    const {id}=useParams();
    const {books,posts,post}=useSelector((state)=>state)

    const dispatch=useDispatch()

    useEffect(()=>{
      dispatch({
          type:LOAD_MY_INFO_REQUEST
      })
  },[])

  useEffect(()=>{
      dispatch({
        type:BOOK_POSTS_REQUEST,
        data:id
      })
  },[])

    // useEffect(()=>{
    //   if(post){
    //     successModals()
    //   }
    // },[post])


    // const successModals = () => {
    //   Modal.success({
    //     content: '책보기',
    //     onOk() {navigate(`/post/${post.id}`)},
    //   });
    // };

    

// const postLoad=(data)=>{
//   dispatch({
//       type:POST_LOAD_REQUEST,
//       data:{
//           postId:data
//       }
//   })
// }
// const liked=posts.L
  return (
    <div>
        <div>{posts&&posts[0].bookname}</div>
        {posts&&<img src={posts[0].src} style={{width:300}}></img>}
        {/* <PostForm id={id}></PostForm> */}
        {posts&&posts.map((v)=>(
          <div>
        <PostCard bookpost={v}></PostCard>
        {/* <Link to={`/post/${v.id}`}>
        <Button type='primary' >상세보기</Button>
        </Link> */}
        </div>
            ))}
    </div>
  )
}

export default Book