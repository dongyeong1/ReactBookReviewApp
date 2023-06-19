import React,{useCallback,useState} from 'react'
import { Input, Button,Rate,Modal} from 'antd'
import { useDispatch } from 'react-redux'
import { POST_EDIT_REQUEST } from '../reducer';
import { ExclamationCircleOutlined } from '@ant-design/icons';



import Modals from 'react-modal';




const FollowerModal = ({follwerModal,setFollowerModal,followerList}) => {
    const handleCancel=useCallback(()=>{
        setFollowerModal(false)
    },[follwerModal])
  return (
      <div>
 

 <Modal title="팔로워목록" open={follwerModal} onOk={handleCancel} onCancel={handleCancel} >
    {followerList&&followerList.map((f,i)=>(
        <div><p>{i+1}.</p><p>{f.nickname}</p></div>
    ))



  }
  </Modal>

    </div>
  )
}

export default FollowerModal