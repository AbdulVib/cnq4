import React, { useEffect, useContext } from "react";

import 'babel-polyfill';

import './App.css'
//route
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'

import ContextProvider from './store/context/contextProvider'

//partials
import Navbar from './partials/navbar/Navbar'

//pages
import Home from './pages/home/Home'
import SignIn from './pages/login/SignIn'
import Signup from './pages/Signup/Signup'
import Profile from './pages/Profile/Profile'
import CreatePost from "./pages/createpost/CreatePost";

//
import AppContext from './store/context/context'

const ProtectedRoutes = _ => {
  const history = useHistory()
  const { state, userData } = useContext(AppContext)
  // console.log(state, ' state')

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
      userData(user)
      // history.push('/')
    }else{
      history.push('/signin')
    }
  }, [])

  
  return(
    <Switch>
      <Route path="/create-post" component={ CreatePost }/>
      <Route path="/profile" component={ Profile }/>
      <Route path="/signup" component={ Signup }/>
      <Route path="/signin" component={ SignIn }/>
      <Route path="/" component={ Home }/>
      <Route component={ Home }/>
    </Switch>
  )
}

const App = () => {
  return (
    <div style={{ background: '#FAFAFA'}}>
        <ContextProvider>
          <BrowserRouter>
            <Navbar />
            <ProtectedRoutes />
          </BrowserRouter>
        </ContextProvider>
    </div>
  );
};

export default App; 
