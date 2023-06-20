import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

import { useDispatch, useSelector } from 'react-redux'
import { SEARCH_BOOK_REMOVE } from '../reducer'
import { MenuOutlined} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom'
import ReviewModal from './ReivewModal'



const NavWrapper=styled.div`
position:relative;
display:flex;
justify-content: space-between;
align-items: center ;
background-color:lightgray;

span{
    color:white;
    text-decoration:none;
}
padding: 8px 12px;

.nav_logo{
    font-size:24px;
    
}

.nav_menu{
    display:flex;
    list-style:none;
    padding-left:0;

}

.menuactive{
    display:flex;
    list-style:none;
    padding-left:0;

}

.nav_menu >li{
    padding:8px 12px;
    margin:0 20px 0 20px;
}

.menuactive>li{
    padding:8px 12px;
    margin:0 20px 0 20px;
}

.nav_link >span{
    padding: 8px 12px;
}

.linkactive>span{
    padding: 8px 12px;

}

.nav_menu>li:hover{
    background-color:red;
    border-radius:10px;
}

.menuactive>li:hover{
    background-color:red;
    border-radius:10px;
}

.nav_ham{
    position:absolute;
    font-size:25px;
    display:none;
    right:30px;
}
@media screen and (max-width: 700px){
    flex-direction: column;
    align-items:flex-start;
    padding: 8px 24px;

    .nav_menu{
        display:none;
    }

    .menuactive{
        flex-direction:column;
        align-items:center;
        width:100%;
        display:flex;

    }

    .menuactive>li{
       text-align:center;
        width:100%;
        list-style:none;

    }

    .nav_link{
        display:none;
    }

    .linkactive{
        display:flex;
        justify-content:center;
        width:100%;
    }


    .nav_ham{
        display:block;
    }

    
    

}

// @media screen and (max-width: 700px) {
//     flex-direction: column;



// }

`


const TopLayout = ({children}) => {

const [showModal,setShowModal]=useState(false)

const {user}=useSelector((state)=>state)
const navigate=useNavigate()
const dispatch=useDispatch();

const logOut=useCallback(()=>{
    if(localStorage.getItem('naverlogin-access-token')){
        localStorage.removeItem("naverlogin-access-token");
        localStorage.removeItem("naverlogin-token-type");
    
    }else if(localStorage.getItem('kakaologin-access-token')){
        localStorage.removeItem("kakaologin-access-token");
        localStorage.removeItem("kakaologin-token-type");
    }
    

    navigate('/home')
},[])


const modalHandle=useCallback(()=>{
    
    dispatch({
        type:SEARCH_BOOK_REMOVE
    })
    setShowModal(true)
   
},[])

const bookRemove=useCallback(()=>{
    dispatch({
        type:SEARCH_BOOK_REMOVE
    })
},[])


const [menuActive,setMenuActive]=useState(false)
const [linkActive,setLinkActive]=useState(false)


const menuHandle=useCallback(()=>{
   

    setMenuActive(prev=>!prev)

    setLinkActive(prev=>!prev)
},[])


  return (
    <div>
        <ReviewModal modal={showModal} setModal={setShowModal}></ReviewModal>
        
        <NavWrapper className='navbar' >


            <div className='nav_logo'>
                <Link to='/home'><span >Home</span></Link>
            </div>
            <ul className={menuActive?'menuactive':'nav_menu'}>
                <li>{user&&<Link  to="/booksearch"><span onClick={bookRemove} style={{fontSize:18}} className='ser'>책검색</span></Link>}</li>
                <li>{user&&<Link> <span style={{ fontSize:18}} onClick={modalHandle}>리뷰쓰기</span></Link>}</li>
                <li> {user&&<Link to="/mypage"><span  style={{ fontSize:18}}>마이페이지</span></Link>}</li>
            </ul>

            <div className={linkActive?'linkactive':'nav_link'}>
                {localStorage.getItem('naverlogin-access-token')||localStorage.getItem('kakaologin-access-token')?
                <Link to='/home'><span   onClick={logOut} style={{fontSize:18}}>로그아웃</span></Link> :
                <Link to='/login'><span  style={{ fontSize:18}}>로그인</span></Link>}
            </div >

                <div className='nav_ham'>
                    <i onClick={menuHandle}><MenuOutlined /></i>
                </div>
       
       
        </NavWrapper>
        
        
        
    </div>
  )
}

export default TopLayout