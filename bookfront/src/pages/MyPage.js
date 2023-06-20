import { Card, Rate ,Modal} from 'antd';

import React,{useEffect,useState,useCallback} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import PostEditModal from '../components/PostEditModal';
import { detailDate } from '../function';
import { LOAD_MY_INFO_REQUEST, NAVER_LOGIN_REQUEST, POST_DELETE_REQUEST } from '../reducer';
import { ExclamationCircleOutlined ,CaretRightOutlined,CaretLeftOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate'
import PostModal from '../components/PostModal';
import FollowModal from '../components/FollowModal';
import FollowerModal from '../components/FollowerModal';

const ProfileWrapper=styled.div`
// .ant-card-meta-detail{
//     height:120px;
// }
`

const CardWrapper=styled.div`
.ant-card-meta-title{
    margin-right:300px;
}   

.ant-card-meta-description{
    margin-right:100px;
}   
.ant-card-body{
    padding:10px;
}
margin-top:35px;
`

const Pagination=styled.div`

margin-top:80px;
margin-bottom:10px;

.paginationBttns{
    margin: 0 auto;

    // margin: 0 auto;
  width:500px;
  height:30px;
  list-style:none;
  display:flex;
  justify-content:center;
}

.paginationBttns a{
  padding:10px;
  margin:8px;
  border-radius:5px;
  border: 1px solid #1890ff;
  color: #1890ff;
  cursor: pointer
}
.paginationBttns a:hover{
  color:white;
  background-color:#1890ff;
}
.paginationActive a{
  color:white;
  background-color:#1890ff;
}

`
const MyPage = () => {
    const { confirm } = Modal;

    const navigate = useNavigate();
    const dispatch=useDispatch()
    const [editModal,setEditModal]=useState(false)
    const [modalPost,setModalPost]=useState({})
    const {user}=useSelector((state)=>state)   


    useEffect(()=>{
    if(localStorage.getItem('naverlogin-access-token')){
      dispatch({
        type:NAVER_LOGIN_REQUEST
      })
    }else if(localStorage.getItem('kakaologin-access-token')){
      dispatch({
        type:NAVER_LOGIN_REQUEST
      })
    } else{
      dispatch({
              type:LOAD_MY_INFO_REQUEST
          })
    }
    
    },[])

    useEffect(()=>{
    if(!(user&&user.id)){
        navigate('/booksearch')
    }
    },[user&&user.id])




    const deletePost=useCallback((postId)=>{
        dispatch({
            type:POST_DELETE_REQUEST,
            data:postId
        })
    })

    const showEditModal=(data)=>{
        const mPost=user.Posts.find((v)=>v.id===data)
        setModalPost(mPost)
        setEditModal(true)
    }



    const showConfirm =useCallback((data)=>()=>{
        confirm({
            title: '삭제하시겠습니까?',
            icon: <ExclamationCircleOutlined />,
            
        
            onOk() {
              
              deletePost(data)
              setEditModal(false)
            },
            onCancel() {
            },
          });
    }) 
  

    const textCut=(txt, len, lastTxt)=>{
        if (len == "" || len == null) { 
            len = 20;
        }
        if (lastTxt == "" || lastTxt == null) { 
            lastTxt = "...";
        }
        if (txt.length > len) {
            txt = txt.substr(0, len) + lastTxt;
        }
        return txt;
    }
    
    const [pageNumber,setPageNumber]=useState(0)

    const PerPage=5
    const pagesVisited=pageNumber*PerPage

    const pageCount=Math.ceil(user&&user.Posts.length/PerPage)

    const changePage=({selected})=>{
        setPageNumber(selected)
      }

      const [modalcontent,setModalContent]=useState({})

      const [modal,setModal]=useState(false)

    
      const showModal=useCallback((post)=>{
          setModal(true)
          setModalContent(post)
          
      },[modal])


      const [followModal,setFollowModal]=useState(false)
      const [follwerModal,setFollowerModal]=useState(false)


      const [followList,setFollowList]=useState([])
      const [followerList,setFollowerList]=useState([])

      const followModalHandle=useCallback((data)=>{
        setFollowModal(true)
        setFollowList(data)
      },[followModal,followList])

      const followerModalHandle=useCallback((data)=>{
        setFollowerModal(true)
        setFollowerList(data)
      },[follwerModal,followerList])

  return (
    <div >
        
        <ProfileWrapper>
            <Card
                style={{  width:500,height:160,marginBottom:50,marginTop:20,borderRadius:20,margin:'20px auto',backgroundColor:'lightgray'}}
                actions={[
                <div  key="twit">독후감갯수<br />{user&&user.Posts.length}</div>,
                <div onClick={()=>followModalHandle(user.Followings)} key="following">팔로잉<br />{user&&user.Followings.length}</div>,
                <div onClick={()=>followerModalHandle(user.Followers)} key="follower">팔로워<br />{user&&user.Followers.length}</div>,
                ]}
            >
            <Card.Meta
                style={{height:60,marginTop:10,}}
                title={user&&<div style={{fontSize:22}}>{user.nickname+'님 환영합니다!'}</div>}
            />
            </Card>
        </ProfileWrapper>
        
        
        
        
        {user&&user.Posts.slice(pagesVisited,pagesVisited+PerPage).map((post)=>(
    <CardWrapper >
        <Card
            actions={[
                <div onClick={()=>showEditModal(post.id)}> 수정하기</div>,
                <div   onClick={showConfirm(post.id)}> 삭제하기</div>

            ]}
            style={{  width:500,height:160,borderRadius:20,margin:'20px auto'}}
            key={post.bookname}
        >
           <Card.Meta     
            avatar={<img  src={post.src} style={{width:70}}></img>}
            title={<div><div style={{fontSize:16}}>{post.title}</div><span style={{fontSize:11}}>{detailDate(new Date(post.createdAt))}</span></div>}
            description={<div onClick={()=>showModal(post)}>{textCut(post.content,15,' ...상세보기')}</div>}
            />
        <Rate style={{position:'relative',bottom:90,left:160}} disabled value={post.rate}></Rate>
        
       <div style={{position:'relative', bottom:90}}>
       
       </div>
        </Card>
    </CardWrapper>
    ))}
        <Pagination>
            {user&&user.Posts&&
            <ReactPaginate
                    previousLabel={<CaretLeftOutlined />}
                    nextLabel={<CaretRightOutlined />}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={'paginationBttns'}
            ></ReactPaginate>}

       </Pagination>
        
    
        <PostEditModal post={modalPost}  editModal={editModal} setEditModal={setEditModal} ></PostEditModal>
        <PostModal modal={modal} setModal={setModal} modalcontent={modalcontent}  ></PostModal>
        <FollowModal followModal={followModal} setFollowModal={setFollowModal} followList={followList} ></FollowModal>       
        <FollowerModal follwerModal={follwerModal} setFollowerModal={setFollowerModal} followerList={followerList} ></FollowerModal>
    </div>
  )
}

export default MyPage