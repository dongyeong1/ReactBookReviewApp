import React, { useCallback,useState } from 'react'
import { Input, Button,Form} from 'antd'
import { useDispatch } from 'react-redux'
import { ADD_POST } from '../reducer'


const PostForm = ({id}) => {

    const dispatch=useDispatch()
    const [text,setText]=useState('')
    const onChangeText=useCallback((e)=>{
        setText(e.target.value)
    },[text])

    const submitText=useCallback(()=>{
        dispatch({
            type:ADD_POST,
            data:{
                isbn:id,
                text
            }
        })
    },[text])

  return (
    <div>
        <Form onFinish={submitText}>
        <Input.TextArea value={text} onChange={onChangeText}></Input.TextArea>

        <Button type="primary" htmlType='submit'>입력</Button>

        </Form>
    </div>
  )
}

export default PostForm