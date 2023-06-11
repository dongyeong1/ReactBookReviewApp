import { Avatar, Card, Rate ,Button, Form, Input} from 'antd';
import Modal from 'react-modal';

import React,{useEffect,useState,useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import PostCard from '../components/PostCard'
import PostEditModal from '../components/PostEditModal';
import { detailDate } from '../function';
import { LOAD_MY_INFO_REQUEST, POST_DELETE_REQUEST, POST_EDIT_REQUEST } from '../reducer';

const MyPage = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const [editModal,setEditModal]=useState(false)
    const [title,setTitle]=useState('')
    const [content,setContent]=useState('')
    const [rate,setRate]=useState('')


    const {user}=useSelector((state)=>state)


    useEffect(()=>{
        dispatch({
            type:LOAD_MY_INFO_REQUEST
        })
    },[])

    useEffect(()=>{
if(!user){
    navigate('/booksearch')
}
    },[user])

const showEditModal=()=>{
    setEditModal(true)

}

    // const showEditModal=useCallback((data)=>()=>{
    //     setEditModal(true)
    //     console.log('asdasdasdasdas')
    //     console.log('qqqqq',data)

    // },[])

    const deletePost=useCallback((postId)=>()=>{
        dispatch({
            type:POST_DELETE_REQUEST,
            data:postId
        })
    })

    const pppossstt=[
        {
            id:1,title:'제목1',content:'내용1',rate:3,bookname:'dongbook',
            src:"https://shopping-phinf.pstatic.net/main_4042172/40421729624.20230607071123.jpg",
            updatedAt:"2023-06-08T06:43:01.000Z"
        },
        {
            id:2,title:'제목2',content:'내용3',rate:3,bookname:'dongbook',
            src:"https://shopping-phinf.pstatic.net/main_4042172/40421729624.20230607071123.jpg",
            updatedAt:"2023-06-08T06:43:01.000Z"
        },
        {
            id:3,title:'제목3',content:'내용3',rate:3,bookname:'dongbook',
            src:"https://shopping-phinf.pstatic.net/main_4042172/40421729624.20230607071123.jpg",
            updatedAt:"2023-06-08T06:43:01.000Z"
        }
    ]
  
    const handleCancel=useCallback(()=>{
        setEditModal(false)
      },[])



      const EditPostSubmit=useCallback((postId)=>{
        dispatch({
            type:POST_EDIT_REQUEST,
            data:{
                postId,
                title,
                content,
                rate
                }
                    })
    },[title,content,rate])


    const onChangeTitle=useCallback((e)=>{
        setTitle(e.target.value)
    },[title])

    const onChangeContent=useCallback((e)=>{
        setContent(e.target.value)
    },[content])

    const onChangeRate=useCallback((e)=>{
        setRate(e)
    },[rate])



  return (
    <div>{user&&user.Posts.map((post)=>(
        <div>
        <Card>
            <div>
                <img src={post.src}></img>
                <div>{post.bookname}</div>
            </div>
              <Card.Meta
            title={post.title}
            description={post.content}        
        />
        <Rate disabled defaultValue={post.rate}></Rate>
        <div>{detailDate(new Date(post.createdAt))}</div>
        <Button type='primary' onClick={()=>showEditModal(post.title)}> 수정하기</Button>
        <Button type='danger' onClick={deletePost(post.id)}> 삭제하기</Button>
        </Card>
        <PostEditModal key={post.id} post={post} postTitle={post.title} editModal={editModal} setEditModal={setEditModal} ></PostEditModal>
            {/* <Modal isOpen={editModal} onRequestClose={handleCancel}>
                <Form onFinish={()=>EditPostSubmit(post.id)}>
                    제목<Input placeholder={post.title} value={title} onChange={onChangeTitle}></Input>
                    내용<Input placeholder={post.content} value={content}  onChange={onChangeContent}></Input>
                    비율<Rate placeholder={post.rate} value={rate}  onChange={onChangeRate}></Rate>
                    <Button type='primary' htmlType='submit'>수정하기</Button>
                </Form>
            </Modal> */}
        
        
        </div>
    ))}</div>
  )
}

export default MyPage