import {all,fork,call,put, takeLatest, delay} from 'redux-saga/effects'
import { ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_POST_REQUEST, ADD_POST_SUCCESS, BOOK_LOAD_REQUEST, BOOK_LOAD_SUCCESS, BOOK_POSTS_REQUEST, BOOK_POSTS_SUCCESS, FOLLOW_FAILURE, FOLLOW_REQUEST, FOLLOW_SUCCESS, LIKE_POST_FAIL, LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LOAD_MY_INFO_FAILURE, LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, NAVER_LOGIN_FAIL, NAVER_LOGIN_REQUEST, NAVER_LOGIN_SUCCESS, POST_DELETE_FAIL, POST_DELETE_REQUEST, POST_DELETE_SUCCESS, POST_EDIT_FAIL, POST_EDIT_REQUEST, POST_EDIT_SUCCESS, POST_LOAD_REQUEST, POST_LOAD_SUCCESS, SEARCH_BOOK_FAIL, SEARCH_BOOK_REQUEST, SEARCH_BOOK_SUCCESS, SIGNUP_REQUEST, SIGNUP_SUCCESS, UNFOLLOW_FAILURE, UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNLIKE_POST_FAIL, UNLIKE_POST_REQUEST, UNLIKE_POST_SUCCESS } from '../reducer'
import { useNavigate } from 'react-router-dom'

import axios from 'axios';
import NaverLogin from '../components/NaverLogin';



axios.defaults.withCredentials=true

function searchBookAPI(data){

    const url=`/v1/search/book.json?query=${data}&sort=date&display=50`
    const clientId = process.env.REACT_APP_BOOK_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_BOOK_CLIENT_SECRET;
    
    return axios.get(url
        ,{
         headers:{
           Accept: "application/json",
           "X-Naver-Client-Id": clientId,
           "X-Naver-Client-Secret": clientSecret,
         }
       })
}



function* searchBook(action){

    try{
      
        const result =yield call(searchBookAPI,action.data) //call은동기니깐 put할때까지 기다려준다
        yield put({
            type:SEARCH_BOOK_SUCCESS,
            data:result.data.items
        })
    
        
    }catch(err){

        console.log(err)
    }
    
}



function bookLoadAPI(data){

    const url=`/v1/search/book_adv.json?d_isbn=${data}&start=1`
    const clientId = process.env.REACT_APP_BOOK_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_BOOK_CLIENT_SECRET;
    
    return axios.get(url
        ,{
         headers:{
           Accept: "application/json",
           "X-Naver-Client-Id": clientId,
           "X-Naver-Client-Secret": clientSecret,
         }
       })
}



function* bookLoad(action){

    try{
      
        const result =yield call(bookLoadAPI,action.data) //call은동기니깐 put할때까지 기다려준다
        yield put({
            type:BOOK_LOAD_SUCCESS,
            data:result.data.items
        })
    
        
    }catch(err){

        console.log(err)
    }
    
}






function signUpAPI(data){

    return axios.post('http://localhost:3065/user/signup',{
        email:data.email,
        password:data.password,
        nickname:data.nickname
    })
   
}



function* signUp(action){

    try{
       
        const result =yield call(signUpAPI,action.data) //call은동기니깐 put할때까지 기다려준다
        yield put({
            type:SIGNUP_SUCCESS,
           
        })
    
        
    }catch(err){
      
        console.log(err)
    }
    
}



function loginAPI(data){
 
    return axios.post('http://localhost:3065/user/login',{
        email:data.email,
        password:data.password,
    })
   
}



function* login(action){

    try{
        
        const result =yield call(loginAPI,action.data) //call은동기니깐 put할때까지 기다려준다
        yield put({
            type:LOGIN_SUCCESS,
            data:result.data
           
        })
    
        
    }catch(err){
        yield put({
            type:LOGIN_FAIL,
            data:err.response.data
        })
        console.log('loginErr',err)
    }
    
}



function addPostAPI(data){
 
    return axios.post('http://localhost:3065/post/addpost',{
        title:data.title,
        text:data.text,
        rate:data.rate,
        isbn:data.isbn,
        image:data.image,
        bookname:data.bookname,
        userId:data.userId
    })
   
}



function* addPost(action){

    try{
       
        const result =yield call(addPostAPI,action.data) //call은동기니깐 put할때까지 기다려준다
        yield put({
            type:ADD_POST_SUCCESS,
            data:result.data
           
        })
    
        
    }catch(err){
      
        console.log(err)
    }
    
}



