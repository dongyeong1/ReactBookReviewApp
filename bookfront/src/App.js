import './App.css';
import {BrowserRouter,Route,Routes,Link} from 'react-router-dom'
import Index from './pages/Search'
import 'antd/dist/antd.css'
// import Header from './component/header';
import {Col,Row} from 'antd'
// import UserProfile from './component/userProfile';
import {useState} from 'react'
import Signup from './pages/SignUp';
import Search from './pages/Search'
import TopLayout from './components/TopLayout';
import Post from './pages/Post';
// import LoginForm from './component/LoginForm';
import { Redirect } from "react-router-dom"
import Home from './pages/Home';
// import { redirect } from 'react-router-dom';
function App() {

  return (

    <BrowserRouter>
    <div className="App">
    <TopLayout></TopLayout>
    {/* <Header></Header> */}
    <Row>
      <Col span={6}>
       {/* {abc?<UserProfile setAbc={setAbc} name={name} setName={setName}/>:<LoginForm  setAbc={setAbc}name={name} setName={setName}/>

       }  */}
      </Col>
      <Col span={18}>
       
          
          <Routes>
          <Route exact path='/Home'  element={<Home></Home>}>
          </Route>
          <Route exact path='/Search'  element={<Search></Search>}>
          </Route>
          <Route exact path='/signup' element={<Signup></Signup>}>
          </Route>
          <Route exact path='/Post/:id' element={<Post></Post>}>
          </Route>
          
        </Routes>
      </Col>
    
    </Row>
     
    </div>
    </BrowserRouter>
  );
}


export default App;
