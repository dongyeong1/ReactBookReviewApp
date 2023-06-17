import { Avatar, Card, Rate ,Button, Form, Input,Modal} from 'antd';

import React,{useEffect,useState,useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import PostCard from '../components/PostCard'
import PostEditModal from '../components/PostEditModal';
import { detailDate } from '../function';
import { LOAD_MY_INFO_REQUEST, NAVER_LOGIN_REQUEST, POST_DELETE_REQUEST, POST_EDIT_REQUEST } from '../reducer';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const CardWrapper=styled.div`
.ant-card-meta-title{
    margin-right:200px
}   
`

const MyPage = () => {
    const { confirm } = Modal;

    const navigate = useNavigate();
    const dispatch=useDispatch()
    const [editModal,setEditModal]=useState(false)



    const [modalPost,setModalPost]=useState({})

    const {user}=useSelector((state)=>state)

    const id =useSelector((state)=>state.user?.id)
    useEffect(()=>{
        if(localStorage.getItem('login-access-token')){
          dispatch({
            type:NAVER_LOGIN_REQUEST
          })
        }else{
          dispatch({
                  type:LOAD_MY_INFO_REQUEST
              })
        }
        
      },[])

    useEffect(()=>{
if(!(user&&user.id)){
    navigate('/booksearch')
}
    },[user&&user.id])




    const deletePost=useCallback((postId)=>{
        dispatch({
            type:POST_DELETE_REQUEST,
            data:postId
        })
    })

    const showEditModal=(data)=>{
        const mPost=user.Posts.find((v)=>v.id===data)
        console.log(mPost)
        setModalPost(mPost)
        setEditModal(true)
    
    }



    const showConfirm =useCallback((data)=>()=>{
        confirm({
            title: '삭제하시겠습니까?',
            icon: <ExclamationCircleOutlined />,
            
        
            onOk() {
              console.log('OK');
              // data[0].title=title
              // data[0].text=text
              deletePost(data)
              setEditModal(false)
              
            },
        
            onCancel() {
              console.log('Cancel');
            },
          });
    }) 
  

  return (
    < >
        
        <div>
        <Card
        style={{  width:500,height:160,marginBottom:20,marginTop:20,borderRadius:20,margin:'20px auto'}}
      actions={[
        <div key="twit">독후감갯수<br />{user.Posts.length}</div>,
        <div key="following">팔로잉<br />{user.Followings.length}</div>,
        <div key="follower">팔로워<br />{user.Followers.length}</div>,
      ]}
    >
      <Card.Meta
        
        title={user.nickname+'님 환영합니다!'}
      />
      </Card>
        </div>
        
        
        
        
        {user&&user.Posts.map((post)=>(
        <CardWrapper >
        <Card
            style={{  width:500,height:160,marginBottom:20,marginTop:20,borderRadius:20,margin:'20px auto'}}
        key={post.bookname}>
           <Card.Meta
        style={{marginBottom:30}}
          avatar={<img src={post.src} style={{width:70}}></img>}
          title={post.title}
        //   description={post.text}
        description={post.content}
        
        />
        <Rate style={{position:'relative',bottom:110,left:160}} disabled value={post.rate}></Rate>
        
       <div style={{position:'relative', bottom:90}}>
       <div>{detailDate(new Date(post.createdAt))}</div>
        <Button type='primary' onClick={()=>showEditModal(post.id)}> 수정하기</Button>
        <Button style={{marginLeft:30}} type='danger' onClick={showConfirm(post.id)}> 삭제하기</Button>
       </div>
        </Card>
        
         
        
        
        </CardWrapper>
    ))}
    
    <PostEditModal post={modalPost}  editModal={editModal} setEditModal={setEditModal} ></PostEditModal>
    </>
  )
}

export default MyPage