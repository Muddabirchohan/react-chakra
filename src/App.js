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


const App = () => {
   console.log();
return <Router>

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

  {!window.location.href.includes("login") && !window.location.href.includes("create")? 
  <Layout>
       <Switch>
          <Redirect exact={true} from={"/"} to={"/home"}/>
          <Route path={"/home"}><Home/></Route>
          <Route path={"/users"}><Users/></Route>
          <Route path={"/create-user"}><Signup/></Route>

          
       </Switch>
   </Layout>
:
   <Switch>
          <Redirect exact={true} from={"/"} to={"/home"}/>
          <Route path={"/home"}><Home/></Route>
          <Route path={"/users"}><Users/></Route>
          <Route path={"/login"}><LoginForm/></Route>     
          <Route path={"/create-user"}><Signup/></Route>

   </Switch>

}
   
 </Router>
};
export default App;