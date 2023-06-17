import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import 'antd/dist/antd.css'

import {Col,Row} from 'antd'

import Signup from './pages/SignUp';
import TopLayout from './components/TopLayout';

import Review from './pages/Review';
import Book from './pages/Book';
import BookSearch from './pages/BookSearch';
import { useDispatch, useSelector } from 'react-redux';
import UserProfile from './components/UserProfile';
import LoginForm from './components/LoginForm';
import MyPage from './pages/MyPage';
import Index from './pages';
import Login from './pages/Login';
import Oauth from './pages/Oauth';
import { useEffect } from 'react';
import { LOAD_MY_INFO_REQUEST, NAVER_LOGIN_REQUEST } from './reducer';
function App() {
  const dispatch=useDispatch()
  const {user}=useSelector((state)=>state)
  // useEffect(()=>{
  //   if(localStorage.getItem('login-access-token')){
  //     dispatch({
  //       type:NAVER_LOGIN_REQUEST
  //     })
  //   }else{
  //     dispatch({
  //             type:LOAD_MY_INFO_REQUEST
  //         })
  //   }
    
  // },[])

  return (

    <BrowserRouter>
    <div className="App">
    <TopLayout></TopLayout>
    {/* <Row>
      <Col span={6}>

       {user?<UserProfile></UserProfile>:<LoginForm></LoginForm>}

      </Col>
      <Col span={18}> */}
       
          
       <Routes>
          <Route exact path='/'  element={<Index></Index>}>
          </Route>
          <Route exact path='/Oauth'  element={<Oauth></Oauth>}>
          </Route>
          <Route exact path='/review'  element={<Review></Review>}>
          </Route>
          <Route exact path='/booksearch'  element={<BookSearch></BookSearch>}>
          </Route>
          <Route exact path='/signup' element={<Signup></Signup>}>
          </Route>
          <Route exact path='/book/:id' element={<Book></Book>}>
          </Route>
          <Route exact path='/mypage' element={<MyPage></MyPage>}>
          </Route>
          <Route exact path='/login' element={<Login></Login>}>
          </Route>
          
        </Routes>
      {/* </Col>
    
    </Row>
      */}
    </div>
    </BrowserRouter>
  );
}


export default App;
