import React,{useCallback,useState} from 'react'
import { Input, Button,Rate,Modal} from 'antd'
import { useDispatch } from 'react-redux'
import { POST_EDIT_REQUEST, REMOVE_POST_REQUEST } from '../reducer';
import { ExclamationCircleOutlined } from '@ant-design/icons';



import Modals from 'react-modal';
import PostForm from './PostForm';
const customStyles = {
    content: {
    //   top: '100%',
    //   left: '50%',
    //   right: 'auto',
    //   bottom: 'auto',
    //   marginRight: '-50%',
    //   transform: 'translate(-50%, -50%)',
    width:900,
    height:600,
    margin:'auto'
    },
  };



const ReviewModal = ({modal,setModal}) => {

    
    const { confirm } = Modal;

    const dispatch=useDispatch();
    // const [title,setTitle]=useState(post.title)
    // const [content,setContent]=useState(post.content)
    // const [rate,setRate]=useState(post.rate)

    
    

    // const onChangeTitle=useCallback((e)=>{
    //     setTitle(e.target.value)
    // },[title])

    // const onChangeContent=useCallback((e)=>{
    //     setContent(e.target.value)
    // },[content])

    // const onChangeRate=useCallback((e)=>{
    //     setRate(e)
    // },[rate])

    

    const handleCancel=useCallback(()=>{
        dispatch({
            type:REMOVE_POST_REQUEST
        })
        setModal(false)
      },[])


    // const EditPostSubmit=useCallback(()=>{
    //     dispatch({
    //         type:POST_EDIT_REQUEST,
    //         data:{
    //             postId:post.id,
    //             title,
    //             content,
    //             rate
    //             }
    //                 })
    // },[title,content,rate,post])


    const showConfirm =useCallback(()=>{
        confirm({
            title: '수정하시겠습니까?',
            icon: <ExclamationCircleOutlined />,
            
        
            onOk() {
              console.log('OK');
            //   EditPostSubmit()
              setModal(false)
              
            },
        
            onCancel() {
              console.log('Cancel');
            },
          });
    }) 
  return (
      <div>
    <Modals  style={customStyles} isOpen={modal} onRequestClose={handleCancel}>
        {/* <img style={{width:200}} src={post.src}></img>
        <div>{post.bookname} </div>
    
            <div style={{marginTop:50}}>제목</div>
            <Input  placeholder={post.title} value={title} onChange={onChangeTitle}></Input>
            내용<Input placeholder={post.content} value={content}  onChange={onChangeContent}></Input>
            <div>비율</div>
            <Rate placeholder={post.rate} value={rate} defaultValue={post.rate}  onChange={onChangeRate}></Rate>
            <div><Button style={{marginTop:20}} type='primary' htmlType='submit' onClick={showConfirm}>수정하기</Button></div> */}
    <PostForm ></PostForm>
    </Modals>
    </div>
  )
}

export default ReviewModal