import React, { useState, useCallback,useEffect } from 'react';
import { Card,  Avatar, List,Modal, Comment, Rate } from 'antd';
import {  HeartTwoTone, HeartOutlined, MessageOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { LIKE_POST_REQUEST, LOAD_MY_INFO_REQUEST, NAVER_LOGIN_REQUEST, UNLIKE_POST_REQUEST } from '../reducer';
import CommentForm from './CommentForm';
import { detailDate } from '../function';
import FollowButton from './FollowButton';



const CardWrapper = styled.div`
.ant-card-meta-title{
    margin-top:5px;
    margin-right:350px;
}   
.ant-card-meta-description{
    margin-right:100px;
    // margin-top:30px;
}   
    margin-bottom:100px;
  width:500px;
  margin:auto;
  
`;


const PostCard = ({ bookpost }) => {


  const dispatch=useDispatch()
  const {user,book}=useSelector((state)=>state)
  const id = useSelector((state) => state.user && state.user.id);
  const [like,setLike]=useState(false)
  const [showComment,setShowComment]=useState(false)

  useEffect(()=>{
    if(localStorage.getItem('naverlogin-access-token')){
      dispatch({
        type:NAVER_LOGIN_REQUEST
      })
    }else if(localStorage.getItem('kakaologin-access-token')){
      dispatch({
        type:NAVER_LOGIN_REQUEST
      })
    } else{
      dispatch({
              type:LOAD_MY_INFO_REQUEST
          })
    }
    
  },[])



const onLike=useCallback((postId)=>{

    dispatch({
        type:LIKE_POST_REQUEST,
        data:{postId,userId:user.id}
    })
    setLike((prev)=>!prev)

},[like,user])


const onUnLike=(postId)=>{
    dispatch({
        type:UNLIKE_POST_REQUEST,
        data:{postId,userId:user.id}
    })
    setLike((prev)=>!prev)
}


const textCut=(txt, len, lastTxt)=>{
    if (len == "" || len == null) { 
        len = 20;
    }
    if (lastTxt == "" || lastTxt == null) { 
        lastTxt = "...";
    }
    if (txt.length > len) {
        txt = txt.substr(0, len) + lastTxt;
    }
    return txt;
}


const onToggleComment=useCallback(()=>{
setShowComment((prev)=>!prev)
},[showComment])

    const liked=bookpost.Likers.find((v)=>v.id===id)

    const [modal,setModal]=useState(false)

    const handleCancel=useCallback(()=>{
        setModal(false)
    },[modal])

    const showModal=useCallback(()=>{
        setModal(true)
    },[modal])
  return (

    
    <CardWrapper key={bookpost.id}>
     

      <Card
      
       style={{  width:500,height:160,marginBottom:70,marginTop:20,borderRadius:20}}
       actions={[
            <div>{liked?<div type='primary' onClick={()=>onUnLike(bookpost.id)} style={{borderRadius:50}} >좋아요{bookpost.Likers.length}개<HeartTwoTone size='large' style={{marginLeft:10,fontSize:15}} ></HeartTwoTone></div>:
            <div type='primary' onClick={()=>onLike(bookpost.id)} style={{borderRadius:50}} >좋아요{bookpost.Likers.length}개<HeartOutlined  size='large' style={{marginLeft:10,fontSize:15}} ></HeartOutlined></div>
            }</div>,
            
            <div><div type='primary'  style={{borderRadius:50,marginLeft:20}} type='primary' onClick={onToggleComment}>댓글{bookpost.Comments.length}개<MessageOutlined style={{marginLeft:10,fontSize:15}} /></div></div>,
        
            <div
            style={{position:'relative'}}
            >{user&&<FollowButton bookpost={bookpost}/>}</div>       
        ]}
      >
          
        <Card.Meta
               avatar={<Avatar size='large'>{bookpost.User.nickname}</Avatar>}

        style={{}}
       
          title={<div><div style={{fontSize:16}}>{bookpost.title}</div><span style={{fontSize:11}}>{detailDate(new Date(bookpost.createdAt))}</span></div>}
       
        description={<div onClick={showModal}>{textCut(bookpost.content,15,' ...상세보기')}</div>}
        
        />
         
        <Rate  style={{position:'relative' ,bottom:90,left:150}} defaultValue={bookpost.rate} disabled ></Rate>

      </Card>

    {showComment?
        <div><CommentForm bookpostId={bookpost.id}></CommentForm>
            <div>
            <List
                dataSource={bookpost.Comments}
                renderItem={(item)=>(
                    <li>
                        <Comment 
                            author={item.User.nickname}
                            content={item.content}
                            avatar={<Avatar>{item.User.nickname[0]}</Avatar>}/>
                    </li>
                )}
            ></List>
            </div>
        </div>:null}
        <Modal title={bookpost.title} open={modal} onOk={handleCancel} onCancel={handleCancel} >

        <p>{bookpost.content}</p>

        </Modal>
    
    </CardWrapper>
  );
};



export default PostCard;