import React from 'react'
import {Switch, Route} from 'react-router-dom'
import MainPage from './components/MainPage/MainPage'
import LandingPage from './components/LandingPage/LandingPage'
import Login from './components/LandingPage/Login/Login'
import Register from './components/LandingPage/Register/Register'
export default (
        <Switch>
            <Route exact path='/' component={LandingPage}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/dashboard' component={MainPage}/>
        </Switch>
)