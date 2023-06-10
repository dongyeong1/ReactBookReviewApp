import React, { useState, useCallback,useEffect } from 'react';
import { Card, Button, Avatar, Popover, List,Modal, Comment } from 'antd';
import { RetweetOutlined, HeartTwoTone, HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link ,useNavigate} from 'react-router-dom';
import { LIKE_POST_REQUEST, POST_LOAD_REQUEST, UNLIKE_POST_REQUEST } from '../reducer';
import CommentForm from './CommentForm';
import { detailDate } from '../function';
import FollowButton from './FollowButton';



const CardWrapper = styled.div`
  margin-bottom: 20px;
`;


const PostCard = ({ bookpost }) => {

    const navigate = useNavigate();

  const dispatch=useDispatch()
  const {user}=useSelector((state)=>state)
  const id = useSelector((state) => state.user && state.user.id);
  const [like,setLike]=useState(false)
  const [showComment,setShowComment]=useState(false)

//   const [liked, setLiked] = useState(false);


    // const showFollowButton=


const postLoad=(data)=>{
    dispatch({
        type:POST_LOAD_REQUEST,
        data:{
            postId:data
        }
    })
}



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

const onToggleComment=useCallback(()=>{
setShowComment((prev)=>!prev)
},[showComment])

    const liked=bookpost.Likers.find((v)=>v.id===id)

  return (
    <CardWrapper key={bookpost.id}>

      <Card
        //postImage가 하나라도 있을때 작동
       
      >
          {user&&<FollowButton bookpost={bookpost}/>}
        <Card.Meta
          avatar={<Avatar>{bookpost.User.nickname[0]}</Avatar>}
          title={bookpost.User.nickname}
        //   description={post.text}
        description={bookpost.content}
        
        />
        <div>좋아요{bookpost.Likers.length}개</div>
        {
            liked?<HeartTwoTone onClick={()=>onUnLike(bookpost.id)}></HeartTwoTone>:<HeartOutlined onClick={()=>onLike(bookpost.id)}></HeartOutlined>
        }
               {/* <Button onClick={postLoad(bookpost.id)} type='primary'>상세보기</Button> */}

      </Card>
      <Button onClick={onToggleComment}>댓글보기</Button>

{showComment?<div><CommentForm></CommentForm>{bookpost.Comments.map((v)=>(
    <div>
    <div>{v.content}</div>
    <div>{v.User.nickname}</div>
    <div>{detailDate(new Date(v.createdAt))}</div>
    </div>
))}</div>:null}
    
      <hr></hr>
    </CardWrapper>
  );
};



export default PostCard;