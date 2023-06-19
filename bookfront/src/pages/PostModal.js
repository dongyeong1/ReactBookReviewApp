import React,{useCallback,useState} from 'react'
import { Input, Button,Rate,Modal} from 'antd'
import { useDispatch } from 'react-redux'
import { POST_EDIT_REQUEST } from '../reducer';
import { ExclamationCircleOutlined } from '@ant-design/icons';



import Modals from 'react-modal';




const PostModal = ({modalcontent,modal,setModal}) => {
    const handleCancel=useCallback(()=>{
        setModal(false)
    },[modal])
  return (
      <div>
 


    {modalcontent&&<Modal title={modalcontent.title} open={modal} onOk={handleCancel} onCancel={handleCancel} >

<p>{modalcontent.content}</p>

    </Modal>}


    </div>
  )
}

export default PostModal