import { Button, Input } from 'antd'
import styled from 'styled-components'
import { useCallback ,useEffect,useState,useRef} from 'react';
import { Link } from 'react-router-dom';
import NaverLogin from '../components/NaverLogin';
import KakaoLogin from '../components/KakaoLogin';

const NaverLoginWrapper=styled.div`
margin-top:10px;
`
const KakaoLoginWrapper=styled.div`
margin-top:10px;
`

const InputWrapper = styled.div`
margin:auto;
width:340px;
margin-top:180px;
  .ant-input{
      margin-top:40px;
    display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center ;
  border-radius:100px;
  width:340px;
    


 
`;

const Buttons=styled(Button)`
width:100px;
height:40px;
border-radius:100px;
margin-top:50px;
margin-left:30px;
`


const Login = () => {
    const inputRef = useRef();


    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('')


    const onChangeEmail=useCallback((e)=>{
        setEmail(e.target.value)
    },[email])
   
    const onChangePassword=useCallback((e)=>{
        setPassword(e.target.value)
    },[password])

    useEffect(() => {
        inputRef.current.focus();
      }, [])
    
  return (
      
      <div>
          <InputWrapper>
            <Input ref={inputRef} type='email' name="user-email" value={email} onChange={onChangeEmail} size='large' placeholder='이메일을 입력해주세요' />
            <Input type='password' value={password} onChange={onChangePassword} size='large'placeholder='비밀번호를 입력해주세요'/>      
            <Buttons type='primary' className='btn'>로그인</Buttons>
            <NaverLoginWrapper>
            <NaverLogin></NaverLogin>
            </NaverLoginWrapper>
            <KakaoLoginWrapper>
            <KakaoLogin></KakaoLogin>
            </KakaoLoginWrapper>
          </InputWrapper>
        <div style={{width:180 ,margin:'auto',marginTop:30}}>아직 회원이 아니라면?<Link to='/signup'><a>회원가입</a></Link></div>

      </div>

    
  )
}

export default Login