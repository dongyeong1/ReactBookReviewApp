import React,{useCallback,useState} from 'react'
import { Input, Button,Rate,Modal} from 'antd'
import { useDispatch } from 'react-redux'
import { POST_EDIT_REQUEST } from '../reducer';
import { ExclamationCircleOutlined } from '@ant-design/icons';



import Modals from 'react-modal';




const PostEditModal = ({editModal,setEditModal,post}) => {
    const { confirm } = Modal;

    const dispatch=useDispatch();
    const [title,setTitle]=useState(post.title)
    const [content,setContent]=useState(post.content)
    const [rate,setRate]=useState(post.rate)

    
    

    const onChangeTitle=useCallback((e)=>{
        setTitle(e.target.value)
    },[title])

    const onChangeContent=useCallback((e)=>{
        setContent(e.target.value)
    },[content])

    const onChangeRate=useCallback((e)=>{
        setRate(e)
    },[rate])

    

    const handleCancel=useCallback(()=>{
        setEditModal(false)
      },[])


    const EditPostSubmit=useCallback(()=>{
        dispatch({
            type:POST_EDIT_REQUEST,
            data:{
                postId:post.id,
                title,
                content,
                rate
                }
                    })
    },[title,content,rate,post])


    const showConfirm =useCallback(()=>{
        confirm({
            title: '수정하시겠습니까?',
            icon: <ExclamationCircleOutlined />,
            
        
            onOk() {
              console.log('OK');
              EditPostSubmit()
              setEditModal(false)
              
            },
        
            onCancel() {
              console.log('Cancel');
            },
          });
    }) 
  return (
      <div>
    <Modals  isOpen={editModal} onRequestClose={handleCancel}>
        <img style={{width:200}} src={post.src}></img>
        <div>{post.bookname} </div>
    
            <div style={{marginTop:50}}>제목</div>
            <Input  placeholder={post.title} value={title} onChange={onChangeTitle}></Input>
            내용<Input placeholder={post.content} value={content}  onChange={onChangeContent}></Input>
            <div>비율</div>
            <Rate placeholder={post.rate} value={rate} defaultValue={post.rate}  onChange={onChangeRate}></Rate>
            <div><Button style={{marginTop:20}} type='primary' htmlType='submit' onClick={showConfirm}>수정하기</Button></div>
    </Modals>
    </div>
  )
}

export default PostEditModal