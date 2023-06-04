import React, { useEffect ,useState,useCallback} from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { LOAD_BOOK } from '../reducer'
const Index = () => {
  
  const dispatch=useDispatch()
  const {books}=useSelector((state)=>state)



const loadBook=useCallback((data)=>()=>{//map안에는 고차함수써주기
  dispatch({
    type:LOAD_BOOK,
    data
  })
  console.log('asß')
},[])

// const loadBook=()=>{
//   console.log('asd')
// }
  

  return (
    <div>
      {books&&books.map((v)=>(
        <div>
        <div>{v.title}</div>
        <Link to={`/Post/${v.isbn}`} >
        <img onClick={loadBook(v.isbn)} src={v.image} style={{width:100}}></img></Link>
        </div>
        ))}
       </div>

  )
}

export default Index