import React,{useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducer'
import { MinusCircleOutlined,PlusCircleOutlined } from '@ant-design/icons';

const FollowButton = ({bookpost}) => {

    const dispatch=useDispatch()

    const {user,followLoading,unfollowLoading} =useSelector((state)=>state)
    const isFollowing = user.Followings.find((v)=>v.id===bookpost.User.id)

    const showFollowButton=user.Posts.find((v)=>v.id===bookpost.id)


    const follow=useCallback(()=>{
        if(isFollowing){
            dispatch({
                type:UNFOLLOW_REQUEST,
                data:{followUserId:bookpost.User.id,
                    userId:user.id
                }
            })
        }else{
            dispatch({
                type:FOLLOW_REQUEST,
                data:{followUserId:bookpost.User.id,
                    userId:user.id
                }
            })
        }
    },[isFollowing])
    if(showFollowButton){
        return <div>MyPost</div>
    }
  return (
    < >
        {isFollowing?  <div   loading={unfollowLoading}
        onClick={follow}
        >{bookpost.User.nickname}님 unFollow<MinusCircleOutlined  style={{marginLeft:10,fontSize:15}} /></div>:<div
        loading={followLoading}
        onClick={follow}
        >{bookpost.User.nickname}님 Follow<PlusCircleOutlined  style={{marginLeft:10,fontSize:15}} /></div>}
    </>
  )
}

export default FollowButton