function addCommentAPI(data){
 
    return axios.post('http://localhost:3065/post/addcomment',{
        comment:data.comment,
        postId:data.postId,
        userId:data.userId
       
    })
   
}



function* addComment(action){

    try{
     
        const result =yield call(addCommentAPI,action.data) //call은동기니깐 put할때까지 기다려준다
        yield put({
            type:ADD_COMMENT_SUCCESS,
            data:result.data
           
        })
    
        
    }catch(err){
      
        console.log(err)
    }
    
}

function bookPostsAPI(data){
 
    return axios.post('http://localhost:3065/post/bookPosts',{
        isbn:data
       
    })
   
}



function* bookPosts(action){

    try{
        
        const result =yield call(bookPostsAPI,action.data) //call은동기니깐 put할때까지 기다려준다
        yield put({
            type:BOOK_POSTS_SUCCESS,
            data:result.data
           
        })
    
        
    }catch(err){
      
        console.log(err)
    }
    
}


function loadPostAPI(data){
 
    return axios.post('http://localhost:3065/post/loadPost',{
        postId:data.postId
       
    })
   
}



function* loadPost(action){

    try{
  
        const result =yield call(loadPostAPI,action.data) //call은동기니깐 put할때까지 기다려준다
        yield put({
            type:POST_LOAD_SUCCESS,
            data:result.data
           
        })
    
        
    }catch(err){
      
        console.log(err)
    }
    
}





function likePostAPI(data) {
    return axios.patch(`http://localhost:3065/post/${data.postId}/like`,{
        userId:data.userId
    });
  }
  
  function* likePost(action) {
    try {
      const result = yield call(likePostAPI, action.data);
      yield put({
        type: LIKE_POST_SUCCESS,
        data: result.data,
      });
    } catch (err) {
      console.error(err);
      yield put({
        type: LIKE_POST_FAIL,
        error: err.response.data,
      });
    }
  }


  
  function unlikePostAPI(data) {
    return axios.patch(`http://localhost:3065/post/${data.postId}/unlike`,
    {userId:data.userId}
    );
  }
  
  function* unlikePost(action) {
      
    try {
        console.log('actiondata',action.data)
      const result = yield call(unlikePostAPI, action.data);
      yield put({
        type: UNLIKE_POST_SUCCESS,
        data: result.data,
      });
    } catch (err) {
      console.error(err);
      yield put({
        type: UNLIKE_POST_FAIL,
        error: err.response.data,
      });
    }
  }
  



  function loadMyInfoAPI() {
    return axios.get('http://localhost:3065/user');
  }
  
  function* loadMyInfo() {
    try {
      const result = yield call(loadMyInfoAPI);
      yield put({
        type: LOAD_MY_INFO_SUCCESS,
        data: result.data,
      });
    } catch (err) {
      console.error(err);
      yield put({
        type: LOAD_MY_INFO_FAILURE,
        error:'err'
        // error: err.response.data,
      });
    }
  }


  function followAPI(data) {
    return axios.patch(`http://localhost:3065/user/${data.followUserId}/follow`,{
        userId:data.userId
    });
  }
  
  function* follow(action) {
    try {
      const result = yield call(followAPI,action.data);
      yield put({
        type: FOLLOW_SUCCESS,
        data: result.data,
      });
    } catch (err) {
      console.error(err);
      yield put({
        type: FOLLOW_FAILURE,
        error: err.response.data,
      });
    }
  }
  
  function unfollowAPI(data) {
    return axios.patch(`http://localhost:3065/user/${data.followUserId}/unfollow`,{
        userId:data.userId
    });
  }
  
  function* unfollow(action) {
    try {
      const result = yield call(unfollowAPI,action.data);
            yield put({
        type: UNFOLLOW_SUCCESS,
        data: result.data,
      });
    } catch (err) {
      console.error(err);
      yield put({
        type: UNFOLLOW_FAILURE,
        error: err.response.data,
      });
    }
  }


  function deletePostAPI(data) {
    return axios.delete(`http://localhost:3065/post/${data}/delete`);
  }
  
  function* deletePost(action) {
    try {
      const result = yield call(deletePostAPI,action.data);
      yield put({
        type: POST_DELETE_SUCCESS,
        data: result.data,
      });
    } catch (err) {
      console.log(err);
      yield put({
        type: POST_DELETE_FAIL,
        error: err.response.data,
      });
    }
  }
  
  function editPostAPI(data) {
    return axios.post(`http://localhost:3065/post/${data.postId}/edit`,{
        content:data.content,
        title:data.title,
        rate:data.rate
    });
  }
  
  function* editPost(action) {
    try {
      const result = yield call(editPostAPI,action.data);
      yield put({
        type: POST_EDIT_SUCCESS,
        data: result.data,
      });
    } catch (err) {
      console.log('asdasdasdasd',err);
      yield put({
        type: POST_EDIT_FAIL,
        error: 'Err',
      });
    }
  }
  

  function logOutAPI() {
    return axios.post('http://localhost:3065/user/logout');
  }
  
  function* logOut() {
    try {
      const result = yield call(logOutAPI);
      // yield delay(1000);
      yield put({
        type: LOG_OUT_SUCCESS,
      });
    } catch (err) {
      console.log(err);
      yield put({
        type: LOG_OUT_FAILURE,
        error: 'err',
      });
    }
  }




  function NaverLoginAPI(data) {
    let client_id = process.env.REACT_APP_NAVER_LOGIN_CLIENT_ID;
    const access_token=localStorage.getItem('login-access-token')
    const token_type=localStorage.getItem('login-token-type')

    let client_secret = process.env.REACT_APP_NAVER_LOGIN_CLIENT_SECRET;
    return   axios({
        method:'post',
        url:'http://localhost:3065/user/naverlogin',
        data:{access_token,token_type},
        headers:{
            Accept: "application/json",
            'X-Naver-Client-Id': client_id,
            'X-Naver-Client-Secret': client_secret
        }
        
  

    })
    
    // axios.post(naver_api_url,{
    //     headers:{
    //         Accept: "application/json",
    //         'X-Naver-Client-Id': client_id,
    //         'X-Naver-Client-Secret': client_secret
    //     }
    // })
    
  }
  
  function* naverLogin(action) {

    try {

      const result = yield call(NaverLoginAPI,action.data);
      console.log('sagadata',result.data)
      // yield delay(1000);
      yield put({
        type: NAVER_LOGIN_SUCCESS,
        data:result.data
      });
    } catch (err) {
      console.log('naverError',err);
      yield put({
        type: NAVER_LOGIN_FAIL,
        error: 'err',
      });
    }
  }
  
  

