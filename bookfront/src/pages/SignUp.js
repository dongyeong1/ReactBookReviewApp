import React ,{useState,useEffect,useCallback}from 'react'
import { Button, Card,Input, Form} from 'antd'
import { useDispatch } from 'react-redux'
import { SIGNUP_REQUEST } from '../reducer';

const SignUp = () => {
    const dispatch=useDispatch();
    const [email,setEmail]=useState('')
    const [nickname,setNickname]=useState('')
    const [password,setPassword]=useState('')

    const onChangeEmail=useCallback((e)=>{
        setEmail(e.target.value)
    },[])
    const onChangeNickname=useCallback((e)=>{
        setNickname(e.target.value)
    },[])
    const onChangePassword=useCallback((e)=>{
        setPassword(e.target.value)
    },[])


    const onSubmit=useCallback(()=>{
        dispatch({
            type:SIGNUP_REQUEST,
            data:{
                email,password,nickname
            }
        })
    },[email,nickname,password])


  return (
      <div >  
          <Form onFinish={onSubmit}>


          
            <Input value={email} type='email' placeholder='이메일입력' onChange={onChangeEmail} />
            <Input value={nickname} onChange={onChangeNickname} />
            <Input value={password} type='password' onChange={onChangePassword} />
            <Button type='primary' htmlType='submit' >회원가입</Button>


            </Form>
      </div>
  )
}

export default SignUp