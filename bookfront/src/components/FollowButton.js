import React,{useCallback} from 'react'
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducer'
const FollowButton = ({bookpost}) => {

    const dispatch=useDispatch()

    const {user,followLoading,unfollowLoading} =useSelector((state)=>state)
    const isFollowing = user.Followings.find((v)=>v.id===bookpost.User.id)

    const showFollowButton=user.Posts.find((v)=>v.id===bookpost.id)


    const follow=useCallback(()=>{
        if(isFollowing){
            dispatch({
                type:UNFOLLOW_REQUEST,
                data:bookpost.User.id
            })
        }else{
            dispatch({
                type:FOLLOW_REQUEST,
                data:bookpost.User.id
            })
        }
    },[isFollowing])
    if(showFollowButton){
        return null
    }
  return (
    < >
        {isFollowing?  <Button type='primary' style={{marginLeft:40,borderRadius:50}}  loading={unfollowLoading}
      onClick={follow}
  >{bookpost.User.nickname}님 unFollow</Button>:<Button
  type='primary'
  style={{marginLeft:40,borderRadius:50,position:'relative',bottom:90,left:60}}
  loading={followLoading}
  onClick={follow}
>{bookpost.User.nickname}님 Follow</Button>}
</>
  
  
  )
}

export default FollowButton