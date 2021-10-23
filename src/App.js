import React from "react";
import Layout from "./components/Layout";
import {
BrowserRouter as Router,
Switch,
Route,
Redirect
} from "react-router-dom";
import Home from "./components/Home";
import Users from "./components/Users";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from "./components/Login";
import CreateUser from "./components/CreateUser";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { history } from "./components/History";
import Posts from "./components/Posts";
import CreatePost from "./components/CreatePost";


const App = () => {
   console.log();
return <Router history={history}>

   <ToastContainer
   position="top-right"
   autoClose={5000}
   hideProgressBar={false}
   newestOnTop={false}
   closeOnClick
   rtl={false}
   pauseOnFocusLoss
   draggable
   pauseOnHover
   /> 


       <Switch>
          <Redirect exact={true} from={"/"} to={"/home"}/>
          <Route path={"/home"}>  <Layout><Home/>  </Layout></Route>
          <Route path={"/users"}><Layout><Users/></Layout></Route>
          <Route path={"/posts"}><Layout><Posts/></Layout></Route>
          <Route path={"/create-user"}><Signup/></Route>
          <Route path={"/create-post"}><Layout><CreatePost/></Layout></Route>
          <Route path={"/login"}><Login/></Route>


       </Switch>




   
 </Router>
};
export default App;