import React, { useCallback } from 'react'
import { Avatar, Card, Button } from 'antd';
import {useDispatch, useSelector} from 'react-redux'
import { LOG_OUT_REQUEST } from '../reducer';
// import { logoutRequestAction } from '../reducers/user';

const dummy = {
    nickname: '제로초',
    Posts: [],
    Followings: [],
    Followers: [],
    isLoggedIn: false,
  };

const UserProfile = ({setIsLoggedIn}) => {

    const{user,logOutLoading}=useSelector((state)=>state)

    const dispatch=useDispatch()

    const logout=useCallback(()=>{
        dispatch({
            type:LOG_OUT_REQUEST
        })
    })

    // const Click=useCallback(()=>{
    //     dispatch(logoutRequestAction())
    //     // setIsLoggedIn(false)
    // },[])
  return (
    <div>
         <Card
      actions={[
        <div key="twit">짹짹<br />{user.Posts.length}</div>,
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




