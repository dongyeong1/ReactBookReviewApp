import React, { useCallback } from 'react'
import { Avatar, Card, Button } from 'antd';
import {useDispatch, useSelector} from 'react-redux'
import { LOG_OUT_REQUEST } from '../reducer';



const UserProfile = () => {

    const{user,logOutLoading}=useSelector((state)=>state)

    const dispatch=useDispatch()

    const logout=useCallback(()=>{
        dispatch({
            type:LOG_OUT_REQUEST
        })
    })

  return (
    <div>
         <Card
      actions={[
        <div key="twit">리뷰갯수<br />{user.Posts.length}</div>,
        <div key="following">팔로잉<br />{user.Followings.length}</div>,
        <div key="follower">팔로워<br />{user.Followers.length}</div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{user.nickname[0]}</Avatar>}
        title={user.nickname}
      />
      </Card>
        <Button type='primary' onClick={logout} loading={logOutLoading}  >logout</Button>
    </div>
  )
}

export default UserProfile




