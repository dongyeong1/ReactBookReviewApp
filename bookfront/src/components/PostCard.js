import React, { useState, useCallback,useEffect } from 'react';
import { Card, Button, Avatar, Popover, List,Modal, Comment } from 'antd';
import { RetweetOutlined, HeartTwoTone, HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link ,useNavigate} from 'react-router-dom';
import { LIKE_POST_REQUEST, LOAD_MY_INFO_REQUEST, NAVER_LOGIN_REQUEST, POST_LOAD_REQUEST, UNLIKE_POST_REQUEST } from '../reducer';
import CommentForm from './CommentForm';
import { detailDate } from '../function';
import FollowButton from './FollowButton';



const CardWrapper = styled.div`

    margin-bottom:20px;
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


const onToggleComment=useCallback(()=>{
setShowComment((prev)=>!prev)
},[showComment])

    const liked=bookpost.Likers.find((v)=>v.id===id)

  return (
    <CardWrapper key={bookpost.id}>

      <Card
       style={{  width:500,height:160,marginBottom:20,marginTop:20,borderRadius:20}}
      
      >
          
        <Card.Meta
        style={{marginBottom:30}}
        //   avatar={<img src={book.image} style={{width:50}}></img>}
          title={bookpost.title}
        //   description={post.text}
        description={bookpost.content}
        
        />
        {/* <div style={{display:'flex'}}>
        <div>좋아요{bookpost.Likers.length}개</div>
        <div style={{marginLeft:30}}>댓글{bookpost.Comments.length}개</div>

        </div> */}

        <div style={{display:'flex' ,width:300,marginTop:15}}>

        {liked?<Button type='primary' onClick={()=>onUnLike(bookpost.id)} style={{borderRadius:50,marginLeft:20}} >좋아요{bookpost.Likers.length}개<HeartTwoTone size='large' ></HeartTwoTone></Button>:
        <Button type='primary' onClick={()=>onLike(bookpost.id)} style={{borderRadius:50,marginLeft:20}} >좋아요{bookpost.Likers.length}개<HeartOutlined  size='large' ></HeartOutlined></Button>
        }
       
    <div style={{width:100}}>
    <Button style={{borderRadius:50,marginRight:250,marginLeft:20}} type='primary' onClick={onToggleComment}>댓글{bookpost.Comments.length}개<MessageOutlined /></Button></div>
    {user&&<FollowButton bookpost={bookpost}/>}

    
        </div>


        
       


      </Card>

{showComment?<div><CommentForm bookpostId={bookpost.id}></CommentForm>
    <div>
<List
            //  header={`${v.Comments.length} 댓글`}
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

    {/* <div>{v.content}</div>
    <div>{v.User.nickname}</div>
    <div>{detailDate(new Date(v.createdAt))}</div> */}
    </div>
</div>:null}
    
    </CardWrapper>
  );
};



export default PostCard;