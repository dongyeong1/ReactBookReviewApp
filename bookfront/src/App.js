import './App.css';
import {BrowserRouter,Route,Routes,Link} from 'react-router-dom'
import Index from './pages/Search'
import 'antd/dist/antd.css'
// import Header from './component/header';
import {Col,Row} from 'antd'
// import UserProfile from './component/userProfile';
import {useState} from 'react'
import Signup from './pages/SignUp';
import TopLayout from './components/TopLayout';
// import LoginForm from './component/LoginForm';
import { Redirect } from "react-router-dom"
import Home from './pages/Home';
import Book from './pages/Book';
import BookSearch from './pages/BookSearch';
import Post from './pages/Post';
import { useSelector } from 'react-redux';
import UserProfile from './components/UserProfile';
import LoginForm from './components/LoginForm';
// import { redirect } from 'react-router-dom';
function App() {

  const {user}=useSelector((state)=>state)

  return (

    <BrowserRouter>
    <div className="App">
    <TopLayout></TopLayout>
    {/* <Header></Header> */}
    <Row>
      <Col span={6}>
       {/* {abc?<UserProfile setAbc={setAbc} name={name} setName={setName}/>:<LoginForm  setAbc={setAbc}name={name} setName={setName}/>

       }  */}
       {user?<UserProfile></UserProfile>:<LoginForm></LoginForm>}

      </Col>
      <Col span={18}>
       
          
          <Routes>
          <Route exact path='/Home'  element={<Home></Home>}>
          </Route>
          <Route exact path='/booksearch'  element={<BookSearch></BookSearch>}>
          </Route>
          <Route exact path='/signup' element={<Signup></Signup>}>
          </Route>
          <Route exact path='/book/:id' element={<Book></Book>}>
          </Route>
          <Route exact path='/post/:id' element={<Post></Post>}>
          </Route>
          
        </Routes>
      </Col>
    
    </Row>
     
    </div>
    </BrowserRouter>
  );
}


export default App;
