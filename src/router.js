import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Login from './Components/login'
import Register from './Components/Register'
import Dashboard from './Components/Dashboard/Dashboard'
import AddLocation from './Components/AddLocation/AddLocation'

export default (
    <Switch>
        <Route path='/register' component={Register}/>
        <Route exact path='/' component={Login}/>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/addlocation' component={AddLocation}/>
    </Switch>
)