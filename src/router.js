import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Login from './components/login'
import Register from './components/Register'
import Dashboard from './components/Dashboard/Dashboard'

export default (
    <Switch>
        <Route path='/register' component={Register}/>
        <Route exact path='/' component={Login}/>
        <Route path='/dashboard' component={Dashboard}/>
    </Switch>
)