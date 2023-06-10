import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux'
import PostForm from '../components/PostForm'
import { LOAD_MY_INFO_REQUEST } from '../reducer'

const Home = () => {
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch({
            type:LOAD_MY_INFO_REQUEST
        })
    },[])

  return (
    <div>
        
        <PostForm></PostForm>
    </div>
  )
}

export default Home