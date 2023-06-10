import React,{useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

const MyPage = () => {
    const navigate = useNavigate();

    const {user}=useSelector((state)=>state)
    useEffect(()=>{
if(!user){
    navigate('/booksearch')
}
    },[user])
  return (
    <div>MyPage</div>
  )
}

export default MyPage