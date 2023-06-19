import React,{useCallback,useState} from 'react'
import { Input, Button,Rate,Modal} from 'antd'
import { useDispatch } from 'react-redux'
import { POST_EDIT_REQUEST } from '../reducer';
import { ExclamationCircleOutlined } from '@ant-design/icons';



import Modals from 'react-modal';




const FollowModal = ({followModal,setFollowModal,followList}) => {
    const handleCancel=useCallback(()=>{
        setFollowModal(false)
    },[followModal])
  return (
      <div>
 

 <Modal title="팔로우목록" open={followModal} onOk={handleCancel} onCancel={handleCancel} >
    {followList&&followList.map((f,i)=>(
        <div><p>{i+1}.</p><p>{f.nickname}</p></div>
    ))



  }
  </Modal>

    </div>
  )
}

export default FollowModal