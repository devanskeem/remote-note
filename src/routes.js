import React from 'react'
import {Switch, Route} from 'react-router-dom'
import MainPage from './components/MainPage/MainPage'
import LandingPage from './components/LandingPage/LandingPage'
export default (
        <Switch>
            <Route exact path='/' component={LandingPage}/>
            <Route path='/dashboard' component={MainPage}/>
        </Switch>
)