function* watchSearchBook() {
    yield takeLatest(SEARCH_BOOK_REQUEST, searchBook);
  }
  

  function* watchSignup() {
    yield takeLatest(SIGNUP_REQUEST, signUp);
  }
  
  function* watchLogin() {
    yield takeLatest(LOGIN_REQUEST, login);
  }
  
  function* watchaddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
  }
   
  function* watchaddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
  }
   
  function* watchbookPosts() {
    yield takeLatest(BOOK_POSTS_REQUEST, bookPosts);
  }
  function* watchpostLoad() {
    yield takeLatest(POST_LOAD_REQUEST, loadPost);
  }
  function* watchLikePost() {
    yield takeLatest(LIKE_POST_REQUEST, likePost);
  }
  
  function* watchUnlikePost() {
    yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
  }
  function* watchLoadMyInfo() {
    yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
  }

  
function* watchFollow() {
    yield takeLatest(FOLLOW_REQUEST, follow);
  }
  

  function* watchUnfollow() {
    yield takeLatest(UNFOLLOW_REQUEST, unfollow);
  }


  function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
  }

  function* watchEditPost() {
    yield takeLatest(POST_EDIT_REQUEST, editPost);
  }
  function* watchDeletePost() {
    yield takeLatest(POST_DELETE_REQUEST, deletePost);
  }
  function* watchBookLoad() {
    yield takeLatest(BOOK_LOAD_REQUEST, bookLoad);
  }


  function* watchNaverLogin() {
    yield takeLatest(NAVER_LOGIN_REQUEST, naverLogin);
  }

export default function* rootSaga(){
 
    
    yield all([
        fork(watchLoadMyInfo),

        fork(watchaddPost),
        fork(watchLogin),
        fork(watchLogOut),

        fork(watchSearchBook),
        fork(watchSignup),
        fork(watchaddComment),
        fork(watchbookPosts),
        fork(watchpostLoad),
        fork(watchLikePost),
        fork(watchUnlikePost),
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchEditPost),
        fork(watchDeletePost),
        fork(watchBookLoad),
        fork(watchNaverLogin)
    ])

}