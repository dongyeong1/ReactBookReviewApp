import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'
import { LOAD_BOOK } from '../reducer'

const Book = () => {
    const {id}=useParams();
    const {books,posts}=useSelector((state)=>state)

    const dispatch=useDispatch()
    
  return (
    <div>
        <div>{books.title}</div>
        <img src={books.image} style={{width:300}}></img>
        {/* <PostForm id={id}></PostForm> */}
        {posts&&posts.map((v)=>(
        <PostCard post={v}></PostCard>

            ))}
    </div>
  )
}

export default Book