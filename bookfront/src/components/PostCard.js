import React, { useState, useCallback } from 'react';
import { Card, Button, Avatar, Popover, List, Comment } from 'antd';
import { RetweetOutlined, HeartTwoTone, HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';



const CardWrapper = styled.div`
  margin-bottom: 20px;
`;


const PostCard = ({ post }) => {


  const dispatch=useDispatch()
    
//   const [liked, setLiked] = useState(false);


    // const showFollowButton=

 

  return (
    <CardWrapper key={post.id}>
      <Card
        //postImage가 하나라도 있을때 작동
       
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
        //   description={post.text}
        description={post.content}
        />
      </Card>
    
      <hr></hr>
    </CardWrapper>
  );
};



export default PostCard;